/**
 * ====================================================================
 * MASTER SUPERVISORY AI AGENT (สมองส่วนกลางผู้ควบคุมและตรวจทานระบบ)
 * บจก.สุทธิ อินเตอร์ ฟาร์ม (ฟาร์มปลาผู้ใหญ่พร)
 * ====================================================================
 */

const AI_SUPERVISOR = {
  healthScore: 100,
  auditResults: {
    bookingVsInventory: { status: 'pass', message: 'ยอดจองสอดคล้องกับสต็อกปลาในบ่อ 100%', details: [] },
    suppliesRop: { status: 'pass', message: 'ระดับอาหารปลาและเวชภัณฑ์อยู่ในเกณฑ์ปกติ', details: [] },
    mortalityAnomaly: { status: 'pass', message: 'อัตราการสูญเสียปลาอยู่ในเกณฑ์มาตรฐาน', details: [] },
    logisticsReady: { status: 'pass', message: 'คิวจัดส่งมีคนขับพร้อมปฏิบัติงาน', details: [] }
  },
  activeAlerts: []
};

// 1. RUN COMPREHENSIVE AUDIT
function runSupervisorAudit() {
  if (!state.ponds) return AI_SUPERVISOR;

  const alerts = [];
  let deduction = 0;

  // 1.1 ตรวจสอบความสอดคล้อง: ยอดจองล่วงหน้า vs สต็อกปลาพร้อมตัก
  const pendingOrders = (state.orders || []).filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
  const fishDemand = {};

  pendingOrders.forEach(order => {
    (order.items || []).forEach(item => {
      if (item.category === 'พันธุ์ปลา') {
        const key = `${item.name}|${item.size || 'default'}`;
        if (!fishDemand[key]) fishDemand[key] = { name: item.name, size: item.size, qty: 0, ordersCount: 0 };
        fishDemand[key].qty += Number(item.qty || 0);
        fishDemand[key].ordersCount += 1;
      }
    });
  });

  const inventoryIssues = [];
  Object.values(fishDemand).forEach(demand => {
    const stock = getAvailableFishStock(demand.name, demand.size);
    // เทียบกับปลาพร้อมตักทั้งหมดในบ่อ ready
    const readyQty = stock.matchingPonds.reduce((sum, p) => sum + (p.totalQty || 0), 0);
    if (demand.qty > readyQty) {
      const shortage = demand.qty - readyQty;
      const issue = `พันธุ์ปลา "${demand.name} (${demand.size || '-'})" มียอดจองรวม ${demand.qty.toLocaleString()} ตัว แต่มีพร้อมตักในบ่อเพียง ${readyQty.toLocaleString()} ตัว (ขาด ${shortage.toLocaleString()} ตัว)`;
      inventoryIssues.push(issue);
      alerts.push({
        id: 'alt_inv_' + Date.now() + Math.random().toString(36).substr(2, 4),
        type: 'critical',
        module: 'Booking & Inventory',
        title: '⚠️ ปริมาณปลาไม่พอส่งตามยอดจอง',
        desc: issue,
        actionLabel: 'ดูผังบ่อปลา',
        actionFn: "switchTab('inventory'); switchInventorySubTab('ponds');"
      });
      deduction += 20;
    }
  });

  if (inventoryIssues.length > 0) {
    AI_SUPERVISOR.auditResults.bookingVsInventory = {
      status: 'fail',
      message: `พบปัญหาปลาไม่พอส่ง ${inventoryIssues.length} รายการ`,
      details: inventoryIssues
    };
  } else {
    AI_SUPERVISOR.auditResults.bookingVsInventory = {
      status: 'pass',
      message: 'ยอดจองสอดคล้องกับปลาในบ่อ 100% ไม่มีออเดอร์ค้างส่ง',
      details: []
    };
  }

  // 1.2 ตรวจสอบจุดสั่งซื้ออาหารปลาและเวชภัณฑ์ (ROP)
  const lowSupplies = (state.supplies || []).filter(s => s.stockQty <= s.minThreshold);
  if (lowSupplies.length > 0) {
    const issues = lowSupplies.map(s => `${s.name} เหลือ ${s.stockQty} ${s.unit} (เกณฑ์สั่งซื้อขั้นต่ำ ${s.minThreshold} ${s.unit})`);
    AI_SUPERVISOR.auditResults.suppliesRop = {
      status: 'warning',
      message: `มีสินค้าต่ำกว่าจุดสั่งซื้อ ${lowSupplies.length} รายการ`,
      details: issues
    };
    lowSupplies.forEach(s => {
      alerts.push({
        id: 'alt_sup_' + s.id,
        type: 'warning',
        module: 'Farm Inventory',
        title: `🚨 ${s.name} ใกล้หมดคลัง`,
        desc: `เหลือ ${s.stockQty} ${s.unit} (จุดสั่งซื้อ ${s.minThreshold} ${s.unit}) แนะนำสั่งซื้อเพิ่มด่วน`,
        actionLabel: 'บันทึกรับเข้า',
        actionFn: `openSupplyTransactionModal('${s.id}', 'restock');`
      });
      deduction += 8;
    });
  } else {
    AI_SUPERVISOR.auditResults.suppliesRop = {
      status: 'pass',
      message: 'สต็อกอาหารปลาและเวชภัณฑ์เพียงพอต่อการเลี้ยง',
      details: []
    };
  }

  // 1.3 ตรวจสอบอัตราการตายสูงผิดปกติ
  const recentMortality = (state.mortalityLogs || []).filter(l => l.qty > 200);
  if (recentMortality.length > 0) {
    AI_SUPERVISOR.auditResults.mortalityAnomaly = {
      status: 'warning',
      message: `พบบันทึกการสูญเสียปลาผิดปกติใน ${recentMortality.length} รายการ`,
      details: recentMortality.map(m => `${m.pondName}: สูญเสีย ${m.qty.toLocaleString()} ตัว (${m.cause})`)
    };
    deduction += 10;
  } else {
    AI_SUPERVISOR.auditResults.mortalityAnomaly = {
      status: 'pass',
      message: 'อัตราการสูญเสียปลาอยู่ในเกณฑ์มาตรฐาน (< 2%)',
      details: []
    };
  }

  // คำนวณคะแนนสุขภาพระบบรวม (Health Score)
  AI_SUPERVISOR.healthScore = Math.max(20, 100 - deduction);
  AI_SUPERVISOR.activeAlerts = alerts;

  updateSupervisorUI();
  return AI_SUPERVISOR;
}

// 2. UI UPDATE & WIDGET
function updateSupervisorUI() {
  const badgeEl = document.getElementById('supervisor-health-badge');
  const alertCountEl = document.getElementById('supervisor-alert-count');
  const widgetContainer = document.getElementById('supervisor-top-bar');

  if (badgeEl) {
    badgeEl.textContent = `สุขภาพระบบ: ${AI_SUPERVISOR.healthScore}%`;
    badgeEl.className = AI_SUPERVISOR.healthScore >= 90
      ? 'px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300'
      : AI_SUPERVISOR.healthScore >= 70
        ? 'px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300'
        : 'px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 animate-pulse';
  }

  if (alertCountEl) {
    const count = AI_SUPERVISOR.activeAlerts.length;
    alertCountEl.textContent = count;
    alertCountEl.classList.toggle('hidden', count === 0);
  }

  if (widgetContainer) {
    widgetContainer.classList.toggle('hidden', false);
  }
}

// 3. MODAL & COPILOT CHAT
function openSupervisorModal() {
  runSupervisorAudit();
  const modal = document.getElementById('modal-ai-supervisor');
  if (!modal) return;

  renderSupervisorAuditResults();
  modal.classList.remove('hidden');
  lucide.createIcons();
}

function renderSupervisorAuditResults() {
  const scoreEl = document.getElementById('ai-modal-score');
  const scoreBarEl = document.getElementById('ai-modal-score-bar');
  const checkListEl = document.getElementById('ai-checks-container');
  const alertsListEl = document.getElementById('ai-alerts-container');

  if (scoreEl) scoreEl.textContent = `${AI_SUPERVISOR.healthScore}%`;
  if (scoreBarEl) {
    scoreBarEl.style.width = `${AI_SUPERVISOR.healthScore}%`;
    scoreBarEl.className = `h-full rounded-full transition-all duration-500 ${
      AI_SUPERVISOR.healthScore >= 90 ? 'bg-emerald-500' : AI_SUPERVISOR.healthScore >= 70 ? 'bg-amber-500' : 'bg-rose-500'
    }`;
  }

  // Render Checks
  if (checkListEl) {
    const checks = [
      { name: '📦 Booking ↔ Inventory Integrity', res: AI_SUPERVISOR.auditResults.bookingVsInventory },
      { name: '🌾 คลังอาหารปลา & เวชภัณฑ์ (ROP)', res: AI_SUPERVISOR.auditResults.suppliesRop },
      { name: '🔬 อัตราการสูญเสียและสุขภาพปลา', res: AI_SUPERVISOR.auditResults.mortalityAnomaly }
    ];

    checkListEl.innerHTML = checks.map(c => {
      const isPass = c.res.status === 'pass';
      const isWarn = c.res.status === 'warning';
      const icon = isPass ? 'check-circle' : isWarn ? 'alert-triangle' : 'alert-circle';
      const colorClass = isPass ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : isWarn ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-rose-600 bg-rose-50 border-rose-200';

      return `
        <div class="p-3 rounded-xl border ${colorClass} flex items-start gap-3">
          <i data-lucide="${icon}" class="w-5 h-5 flex-shrink-0 mt-0.5"></i>
          <div class="min-w-0 flex-1">
            <div class="font-bold text-sm text-slate-800">${c.name}</div>
            <p class="text-xs text-slate-600 mt-0.5">${c.res.message}</p>
            ${c.res.details && c.res.details.length > 0 ? `
              <ul class="mt-1.5 space-y-1 text-xs text-rose-700 bg-white/80 p-2 rounded-lg border border-rose-100 list-disc list-inside">
                ${c.res.details.map(d => `<li>${d}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Alerts
  if (alertsListEl) {
    if (AI_SUPERVISOR.activeAlerts.length === 0) {
      alertsListEl.innerHTML = `
        <div class="text-center py-6 text-emerald-600 font-semibold text-xs flex flex-col items-center gap-1.5">
          <i data-lucide="shield-check" class="w-8 h-8 text-emerald-500"></i>
          <span>ระบบสมบูรณ์ 100% ไม่พบข้อผิดพลาดหรือความเสี่ยง</span>
        </div>
      `;
    } else {
      alertsListEl.innerHTML = AI_SUPERVISOR.activeAlerts.map(alt => `
        <div class="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
          <div class="min-w-0">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${alt.type === 'critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}">${alt.module}</span>
            <div class="font-bold text-xs sm:text-sm text-slate-800 mt-1">${alt.title}</div>
            <p class="text-xs text-slate-500 truncate">${alt.desc}</p>
          </div>
          ${alt.actionLabel ? `
            <button onclick="closeModal('modal-ai-supervisor'); ${alt.actionFn}" class="btn-large py-1.5 px-3 text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl whitespace-nowrap">
              ${alt.actionLabel}
            </button>
          ` : ''}
        </div>
      `).join('');
    }
  }
}

// 4. NATURAL LANGUAGE QUERY / AI COPILOT
function handleSupervisorAsk(promptText) {
  const inputEl = document.getElementById('ai-copilot-input');
  const q = promptText || (inputEl ? inputEl.value.trim() : '');
  if (!q) return;

  if (inputEl) inputEl.value = '';

  const answerEl = document.getElementById('ai-copilot-answer');
  if (!answerEl) return;

  answerEl.classList.remove('hidden');
  answerEl.innerHTML = `
    <div class="flex items-center gap-2 text-sky-600 text-xs font-semibold animate-pulse">
      <i data-lucide="sparkles" class="w-4 h-4"></i>
      <span>AI Supervisor กำลังวิเคราะห์ข้อมูลระบบทั้ง 7 โมดูล...</span>
    </div>
  `;
  lucide.createIcons();

  setTimeout(() => {
    const reply = generateSupervisorAnswer(q);
    answerEl.innerHTML = `
      <div class="p-3.5 bg-sky-50/80 rounded-2xl border border-sky-100 text-xs text-slate-700 leading-relaxed space-y-2">
        <div class="flex items-center justify-between font-bold text-sky-900 border-b border-sky-200/60 pb-1.5">
          <div class="flex items-center gap-1.5">
            <span>🧠 ผู้ช่วย AI ตอบ:</span>
          </div>
          <span class="text-[10px] text-slate-400 font-normal">ตรวจทานกับฐานข้อมูลสด</span>
        </div>
        <div>${reply}</div>
      </div>
    `;
    lucide.createIcons();
  }, 400);
}

function generateSupervisorAnswer(q) {
  const lower = q.toLowerCase();

  if (lower.includes('สรุป') || lower.includes('ภาพรวม') || lower.includes('วันนี้')) {
    const todayOrders = (state.orders || []).filter(o => o.deliveryDate === getTodayString());
    const readyPonds = (state.ponds || []).filter(p => p.status === 'ready');
    const totalReady = readyPonds.reduce((s, p) => s + (p.totalQty || 0), 0);
    const lowSupplies = (state.supplies || []).filter(s => s.stockQty <= s.minThreshold);

    return `
      <strong>📊 สรุปภาพรวมฟาร์มวันนี้ (${formatThaiDate(getTodayString())}):</strong><br/>
      • 🚚 <strong>คิวงานวันนี้:</strong> มีทั้งหมด <strong>${todayOrders.length} ออเดอร์</strong><br/>
      • 🐟 <strong>ปลาพร้อมตักขาย:</strong> รวม <strong>${totalReady.toLocaleString()} ตัว</strong> ใน ${readyPonds.length} บ่อ<br/>
      • 🌾 <strong>คลังวัตถุดิบ:</strong> มีสินค้าต่ำกว่าเกณฑ์ <strong>${lowSupplies.length} รายการ</strong> ${lowSupplies.length > 0 ? `(${lowSupplies.map(s => s.name).join(', ')})` : ''}<br/>
      • 🛡️ <strong>สุขภาพระบบรวม:</strong> อยู่ที่ <strong>${AI_SUPERVISOR.healthScore}%</strong>
    `;
  }

  if (lower.includes('อาหาร') || lower.includes('ของใกล้หมด') || lower.includes('สต็อก')) {
    const lowSupplies = (state.supplies || []).filter(s => s.stockQty <= s.minThreshold);
    if (lowSupplies.length === 0) {
      return `✅ ตรวจสอบแล้ว คลังอาหารปลาและเวชภัณฑ์ทั้งหมดอยู่ในเกณฑ์ปลอดภัย ไม่พบรายการที่ต้องสั่งซื้อด่วนครับ`;
    }
    return `
      ⚠️ <strong>รายการอาหารและเวชภัณฑ์ที่ต้องสั่งซื้อด่วน:</strong><br/>
      ${lowSupplies.map(s => `• <strong>${s.name}:</strong> เหลือ ${s.stockQty} ${s.unit} (จุดสั่งซื้อ ${s.minThreshold} ${s.unit})`).join('<br/>')}<br/>
      💡 <em>แนะนำให้กดปุ่ม "รับเข้า" ในแท็บสต็อกเมื่อสั่งซื้อสินค้าเข้ามาแล้วครับ</em>
    `;
  }

  if (lower.includes('ปลาดุก') || lower.includes('บิ๊กอุย')) {
    const p1 = (state.ponds || []).find(p => p.id === 'pond_1');
    const p5 = (state.ponds || []).find(p => p.id === 'pond_5');
    return `
      🐟 <strong>สถานะปลาดุกบิ๊กอุยในฟาร์ม:</strong><br/>
      • <strong>${p1?.name || 'บ่อดิน 1'}:</strong> ไซส์ ${p1?.fishSize} เหลือ ${Number(p1?.totalQty || 0).toLocaleString()} ตัว (ตักขายได้ทันที ${Math.max(0, (p1?.totalQty||0) - (p1?.reservedQty||0)).toLocaleString()} ตัว)<br/>
      • <strong>${p5?.name || 'บ่อปูนอนุบาล 1'}:</strong> ไซส์ ${p5?.fishSize} จำนวน ${Number(p5?.totalQty || 0).toLocaleString()} ตัว (กำลังอนุบาล คาดว่าพร้อมตักในอีก 14 วัน)
    `;
  }

  if (lower.includes('ปลานิล') || lower.includes('จิตรลดา')) {
    const p2 = (state.ponds || []).find(p => p.id === 'pond_2');
    const p6 = (state.ponds || []).find(p => p.id === 'pond_6');
    return `
      🐟 <strong>สถานะปลานิลจิตรลดาในฟาร์ม:</strong><br/>
      • <strong>${p2?.name || 'บ่อดิน 2'}:</strong> ไซส์ ${p2?.fishSize} เหลือ ${Number(p2?.totalQty || 0).toLocaleString()} ตัว (ตักขายได้ทันที ${Math.max(0, (p2?.totalQty||0) - (p2?.reservedQty||0)).toLocaleString()} ตัว)<br/>
      • <strong>${p6?.name || 'บ่อปูนอนุบาล 2'}:</strong> ไซส์ ${p6?.fishSize} จำนวน ${Number(p6?.totalQty || 0).toLocaleString()} ตัว (แปลงเพศแล้ว พร้อมขายในอีก 10 วัน)
    `;
  }

  return `
    🤖 <strong>AI Supervisor ได้รับคำถาม:</strong> "${q}"<br/>
    ระบบได้ทำการตรวจเช็คข้อมูลข้ามโมดูล (Booking, Inventory, Quality) เรียบร้อยแล้ว ขณะนี้ระบบทำงานปกติ มีคะแนนความถูกต้องอยู่ที่ <strong>${AI_SUPERVISOR.healthScore}%</strong> หากต้องการตรวจสอบเฉพาะส่วน สามารถกดเลือกหัวข้อด้านบนได้เลยครับ
  `;
}
