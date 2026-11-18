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
      { id: 'inventory-ponds', label: 'ค้นหาที่เก็บปลา', icon: 'search', subtabParam: 'ponds' },
      { id: 'inventory-supplies', label: 'คลังอาหาร & พัสดุ', icon: 'package', subtabParam: 'supplies' },
      { id: 'inventory-grn', label: 'ใบรับสินค้า (GRN)', icon: 'file-check', subtabParam: 'inbound_grn' },
      { id: 'inventory-history', label: 'ประวัติการคัดและสูญเสีย', icon: 'history', subtabParam: 'history' },
      { id: 'inventory-mortality', label: 'ปลาตาย/หาย', icon: 'skull', subtabParam: 'mortality' }
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

  // แสดงแถบเมนูด้านข้างกลับมาเป็นปกติเมื่ออยู่ในหน้าศูนย์รวม 7 โมดูล
  setPortalSidebarDrawerMode(false);

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
    cell.className = 'h-11 sm:h-12 p-1 rounded-xl bg-slate-800/30 text-slate-500/70 flex flex-col justify-start items-center text-[10px] select-none';
    cell.innerHTML = `<span>${dayNum}</span>`;
    grid.appendChild(cell);
  }

  // วันที่ในเดือนปัจจุบัน
  for (let day = 1; day <= daysInMonth; day++) {
    const monthStr = String(portalCalMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateKey = `${portalCalYear}-${monthStr}-${dayStr}`;

    const dayOrders = (state.orders || []).filter(o => o.deliveryDate === dateKey && o.status !== 'cancelled' && !(o.id && o.id.startsWith('POS-')) && !o.isPosWalkIn);
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
    cell.className = `min-h-[44px] sm:min-h-[48px] p-1 rounded-xl border flex flex-col justify-between cursor-pointer transition-all hover:scale-105 hover:shadow-md ${
      isToday 
        ? 'border-sky-400 bg-sky-500/25 shadow-sm ring-1 ring-sky-400/50' 
        : dayOrders.length > 0 
          ? 'border-slate-700/80 bg-slate-800/80 hover:border-sky-400 hover:bg-slate-800' 
          : 'border-transparent bg-slate-800/40 hover:bg-slate-800/70 hover:border-slate-700/60'
    }`;
    cell.title = `วันที่ ${day}: มีงานจอง ${dayOrders.length} คิว (คลิกเพื่อดูรายละเอียด)`;
    cell.onclick = () => selectPortalCalendarDate(dateKey);

    let badgesHtml = '';
    if (dayOrders.length > 0) {
      badgesHtml = `
        <div class="flex items-center justify-center gap-0.5 flex-wrap w-full mt-0.5">
          ${deliveryCount > 0 ? `<span class="px-1 py-0.2 rounded text-[9px] font-bold bg-sky-500/30 text-sky-200 border border-sky-400/30" title="จัดส่ง ${deliveryCount} รายการ">🚚${deliveryCount}</span>` : ''}
          ${pickupCount > 0 ? `<span class="px-1 py-0.2 rounded text-[9px] font-bold bg-amber-500/30 text-amber-200 border border-amber-400/30" title="รับเอง ${pickupCount} รายการ">🏠${pickupCount}</span>` : ''}
          ${hasProblem ? `<span class="text-[9px] text-red-400 font-bold" title="มีรายงานปัญหา/เคลม">⚠️</span>` : ''}
        </div>
      `;
    }

    cell.innerHTML = `
      <div class="flex items-center justify-between w-full px-0.5">
        <span class="text-[11px] sm:text-xs font-black ${
          isToday ? 'w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-xs' : 'text-slate-200'
        }">${day}</span>
        ${dayOrders.length > 0 ? `<span class="w-1.5 h-1.5 rounded-full ${dayOrders.every(o => o.status === 'delivered') ? 'bg-emerald-400' : 'bg-sky-400'}"></span>` : ''}
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
    cell.className = 'h-11 sm:h-12 p-1 rounded-xl bg-slate-800/30 text-slate-500/70 flex flex-col justify-start items-center text-[10px] select-none';
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
      btnDaily.className = 'px-2.5 py-1 text-[10px] font-extrabold rounded-lg bg-emerald-500/25 text-emerald-300 border border-emerald-400/30 shadow-xs transition';
      btnMonthly.className = 'px-2.5 py-1 text-[10px] font-extrabold rounded-lg text-slate-400 hover:text-slate-200 transition';
    } else {
      btnMonthly.className = 'px-2.5 py-1 text-[10px] font-extrabold rounded-lg bg-emerald-500/25 text-emerald-300 border border-emerald-400/30 shadow-xs transition';
      btnDaily.className = 'px-2.5 py-1 text-[10px] font-extrabold rounded-lg text-slate-400 hover:text-slate-200 transition';
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
          <div class="w-full ${b.isCurrent ? 'bg-emerald-400 shadow-xs' : 'bg-emerald-500/35 group-hover:bg-emerald-400/70'} rounded-t transition-all" style="height: ${pct}%;"></div>
          <span class="text-[9px] ${b.isCurrent ? 'text-emerald-300 font-black' : 'text-slate-400 font-bold'} leading-none">${b.dayNum}</span>
        </div>
      `;
    }).join('');
  }
}

// 2.2 อัปเดตตัวเลขสดบนหน้า Portal Hub (Live KPIs & Hero Grid)
function updatePortalKPIs() {
  const todayStr = getTodayString();
  const todayOrders = (state.orders || []).filter(o => o.deliveryDate === todayStr && o.status !== 'cancelled' && !(o.id && o.id.startsWith('POS-')) && !o.isPosWalkIn);
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

function setPortalSidebarDrawerMode(isDrawer) {
  const sidebar = document.getElementById('portal-sidebar');
  const backdrop = document.getElementById('portal-sidebar-backdrop');
  const toggleBtn = document.getElementById('portal-sidebar-toggle-btn');
  const closeBtn = document.getElementById('portal-sidebar-close-btn');
  if (!sidebar) return;

  if (isDrawer) {
    // หดแถบเมนูด้านข้างเข้าไปทางซ้ายมือเหมือนในมือถือทุกขนาดหน้าจอ
    sidebar.classList.remove('md:translate-x-0', 'md:static', 'md:shadow-none');
    sidebar.classList.add('-translate-x-full');
    if (backdrop) {
      backdrop.classList.remove('md:hidden');
      backdrop.classList.add('hidden');
    }
    if (toggleBtn) toggleBtn.classList.remove('md:hidden');
    if (closeBtn) closeBtn.classList.remove('md:hidden');
  } else {
    // กลับสู่หน้าศูนย์รวม 7 โมดูล: แสดงแถบเมนูด้านข้างบนจอคอมตามปกติ
    sidebar.classList.add('md:translate-x-0', 'md:static', 'md:shadow-none', '-translate-x-full');
    if (backdrop) {
      backdrop.classList.add('hidden', 'md:hidden');
    }
    if (toggleBtn) toggleBtn.classList.add('md:hidden');
    if (closeBtn) closeBtn.classList.add('md:hidden');
  }
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
  const isDrawerMode = sidebar && !sidebar.classList.contains('md:static');
  if (sidebar && !sidebar.classList.contains('-translate-x-full') && (isDrawerMode || window.innerWidth < 768)) {
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

  // เมื่อกดเข้าโมดูลแล้ว ให้แถบเมนูด้านข้างหดเข้าไปทางซ้ายมือเหมือนในมือถือ
  setPortalSidebarDrawerMode(true);

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
    // ตัดปุ่มด่วนด้านบนออกตามที่ผู้ใช้ร้องขอ เนื่องจากมีปุ่มจัดการสต็อกและคัดขนาดในแถบหัวตารางอยู่แล้ว
    container.innerHTML = '';
    return;
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
let posSelectedCategory = 'all';
let posSearchQuery = '';

function getPosAllItems() {
  // 1. รายการปลาพร้อมขายจากบ่อ/กระชังจริง
  const readyPonds = (state.ponds || []).filter(p => p.status === 'ready' && (p.totalQty || 0) > 0);
  const fishItems = readyPonds.map(p => {
    const avail = Math.max(0, (p.totalQty || 0) - (p.reservedQty || 0));
    return {
      type: 'fish',
      id: p.id,
      code: p.code || '',
      category: 'พันธุ์ปลา',
      name: p.fishName,
      size: p.fishSize,
      sieve: p.sieveCode,
      pondName: p.name,
      unit: 'ตัว',
      price: p.unitPrice || 1.5,
      avail
    };
  });

  // 2. รายการจากคลังอาหารและเวชภัณฑ์ (state.supplies)
  const supplyItems = (state.supplies || []).map(s => ({
    type: 'supply',
    id: s.id,
    code: '',
    category: s.category || 'อาหารปลา',
    name: s.name,
    size: s.packageSize,
    sieve: '-',
    pondName: 'คลังพัสดุ',
    unit: s.unit,
    price: s.unitPrice || 450,
    avail: s.stockQty
  }));

  // 3. รายการเพิ่มเติมจาก PRODUCT_CATALOG (เช่น กระชังเลี้ยงปลา หรือรายการที่ยังไม่อยู่ใน supplies)
  const catalogExtraItems = (typeof PRODUCT_CATALOG !== 'undefined' ? PRODUCT_CATALOG : [])
    .filter(c => c.category !== 'พันธุ์ปลา' && !supplyItems.some(s => s.name === c.name || c.name.includes(s.name)))
    .map(c => ({
      type: 'catalog',
      id: c.id,
      code: '',
      category: c.category || 'อุปกรณ์อื่นๆ',
      name: c.name,
      size: (c.defaultSizes && c.defaultSizes[0]) || '',
      sieve: '-',
      pondName: 'หน้าร้าน',
      unit: c.unit || 'ชิ้น',
      price: c.defaultPrice || 100,
      avail: 99
    }));

  return [...fishItems, ...supplyItems, ...catalogExtraItems];
}

function getPosCategoriesConfig(allItems) {
  const countByCat = (cat) => allItems.filter(it => it.category === cat).length;

  const baseCategories = [
    { id: 'all', label: 'ทั้งหมด', icon: 'layout-grid', emoji: '🛒', count: allItems.length },
    { id: 'พันธุ์ปลา', label: 'พันธุ์ปลาพร้อมขาย', icon: 'fish', emoji: '🐟', count: countByCat('พันธุ์ปลา') },
    { id: 'อาหารปลา', label: 'อาหารปลา', icon: 'package', emoji: '🌾', count: countByCat('อาหารปลา') },
    { id: 'ยารักษาโรคปลา', label: 'ยารักษาโรคปลา', icon: 'pill', emoji: '💊', count: countByCat('ยารักษาโรคปลา') },
    { id: 'สารปรับสภาพน้ำ', label: 'สารปรับสภาพน้ำ', icon: 'droplets', emoji: '🧪', count: countByCat('สารปรับสภาพน้ำ') },
    { id: 'กระชังเลี้ยงปลา', label: 'กระชังเลี้ยงปลา', icon: 'box', emoji: '🕸️', count: countByCat('กระชังเลี้ยงปลา') }
  ];

  // เพิ่มหมวดหมู่อื่นๆ ถ้ามีในข้อมูลแต่ไม่อยู่ใน baseCategories
  const knownIds = new Set(baseCategories.map(c => c.id));
  allItems.forEach(it => {
    if (it.category && !knownIds.has(it.category)) {
      knownIds.add(it.category);
      baseCategories.push({
        id: it.category,
        label: it.category,
        icon: 'tag',
        emoji: '📦',
        count: countByCat(it.category)
      });
    }
  });

  return baseCategories;
}

function selectPosCategory(catId) {
  posSelectedCategory = catId;
  renderPosView();
}

function handlePosSearch(val) {
  posSearchQuery = (val || '').trim();
  const clearBtn = document.getElementById('pos-search-clear-btn');
  if (clearBtn) {
    clearBtn.classList.toggle('hidden', posSearchQuery.length === 0);
  }
  renderPosProductsGrid();
}

function clearPosSearch() {
  posSearchQuery = '';
  const inp = document.getElementById('pos-search-input');
  if (inp) {
    inp.value = '';
    inp.focus();
  }
  const clearBtn = document.getElementById('pos-search-clear-btn');
  if (clearBtn) clearBtn.classList.add('hidden');
  renderPosProductsGrid();
}

function renderPosCategories(allItems) {
  const sidebar = document.getElementById('pos-categories-sidebar');
  if (!sidebar) return;

  const categories = getPosCategoriesConfig(allItems);

  sidebar.innerHTML = categories.map(cat => {
    const isActive = posSelectedCategory === cat.id;
    return `
      <button
        type="button"
        onclick="selectPosCategory('${cat.id}')"
        class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between gap-2 shrink-0 lg:shrink ${
          isActive
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200/80'
        }"
      >
        <div class="flex items-center gap-2 min-w-0">
          <span class="text-base leading-none">${cat.emoji}</span>
          <span class="truncate">${cat.label}</span>
        </div>
        <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
          isActive
            ? 'bg-white/20 text-white'
            : 'bg-white text-slate-600 border border-slate-200'
        }">
          ${cat.count}
        </span>
      </button>
    `;
  }).join('');
}

function getPosCategoryBadgeStyle(category) {
  switch (category) {
    case 'พันธุ์ปลา':
      return { bg: 'bg-sky-100 text-sky-800', label: '🐟 พันธุ์ปลา' };
    case 'อาหารปลา':
      return { bg: 'bg-amber-100 text-amber-800', label: '🌾 อาหารปลา' };
    case 'ยารักษาโรคปลา':
      return { bg: 'bg-rose-100 text-rose-800', label: '💊 ยา/เวชภัณฑ์' };
    case 'สารปรับสภาพน้ำ':
      return { bg: 'bg-cyan-100 text-cyan-800', label: '🧪 ปรับสภาพน้ำ' };
    case 'กระชังเลี้ยงปลา':
      return { bg: 'bg-indigo-100 text-indigo-800', label: '🕸️ กระชังปลา' };
    default:
      return { bg: 'bg-slate-100 text-slate-800', label: `📦 ${category || 'สินค้า'}` };
  }
}

function renderPosProductsGrid() {
  const container = document.getElementById('pos-products-grid');
  if (!container) return;

  const allItems = getPosAllItems();
  const categories = getPosCategoriesConfig(allItems);
  const activeCatObj = categories.find(c => c.id === posSelectedCategory) || categories[0];

  const titleEl = document.getElementById('pos-active-category-title');
  if (titleEl) {
    titleEl.textContent = posSelectedCategory === 'all'
      ? 'สินค้าและพันธุ์ปลาพร้อมขายทั้งหมด'
      : `หมวดหมู่: ${activeCatObj.label}`;
  }

  // กรองตามหมวดหมู่ที่เลือกทางซ้ายมือ
  let filtered = posSelectedCategory === 'all'
    ? allItems
    : allItems.filter(it => it.category === posSelectedCategory);

  // กรองตามคำค้นหา
  if (posSearchQuery) {
    const q = posSearchQuery.toLowerCase();
    filtered = filtered.filter(it =>
      (it.name || '').toLowerCase().includes(q) ||
      (it.size || '').toLowerCase().includes(q) ||
      (it.pondName || '').toLowerCase().includes(q) ||
      (it.code || '').toLowerCase().includes(q) ||
      (it.sieve || '').toLowerCase().includes(q) ||
      (it.category || '').toLowerCase().includes(q)
    );
  }

  const countBadge = document.getElementById('pos-products-count-badge');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} รายการ`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <i data-lucide="search-x" class="w-10 h-10 mx-auto text-slate-400 mb-2 opacity-60"></i>
        <p class="text-sm font-bold text-slate-700">ไม่พบรายการสินค้าที่ค้นหา</p>
        <p class="text-xs text-slate-500 mt-1">ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นทางด้านซ้ายมือ</p>
        ${(posSearchQuery || posSelectedCategory !== 'all') ? `
          <button type="button" onclick="posSelectedCategory='all'; clearPosSearch(); renderPosView();" class="mt-3 px-3 py-1.5 bg-white hover:bg-slate-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition shadow-2xs">
            แสดงสินค้าทั้งหมด
          </button>
        ` : ''}
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(it => {
    const badge = getPosCategoryBadgeStyle(it.category);
    return `
      <div onclick="addPosItemToCart('${it.type}', '${it.id}')" 
        class="bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group">
        <div>
          <div class="flex items-start justify-between gap-1 mb-1">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${badge.bg}">
              ${badge.label}
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
    `;
  }).join('');

  lucide.createIcons();
}

function renderPosView() {
  const allItems = getPosAllItems();
  renderPosCategories(allItems);
  renderPosProductsGrid();
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
      category: 'พันธุ์ปลา',
      name: pond.fishName,
      size: pond.fishSize,
      unit: 'ตัว',
      unitPrice: pond.unitPrice || 1.5,
      maxAvail: avail
    };
  } else if (type === 'supply') {
    const sup = (state.supplies || []).find(s => s.id === id);
    if (!sup) return;
    if (sup.stockQty <= 0) {
      showNotification(`สินค้า ${sup.name} หมดสต็อก`, 'error');
      return;
    }
    target = {
      type,
      id: sup.id,
      category: sup.category || 'อาหารปลา',
      name: sup.name,
      size: sup.packageSize,
      unit: sup.unit,
      unitPrice: sup.unitPrice || 450,
      maxAvail: sup.stockQty
    };
  } else if (type === 'catalog') {
    const catItem = (typeof PRODUCT_CATALOG !== 'undefined' ? PRODUCT_CATALOG : []).find(c => c.id === id);
    if (!catItem) return;
    target = {
      type,
      id: catItem.id,
      category: catItem.category || 'อุปกรณ์อื่นๆ',
      name: catItem.name,
      size: (catItem.defaultSizes && catItem.defaultSizes[0]) || '',
      unit: catItem.unit || 'ชิ้น',
      unitPrice: catItem.defaultPrice || 100,
      maxAvail: 99
    };
  }

  if (!target) return;

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
      showNotification(`สต็อกคงเหลือเพียง ${posCart[index].maxAvail} ${posCart[index].unit}`, 'warning');
      posCart[index].qty = posCart[index].maxAvail;
    } else {
      posCart[index].qty = q;
    }
  }
  renderPosCart();
}

function updatePosCartPrice(index, newPrice) {
  const p = Number(newPrice);
  if (isNaN(p) || p < 0) {
    showNotification('กรุณาระบุราคาต่อหน่วยให้ถูกต้อง', 'warning');
    renderPosCart();
    return;
  }
  if (posCart[index]) {
    posCart[index].unitPrice = p;
  }
  renderPosCart();
}

let posLinkedOrderId = null;

function canCurrentUserSellPos() {
  const role = state.currentUser?.role;
  return ['CEO', 'Manager', 'Sales', 'Accountant'].includes(role);
}

function sendOrderToPos(orderId) {
  if (!canCurrentUserSellPos()) {
    showNotification('เฉพาะผู้มีสิทธิ์ขาย (CEO, ผู้จัดการ, ฝ่ายขาย/POS, บัญชี) เท่านั้นที่ส่งออเดอร์ไปหน้า POS ได้', 'error');
    return;
  }

  const order = (state.orders || []).find(o => o.id === orderId);
  if (!order) {
    showNotification('ไม่พบข้อมูลออเดอร์ที่ต้องการส่งไป POS', 'error');
    return;
  }

  posLinkedOrderId = order.id;
  posCart = [];

  // โอนรายการสินค้าที่สั่งจองไว้เข้าสู่ตะกร้า POS โดยอัตโนมัติ
  (order.items || []).forEach(it => {
    const isFish = it.category === 'พันธุ์ปลา';
    let targetId = it.pondId || it.id || ('item_' + Math.random().toString(36).substr(2, 5));
    let maxAvail = Math.max(Number(it.qty) || 1, 999999);

    if (isFish) {
      let pond = it.pondId ? (state.ponds || []).find(p => p.id === it.pondId) : null;
      if (!pond && typeof getAvailableFishStock === 'function') {
        const stock = getAvailableFishStock(it.name, it.size);
        if (stock.matchingPonds && stock.matchingPonds.length > 0) {
          pond = stock.matchingPonds[0];
        }
      }
      if (pond) {
        targetId = pond.id;
        maxAvail = Math.max(Number(it.qty) || 1, pond.totalQty || 0);
      }
    } else {
      const sup = (state.supplies || []).find(s => s.name.includes(it.name) || it.name.includes(s.name));
      if (sup) {
        targetId = sup.id;
        maxAvail = Math.max(Number(it.qty) || 1, sup.stockQty || 0);
      }
    }

    const unitPrice = Number(it.unitPrice !== undefined ? it.unitPrice : (it.netUnitPrice || 0));

    posCart.push({
      type: isFish ? 'fish' : 'supply',
      id: targetId,
      category: it.category || (isFish ? 'พันธุ์ปลา' : 'อาหารปลา'),
      name: it.name,
      size: it.size || '',
      unit: it.unit || (isFish ? 'ตัว' : 'ชิ้น'),
      unitPrice,
      qty: Number(it.qty) || 1,
      maxAvail
    });
  });

  // เปิดโมดูลที่ 3 (POS) และสลับไปหน้าแคชเชียร์ขายสดหน้าร้านทันที
  openModule('pos');
  switchPosSubTab('pos-cashier');

  // เติมข้อมูลลูกค้า ส่วนลด และวิธีชำระเงินจากออเดอร์จอง
  const nameInp = document.getElementById('pos-customer-name');
  const phoneInp = document.getElementById('pos-customer-phone');
  const discInp = document.getElementById('pos-bill-discount');

  if (nameInp) nameInp.value = order.customerName || 'ลูกค้าหน้าร้าน';
  if (phoneInp) phoneInp.value = order.customerPhone || '';
  if (discInp) discInp.value = Number(order.totalDiscount || 0);

  const method = (order.paymentMethod === 'โอน' || order.paymentMethod === 'โอนเงิน')
    ? 'โอนเงิน'
    : (order.paymentMethod === 'สแกน QR' ? 'สแกน QR' : 'เงินสด');
  selectPosPaymentMethod(method);

  renderPosCart();
  showNotification(`ดึงออเดอร์ ${order.id} (${order.customerName}) เข้าสู่หน้า POS พร้อมชำระเงินและออกบิลแล้ว`, 'success');
}

function handlePosDiscountInput(val) {
  const discount = Math.max(0, Number(val) || 0);
  const subtotal = posCart.reduce((sum, it) => sum + (it.qty * it.unitPrice), 0);
  const linkedOrder = posLinkedOrderId ? (state.orders || []).find(o => o.id === posLinkedOrderId) : null;
  const deposit = linkedOrder ? Number(linkedOrder.deposit || 0) : 0;
  const netPayable = Math.max(0, subtotal - discount - deposit);
  const totalEl = document.getElementById('pos-cart-total');
  if (totalEl) {
    totalEl.textContent = '฿' + netPayable.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}

function selectPosPaymentMethod(method) {
  const hiddenInput = document.getElementById('pos-payment-method');
  if (hiddenInput) hiddenInput.value = method;

  document.querySelectorAll('#pos-payment-method-buttons .pos-pay-btn').forEach(btn => {
    const isSelected = btn.getAttribute('data-method') === method;
    if (isSelected) {
      btn.className = 'pos-pay-btn py-2 px-2 rounded-xl text-xs font-bold border-2 border-emerald-600 bg-emerald-50 text-emerald-900 flex items-center justify-center gap-1 transition shadow-2xs';
    } else {
      btn.className = 'pos-pay-btn py-2 px-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1 transition';
    }
  });
}

function removePosCartItem(index) {
  posCart.splice(index, 1);
  renderPosCart();
}

function clearPosCart() {
  posCart = [];
  posLinkedOrderId = null;
  const discInput = document.getElementById('pos-bill-discount');
  if (discInput) discInput.value = 0;
  renderPosCart();
}

function renderPosCart() {
  const container = document.getElementById('pos-cart-items');
  const subtotalEl = document.getElementById('pos-cart-subtotal');
  const totalEl = document.getElementById('pos-cart-total');
  const totalLabelEl = document.getElementById('pos-cart-total-label');
  const countEl = document.getElementById('pos-cart-count');
  const discInput = document.getElementById('pos-bill-discount');
  const linkedBanner = document.getElementById('pos-linked-order-banner');
  const linkedIdEl = document.getElementById('pos-linked-order-id');
  const linkedDepositBadge = document.getElementById('pos-linked-deposit-badge');
  const depositRow = document.getElementById('pos-cart-deposit-row');
  const depositValEl = document.getElementById('pos-cart-deposit-val');
  if (!container) return;

  const linkedOrder = posLinkedOrderId ? (state.orders || []).find(o => o.id === posLinkedOrderId) : null;
  const depositAmt = linkedOrder ? Number(linkedOrder.deposit || 0) : 0;

  if (linkedBanner) {
    if (linkedOrder) {
      linkedBanner.classList.remove('hidden');
      if (linkedIdEl) linkedIdEl.textContent = `${linkedOrder.id} (${linkedOrder.deliveryType === 'delivery' ? '🚚 จัดส่ง' : '🏠 รับเอง'})`;
      if (linkedDepositBadge) {
        if (depositAmt > 0) {
          linkedDepositBadge.textContent = `มัดจำแล้ว ฿${depositAmt.toLocaleString()}`;
          linkedDepositBadge.classList.remove('hidden');
        } else {
          linkedDepositBadge.classList.add('hidden');
        }
      }
    } else {
      linkedBanner.classList.add('hidden');
    }
  }

  if (depositRow) {
    if (linkedOrder && depositAmt > 0) {
      depositRow.classList.remove('hidden');
      if (depositValEl) depositValEl.textContent = '-฿' + depositAmt.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (totalLabelEl) totalLabelEl.textContent = 'ยอดรับชำระคงเหลือสุทธิ:';
    } else {
      depositRow.classList.add('hidden');
      if (totalLabelEl) totalLabelEl.textContent = 'ยอดรวมสุทธิทั้งสิ้น:';
    }
  }

  if (posCart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 text-slate-400">
        <i data-lucide="shopping-cart" class="w-10 h-10 mx-auto mb-2 opacity-40"></i>
        <p class="text-xs">ยังไม่มีรายการสินค้าในบิล<br/>คลิกเลือกรายการปลาหรืออาหารจากด้านซ้ายได้เลยครับ</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '฿0.00';
    if (totalEl) totalEl.textContent = '฿0.00';
    if (countEl) countEl.textContent = '0 รายการ';
    lucide.createIcons();
    return;
  }

  let subtotal = 0;
  let totalItemsCount = 0;

  container.innerHTML = posCart.map((it, idx) => {
    const itemTotal = it.qty * it.unitPrice;
    subtotal += itemTotal;
    totalItemsCount += it.qty;

    return `
      <div class="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-2 shadow-2xs">
        <div class="min-w-0 flex-1">
          <div class="font-bold text-xs text-slate-800 truncate">${it.name}</div>
          <div class="text-[11px] text-slate-500 mt-1 flex items-center gap-1 flex-wrap">
            ${it.size ? `<span class="text-slate-400">${it.size} •</span>` : ''}
            <div class="inline-flex items-center bg-sky-50/80 border border-sky-200 rounded-lg px-1.5 py-0.5" title="แก้ไขราคาขายต่อหน่วย">
              <span class="text-sky-700 font-bold text-[10px] mr-0.5">฿</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value="${it.unitPrice}"
                onchange="updatePosCartPrice(${idx}, this.value)"
                class="w-14 text-right font-bold text-xs text-sky-900 bg-transparent border-none p-0 focus:ring-0 focus:outline-none"
              >
              <span class="text-[10px] text-slate-500 ml-0.5">/${it.unit}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <input type="number" min="1" max="${it.maxAvail}" value="${it.qty}" 
            onchange="updatePosCartQty(${idx}, this.value)"
            title="ระบุจำนวน (${it.unit})"
            class="input-large text-xs py-1 px-2 w-24 text-center font-bold bg-white">
          <span class="text-xs text-slate-500">${it.unit}</span>
        </div>

        <div class="text-right min-w-[68px] shrink-0">
          <span class="font-black text-xs text-emerald-700 block">฿${itemTotal.toLocaleString('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
          <button type="button" onclick="removePosCartItem(${idx})" class="text-[11px] text-rose-500 hover:text-rose-700 font-semibold">ลบ</button>
        </div>
      </div>
    `;
  }).join('');

  const billDiscount = Math.max(0, Number(discInput?.value) || 0);
  const netPayable = Math.max(0, subtotal - billDiscount - depositAmt);

  if (subtotalEl) subtotalEl.textContent = '฿' + subtotal.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (totalEl) totalEl.textContent = '฿' + netPayable.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
  const billDiscountRaw = Math.max(0, Number(document.getElementById('pos-bill-discount')?.value) || 0);
  const dateStr = getTodayString();

  let grossTotal = 0;
  const items = posCart.map(it => {
    const t = it.qty * it.unitPrice;
    grossTotal += t;
    return {
      category: it.category || (it.type === 'fish' ? 'พันธุ์ปลา' : 'อาหารปลา'),
      name: it.name,
      size: it.size || '',
      qty: it.qty,
      unit: it.unit,
      unitPrice: it.unitPrice,
      unitDiscount: 0,
      netUnitPrice: it.unitPrice,
      totalPrice: t,
      pondId: it.type === 'fish' ? it.id : undefined
    };
  });

  const totalDiscount = Math.min(grossTotal, billDiscountRaw);
  const netTotal = Math.max(0, grossTotal - totalDiscount);

  // กรณีที่ 1: เป็นออเดอร์ที่ส่งมาจากโมดูลจองปลา (ปุ่ม POS)
  if (posLinkedOrderId) {
    const existingOrder = (state.orders || []).find(o => o.id === posLinkedOrderId);
    if (existingOrder) {
      const prevStatus = existingOrder.status;
      const depositAmt = Number(existingOrder.deposit || 0);
      const collectedNow = Math.max(0, netTotal - depositAmt);

      existingOrder.customerName = custName;
      existingOrder.customerPhone = custPhone;
      existingOrder.items = items;
      existingOrder.grossTotal = grossTotal;
      existingOrder.totalDiscount = totalDiscount;
      existingOrder.netTotal = netTotal;
      existingOrder.remainingBalance = 0;
      existingOrder.actualCollected = collectedNow;
      existingOrder.paymentStatus = 'paid_full';
      existingOrder.paymentMethod = payMethod;
      existingOrder.collectedMethod = payMethod === 'โอนเงิน' ? 'โอน' : payMethod;
      existingOrder.paymentLocked = true;
      existingOrder.paidViaPos = true;
      existingOrder.posPaidAt = dateStr + ' ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

      // หากเป็นลูกค้ารับเองหน้าฟาร์ม ให้เปลี่ยนเป็นส่งสำเร็จทันที
      if (existingOrder.deliveryType === 'pickup' && existingOrder.status !== 'delivered') {
        existingOrder.status = 'delivered';
      }

      // ตัดสต็อกจริงเมื่อชำระเงินและออกบิลที่ POS (หากยังไม่เคยตัดสต็อกมาก่อน)
      if (prevStatus !== 'delivered' && !existingOrder.stockDeductedByPos) {
        if (typeof deductStockForDeliveredOrder === 'function') {
          deductStockForDeliveredOrder(existingOrder);
        }
        existingOrder.stockDeductedByPos = true;
      }

      existingOrder.editHistory = existingOrder.editHistory || [];
      existingOrder.editHistory.unshift({
        id: 'hist_' + Date.now(),
        timestamp: new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' }),
        editorName: state.currentUser ? state.currentUser.name : 'แคชเชียร์ POS',
        editorRole: state.currentUser ? state.currentUser.roleLabel : 'POS',
        reason: 'ชำระเงินและออกบิลผ่านระบบขายหน้าร้าน (POS)',
        changeSummary: `รับชำระสุทธิ ฿${collectedNow.toLocaleString()} (${payMethod}) • ยอดรวมบิล ฿${netTotal.toLocaleString()}`
      });

      const targetOrderId = existingOrder.id;
      saveState();

      showNotification(`รับชำระเงินและออกบิล ${targetOrderId} ยอดรับ ฿${collectedNow.toLocaleString()} (${payMethod}) สำเร็จ!`, 'success');
      clearPosCart();
      renderPosView();
      viewOrderSlip(targetOrderId);
      return;
    }
  }

  // กรณีที่ 2: ลูกค้าที่มาซื้อสดหน้าร้านโดยตรง (Walk-in POS) -> โชว์เฉพาะในโมดูล POS ไม่เอาไปปนในโมดูลจองปลา
  const orderId = 'POS-' + dateStr.replace(/-/g, '') + '-' + String((state.orders || []).length + 1).padStart(3, '0');

  const newPosOrder = {
    id: orderId,
    orderNumber: 'POS-' + String((state.orders || []).length + 1).padStart(3, '0'),
    isPosWalkIn: true,
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
    totalDiscount,
    netTotal,
    deposit: netTotal,
    remainingBalance: 0,
    actualCollected: netTotal,
    collectedMethod: payMethod,
    driverName: 'ลูกค้าตักรับเองหน้าร้าน',
    notes: totalDiscount > 0
      ? `เปิดบิลขายด่วนหน้าร้าน POS สำเร็จ (ส่วนลดท้ายบิล ฿${totalDiscount.toLocaleString()})`
      : 'เปิดบิลขายด่วนหน้าร้าน POS สำเร็จ',
    createdAt: dateStr + ' ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
  };

  // ตัดสต็อกจริงทันที
  if (typeof deductStockForDeliveredOrder === 'function') {
    deductStockForDeliveredOrder(newPosOrder);
  }

  state.orders.unshift(newPosOrder);
  saveState();

  showNotification(`ออกบิลขายหน้าร้าน ${orderId} ยอดสุทธิ ฿${netTotal.toLocaleString()} (${payMethod}) สำเร็จ!`, 'success');
  clearPosCart();
  renderPosView();

  // เปิดดูใบเสร็จด่วน
  viewOrderSlip(orderId);
}

function openPosNewBill() {
  clearPosCart();
  selectPosPaymentMethod('เงินสด');
  const inp = document.getElementById('pos-customer-name');
  const phoneInp = document.getElementById('pos-customer-phone');
  if (phoneInp) phoneInp.value = '';
  if (inp) {
    inp.value = 'ลูกค้าหน้าร้าน (เงินสด)';
    inp.focus();
  }
}

function openPosSalesSummary() {
  const modal = document.getElementById('modal-pos-sales-summary');
  if (!modal) return;

  const dateInput = document.getElementById('pos-summary-modal-date');
  const histDate = document.getElementById('pos-history-date-filter')?.value;
  if (dateInput && !dateInput.value) {
    dateInput.value = histDate || (typeof getTodayString === 'function' ? getTodayString() : new Date().toISOString().slice(0, 10));
  }

  renderPosSalesSummaryReceipt();
  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function formatPosSlipDateSlash(dateKey) {
  if (!dateKey) return 'ทั้งหมด';
  const m = String(dateKey).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[3]}/${m[2]}/${m[1]}`;
  return dateKey;
}

function renderPosSalesSummaryReceipt() {
  const area = document.getElementById('pos-sales-summary-slip-area');
  if (!area) return;

  const dateVal = document.getElementById('pos-summary-modal-date')?.value || '';
  const scope = document.getElementById('pos-summary-modal-scope')?.value || 'all';

  const optReceived = document.getElementById('pos-sum-opt-received')?.checked;
  const optCompact = document.getElementById('pos-sum-opt-compact')?.checked;
  const optPayments = document.getElementById('pos-sum-opt-payments')?.checked;
  const optItems = document.getElementById('pos-sum-opt-items')?.checked;
  const optStoreName = document.getElementById('pos-sum-opt-storename')?.checked;
  const optAddress = document.getElementById('pos-sum-opt-address')?.checked;

  // กรองรายการตามวันที่และประเภทบิล
  let orders = (state.orders || []).filter(o => o && o.status !== 'cancelled');
  if (dateVal) {
    orders = orders.filter(o => toPosDateKey(o.deliveryDate || o.createdAt) === dateVal);
  }
  if (scope === 'walkin') {
    orders = orders.filter(o => Boolean((o.id && o.id.startsWith('POS-')) || o.isPosWalkIn));
  } else if (scope === 'delivery') {
    orders = orders.filter(o => !((o.id && o.id.startsWith('POS-')) || o.isPosWalkIn));
  }

  let cashTotal = 0;
  let transferTotal = 0;
  let creditTotal = 0;
  let grossTotal = 0;
  let discountTotal = 0;
  let refundTotal = 0;
  let netTotal = 0;
  let receivedTotal = 0;

  const itemAgg = {};
  const billPaymentRows = [];

  orders.forEach(o => {
    const net = Number(o.netTotal || 0);
    const disc = Number(o.totalDiscount || 0);
    const gross = Number(o.grossTotal != null ? o.grossTotal : (net + disc));
    const isWalkIn = Boolean((o.id && o.id.startsWith('POS-')) || o.isPosWalkIn);
    const isPaid = isOrderPaidForPosSummary(o);

    grossTotal += gross;
    discountTotal += disc;
    netTotal += net;

    const method = o.collectedMethod || o.paymentMethod || 'เงินสด';
    let billCash = 0;
    let billTransfer = 0;
    let billCredit = 0;

    if (!isPaid || method === 'ค้างจ่าย' || method === 'ยังไม่ได้เก็บ') {
      const depositPaid = Number(o.deposit || 0);
      const unpaid = Math.max(0, net - depositPaid);
      billCredit = unpaid;
      creditTotal += unpaid;
      if (depositPaid > 0) {
        if ((o.paymentMethod || '').includes('เงินสด')) {
          billCash += depositPaid;
          cashTotal += depositPaid;
        } else {
          billTransfer += depositPaid;
          transferTotal += depositPaid;
        }
        receivedTotal += depositPaid;
      }
    } else if (method === 'เงินสด+โอน') {
      billCash = Number(o.cashSplitAmount || 0) + Number(o.deposit || 0);
      billTransfer = Number(o.transferSplitAmount || 0);
      cashTotal += billCash;
      transferTotal += billTransfer;
      receivedTotal += (billCash + billTransfer);
    } else if (method === 'เงินสด') {
      billCash = net;
      cashTotal += net;
      receivedTotal += net;
    } else {
      billTransfer = net;
      transferTotal += net;
      receivedTotal += net;
    }

    billPaymentRows.push({
      id: o.id,
      customer: o.customerName || '-',
      method: !isPaid ? 'ขายเชื่อ/ค้างชำระ' : method,
      net,
      isWalkIn
    });

    (o.items || []).forEach(it => {
      const key = `${it.name || 'สินค้า'}|${it.unit || 'ตัว'}`;
      if (!itemAgg[key]) itemAgg[key] = { name: it.name || 'สินค้า', unit: it.unit || 'ตัว', qty: 0, amount: 0 };
      itemAgg[key].qty += Number(it.qty || 0);
      itemAgg[key].amount += Number(it.totalPrice != null ? it.totalPrice : (Number(it.qty || 0) * Number(it.unitPrice || 0)));
    });
  });

  // คำนวณยอดเคลมคืนเงินในวันนั้น (ถ้ามี)
  (state.claims || []).forEach(c => {
    if (c && c.status === 'approved' && c.resolutionType === 'refund') {
      if (!dateVal || toPosDateKey(c.claimDate || c.createdAt) === dateVal) {
        refundTotal += Number(c.refundAmount || 0);
      }
    }
  });

  const fmt = n => Number(n || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const now = new Date();
  const pad2 = n => String(n).padStart(2, '0');
  const nowStamp = `${pad2(now.getDate())}/${pad2(now.getMonth() + 1)}/${now.getFullYear()} ${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
  const dashedLine = `<div class="my-2.5 border-t border-dashed border-slate-500"></div>`;

  const itemsList = Object.values(itemAgg);

  area.innerHTML = `
    <div class="text-center space-y-0.5">
      <div class="font-bold text-base">สรุปยอดขาย ${formatPosSlipDateSlash(dateVal)}</div>
      ${optStoreName ? `
        <div class="font-bold text-sm">บริษัท สุทธิ อินเตอร์ ฟาร์ม จำกัด</div>
        <div class="font-bold text-sm">(ฟาร์มปลาผู้ใหญ่พร)</div>
      ` : ''}
      ${optAddress ? `
        <div class="text-xs text-slate-600 pt-0.5">ต.ดอนคา อ.อู่ทอง จ.สุพรรณบุรี • โทร 081-xxx-xxxx</div>
      ` : ''}
      ${!optCompact ? `<div class="text-xs text-slate-500">จำนวนรวม ${orders.length} บิล</div>` : ''}
    </div>

    ${dashedLine}

    <div class="space-y-1 text-sm">
      <div class="flex justify-between">
        <span>เงินสด</span>
        <span class="font-medium tabular-nums">${fmt(cashTotal)}</span>
      </div>
      <div class="flex justify-between">
        <span>เงินโอน</span>
        <span class="font-medium tabular-nums">${fmt(transferTotal)}</span>
      </div>
      <div class="flex justify-between">
        <span>ขายเชื่อ</span>
        <span class="font-medium tabular-nums">${fmt(creditTotal)}</span>
      </div>
      ${optReceived ? `
        <div class="flex justify-between font-semibold pt-0.5">
          <span>ยอดรับจริง</span>
          <span class="tabular-nums">${fmt(receivedTotal)}</span>
        </div>
      ` : ''}
    </div>

    ${dashedLine}

    <div class="space-y-1 text-sm">
      <div class="flex justify-between">
        <span>ยอดรวม</span>
        <span class="font-medium tabular-nums">${fmt(grossTotal)}</span>
      </div>
      <div class="flex justify-between">
        <span>ส่วนลด</span>
        <span class="font-medium tabular-nums">${fmt(discountTotal)}</span>
      </div>
      <div class="flex justify-between">
        <span>คืนเงิน</span>
        <span class="font-medium tabular-nums">${fmt(refundTotal)}</span>
      </div>
      <div class="flex justify-between items-baseline pt-1 font-extrabold text-base">
        <span>ยอดสุทธิ</span>
        <span class="text-lg tabular-nums">${fmt(netTotal - refundTotal)}</span>
      </div>
    </div>

    ${optPayments && billPaymentRows.length > 0 ? `
      ${dashedLine}
      <div class="space-y-1 text-xs">
        <div class="font-bold">แจกแจงการชำระ (${billPaymentRows.length} บิล)</div>
        ${billPaymentRows.map(b => `
          <div class="flex justify-between gap-2">
            <span class="truncate">${b.id} (${b.method})</span>
            <span class="tabular-nums shrink-0">${fmt(b.net)}</span>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${optItems && itemsList.length > 0 ? `
      ${dashedLine}
      <div class="space-y-1 text-xs">
        <div class="font-bold">รายการสินค้าที่ขาย</div>
        ${itemsList.map(it => `
          <div class="flex justify-between gap-2">
            <span class="truncate">${it.name} x ${it.qty.toLocaleString()} ${it.unit}</span>
            <span class="tabular-nums shrink-0">${fmt(it.amount)}</span>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <div class="text-center text-xs text-slate-700 mt-4 pt-1">
      ** วันที่ ${nowStamp} **
    </div>
  `;
}

function printPosSalesSummarySlip() {
  const area = document.getElementById('pos-sales-summary-slip-area');
  if (!area) return;

  const printWin = window.open('', '_blank', 'width=380,height=640');
  if (!printWin) {
    window.print();
    return;
  }

  printWin.document.write(`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>พิมพ์สลิปสรุปยอดขาย (80mm)</title>
  <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page {
      size: 80mm auto;
      margin: 0;
    }
    * { box-sizing: border-box; }
    body {
      font-family: 'Sarabun', sans-serif;
      width: 76mm;
      max-width: 76mm;
      margin: 0 auto;
      padding: 4mm 3mm;
      color: #000;
      background: #fff;
      font-size: 13px;
      line-height: 1.45;
    }
    .text-center { text-align: center; }
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .font-extrabold { font-weight: 800; }
    .text-base { font-size: 15px; }
    .text-lg { font-size: 18px; }
    .text-sm { font-size: 13px; }
    .text-xs { font-size: 11.5px; }
    .flex { display: flex; }
    .justify-between { justify-content: space-between; }
    .items-baseline { align-items: baseline; }
    .my-2\\.5 { margin: 8px 0; }
    .mt-4 { margin-top: 12px; }
    .pt-1 { padding-top: 4px; }
    .pt-0\\.5 { padding-top: 2px; }
    .space-y-1 > * + * { margin-top: 3px; }
    .space-y-0\\.5 > * + * { margin-top: 2px; }
    .border-t { border-top: 1px dashed #000; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 46mm; }
  </style>
</head>
<body>
  ${area.innerHTML}
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
        window.close();
      }, 200);
    };
  <\/script>
</body>
</html>`);
  printWin.document.close();
}

function toPosDateKey(d) {
  if (!d) return '';
  if (typeof d === 'string') {
    const m = d.match(/^(\d{4}-\d{2}-\d{2})/);
    if (m) return m[1];
  }
  const dt = d instanceof Date ? d : new Date(d);
  if (isNaN(dt)) return '';
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
}

function onPosSingleDateChange(val) {
  const fromEl = document.getElementById('pos-history-date-from');
  const toEl = document.getElementById('pos-history-date-to');
  if (fromEl) fromEl.value = val || '';
  if (toEl) toEl.value = val || '';
  renderPosHistory();
}

function onPosRangeDateChange() {
  const singleEl = document.getElementById('pos-history-date-filter');
  const fromEl = document.getElementById('pos-history-date-from');
  const toEl = document.getElementById('pos-history-date-to');
  if (singleEl && fromEl && toEl) {
    singleEl.value = (fromEl.value && fromEl.value === toEl.value) ? fromEl.value : '';
  }
  renderPosHistory();
}

function setPosHistoryDatePreset(preset) {
  const singleEl = document.getElementById('pos-history-date-filter');
  const fromEl = document.getElementById('pos-history-date-from');
  const toEl = document.getElementById('pos-history-date-to');
  const today = new Date();
  const todayKey = toPosDateKey(today);

  if (preset === 'today') {
    if (singleEl) singleEl.value = todayKey;
    if (fromEl) fromEl.value = todayKey;
    if (toEl) toEl.value = todayKey;
  } else if (preset === 'yesterday') {
    const y = new Date(today);
    y.setDate(y.getDate() - 1);
    const yKey = toPosDateKey(y);
    if (singleEl) singleEl.value = yKey;
    if (fromEl) fromEl.value = yKey;
    if (toEl) toEl.value = yKey;
  } else if (preset === '7days') {
    const s = new Date(today);
    s.setDate(s.getDate() - 6);
    if (singleEl) singleEl.value = '';
    if (fromEl) fromEl.value = toPosDateKey(s);
    if (toEl) toEl.value = todayKey;
  } else if (preset === 'month') {
    const mStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const mEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    if (singleEl) singleEl.value = '';
    if (fromEl) fromEl.value = toPosDateKey(mStart);
    if (toEl) toEl.value = toPosDateKey(mEnd);
  } else {
    if (singleEl) singleEl.value = '';
    if (fromEl) fromEl.value = '';
    if (toEl) toEl.value = '';
  }
  renderPosHistory();
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
  if (window.lucide) lucide.createIcons();
}

function isOrderPaidForPosSummary(o) {
  if (!o || o.status === 'cancelled') return false;
  // 1. บิลขายสดหน้าร้าน POS
  if ((o.id && o.id.startsWith('POS-')) || o.isPosWalkIn) return true;
  // 2. ออเดอร์จัดส่งหรือสั่งจองที่ชำระเงินแล้ว (ผ่าน POS หรือชำระหน้างานแล้ว)
  if (o.paidViaPos) return true;
  if (o.paymentStatus === 'paid_full') return true;
  if (Number(o.actualCollected || 0) > 0 && o.collectedMethod && o.collectedMethod !== 'ค้างจ่าย' && o.collectedMethod !== 'ยังไม่ได้เก็บ') return true;
  if (o.status === 'delivered' && Number(o.remainingBalance || 0) <= 0 && o.collectedMethod !== 'ค้างจ่าย') return true;
  return false;
}

function renderPosHistory() {
  const tbody = document.getElementById('pos-history-tbody');
  if (!tbody) return;

  const singleDate = document.getElementById('pos-history-date-filter')?.value || '';
  let dateFrom = document.getElementById('pos-history-date-from')?.value || singleDate;
  let dateTo = document.getElementById('pos-history-date-to')?.value || singleDate;
  if (dateFrom && dateTo && dateFrom > dateTo) [dateFrom, dateTo] = [dateTo, dateFrom];

  // รวมบิลขายหน้าร้าน (POS-...) และออเดอร์จัดส่งที่ชำระเงินแล้วทั้งหมด เพื่อสรุปยอดรายวันได้ในที่เดียว
  let paidOrders = (state.orders || []).filter(o => isOrderPaidForPosSummary(o));

  if (dateFrom || dateTo) {
    paidOrders = paidOrders.filter(o => {
      const dKey = toPosDateKey(o.deliveryDate || o.createdAt);
      return !!dKey && (!dateFrom || dKey >= dateFrom) && (!dateTo || dKey <= dateTo);
    });
  }

  const rangeLabel = (dateFrom && dateTo)
    ? (dateFrom === dateTo ? formatThaiDate(dateFrom) : `${formatThaiDate(dateFrom)} - ${formatThaiDate(dateTo)}`)
    : dateFrom ? `ตั้งแต่ ${formatThaiDate(dateFrom)}` : dateTo ? `ถึง ${formatThaiDate(dateTo)}` : '';

  const summaryBanner = document.getElementById('pos-history-date-summary');
  if (summaryBanner) {
    if (rangeLabel) {
      summaryBanner.textContent = `📅 แสดงประวัติบิลและสรุปยอดขาย: ${rangeLabel} (พบ ${paidOrders.length} รายการ)`;
      summaryBanner.classList.remove('hidden');
    } else {
      summaryBanner.textContent = '';
      summaryBanner.classList.add('hidden');
    }
  }

  // คำนวณสรุปยอดรวม (หน้าร้าน + จัดส่งที่ชำระเงินแล้ว)
  let sumTotal = 0;
  let sumWalkin = 0;
  let countWalkin = 0;
  let sumDelivery = 0;
  let countDelivery = 0;
  let sumCash = 0;
  let sumTransfer = 0;

  paidOrders.forEach(o => {
    const isWalkIn = Boolean((o.id && o.id.startsWith('POS-')) || o.isPosWalkIn);
    const amt = Number(o.netTotal || 0);
    sumTotal += amt;

    if (isWalkIn) {
      sumWalkin += amt;
      countWalkin += 1;
    } else {
      sumDelivery += amt;
      countDelivery += 1;
    }

    const m = o.collectedMethod || o.paymentMethod || 'เงินสด';
    if (m === 'เงินสด+โอน') {
      sumCash += Number(o.cashSplitAmount || 0) + Number(o.deposit || 0);
      sumTransfer += Number(o.transferSplitAmount || 0);
    } else if (m === 'เงินสด') {
      sumCash += amt;
    } else {
      sumTransfer += amt;
    }
  });

  const elSumTotal = document.getElementById('pos-hist-sum-total');
  const elSumCount = document.getElementById('pos-hist-sum-count');
  const elSumWalkin = document.getElementById('pos-hist-sum-walkin');
  const elSumWalkinCount = document.getElementById('pos-hist-sum-walkin-count');
  const elSumDel = document.getElementById('pos-hist-sum-delivery');
  const elSumDelCount = document.getElementById('pos-hist-sum-delivery-count');
  const elSumMethods = document.getElementById('pos-hist-sum-methods');

  if (elSumTotal) elSumTotal.textContent = '฿' + sumTotal.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (elSumCount) elSumCount.textContent = `รวมทั้งหมด ${paidOrders.length} รายการ${rangeLabel ? ` (${rangeLabel})` : ''}`;
  if (elSumWalkin) elSumWalkin.textContent = '฿' + sumWalkin.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (elSumWalkinCount) elSumWalkinCount.textContent = `${countWalkin} บิลขายหน้าร้าน`;
  if (elSumDel) elSumDel.textContent = '฿' + sumDelivery.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (elSumDelCount) elSumDelCount.textContent = `${countDelivery} ออเดอร์จัดส่งที่ชำระแล้ว`;
  if (elSumMethods) {
    elSumMethods.innerHTML = `
      <div class="text-emerald-700">💵 เงินสด: ฿${sumCash.toLocaleString('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</div>
      <div class="text-sky-700">📲 โอน/QR: ฿${sumTransfer.toLocaleString('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</div>
    `;
  }

  if (paidOrders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-slate-400">ยังไม่มีรายการบิลขายหน้าร้านหรือออเดอร์จัดส่งที่ชำระเงินแล้ว${rangeLabel ? ` ในช่วงวันที่ ${rangeLabel}` : ''}</td></tr>`;
    return;
  }

  tbody.innerHTML = paidOrders.map(o => {
    const isWalkIn = Boolean((o.id && o.id.startsWith('POS-')) || o.isPosWalkIn);
    const payLabel = o.collectedMethod && o.collectedMethod !== 'ยังไม่ได้เก็บ' ? o.collectedMethod : (o.paymentMethod || 'เงินสด');
    return `
      <tr class="border-b border-slate-100 hover:bg-slate-50 transition text-xs">
        <td class="p-3 font-bold text-sky-900 whitespace-nowrap">${o.id}</td>
        <td class="p-3 whitespace-nowrap">
          <span class="px-2 py-0.5 rounded-full text-[11px] font-bold border ${
            isWalkIn
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-sky-50 text-sky-800 border-sky-200'
          }">
            ${isWalkIn ? '🛒 ขายหน้าร้าน (POS)' : '🚚 จัดส่ง (ชำระแล้ว)'}
          </span>
        </td>
        <td class="p-3 whitespace-nowrap">${formatThaiDate(o.deliveryDate)}</td>
        <td class="p-3 font-semibold">${o.customerName}</td>
        <td class="p-3">${(o.items || []).map(it => `${it.name} x ${Number(it.qty).toLocaleString()} ${it.unit}`).join(', ')}</td>
        <td class="p-3 text-center whitespace-nowrap">
          <span class="px-2 py-0.5 rounded-md font-bold text-[11px] bg-slate-100 text-slate-700 border border-slate-200">
            ${payLabel}
          </span>
        </td>
        <td class="p-3 text-right font-black text-emerald-700 whitespace-nowrap">฿${Number(o.netTotal).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td class="p-3 text-right whitespace-nowrap">
          <button onclick="viewOrderSlip('${o.id}')" class="px-2.5 py-1 text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 rounded-lg hover:bg-sky-100">ดูใบเสร็จ</button>
        </td>
      </tr>
    `;
  }).join('');
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
