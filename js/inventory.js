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
    } else if (item.category === 'อาหารปลา' || item.category === 'ยารักษาโรคปลา') {
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
let currentInventorySubTab = 'ponds'; // 'ponds', 'supplies', 'inbound_grn', 'history'
let currentInventoryViewMode = 'blueprint'; // 'blueprint' or 'cards'

function setInventoryViewMode(mode) {
  currentInventoryViewMode = mode;
  const btnBlueprint = document.getElementById('btn-view-blueprint');
  const btnCards = document.getElementById('btn-view-cards');
  const canvasEl = document.getElementById('visual-farm-map-canvas');
  const gridEl = document.getElementById('ponds-grid-container');

  if (mode === 'blueprint') {
    if (btnBlueprint) {
      btnBlueprint.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-sky-600 text-white shadow-xs';
    }
    if (btnCards) {
      btnCards.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-slate-600 hover:text-slate-900';
    }
    if (canvasEl) canvasEl.classList.remove('hidden');
    if (gridEl) gridEl.classList.add('hidden');
    renderVisualFarmMap();
  } else {
    if (btnBlueprint) {
      btnBlueprint.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-slate-600 hover:text-slate-900';
    }
    if (btnCards) {
      btnCards.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-sky-600 text-white shadow-xs';
    }
    if (canvasEl) canvasEl.classList.add('hidden');
    if (gridEl) gridEl.classList.remove('hidden');
    renderPondsGrid();
  }
  lucide.createIcons();
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

  const sections = ['ponds', 'supplies', 'inbound_grn', 'history'];
  sections.forEach(sec => {
    const el = document.getElementById(`inv-section-${sec}`);
    if (el) el.classList.toggle('hidden', sec !== subTab);
  });

  if (subTab === 'ponds') {
    if (currentInventoryViewMode === 'blueprint') {
      renderVisualFarmMap();
    } else {
      renderPondsGrid();
    }
  }
  if (subTab === 'supplies') renderSuppliesTable();
  if (subTab === 'inbound_grn') renderGrnTable();
  if (subTab === 'history') renderHistorySection();

  lucide.createIcons();
}

function renderInventoryView() {
  if (!state.ponds || state.ponds.length === 0) initInventoryState();

  const totalFish = (state.ponds || []).reduce((sum, p) => sum + (p.totalQty || 0), 0);
  const readyFish = (state.ponds || []).filter(p => p.status === 'ready').reduce((sum, p) => sum + Math.max(0, (p.totalQty || 0) - (p.reservedQty || 0)), 0);
  const reservedFish = (state.ponds || []).reduce((sum, p) => sum + (p.reservedQty || 0), 0);
  const duePonds = getGradingDuePonds(7);
  const lowStockCount = (state.supplies || []).filter(s => s.stockQty <= s.minThreshold).length;

  const elTotalFish = document.getElementById('stat-inv-total-fish');
  const elReadyFish = document.getElementById('stat-inv-ready-fish');
  const elReservedFish = document.getElementById('stat-inv-reserved-fish');
  const elDuePonds = document.getElementById('stat-inv-grading-due');
  const elLowStockCount = document.getElementById('stat-inv-low-stock');

  if (elTotalFish) elTotalFish.textContent = totalFish.toLocaleString() + ' ตัว';
  if (elReadyFish) elReadyFish.textContent = readyFish.toLocaleString() + ' ตัว';
  if (elReservedFish) elReservedFish.textContent = reservedFish.toLocaleString() + ' ตัว';
  if (elDuePonds) {
    elDuePonds.textContent = duePonds.length + ' บ่อ';
    elDuePonds.className = duePonds.length > 0 ? 'text-lg sm:text-xl font-black text-amber-600' : 'text-lg sm:text-xl font-black text-emerald-600';
  }
  if (elLowStockCount) {
    elLowStockCount.textContent = lowStockCount + ' รายการ';
    elLowStockCount.className = lowStockCount > 0 ? 'text-lg sm:text-xl font-black text-rose-600' : 'text-lg sm:text-xl font-black text-emerald-600';
  }

  renderGradingDueBanner();
  switchInventorySubTab(currentInventorySubTab);
}

// 3.1 GRADING DUE ALERT BANNER
function renderGradingDueBanner() {
  const container = document.getElementById('grading-due-banner-container');
  if (!container) return;

  const duePonds = getGradingDuePonds(7);
  if (duePonds.length === 0) {
    container.innerHTML = '';
    container.classList.add('hidden');
    return;
  }

  container.classList.remove('hidden');
  container.innerHTML = `
    <div class="bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-orange-500/10 border-2 border-amber-400 rounded-2xl p-4 shadow-sm animate-in fade-in duration-300">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div class="flex items-start gap-3">
          <div class="p-2.5 bg-amber-500 text-white rounded-xl shadow-xs flex-shrink-0 mt-0.5">
            <i data-lucide="scale" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h4 class="font-bold text-slate-800 text-sm sm:text-base">แจ้งเตือนรอบคัดขนาดปลา (Grading Due Alert)</h4>
              <span class="bg-amber-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full">${duePonds.length} บ่อเกินกำหนด</span>
            </div>
            <p class="text-xs text-slate-600 mt-1">
              พบบ่อปลาที่ไม่ได้คัดขนาดเกิน 7-10 วัน ควรรีบทำการคัดแยกไซส์เพื่อควบคุมการเจริญเติบโตและป้องกันการกินกันเอง:
            </p>
            <div class="flex flex-wrap gap-2 mt-2">
              ${duePonds.map(p => {
                const days = getDaysSinceGraded(p.lastGradedDate);
                return `
                  <button onclick="openGradeFishModal('${p.id}')" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold transition shadow-2xs">
                    <span>${p.name} (${p.fishName || 'ปลา'})</span>
                    <span class="text-rose-600 font-extrabold">• ${days} วัน</span>
                    <i data-lucide="arrow-right" class="w-3 h-3 text-amber-700"></i>
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        </div>
        <button onclick="openGradeFishModal('${duePonds[0].id}')" class="btn-large bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-3 text-xs sm:text-sm rounded-xl shadow-sm whitespace-nowrap self-stretch sm:self-auto flex items-center justify-center gap-1.5">
          <i data-lucide="scale" class="w-4 h-4"></i>
          <span>บันทึกการคัดขนาดด่วน</span>
        </button>
      </div>
    </div>
  `;
}

// 3.1.1 RENDER VISUAL FARM BLUEPRINT (ผังสต็อกเสมือนจริง 48 หน่วย)
function renderVisualFarmMap() {
  const container = document.getElementById('visual-farm-map-canvas');
  if (!container) return;

  if (!state.ponds || state.ponds.length === 0) initInventoryState();
  const ponds = state.ponds || [];

  const filter = document.getElementById('farm-blueprint-filter')?.value || 'all';

  // สรุปยอดภาพรวมฟาร์ม
  const totalUnits = ponds.length;
  const totalFish = ponds.reduce((s, p) => s + (p.totalQty || 0), 0);
  const totalValue = ponds.reduce((s, p) => s + ((p.totalQty || 0) * (p.unitPrice || 0)), 0);
  const readyFish = ponds.filter(p => p.status === 'ready').reduce((s, p) => s + Math.max(0, (p.totalQty || 0) - (p.reservedQty || 0)), 0);
  const emptyPondsCount = ponds.filter(p => (p.totalQty || 0) === 0 || p.status === 'empty').length;

  // แยกโซน 4 โซนตามแปลนจริงของฟาร์ม
  const getCageNum = (id) => {
    const m = (id || '').match(/^cage_c(\d+)$/);
    return m ? parseInt(m[1], 10) : 0;
  };
  const sterileCages = ponds.filter(p => p.zone === 'sterile_cage'); // M1 - M5 (5 กระชัง)
  const mainCagesTop = ponds.filter(p => {
    const n = getCageNum(p.id);
    return n >= 1 && n <= 11;
  }); // C1 - C11 (11 กระชังบน)
  const mainCagesBottom = ponds.filter(p => {
    const n = getCageNum(p.id);
    return n >= 12 && n <= 22;
  }); // C12 - C22 (11 กระชังล่าง)
  const smallTanks = ponds.filter(p => p.zone === 'small_tank'); // S1 - S5 (5 อ่างกลมเล็ก)
  const largeTanks = ponds.filter(p => p.zone === 'large_tank'); // B1 - B16 (16 อ่างใหญ่)

  const showSterile = filter === 'all' || filter === 'sterile_cage';
  const showMain = filter === 'all' || filter === 'main_cage';
  const showSmall = filter === 'all' || filter === 'small_tank';
  const showLarge = filter === 'all' || filter === 'large_tank';

  container.innerHTML = `
    <div class="farm-dock-canvas rounded-3xl p-4 sm:p-6 shadow-xl border-2 border-sky-300 relative overflow-hidden bg-gradient-to-br from-slate-900 via-sky-950 to-blue-950 text-white">
      <!-- Water ripple background effect -->
      <div class="absolute inset-0 farm-dock-water-bg opacity-15 pointer-events-none"></div>

      <!-- Blueprint Top Stats & Legend Bar -->
      <div class="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-sky-700/50">
        <div>
          <div class="flex items-center gap-2.5">
            <span class="p-2 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-400/30">
              <i data-lucide="map-pin" class="w-5 h-5"></i>
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-black text-lg sm:text-xl text-white tracking-wide">ผังจุดสต็อกปลาในฟาร์ม (Live Blueprint)</h3>
                <span class="bg-amber-400 text-amber-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase shadow-xs">48 จุดสต็อก</span>
              </div>
              <p class="text-xs text-sky-200/80 mt-0.5">คลิกลาก (Drag & Drop) บ่อเพื่อย้ายปลา หรือคลิกดูรายละเอียดและเปิดบิลขาย POS ได้ทันที</p>
            </div>
          </div>
        </div>

        <!-- 4 Quick Stats Badges -->
        <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div class="bg-sky-900/60 backdrop-blur-xs border border-sky-600/40 rounded-xl py-2 px-3 text-center min-w-[90px]">
            <span class="text-[10px] text-sky-300 block font-semibold">ปลารวมทั้งหมด</span>
            <span class="font-black text-sm text-white">${totalFish.toLocaleString()} ตัว</span>
          </div>
          <div class="bg-emerald-950/60 backdrop-blur-xs border border-emerald-500/40 rounded-xl py-2 px-3 text-center min-w-[90px]">
            <span class="text-[10px] text-emerald-300 block font-semibold">พร้อมขายจริง</span>
            <span class="font-black text-sm text-emerald-300">${readyFish.toLocaleString()} ตัว</span>
          </div>
          <div class="bg-amber-950/60 backdrop-blur-xs border border-amber-500/40 rounded-xl py-2 px-3 text-center min-w-[90px]">
            <span class="text-[10px] text-amber-300 block font-semibold">บ่อ/กระชังว่าง</span>
            <span class="font-black text-sm text-amber-300">${emptyPondsCount} จุด</span>
          </div>
          <div class="bg-gradient-to-r from-amber-500/30 to-orange-600/30 backdrop-blur-xs border border-amber-400/50 rounded-xl py-2 px-3.5 text-right min-w-[120px]">
            <span class="text-[10px] text-amber-200 block font-semibold">มูลค่าปลาในฟาร์ม</span>
            <span class="font-black text-sm text-amber-300">฿${Math.round(totalValue).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <!-- Main Layout matching Farm Blueprint Diagram -->
      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        
        <!-- ============================================== -->
        <!-- ZONE 1: โซนกระชังหมัน (5 กระชังเรียงตั้งทางซ้าย M1 - M5) -->
        <!-- ============================================== -->
        ${showSterile ? `
          <div class="${showMain && (showSmall || showLarge) ? 'lg:col-span-2' : 'lg:col-span-12'} bg-slate-900/60 border border-sky-700/40 rounded-2xl p-3 sm:p-4 backdrop-blur-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-2 mb-3 border-b border-sky-600/30">
                <div class="flex items-center gap-1.5 text-sky-200 font-extrabold text-xs">
                  <span>🛡️ กระชังหมัน</span>
                  <span class="text-[10px] bg-sky-800/90 text-sky-200 px-1.5 py-0.2 rounded font-mono">5 ช่อง</span>
                </div>
                <span class="text-[10px] text-sky-400">พักฟื้น/หมัน</span>
              </div>
              
              <div class="flex flex-col gap-2.5">
                ${sterileCages.map(pond => renderBlueprintUnitCard(pond, filter)).join('')}
              </div>
            </div>
          </div>
        ` : ''}

        <!-- ============================================== -->
        <!-- ZONE 2: โซนกระชังหลัก (22 กระชัง แบ่ง 2 แถวบน-ล่าง + ทางลงแพ) -->
        <!-- ============================================== -->
        ${showMain ? `
          <div class="${showSterile && (showSmall || showLarge) ? 'lg:col-span-7' : 'lg:col-span-12'} bg-slate-900/60 border border-sky-700/40 rounded-2xl p-3 sm:p-4 backdrop-blur-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-2 mb-3 border-b border-sky-600/30">
                <div class="flex items-center gap-2 text-sky-100 font-extrabold text-xs">
                  <span>🌊 โซนกระชังลอยน้ำหลัก (Main Floating Cages)</span>
                  <span class="text-[10px] bg-sky-700/80 text-sky-200 px-2 py-0.5 rounded font-mono">22 กระชัง</span>
                </div>
                <div class="flex items-center gap-2 text-[11px] text-sky-300">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>แถวบน C1-C11 • แถวล่าง C12-C22</span>
                </div>
              </div>

              <!-- Floating Pier Container with Horizontal Scroll for narrow screens -->
              <div class="overflow-x-auto pb-2">
                <div class="min-w-[760px] space-y-2.5">
                  <!-- Row 1: C1 - C11 -->
                  <div class="grid grid-cols-11 gap-2">
                    ${mainCagesTop.map(pond => renderBlueprintUnitCard(pond, filter)).join('')}
                  </div>

                  <!-- Central Wooden Pier Walkway with Orange Ramp Arrow -->
                  <div class="dock-walkway py-2 px-4 rounded-xl flex items-center justify-between shadow-inner bg-gradient-to-r from-amber-900/50 via-amber-800/40 to-amber-900/50 border-y-2 border-amber-600/40 my-1">
                    <div class="flex items-center gap-2 text-amber-200 text-xs font-black tracking-wide">
                      <i data-lucide="footprints" class="w-4 h-4 text-amber-400"></i>
                      <span>สะพานไม้ทางเดินกลางแพ (Central Pier Walkway)</span>
                    </div>
                    
                    <div class="dock-ramp-arrow animate-pulse-gentle">
                      <span>ทางลงแพ ➔</span>
                    </div>
                  </div>

                  <!-- Row 2: C12 - C22 -->
                  <div class="grid grid-cols-11 gap-2">
                    ${mainCagesBottom.map(pond => renderBlueprintUnitCard(pond, filter)).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- ============================================== -->
        <!-- ZONE 3 & 4: โซนอ่างกลมเล็ก (5) & โซนอ่างใหญ่ (16) -->
        <!-- ============================================== -->
        ${(showSmall || showLarge) ? `
          <div class="${showSterile && showMain ? 'lg:col-span-3' : 'lg:col-span-12'} space-y-4">
            <!-- Zone 3: Small Nursery Tanks -->
            ${showSmall ? `
              <div class="bg-slate-900/60 border border-teal-600/40 rounded-2xl p-3 sm:p-4 backdrop-blur-xs">
                <div class="flex items-center justify-between pb-2 mb-3 border-b border-teal-500/30">
                  <div class="flex items-center gap-1.5 text-teal-200 font-extrabold text-xs">
                    <span>🔵 โซนอ่างกลมเล็ก (S1 - S5)</span>
                    <span class="text-[10px] bg-teal-800/90 text-teal-200 px-1.5 py-0.2 rounded font-mono">5 อ่าง</span>
                  </div>
                  <span class="text-[10px] text-teal-300">อนุบาลปลาเล็ก</span>
                </div>
                <div class="grid grid-cols-5 gap-1.5">
                  ${smallTanks.map(pond => renderBlueprintUnitCard(pond, filter, true)).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Zone 4: Large Concrete Tanks -->
            ${showLarge ? `
              <div class="bg-slate-900/60 border border-sky-700/40 rounded-2xl p-3 sm:p-4 backdrop-blur-xs">
                <div class="flex items-center justify-between pb-2 mb-3 border-b border-sky-600/30">
                  <div class="flex items-center gap-1.5 text-sky-200 font-extrabold text-xs">
                    <span>🧱 โซนอ่างใหญ่ (B1 - B16)</span>
                    <span class="text-[10px] bg-sky-800/90 text-sky-200 px-1.5 py-0.2 rounded font-mono">16 อ่าง</span>
                  </div>
                  <span class="text-[10px] text-sky-400">2 แถว x 8 อ่าง</span>
                </div>
                <div class="grid grid-cols-2 gap-2 max-h-[480px] overflow-y-auto pr-1">
                  ${largeTanks.map(pond => renderBlueprintUnitCard(pond, filter)).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        ` : ''}

      </div>
    </div>
  `;

  lucide.createIcons();
}

// Helper: Render individual unit card on blueprint map
function renderBlueprintUnitCard(pond, filter = 'all', isRound = false) {
  const isEmpty = (pond.totalQty || 0) === 0 || pond.status === 'empty';
  const hasFish = !isEmpty && (pond.totalQty || 0) > 0;
  const isReady = pond.status === 'ready';
  const isGrowing = pond.status === 'growing';

  // Apply quick filter highlighting
  if (filter === 'has_fish' && isEmpty) {
    return `<div class="opacity-25 pointer-events-none rounded-xl border border-slate-700 bg-slate-900/40 p-2 text-center text-[10px] text-slate-500">${pond.name} (ว่าง)</div>`;
  }
  if (filter === 'empty' && hasFish) {
    return `<div class="opacity-25 pointer-events-none rounded-xl border border-slate-700 bg-slate-900/40 p-2 text-center text-[10px] text-slate-500">${pond.name}</div>`;
  }

  // Formula calculation requested specifically by user (e.g. 5000 *0.65)
  const formula = hasFish ? `${Number(pond.totalQty || 0).toLocaleString()} *${Number(pond.unitPrice || 0).toFixed(2)}` : '-';
  const totalVal = hasFish ? Math.round((pond.totalQty || 0) * (pond.unitPrice || 0)) : 0;

  // Visual appearance
  let borderClass = 'border-slate-300';
  let bgClass = 'bg-white text-slate-800';
  let statusBadge = '';

  if (isEmpty) {
    borderClass = 'border-dashed border-slate-400/60 hover:border-sky-400';
    bgClass = 'bg-slate-800/40 text-slate-400 hover:bg-slate-800/80';
    statusBadge = '<span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-700/80 text-slate-300">ว่าง</span>';
  } else if (isReady) {
    borderClass = 'border-emerald-400 hover:border-emerald-500 shadow-sm';
    bgClass = 'bg-white text-slate-900';
    statusBadge = '<span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>พร้อมขาย</span>';
  } else if (isGrowing) {
    borderClass = 'border-sky-300 hover:border-sky-500 shadow-sm';
    bgClass = 'bg-white text-slate-900';
    statusBadge = '<span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-sky-100 text-sky-800">อนุบาล</span>';
  } else {
    borderClass = 'border-amber-300 hover:border-amber-500';
    bgClass = 'bg-amber-50/90 text-slate-900';
    statusBadge = '<span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800">พักบ่อ</span>';
  }

  const fishIcon = (pond.fishName || '').includes('ดุก') ? '🐡' : ((pond.fishName || '').includes('ทับทิม') ? '🐠' : '🐟');

  return `
    <div id="unit-card-${pond.id}"
         draggable="${hasFish ? 'true' : 'false'}"
         ondragstart="handlePondDragStart(event, '${pond.id}')"
         ondragover="handlePondDragOver(event)"
         ondragleave="handlePondDragLeave(event)"
         ondrop="handlePondDrop(event, '${pond.id}')"
         onclick="handlePondClick('${pond.id}')"
         class="unit-cell relative rounded-xl border ${borderClass} ${bgClass} p-2 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between shadow-2xs hover:scale-[1.03] group ${isRound ? 'aspect-square justify-center' : 'min-h-[105px]'}"
         title="${pond.name}: คลิกดูข้อมูล/ขาย POS / ลากเพื่อย้ายปลา">
      
      <!-- Top Code & Status -->
      <div class="flex items-center justify-between gap-1 mb-1">
        <div class="flex items-center gap-1 truncate">
          <span class="font-black text-xs truncate">${pond.name}</span>
        </div>
        ${statusBadge}
      </div>

      <!-- Fish Details -->
      ${hasFish ? `
        <div class="space-y-0.5">
          <div class="flex items-center gap-1 font-bold text-xs truncate">
            <span class="text-xs flex-shrink-0">${fishIcon}</span>
            <span class="truncate">${pond.fishName || 'พันธุ์ปลา'}</span>
          </div>

          <div class="flex items-center justify-between text-[10px] gap-1">
            <span class="px-1 py-0.2 rounded bg-sky-50 text-sky-700 border border-sky-200 font-bold whitespace-nowrap">
              ${pond.fishSize || '-'}
            </span>
            ${pond.sieveCode ? `<span class="text-slate-500 font-medium">ตา: <strong class="text-slate-700">${pond.sieveCode}</strong></span>` : ''}
          </div>

          <!-- Formula Display: 5000 *0.65 = 3250 -->
          <div class="mt-1 bg-amber-50/90 border border-amber-200/90 rounded px-1.5 py-0.5 flex items-center justify-between text-[10px]">
            <span class="font-mono font-black text-amber-950">${formula}</span>
            <span class="font-bold text-emerald-700">฿${totalVal.toLocaleString()}</span>
          </div>
        </div>
      ` : `
        <div class="py-2 text-center text-slate-400 flex flex-col items-center justify-center">
          <i data-lucide="waves" class="w-4 h-4 mb-0.5 opacity-40"></i>
          <span class="text-[10px] font-semibold">บ่อว่าง</span>
          <span class="text-[8px] opacity-70">คลิกลากปลามาวาง</span>
        </div>
      `}

      <!-- Footer Micro Bar -->
      <div class="mt-1 pt-1 border-t border-slate-100/50 flex items-center justify-between text-[9px] text-slate-400">
        <span class="truncate">${pond.code || ''}</span>
        ${hasFish ? `<span class="opacity-0 group-hover:opacity-100 transition text-sky-600 font-bold">✋ ลากย้าย</span>` : `<span class="opacity-0 group-hover:opacity-100 transition text-emerald-600 font-bold">📥 วางปลา</span>`}
      </div>
    </div>
  `;
}

// 3.1.2 DRAG & DROP FISH TRANSFER
let draggedPondId = null;

function handlePondDragStart(e, pondId) {
  const pond = (state.ponds || []).find(p => p.id === pondId);
  if (!pond || !pond.totalQty || pond.totalQty <= 0) {
    e.preventDefault();
    return false;
  }
  draggedPondId = pondId;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', pondId);
  if (e.currentTarget) e.currentTarget.classList.add('opacity-50', 'ring-2', 'ring-sky-500');
}

function handlePondDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  const target = e.currentTarget;
  if (target && !target.classList.contains('drag-over')) {
    target.classList.add('drag-over');
  }
}

function handlePondDragLeave(e) {
  const target = e.currentTarget;
  if (target) {
    target.classList.remove('drag-over');
  }
}

function handlePondDrop(e, targetPondId) {
  e.preventDefault();
  const target = e.currentTarget;
  if (target) {
    target.classList.remove('drag-over');
  }

  // ล้าง visual styles ทุกอัน
  document.querySelectorAll('.unit-cell').forEach(el => el.classList.remove('opacity-50', 'ring-2', 'ring-sky-500', 'drag-over'));

  const fromId = draggedPondId || e.dataTransfer.getData('text/plain');
  draggedPondId = null;

  if (!fromId || fromId === targetPondId) return;

  const sourcePond = (state.ponds || []).find(p => p.id === fromId);
  if (!sourcePond || !sourcePond.totalQty || sourcePond.totalQty <= 0) {
    showNotification('กระชังต้นทางไม่มีปลาให้ย้าย', 'warning');
    return;
  }

  openTransferFishModal(fromId, targetPondId);
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
  if (isEmpty) {
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

  const btnGrade = document.getElementById('inspect-btn-grade');
  if (btnGrade) {
    btnGrade.onclick = () => {
      closeModal('modal-inspect-pond');
      openGradeFishModal(pond.id);
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

// 3.2 RENDER PONDS GRID
function renderPondsGrid() {
  const container = document.getElementById('ponds-grid-container');
  if (!container) return;

  if (!state.ponds || state.ponds.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400">ยังไม่มีข้อมูลบ่อปลา</div>`;
    return;
  }

  const statusConfig = {
    ready: { label: 'พร้อมขาย', badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300', dot: 'bg-emerald-500' },
    growing: { label: 'กำลังอนุบาล', badgeBg: 'bg-sky-100 text-sky-800 border-sky-300', dot: 'bg-sky-500' },
    resting: { label: 'พักบ่อ/ตากบ่อ', badgeBg: 'bg-amber-100 text-amber-800 border-amber-300', dot: 'bg-amber-500' },
    empty: { label: 'บ่อว่าง', badgeBg: 'bg-slate-100 text-slate-600 border-slate-300', dot: 'bg-slate-400' }
  };

  const typeConfig = {
    earthen: '🏞️ บ่อดินธรรมชาติ',
    concrete: '🧱 บ่อปูนซีเมนต์',
    cage: '🌊 กระชังลอยน้ำ'
  };

  container.innerHTML = state.ponds.map(pond => {
    const st = statusConfig[pond.status] || statusConfig.ready;
    const available = Math.max(0, (pond.totalQty || 0) - (pond.reservedQty || 0));
    const percentAvailable = pond.totalQty > 0 ? Math.round((available / pond.totalQty) * 100) : 0;
    const daysSinceGraded = getDaysSinceGraded(pond.lastGradedDate);
    const isGradingDue = (pond.status === 'ready' || pond.status === 'growing') && pond.totalQty > 0 && daysSinceGraded >= 7;

    return `
      <div class="bg-white rounded-2xl border ${isGradingDue ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200'} shadow-xs hover:shadow-md transition overflow-hidden flex flex-col">
        <!-- Header -->
        <div class="p-4 border-b border-slate-100 ${isGradingDue ? 'bg-amber-50/50' : 'bg-slate-50/50'} flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-base text-slate-800">${pond.name}</h3>
              <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${st.badgeBg}">
                <span class="w-1.5 h-1.5 rounded-full ${st.dot}"></span>
                ${st.label}
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">${typeConfig[pond.type] || pond.typeName || 'บ่อเลี้ยง'} • ${pond.sizeDesc || '-'}</p>
          </div>
          <div class="flex items-center gap-1">
            <button onclick="openEditPondModal('${pond.id}')" class="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition" title="แก้ไขข้อมูลบ่อ">
              <i data-lucide="edit-3" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="p-4 flex-1 space-y-3.5">
          <!-- Fish Info -->
          <div>
            <span class="text-xs text-slate-400 block mb-0.5">สายพันธุ์และไซส์:</span>
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-slate-800 text-sm truncate">${pond.fishName || 'ไม่มีปลา'}</span>
              ${pond.fishSize && pond.fishSize !== '-' ? `
                <span class="text-xs bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded-md font-bold whitespace-nowrap">
                  ${pond.fishSize}
                </span>` : ''}
            </div>
            <div class="flex items-center justify-between text-xs text-slate-500 mt-1">
              <span>ตาคัด: <strong class="text-slate-700 font-semibold">${pond.sieveCode || '-'}</strong></span>
              <span>ราคาขาย: <strong class="text-emerald-700 font-bold">฿${Number(pond.unitPrice || 0).toFixed(2)}</strong>/ตัว</span>
            </div>
          </div>

          <!-- Numbers Grid (3 metrics) -->
          <div class="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
            <div>
              <span class="text-[11px] text-slate-500 block">คงเหลือ</span>
              <span class="font-black text-sm text-slate-800">${Number(pond.totalQty || 0).toLocaleString()}</span>
              <span class="text-[10px] text-slate-400 block">ตัว</span>
            </div>
            <div>
              <span class="text-[11px] text-amber-600 font-medium block">ติดจอง (Hold)</span>
              <span class="font-black text-sm text-amber-600">${Number(pond.reservedQty || 0).toLocaleString()}</span>
              <span class="text-[10px] text-slate-400 block">ตัว</span>
            </div>
            <div>
              <span class="text-[11px] text-emerald-600 font-medium block">พร้อมขายจริง</span>
              <span class="font-black text-sm text-emerald-700">${available.toLocaleString()}</span>
              <span class="text-[10px] text-slate-400 block">ตัว</span>
            </div>
          </div>

          <!-- Progress Bar: พร้อมขาย vs ติดจอง -->
          ${pond.totalQty > 0 ? `
            <div>
              <div class="flex justify-between text-[10px] text-slate-500 mb-1">
                <span>พร้อมขาย (${percentAvailable}%)</span>
                <span>ติดจอง (${100 - percentAvailable}%)</span>
              </div>
              <div class="w-full bg-amber-100 h-2 rounded-full overflow-hidden flex">
                <div class="bg-emerald-500 h-full rounded-full transition-all duration-500" style="width: ${percentAvailable}%"></div>
              </div>
            </div>
          ` : ''}

          <!-- Grading Status Badge -->
          <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span class="text-slate-400 text-[11px]">คัดขนาดล่าสุด:</span>
            ${pond.lastGradedDate ? `
              <span class="inline-flex items-center gap-1 font-bold text-[11px] ${isGradingDue ? 'text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-300 animate-pulse' : 'text-slate-600'}">
                <i data-lucide="${isGradingDue ? 'alert-triangle' : 'check-circle'}" class="w-3 h-3"></i>
                ${formatThaiDate(pond.lastGradedDate)} (${daysSinceGraded} วันก่อน)
              </span>
            ` : `<span class="text-slate-400 text-[11px]">- ยังไม่เคยคัด -</span>`}
          </div>

          <!-- Notes -->
          ${pond.notes ? `
            <div class="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 line-clamp-2">
              💡 ${pond.notes}
            </div>
          ` : ''}
        </div>

        <!-- Footer Actions -->
        <div class="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5">
          <button onclick="openGradeFishModal('${pond.id}')" class="flex-1 py-1.5 px-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-xs" title="บันทึกการคัดขนาดบ่อนี้">
            <i data-lucide="scale" class="w-3.5 h-3.5"></i>
            <span>คัดขนาดบ่อนี้</span>
          </button>
          <button onclick="openRecordMortalityModal('${pond.id}')" class="py-1.5 px-2.5 bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1" title="แจ้งปลาตาย">
            <i data-lucide="skull" class="w-3.5 h-3.5"></i>
            <span class="hidden sm:inline">แจ้งตาย</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// 3.3 RENDER SUPPLIES TABLE
function renderSuppliesTable() {
  const tbody = document.getElementById('supplies-table-body');
  if (!tbody) return;

  if (!state.supplies || state.supplies.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-slate-400">ไม่มีข้อมูลคลังสินค้า</td></tr>`;
    return;
  }

  tbody.innerHTML = state.supplies.map(item => {
    const isLow = item.stockQty <= item.minThreshold;
    return `
      <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition ${isLow ? 'bg-rose-50/30' : ''}">
        <td class="p-3.5 text-xs font-bold text-slate-500">${item.category}</td>
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
    const totalQty = (grn.items || []).reduce((sum, it) => sum + (Number(it.qty) || 0), 0);
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
            ${isFingerling ? '🐟 ลูกปลาใหม่' : '📦 ปัจจัยการผลิต'}
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

  const sieveSelect = document.getElementById('grade-sieve-select');
  if (sieveSelect && typeof STANDARD_SIEVE_GRADES !== 'undefined') {
    sieveSelect.innerHTML = STANDARD_SIEVE_GRADES.map(s => `
      <option value="${s.name}">${s.name} - ${s.sizeRange} (${s.desc})</option>
    `).join('');
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
  const sieveUsed = document.getElementById('grade-sieve-select').value;
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

// 5. INBOUND & PROCUREMENT SYSTEM (รับเข้าสินค้า & ใบรับสินค้า GRN)

function openInboundGrnModal() {
  const modal = document.getElementById('modal-inbound-grn');
  if (!modal) return;

  document.getElementById('inbound-date-input').value = getTodayString();
  document.getElementById('inbound-supplier-input').value = '';
  document.getElementById('inbound-qty-input').value = '';
  document.getElementById('inbound-cost-input').value = '';
  document.getElementById('inbound-total-cost-display').textContent = '฿0.00';
  document.getElementById('inbound-notes-input').value = '';

  toggleInboundType('fingerling');

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

  const supplySelect = document.getElementById('inbound-supply-select');
  if (supplySelect && state.supplies) {
    supplySelect.innerHTML = state.supplies.map(s => `
      <option value="${s.id}">${s.name} (${s.packageSize || s.unit})</option>
    `).join('');
  }

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function toggleInboundType(type) {
  const secFingerling = document.getElementById('inbound-sec-fingerling');
  const secSupply = document.getElementById('inbound-sec-supply');
  const btnFingerling = document.getElementById('btn-inbound-type-fingerling');
  const btnSupply = document.getElementById('btn-inbound-type-supply');

  if (secFingerling) secFingerling.classList.toggle('hidden', type !== 'fingerling');
  if (secSupply) secSupply.classList.toggle('hidden', type !== 'supply');

  if (btnFingerling && btnSupply) {
    if (type === 'fingerling') {
      btnFingerling.className = 'flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm bg-sky-600 text-white shadow-xs';
      btnSupply.className = 'flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm text-slate-600 hover:bg-sky-50 border border-slate-200';
    } else {
      btnSupply.className = 'flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm bg-sky-600 text-white shadow-xs';
      btnFingerling.className = 'flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm text-slate-600 hover:bg-sky-50 border border-slate-200';
    }
  }

  const typeHidden = document.getElementById('inbound-type-hidden');
  if (typeHidden) typeHidden.value = type;
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
  const date = document.getElementById('inbound-date-input').value || getTodayString();
  const supplier = document.getElementById('inbound-supplier-input').value.trim() || 'ซัพพลายเออร์ทั่วไป';
  const qty = Number(document.getElementById('inbound-qty-input').value) || 0;
  const unitCost = Number(document.getElementById('inbound-cost-input').value) || 0;
  const notes = document.getElementById('inbound-notes-input').value.trim();

  if (qty <= 0 || unitCost <= 0) {
    showNotification('กรุณาระบุจำนวนและต้นทุนต่อหน่วยให้ถูกต้อง', 'error');
    return;
  }

  const totalCost = qty * unitCost;
  const grnId = 'GRN-' + date.replace(/-/g, '') + '-' + String((state.grnList || []).length + 1).padStart(3, '0');

  let grnItem = null;
  let targetDestName = '';

  if (type === 'fingerling') {
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
      pond.unitPrice = Math.max(pond.unitPrice || 0, Number((unitCost * 1.8).toFixed(2)));
      pond.status = 'growing';
      pond.statusLabel = 'กำลังอนุบาล';
      pond.lastGradedDate = date;
      targetDestName = pond.name;
    }

    grnItem = {
      name: `ลูกปลา${fishName}`,
      size: fishSize,
      sieveCode,
      qty,
      unit: 'ตัว',
      unitCost,
      totalCost
    };
  } else {
    const supplyId = document.getElementById('inbound-supply-select').value;
    const supply = (state.supplies || []).find(s => s.id === supplyId);
    if (supply) {
      supply.stockQty = (supply.stockQty || 0) + qty;
      supply.unitPrice = Math.max(supply.unitPrice || 0, Number((unitCost * 1.25).toFixed(2)));
      targetDestName = 'คลังปัจจัยการผลิต (' + supply.name + ')';
      grnItem = {
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
      message: `ออกใบรับสินค้า ${grnId} จาก ${supplier} มูลค่า ฿${totalCost.toLocaleString()} ส่งยื่นเรื่องบัญชีต้นทุนเรียบร้อย`,
      status: 'verified'
    });
  }

  saveInventoryState();
  closeModal('modal-inbound-grn');
  renderInventoryView();
  showNotification(`ออกใบรับสินค้า ${grnId} เรียบร้อย สต็อกเข้าคลังและส่งเรื่องบัญชีแล้ว`, 'success');
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

// 4.1 Modal บันทึกปลาตาย
function openRecordMortalityModal(pondId) {
  const pond = (state.ponds || []).find(p => p.id === pondId);
  if (!pond) return;

  const modal = document.getElementById('modal-record-mortality');
  if (!modal) return;

  document.getElementById('mortality-pond-id').value = pond.id;
  document.getElementById('mortality-pond-name').textContent = `${pond.name} (${pond.fishName} ${pond.fishSize})`;
  document.getElementById('mortality-current-qty').textContent = Number(pond.totalQty || 0).toLocaleString() + ' ตัว';
  document.getElementById('mortality-qty-input').value = '';
  document.getElementById('mortality-cause-input').value = '';
  document.getElementById('mortality-action-input').value = '';

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function handleSaveMortality(e) {
  if (e) e.preventDefault();
  const pondId = document.getElementById('mortality-pond-id').value;
  const qty = Number(document.getElementById('mortality-qty-input').value);
  const cause = document.getElementById('mortality-cause-input').value.trim();
  const actionTaken = document.getElementById('mortality-action-input').value.trim();

  if (!qty || qty <= 0) {
    showNotification('กรุณาระบุจำนวนปลาที่สูญเสียให้ถูกต้อง', 'error');
    return;
  }

  const pond = (state.ponds || []).find(p => p.id === pondId);
  if (!pond) return;

  // ตัดยอดปลาในบ่อ
  pond.totalQty = Math.max(0, (pond.totalQty || 0) - qty);
  pond.mortalityQty = (pond.mortalityQty || 0) + qty;

  // บันทึก log
  const newLog = {
    id: 'mort_' + Date.now(),
    date: getTodayString(),
    pondId: pond.id,
    pondName: `${pond.name} (${pond.fishName})`,
    qty: qty,
    cause: cause || 'การสูญเสียหน้างาน',
    reporter: `${state.currentUser.name} (${state.currentUser.role})`,
    actionTaken: actionTaken || 'ตรวจสอบคุณภาพน้ำ'
  };
  state.mortalityLogs.unshift(newLog);

  // ส่ง Event ให้ AI Supervisor ตรวจสอบ
  if (state.systemEvents) {
    state.systemEvents.unshift({
      id: 'evt_' + Date.now(),
      timestamp: getTodayString() + ' ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      source: 'Farm Inventory Agent',
      type: 'MORTALITY_LOGGED',
      severity: qty > 300 ? 'warning' : 'info',
      message: `บันทึกปลาตายใน ${pond.name} จำนวน ${qty.toLocaleString()} ตัว (สาเหตุ: ${cause || 'ทั่วไป'})`,
      status: 'verified'
    });
  }

  saveInventoryState();
  closeModal('modal-record-mortality');
  renderInventoryView();
  showNotification(`บันทึกการสูญเสียปลา ${qty.toLocaleString()} ตัวเรียบร้อยแล้ว`, 'success');
}

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

  const labels = { ready: 'พร้อมขาย', growing: 'กำลังอนุบาล', resting: 'พักบ่อ / ตากบ่อ', empty: 'บ่อว่าง' };
  pond.statusLabel = labels[pond.status] || pond.status;

  saveInventoryState();
  closeModal('modal-edit-pond');
  renderInventoryView();
  showNotification(`อัปเดตข้อมูล ${pond.name} สำเร็จ`, 'success');
}

// 7. BADGES UPDATE
function updateInventoryBadges() {
  const lowStockCount = (state.supplies || []).filter(s => s.stockQty <= s.minThreshold).length;
  const dueCount = typeof getGradingDuePonds === 'function' ? getGradingDuePonds(7).length : 0;
  const totalAlerts = lowStockCount + dueCount;

  const badge = document.getElementById('badge-inventory-alert');
  if (badge) {
    badge.textContent = totalAlerts;
    badge.classList.toggle('hidden', totalAlerts === 0);
  }
}
