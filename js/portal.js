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
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2.2 อัปเดตตัวเลขสดบนหน้า Portal Hub (Live KPIs)
function updatePortalKPIs() {
  const todayStr = getTodayString();
  const todayOrders = (state.orders || []).filter(o => o.deliveryDate === todayStr && o.status !== 'cancelled');
  const readyPonds = (state.ponds || []).filter(p => p.status === 'ready');
  const totalReadyFish = readyPonds.reduce((sum, p) => sum + Math.max(0, (p.totalQty || 0) - (p.reservedQty || 0)), 0);
  const duePonds = typeof getGradingDuePonds === 'function' ? getGradingDuePonds(7) : [];
  const lowSupplies = (state.supplies || []).filter(s => s.stockQty <= s.minThreshold);

  // Live KPI elements in Portal Banner
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

  // ปรับ Breadcrumb & Header Title ของโมดูล
  const titleEl = document.getElementById('module-view-title');
  const badgeEl = document.getElementById('module-view-badge');
  const breadcrumbEl = document.getElementById('module-view-breadcrumb');
  const iconEl = document.getElementById('module-view-icon');

  if (titleEl) titleEl.textContent = `โมดูลที่ ${mod.number}: ${mod.name}`;
  if (badgeEl) badgeEl.textContent = mod.nameEn;
  if (breadcrumbEl) breadcrumbEl.textContent = `โมดูล ${mod.number}: ${mod.name}`;
  if (iconEl) iconEl.setAttribute('data-lucide', mod.icon);

  // สร้างแถบ Subtabs เฉพาะโมดูลนี้
  renderModuleSubtabs(mod);

  // สลับการแสดงผลหน้าเนื้อหาตามโมดูล
  switchModuleWorkspace(mod);

  window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (isDriver) {
      container.innerHTML = '';
      return;
    }
    container.innerHTML = `
      <button onclick="openNewOrderModal()" class="btn-large btn-farm-yellow py-2 px-3 sm:px-4 text-xs sm:text-sm font-bold shadow-sm flex items-center gap-1.5">
        <i data-lucide="plus-circle" class="w-4 h-4"></i>
        <span>จองพันธุ์ปลาใหม่</span>
      </button>
    `;
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
