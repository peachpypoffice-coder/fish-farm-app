/**
 * ====================================================================
 * FARM INVENTORY AGENT (Agent 3: การจัดการสต็อกในฟาร์ม)
 * บจก.สุทธิ อินเตอร์ ฟาร์ม (ฟาร์มปลาผู้ใหญ่พร)
 * ====================================================================
 */

// 1. INITIALIZATION & STATE MANAGEMENT
function initInventoryState() {
  try {
    const savedPonds = localStorage.getItem('phuyaiporn_ponds');
    const savedSupplies = localStorage.getItem('phuyaiporn_supplies');
    const savedMortality = localStorage.getItem('phuyaiporn_mortality');
    const savedGrading = localStorage.getItem('phuyaiporn_grading');
    const savedGrn = localStorage.getItem('phuyaiporn_grn');
    const savedEvents = localStorage.getItem('phuyaiporn_system_events');

    let loadedPonds = savedPonds ? JSON.parse(savedPonds) : null;
    // ตรวจสอบว่ามีผังสต็อก 48 หน่วยตามแปลนจริงหรือไม่ ถ้ายังไม่มีหรือเป็นแบบเก่า ให้อัปเกรดเป็น 48 หน่วยทันที
    if (!loadedPonds || loadedPonds.length !== 48 || !loadedPonds.some(p => p.id === 'cage_c1')) {
      loadedPonds = typeof INITIAL_PONDS !== 'undefined' ? JSON.parse(JSON.stringify(INITIAL_PONDS)) : [];
      localStorage.setItem('phuyaiporn_ponds', JSON.stringify(loadedPonds));
    }

    state.ponds = loadedPonds;
    state.supplies = savedSupplies ? JSON.parse(savedSupplies) : (typeof INITIAL_SUPPLIES !== 'undefined' ? INITIAL_SUPPLIES : []);
    state.mortalityLogs = savedMortality ? JSON.parse(savedMortality) : (typeof INITIAL_MORTALITY_LOGS !== 'undefined' ? INITIAL_MORTALITY_LOGS : []);
    state.gradingLogs = savedGrading ? JSON.parse(savedGrading) : (typeof INITIAL_GRADING_LOGS !== 'undefined' ? INITIAL_GRADING_LOGS : []);
    state.grnList = savedGrn ? JSON.parse(savedGrn) : (typeof INITIAL_GRN_LOGS !== 'undefined' ? INITIAL_GRN_LOGS : []);
    state.systemEvents = savedEvents ? JSON.parse(savedEvents) : (typeof INITIAL_SYSTEM_EVENTS !== 'undefined' ? INITIAL_SYSTEM_EVENTS : []);
  } catch (err) {
    console.warn('Inventory state load error:', err);
    state.ponds = typeof INITIAL_PONDS !== 'undefined' ? JSON.parse(JSON.stringify(INITIAL_PONDS)) : [];
    state.supplies = typeof INITIAL_SUPPLIES !== 'undefined' ? INITIAL_SUPPLIES : [];
    state.mortalityLogs = typeof INITIAL_MORTALITY_LOGS !== 'undefined' ? INITIAL_MORTALITY_LOGS : [];
    state.gradingLogs = typeof INITIAL_GRADING_LOGS !== 'undefined' ? INITIAL_GRADING_LOGS : [];
    state.grnList = typeof INITIAL_GRN_LOGS !== 'undefined' ? INITIAL_GRN_LOGS : [];
    state.systemEvents = typeof INITIAL_SYSTEM_EVENTS !== 'undefined' ? INITIAL_SYSTEM_EVENTS : [];
  }
}

function saveInventoryState() {
  try {
    localStorage.setItem('phuyaiporn_ponds', JSON.stringify(state.ponds));
    localStorage.setItem('phuyaiporn_supplies', JSON.stringify(state.supplies));
    localStorage.setItem('phuyaiporn_mortality', JSON.stringify(state.mortalityLogs));
    localStorage.setItem('phuyaiporn_grading', JSON.stringify(state.gradingLogs));
    localStorage.setItem('phuyaiporn_grn', JSON.stringify(state.grnList));
    localStorage.setItem('phuyaiporn_system_events', JSON.stringify(state.systemEvents));
  } catch (err) {
    console.error('Inventory state save error:', err);
  }

  // ซิงค์ไปยัง backend
  if (state.isServerOnline) {
    fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ponds: state.ponds,
        supplies: state.supplies,
        mortalityLogs: state.mortalityLogs,
        gradingLogs: state.gradingLogs,
        grnList: state.grnList,
        systemEvents: state.systemEvents
      })
    }).catch(e => console.warn('Inventory server sync error:', e));
  }

  // อัปเดต badge และเรียก AI ตรวจสอบซ้ำ
  if (typeof updateInventoryBadges === 'function') updateInventoryBadges();
  if (typeof runSupervisorAudit === 'function') runSupervisorAudit();
}

// 2. HELPER FUNCTIONS & STOCK CALCULATION
function getDaysSinceGraded(dateStr) {
  if (!dateStr) return 999;
  const today = new Date(getTodayString());
  const gradedDate = new Date(dateStr);
  const diffTime = today - gradedDate;
  return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
}

function getGradingDuePonds(thresholdDays = 7) {
  if (!state.ponds) return [];
  return state.ponds.filter(p => {
    if (p.status !== 'ready' && p.status !== 'growing') return false;
    if (!p.totalQty || p.totalQty <= 0) return false;
    const days = getDaysSinceGraded(p.lastGradedDate);
    return days >= thresholdDays;
  });
}
function getAvailableFishStock(fishName, size = null) {
  if (!state.ponds) return { totalQty: 0, reservedQty: 0, availableQty: 0, matchingPonds: [] };

  const matchingPonds = state.ponds.filter(p => {
    if (p.status !== 'ready') return false;
    const nameMatch = p.fishName.includes(fishName) || fishName.includes(p.fishName);
    const sizeMatch = !size || p.fishSize.includes(size) || size.includes(p.fishSize);
    return nameMatch && sizeMatch;
  });

  const totalQty = matchingPonds.reduce((sum, p) => sum + (p.totalQty || 0), 0);
  const reservedQty = matchingPonds.reduce((sum, p) => sum + (p.reservedQty || 0), 0);
  const availableQty = Math.max(0, totalQty - reservedQty);

  return { totalQty, reservedQty, availableQty, matchingPonds };
}

// ตรวจสอบความถูกต้องก่อนบันทึกออเดอร์ (Validation Hook)
function validateOrderItemsStock(orderItems) {
  const warnings = [];
  if (!orderItems || !Array.isArray(orderItems)) return { valid: true, warnings };

  orderItems.forEach(item => {
    if (item.category === 'พันธุ์ปลา') {
      const stock = getAvailableFishStock(item.name, item.size);
      if (stock.matchingPonds.length === 0) {
        warnings.push(`ไม่พบบ่อปลาพร้อมขายสำหรับ "${item.name} (${item.size || 'ทุกไซส์'})"`);
      } else if (item.qty > stock.availableQty) {
        warnings.push(`"${item.name} (${item.size})" ต้องการ ${Number(item.qty).toLocaleString()} ตัว แต่บ่อมีพร้อมตักเพียง ${stock.availableQty.toLocaleString()} ตัว (ขาด ${(item.qty - stock.availableQty).toLocaleString()} ตัว)`);
      }
    }
  });

  return {
    valid: warnings.length === 0,
    warnings
  };
}

// หักกันยอด (Reserve Stock) เมื่อมีออเดอร์ใหม่
function reserveStockForOrder(order) {
  if (!order || !order.items) return;
  order.items.forEach(item => {
    if (item.category === 'พันธุ์ปลา') {
      const stock = getAvailableFishStock(item.name, item.size);
      if (stock.matchingPonds.length > 0) {
        const pond = stock.matchingPonds[0];
        pond.reservedQty = (pond.reservedQty || 0) + Number(item.qty);
      }
    }
  });
  saveInventoryState();
}

// คืนยอดกันสต็อกเมื่อยกเลิกออเดอร์
function releaseStockForOrder(order) {
  if (!order || !order.items) return;
  order.items.forEach(item => {
    if (item.category === 'พันธุ์ปลา') {
      const stock = getAvailableFishStock(item.name, item.size);
      if (stock.matchingPonds.length > 0) {
        const pond = stock.matchingPonds[0];
        pond.reservedQty = Math.max(0, (pond.reservedQty || 0) - Number(item.qty));
      }
    }
  });
  saveInventoryState();
}

// ตัดสต็อกจริงเมื่อส่งปลาสำเร็จ (Delivered) หรือชำระเงิน POS
function deductStockForDeliveredOrder(order) {
  if (!order || !order.items) return;
  let changed = false;

  order.items.forEach(item => {
    if (item.category === 'พันธุ์ปลา') {
      let remainingToDeduct = Number(item.qty) || 0;

      // 1. กรณีระบุ pondId เจาะจง (เช่น มาจาก POS หรือระบุบ่อตอนขาย)
      if (item.pondId) {
        const pond = (state.ponds || []).find(p => p.id === item.pondId);
        if (pond) {
          const deductNow = Math.min(pond.totalQty || 0, remainingToDeduct);
          pond.totalQty = Math.max(0, (pond.totalQty || 0) - deductNow);
          pond.reservedQty = Math.max(0, (pond.reservedQty || 0) - deductNow);
          remainingToDeduct -= deductNow;
          if (pond.totalQty === 0) {
            pond.status = 'empty';
            pond.statusLabel = 'บ่อว่าง';
          }
          changed = true;
        }
      }

      // 2. ถ้ายังเหลือยอด หรือไม่ได้ระบุ pondId ให้ตัดจากบ่อที่ตรงกันตามลำดับ
      if (remainingToDeduct > 0) {
        const stock = getAvailableFishStock(item.name, item.size);
        for (const pond of (stock.matchingPonds || [])) {
          if (remainingToDeduct <= 0) break;
          const deductNow = Math.min(pond.totalQty || 0, remainingToDeduct);
          pond.totalQty = Math.max(0, (pond.totalQty || 0) - deductNow);
          pond.reservedQty = Math.max(0, (pond.reservedQty || 0) - deductNow);
          remainingToDeduct -= deductNow;
          if (pond.totalQty === 0) {
            pond.status = 'empty';
            pond.statusLabel = 'บ่อว่าง';
          }
          changed = true;
        }
      }
    } else {
      const supply = (state.supplies || []).find(s => s.name.includes(item.name) || item.name.includes(s.name));
      if (supply) {
        supply.stockQty = Math.max(0, (supply.stockQty || 0) - Number(item.qty));
        changed = true;
      }
    }
  });

  if (changed) {
    saveInventoryState();
    if (typeof renderInventoryView === 'function') renderInventoryView();
    if (typeof updatePortalKPIs === 'function') updatePortalKPIs();
  }
}

// 3. UI RENDERING
let currentInventorySubTab = 'ponds'; // 'ponds' (ค้นหาที่เก็บปลา), 'supplies', 'inbound_grn', 'history', 'mortality'

// 3.1 ค้นหาที่เก็บพันธุ์ปลา (Fish Location Search)
// โหมด 'fish' = เลือก/ค้นจากรายชื่อพันธุ์ปลา, 'pond' = เลือก/ค้นจากรายชื่อกระชัง/อ่าง
let fishLocSearchMode = 'fish';
let fishLocPicked = ''; // ค่าที่เลือกจาก dropdown (ชื่อปลา หรือ pond id) — ใช้กรองแบบตรงตัว

const FISH_LOC_ZONE_ORDER = ['sterile_cage', 'main_cage', 'small_tank', 'large_tank'];

function invEsc(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function pondHasFish(p) {
  return (p.totalQty || 0) > 0 && p.status !== 'empty';
}

function sortPondsByZoneAndCode(a, b) {
  const za = FISH_LOC_ZONE_ORDER.indexOf(a.zone);
  const zb = FISH_LOC_ZONE_ORDER.indexOf(b.zone);
  if (za !== zb) return (za === -1 ? 99 : za) - (zb === -1 ? 99 : zb);
  const na = parseInt(String(a.code || '').replace(/\D/g, ''), 10) || 0;
  const nb = parseInt(String(b.code || '').replace(/\D/g, ''), 10) || 0;
  return na - nb;
}

// แปลงขนาดปลา เช่น '1.5-2 นิ้ว', '2-3 นิ้ว', '3-4 นิ้ว' เป็นคู่ตัวเลข [min, max] เพื่อเรียงจากน้อยไปมาก
function parseFishSizeNumbers(sizeStr) {
  const nums = String(sizeStr || '').match(/\d+(?:\.\d+)?/g);
  if (!nums || nums.length === 0) return [9999, 9999];
  const min = parseFloat(nums[0]);
  const max = nums.length > 1 ? parseFloat(nums[1]) : min;
  return [isNaN(min) ? 9999 : min, isNaN(max) ? 9999 : max];
}

function sortPondsByFishSizeAsc(a, b) {
  const [minA, maxA] = parseFishSizeNumbers(a.fishSize);
  const [minB, maxB] = parseFishSizeNumbers(b.fishSize);
  if (minA !== minB) return minA - minB;
  if (maxA !== maxB) return maxA - maxB;
  return sortPondsByZoneAndCode(a, b);
}

function getPondStatusBadge(p) {
  if (p.status === 'sick') return '<span class="text-[11px] font-bold px-2 py-0.5 rounded-full border bg-rose-100 text-rose-800 border-rose-300">ปลาป่วย/งดขาย</span>';
  if (!pondHasFish(p)) return '<span class="text-[11px] font-bold px-2 py-0.5 rounded-full border bg-slate-100 text-slate-600 border-slate-300">ว่าง</span>';
  if (p.status === 'ready') return '<span class="text-[11px] font-bold px-2 py-0.5 rounded-full border bg-emerald-100 text-emerald-800 border-emerald-300">พร้อมขาย</span>';
  if (p.status === 'growing') return '<span class="text-[11px] font-bold px-2 py-0.5 rounded-full border bg-sky-100 text-sky-800 border-sky-300">กำลังอนุบาล</span>';
  return `<span class="text-[11px] font-bold px-2 py-0.5 rounded-full border bg-amber-100 text-amber-800 border-amber-300">${invEsc(p.statusLabel || 'พักบ่อ')}</span>`;
}

function setFishLocSearchMode(mode) {
  fishLocSearchMode = mode === 'pond' ? 'pond' : 'fish';
  fishLocPicked = '';

  const active = 'px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-1.5 bg-sky-600 text-white shadow-xs';
  const inactive = 'px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-1.5 text-slate-600 hover:text-slate-900';
  const btnFish = document.getElementById('btn-fish-loc-mode-fish');
  const btnPond = document.getElementById('btn-fish-loc-mode-pond');
  if (btnFish) btnFish.className = fishLocSearchMode === 'fish' ? active : inactive;
  if (btnPond) btnPond.className = fishLocSearchMode === 'pond' ? active : inactive;

  const input = document.getElementById('fish-loc-search-input');
  if (input) {
    input.value = '';
    input.placeholder = fishLocSearchMode === 'fish'
      ? 'พิมพ์ชื่อพันธุ์ปลา / รหัสปลา / ขนาด เช่น ดุก, ทับทิม...'
      : 'พิมพ์ชื่อกระชังหรืออ่าง เช่น กระชัง 1, อ่างใหญ่...';
  }

  populateFishLocPicker();
  renderFishLocationSearch();
}

function populateFishLocPicker() {
  const picker = document.getElementById('fish-loc-picker');
  if (!picker) return;
  const ponds = state.ponds || [];

  if (fishLocSearchMode === 'fish') {
    const groups = {};
    ponds.filter(pondHasFish).forEach(p => {
      const name = p.fishName || 'ไม่ระบุพันธุ์';
      groups[name] = (groups[name] || 0) + 1;
    });
    const names = Object.keys(groups).sort((a, b) => a.localeCompare(b, 'th'));
    picker.innerHTML = `<option value="">— เลือกจากรายชื่อพันธุ์ปลา (${names.length} พันธุ์) —</option>` +
      names.map(n => `<option value="${invEsc(n)}">${invEsc(n)} (${groups[n]} จุด)</option>`).join('');
  } else {
    const byZone = {};
    ponds.slice().sort(sortPondsByZoneAndCode).forEach(p => {
      const z = p.zoneName || p.typeName || 'อื่น ๆ';
      (byZone[z] = byZone[z] || []).push(p);
    });
    picker.innerHTML = `<option value="">— เลือกจากรายชื่อกระชัง/อ่าง (${ponds.length} จุด) —</option>` +
      Object.keys(byZone).map(z => `
        <optgroup label="${invEsc(z)}">
          ${byZone[z].map(p => `<option value="${invEsc(p.id)}">${invEsc(p.name)}${pondHasFish(p) ? ' — ' + invEsc(p.fishName || '') : ' — (ว่าง)'}</option>`).join('')}
        </optgroup>`).join('');
  }
  picker.value = fishLocPicked;
  if (picker.value !== fishLocPicked) fishLocPicked = '';
}

function onFishLocPickerChange(value) {
  fishLocPicked = value || '';
  const input = document.getElementById('fish-loc-search-input');
  if (input) input.value = '';
  renderFishLocationSearch();
}

function onFishLocSearchInput() {
  // พิมพ์ค้นหาเอง = ยกเลิกค่าที่เลือกจาก dropdown
  fishLocPicked = '';
  const picker = document.getElementById('fish-loc-picker');
  if (picker) picker.value = '';
  renderFishLocationSearch();
}

function clearFishLocSearch() {
  fishLocPicked = '';
  const input = document.getElementById('fish-loc-search-input');
  const picker = document.getElementById('fish-loc-picker');
  const zone = document.getElementById('fish-loc-zone-filter');
  if (input) input.value = '';
  if (picker) picker.value = '';
  if (zone) zone.value = 'all';
  renderFishLocationSearch();
}

function renderFishLocationSearch() {
  const container = document.getElementById('fish-loc-results');
  if (!container) return;
  if (!state.ponds || state.ponds.length === 0) initInventoryState();

  const picker = document.getElementById('fish-loc-picker');
  if (picker && picker.options.length <= 1) populateFishLocPicker();

  const query = (document.getElementById('fish-loc-search-input')?.value || '').trim().toLowerCase();
  const zoneFilter = document.getElementById('fish-loc-zone-filter')?.value || 'all';
  const summaryEl = document.getElementById('fish-loc-summary');

  let ponds = (state.ponds || []).filter(p => zoneFilter === 'all' || p.zone === zoneFilter);

  if (fishLocSearchMode === 'fish') {
    // ---------- ค้นจากพันธุ์ปลา: แสดงว่าปลาแต่ละพันธุ์อยู่กระชัง/อ่างไหน ----------
    ponds = ponds.filter(pondHasFish).filter(p => {
      if (fishLocPicked) return (p.fishName || 'ไม่ระบุพันธุ์') === fishLocPicked;
      if (!query) return true;
      return [p.fishName, p.fishCode, p.fishSize].some(v => String(v || '').toLowerCase().includes(query));
    });

    const groups = {};
    ponds.forEach(p => {
      const name = p.fishName || 'ไม่ระบุพันธุ์';
      (groups[name] = groups[name] || []).push(p);
    });
    const names = Object.keys(groups).sort((a, b) => a.localeCompare(b, 'th'));

    if (summaryEl) summaryEl.textContent = `พบ ${names.length} พันธุ์ปลา จัดเก็บอยู่ใน ${ponds.length} กระชัง/อ่าง`;

    if (names.length === 0) {
      container.innerHTML = `<div class="farm-card p-10 text-center text-slate-400">ไม่พบพันธุ์ปลาที่ค้นหาในกระชัง/อ่างใด ๆ</div>`;
      return;
    }

    container.innerHTML = names.map(name => {
      const list = groups[name].slice().sort(sortPondsByFishSizeAsc);
      const total = list.reduce((s, p) => s + (p.totalQty || 0), 0);
      const reserved = list.reduce((s, p) => s + (p.reservedQty || 0), 0);
      const avail = Math.max(0, total - reserved);
      return `
        <div class="farm-card overflow-hidden">
          <div class="p-4 bg-sky-50/70 border-b border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xl">🐟</span>
              <div>
                <h4 class="font-black text-slate-800 text-base">${invEsc(name)}</h4>
                <p class="text-xs text-slate-500">จัดเก็บอยู่ ${list.length} จุด</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 text-xs font-bold">
              <span class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700">รวม ${total.toLocaleString()} ตัว</span>
              <span class="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700">ติดจอง ${reserved.toLocaleString()}</span>
              <span class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">พร้อมขาย ${avail.toLocaleString()}</span>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-sm">
              <thead>
                <tr class="bg-slate-50 text-xs font-bold text-slate-600 border-b border-slate-200">
                  <th class="py-2 px-3">📍 ที่จัดเก็บ (กระชัง/อ่าง)</th>
                  <th class="py-2 px-3">โซน</th>
                  <th class="py-2 px-3">ขนาด (น้อย ➔ มาก)</th>
                  <th class="py-2 px-3 text-right">จำนวน</th>
                  <th class="py-2 px-3 text-right">พร้อมขาย</th>
                  <th class="py-2 px-3 text-center">สถานะ</th>
                  <th class="py-2 px-3 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${list.map(p => `
                  <tr class="hover:bg-sky-50/60 cursor-pointer" onclick="handlePondClick('${invEsc(p.id)}')" title="คลิกเพื่อดูรายละเอียด/จัดการจุดนี้">
                    <td class="py-2 px-3 font-bold text-sky-800">${invEsc(p.name)}</td>
                    <td class="py-2 px-3 text-slate-600">${invEsc(p.zoneName || p.typeName || '-')}</td>
                    <td class="py-2 px-3 text-slate-600">${invEsc(p.fishSize || '-')}</td>
                    <td class="py-2 px-3 text-right font-semibold">${Number(p.totalQty || 0).toLocaleString()}</td>
                    <td class="py-2 px-3 text-right font-semibold text-emerald-700">${Math.max(0, (p.totalQty || 0) - (p.reservedQty || 0)).toLocaleString()}</td>
                    <td class="py-2 px-3 text-center">${getPondStatusBadge(p)}</td>
                    <td class="py-2 px-3 text-center">
                      <button type="button" onclick="event.stopPropagation(); openEditPondModal('${invEsc(p.id)}')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition shadow-2xs">
                        <span>✏️ แก้ไข</span>
                      </button>
                    </td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>`;
    }).join('');
  } else {
    // ---------- ค้นจากกระชัง/อ่าง: แสดงว่าแต่ละจุดเก็บปลาพันธุ์อะไร ----------
    ponds = ponds.filter(p => {
      if (fishLocPicked) return p.id === fishLocPicked;
      if (!query) return true;
      return [p.code, p.name, p.zoneName, p.typeName].some(v => String(v || '').toLowerCase().includes(query));
    }).sort(sortPondsByZoneAndCode);

    const withFish = ponds.filter(pondHasFish).length;
    if (summaryEl) summaryEl.textContent = `พบ ${ponds.length} กระชัง/อ่าง (มีปลา ${withFish} จุด, ว่าง ${ponds.length - withFish} จุด)`;

    if (ponds.length === 0) {
      container.innerHTML = `<div class="farm-card p-10 text-center text-slate-400">ไม่พบกระชัง/อ่างที่ค้นหา</div>`;
      return;
    }

    container.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        ${ponds.map(p => {
          const has = pondHasFish(p);
          const avail = Math.max(0, (p.totalQty || 0) - (p.reservedQty || 0));
          return `
            <div onclick="handlePondClick('${invEsc(p.id)}')" class="cursor-pointer text-left bg-white rounded-2xl border ${has ? 'border-sky-200' : 'border-slate-200'} shadow-xs hover:shadow-md hover:border-sky-400 transition p-4 space-y-2 flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <div class="font-black text-slate-800">${invEsc(p.name)}</div>
                    <div class="text-[11px] text-slate-500 mt-0.5">${invEsc(p.zoneName || p.typeName || '-')}${p.sizeDesc ? ' • ' + invEsc(p.sizeDesc) : ''}</div>
                  </div>
                  ${getPondStatusBadge(p)}
                </div>
                ${has ? `
                  <div class="pt-2 border-t border-slate-100">
                    <div class="font-bold text-sky-900">🐟 ${invEsc(p.fishName || '-')}</div>
                    <div class="text-xs text-slate-500">ขนาด ${invEsc(p.fishSize || '-')}</div>
                    <div class="flex justify-between text-xs mt-1.5">
                      <span class="text-slate-600">จำนวน <strong>${Number(p.totalQty || 0).toLocaleString()}</strong> ตัว</span>
                      <span class="text-emerald-700">พร้อมขาย <strong>${avail.toLocaleString()}</strong></span>
                    </div>
                  </div>` : `
                  <div class="pt-2 border-t border-slate-100 text-xs text-slate-400">ไม่มีปลาจัดเก็บอยู่</div>`}
              </div>
              <div class="pt-2 border-t border-slate-100 flex justify-end">
                <button type="button" onclick="event.stopPropagation(); openEditPondModal('${invEsc(p.id)}')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition shadow-2xs">
                  <span>✏️ แก้ไข</span>
                </button>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }
}

function switchInventorySubTab(subTab) {
  currentInventorySubTab = subTab;
  document.querySelectorAll('.inv-subtab-btn').forEach(btn => {
    btn.classList.remove('bg-sky-600', 'text-white', 'shadow-xs');
    btn.classList.add('text-slate-600', 'hover:bg-sky-50');
  });
  const activeBtn = document.getElementById(`inv-subtab-btn-${subTab}`);
  if (activeBtn) {
    activeBtn.classList.add('bg-sky-600', 'text-white', 'shadow-xs');
    activeBtn.classList.remove('text-slate-600', 'hover:bg-sky-50');
  }

  const sections = ['ponds', 'supplies', 'inbound_grn', 'history', 'mortality'];
  sections.forEach(sec => {
    const el = document.getElementById(`inv-section-${sec}`);
    if (el) el.classList.toggle('hidden', sec !== subTab);
  });

  if (subTab === 'ponds') renderFishLocationSearch();
  if (subTab === 'supplies') renderSuppliesTable();
  if (subTab === 'inbound_grn') renderGrnTable();
  if (subTab === 'history') renderHistorySection();
  if (subTab === 'mortality') renderFishLossSection();

  lucide.createIcons();
}

function renderInventoryView() {
  if (!state.ponds || state.ponds.length === 0) initInventoryState();

  const totalFish = (state.ponds || []).reduce((sum, p) => sum + (p.totalQty || 0), 0);
  const readyFish = (state.ponds || []).filter(p => p.status === 'ready').reduce((sum, p) => sum + Math.max(0, (p.totalQty || 0) - (p.reservedQty || 0)), 0);
  const reservedFish = (state.ponds || []).reduce((sum, p) => sum + (p.reservedQty || 0), 0);
  const lowStockCount = (state.supplies || []).filter(s => s.stockQty <= s.minThreshold).length;

  const elTotalFish = document.getElementById('stat-inv-total-fish');
  const elReadyFish = document.getElementById('stat-inv-ready-fish');
  const elReservedFish = document.getElementById('stat-inv-reserved-fish');
  const elLowStockCount = document.getElementById('stat-inv-low-stock');

  if (elTotalFish) elTotalFish.textContent = totalFish.toLocaleString() + ' ตัว';
  if (elReadyFish) elReadyFish.textContent = readyFish.toLocaleString() + ' ตัว';
  if (elReservedFish) elReservedFish.textContent = reservedFish.toLocaleString() + ' ตัว';
  if (elLowStockCount) {
    elLowStockCount.textContent = lowStockCount + ' รายการ';
    elLowStockCount.className = lowStockCount > 0 ? 'text-lg sm:text-xl font-black text-rose-600' : 'text-lg sm:text-xl font-black text-emerald-600';
  }

  // รีเฟรชรายชื่อใน dropdown ค้นหาที่เก็บปลา (ข้อมูลบ่ออาจเปลี่ยนหลังย้าย/ขาย/รับเข้า)
  populateFishLocPicker();
  switchInventorySubTab(currentInventorySubTab);
}

// 3.1.3 TRANSFER MODAL LOGIC
function openTransferFishModal(fromId, toId = null) {
  const modal = document.getElementById('modal-transfer-fish');
  if (!modal) return;

  const ponds = state.ponds || [];
  let sourcePond = null;

  if (fromId) {
    sourcePond = ponds.find(p => p.id === fromId);
  } else {
    sourcePond = ponds.find(p => (p.totalQty || 0) > 0);
  }

  if (!sourcePond || (sourcePond.totalQty || 0) <= 0) {
    showNotification('ไม่มีกระชังหรืออ่างที่มีปลาพร้อมสำหรับการย้าย', 'warning');
    return;
  }

  document.getElementById('transfer-from-id').value = sourcePond.id;
  document.getElementById('transfer-from-name').textContent = `${sourcePond.name} (${sourcePond.code || ''}) - ${sourcePond.zoneName || ''}`;
  document.getElementById('transfer-from-fish-info').textContent = `${sourcePond.fishName || 'ปลา'} • ไซส์: ${sourcePond.fishSize || '-'} • ตาคัด: ${sourcePond.sieveCode || '-'} (฿${Number(sourcePond.unitPrice || 0).toFixed(2)}/ตัว)`;
  document.getElementById('transfer-from-qty').textContent = `${Number(sourcePond.totalQty || 0).toLocaleString()} ตัว`;

  const qtyInput = document.getElementById('transfer-qty');
  qtyInput.max = sourcePond.totalQty;
  qtyInput.value = sourcePond.totalQty;

  const selectTo = document.getElementById('transfer-to-id');
  selectTo.innerHTML = ponds
    .filter(p => p.id !== sourcePond.id)
    .map(p => {
      const isEmpty = (p.totalQty || 0) === 0 || p.status === 'empty';
      const statusText = isEmpty ? '[ว่าง]' : `[มีปลา: ${p.fishName || ''} ${(p.totalQty || 0).toLocaleString()} ตัว]`;
      return `<option value="${p.id}" ${toId === p.id ? 'selected' : ''}>${p.name} (${p.code || ''}) - ${p.zoneName || ''} ${statusText}</option>`;
    })
    .join('');

  if (!toId && selectTo.options.length > 0) {
    const emptyPond = ponds.find(p => p.id !== sourcePond.id && ((p.totalQty || 0) === 0 || p.status === 'empty'));
    if (emptyPond) selectTo.value = emptyPond.id;
  }

  const chkGrade = document.getElementById('transfer-enable-grade');
  if (chkGrade) {
    chkGrade.checked = false;
    toggleTransferGradeOptions(false);
  }
  const sizeInput = document.getElementById('transfer-new-size');
  if (sizeInput) sizeInput.value = sourcePond.fishSize || '';
  const sieveInput = document.getElementById('transfer-new-sieve');
  if (sieveInput) sieveInput.value = sourcePond.sieveCode || '';

  updateTransferTargetPreview();
  modal.classList.remove('hidden');
  lucide.createIcons();
}

function setTransferPreset(ratio) {
  const fromId = document.getElementById('transfer-from-id')?.value;
  const sourcePond = (state.ponds || []).find(p => p.id === fromId);
  if (!sourcePond) return;
  const total = sourcePond.totalQty || 0;
  const calcQty = Math.max(1, Math.floor(total * ratio));
  const input = document.getElementById('transfer-qty');
  if (input) input.value = calcQty;
}

function toggleTransferGradeOptions(checked) {
  const container = document.getElementById('transfer-grade-options');
  if (container) container.classList.toggle('hidden', !checked);
}

function updateTransferTargetPreview() {
  const targetId = document.getElementById('transfer-to-id')?.value;
  const previewEl = document.getElementById('transfer-target-preview');
  if (!targetId || !previewEl) return;

  const targetPond = (state.ponds || []).find(p => p.id === targetId);
  if (!targetPond) return;

  const isEmpty = (targetPond.totalQty || 0) === 0 || targetPond.status === 'empty';
  if (isEmpty) {
    previewEl.innerHTML = `<span class="text-emerald-700 font-bold">✨ จุดปลายทาง (${targetPond.name}) ว่าง พร้อมรับปลา</span>`;
    previewEl.className = 'text-xs mt-1 bg-emerald-50 p-2 rounded-lg border border-emerald-200';
  } else {
    previewEl.innerHTML = `<span class="text-amber-800 font-semibold">⚠️ จุดปลายทาง (${targetPond.name}) มีปลาอยู่แล้ว: <strong>${targetPond.fishName}</strong> (${(targetPond.totalQty || 0).toLocaleString()} ตัว) - การย้ายจะเป็นการรวมสต็อก</span>`;
    previewEl.className = 'text-xs mt-1 bg-amber-50 p-2 rounded-lg border border-amber-200';
  }
}

function handleConfirmTransfer(e) {
  if (e) e.preventDefault();

  const fromId = document.getElementById('transfer-from-id')?.value;
  const toId = document.getElementById('transfer-to-id')?.value;
  const qty = Number(document.getElementById('transfer-qty')?.value) || 0;

  const sourcePond = (state.ponds || []).find(p => p.id === fromId);
  const targetPond = (state.ponds || []).find(p => p.id === toId);

  if (!sourcePond || !targetPond) {
    showNotification('ข้อมูลกระชังต้นทางหรือปลายทางไม่ถูกต้อง', 'error');
    return;
  }

  if (qty <= 0 || qty > (sourcePond.totalQty || 0)) {
    showNotification(`กรุณาระบุจำนวนย้ายระหว่าง 1 ถึง ${(sourcePond.totalQty || 0).toLocaleString()} ตัว`, 'error');
    return;
  }

  const isGrading = document.getElementById('transfer-enable-grade')?.checked;
  const newSize = isGrading ? (document.getElementById('transfer-new-size')?.value.trim() || sourcePond.fishSize) : sourcePond.fishSize;
  const newSieve = isGrading ? (document.getElementById('transfer-new-sieve')?.value.trim() || sourcePond.sieveCode) : sourcePond.sieveCode;

  // หักออกจากบ่อต้นทาง
  sourcePond.totalQty = (sourcePond.totalQty || 0) - qty;
  if (sourcePond.totalQty <= 0) {
    sourcePond.totalQty = 0;
    sourcePond.reservedQty = 0;
    sourcePond.status = 'empty';
    sourcePond.statusLabel = 'บ่อว่าง';
  }

  // นำเข้าบ่อปลายทาง
  targetPond.fishName = sourcePond.fishName;
  targetPond.fishId = sourcePond.fishId;
  targetPond.fishCode = sourcePond.fishCode;
  targetPond.fishSize = newSize;
  targetPond.sieveCode = newSieve;
  targetPond.unitPrice = sourcePond.unitPrice;
  targetPond.unitCost = sourcePond.unitCost;
  targetPond.totalQty = (targetPond.totalQty || 0) + qty;
  targetPond.lastGradedDate = getTodayString();
  targetPond.status = 'ready';
  targetPond.statusLabel = 'พร้อมขาย';

  // บันทึกลง System Events
  if (Array.isArray(state.systemEvents)) {
    state.systemEvents.unshift({
      id: 'EVT-' + Date.now(),
      type: 'transfer',
      title: `ย้ายปลา ${sourcePond.name} ➔ ${targetPond.name}`,
      detail: `ย้าย ${sourcePond.fishName} จำนวน ${qty.toLocaleString()} ตัว (ขนาด ${newSize})`,
      timestamp: getTodayString() + ' ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      severity: 'info'
    });
  }

  saveInventoryState();
  closeModal('modal-transfer-fish');
  renderInventoryView();
  if (typeof updatePortalKPIs === 'function') updatePortalKPIs();

  showNotification(`ย้ายปลา ${qty.toLocaleString()} ตัว จาก ${sourcePond.name} ไป ${targetPond.name} สำเร็จ! 🐟`, 'success');
}

// 3.1.4 QUICK POND INSPECTOR
function handlePondClick(pondId) {
  const pond = (state.ponds || []).find(p => p.id === pondId);
  if (!pond) return;

  const modal = document.getElementById('modal-inspect-pond');
  if (!modal) return;

  const isEmpty = (pond.totalQty || 0) === 0 || pond.status === 'empty';
  const hasFish = !isEmpty && (pond.totalQty || 0) > 0;
  const avail = Math.max(0, (pond.totalQty || 0) - (pond.reservedQty || 0));
  const formula = hasFish ? `${Number(pond.totalQty).toLocaleString()} *${Number(pond.unitPrice || 0).toFixed(2)}` : '-';
  const totalVal = hasFish ? Math.round(pond.totalQty * (pond.unitPrice || 0)) : 0;

  // Header info
  document.getElementById('inspect-pond-zone-badge').textContent = pond.zoneName || pond.typeName || 'โซนฟาร์ม';
  document.getElementById('inspect-pond-name').textContent = `${pond.name} (${pond.code || pond.id})`;
  document.getElementById('inspect-pond-desc').textContent = `${pond.sizeDesc || 'จุดเลี้ยง'} • ${pond.typeName || ''}`;

  // Fish info
  const iconEl = document.getElementById('inspect-pond-icon');
  if (iconEl) iconEl.textContent = (pond.fishName || '').includes('ดุก') ? '🐡' : ((pond.fishName || '').includes('ทับทิม') ? '🐠' : '🐟');
  document.getElementById('inspect-pond-fish-name').textContent = hasFish ? pond.fishName : 'ไม่มีปลา (บ่อว่าง)';
  document.getElementById('inspect-pond-fish-size').textContent = hasFish ? `ขนาด: ${pond.fishSize || '-'}` : '-';
  document.getElementById('inspect-pond-sieve').textContent = hasFish ? (pond.sieveCode || '-') : '-';

  // Status Badge
  const statusBadge = document.getElementById('inspect-pond-status-badge');
  if (pond.status === 'sick') {
    statusBadge.textContent = 'ปลาป่วย / งดขาย';
    statusBadge.className = 'text-xs font-bold px-2.5 py-1 rounded-full border bg-rose-100 text-rose-800 border-rose-300';
  } else if (isEmpty) {
    statusBadge.textContent = 'บ่อว่าง';
    statusBadge.className = 'text-xs font-bold px-2.5 py-1 rounded-full border bg-slate-100 text-slate-600 border-slate-300';
  } else if (pond.status === 'ready') {
    statusBadge.textContent = 'พร้อมขาย';
    statusBadge.className = 'text-xs font-bold px-2.5 py-1 rounded-full border bg-emerald-100 text-emerald-800 border-emerald-300';
  } else if (pond.status === 'growing') {
    statusBadge.textContent = 'กำลังอนุบาล';
    statusBadge.className = 'text-xs font-bold px-2.5 py-1 rounded-full border bg-sky-100 text-sky-800 border-sky-300';
  } else {
    statusBadge.textContent = pond.statusLabel || 'พักบ่อ';
    statusBadge.className = 'text-xs font-bold px-2.5 py-1 rounded-full border bg-amber-100 text-amber-800 border-amber-300';
  }

  // Formula and Value
  document.getElementById('inspect-pond-formula').textContent = formula;
  document.getElementById('inspect-pond-total-val').textContent = '฿' + totalVal.toLocaleString();

  // Quantities
  document.getElementById('inspect-pond-total-qty').textContent = Number(pond.totalQty || 0).toLocaleString() + ' ตัว';
  document.getElementById('inspect-pond-reserved-qty').textContent = Number(pond.reservedQty || 0).toLocaleString() + ' ตัว';
  document.getElementById('inspect-pond-avail-qty').textContent = avail.toLocaleString() + ' ตัว';

  // Wire action buttons
  const btnTransfer = document.getElementById('inspect-btn-transfer');
  if (btnTransfer) {
    btnTransfer.onclick = () => {
      closeModal('modal-inspect-pond');
      openTransferFishModal(pond.id);
    };
  }

  const btnPos = document.getElementById('inspect-btn-pos');
  if (btnPos) {
    btnPos.onclick = () => {
      closeModal('modal-inspect-pond');
      quickSellPondAtPos(pond.id);
    };
  }

  const btnMortality = document.getElementById('inspect-btn-mortality');
  if (btnMortality) {
    btnMortality.onclick = () => {
      closeModal('modal-inspect-pond');
      openRecordMortalityModal(pond.id);
    };
  }

  const btnEdit = document.getElementById('inspect-btn-edit');
  if (btnEdit) {
    btnEdit.onclick = () => {
      closeModal('modal-inspect-pond');
      openEditPondModal(pond.id);
    };
  }

  const btnClear = document.getElementById('inspect-btn-clear');
  if (btnClear) {
    btnClear.onclick = () => {
      quickClearPond(pond.id);
    };
  }

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function quickSellPondAtPos(pondId) {
  const pond = (state.ponds || []).find(p => p.id === pondId);
  if (!pond || (pond.totalQty || 0) <= 0) {
    showNotification('กระชังนี้ไม่มีปลาพร้อมขาย', 'warning');
    return;
  }
  if (typeof switchPortalMenu === 'function') {
    switchPortalMenu('pos');
    if (typeof addPosItemToCart === 'function') {
      addPosItemToCart('fish', pond.id);
      showNotification(`เพิ่ม ${pond.fishName} จาก ${pond.name} เข้าตะกร้า POS เรียบร้อย 🛒`, 'success');
    }
  }
}

function quickClearPond(pondId) {
  const pond = (state.ponds || []).find(p => p.id === pondId);
  if (!pond) return;
  if (!confirm(`ต้องการล้าง ${pond.name} ให้เป็นบ่อว่าง ใช่หรือไม่?`)) return;

  pond.totalQty = 0;
  pond.reservedQty = 0;
  pond.status = 'empty';
  pond.statusLabel = 'บ่อว่าง';
  saveInventoryState();
  closeModal('modal-inspect-pond');
  renderInventoryView();
  showNotification(`เปลี่ยนสถานะ ${pond.name} เป็นบ่อว่างเรียบร้อย`, 'info');
}

// 3.3 RENDER SUPPLIES TABLE
function renderSuppliesTable() {
  const tbody = document.getElementById('supplies-table-body');
  if (!tbody) return;

  if (!state.supplies || state.supplies.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-slate-400">ไม่มีข้อมูลคลังสินค้า</td></tr>`;
    return;
  }

  const filterCat = document.getElementById('supplies-category-filter')?.value || 'all';
  const filteredSupplies = filterCat === 'all'
    ? state.supplies
    : state.supplies.filter(s => s.category === filterCat);

  if (filteredSupplies.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-slate-400">ยังไม่มีรายการสินค้าในหมวดหมู่ "${filterCat}" (คลิก "+ นำเข้าสินค้าตามหมวดหมู่" เพื่อเพิ่มรายการใหม่)</td></tr>`;
    return;
  }

  tbody.innerHTML = filteredSupplies.map(item => {
    const isLow = item.stockQty <= item.minThreshold;
    return `
      <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition ${isLow ? 'bg-rose-50/30' : ''}">
        <td class="p-3.5 text-xs font-bold text-slate-600">${item.category}</td>
        <td class="p-3.5">
          <div class="font-bold text-sm text-slate-800">${item.name}</div>
          <div class="text-xs text-slate-400">${item.packageSize || '-'} • ผู้จำหน่าย: ${item.supplier || '-'}</div>
        </td>
        <td class="p-3.5 text-center">
          <span class="font-black text-base ${isLow ? 'text-rose-600' : 'text-slate-800'}">${Number(item.stockQty).toLocaleString()}</span>
          <span class="text-xs text-slate-500 ml-0.5">${item.unit}</span>
        </td>
        <td class="p-3.5 text-center text-xs text-slate-500 font-semibold">
          ${item.minThreshold} ${item.unit}
        </td>
        <td class="p-3.5 text-center">
          ${isLow ? `
            <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
              <i data-lucide="alert-circle" class="w-3 h-3"></i> ต่ำกว่าเกณฑ์ สั่งซื้อด่วน!
            </span>
          ` : `
            <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              <i data-lucide="check" class="w-3 h-3"></i> ปกติ
            </span>
          `}
        </td>
        <td class="p-3.5 text-right font-semibold text-xs text-slate-700">
          ฿${Number(item.unitPrice || 0).toLocaleString()}
        </td>
        <td class="p-3.5 text-right space-x-1 whitespace-nowrap">
          <button onclick="openSupplyTransactionModal('${item.id}', 'consume')" class="px-2.5 py-1 text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg transition" title="เบิกใช้หน้างาน">
            เบิกใช้
          </button>
          <button onclick="openSupplyTransactionModal('${item.id}', 'restock')" class="px-2.5 py-1 text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 rounded-lg transition" title="รับสินค้าเข้าคลัง">
            รับเข้า
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// 3.4 RENDER GRN (GOODS RECEIVED NOTE) TABLE
function renderGrnTable() {
  const tbody = document.getElementById('grn-table-body');
  if (!tbody) return;

  if (!state.grnList || state.grnList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-slate-400">ยังไม่มีประวัติการออกใบรับสินค้า (GRN)</td></tr>`;
    return;
  }

  tbody.innerHTML = state.grnList.map(grn => {
    const isFingerling = grn.type === 'fingerling';
    const catLabel = grn.category || (isFingerling ? 'พันธุ์ปลา' : (grn.items && grn.items[0] && grn.items[0].category) || 'อาหารปลา');
    const itemNames = (grn.items || []).map(it => `${it.name} (${Number(it.qty).toLocaleString()} ${it.unit})`).join(', ');

    return `
      <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
        <td class="p-3.5 font-bold text-sm text-sky-900 whitespace-nowrap">
          <div class="flex items-center gap-1.5">
            <i data-lucide="file-check" class="w-4 h-4 text-sky-600"></i>
            <span>${grn.id}</span>
          </div>
          <div class="text-[11px] text-slate-400">${formatThaiDate(grn.date)}</div>
        </td>
        <td class="p-3.5 text-xs font-bold">
          <span class="px-2 py-0.5 rounded-full border ${isFingerling ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}">
            ${isFingerling ? '🐟 ' : '📦 '}${catLabel}
          </span>
        </td>
        <td class="p-3.5">
          <div class="font-bold text-sm text-slate-800">${grn.supplier || '-'}</div>
          <div class="text-xs text-slate-500">${itemNames}</div>
        </td>
        <td class="p-3.5 text-xs font-bold text-slate-700">
          ${grn.targetDestination || '-'}
        </td>
        <td class="p-3.5 text-right font-black text-sm text-slate-800">
          ฿${Number(grn.totalAmount || 0).toLocaleString()}
        </td>
        <td class="p-3.5 text-center">
          <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300" title="ส่งข้อมูลไปยังระบบบัญชีแล้ว">
            <i data-lucide="check-circle" class="w-3 h-3"></i> บัญชีรับเรื่อง
          </span>
        </td>
        <td class="p-3.5 text-right space-x-1 whitespace-nowrap">
          <button onclick="viewGrnDetail('${grn.id}')" class="px-2.5 py-1 text-xs font-bold bg-white hover:bg-sky-50 text-sky-700 border border-sky-300 rounded-lg transition" title="เปิดดูใบรับสินค้า">
            <i data-lucide="eye" class="w-3.5 h-3.5 inline mr-1"></i> ดูใบรับ
          </button>
          <button onclick="printGrn('${grn.id}')" class="px-2 py-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition" title="พิมพ์ใบ GRN">
            <i data-lucide="printer" class="w-3.5 h-3.5 inline"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// 3.5 RENDER HISTORY SECTION (GRADING LOGS & MORTALITY)
function renderHistorySection() {
  renderGradingLogsTable();
  renderMortalityLogs();
}

function renderGradingLogsTable() {
  const tbody = document.getElementById('grading-table-body');
  if (!tbody) return;

  if (!state.gradingLogs || state.gradingLogs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-slate-400">ยังไม่มีประวัติการคัดขนาด</td></tr>`;
    return;
  }

  tbody.innerHTML = state.gradingLogs.map(log => {
    const splitsSummary = (log.splits || []).map(s => `
      <div class="text-xs">
        <span class="font-bold text-slate-800">${s.targetSize || s.sieveCode}</span>: 
        <span class="text-sky-700 font-semibold">${Number(s.qty).toLocaleString()} ตัว</span> 
        <span class="text-slate-400 text-[11px]">(➔ ${s.targetPondName || s.targetPondId})</span>
      </div>
    `).join('');

    return `
      <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
        <td class="p-3.5 font-bold text-sm text-sky-900 whitespace-nowrap">
          <div>${log.id}</div>
          <div class="text-[11px] text-slate-400">${formatThaiDate(log.date)}</div>
        </td>
        <td class="p-3.5">
          <div class="font-bold text-sm text-slate-800">${log.sourcePondName}</div>
          <div class="text-xs text-slate-500">${log.fishName} (เดิม: ${log.originalSize})</div>
        </td>
        <td class="p-3.5 text-xs text-slate-600 font-semibold">
          ${log.sieveUsed || '-'}
        </td>
        <td class="p-3.5 text-center font-black text-sm text-slate-800">
          ${Number(log.initialQty).toLocaleString()} ตัว
        </td>
        <td class="p-3.5 space-y-1">
          ${splitsSummary}
        </td>
        <td class="p-3.5 text-center">
          ${log.mortalityQty > 0 ? `
            <span class="text-rose-600 font-bold text-xs">${Number(log.mortalityQty).toLocaleString()} ตัว</span>
          ` : `<span class="text-slate-400 text-xs">-</span>`}
        </td>
        <td class="p-3.5 text-xs text-slate-600">
          <div class="font-semibold">${log.operator || '-'}</div>
          ${log.notes ? `<div class="text-[11px] text-slate-400">${log.notes}</div>` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

// 3.6 RENDER MORTALITY LOGS
function renderMortalityLogs() {
  const tbody = document.getElementById('mortality-table-body');
  if (!tbody) return;

  if (!state.mortalityLogs || state.mortalityLogs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-slate-400">ไม่มีประวัติการบันทึกปลาตาย</td></tr>`;
    return;
  }

  tbody.innerHTML = state.mortalityLogs.map(log => `
    <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
      <td class="p-3.5 text-xs text-slate-600 font-semibold whitespace-nowrap">${formatThaiDate(log.date)}</td>
      <td class="p-3.5 font-bold text-sm text-slate-800">${log.pondName || '-'}</td>
      <td class="p-3.5 text-center font-bold text-sm text-rose-600">${Number(log.qty).toLocaleString()} ตัว</td>
      <td class="p-3.5 text-xs text-slate-600 max-w-xs">${log.cause || '-'}</td>
      <td class="p-3.5 text-xs text-emerald-700 bg-emerald-50/50 rounded-lg max-w-xs">${log.actionTaken || '-'}</td>
      <td class="p-3.5 text-xs text-slate-500 whitespace-nowrap">${log.reporter || '-'}</td>
    </tr>
  `).join('');
}

// 4. FISH GRADING SYSTEM (ระบบการคัดขนาดและการเติบโต)

// 4.1 เปิด Modal คัดขนาดปลา
function openGradeFishModal(pondId = null) {
  const modal = document.getElementById('modal-grade-fish');
  if (!modal) return;

  const pondSelect = document.getElementById('grade-source-pond-select');
  if (pondSelect) {
    pondSelect.innerHTML = (state.ponds || []).map(p => `
      <option value="${p.id}" ${pondId && p.id === pondId ? 'selected' : ''}>
        ${p.name} - ${p.fishName || 'ว่าง'} (${Number(p.totalQty || 0).toLocaleString()} ตัว)
      </option>
    `).join('');
  }

  const sieveInput = document.getElementById('grade-sieve-input') || document.getElementById('grade-sieve-select');
  if (sieveInput) {
    const pond = (state.ponds || []).find(p => p.id === pondId);
    sieveInput.value = pond && pond.sieveCode ? pond.sieveCode : '';
  }

  document.getElementById('grade-date-input').value = getTodayString();
  document.getElementById('grade-mortality-input').value = '0';
  document.getElementById('grade-notes-input').value = '';

  updateGradeSourcePondDetails();

  const container = document.getElementById('grade-splits-tbody');
  if (container) {
    container.innerHTML = '';
    addGradingSplitRow('2-2.5 นิ้ว (ก.ส.)', 'ก.ส.', '', pondId || (state.ponds[0] && state.ponds[0].id), 1.50);
    addGradingSplitRow('2.5-3 นิ้ว (ญ)', 'ญ', '', pondId || (state.ponds[0] && state.ponds[0].id), 1.80);
  }

  calculateGradingTotals();
  modal.classList.remove('hidden');
  lucide.createIcons();
}

function updateGradeSourcePondDetails() {
  const pondId = document.getElementById('grade-source-pond-select')?.value;
  const pond = (state.ponds || []).find(p => p.id === pondId);
  if (!pond) return;

  const total = Number(pond.totalQty || 0);
  const reserved = Number(pond.reservedQty || 0);
  const avail = Math.max(0, total - reserved);

  document.getElementById('grade-source-fish-name').textContent = pond.fishName || '-';
  document.getElementById('grade-source-current-size').textContent = `${pond.fishSize || '-'} (ตาคัด: ${pond.sieveCode || '-'})`;
  document.getElementById('grade-source-total-qty').textContent = total.toLocaleString() + ' ตัว';
  document.getElementById('grade-source-reserved-qty').textContent = reserved.toLocaleString() + ' ตัว';
  document.getElementById('grade-source-available-qty').textContent = avail.toLocaleString() + ' ตัว';

  calculateGradingTotals();
}

function addGradingSplitRow(targetSize = '', sieveCode = '', qty = '', targetPondId = '', unitPrice = 0) {
  const tbody = document.getElementById('grade-splits-tbody');
  if (!tbody) return;

  const sourcePondId = document.getElementById('grade-source-pond-select')?.value;
  const pondOptions = (state.ponds || []).map(p => `
    <option value="${p.id}" ${p.id === (targetPondId || sourcePondId) ? 'selected' : ''}>
      ${p.name} (${p.statusLabel})
    </option>
  `).join('');

  const rowId = 'split_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
  const tr = document.createElement('tr');
  tr.id = rowId;
  tr.className = 'border-b border-slate-100 hover:bg-slate-50/60 transition';
  tr.innerHTML = `
    <td class="p-2.5">
      <input type="text" value="${targetSize}" placeholder="เช่น 2.5-3 นิ้ว (ญ)" 
        class="input-large text-xs py-1.5 px-2.5 w-full font-bold split-size-input" onchange="lookupSplitPrice(this)" required>
    </td>
    <td class="p-2.5">
      <input type="text" value="${sieveCode}" placeholder="เช่น ญ, ก.ส." 
        class="input-large text-xs py-1.5 px-2 w-20 text-center font-bold split-sieve-input">
    </td>
    <td class="p-2.5">
      <input type="number" min="1" value="${qty}" placeholder="จำนวนตัว" 
        class="input-large text-xs py-1.5 px-2.5 w-full font-black text-sky-800 text-right split-qty-input" oninput="calculateGradingTotals()" required>
    </td>
    <td class="p-2.5">
      <select class="input-large text-xs py-1.5 px-2 w-full font-bold split-target-pond-select">
        ${pondOptions}
      </select>
    </td>
    <td class="p-2.5">
      <input type="number" step="0.05" min="0" value="${unitPrice || 0}" 
        class="input-large text-xs py-1.5 px-2 w-24 text-right font-bold text-emerald-700 split-price-input">
    </td>
    <td class="p-2.5 text-center">
      <button type="button" onclick="removeGradingSplitRow('${rowId}')" class="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition" title="ลบแถว">
        <i data-lucide="trash-2" class="w-4 h-4"></i>
      </button>
    </td>
  `;

  tbody.appendChild(tr);
  lucide.createIcons();
}

function removeGradingSplitRow(rowId) {
  const tr = document.getElementById(rowId);
  if (tr) tr.remove();
  calculateGradingTotals();
}

function lookupSplitPrice(input) {
  const val = input.value.trim();
  const pondId = document.getElementById('grade-source-pond-select')?.value;
  const pond = (state.ponds || []).find(p => p.id === pondId);
  if (!pond || !pond.fishName || typeof FISH_SIZE_PRICING === 'undefined') return;

  const priceTable = FISH_SIZE_PRICING[pond.fishName];
  if (priceTable && priceTable[val]) {
    const row = input.closest('tr');
    if (row) {
      const priceInput = row.querySelector('.split-price-input');
      const sieveInput = row.querySelector('.split-sieve-input');
      if (priceInput) priceInput.value = priceTable[val].price;
      if (sieveInput && priceTable[val].sieve) sieveInput.value = priceTable[val].sieve;
    }
  }
}

function calculateGradingTotals() {
  const pondId = document.getElementById('grade-source-pond-select')?.value;
  const pond = (state.ponds || []).find(p => p.id === pondId);
  const sourceTotal = pond ? Number(pond.totalQty || 0) : 0;

  let splitsSum = 0;
  document.querySelectorAll('.split-qty-input').forEach(inp => {
    splitsSum += Number(inp.value) || 0;
  });

  const mortality = Number(document.getElementById('grade-mortality-input')?.value) || 0;
  const grandTotalGraded = splitsSum + mortality;
  const diff = grandTotalGraded - sourceTotal;

  const elSource = document.getElementById('grade-calc-source-total');
  const elGraded = document.getElementById('grade-calc-graded-sum');
  const elDiff = document.getElementById('grade-calc-diff');

  if (elSource) elSource.textContent = sourceTotal.toLocaleString() + ' ตัว';
  if (elGraded) elGraded.textContent = grandTotalGraded.toLocaleString() + ' ตัว';

  if (elDiff) {
    if (diff === 0) {
      elDiff.textContent = 'ยอดตรงพอดี (0)';
      elDiff.className = 'font-bold text-emerald-600';
    } else if (diff > 0) {
      elDiff.textContent = `ยอดเกินมา +${diff.toLocaleString()} ตัว`;
      elDiff.className = 'font-bold text-amber-600';
    } else {
      elDiff.textContent = `ยังขาดอีก ${Math.abs(diff).toLocaleString()} ตัว`;
      elDiff.className = 'font-bold text-rose-600';
    }
  }
}

// บันทึกผลการคัดขนาดและการปรับสต็อก/ราคาอัตโนมัติ
function handleSaveGrading(e) {
  if (e) e.preventDefault();

  const sourcePondId = document.getElementById('grade-source-pond-select').value;
  const sourcePond = (state.ponds || []).find(p => p.id === sourcePondId);
  if (!sourcePond) return;

  const gradingDate = document.getElementById('grade-date-input').value || getTodayString();
  const sieveUsed = (document.getElementById('grade-sieve-input')?.value || document.getElementById('grade-sieve-select')?.value || '').trim();
  const mortalityQty = Number(document.getElementById('grade-mortality-input').value) || 0;
  const notes = document.getElementById('grade-notes-input').value.trim();

  const splitRows = document.querySelectorAll('#grade-splits-tbody tr');
  if (splitRows.length === 0) {
    showNotification('กรุณาระบุผลการคัดขนาดอย่างน้อย 1 รายการ', 'error');
    return;
  }

  const splits = [];
  let totalSplitsQty = 0;

  for (const row of splitRows) {
    const size = row.querySelector('.split-size-input').value.trim();
    const sieve = row.querySelector('.split-sieve-input').value.trim();
    const qty = Number(row.querySelector('.split-qty-input').value) || 0;
    const targetPondId = row.querySelector('.split-target-pond-select').value;
    const targetPond = (state.ponds || []).find(p => p.id === targetPondId);
    const unitPrice = Number(row.querySelector('.split-price-input').value) || 0;

    if (!size || qty <= 0) {
      showNotification('กรุณาระบุขนาดและจำนวนปลาให้ครบถ้วนทุกแถว', 'error');
      return;
    }

    totalSplitsQty += qty;
    splits.push({
      targetSize: size,
      sieveCode: sieve,
      qty,
      targetPondId,
      targetPondName: targetPond ? targetPond.name : targetPondId,
      newUnitPrice: unitPrice
    });
  }

  sourcePond.totalQty = 0;
  sourcePond.lastGradedDate = gradingDate;

  splits.forEach(s => {
    const targetPond = (state.ponds || []).find(p => p.id === s.targetPondId);
    if (!targetPond) return;

    if (targetPond.id === sourcePond.id) {
      targetPond.fishSize = s.targetSize;
      targetPond.sieveCode = s.sieveCode;
      targetPond.totalQty = (targetPond.totalQty || 0) + s.qty;
      if (s.newUnitPrice > 0) targetPond.unitPrice = s.newUnitPrice;
      targetPond.status = 'ready';
      targetPond.statusLabel = 'พร้อมขาย';
    } else {
      targetPond.fishId = sourcePond.fishId;
      targetPond.fishCode = sourcePond.fishCode;
      targetPond.fishName = sourcePond.fishName;
      targetPond.fishSize = s.targetSize;
      targetPond.sieveCode = s.sieveCode;
      targetPond.totalQty = (targetPond.totalQty || 0) + s.qty;
      if (s.newUnitPrice > 0) targetPond.unitPrice = s.newUnitPrice;
      targetPond.unitCost = sourcePond.unitCost;
      targetPond.status = 'ready';
      targetPond.statusLabel = 'พร้อมขาย';
      targetPond.lastGradedDate = gradingDate;
    }
  });

  if (mortalityQty > 0) {
    sourcePond.mortalityQty = (sourcePond.mortalityQty || 0) + mortalityQty;
    state.mortalityLogs.unshift({
      id: 'mort_' + Date.now(),
      date: gradingDate,
      pondId: sourcePond.id,
      pondName: `${sourcePond.name} (${sourcePond.fishName})`,
      qty: mortalityQty,
      cause: 'สูญเสียระหว่างการคัดขนาด/ช้ำน้ำ',
      reporter: `${state.currentUser.name} (${state.currentUser.role})`,
      actionTaken: 'แยกปลาที่อ่อนแอออก และสาดเกลือสมุทรฆ่าเชื้อ'
    });
  }

  const newGradingLog = {
    id: 'GRD-' + gradingDate.replace(/-/g, '') + '-' + String((state.gradingLogs || []).length + 1).padStart(3, '0'),
    date: gradingDate,
    sourcePondId: sourcePond.id,
    sourcePondName: sourcePond.name,
    fishName: sourcePond.fishName,
    originalSize: sourcePond.fishSize || '-',
    sieveUsed,
    initialQty: totalSplitsQty + mortalityQty,
    splits,
    mortalityQty,
    operator: `${state.currentUser.name} (${state.currentUser.role})`,
    notes: notes || 'คัดขนาดกระจายไซส์และปรับราคาขายอัตโนมัติ'
  };

  if (!state.gradingLogs) state.gradingLogs = [];
  state.gradingLogs.unshift(newGradingLog);

  if (state.systemEvents) {
    state.systemEvents.unshift({
      id: 'evt_' + Date.now(),
      timestamp: gradingDate + ' ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      source: 'Farm Inventory Agent',
      type: 'FISH_GRADED',
      severity: 'info',
      message: `คัดขนาด ${sourcePond.name} (${sourcePond.fishName}) จำนวน ${(totalSplitsQty + mortalityQty).toLocaleString()} ตัว กระจายออก ${splits.length} ไซส์ พร้อมอัปเดตสต็อกเรียบร้อย`,
      status: 'verified'
    });
  }

  saveInventoryState();
  closeModal('modal-grade-fish');
  renderInventoryView();
  showNotification(`บันทึกการคัดขนาด ${sourcePond.name} สำเร็จ กระจายผลเรียบร้อยแล้ว`, 'success');
}

// 5. INBOUND & PROCUREMENT SYSTEM (รับเข้าสินค้า & ใบรับสินค้า GRN ตามหมวดหมู่สินค้า)

function openInboundGrnModal(defaultCategory = 'พันธุ์ปลา') {
  const modal = document.getElementById('modal-inbound-grn');
  if (!modal) return;

  document.getElementById('inbound-date-input').value = getTodayString();
  document.getElementById('inbound-supplier-input').value = '';
  document.getElementById('inbound-qty-input').value = '';
  document.getElementById('inbound-cost-input').value = '';
  const priceInput = document.getElementById('inbound-price-input');
  if (priceInput) priceInput.value = '';
  document.getElementById('inbound-total-cost-display').textContent = '฿0.00';
  document.getElementById('inbound-notes-input').value = '';

  const pondSelect = document.getElementById('inbound-target-pond-select');
  if (pondSelect) {
    pondSelect.innerHTML = (state.ponds || []).map(p => `
      <option value="${p.id}">
        ${p.name} (${p.statusLabel} - ${p.fishName || 'ว่าง'})
      </option>
    `).join('');
  }

  const fishSelect = document.getElementById('inbound-fish-select');
  if (fishSelect && typeof PRODUCT_CATALOG !== 'undefined') {
    fishSelect.innerHTML = PRODUCT_CATALOG.filter(it => it.category === 'พันธุ์ปลา').map(f => `
      <option value="${f.name}">${f.name}</option>
    `).join('');
  }

  selectInboundCategory(defaultCategory || 'พันธุ์ปลา');

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function selectInboundCategory(category) {
  const isFish = category === 'พันธุ์ปลา' || category === 'fingerling';
  const normalizedCat = isFish ? 'พันธุ์ปลา' : category;

  const typeHidden = document.getElementById('inbound-type-hidden');
  if (typeHidden) typeHidden.value = isFish ? 'fingerling' : 'supply';

  const catHidden = document.getElementById('inbound-category-hidden');
  if (catHidden) catHidden.value = normalizedCat;

  const secFingerling = document.getElementById('inbound-sec-fingerling');
  const secSupply = document.getElementById('inbound-sec-supply');
  if (secFingerling) secFingerling.classList.toggle('hidden', !isFish);
  if (secSupply) secSupply.classList.toggle('hidden', isFish);

  // อัปเดตสถานะปุ่มหมวดหมู่ด้านบน
  document.querySelectorAll('#inbound-category-buttons .inbound-cat-btn').forEach(btn => {
    const btnCat = btn.getAttribute('data-cat');
    if (btnCat === normalizedCat) {
      btn.className = isFish
        ? 'inbound-cat-btn py-2 px-3 rounded-xl font-bold text-xs bg-sky-600 text-white shadow-xs flex items-center gap-1.5 justify-center transition'
        : 'inbound-cat-btn py-2 px-3 rounded-xl font-bold text-xs bg-emerald-600 text-white shadow-xs flex items-center gap-1.5 justify-center transition';
    } else {
      btn.className = 'inbound-cat-btn py-2 px-3 rounded-xl font-bold text-xs text-slate-600 hover:bg-emerald-50 border border-slate-200 bg-white flex items-center gap-1.5 justify-center transition';
    }
  });

  // ซิงค์ dropdown หมวดหมู่ใน Section B
  const catSelect = document.getElementById('inbound-supply-category-select');
  if (catSelect && !isFish) {
    catSelect.value = normalizedCat;
    populateInboundSupplyOptions(normalizedCat);
  }
}

function toggleInboundType(type) {
  if (type === 'fingerling') {
    selectInboundCategory('พันธุ์ปลา');
  } else {
    selectInboundCategory('อาหารปลา');
  }
}

function populateInboundSupplyOptions(category) {
  const supplySelect = document.getElementById('inbound-supply-select');
  if (!supplySelect) return;

  // รวมรายการจาก state.supplies และ PRODUCT_CATALOG ในหมวดหมู่ที่เลือก
  const matchingSupplies = (state.supplies || []).filter(s => s.category === category);
  const catalogMatches = (typeof PRODUCT_CATALOG !== 'undefined' ? PRODUCT_CATALOG : [])
    .filter(c => c.category === category && !matchingSupplies.some(s => s.name === c.name || c.name.includes(s.name)));

  const options = [];
  matchingSupplies.forEach(s => {
    options.push(`<option value="${s.id}">${s.name} (${s.packageSize || s.unit}) - คงเหลือ ${s.stockQty} ${s.unit}</option>`);
  });
  catalogMatches.forEach(c => {
    const size = (c.defaultSizes && c.defaultSizes[0]) || c.unit;
    options.push(`<option value="cat:${c.id}">${c.name} (${size})</option>`);
  });
  options.push(`<option value="__new__">+ เพิ่มรายการสินค้าใหม่ในหมวด "${category}"...</option>`);

  supplySelect.innerHTML = options.join('');
  onInboundSupplySelectChange(supplySelect.value);
}

function onInboundSupplySelectChange(val) {
  const newFields = document.getElementById('inbound-new-supply-fields');
  const priceInput = document.getElementById('inbound-price-input');
  const unitInput = document.getElementById('inbound-new-supply-unit');
  const cat = document.getElementById('inbound-category-hidden')?.value || 'อาหารปลา';

  if (val === '__new__') {
    if (newFields) newFields.classList.remove('hidden');
    if (unitInput) {
      if (cat === 'อาหารปลา' || cat === 'สารปรับสภาพน้ำ') unitInput.value = 'กระสอบ';
      else if (cat === 'ยารักษาโรคปลา') unitInput.value = 'ขวด';
      else if (cat === 'กระชังเลี้ยงปลา') unitInput.value = 'หลัง';
      else unitInput.value = 'ชิ้น';
    }
  } else {
    if (newFields) newFields.classList.add('hidden');
    if (val && val.startsWith('cat:')) {
      const catId = val.replace('cat:', '');
      const catItem = (typeof PRODUCT_CATALOG !== 'undefined' ? PRODUCT_CATALOG : []).find(c => c.id === catId);
      if (catItem && priceInput) priceInput.value = catItem.defaultPrice || '';
    } else {
      const sup = (state.supplies || []).find(s => s.id === val);
      if (sup && priceInput) priceInput.value = sup.unitPrice || '';
    }
  }
}

function calculateInboundCost() {
  const qty = Number(document.getElementById('inbound-qty-input')?.value) || 0;
  const unitCost = Number(document.getElementById('inbound-cost-input')?.value) || 0;
  const total = qty * unitCost;
  const el = document.getElementById('inbound-total-cost-display');
  if (el) el.textContent = '฿' + total.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function handleSaveInboundGrn(e) {
  if (e) e.preventDefault();

  const type = document.getElementById('inbound-type-hidden')?.value || 'fingerling';
  const category = document.getElementById('inbound-category-hidden')?.value || (type === 'fingerling' ? 'พันธุ์ปลา' : 'อาหารปลา');
  const date = document.getElementById('inbound-date-input').value || getTodayString();
  const supplier = document.getElementById('inbound-supplier-input').value.trim() || 'ซัพพลายเออร์ทั่วไป';
  const qty = Number(document.getElementById('inbound-qty-input').value) || 0;
  const unitCost = Number(document.getElementById('inbound-cost-input').value) || 0;
  const customSellPrice = Number(document.getElementById('inbound-price-input')?.value) || 0;
  const notes = document.getElementById('inbound-notes-input').value.trim();

  if (qty <= 0 || unitCost <= 0) {
    showNotification('กรุณาระบุจำนวนและต้นทุนต่อหน่วยให้ถูกต้อง', 'error');
    return;
  }

  const totalCost = qty * unitCost;
  const grnId = 'GRN-' + date.replace(/-/g, '') + '-' + String((state.grnList || []).length + 1).padStart(3, '0');

  let grnItem = null;
  let targetDestName = '';

  if (type === 'fingerling' || category === 'พันธุ์ปลา') {
    const fishName = document.getElementById('inbound-fish-select').value;
    const fishSize = document.getElementById('inbound-size-input').value.trim() || '1-1.5 นิ้ว (ล)';
    const sieveCode = document.getElementById('inbound-sieve-input').value.trim() || 'ล';
    const targetPondId = document.getElementById('inbound-target-pond-select').value;
    const pond = (state.ponds || []).find(p => p.id === targetPondId);

    if (pond) {
      pond.fishName = fishName;
      pond.fishSize = fishSize;
      pond.sieveCode = sieveCode;
      pond.totalQty = (pond.totalQty || 0) + qty;
      pond.unitCost = unitCost;
      pond.unitPrice = customSellPrice > 0
        ? customSellPrice
        : Math.max(pond.unitPrice || 0, Number((unitCost * 1.8).toFixed(2)));
      pond.status = 'ready';
      pond.statusLabel = 'พร้อมขาย';
      pond.lastGradedDate = date;
      targetDestName = pond.name;
    }

    grnItem = {
      category: 'พันธุ์ปลา',
      name: `ลูกปลา${fishName}`,
      size: fishSize,
      sieveCode,
      qty,
      unit: 'ตัว',
      unitCost,
      totalCost
    };
  } else {
    const supplySelectVal = document.getElementById('inbound-supply-select').value;
    let supply = null;

    if (supplySelectVal === '__new__') {
      const newName = document.getElementById('inbound-new-supply-name')?.value.trim();
      const newSize = document.getElementById('inbound-new-supply-size')?.value.trim() || '-';
      const newUnit = document.getElementById('inbound-new-supply-unit')?.value.trim() || 'ชิ้น';

      if (!newName) {
        showNotification('กรุณาระบุชื่อสินค้าใหม่ที่ต้องการนำเข้า', 'error');
        return;
      }

      supply = {
        id: 'sup_' + Date.now(),
        category,
        name: newName,
        packageSize: newSize,
        unit: newUnit,
        stockQty: qty,
        minThreshold: 5,
        unitPrice: customSellPrice > 0 ? customSellPrice : Number((unitCost * 1.25).toFixed(2)),
        supplier
      };
      if (!state.supplies) state.supplies = [];
      state.supplies.push(supply);
    } else if (supplySelectVal && supplySelectVal.startsWith('cat:')) {
      const catId = supplySelectVal.replace('cat:', '');
      const catItem = (typeof PRODUCT_CATALOG !== 'undefined' ? PRODUCT_CATALOG : []).find(c => c.id === catId);
      if (catItem) {
        supply = {
          id: 'sup_' + Date.now(),
          category: catItem.category || category,
          name: catItem.name,
          packageSize: (catItem.defaultSizes && catItem.defaultSizes[0]) || catItem.unit,
          unit: catItem.unit || 'ชิ้น',
          stockQty: qty,
          minThreshold: 5,
          unitPrice: customSellPrice > 0 ? customSellPrice : (catItem.defaultPrice || Number((unitCost * 1.25).toFixed(2))),
          supplier
        };
        if (!state.supplies) state.supplies = [];
        state.supplies.push(supply);
      }
    } else {
      supply = (state.supplies || []).find(s => s.id === supplySelectVal);
      if (supply) {
        supply.stockQty = (supply.stockQty || 0) + qty;
        supply.category = category || supply.category;
        if (customSellPrice > 0) {
          supply.unitPrice = customSellPrice;
        } else {
          supply.unitPrice = Math.max(supply.unitPrice || 0, Number((unitCost * 1.25).toFixed(2)));
        }
        if (supplier) supply.supplier = supplier;
      }
    }

    if (supply) {
      targetDestName = `คลัง${supply.category} (${supply.name})`;
      grnItem = {
        category: supply.category,
        name: supply.name,
        size: supply.packageSize || supply.unit,
        sieveCode: '-',
        qty,
        unit: supply.unit,
        unitCost,
        totalCost
      };
    }
  }

  const newGrn = {
    id: grnId,
    date,
    type,
    category,
    supplier,
    targetDestination: targetDestName,
    items: [grnItem],
    totalAmount: totalCost,
    financeStatus: 'submitted',
    receiverName: `${state.currentUser.name} (${state.currentUser.role})`,
    notes
  };

  if (!state.grnList) state.grnList = [];
  state.grnList.unshift(newGrn);

  if (state.systemEvents) {
    state.systemEvents.unshift({
      id: 'evt_' + Date.now(),
      timestamp: date + ' ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      source: 'Farm Inventory Agent',
      type: 'FINANCE_INBOUND_SUBMITTED',
      severity: 'info',
      message: `ออกใบรับสินค้า ${grnId} หมวด "${category}" จาก ${supplier} มูลค่า ฿${totalCost.toLocaleString()} ส่งยื่นเรื่องบัญชีต้นทุนเรียบร้อย`,
      status: 'verified'
    });
  }

  saveInventoryState();
  closeModal('modal-inbound-grn');
  renderInventoryView();
  if (typeof renderPosView === 'function') renderPosView();
  showNotification(`ออกใบรับสินค้า ${grnId} หมวด "${category}" เรียบร้อย สต็อกเข้าคลังและพร้อมขายใน POS แล้ว`, 'success');
  viewGrnDetail(grnId);
}

// 5.1 ดูรายละเอียดใบรับสินค้า GRN Slip
function viewGrnDetail(grnId) {
  const grn = (state.grnList || []).find(g => g.id === grnId);
  if (!grn) return;

  const modal = document.getElementById('modal-view-grn');
  if (!modal) return;

  document.getElementById('view-grn-id').textContent = grn.id;
  document.getElementById('view-grn-date').textContent = formatThaiDate(grn.date);
  document.getElementById('view-grn-supplier').textContent = grn.supplier || '-';
  document.getElementById('view-grn-destination').textContent = grn.targetDestination || '-';
  document.getElementById('view-grn-receiver').textContent = grn.receiverName || '-';
  document.getElementById('view-grn-total-amount').textContent = '฿' + Number(grn.totalAmount || 0).toLocaleString('th-TH', { minimumFractionDigits: 2 });
  document.getElementById('view-grn-notes').textContent = grn.notes || 'ตรวจรับสภาพสมบูรณ์ ครบถ้วนตามรายการ';

  const tbody = document.getElementById('view-grn-items-tbody');
  if (tbody) {
    tbody.innerHTML = (grn.items || []).map((it, idx) => `
      <tr class="border-b border-slate-100">
        <td class="p-2.5 text-center text-xs text-slate-400">${idx + 1}</td>
        <td class="p-2.5 font-bold text-sm text-slate-800">${it.name}</td>
        <td class="p-2.5 text-xs text-slate-600">${it.size}</td>
        <td class="p-2.5 text-right font-black text-sm text-slate-800">${Number(it.qty).toLocaleString()} ${it.unit}</td>
        <td class="p-2.5 text-right text-xs text-slate-700 font-semibold">฿${Number(it.unitCost).toFixed(2)}</td>
        <td class="p-2.5 text-right font-bold text-sm text-sky-900">฿${Number(it.totalCost).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
      </tr>
    `).join('');
  }

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function printGrn(grnId) {
  viewGrnDetail(grnId);
  setTimeout(() => {
    window.print();
  }, 300);
}

// 6. MODALS & USER ACTIONS

// 4.1 ระบบจัดการปลาตาย / ปลาหาย (FISH MORTALITY & LOSS TRACKING)
let currentFishLossPeriod = 'day'; // 'day' | 'month' | 'year' | 'all'

function initFishLossFilters() {
  const dateInput = document.getElementById('fishloss-filter-date');
  if (dateInput && !dateInput.value) {
    dateInput.value = getTodayString();
  }

  const monthInput = document.getElementById('fishloss-filter-month');
  if (monthInput && !monthInput.value) {
    monthInput.value = getTodayString().slice(0, 7);
  }

  const yearSelect = document.getElementById('fishloss-filter-year');
  if (yearSelect && yearSelect.options.length <= 1) {
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1, currentYear - 2, currentYear + 1];
    yearSelect.innerHTML = years.map(y => `
      <option value="${y}" ${y === currentYear ? 'selected' : ''}>พ.ศ. ${y + 543} (${y})</option>
    `).join('');
  }

  const pondSelect = document.getElementById('fishloss-filter-pond');
  if (pondSelect && pondSelect.options.length <= 1) {
    const ponds = state.ponds || [];
    pondSelect.innerHTML = '<option value="all">ทุกบ่อ / ทุกสายพันธุ์</option>' + 
      ponds.map(p => `<option value="${p.id}">${p.name} - ${p.fishName || 'ว่าง'}</option>`).join('');
  }
}

function setFishLossPeriod(period) {
  currentFishLossPeriod = period;

  ['day', 'month', 'year', 'all'].forEach(p => {
    const btn = document.getElementById(`btn-fishloss-period-${p}`);
    if (btn) {
      if (p === period) {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition bg-rose-600 text-white shadow-xs';
      } else {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition text-slate-600 hover:text-slate-900';
      }
    }
  });

  const dayContainer = document.getElementById('fishloss-picker-day-container');
  const monthContainer = document.getElementById('fishloss-picker-month-container');
  const yearContainer = document.getElementById('fishloss-picker-year-container');

  if (dayContainer) dayContainer.classList.toggle('hidden', period !== 'day');
  if (monthContainer) monthContainer.classList.toggle('hidden', period !== 'month');
  if (yearContainer) yearContainer.classList.toggle('hidden', period !== 'year');

  renderFishLossSection();
}

function setFishLossFilterToday() {
  const dateInput = document.getElementById('fishloss-filter-date');
  if (dateInput) dateInput.value = getTodayString();
  renderFishLossSection();
}

function setFishLossFilterThisMonth() {
  const monthInput = document.getElementById('fishloss-filter-month');
  if (monthInput) monthInput.value = getTodayString().slice(0, 7);
  renderFishLossSection();
}

function renderFishLossSection() {
  initFishLossFilters();

  const period = currentFishLossPeriod;
  const dateVal = document.getElementById('fishloss-filter-date')?.value || getTodayString();
  const monthVal = document.getElementById('fishloss-filter-month')?.value || getTodayString().slice(0, 7);
  const yearVal = document.getElementById('fishloss-filter-year')?.value || new Date().getFullYear().toString();
  const pondVal = document.getElementById('fishloss-filter-pond')?.value || 'all';
  const searchVal = (document.getElementById('fishloss-search-input')?.value || '').trim().toLowerCase();

  const allLogs = state.mortalityLogs || [];

  // Filter logs according to user selection
  const filteredLogs = allLogs.filter(log => {
    if (period === 'day' && log.date !== dateVal) return false;
    if (period === 'month' && !log.date.startsWith(monthVal)) return false;
    if (period === 'year' && !log.date.startsWith(yearVal)) return false;

    if (pondVal !== 'all' && log.pondId !== pondVal) return false;

    if (searchVal) {
      const combined = `${log.pondName || ''} ${log.fishName || ''} ${log.deadCause || ''} ${log.lostCause || ''} ${log.cause || ''} ${log.actionTaken || ''} ${log.reporter || ''}`.toLowerCase();
      if (!combined.includes(searchVal)) return false;
    }

    return true;
  });

  // Calculate KPI totals
  let totalDead = 0;
  let totalLost = 0;
  let totalValue = 0;

  filteredLogs.forEach(l => {
    const dead = l.deadQty !== undefined ? Number(l.deadQty) : (l.lostQty !== undefined ? 0 : Number(l.qty || 0));
    const lost = l.lostQty !== undefined ? Number(l.lostQty) : 0;
    const pond = (state.ponds || []).find(p => p.id === l.pondId);
    const price = l.unitPrice || (pond ? pond.unitPrice : 0) || 0;

    totalDead += dead;
    totalLost += lost;
    totalValue += (dead + lost) * price;
  });

  const totalLoss = totalDead + totalLost;

  // Update KPI cards
  const elDead = document.getElementById('fishloss-kpi-dead');
  const elLost = document.getElementById('fishloss-kpi-lost');
  const elTotal = document.getElementById('fishloss-kpi-total');
  const elValue = document.getElementById('fishloss-kpi-value');

  if (elDead) elDead.textContent = totalDead.toLocaleString() + ' ตัว';
  if (elLost) elLost.textContent = totalLost.toLocaleString() + ' ตัว';
  if (elTotal) elTotal.textContent = totalLoss.toLocaleString() + ' ตัว';
  if (elValue) elValue.textContent = '฿' + Math.round(totalValue).toLocaleString();

  // Subtitle info
  let periodText = '';
  if (period === 'day') periodText = `วันที่ ${formatThaiDate(dateVal)}`;
  else if (period === 'month') {
    const parts = monthVal.split('-');
    const mNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    const mIdx = parseInt(parts[1] || '1', 10) - 1;
    const yr = parseInt(parts[0] || '2026', 10) + 543;
    periodText = `ประจำเดือน ${mNames[mIdx]} ${yr}`;
  } else if (period === 'year') {
    periodText = `ประจำปี พ.ศ. ${parseInt(yearVal, 10) + 543}`;
  } else {
    periodText = 'บันทึกประวัติทั้งหมด';
  }

  const subEl = document.getElementById('fishloss-table-subtitle');
  if (subEl) subEl.textContent = `แสดงสรุปข้อมูลช่วง: ${periodText} (${filteredLogs.length} รายการ)`;

  const badgeEl = document.getElementById('fishloss-records-badge');
  if (badgeEl) badgeEl.textContent = `${filteredLogs.length} รายการ`;

  // Render Table Rows
  const tbody = document.getElementById('fishloss-table-body');
  if (tbody) {
    if (filteredLogs.length === 0) {
      tbody.innerHTML = `<tr><td colspan="11" class="text-center py-12 text-slate-400 font-semibold">ไม่พบรายการปลาตาย/หาย ในช่วงเวลาที่เลือก (${periodText})</td></tr>`;
    } else {
      tbody.innerHTML = filteredLogs.map(log => {
        const dead = log.deadQty !== undefined ? Number(log.deadQty) : (log.lostQty !== undefined ? 0 : Number(log.qty || 0));
        const lost = log.lostQty !== undefined ? Number(log.lostQty) : 0;
        const total = dead + lost || log.qty || 0;
        const pond = (state.ponds || []).find(p => p.id === log.pondId);
        const price = log.unitPrice || (pond ? pond.unitPrice : 0) || 0;
        const val = total * price;

        const deadCause = log.deadCause || (dead > 0 ? (log.cause || 'ทั่วไป') : '-');
        const lostCause = log.lostCause || (lost > 0 ? (log.cause || 'ไม่ทราบสาเหตุ') : '-');

        return `
          <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
            <td class="p-3.5 text-xs text-slate-600 font-semibold whitespace-nowrap">${formatThaiDate(log.date)}</td>
            <td class="p-3.5">
              <div class="font-bold text-sm text-slate-800">${log.pondName || '-'}</div>
              <div class="text-[11px] text-slate-500">${log.fishName || (pond ? pond.fishName : 'ปลา')} ${log.fishSize ? `(${log.fishSize})` : ''}</div>
            </td>
            <td class="p-3.5 text-center font-bold text-sm ${dead > 0 ? 'text-rose-600' : 'text-slate-400'}">
              ${dead > 0 ? dead.toLocaleString() + ' ตัว' : '-'}
            </td>
            <td class="p-3.5 text-xs text-slate-700 max-w-xs">
              ${dead > 0 ? `<span class="inline-block px-2 py-0.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 font-semibold">${deadCause}</span>` : '<span class="text-slate-300">-</span>'}
            </td>
            <td class="p-3.5 text-center font-bold text-sm ${lost > 0 ? 'text-amber-600' : 'text-slate-400'}">
              ${lost > 0 ? lost.toLocaleString() + ' ตัว' : '-'}
            </td>
            <td class="p-3.5 text-xs text-slate-700 max-w-xs">
              ${lost > 0 ? `<span class="inline-block px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-semibold">${lostCause}</span>` : '<span class="text-slate-300">-</span>'}
            </td>
            <td class="p-3.5 text-center font-black text-sm text-slate-800">
              ${total.toLocaleString()} ตัว
            </td>
            <td class="p-3.5 text-right font-bold text-xs text-rose-700 whitespace-nowrap">
              ฿${Math.round(val).toLocaleString()}
            </td>
            <td class="p-3.5 text-xs text-emerald-800 bg-emerald-50/40 rounded-lg max-w-xs font-medium">
              ${log.actionTaken || '-'}
            </td>
            <td class="p-3.5 text-xs text-slate-500 whitespace-nowrap">
              ${log.reporter || '-'}
            </td>
            <td class="p-3 text-center whitespace-nowrap">
              <button onclick="deleteFishLossLog('${log.id}')" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="ลบรายการนี้และคืนยอดปลาเข้าบ่อ">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // Also sync existing history section mortality table if visible
  renderMortalityLogs();
  if (window.lucide) lucide.createIcons();
}

// 4.2 EXPORT FISH LOSS TO EXCEL (.xlsx)
function exportFishLossToExcel() {
  try {
    if (typeof XLSX === 'undefined') {
      alert('ไม่พบไลบรารี SheetJS (XLSX) กรุณารีเฟรชหน้าจอ');
      return;
    }

    const period = currentFishLossPeriod;
    const dateVal = document.getElementById('fishloss-filter-date')?.value || getTodayString();
    const monthVal = document.getElementById('fishloss-filter-month')?.value || getTodayString().slice(0, 7);
    const yearVal = document.getElementById('fishloss-filter-year')?.value || new Date().getFullYear().toString();
    const pondVal = document.getElementById('fishloss-filter-pond')?.value || 'all';

    let periodLabel = '';
    if (period === 'day') periodLabel = `รายวัน (วันที่ ${formatThaiDate(dateVal)})`;
    else if (period === 'month') {
      const parts = monthVal.split('-');
      const mNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
      const mIdx = parseInt(parts[1] || '1', 10) - 1;
      const yr = parseInt(parts[0] || '2026', 10) + 543;
      periodLabel = `รายเดือน (${mNames[mIdx]} พ.ศ. ${yr})`;
    } else if (period === 'year') {
      periodLabel = `รายปี (พ.ศ. ${parseInt(yearVal, 10) + 543})`;
    } else {
      periodLabel = 'ประวัติทั้งหมด';
    }

    const logs = (state.mortalityLogs || []).filter(log => {
      if (period === 'day' && log.date !== dateVal) return false;
      if (period === 'month' && !log.date.startsWith(monthVal)) return false;
      if (period === 'year' && !log.date.startsWith(yearVal)) return false;
      if (pondVal !== 'all' && log.pondId !== pondVal) return false;
      return true;
    });

    if (logs.length === 0) {
      showNotification('ไม่มีรายการข้อมูลตามเงื่อนไขที่เลือกเพื่อส่งออก Excel', 'error');
      return;
    }

    let sumDead = 0;
    let sumLost = 0;
    let sumVal = 0;

    const detailRows = logs.map((l, idx) => {
      const dead = l.deadQty !== undefined ? Number(l.deadQty) : (l.lostQty !== undefined ? 0 : Number(l.qty || 0));
      const lost = l.lostQty !== undefined ? Number(l.lostQty) : 0;
      const pond = (state.ponds || []).find(p => p.id === l.pondId);
      const price = l.unitPrice || (pond ? pond.unitPrice : 0) || 0;
      const total = dead + lost;
      const val = total * price;

      sumDead += dead;
      sumLost += lost;
      sumVal += val;

      return {
        'ลำดับ': idx + 1,
        'วันที่': l.date,
        'บ่อเลี้ยง': l.pondName || '-',
        'สายพันธุ์ปลา': l.fishName || (pond ? pond.fishName : '-'),
        'จำนวนปลาตาย (ตัว)': dead,
        'สาเหตุการตาย': l.deadCause || (dead > 0 ? (l.cause || 'ทั่วไป') : '-'),
        'จำนวนปลาหาย (ตัว)': lost,
        'สาเหตุการหาย': l.lostCause || (lost > 0 ? (l.cause || 'ไม่ทราบสาเหตุ') : '-'),
        'รวมสูญเสีย (ตัว)': total,
        'ราคาประเมิน/ตัว (บาท)': price,
        'มูลค่าความสูญเสีย (บาท)': val,
        'การแก้ไข / มาตรการ': l.actionTaken || '-',
        'ผู้บันทึก': l.reporter || '-'
      };
    });

    const summaryRows = [
      { 'หัวข้อสรุป': 'ชื่อฟาร์ม', 'รายละเอียด': 'บจก.สุทธิ์ อินเตอร์ฟาร์ม (ฟาร์มปลาผู้ใหญ่พร)' },
      { 'หัวข้อสรุป': 'ช่วงเวลาสรุปข้อมูล', 'รายละเอียด': periodLabel },
      { 'หัวข้อสรุป': 'วันที่ออกรายงาน', 'รายละเอียด': formatThaiDate(getTodayString()) },
      { 'หัวข้อสรุป': 'จำนวนรายการบันทึกทั้งหมด', 'รายละเอียด': `${logs.length} รายการ` },
      { 'หัวข้อสรุป': 'รวมปลาตายทั้งหมด (ตัว)', 'รายละเอียด': sumDead },
      { 'หัวข้อสรุป': 'รวมปลาหายทั้งหมด (ตัว)', 'รายละเอียด': sumLost },
      { 'หัวข้อสรุป': 'รวมสูญเสียทั้งหมด (ตัว)', 'รายละเอียด': sumDead + sumLost },
      { 'หัวข้อสรุป': 'รวมมูลค่าความสูญเสียประเมิน (บาท)', 'รายละเอียด': sumVal },
      { 'หัวข้อสรุป': 'ผู้ออกรายงาน', 'รายละเอียด': state.currentUser ? `${state.currentUser.name} (${state.currentUser.role})` : 'ระบบจัดการสต็อก' }
    ];

    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.json_to_sheet(detailRows);
    const ws2 = XLSX.utils.json_to_sheet(summaryRows);

    XLSX.utils.book_append_sheet(wb, ws1, 'รายการปลาตายและหาย');
    XLSX.utils.book_append_sheet(wb, ws2, 'สรุปภาพรวม');

    XLSX.writeFile(wb, `รายงานปลาตายและหาย_${period}_${getTodayString()}.xlsx`);
    showNotification('ส่งออกไฟล์ Excel สำเร็จแล้ว', 'success');
  } catch (err) {
    console.error('Export fish loss error:', err);
    alert('เกิดข้อผิดพลาดในการส่งออก Excel: ' + err.message);
  }
}

// 4.3 MODAL & ACTIONS FOR FISH LOSS
function openRecordFishLossModal(pondId = null) {
  const modal = document.getElementById('modal-record-mortality');
  if (!modal) return;

  const select = document.getElementById('mortality-pond-select');
  if (select) {
    select.innerHTML = (state.ponds || []).map(p => `
      <option value="${p.id}" ${pondId && p.id === pondId ? 'selected' : ''}>
        ${p.name} - ${p.fishName || 'ว่าง'} (${Number(p.totalQty || 0).toLocaleString()} ตัว)
      </option>
    `).join('');
  }

  const defaultPondId = pondId || (state.ponds && state.ponds.length > 0 ? state.ponds[0].id : '');
  if (select && defaultPondId) {
    select.value = defaultPondId;
  }
  onMortalityPondSelectChange();

  const dateInput = document.getElementById('mortality-date-input');
  if (dateInput) dateInput.value = getTodayString();

  const deadInput = document.getElementById('mortality-dead-qty-input');
  if (deadInput) deadInput.value = '0';

  const lostInput = document.getElementById('mortality-lost-qty-input');
  if (lostInput) lostInput.value = '0';

  const deadCauseSel = document.getElementById('mortality-dead-cause-select');
  if (deadCauseSel) deadCauseSel.value = 'สภาพอากาศร้อนจัด / น็อกน้ำ';
  const deadCustom = document.getElementById('mortality-dead-cause-custom');
  if (deadCustom) {
    deadCustom.value = '';
    deadCustom.classList.add('hidden');
  }

  const lostCauseSel = document.getElementById('mortality-lost-cause-select');
  if (lostCauseSel) lostCauseSel.value = 'ปลาโดดออกจากกระชัง / บ่อเลี้ยง';
  const lostCustom = document.getElementById('mortality-lost-cause-custom');
  if (lostCustom) {
    lostCustom.value = '';
    lostCustom.classList.add('hidden');
  }

  const actionInput = document.getElementById('mortality-action-input');
  if (actionInput) actionInput.value = '';

  calcFishLossModalTotal();
  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function openRecordMortalityModal(pondId) {
  openRecordFishLossModal(pondId);
}

function onMortalityPondSelectChange() {
  const pondId = document.getElementById('mortality-pond-select')?.value;
  const pond = (state.ponds || []).find(p => p.id === pondId);
  if (!pond) return;

  const idInput = document.getElementById('mortality-pond-id');
  if (idInput) idInput.value = pond.id;

  const nameEl = document.getElementById('mortality-pond-name');
  if (nameEl) nameEl.textContent = `${pond.name} (${pond.fishName || 'ปลา'} ${pond.fishSize || ''})`;

  const qtyEl = document.getElementById('mortality-current-qty');
  if (qtyEl) qtyEl.textContent = Number(pond.totalQty || 0).toLocaleString() + ' ตัว';
}

function onMortalityCauseChange(type) {
  if (type === 'dead') {
    const sel = document.getElementById('mortality-dead-cause-select')?.value;
    const custom = document.getElementById('mortality-dead-cause-custom');
    if (custom) custom.classList.toggle('hidden', sel !== 'other');
  } else if (type === 'lost') {
    const sel = document.getElementById('mortality-lost-cause-select')?.value;
    const custom = document.getElementById('mortality-lost-cause-custom');
    if (custom) custom.classList.toggle('hidden', sel !== 'other');
  }
}

function calcFishLossModalTotal() {
  const dead = Number(document.getElementById('mortality-dead-qty-input')?.value || 0);
  const lost = Number(document.getElementById('mortality-lost-qty-input')?.value || 0);
  const total = Math.max(0, dead) + Math.max(0, lost);
  const el = document.getElementById('mortality-modal-total-qty');
  if (el) el.textContent = total.toLocaleString();
}

function handleSaveFishLoss(e) {
  if (e) e.preventDefault();
  const pondId = document.getElementById('mortality-pond-id')?.value;
  const dateStr = document.getElementById('mortality-date-input')?.value || getTodayString();
  const deadQty = Math.max(0, Number(document.getElementById('mortality-dead-qty-input')?.value || 0));
  const lostQty = Math.max(0, Number(document.getElementById('mortality-lost-qty-input')?.value || 0));
  const totalLoss = deadQty + lostQty;

  if (totalLoss <= 0) {
    showNotification('กรุณาระบุจำนวนปลาที่ตายหรือปลาที่หายอย่างน้อย 1 ตัว', 'error');
    return;
  }

  const pond = (state.ponds || []).find(p => p.id === pondId);
  if (!pond) {
    showNotification('ไม่พบบ่อปลาที่เลือก', 'error');
    return;
  }

  // Determine dead cause
  let deadCause = '-';
  if (deadQty > 0) {
    const deadSel = document.getElementById('mortality-dead-cause-select')?.value;
    if (deadSel === 'other') {
      deadCause = document.getElementById('mortality-dead-cause-custom')?.value.trim() || 'สาเหตุอื่นๆ';
    } else {
      deadCause = deadSel || 'สาเหตุทั่วไป';
    }
  }

  // Determine lost cause
  let lostCause = '-';
  if (lostQty > 0) {
    const lostSel = document.getElementById('mortality-lost-cause-select')?.value;
    if (lostSel === 'other') {
      lostCause = document.getElementById('mortality-lost-cause-custom')?.value.trim() || 'สูญหายไม่ทราบสาเหตุ';
    } else {
      lostCause = lostSel || 'สูญหายทั่วไป';
    }
  }

  const actionTaken = document.getElementById('mortality-action-input')?.value.trim() || 'ตรวจสอบและเฝ้าระวัง';
  const unitPrice = pond.unitPrice || 0;
  const lossValue = totalLoss * unitPrice;

  // Deduct from pond stock
  pond.totalQty = Math.max(0, (pond.totalQty || 0) - totalLoss);
  pond.mortalityQty = (pond.mortalityQty || 0) + totalLoss;

  const newLog = {
    id: 'mort_' + Date.now(),
    date: dateStr,
    pondId: pond.id,
    pondName: pond.name,
    fishName: pond.fishName || 'ปลา',
    fishSize: pond.fishSize || '-',
    deadQty: deadQty,
    deadCause: deadCause,
    lostQty: lostQty,
    lostCause: lostCause,
    qty: totalLoss,
    unitPrice: unitPrice,
    lossValue: lossValue,
    cause: deadQty > 0 ? deadCause : lostCause,
    reporter: state.currentUser ? `${state.currentUser.name} (${state.currentUser.role})` : 'พนักงานฟาร์ม',
    actionTaken: actionTaken,
    createdAt: new Date().toISOString()
  };

  if (!state.mortalityLogs) state.mortalityLogs = [];
  state.mortalityLogs.unshift(newLog);

  // Send Event to AI Supervisor
  if (state.systemEvents) {
    state.systemEvents.unshift({
      id: 'evt_' + Date.now(),
      timestamp: getTodayString() + ' ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      source: 'Farm Inventory Agent',
      type: 'MORTALITY_LOGGED',
      severity: totalLoss > 200 ? 'warning' : 'info',
      message: `บันทึกปลาตาย/หายใน ${pond.name} รวม ${totalLoss.toLocaleString()} ตัว (ตาย: ${deadQty}, หาย: ${lostQty})`,
      status: 'verified'
    });
  }

  saveInventoryState();
  closeModal('modal-record-mortality');
  renderInventoryView();
  renderFishLossSection();
  showNotification(`บันทึกปลาตาย ${deadQty.toLocaleString()} ตัว และปลาหาย ${lostQty.toLocaleString()} ตัว เรียบร้อยแล้ว`, 'success');
}

function handleSaveMortality(e) {
  handleSaveFishLoss(e);
}

function deleteFishLossLog(logId) {
  const logIndex = (state.mortalityLogs || []).findIndex(l => l.id === logId);
  if (logIndex === -1) return;
  const log = state.mortalityLogs[logIndex];

  const dead = log.deadQty !== undefined ? Number(log.deadQty) : (log.lostQty !== undefined ? 0 : Number(log.qty || 0));
  const lost = log.lostQty !== undefined ? Number(log.lostQty) : 0;
  const total = dead + lost || log.qty || 0;

  if (!confirm(`ยืนยันลบรายการบันทึกนี้ใช่หรือไม่?\n\nบ่อ: ${log.pondName}\nสูญเสียรวม: ${total.toLocaleString()} ตัว (ปลาตาย ${dead}, ปลาหาย ${lost})\n\n* ระบบจะคืนยอดปลา ${total.toLocaleString()} ตัว กลับเข้าสู่บ่อเดิมอัตโนมัติ`)) {
    return;
  }

  // Restore pond stock
  const pond = (state.ponds || []).find(p => p.id === log.pondId);
  if (pond) {
    pond.totalQty = (pond.totalQty || 0) + total;
    if (pond.mortalityQty) {
      pond.mortalityQty = Math.max(0, pond.mortalityQty - total);
    }
  }

  state.mortalityLogs.splice(logIndex, 1);
  saveInventoryState();
  renderInventoryView();
  renderFishLossSection();
  showNotification('ลบรายการและคืนยอดปลาเข้าบ่อเรียบร้อยแล้ว', 'success');
}

// Global attachments
window.setFishLossPeriod = setFishLossPeriod;
window.setFishLossFilterToday = setFishLossFilterToday;
window.setFishLossFilterThisMonth = setFishLossFilterThisMonth;
window.renderFishLossSection = renderFishLossSection;
window.exportFishLossToExcel = exportFishLossToExcel;
window.openRecordFishLossModal = openRecordFishLossModal;
window.openRecordMortalityModal = openRecordMortalityModal;
window.onMortalityPondSelectChange = onMortalityPondSelectChange;
window.onMortalityCauseChange = onMortalityCauseChange;
window.calcFishLossModalTotal = calcFishLossModalTotal;
window.handleSaveFishLoss = handleSaveFishLoss;
window.handleSaveMortality = handleSaveFishLoss;
window.deleteFishLossLog = deleteFishLossLog;

// 4.2 Modal เบิกใช้ / รับเข้าสินค้า
function openSupplyTransactionModal(supplyId, type) {
  const supply = (state.supplies || []).find(s => s.id === supplyId);
  if (!supply) return;

  const modal = document.getElementById('modal-supply-transaction');
  if (!modal) return;

  document.getElementById('supply-tx-id').value = supply.id;
  document.getElementById('supply-tx-type').value = type;
  document.getElementById('supply-tx-title').textContent = type === 'consume' ? '📦 บันทึกเบิกใช้วัตถุดิบ/อาหารปลา' : '📥 บันทึกรับเข้าสินค้า/อาหารปลา';
  document.getElementById('supply-tx-name').textContent = supply.name;
  document.getElementById('supply-tx-current').textContent = `${supply.stockQty} ${supply.unit}`;
  document.getElementById('supply-tx-qty').value = '';
  document.getElementById('supply-tx-note').value = '';

  const btnSubmit = document.getElementById('btn-supply-tx-submit');
  if (btnSubmit) {
    btnSubmit.className = type === 'consume' ? 'btn-large bg-amber-500 hover:bg-amber-600 text-white font-bold w-full' : 'btn-large btn-primary-blue font-bold w-full';
    btnSubmit.innerHTML = type === 'consume' ? '<i data-lucide="minus-circle" class="w-4 h-4"></i> <span>ยืนยันการเบิกใช้</span>' : '<i data-lucide="plus-circle" class="w-4 h-4"></i> <span>ยืนยันรับเข้าคลัง</span>';
  }

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function handleSaveSupplyTransaction(e) {
  if (e) e.preventDefault();
  const supplyId = document.getElementById('supply-tx-id').value;
  const type = document.getElementById('supply-tx-type').value;
  const qty = Number(document.getElementById('supply-tx-qty').value);
  const note = document.getElementById('supply-tx-note').value.trim();

  if (!qty || qty <= 0) {
    showNotification('กรุณาระบุจำนวนที่ถูกต้อง', 'error');
    return;
  }

  const supply = (state.supplies || []).find(s => s.id === supplyId);
  if (!supply) return;

  if (type === 'consume') {
    if (qty > supply.stockQty) {
      showNotification(`สต็อกมีเพียง ${supply.stockQty} ${supply.unit} ไม่พอให้เบิก`, 'error');
      return;
    }
    supply.stockQty -= qty;

    // ตรวจสอบ Re-order point
    if (supply.stockQty <= supply.minThreshold) {
      state.systemEvents.unshift({
        id: 'evt_' + Date.now(),
        timestamp: getTodayString() + ' ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        source: 'Farm Inventory Agent',
        type: 'STOCK_ALERT_LOW',
        severity: 'warning',
        message: `🚨 ${supply.name} เหลือ ${supply.stockQty} ${supply.unit} (ต่ำกว่าจุดสั่งซื้อขั้นต่ำ ${supply.minThreshold} ${supply.unit})`,
        status: 'action_required'
      });
    }
  } else {
    supply.stockQty += qty;
  }

  saveInventoryState();
  closeModal('modal-supply-transaction');
  renderInventoryView();
  showNotification(type === 'consume' ? `เบิกใช้ ${qty} ${supply.unit} สำเร็จ` : `รับเข้า ${qty} ${supply.unit} เข้าคลังสำเร็จ`, 'success');
}

// 6.3 Modal ปรับสถานะ / แก้ไขบ่อปลา
function openEditPondModal(pondId) {
  const pond = (state.ponds || []).find(p => p.id === pondId);
  if (!pond) return;

  const modal = document.getElementById('modal-edit-pond');
  if (!modal) return;

  document.getElementById('edit-pond-id').value = pond.id;
  document.getElementById('edit-pond-name').value = pond.name;
  document.getElementById('edit-pond-status').value = pond.status;
  document.getElementById('edit-pond-total-qty').value = pond.totalQty || 0;
  document.getElementById('edit-pond-fish-name').value = pond.fishName || '';
  document.getElementById('edit-pond-fish-size').value = pond.fishSize || '';
  
  const elSieve = document.getElementById('edit-pond-sieve');
  if (elSieve) elSieve.value = pond.sieveCode || '';
  const elPrice = document.getElementById('edit-pond-unit-price');
  if (elPrice) elPrice.value = pond.unitPrice || 0;
  const elGraded = document.getElementById('edit-pond-last-graded');
  if (elGraded) elGraded.value = pond.lastGradedDate || '';
  
  document.getElementById('edit-pond-notes').value = pond.notes || '';

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function handleSaveEditPond(e) {
  if (e) e.preventDefault();
  const pondId = document.getElementById('edit-pond-id').value;
  const pond = (state.ponds || []).find(p => p.id === pondId);
  if (!pond) return;

  pond.name = document.getElementById('edit-pond-name').value.trim();
  pond.status = document.getElementById('edit-pond-status').value;
  pond.totalQty = Number(document.getElementById('edit-pond-total-qty').value) || 0;
  pond.fishName = document.getElementById('edit-pond-fish-name').value.trim();
  pond.fishSize = document.getElementById('edit-pond-fish-size').value.trim();
  
  const elSieve = document.getElementById('edit-pond-sieve');
  if (elSieve) pond.sieveCode = elSieve.value.trim();
  const elPrice = document.getElementById('edit-pond-unit-price');
  if (elPrice) pond.unitPrice = Number(elPrice.value) || 0;
  const elGraded = document.getElementById('edit-pond-last-graded');
  if (elGraded) pond.lastGradedDate = elGraded.value;
  
  pond.notes = document.getElementById('edit-pond-notes').value.trim();

  const labels = { ready: 'พร้อมขาย', growing: 'กำลังอนุบาล', resting: 'พักบ่อ / ตากบ่อ', empty: 'บ่อว่าง', sick: 'ปลาป่วย / งดขาย' };
  pond.statusLabel = labels[pond.status] || pond.status;

  saveInventoryState();
  closeModal('modal-edit-pond');
  renderInventoryView();
  showNotification(`อัปเดตข้อมูล ${pond.name} สำเร็จ`, 'success');
}

// 7. BADGES UPDATE
function updateInventoryBadges() {
  const lowStockCount = (state.supplies || []).filter(s => s.stockQty <= s.minThreshold).length;
  const totalAlerts = lowStockCount;

  const badge = document.getElementById('badge-inventory-alert');
  if (badge) {
    badge.textContent = totalAlerts;
    badge.classList.toggle('hidden', totalAlerts === 0);
  }
}

// 8. EXPORT & IMPORT INVENTORY EXCEL (.xlsx)
function exportInventoryToExcel() {
  try {
    if (typeof XLSX === 'undefined') {
      showNotification('ไม่พบไลบรารี SheetJS (XLSX) กรุณารีเฟรชหน้าจอ', 'error');
      return;
    }

    if (!state.ponds || state.ponds.length === 0) initInventoryState();
    const statusTextMap = {
      ready: 'พร้อมขาย',
      growing: 'กำลังอนุบาล',
      resting: 'พักบ่อ / ตากบ่อ',
      empty: 'บ่อว่าง',
      sick: 'ปลาป่วย / งดขาย'
    };

    const pondRows = (state.ponds || []).slice().sort(sortPondsByZoneAndCode).map(p => ({
      'รหัสบ่อ': p.id || '',
      'ชื่อกระชัง/อ่าง': p.name || '',
      'โซน': p.zoneName || p.typeName || '',
      'พันธุ์ปลา': p.fishName || '',
      'ขนาด': p.fishSize || '',
      'ตาคัด': p.sieveCode || '',
      'จำนวนคงเหลือ': Number(p.totalQty || 0),
      'ติดจอง': Number(p.reservedQty || 0),
      'พร้อมขายจริง': p.status === 'ready' ? Math.max(0, Number(p.totalQty || 0) - Number(p.reservedQty || 0)) : 0,
      'ราคาต่อตัว': Number(p.unitPrice || 0),
      'สถานะ': statusTextMap[p.status] || p.statusLabel || p.status || '',
      'หมายเหตุ': p.notes || ''
    }));

    const supplyRows = (state.supplies || []).map(s => ({
      'รหัสสินค้า': s.id || '',
      'หมวดหมู่': s.category || '',
      'ชื่อสินค้า': s.name || '',
      'คงเหลือ': Number(s.stockQty || 0),
      'หน่วย': s.unit || '',
      'จุดสั่งซื้อ (ROP)': Number(s.minThreshold || 0),
      'ราคาต่อหน่วย': Number(s.unitPrice || 0)
    }));

    const wb = XLSX.utils.book_new();
    const wsPonds = XLSX.utils.json_to_sheet(pondRows);
    XLSX.utils.book_append_sheet(wb, wsPonds, 'สต็อกปลาในฟาร์ม');
    if (supplyRows.length > 0) {
      const wsSupplies = XLSX.utils.json_to_sheet(supplyRows);
      XLSX.utils.book_append_sheet(wb, wsSupplies, 'คลังอาหารและเวชภัณฑ์');
    }

    const dateStr = typeof getTodayString === 'function' ? getTodayString() : new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `สต็อกปลาในฟาร์ม_ผู้ใหญ่พร_${dateStr}.xlsx`);
    showNotification('ส่งออกไฟล์ Excel สต็อกในฟาร์มเรียบร้อยแล้ว', 'success');
  } catch (err) {
    console.error('Export inventory Excel error:', err);
    showNotification('เกิดข้อผิดพลาดในการส่งออกไฟล์ Excel', 'error');
  }
}

function triggerImportInventoryExcel() {
  const input = document.getElementById('inventory-excel-import-input');
  if (!input) return;
  input.value = '';
  input.click();
}

function parseThaiPondStatus(val) {
  const s = String(val || '').trim().toLowerCase();
  if (!s) return null;
  if (s === 'ready' || s.includes('พร้อมขาย')) return 'ready';
  if (s === 'growing' || s.includes('อนุบาล')) return 'growing';
  if (s === 'resting' || s.includes('พักบ่อ') || s.includes('ตากบ่อ')) return 'resting';
  if (s === 'sick' || s.includes('ป่วย') || s.includes('งดขาย')) return 'sick';
  if (s === 'empty' || s.includes('ว่าง')) return 'empty';
  return null;
}

function importInventoryFromExcel(event) {
  const file = event?.target?.files?.[0];
  if (!file) return;

  if (typeof XLSX === 'undefined') {
    showNotification('ไม่พบไลบรารี SheetJS (XLSX) กรุณารีเฟรชหน้าจอ', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = new Uint8Array(e.target.result);
      const wb = XLSX.read(data, { type: 'array' });
      if (!state.ponds || state.ponds.length === 0) initInventoryState();

      let updatedPonds = 0;
      let updatedSupplies = 0;
      const statusLabels = { ready: 'พร้อมขาย', growing: 'กำลังอนุบาล', resting: 'พักบ่อ / ตากบ่อ', empty: 'บ่อว่าง', sick: 'ปลาป่วย / งดขาย' };

      wb.SheetNames.forEach(sheetName => {
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { defval: '' });
        rows.forEach(row => {
          // 1) ตรวจสอบแถวสต็อกบ่อปลา/กระชัง/อ่าง
          const pondId = String(row['รหัสบ่อ'] || row['id'] || row['pondId'] || '').trim();
          const pondName = String(row['ชื่อกระชัง/อ่าง'] || row['ชื่อบ่อ'] || row['กระชัง/อ่าง'] || row['ที่จัดเก็บ'] || row['name'] || '').trim();
          const pondCode = String(row['รหัส'] || row['code'] || '').trim();

          let pond = null;
          if (pondId) pond = (state.ponds || []).find(p => p.id === pondId);
          if (!pond && pondName) pond = (state.ponds || []).find(p => p.name === pondName);
          if (!pond && pondCode) pond = (state.ponds || []).find(p => (p.code || '').toLowerCase() === pondCode.toLowerCase());

          if (pond) {
            if (pondName) pond.name = pondName;
            if ('พันธุ์ปลา' in row || 'สายพันธุ์ปลา' in row || 'fishName' in row) {
              pond.fishName = String(row['พันธุ์ปลา'] ?? row['สายพันธุ์ปลา'] ?? row['fishName'] ?? '').trim();
            }
            if ('ขนาด' in row || 'ไซส์' in row || 'fishSize' in row) {
              pond.fishSize = String(row['ขนาด'] ?? row['ไซส์'] ?? row['fishSize'] ?? '').trim();
            }
            if ('ตาคัด' in row || 'sieveCode' in row) {
              pond.sieveCode = String(row['ตาคัด'] ?? row['sieveCode'] ?? '').trim();
            }
            if ('จำนวนคงเหลือ' in row || 'จำนวน' in row || 'totalQty' in row) {
              const q = Number(String(row['จำนวนคงเหลือ'] ?? row['จำนวน'] ?? row['totalQty'] ?? 0).replace(/,/g, ''));
              if (!isNaN(q)) pond.totalQty = Math.max(0, q);
            }
            if ('ติดจอง' in row || 'reservedQty' in row) {
              const r = Number(String(row['ติดจอง'] ?? row['reservedQty'] ?? 0).replace(/,/g, ''));
              if (!isNaN(r)) pond.reservedQty = Math.max(0, r);
            }
            if ('ราคาต่อตัว' in row || 'ราคา' in row || 'unitPrice' in row) {
              const pr = Number(String(row['ราคาต่อตัว'] ?? row['ราคา'] ?? row['unitPrice'] ?? 0).replace(/,/g, ''));
              if (!isNaN(pr)) pond.unitPrice = Math.max(0, pr);
            }
            if ('สถานะ' in row || 'status' in row) {
              const st = parseThaiPondStatus(row['สถานะ'] ?? row['status']);
              if (st) {
                pond.status = st;
                pond.statusLabel = statusLabels[st] || st;
              }
            }
            if ('หมายเหตุ' in row || 'notes' in row) {
              pond.notes = String(row['หมายเหตุ'] ?? row['notes'] ?? '').trim();
            }
            updatedPonds++;
            return;
          }

          // 2) ตรวจสอบแถวคลังอาหารและเวชภัณฑ์
          const supId = String(row['รหัสสินค้า'] || '').trim();
          const supName = String(row['ชื่อสินค้า'] || '').trim();
          let supply = null;
          if (supId) supply = (state.supplies || []).find(s => s.id === supId);
          if (!supply && supName) supply = (state.supplies || []).find(s => s.name === supName);
          if (supply) {
            if ('คงเหลือ' in row || 'stockQty' in row) {
              const sq = Number(String(row['คงเหลือ'] ?? row['stockQty'] ?? 0).replace(/,/g, ''));
              if (!isNaN(sq)) supply.stockQty = Math.max(0, sq);
            }
            if ('จุดสั่งซื้อ (ROP)' in row || 'minThreshold' in row) {
              const rop = Number(String(row['จุดสั่งซื้อ (ROP)'] ?? row['minThreshold'] ?? 0).replace(/,/g, ''));
              if (!isNaN(rop)) supply.minThreshold = Math.max(0, rop);
            }
            if ('ราคาต่อหน่วย' in row || 'unitPrice' in row) {
              const sp = Number(String(row['ราคาต่อหน่วย'] ?? row['unitPrice'] ?? 0).replace(/,/g, ''));
              if (!isNaN(sp)) supply.unitPrice = Math.max(0, sp);
            }
            updatedSupplies++;
          }
        });
      });

      if (updatedPonds === 0 && updatedSupplies === 0) {
        showNotification('ไม่พบรายการที่ตรงกับรหัสบ่อหรือชื่อกระชัง/อ่างในไฟล์ Excel', 'warning');
        return;
      }

      saveInventoryState();
      renderInventoryView();
      if (typeof updatePortalKPIs === 'function') updatePortalKPIs();
      showNotification(`นำเข้าข้อมูล Excel สำเร็จ (อัปเดตบ่อปลา ${updatedPonds} จุด${updatedSupplies > 0 ? `, พัสดุ ${updatedSupplies} รายการ` : ''})`, 'success');
    } catch (err) {
      console.error('Import inventory Excel error:', err);
      showNotification('ไม่สามารถอ่านไฟล์ Excel ได้ กรุณาตรวจสอบรูปแบบไฟล์', 'error');
    }
  };
  reader.readAsArrayBuffer(file);
}

window.exportInventoryToExcel = exportInventoryToExcel;
window.triggerImportInventoryExcel = triggerImportInventoryExcel;
window.importInventoryFromExcel = importInventoryFromExcel;

