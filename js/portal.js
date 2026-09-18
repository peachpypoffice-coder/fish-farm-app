/**
 * ====================================================================
 * FARM ERP PORTAL & MODULE LAUNCHER (js/portal.js)
 * บจก.สุทธิ อินเตอร์ ฟาร์ม (ฟาร์มปลาผู้ใหญ่พร)
 * ====================================================================
 * โครงสร้าง 3 ระดับ:
 * Level 1: Login Gate (เข้าสู่ระบบ)
 * Level 2: Main Menu Portal (หน้ารวม 7 โมดูลหลักของฟาร์ม)
 * Level 3: Dedicated Module Workspaces (พื้นที่ทำงานเฉพาะแต่ละโมดูล)
 */

// 1. MODULE CONFIGURATIONS
const FARM_MODULES = [
  {
    id: 'booking',
    number: 1,
    name: 'จองปลาและคิวจัดส่ง',
    nameEn: 'Booking & Logistics',
    desc: 'ระบบจองพันธุ์ปลาล่วงหน้า ปฏิทินคิวส่งทั้งเดือน จัดสายรถคนขับ ตารางงานประจำวัน และบันทึกเคลมปลาเสียหาย',
    icon: 'truck',
    color: 'from-sky-600 to-blue-700',
    badge: 'ใช้งานได้ทันที (Active)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    tags: ['ปฏิทินทั้งเดือน', 'คิวจัดส่งประจำวัน', 'รายการจอง', 'แจ้งเคลมปลา'],
    defaultTab: 'calendar',
    subtabs: [
      { id: 'calendar', label: 'ปฏิทินคิวงานทั้งเดือน', icon: 'calendar' },
      { id: 'daily', label: 'คิวจัดส่งประจำวัน', icon: 'truck', badgeId: 'badge-daily-count-sub' },
      { id: 'orders', label: 'รายการจองทั้งหมด', icon: 'clipboard-list' },
      { id: 'claims', label: 'แจ้งเคลม & ปลาเสียหาย', icon: 'alert-triangle', badgeId: 'badge-claims-count-sub' }
    ],
    rolesAllowed: ['CEO', 'Manager', 'Sales', 'Driver', 'QC', 'Accountant']
  },
  {
    id: 'inventory',
    number: 2,
    name: 'จัดการสต็อกในฟาร์มและการคัดขนาด',
    nameEn: 'Farm Inventory & Grading',
    desc: 'ผังบ่อเลี้ยงปลา ตาคัดขนาดมาตรฐาน (จ, ล, ก, ญ) ระบบเตือนรอบคัดขนาด 7-10 วัน คลังอาหาร/เวชภัณฑ์ และใบรับ GRN',
    icon: 'boxes',
    color: 'from-amber-500 to-orange-600',
    badge: 'อัปเดตระบบใหม่ (Active)',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    tags: ['ผังบ่อเลี้ยง', 'ตาคัดขนาดปลา', 'คลังอาหาร/ยา', 'ใบรับ GRN'],
    defaultTab: 'inventory',
    subtabs: [
      { id: 'inventory-ponds', label: 'ผังบ่อเลี้ยง & คัดขนาด', icon: 'scale', subtabParam: 'ponds' },
      { id: 'inventory-supplies', label: 'คลังอาหาร & พัสดุ', icon: 'package', subtabParam: 'supplies' },
      { id: 'inventory-grn', label: 'ใบรับสินค้า (GRN)', icon: 'file-check', subtabParam: 'inbound_grn' },
      { id: 'inventory-history', label: 'ประวัติการคัดและสูญเสีย', icon: 'history', subtabParam: 'history' }
    ],
    rolesAllowed: ['CEO', 'Manager', 'Sales', 'QC', 'Accountant']
  },
  {
    id: 'pos',
    number: 3,
    name: 'ระบบขายหน้าร้าน (POS)',
    nameEn: 'POS & Walk-in Store',
    desc: 'แคชเชียร์เปิดบิลขายสดหน้าฟาร์ม ตักปลาชั่งกิโล ขายอาหารและยาปลา ตัดสต็อก Real-time และออกใบเสร็จด่วน',
    icon: 'shopping-bag',
    color: 'from-emerald-600 to-teal-700',
    badge: 'พร้อมใช้งาน (Ready)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    tags: ['เปิดบิลขายสด', 'ตักปลาหน้าร้าน', 'ขายอาหารปลา', 'พิมพ์ใบเสร็จ'],
    defaultTab: 'pos',
    subtabs: [
      { id: 'pos-cashier', label: 'แคชเชียร์ขายสดหน้าร้าน', icon: 'shopping-cart' },
      { id: 'pos-history', label: 'ประวัติบิลขายหน้าร้าน', icon: 'receipt' }
    ],
    rolesAllowed: ['CEO', 'Manager', 'Sales', 'Accountant']
  },
  {
    id: 'production',
    number: 4,
    name: 'ฝ่ายผลิตและเพาะพันธุ์',
    nameEn: 'Production & Breeding',
    desc: 'ทะเบียนพ่อแม่พันธุ์ปลา วางแผนรอบผสมเทียม เพาะฟักไข่ บ่ออนุบาลลูกปลา และติดตามอัตราการรอด',
    icon: 'dna',
    color: 'from-purple-600 to-indigo-700',
    badge: 'ระยะที่ 2 (Phase 2)',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    tags: ['พ่อแม่พันธุ์', 'รอบเพาะฟัก', 'บ่ออนุบาล', 'อัตราการรอด'],
    defaultTab: 'production',
    subtabs: [
      { id: 'prod-hatchery', label: 'แผนเพาะฟัก & พ่อแม่พันธุ์', icon: 'dna' },
      { id: 'prod-nursery', label: 'บ่ออนุบาลลูกปลา', icon: 'waves' }
    ],
    rolesAllowed: ['CEO', 'Manager', 'QC']
  },
  {
    id: 'finance',
    number: 5,
    name: 'ฝ่ายบัญชีและการเงิน',
    nameEn: 'Accounting & Finance',
    desc: 'ใบตรวจรับสินค้า (GRN) บัญชีเงินมัดจำรับล่วงหน้า ลูกหนี้รอเก็บเงินปลายทาง ต้นทุนอาหารและปลาในฟาร์ม',
    icon: 'receipt',
    color: 'from-blue-700 to-cyan-800',
    badge: 'เชื่อมต่อระบบคลัง (Finance Link)',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    tags: ['ตรวจรับ GRN', 'เงินมัดจำ', 'ลูกหนี้รอเก็บ', 'ต้นทุนฟาร์ม'],
    defaultTab: 'finance',
    subtabs: [
      { id: 'fin-grn', label: 'ใบรับสินค้า (GRN) ส่งบัญชี', icon: 'file-text' },
      { id: 'fin-deposits', label: 'บัญชีเงินมัดจำ & ยอดรอเก็บ', icon: 'wallet' }
    ],
    rolesAllowed: ['CEO', 'Manager', 'Accountant']
  },
  {
    id: 'marketing',
    number: 6,
    name: 'ฝ่ายการตลาดและลูกค้าสัมพันธ์',
    nameEn: 'Marketing & CRM',
    desc: 'ฐานข้อมูลลูกค้าฟาร์มทั่วประเทศ แบ่งกลุ่มลูกค้า VIP สถิติยอดซื้อสะสม ประวัติการซื้อซ้ำ และแนวโน้มยอดขาย',
    icon: 'users',
    color: 'from-rose-600 to-pink-700',
    badge: 'CRM Active',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    tags: ['ประวัติลูกค้า', 'สมาชิกระดับ VIP', 'สถิติยอดซื้อ', 'แนวโน้มการขาย'],
    defaultTab: 'customers',
    subtabs: [
      { id: 'customers', label: 'ประวัติลูกค้า & VIP', icon: 'users' },
      { id: 'analytics', label: 'สถิติฟาร์ม & แนวโน้มการขาย', icon: 'bar-chart-3' }
    ],
    rolesAllowed: ['CEO', 'Manager', 'Sales', 'Accountant']
  },
  {
    id: 'hr',
    number: 7,
    name: 'ฝ่ายบุคคลและจัดการสิทธิ์',
    nameEn: 'HR & Permissions',
    desc: 'กำหนดสิทธิ์การเข้าถึงข้อมูลรายบทบาท (RBAC) บัญชีผู้ใช้งานระบบ รายชื่อคนขับรถจัดส่ง และบันทึกประวัติระบบ',
    icon: 'shield-check',
    color: 'from-slate-700 to-slate-900',
    badge: 'เฉพาะ CEO / ผู้บริหาร (Admin Only)',
    badgeColor: 'bg-slate-200 text-slate-800 border-slate-400',
    tags: ['กำหนดสิทธิ์ RBAC', 'บัญชีผู้ใช้งาน', 'คนขับรถ', 'ความปลอดภัย'],
    defaultTab: 'permissions',
    subtabs: [
      { id: 'permissions', label: 'สิทธิ์การใช้งาน (RBAC)', icon: 'shield-check' }
    ],
    rolesAllowed: ['CEO']
  }
];

// 2. PORTAL STATE & INITIALIZATION
function initPortal() {
  renderQuickRoleButtons();
  updatePortalKPIs();

  if (state.isLoggedIn) {
    showPortalView();
  } else {
    showLoginView();
  }
}

// 2.1 สลับหน้าจอมุมมองระดับสูง (Login Gate vs Portal Hub vs Module Workspace)
function showLoginView() {
  const gate = document.getElementById('login-gate');
  const portal = document.getElementById('view-portal');
  const modView = document.getElementById('view-module');
  const topHeader = document.getElementById('main-top-header');

  if (gate) gate.classList.remove('hidden');
  if (portal) portal.classList.add('hidden');
  if (modView) modView.classList.add('hidden');
  if (topHeader) topHeader.classList.add('hidden');
}

function showPortalView() {
  const gate = document.getElementById('login-gate');
  const portal = document.getElementById('view-portal');
  const modView = document.getElementById('view-module');
  const topHeader = document.getElementById('main-top-header');

  if (gate) gate.classList.add('hidden');
  if (portal) portal.classList.remove('hidden');
  if (modView) modView.classList.add('hidden');
  if (topHeader) topHeader.classList.remove('hidden');

  // ซ่อนแถบ Subtabs ของโมดูลในระดับ Hub
  const moduleSubnav = document.getElementById('module-subnav-bar');
  if (moduleSubnav) moduleSubnav.classList.add('hidden');

  // Highlight 'nav-item-portal' in SideNavBar
  document.querySelectorAll('.portal-nav-link').forEach(l => {
    l.classList.remove('bg-primary-container', 'text-white');
    l.classList.add('text-primary-fixed-dim', 'hover:bg-white/5');
    const icon = l.querySelector('.material-symbols-outlined');
    if (icon) icon.style.fontVariationSettings = "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
  });
  const homeNav = document.getElementById('nav-item-portal');
  if (homeNav) {
    homeNav.classList.add('bg-primary-container', 'text-white');
    homeNav.classList.remove('text-primary-fixed-dim', 'hover:bg-white/5');
    const icon = homeNav.querySelector('.material-symbols-outlined');
    if (icon) icon.style.fontVariationSettings = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24";
  }

  // ควบคุมสิทธิ์สำหรับคนขับรถ (Driver): เห็นเฉพาะโมดูลที่ 1 (จองปลาและคิวจัดส่ง)
  const isDriver = state.currentUser?.role === 'Driver';
  const otherModuleCardIds = [
    'portal-card-inventory',
    'portal-card-pos',
    'portal-card-production',
    'portal-card-finance',
    'portal-card-marketing',
    'portal-card-hr'
  ];
  otherModuleCardIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', isDriver);
  });

  // Hide other nav links in SideNavBar for driver
  const otherNavIds = [
    'nav-item-mod-inventory',
    'nav-item-mod-pos',
    'nav-item-mod-production',
    'nav-item-mod-finance',
    'nav-item-mod-marketing',
    'nav-item-mod-hr'
  ];
  otherNavIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', isDriver);
  });

  const blueprintShowcase = document.getElementById('portal-blueprint-showcase');
  if (blueprintShowcase) blueprintShowcase.classList.toggle('hidden', isDriver);

  const btnBlueprint = document.getElementById('portal-btn-blueprint');
  if (btnBlueprint) btnBlueprint.classList.toggle('hidden', isDriver);

  const btnNewOrder = document.getElementById('portal-btn-new-order');
  if (btnNewOrder) btnNewOrder.classList.toggle('hidden', isDriver);

  const btnSupervisor = document.getElementById('portal-btn-supervisor');
  if (btnSupervisor) btnSupervisor.classList.toggle('hidden', isDriver);

  const kpiReady = document.getElementById('portal-kpi-card-ready');
  if (kpiReady) kpiReady.classList.toggle('hidden', isDriver);

  const kpiDue = document.getElementById('portal-kpi-card-due');
  if (kpiDue) kpiDue.classList.toggle('hidden', isDriver);

  const kpiSupplies = document.getElementById('portal-kpi-card-supplies');
  if (kpiSupplies) kpiSupplies.classList.toggle('hidden', isDriver);

  updatePortalKPIs();
  renderUserBadge();
  lucide.createIcons();
}

function backToPortal() {
  showPortalView();
  const canvas = document.getElementById('portal-scroll-canvas');
  if (canvas) {
    canvas.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function openSuppliesSubtab() {
  openModule('inventory');
  setTimeout(() => {
    handleSubtabClick('inventory', 'inventory-supplies', 'supplies');
  }, 50);
}

function openGradingPondsSubtab() {
  openModule('inventory');
  setTimeout(() => {
    handleSubtabClick('inventory', 'inventory-ponds', 'ponds');
  }, 50);
}

// 2.1.1 ปฏิทินคิวจองปลาบนหน้า Portal Hub (Fish Booking Calendar)
let portalCalYear = new Date().getFullYear();
let portalCalMonth = new Date().getMonth();

function navigatePortalCalendar(delta) {
  portalCalMonth += delta;
  if (portalCalMonth < 0) {
    portalCalMonth = 11;
    portalCalYear -= 1;
  } else if (portalCalMonth > 11) {
    portalCalMonth = 0;
    portalCalYear += 1;
  }
  renderPortalBookingCalendar();
}

function resetPortalCalendarToday() {
  const d = new Date();
  portalCalYear = d.getFullYear();
  portalCalMonth = d.getMonth();
  renderPortalBookingCalendar();
}

function selectPortalCalendarDate(dateKey) {
  if (typeof openModule === 'function') {
    openModule('booking');
    setTimeout(() => {
      if (typeof selectCalendarDate === 'function') {
        selectCalendarDate(dateKey);
      }
    }, 60);
  }
}

function renderPortalBookingCalendar() {
  const titleEl = document.getElementById('portal-cal-month-title');
  const badgeEl = document.getElementById('portal-cal-orders-badge');
  const grid = document.getElementById('portal-cal-grid');
  const summaryEl = document.getElementById('portal-cal-month-summary');
  if (!grid) return;

  if (titleEl && typeof formatThaiMonthYear === 'function') {
    titleEl.textContent = formatThaiMonthYear(portalCalYear, portalCalMonth);
  } else if (titleEl) {
    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    titleEl.textContent = `${months[portalCalMonth]} ${portalCalYear + 543}`;
  }

  grid.innerHTML = '';

  const firstDay = new Date(portalCalYear, portalCalMonth, 1).getDay();
  const daysInMonth = new Date(portalCalYear, portalCalMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(portalCalYear, portalCalMonth, 0).getDate();
  const todayStr = typeof getTodayString === 'function' ? getTodayString() : new Date().toISOString().split('T')[0];

  let monthOrdersCount = 0;
  let monthDeliveredCount = 0;
  let monthDeliveryOrders = 0;
  let monthPickupOrders = 0;

  // วันที่เหลื่อมจากเดือนก่อนหน้า
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const cell = document.createElement('div');
    cell.className = 'h-11 sm:h-12 p-1 rounded-xl bg-slate-50/50 text-slate-300 flex flex-col justify-start items-center text-[10px] select-none';
    cell.innerHTML = `<span>${dayNum}</span>`;
    grid.appendChild(cell);
  }

  // วันที่ในเดือนปัจจุบัน
  for (let day = 1; day <= daysInMonth; day++) {
    const monthStr = String(portalCalMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateKey = `${portalCalYear}-${monthStr}-${dayStr}`;

    const dayOrders = (state.orders || []).filter(o => o.deliveryDate === dateKey && o.status !== 'cancelled');
    const isToday = dateKey === todayStr;

    monthOrdersCount += dayOrders.length;
    dayOrders.forEach(o => {
      if (o.status === 'delivered') monthDeliveredCount++;
      if (o.deliveryType === 'delivery') monthDeliveryOrders++;
      if (o.deliveryType === 'pickup') monthPickupOrders++;
    });

    const deliveryCount = dayOrders.filter(o => o.deliveryType === 'delivery').length;
    const pickupCount = dayOrders.filter(o => o.deliveryType === 'pickup').length;
    const hasProblem = dayOrders.some(o => o.status === 'problem');

    const cell = document.createElement('div');
    cell.className = `min-h-[44px] sm:min-h-[48px] p-1 rounded-xl border flex flex-col justify-between cursor-pointer transition-all hover:scale-105 hover:shadow-sm ${
      isToday 
        ? 'border-sky-400 bg-sky-50/80 shadow-xs ring-1 ring-sky-300' 
        : dayOrders.length > 0 
          ? 'border-slate-200 bg-white hover:border-sky-300' 
          : 'border-transparent bg-slate-50/50 hover:bg-white hover:border-slate-200'
    }`;
    cell.title = `วันที่ ${day}: มีงานจอง ${dayOrders.length} คิว (คลิกเพื่อดูรายละเอียด)`;
    cell.onclick = () => selectPortalCalendarDate(dateKey);

    let badgesHtml = '';
    if (dayOrders.length > 0) {
      badgesHtml = `
        <div class="flex items-center justify-center gap-0.5 flex-wrap w-full mt-0.5">
          ${deliveryCount > 0 ? `<span class="px-1 py-0.2 rounded text-[9px] font-bold bg-sky-100 text-sky-800" title="จัดส่ง ${deliveryCount} รายการ">🚚${deliveryCount}</span>` : ''}
          ${pickupCount > 0 ? `<span class="px-1 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800" title="รับเอง ${pickupCount} รายการ">🏠${pickupCount}</span>` : ''}
          ${hasProblem ? `<span class="text-[9px] text-red-500 font-bold" title="มีรายงานปัญหา/เคลม">⚠️</span>` : ''}
        </div>
      `;
    }

    cell.innerHTML = `
      <div class="flex items-center justify-between w-full px-0.5">
        <span class="text-[11px] sm:text-xs font-black ${
          isToday ? 'w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-xs' : 'text-slate-700'
        }">${day}</span>
        ${dayOrders.length > 0 ? `<span class="w-1.5 h-1.5 rounded-full ${dayOrders.every(o => o.status === 'delivered') ? 'bg-emerald-500' : 'bg-sky-500'}"></span>` : ''}
      </div>
      ${badgesHtml}
    `;
    grid.appendChild(cell);
  }

  // วันที่เหลื่อมของเดือนถัดไป
  const totalCells = firstDay + daysInMonth;
  const trailingDays = (7 - (totalCells % 7)) % 7;
  for (let d = 1; d <= trailingDays; d++) {
    const cell = document.createElement('div');
    cell.className = 'h-11 sm:h-12 p-1 rounded-xl bg-slate-50/50 text-slate-300 flex flex-col justify-start items-center text-[10px] select-none';
    cell.innerHTML = `<span>${d}</span>`;
    grid.appendChild(cell);
  }

  if (badgeEl) {
    badgeEl.textContent = `${monthOrdersCount} คิวจอง`;
  }
  if (summaryEl) {
    summaryEl.textContent = `รวมทั้งเดือน ${monthOrdersCount} คิว (🚚 ${monthDeliveryOrders} | 🏠 ${monthPickupOrders})`;
  }
}

// 2.1.2 การ์ดยอดขายฟาร์ม รายวัน/รายเดือน (Sales Revenue State & Calculation)
let portalSalesMode = 'daily'; // 'daily' or 'monthly'

function setPortalSalesMode(mode) {
  portalSalesMode = mode;
  const btnDaily = document.getElementById('portal-btn-sales-daily');
  const btnMonthly = document.getElementById('portal-btn-sales-monthly');
  if (btnDaily && btnMonthly) {
    if (mode === 'daily') {
      btnDaily.className = 'px-2.5 py-1 text-[10px] font-extrabold rounded-lg bg-white text-emerald-800 shadow-xs transition';
      btnMonthly.className = 'px-2.5 py-1 text-[10px] font-extrabold rounded-lg text-slate-500 hover:text-slate-800 transition';
    } else {
      btnMonthly.className = 'px-2.5 py-1 text-[10px] font-extrabold rounded-lg bg-white text-emerald-800 shadow-xs transition';
      btnDaily.className = 'px-2.5 py-1 text-[10px] font-extrabold rounded-lg text-slate-500 hover:text-slate-800 transition';
    }
  }
  updatePortalSalesMetrics();
}

function updatePortalSalesMetrics() {
  const todayStr = typeof getTodayString === 'function' ? getTodayString() : new Date().toISOString().split('T')[0];
  const currentMonthStr = todayStr.substring(0, 7); // 'YYYY-MM'

  const orders = (state.orders || []).filter(o => o.status !== 'cancelled');

  // ยอดขายวันนี้
  const todayOrders = orders.filter(o => o.deliveryDate === todayStr);
  const todaySales = todayOrders.reduce((sum, o) => sum + Number(o.netTotal || 0), 0);

  // ยอดขายเดือนนี้
  const monthOrders = orders.filter(o => o.deliveryDate && o.deliveryDate.startsWith(currentMonthStr));
  const monthSales = monthOrders.reduce((sum, o) => sum + Number(o.netTotal || 0), 0);

  const elAmount = document.getElementById('portal-sales-amount');
  const elPeriodLabel = document.getElementById('portal-sales-period-label');
  const elSecLabel = document.getElementById('portal-sales-secondary-label');
  const elSecValue = document.getElementById('portal-sales-secondary-value');
  const elTrendText = document.getElementById('portal-sales-trend-text');
  const elChartContainer = document.getElementById('portal-sales-chart-container');

  if (elAmount) {
    if (portalSalesMode === 'daily') {
      elAmount.textContent = '฿' + Math.round(todaySales).toLocaleString('th-TH');
      if (elPeriodLabel) elPeriodLabel.textContent = 'ยอดขายวันนี้';
      if (elSecLabel) elSecLabel.textContent = 'ยอดสะสมเดือนนี้';
      if (elSecValue) elSecValue.textContent = '฿' + Math.round(monthSales).toLocaleString('th-TH');
      if (elTrendText) elTrendText.textContent = `${todayOrders.length} ออเดอร์ส่งวันนี้`;
    } else {
      elAmount.textContent = '฿' + Math.round(monthSales).toLocaleString('th-TH');
      if (elPeriodLabel) elPeriodLabel.textContent = 'ยอดขายเดือนนี้';
      if (elSecLabel) elSecLabel.textContent = 'ยอดขายวันนี้';
      if (elSecValue) elSecValue.textContent = '฿' + Math.round(todaySales).toLocaleString('th-TH');
      if (elTrendText) elTrendText.textContent = `${monthOrders.length} ออเดอร์ในเดือนนี้`;
    }
  }

  // วาดกราฟแท่งแนวโน้มยอดขายย้อนหลัง 7 วัน
  if (elChartContainer) {
    const barsData = [];
    const todayDate = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(todayDate);
      d.setDate(d.getDate() - i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dStr = `${y}-${m}-${day}`;
      const daySales = orders.filter(o => o.deliveryDate === dStr).reduce((sum, o) => sum + Number(o.netTotal || 0), 0);
      const isCurrent = (i === 0);
      barsData.push({ dateStr: dStr, dayNum: day, sales: daySales, isCurrent });
    }

    const maxSales = Math.max(...barsData.map(b => b.sales), 1000);

    elChartContainer.innerHTML = barsData.map(b => {
      const pct = Math.max(16, Math.round((b.sales / maxSales) * 100));
      return `
        <div class="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end cursor-pointer" onclick="selectPortalCalendarDate('${b.dateStr}')" title="${b.dateStr}: ฿${Math.round(b.sales).toLocaleString()} (คลิกดูคิวงาน)">
          <div class="w-full ${b.isCurrent ? 'bg-emerald-600 shadow-xs' : 'bg-emerald-200/90 group-hover:bg-emerald-400'} rounded-t transition-all" style="height: ${pct}%;"></div>
          <span class="text-[9px] ${b.isCurrent ? 'text-emerald-800 font-black' : 'text-slate-400 font-bold'} leading-none">${b.dayNum}</span>
        </div>
      `;
    }).join('');
  }
}

// 2.2 อัปเดตตัวเลขสดบนหน้า Portal Hub (Live KPIs & Hero Grid)
function updatePortalKPIs() {
  const todayStr = getTodayString();
  const todayOrders = (state.orders || []).filter(o => o.deliveryDate === todayStr && o.status !== 'cancelled');
  const readyPonds = (state.ponds || []).filter(p => p.status === 'ready');
  const totalReadyFish = readyPonds.reduce((sum, p) => sum + Math.max(0, (p.totalQty || 0) - (p.reservedQty || 0)), 0);
  const duePonds = typeof getGradingDuePonds === 'function' ? getGradingDuePonds(7) : [];
  const lowSupplies = (state.supplies || []).filter(s => s.stockQty <= s.minThreshold);

  // Delivered vs pending calculation
  const deliveredToday = todayOrders.filter(o => o.status === 'delivered').length;
  const pendingToday = todayOrders.length - deliveredToday;

  // New Hero Grid Live Elements
  const heroOrdersCount = document.getElementById('portal-hero-orders-count');
  const heroTodayOrders = document.getElementById('portal-hero-today-orders');
  const heroOrdersSub = document.getElementById('portal-hero-orders-sub');
  const heroReadyFish = document.getElementById('portal-hero-ready-fish');
  const pulseFishPct = document.getElementById('portal-pulse-fish-pct');
  const pulseFishBar = document.getElementById('portal-pulse-fish-bar');
  const pulseDeliveryPct = document.getElementById('portal-pulse-delivery-pct');
  const pulseDeliveryBar = document.getElementById('portal-pulse-delivery-bar');

  if (heroOrdersCount) {
    heroOrdersCount.textContent = `LIVE: ${todayOrders.length} คิวจัดส่งวันนี้ • 48 บ่อสต็อกพร้อมจำหน่าย`;
  }
  if (heroTodayOrders) {
    heroTodayOrders.textContent = todayOrders.length;
  }
  if (heroOrdersSub) {
    heroOrdersSub.textContent = todayOrders.length > 0 
      ? `ส่งสำเร็จ ${deliveredToday} • รอจัดส่ง ${pendingToday}` 
      : 'วันนี้ไม่มีคิวจัดส่ง';
  }
  if (heroReadyFish) {
    heroReadyFish.textContent = totalReadyFish.toLocaleString();
  }

  // Capacity estimate: 48 ponds total capacity ~300,000 fish
  const totalCapacity = 300000;
  const fishPct = Math.min(100, Math.round((totalReadyFish / totalCapacity) * 100)) || 88;
  if (pulseFishPct) pulseFishPct.textContent = `${fishPct}%`;
  if (pulseFishBar) pulseFishBar.style.width = `${fishPct}%`;

  const inTransitCount = todayOrders.filter(o => o.status === 'in_transit').length;
  const deliveryRate = todayOrders.length > 0 
    ? Math.round(((deliveredToday + inTransitCount) / todayOrders.length) * 100) 
    : 100;
  if (pulseDeliveryPct) pulseDeliveryPct.textContent = `${deliveryRate}%`;
  if (pulseDeliveryBar) pulseDeliveryBar.style.width = `${deliveryRate}%`;

  // Legacy Banner elements compatibility
  const elTodayOrders = document.getElementById('portal-kpi-today-orders');
  const elReadyFish = document.getElementById('portal-kpi-ready-fish');
  const elDuePonds = document.getElementById('portal-kpi-due-ponds');
  const elLowSupplies = document.getElementById('portal-kpi-low-supplies');
  const elDueBadge = document.getElementById('portal-card-due-badge');

  if (elTodayOrders) elTodayOrders.textContent = `${todayOrders.length} คิว`;
  if (elReadyFish) elReadyFish.textContent = `${totalReadyFish.toLocaleString()} ตัว`;
  if (elDuePonds) elDuePonds.textContent = `${duePonds.length} บ่อ`;
  if (elLowSupplies) elLowSupplies.textContent = `${lowSupplies.length} รายการ`;

  if (elDueBadge) {
    if (duePonds.length > 0) {
      elDueBadge.textContent = `⚠️ ต้องคัด ${duePonds.length} บ่อ`;
      elDueBadge.className = 'px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white animate-pulse';
      elDueBadge.classList.remove('hidden');
    } else {
      elDueBadge.classList.add('hidden');
    }
  }

  // Welcome user banner
  const welcomeName = document.getElementById('portal-welcome-name');
  if (welcomeName && state.currentUser) {
    welcomeName.textContent = state.currentUser.name;
  }

  // Update Sidebar User Profile Card
  updatePortalSidebarProfile();

  // Render Fish Booking Calendar and Sales Metrics
  renderPortalBookingCalendar();
  updatePortalSalesMetrics();

  // Render Department Manifest Table
  renderDepartmentManifest();
}

// 2.2.1 วาดตารางสถานะการปฏิบัติงาน 7 แผนก (Department Operations Manifest Table)
function renderDepartmentManifest() {
  const container = document.getElementById('department-manifest-table-body');
  if (!container) return;

  const todayStr = getTodayString();
  const todayOrders = (state.orders || []).filter(o => o.deliveryDate === todayStr && o.status !== 'cancelled');
  const readyPonds = (state.ponds || []).filter(p => p.status === 'ready');
  const totalReadyFish = readyPonds.reduce((sum, p) => sum + Math.max(0, (p.totalQty || 0) - (p.reservedQty || 0)), 0);
  const totalCustomers = (state.customers || []).length;
  const isDriver = state.currentUser?.role === 'Driver';

  const departments = [
    {
      id: 'booking',
      number: 1,
      name: 'จองปลาและคิวจัดส่ง',
      nameEn: 'Booking & Logistics',
      icon: 'local_shipping',
      iconColor: 'bg-sky-100 text-sky-800',
      lead: 'พี่บุญมี / คุณสมศักดิ์',
      leadRole: 'ทีมจัดสายรถส่งของ',
      leadAvatar: '🚚',
      metric: `${todayOrders.length} คิวจัดส่งวันนี้`,
      metricSub: `ออเดอร์ในระบบทั้งหมด ${(state.orders || []).length} รายการ`,
      status: 'Active',
      statusColor: 'bg-secondary-container text-on-secondary-container',
      statusDot: 'bg-secondary',
      progress: 88,
      progressColor: 'bg-secondary'
    },
    {
      id: 'inventory',
      number: 2,
      name: 'จัดการสต็อก & ผัง 48 จุด',
      nameEn: 'Farm Inventory & Grading',
      icon: 'inventory_2',
      iconColor: 'bg-amber-100 text-amber-900',
      lead: 'คุณสมศักดิ์',
      leadRole: 'ผู้จัดการฟาร์ม',
      leadAvatar: '📋',
      metric: `${totalReadyFish.toLocaleString()} ตัวพร้อมขาย`,
      metricSub: `กระชัง/บ่อพร้อมใช้ ${readyPonds.length} จาก 48 จุด`,
      status: 'Active',
      statusColor: 'bg-secondary-container text-on-secondary-container',
      statusDot: 'bg-secondary',
      progress: 92,
      progressColor: 'bg-primary'
    },
    {
      id: 'pos',
      number: 3,
      name: 'ระบบขายหน้าร้าน (POS)',
      nameEn: 'POS & Walk-in Store',
      icon: 'point_of_sale',
      iconColor: 'bg-emerald-100 text-emerald-800',
      lead: 'คุณกานดา',
      leadRole: 'เจ้าหน้าที่ฝ่ายขาย / POS',
      leadAvatar: '💼',
      metric: 'แคชเชียร์ขายสดพร้อมใช้งาน',
      metricSub: 'ตักปลาชั่งกิโล & ขายอาหารปลา',
      status: 'Ready',
      statusColor: 'bg-secondary-container text-on-secondary-container',
      statusDot: 'bg-secondary',
      progress: 100,
      progressColor: 'bg-emerald-600'
    },
    {
      id: 'production',
      number: 4,
      name: 'ฝ่ายผลิตและเพาะพันธุ์',
      nameEn: 'Production & Breeding',
      icon: 'biotech',
      iconColor: 'bg-purple-100 text-purple-800',
      lead: 'ช่างเพาะพันธุ์ & คุณสมศักดิ์',
      leadRole: 'หัวหน้าฝ่ายเพาะขยายพันธุ์',
      leadAvatar: '🧬',
      metric: 'รอบเพาะฟัก & อัตราการรอด',
      metricSub: 'ทะเบียนพ่อแม่พันธุ์และบ่ออนุบาล',
      status: 'On-Track',
      statusColor: 'bg-surface-container-high text-on-surface-variant',
      statusDot: 'bg-outline',
      progress: 75,
      progressColor: 'bg-purple-600'
    },
    {
      id: 'finance',
      number: 5,
      name: 'ฝ่ายบัญชีและการเงิน',
      nameEn: 'Finance & Invoicing',
      icon: 'payments',
      iconColor: 'bg-blue-100 text-blue-800',
      lead: 'คุณเพ็ญศรี',
      leadRole: 'หัวหน้าฝ่ายบัญชีการเงิน',
      leadAvatar: '💰',
      metric: 'ตรวจรับสินค้า (GRN) & เงินมัดจำ',
      metricSub: 'บัญชีลูกหนี้รอเก็บเงินปลายทาง',
      status: 'Active',
      statusColor: 'bg-secondary-container text-on-secondary-container',
      statusDot: 'bg-secondary',
      progress: 90,
      progressColor: 'bg-blue-600'
    },
    {
      id: 'marketing',
      number: 6,
      name: 'การตลาด & ลูกค้าสัมพันธ์ (CRM)',
      nameEn: 'CRM & Lifetime Value',
      icon: 'groups',
      iconColor: 'bg-rose-100 text-rose-800',
      lead: 'ทีมการตลาด & ลูกค้า',
      leadRole: 'ฝ่ายดูแลสมาชิกระดับ VIP',
      leadAvatar: '🌟',
      metric: `${totalCustomers} รายชื่อลูกค้าตลอดชีพ`,
      metricSub: 'วิเคราะห์ยอดซื้อสะสมและสิทธิประโยชน์',
      status: 'Active',
      statusColor: 'bg-secondary-container text-on-secondary-container',
      statusDot: 'bg-secondary',
      progress: 84,
      progressColor: 'bg-rose-500'
    },
    {
      id: 'hr',
      number: 7,
      name: 'ฝ่ายบุคคลและจัดการสิทธิ์',
      nameEn: 'HR & Permissions Matrix',
      icon: 'admin_panel_settings',
      iconColor: 'bg-slate-200 text-slate-800',
      lead: 'ผู้ใหญ่พร',
      leadRole: 'CEO / เจ้าของฟาร์ม',
      leadAvatar: '👨‍🌾',
      metric: 'สิทธิ์ 6 บทบาท • คนขับ 2 สาย',
      metricSub: 'ระบบความปลอดภัยและการเข้าถึงข้อมูล',
      status: 'Secured',
      statusColor: 'bg-secondary-container text-on-secondary-container',
      statusDot: 'bg-secondary',
      progress: 100,
      progressColor: 'bg-slate-800'
    }
  ];

  // If driver, filter to only booking
  const filteredDepts = isDriver ? departments.filter(d => d.id === 'booking') : departments;

  container.innerHTML = filteredDepts.map(dept => `
    <tr class="manifest-dept-row hover:bg-primary-fixed/20 transition-colors cursor-pointer" onclick="openModule('${dept.id}')">
      <!-- Department Name & Icon -->
      <td class="px-6 py-4">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl ${dept.iconColor} flex items-center justify-center flex-shrink-0 shadow-xs">
            <span class="material-symbols-outlined text-lg">${dept.icon}</span>
          </div>
          <div>
            <div class="font-bold text-primary text-sm leading-tight flex items-center gap-1.5">
              <span>โมดูล ${dept.number}: ${dept.name}</span>
            </div>
            <div class="text-[11px] text-on-surface-variant font-medium">${dept.nameEn}</div>
          </div>
        </div>
      </td>

      <!-- Department Lead -->
      <td class="px-6 py-4">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-sm flex-shrink-0 border border-outline-variant/30">
            ${dept.leadAvatar}
          </div>
          <div>
            <div class="font-semibold text-xs text-on-background">${dept.lead}</div>
            <div class="text-[10px] text-on-surface-variant">${dept.leadRole}</div>
          </div>
        </div>
      </td>

      <!-- Key Metric -->
      <td class="px-6 py-4">
        <div class="font-bold text-xs text-primary">${dept.metric}</div>
        <div class="text-[10px] text-on-surface-variant">${dept.metricSub}</div>
      </td>

      <!-- Status -->
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 ${dept.statusColor} rounded-full text-[10px] font-extrabold uppercase tracking-tight">
          <span class="w-1.5 h-1.5 ${dept.statusDot} rounded-full"></span> ${dept.status}
        </span>
      </td>

      <!-- Progress Bar -->
      <td class="px-6 py-4">
        <div class="flex items-center gap-3 min-w-[100px]">
          <div class="flex-1 bg-surface-container h-2 rounded-full overflow-hidden">
            <div class="${dept.progressColor} h-full rounded-full transition-all duration-500" style="width: ${dept.progress}%"></div>
          </div>
          <span class="text-xs font-bold text-primary">${dept.progress}%</span>
        </div>
      </td>

      <!-- Direct Action Button -->
      <td class="px-6 py-4 text-right whitespace-nowrap">
        <button onclick="event.stopPropagation(); openModule('${dept.id}')" class="bg-surface-container hover:bg-primary hover:text-white text-primary text-xs font-bold px-3 py-1.5 rounded-xl border border-outline-variant/30 transition inline-flex items-center gap-1 group shadow-2xs">
          <span>เข้าสู่ระบบ</span>
          <span class="material-symbols-outlined text-xs group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
        </button>
      </td>
    </tr>
  `).join('');
}

// 2.2.2 ฟังก์ชันควบคุม SideNavBar และ Profile
function updatePortalSidebarProfile() {
  const u = state.currentUser;
  if (!u) return;
  const avatarEl = document.getElementById('portal-sidebar-avatar');
  const nameEl = document.getElementById('portal-sidebar-user-name');
  const roleEl = document.getElementById('portal-sidebar-user-role');

  if (avatarEl) avatarEl.textContent = u.avatar || '👨‍🌾';
  if (nameEl) nameEl.textContent = u.name || 'ผู้ใหญ่พร';
  if (roleEl) roleEl.textContent = u.roleLabel || u.role || 'CEO / เจ้าของฟาร์ม';
}

function togglePortalSidebar() {
  const sidebar = document.getElementById('portal-sidebar');
  const backdrop = document.getElementById('portal-sidebar-backdrop');
  if (!sidebar) return;
  const isClosed = sidebar.classList.contains('-translate-x-full');
  if (isClosed) {
    sidebar.classList.remove('-translate-x-full');
    if (backdrop) backdrop.classList.remove('hidden');
  } else {
    sidebar.classList.add('-translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
  }
}

function closePortalSidebar() {
  const sidebar = document.getElementById('portal-sidebar');
  const backdrop = document.getElementById('portal-sidebar-backdrop');
  if (sidebar && !sidebar.classList.contains('-translate-x-full') && window.innerWidth < 768) {
    sidebar.classList.add('-translate-x-full');
  }
  if (backdrop) backdrop.classList.add('hidden');
}

function handlePortalSearch(query) {
  const q = (query || '').toLowerCase().trim();
  
  // กรองการ์ด 7 โมดูล
  const cards = document.querySelectorAll('#view-portal .farm-card');
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });

  // กรองตาราง Department Operations Manifest
  const rows = document.querySelectorAll('#department-manifest-table-body tr.manifest-dept-row');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
}

// 2.3 ปุ่ม Quick Login ตามบทบาท (สำหรับทั้ง Login Gate และ Switch Role)
function renderQuickRoleButtons() {
  const containers = [
    document.getElementById('gate-quick-role-buttons'),
    document.getElementById('quick-role-buttons')
  ];

  const roles = [
    { key: 'CEO', label: 'ผู้ใหญ่พร (CEO)', avatar: '👨‍🌾', color: 'hover:border-amber-400 hover:bg-amber-50/50' },
    { key: 'Manager', label: 'คุณสมศักดิ์ (ผู้จัดการ)', avatar: '📋', color: 'hover:border-sky-400 hover:bg-sky-50/50' },
    { key: 'Sales', label: 'คุณกานดา (ฝ่ายขาย/POS)', avatar: '💼', color: 'hover:border-teal-400 hover:bg-teal-50/50' },
    { key: 'Accountant', label: 'คุณเพ็ญศรี (ฝ่ายบัญชี)', avatar: '💰', color: 'hover:border-blue-400 hover:bg-blue-50/50' },
    { key: 'QC', label: 'คุณสมศรี (หัวหน้า QC)', avatar: '🔬', color: 'hover:border-emerald-400 hover:bg-emerald-50/50' },
    { key: 'Driver', label: 'พี่บุญมี (คนขับรถ)', avatar: '🚚', color: 'hover:border-orange-400 hover:bg-orange-50/50' }
  ];

  containers.forEach(cnt => {
    if (!cnt) return;
    cnt.innerHTML = roles.map(r => `
      <button type="button" onclick="quickLoginAs('${r.key}')" class="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-white text-left transition flex items-center gap-2.5 ${r.color} shadow-2xs group">
        <span class="text-xl sm:text-2xl p-1 bg-slate-100 rounded-lg group-hover:scale-110 transition flex-shrink-0">${r.avatar}</span>
        <div class="min-w-0">
          <div class="font-bold text-xs text-slate-800 truncate">${r.label}</div>
          <div class="text-[10px] text-slate-400">คลิกเข้าใช้งานด่วน ➔</div>
        </div>
      </button>
    `).join('');
  });
}

function quickLoginAs(roleKey) {
  const user = (state.users || DEFAULT_USERS).find(u => u.role === roleKey);
  if (!user) return;

  state.currentUser = user;
  state.isLoggedIn = true;

  localStorage.setItem('phuyaiporn_logged_in', 'true');
  localStorage.setItem('phuyaiporn_logged_user_id', user.id);
  localStorage.setItem('phuyaiporn_current_user', user.id);

  closeModal('modal-login');

  if (user.role === 'Driver') {
    openModule('booking');
    switchTab('daily');
    showNotification(`เข้าสู่ระบบในฐานะ: ${user.name} (คนขับรถ)`, 'success');
  } else {
    showPortalView();
    showNotification(`เข้าสู่ระบบในฐานะ: ${user.name} (${user.roleLabel}) เรียบร้อยแล้ว`, 'success');
  }
}

// 3. MODULE NAVIGATION & WORKSPACE SWITCHER
let currentActiveModuleId = 'booking';

function openModule(moduleId) {
  const isDriver = state.currentUser?.role === 'Driver';
  if (isDriver && moduleId !== 'booking') {
    showNotification('คนขับรถมีสิทธิ์เข้าถึงเฉพาะโมดูลที่ 1 (จองปลาและคิวจัดส่ง) เท่านั้น', 'error');
    return;
  }

  const mod = FARM_MODULES.find(m => m.id === moduleId);
  if (!mod) return;

  // Permission Guard
  if (mod.rolesAllowed && !mod.rolesAllowed.includes(state.currentUser?.role) && state.currentUser?.role !== 'CEO') {
    showNotification(`คุณไม่มีสิทธิ์เข้าใช้งานโมดูล "${mod.name}" (เฉพาะ ${mod.rolesAllowed.join(', ')})`, 'error');
    return;
  }

  currentActiveModuleId = moduleId;
  state.currentModule = moduleId;

  // ซ่อน Portal Hub และแสดง Module Workspace
  const portal = document.getElementById('view-portal');
  const modView = document.getElementById('view-module');
  const moduleSubnav = document.getElementById('module-subnav-bar');

  if (portal) portal.classList.add('hidden');
  if (modView) modView.classList.remove('hidden');
  if (moduleSubnav) moduleSubnav.classList.remove('hidden');

  // อัปเดตสถานะ Active ใน SideNavBar
  const allNavLinks = document.querySelectorAll('#portal-sidebar nav a');
  allNavLinks.forEach(el => {
    el.classList.remove('bg-primary-container', 'text-white');
    el.classList.add('text-primary-fixed-dim', 'hover:bg-white/5');
    const icon = el.querySelector('.material-symbols-outlined');
    if (icon) icon.style.fontVariationSettings = "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
  });
  const activeNav = document.getElementById(`nav-item-mod-${moduleId}`);
  if (activeNav) {
    activeNav.classList.add('bg-primary-container', 'text-white');
    activeNav.classList.remove('text-primary-fixed-dim', 'hover:bg-white/5');
    const icon = activeNav.querySelector('.material-symbols-outlined');
    if (icon) icon.style.fontVariationSettings = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24";
  }

  // ปิดเมนูบนมือถือถ้าเปิดอยู่
  closePortalSidebar();

  // สร้างแถบ Subtabs เฉพาะโมดูลนี้
  renderModuleSubtabs(mod);

  // สลับการแสดงผลหน้าเนื้อหาตามโมดูล
  switchModuleWorkspace(mod);

  const canvas = document.getElementById('portal-scroll-canvas');
  if (canvas) {
    canvas.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  lucide.createIcons();
}

// 3.1 สร้างปุ่ม Subtabs เฉพาะโมดูล
function renderModuleSubtabs(mod) {
  const container = document.getElementById('module-subtabs-container');
  if (!container) return;

  const isDriver = state.currentUser?.role === 'Driver';
  let allowedSubtabs = mod.subtabs || [];

  // สำหรับคนขับรถ (Driver): ในโมดูลที่ 1 ให้เห็นแค่ "คิวจัดส่งประจำวัน" และ "แจ้งเคลม & ปลาเสียหาย" เท่านั้น
  if (isDriver) {
    allowedSubtabs = allowedSubtabs.filter(st => st.id === 'daily' || st.id === 'claims');
  }

  const currentTab = isDriver 
    ? (['daily', 'claims'].includes(state.activeTab) ? state.activeTab : 'daily')
    : (state.activeTab || mod.defaultTab);

  container.innerHTML = allowedSubtabs.map((st, idx) => `
    <button id="mod-subtab-btn-${st.id}" onclick="handleSubtabClick('${mod.id}', '${st.id}', '${st.subtabParam || ''}')" 
      class="mod-subtab-btn ${st.id === currentTab ? 'active bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:bg-sky-50'} px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition">
      <i data-lucide="${st.icon}" class="w-4 h-4"></i>
      <span>${st.label}</span>
      ${st.badgeId ? `<span id="${st.badgeId}" class="bg-amber-500 text-white text-[11px] font-black px-1.5 py-0.2 rounded-full">0</span>` : ''}
    </button>
  `).join('');

  // แสดงปุ่ม Action ด่วนเฉพาะโมดูลด้านขวา
  renderModuleQuickActions(mod);
}

function handleSubtabClick(moduleId, subtabId, subtabParam) {
  const isDriver = state.currentUser?.role === 'Driver';
  if (isDriver && !['daily', 'claims'].includes(subtabId)) {
    subtabId = 'daily';
  }

  document.querySelectorAll('.mod-subtab-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-sky-600', 'text-white', 'shadow-xs');
    btn.classList.add('text-slate-600', 'hover:bg-sky-50');
  });

  const activeBtn = document.getElementById(`mod-subtab-btn-${subtabId}`);
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-sky-600', 'text-white', 'shadow-xs');
    activeBtn.classList.remove('text-slate-600', 'hover:bg-sky-50');
  }

  if (moduleId === 'booking') {
    if (subtabId !== 'daily') {
      state.fromCalendarDateSelection = false;
      const btnNewOrder = document.getElementById('btn-daily-new-order');
      if (btnNewOrder) btnNewOrder.classList.add('hidden');
    } else if (!state.fromCalendarDateSelection) {
      const btnNewOrder = document.getElementById('btn-daily-new-order');
      if (btnNewOrder) btnNewOrder.classList.add('hidden');
    }
    switchTab(subtabId);
  } else if (moduleId === 'inventory') {
    if (typeof switchInventorySubTab === 'function' && subtabParam) {
      switchInventorySubTab(subtabParam);
    }
  } else if (moduleId === 'pos') {
    switchPosSubTab(subtabId);
  } else if (moduleId === 'production') {
    switchProductionSubTab(subtabId);
  } else if (moduleId === 'finance') {
    switchFinanceSubTab(subtabId);
  } else if (moduleId === 'marketing') {
    switchTab(subtabId);
  } else if (moduleId === 'hr') {
    switchTab(subtabId);
  }

  lucide.createIcons();
}

function renderModuleQuickActions(mod) {
  const container = document.getElementById('module-quick-actions-container');
  if (!container) return;

  const isDriver = state.currentUser?.role === 'Driver';

  if (mod.id === 'booking') {
    // ย้ายปุ่มจองพันธุ์ปลาใหม่ไปไว้ที่แถบวันที่ในหน้า คิวจัดส่งประจำวัน แล้ว
    container.innerHTML = '';
    return;
  } else if (mod.id === 'inventory') {
    container.innerHTML = `
      <div class="flex items-center gap-1.5 flex-wrap">
        <button onclick="openGradeFishModal()" class="btn-large bg-amber-500 hover:bg-amber-600 text-white py-2 px-3 text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5">
          <i data-lucide="scale" class="w-4 h-4"></i>
          <span class="hidden sm:inline">คัดขนาดปลา</span>
          <span class="sm:hidden">คัดขนาด</span>
        </button>
        <button onclick="openInboundGrnModal()" class="btn-large bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5">
          <i data-lucide="package-plus" class="w-4 h-4"></i>
          <span class="hidden sm:inline">รับเข้าสินค้า (GRN)</span>
          <span class="sm:hidden">รับเข้า GRN</span>
        </button>
      </div>
    `;
  } else if (mod.id === 'pos') {
    container.innerHTML = `
      <button onclick="openPosNewBill()" class="btn-large bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 text-xs sm:text-sm font-bold rounded-xl shadow-xs flex items-center gap-1.5">
        <i data-lucide="shopping-bag" class="w-4 h-4"></i>
        <span>+ เปิดบิลขายด่วน</span>
      </button>
    `;
  } else {
    container.innerHTML = '';
  }
}

// 3.2 สลับเนื้อหาหน้าจอให้ตรงกับโมดูลที่เลือก
function switchModuleWorkspace(mod) {
  // ซ่อนทุก tab-pane
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));

  const isDriver = state.currentUser?.role === 'Driver';

  if (mod.id === 'booking') {
    if (isDriver) {
      switchTab('daily');
    } else {
      switchTab('calendar');
    }
  } else if (mod.id === 'inventory') {
    const pane = document.getElementById('tab-inventory');
    if (pane) pane.classList.remove('hidden');
    if (typeof renderInventoryView === 'function') renderInventoryView();
  } else if (mod.id === 'pos') {
    const pane = document.getElementById('tab-pos');
    if (pane) pane.classList.remove('hidden');
    renderPosView();
  } else if (mod.id === 'production') {
    const pane = document.getElementById('tab-production');
    if (pane) pane.classList.remove('hidden');
    renderProductionView();
  } else if (mod.id === 'finance') {
    const pane = document.getElementById('tab-finance');
    if (pane) pane.classList.remove('hidden');
    renderFinanceView();
  } else if (mod.id === 'marketing') {
    switchTab('customers');
  } else if (mod.id === 'hr') {
    switchTab('permissions');
  }
}

// 4. POS (POINT OF SALE - โมดูลที่ 3: ขายสดหน้าร้าน)
let posCart = [];

function renderPosView() {
  const container = document.getElementById('pos-products-grid');
  if (!container) return;

  // รวมรายการปลาพร้อมขาย + อาหารปลา
  const readyPonds = (state.ponds || []).filter(p => p.status === 'ready' && (p.totalQty || 0) > 0);
  const fishItems = readyPonds.map(p => {
    const avail = Math.max(0, (p.totalQty || 0) - (p.reservedQty || 0));
    return {
      type: 'fish',
      id: p.id,
      name: p.fishName,
      size: p.fishSize,
      sieve: p.sieveCode,
      pondName: p.name,
      unit: 'ตัว',
      price: p.unitPrice || 1.5,
      avail
    };
  });

  const supplyItems = (state.supplies || []).map(s => ({
    type: 'supply',
    id: s.id,
    name: s.name,
    size: s.packageSize,
    sieve: '-',
    pondName: 'คลังพัสดุ',
    unit: s.unit,
    price: s.unitPrice || 450,
    avail: s.stockQty
  }));

  const allItems = [...fishItems, ...supplyItems];

  container.innerHTML = allItems.map(it => `
    <div onclick="addPosItemToCart('${it.type}', '${it.id}')" 
      class="bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group">
      <div>
        <div class="flex items-start justify-between gap-1 mb-1">
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${it.type === 'fish' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'}">
            ${it.type === 'fish' ? '🐟 ปลาเป็น' : '📦 อาหาร/พัสดุ'}
          </span>
          <span class="text-xs font-bold text-slate-500">${it.pondName}</span>
        </div>
        <h4 class="font-bold text-sm text-slate-800 group-hover:text-emerald-700 transition line-clamp-1">${it.name}</h4>
        <div class="text-xs text-slate-500 mt-0.5">${it.size || ''} ${it.sieve && it.sieve !== '-' ? `(ตาคัด ${it.sieve})` : ''}</div>
      </div>

      <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span class="text-[11px] text-slate-400 block">คงเหลือ</span>
          <span class="font-black text-xs ${it.avail > 0 ? 'text-slate-800' : 'text-rose-500'}">${it.avail.toLocaleString()} ${it.unit}</span>
        </div>
        <div class="text-right">
          <span class="text-[11px] text-slate-400 block">ราคา</span>
          <span class="font-black text-sm text-emerald-700">฿${Number(it.price).toLocaleString()}</span>
        </div>
      </div>
    </div>
  `).join('');

  renderPosCart();
}

function addPosItemToCart(type, id) {
  let target = null;
  if (type === 'fish') {
    const pond = (state.ponds || []).find(p => p.id === id);
    if (!pond) return;
    const avail = Math.max(0, (pond.totalQty || 0) - (pond.reservedQty || 0));
    if (avail <= 0) {
      showNotification(`ปลาในบ่อ ${pond.name} หมดแล้ว`, 'error');
      return;
    }
    target = {
      type,
      id: pond.id,
      name: pond.fishName,
      size: pond.fishSize,
      unit: 'ตัว',
      unitPrice: pond.unitPrice || 1.5,
      maxAvail: avail
    };
  } else {
    const sup = (state.supplies || []).find(s => s.id === id);
    if (!sup) return;
    if (sup.stockQty <= 0) {
      showNotification(`สินค้า ${sup.name} หมดสต็อก`, 'error');
      return;
    }
    target = {
      type,
      id: sup.id,
      name: sup.name,
      size: sup.packageSize,
      unit: sup.unit,
      unitPrice: sup.unitPrice || 450,
      maxAvail: sup.stockQty
    };
  }

  const existing = posCart.find(it => it.type === type && it.id === id);
  if (existing) {
    if (existing.qty + 1 > existing.maxAvail) {
      showNotification(`สต็อกมีจำกัดเพียง ${existing.maxAvail} ${existing.unit}`, 'warning');
      return;
    }
    existing.qty += 1;
  } else {
    posCart.push({ ...target, qty: 1 });
  }

  renderPosCart();
}

function updatePosCartQty(index, newQty) {
  const q = Number(newQty);
  if (q <= 0) {
    posCart.splice(index, 1);
  } else {
    if (q > posCart[index].maxAvail) {
      showNotification(`สต็อกคงเหลือเพียง ${posCart[index].maxAvail}`, 'warning');
      posCart[index].qty = posCart[index].maxAvail;
    } else {
      posCart[index].qty = q;
    }
  }
  renderPosCart();
}

function removePosCartItem(index) {
  posCart.splice(index, 1);
  renderPosCart();
}

function clearPosCart() {
  posCart = [];
  renderPosCart();
}

function renderPosCart() {
  const container = document.getElementById('pos-cart-items');
  const totalEl = document.getElementById('pos-cart-total');
  const countEl = document.getElementById('pos-cart-count');
  if (!container) return;

  if (posCart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 text-slate-400">
        <i data-lucide="shopping-cart" class="w-10 h-10 mx-auto mb-2 opacity-40"></i>
        <p class="text-xs">ยังไม่มีรายการสินค้าในบิล<br/>คลิกเลือกรายการปลาหรืออาหารจากด้านซ้ายได้เลยครับ</p>
      </div>
    `;
    if (totalEl) totalEl.textContent = '฿0.00';
    if (countEl) countEl.textContent = '0 รายการ';
    lucide.createIcons();
    return;
  }

  let grandTotal = 0;
  let totalItemsCount = 0;

  container.innerHTML = posCart.map((it, idx) => {
    const itemTotal = it.qty * it.unitPrice;
    grandTotal += itemTotal;
    totalItemsCount += it.qty;

    return `
      <div class="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-2 shadow-2xs">
        <div class="min-w-0 flex-1">
          <div class="font-bold text-xs text-slate-800 truncate">${it.name}</div>
          <div class="text-[11px] text-slate-400">${it.size || ''} • ฿${it.unitPrice}/${it.unit}</div>
        </div>

        <div class="flex items-center gap-1.5">
          <input type="number" min="1" max="${it.maxAvail}" value="${it.qty}" 
            onchange="updatePosCartQty(${idx}, this.value)"
            class="input-large text-xs py-1 px-1.5 w-16 text-center font-bold">
          <span class="text-xs text-slate-500">${it.unit}</span>
        </div>

        <div class="text-right min-w-[70px]">
          <span class="font-black text-xs text-emerald-700 block">฿${itemTotal.toLocaleString()}</span>
          <button type="button" onclick="removePosCartItem(${idx})" class="text-[11px] text-rose-500 hover:text-rose-700 font-semibold">ลบ</button>
        </div>
      </div>
    `;
  }).join('');

  if (totalEl) totalEl.textContent = '฿' + grandTotal.toLocaleString('th-TH', { minimumFractionDigits: 2 });
  if (countEl) countEl.textContent = `${totalItemsCount.toLocaleString()} ชิ้น (${posCart.length} รายการ)`;

  lucide.createIcons();
}

function handlePosCheckout() {
  if (posCart.length === 0) {
    showNotification('กรุณาเลือกสินค้าลงในบิลก่อนชำระเงิน', 'error');
    return;
  }

  const custName = document.getElementById('pos-customer-name')?.value.trim() || 'ลูกค้าหน้าร้าน (เงินสด)';
  const custPhone = document.getElementById('pos-customer-phone')?.value.trim() || '-';
  const payMethod = document.getElementById('pos-payment-method')?.value || 'เงินสด';
  const dateStr = getTodayString();

  let grossTotal = 0;
  const items = posCart.map(it => {
    const t = it.qty * it.unitPrice;
    grossTotal += t;
    return {
      category: it.type === 'fish' ? 'พันธุ์ปลา' : 'อาหารปลา',
      name: it.name,
      size: it.size || '',
      qty: it.qty,
      unit: it.unit,
      unitPrice: it.unitPrice,
      totalPrice: t,
      pondId: it.type === 'fish' ? it.id : undefined
    };
  });

  const orderId = 'POS-' + dateStr.replace(/-/g, '') + '-' + String((state.orders || []).length + 1).padStart(3, '0');

  const newPosOrder = {
    id: orderId,
    orderNumber: 'POS-' + String((state.orders || []).length + 1).padStart(3, '0'),
    customerId: 'cust_walkin',
    customerName: custName,
    customerPhone: custPhone,
    deliveryType: 'pickup',
    deliveryAddress: 'รับเองหน้าร้าน ฟาร์มปลาผู้ใหญ่พร',
    mapsUrl: '',
    deliveryDate: dateStr,
    deliveryTimeSlot: 'หน้าร้าน (สด)',
    status: 'delivered',
    paymentStatus: 'paid_full',
    paymentMethod: payMethod,
    items,
    grossTotal,
    totalDiscount: 0,
    netTotal: grossTotal,
    deposit: grossTotal,
    remainingBalance: 0,
    actualCollected: grossTotal,
    collectedMethod: payMethod,
    driverName: 'ลูกค้าตักรับเองหน้าร้าน',
    notes: 'เปิดบิลขายด่วนหน้าร้าน POS สำเร็จ',
    createdAt: dateStr + ' ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
  };

  // ตัดสต็อกจริงทันที
  if (typeof deductStockForDeliveredOrder === 'function') {
    deductStockForDeliveredOrder(newPosOrder);
  }

  state.orders.unshift(newPosOrder);
  saveState();

  showNotification(`ออกบิลขายหน้าร้าน ${orderId} ยอดรวม ฿${grossTotal.toLocaleString()} สำเร็จ!`, 'success');
  clearPosCart();
  renderPosView();

  // เปิดดูใบเสร็จด่วน
  viewOrderSlip(orderId);
}

function openPosNewBill() {
  clearPosCart();
  const inp = document.getElementById('pos-customer-name');
  if (inp) {
    inp.value = 'ลูกค้าหน้าร้าน (เงินสด)';
    inp.focus();
  }
}

function switchPosSubTab(subtabId) {
  const secCashier = document.getElementById('pos-section-cashier');
  const secHistory = document.getElementById('pos-section-history');

  if (secCashier) secCashier.classList.toggle('hidden', subtabId !== 'pos-cashier');
  if (secHistory) secHistory.classList.toggle('hidden', subtabId !== 'pos-history');

  if (subtabId === 'pos-cashier') {
    renderPosView();
  } else if (subtabId === 'pos-history') {
    renderPosHistory();
  }
}

function renderPosHistory() {
  const tbody = document.getElementById('pos-history-tbody');
  if (!tbody) return;

  const posOrders = (state.orders || []).filter(o => o.id && o.id.startsWith('POS-'));

  if (posOrders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-slate-400">ยังไม่มีประวัติบิลขายหน้าร้าน</td></tr>`;
    return;
  }

  tbody.innerHTML = posOrders.map(o => `
    <tr class="border-b border-slate-100 hover:bg-slate-50 transition text-xs">
      <td class="p-3 font-bold text-sky-900">${o.id}</td>
      <td class="p-3">${formatThaiDate(o.deliveryDate)}</td>
      <td class="p-3 font-semibold">${o.customerName}</td>
      <td class="p-3">${o.items.map(it => `${it.name} x ${Number(it.qty).toLocaleString()} ${it.unit}`).join(', ')}</td>
      <td class="p-3 text-right font-black text-emerald-700">฿${Number(o.netTotal).toLocaleString()}</td>
      <td class="p-3 text-right">
        <button onclick="viewOrderSlip('${o.id}')" class="px-2 py-1 text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 rounded-lg hover:bg-sky-100">ดูใบเสร็จ</button>
      </td>
    </tr>
  `).join('');
}

// 5. PRODUCTION & BREEDING (โมดูลที่ 4: ฝ่ายผลิตและเพาะพันธุ์)
function renderProductionView() {
  // Stats and batches
  lucide.createIcons();
}

function switchProductionSubTab(subtabId) {
  const secHatchery = document.getElementById('prod-sec-hatchery');
  const secNursery = document.getElementById('prod-sec-nursery');

  if (secHatchery) secHatchery.classList.toggle('hidden', subtabId !== 'prod-hatchery');
  if (secNursery) secNursery.classList.toggle('hidden', subtabId !== 'prod-nursery');

  lucide.createIcons();
}

// 6. FINANCE & ACCOUNTING (โมดูลที่ 5: ฝ่ายบัญชีและการเงิน)
function renderFinanceView() {
  const grnTbody = document.getElementById('finance-grn-tbody');
  const totalAmountEl = document.getElementById('fin-total-grn-amount');
  const totalDepositsEl = document.getElementById('fin-total-deposits');
  const totalReceivablesEl = document.getElementById('fin-total-receivables');

  const grnList = state.grnList || [];
  const totalGrnAmt = grnList.reduce((sum, g) => sum + (Number(g.totalAmount) || 0), 0);

  const activeOrders = (state.orders || []).filter(o => o.status !== 'cancelled');
  const totalDeposits = activeOrders.reduce((sum, o) => sum + (Number(o.deposit) || 0), 0);
  const totalReceivables = activeOrders.reduce((sum, o) => sum + (Number(o.remainingBalance) || 0), 0);

  if (totalAmountEl) totalAmountEl.textContent = '฿' + totalGrnAmt.toLocaleString('th-TH', { minimumFractionDigits: 2 });
  if (totalDepositsEl) totalDepositsEl.textContent = '฿' + totalDeposits.toLocaleString('th-TH', { minimumFractionDigits: 2 });
  if (totalReceivablesEl) totalReceivablesEl.textContent = '฿' + totalReceivables.toLocaleString('th-TH', { minimumFractionDigits: 2 });

  if (grnTbody) {
    if (grnList.length === 0) {
      grnTbody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-slate-400">ไม่มีรายการใบรับสินค้า GRN</td></tr>`;
    } else {
      grnTbody.innerHTML = grnList.map(g => `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition text-xs">
          <td class="p-3 font-bold text-sky-900">${g.id}</td>
          <td class="p-3">${formatThaiDate(g.date)}</td>
          <td class="p-3 font-semibold">${g.supplier}</td>
          <td class="p-3">${(g.items || []).map(i => `${i.name} (${Number(i.qty).toLocaleString()} ${i.unit})`).join(', ')}</td>
          <td class="p-3 text-right font-black text-slate-800">฿${Number(g.totalAmount).toLocaleString()}</td>
          <td class="p-3 text-center">
            <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              <i data-lucide="check" class="w-3 h-3"></i> บันทึกต้นทุนแล้ว
            </span>
          </td>
        </tr>
      `).join('');
    }
  }

  lucide.createIcons();
}

function switchFinanceSubTab(subtabId) {
  const secGrn = document.getElementById('fin-sec-grn');
  const secDeposits = document.getElementById('fin-sec-deposits');

  if (secGrn) secGrn.classList.toggle('hidden', subtabId !== 'fin-grn');
  if (secDeposits) secDeposits.classList.toggle('hidden', subtabId !== 'fin-deposits');

  if (subtabId === 'fin-deposits') {
    renderFinanceDepositsTable();
  }

  lucide.createIcons();
}

function renderFinanceDepositsTable() {
  const tbody = document.getElementById('finance-deposits-tbody');
  if (!tbody) return;

  const ordersWithBal = (state.orders || []).filter(o => o.status !== 'cancelled' && (o.deposit > 0 || o.remainingBalance > 0));

  if (ordersWithBal.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-slate-400">ไม่มีข้อมูลเงินมัดจำหรือยอดคงค้าง</td></tr>`;
    return;
  }

  tbody.innerHTML = ordersWithBal.map(o => `
    <tr class="border-b border-slate-100 hover:bg-slate-50 transition text-xs">
      <td class="p-3 font-bold text-sky-900">${o.id}</td>
      <td class="p-3">${formatThaiDate(o.deliveryDate)}</td>
      <td class="p-3 font-semibold">${o.customerName}</td>
      <td class="p-3 text-right font-bold text-slate-800">฿${Number(o.netTotal).toLocaleString()}</td>
      <td class="p-3 text-right font-bold text-emerald-700">฿${Number(o.deposit).toLocaleString()}</td>
      <td class="p-3 text-right font-black ${o.remainingBalance > 0 ? 'text-amber-700' : 'text-slate-400'}">
        ฿${Number(o.remainingBalance).toLocaleString()}
      </td>
    </tr>
  `).join('');
}
