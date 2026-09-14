// Cloudflare Worker (index.js)
// บจก.สุทธิ อินเตอร์ ฟาร์ม (ฟาร์มปลาผู้ใหญ่พร)
// รัน API เชื่อมต่อ Cloudflare D1 Database และให้บริการ Static Assets ทั้งหมด

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json; charset=utf-8'
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS
      });
    }

    // -------------------------------------------------------------
    // API 1: /api/health (ตรวจเช็คสถานะเซิร์ฟเวอร์ & D1)
    // -------------------------------------------------------------
    if (pathname === '/api/health') {
      let dbStatus = 'disconnected';
      if (env && env.DB) {
        try {
          await env.DB.prepare("SELECT 1").first();
          dbStatus = 'connected';
        } catch (e) {
          dbStatus = 'error: ' + e.message;
        }
      }
      return new Response(JSON.stringify({
        status: 'ok',
        server: 'Cloudflare Worker',
        database: dbStatus,
        time: new Date().toISOString()
      }), {
        headers: CORS_HEADERS
      });
    }

    // -------------------------------------------------------------
    // API 2: /api/state (ดึงและบันทึก Orders, Customers, Claims, Drivers, Perms)
    // -------------------------------------------------------------
    if (pathname === '/api/state') {
      if (!env || !env.DB) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Cloudflare D1 Database binding "DB" is not connected yet.'
        }), {
          headers: CORS_HEADERS
        });
      }

      // ตรวจสอบและสร้างตาราง app_state อัตโนมัติหากยังไม่มี
      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS app_state (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at TEXT NOT NULL
        )
      `).run();

      // GET: อ่านข้อมูลล่าสุดจากคลาวด์
      if (request.method === 'GET') {
        try {
          const row = await env.DB.prepare("SELECT value, updated_at FROM app_state WHERE key = 'global_state'").first();
          if (!row || !row.value || row.value === '{}') {
            return new Response(JSON.stringify({
              success: false,
              message: 'No stored state in D1 yet.'
            }), {
              headers: CORS_HEADERS
            });
          }
          const stateData = JSON.parse(row.value);
          return new Response(JSON.stringify({
            success: true,
            data: stateData,
            updatedAt: row.updated_at
          }), {
            headers: CORS_HEADERS
          });
        } catch (err) {
          return new Response(JSON.stringify({ success: false, error: err.message }), {
            status: 500,
            headers: CORS_HEADERS
          });
        }
      }

      // POST: บันทึกอัปเดตข้อมูลขึ้นคลาวด์
      if (request.method === 'POST') {
        try {
          const payload = await request.json();

          // Merge กับ state เดิม
          let currentState = {};
          try {
            const existing = await env.DB.prepare("SELECT value FROM app_state WHERE key = 'global_state'").first();
            if (existing && existing.value) {
              currentState = JSON.parse(existing.value);
            }
          } catch (_) {}

          const mergedState = {
            ...currentState,
            orders: payload.orders !== undefined ? payload.orders : (currentState.orders || []),
            customers: payload.customers !== undefined ? payload.customers : (currentState.customers || []),
            claims: payload.claims !== undefined ? payload.claims : (currentState.claims || []),
            drivers: payload.drivers !== undefined ? payload.drivers : (currentState.drivers || []),
            permissions: payload.permissions !== undefined ? payload.permissions : (currentState.permissions || null),
            users: payload.users !== undefined ? payload.users : (currentState.users || []),
            updatedAt: new Date().toISOString()
          };

          const stateJson = JSON.stringify(mergedState);
          const now = new Date().toISOString();

          await env.DB.prepare(`
            INSERT INTO app_state (key, value, updated_at) 
            VALUES ('global_state', ?1, ?2)
            ON CONFLICT(key) DO UPDATE SET 
              value = excluded.value, 
              updated_at = excluded.updated_at
          `).bind(stateJson, now).run();

          return new Response(JSON.stringify({
            success: true,
            message: 'Saved to Cloudflare D1 successfully',
            updatedAt: now
          }), {
            headers: CORS_HEADERS
          });
        } catch (err) {
          return new Response(JSON.stringify({ success: false, error: err.message }), {
            status: 500,
            headers: CORS_HEADERS
          });
        }
      }
    }

    // -------------------------------------------------------------
    // API 3: /api/upload & /api/upload-image (อัปโหลดรูปภาพหลักฐานเคลมลง D1)
    // -------------------------------------------------------------
    if ((pathname === '/api/upload' || pathname === '/api/upload-image') && request.method === 'POST') {
      try {
        const body = await request.json();
        const { base64Data, filename, claimId } = body;

        if (!base64Data) {
          return new Response(JSON.stringify({
            success: false,
            message: 'No image data provided'
          }), {
            status: 400,
            headers: CORS_HEADERS
          });
        }

        const id = 'media_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
        const now = new Date().toISOString();
        const cleanFilename = filename ? filename.replace(/[^a-zA-Z0-9._-]/g, '_') : `${id}.jpg`;

        if (env && env.DB) {
          try {
            await env.DB.prepare(`
              CREATE TABLE IF NOT EXISTS claim_media (
                id TEXT PRIMARY KEY,
                claim_id TEXT,
                filename TEXT,
                content_type TEXT,
                data_base64 TEXT NOT NULL,
                file_size INTEGER,
                created_at TEXT NOT NULL
              )
            `).run();

            await env.DB.prepare(`
              INSERT INTO claim_media (id, claim_id, filename, content_type, data_base64, file_size, created_at)
              VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
            `).bind(
              id,
              claimId || null,
              cleanFilename,
              base64Data.startsWith('data:image/png') ? 'image/png' : 'image/jpeg',
              base64Data,
              base64Data.length,
              now
            ).run();
          } catch (dbErr) {
            console.warn('Could not persist media to D1, returning data URL:', dbErr);
          }
        }

        return new Response(JSON.stringify({
          success: true,
          mediaId: id,
          imageUrl: base64Data,
          message: 'Upload processed successfully'
        }), {
          status: 200,
          headers: CORS_HEADERS
        });
      } catch (err) {
        return new Response(JSON.stringify({
          success: false,
          error: err.message
        }), {
          status: 500,
          headers: CORS_HEADERS
        });
      }
    }

    // -------------------------------------------------------------
    // Static Assets Fallback
    // -------------------------------------------------------------
    return env.ASSETS ? env.ASSETS.fetch(request) : new Response('Not found', { status: 404 });
  }
};
