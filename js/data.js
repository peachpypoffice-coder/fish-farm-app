// ข้อมูลเริ่มต้นสำหรับระบบฟาร์มปลาผู้ใหญ่พร (Seed & Default Data)

const DEFAULT_USERS = [
  {
    id: 'usr_ceo',
    name: 'ผู้ใหญ่พร (เจ้าของฟาร์ม)',
    email: 'ceo@phuyaiporn.farm',
    password: 'ceo1234',
    role: 'CEO',
    roleLabel: 'CEO / เจ้าของฟาร์ม',
    badgeColor: 'bg-amber-500 text-white',
    avatar: '👨‍🌾'
  },
  {
    id: 'usr_mgr',
    name: 'คุณสมศักดิ์ (ผู้จัดการฟาร์ม)',
    email: 'manager@phuyaiporn.farm',
    password: 'mgr1234',
    role: 'Manager',
    roleLabel: 'ผู้จัดการฟาร์ม',
    badgeColor: 'bg-sky-600 text-white',
    avatar: '📋'
  },
  {
    id: 'usr_qc',
    name: 'คุณสมศรี (หัวหน้า QC)',
    email: 'qc@phuyaiporn.farm',
    password: 'qc1234',
    role: 'QC',
    roleLabel: 'ฝ่ายตรวจสอบคุณภาพ (QC)',
    badgeColor: 'bg-emerald-600 text-white',
    avatar: '🔬'
  },
  {
    id: 'usr_driver',
    name: 'พี่บุญมี (คนขับรถส่งปลา)',
    email: 'driver@phuyaiporn.farm',
    password: 'driver1234',
    role: 'Driver',
    roleLabel: 'พนักงานขับรถส่งของ',
    badgeColor: 'bg-orange-500 text-white',
    avatar: '🚚'
  }
];

// หมวดหมู่สินค้าและรายการสินค้าเริ่มต้น
const PRODUCT_CATALOG = [
  // หมวดพันธุ์ปลา
  {
    id: 'fish_1',
    category: 'พันธุ์ปลา',
    name: 'ปลาดุกบิ๊กอุย',
    unit: 'ตัว',
    defaultSizes: ['2-3 นิ้ว', '3-4 นิ้ว', '4-5 นิ้ว', 'ใบมะขาม'],
    defaultPrice: 1.20
  },
  {
    id: 'fish_2',
    category: 'พันธุ์ปลา',
    name: 'ปลานิลจิตรลดา',
    unit: 'ตัว',
    defaultSizes: ['ใบมะขาม', '2-3 ซม.', '3-5 ซม.', '5-7 ซม.'],
    defaultPrice: 1.50
  },
  {
    id: 'fish_3',
    category: 'พันธุ์ปลา',
    name: 'ปลาทับทิมซีพี',
    unit: 'ตัว',
    defaultSizes: ['2-3 นิ้ว', '3-4 นิ้ว', '4-5 นิ้ว'],
    defaultPrice: 2.20
  },
  {
    id: 'fish_4',
    category: 'พันธุ์ปลา',
    name: 'ปลาสวายบ่อ',
    unit: 'ตัว',
    defaultSizes: ['3-4 นิ้ว', '5-6 นิ้ว', '7-8 นิ้ว'],
    defaultPrice: 2.00
  },
  {
    id: 'fish_5',
    category: 'พันธุ์ปลา',
    name: 'ปลากดคังน้ำจืด',
    unit: 'ตัว',
    defaultSizes: ['3-4 นิ้ว', '5-7 นิ้ว'],
    defaultPrice: 4.50
  },
  {
    id: 'fish_6',
    category: 'พันธุ์ปลา',
    name: 'ปลาสลิดดอนกระเบื้อง',
    unit: 'ตัว',
    defaultSizes: ['2-3 นิ้ว', '3-4 นิ้ว'],
    defaultPrice: 1.80
  },
  {
    id: 'fish_7',
    category: 'พันธุ์ปลา',
    name: 'ปลาหมอแปลงเพศ',
    unit: 'ตัว',
    defaultSizes: ['1.5-2.5 เซน (จ)', '1-1.5 นิ้ว (ล)', '1.5-2 นิ้ว (ก)', '2-2.5 นิ้ว (ก.ส.)', '2.5-3 นิ้ว (ญ)', '3-3.5 นิ้ว (ญ.ส.)', 'ปลาใหญ่'],
    defaultPrice: 1.80
  },
  {
    id: 'fish_8',
    category: 'พันธุ์ปลา',
    name: 'ปลาตะเพียน',
    unit: 'ตัว',
    defaultSizes: ['1.5-2 เซน (จ)', '1-1.5 นิ้ว (ล)', '1.8-2 นิ้ว (ก)', '2-2.5 นิ้ว (ก.ส.)', '2.5-3 นิ้ว (ญ.ส.)', '3.5-4 นิ้ว (ญ.พ.)', 'ปลาใหญ่'],
    defaultPrice: 1.20
  },
  {
    id: 'fish_9',
    category: 'พันธุ์ปลา',
    name: 'ปลากระพง',
    unit: 'ตัว',
    defaultSizes: ['1-1.5 นิ้ว (ล)', '1.5-2 นิ้ว (ก)', '2-2.5 นิ้ว (ก.ส.)', '2.5-3 นิ้ว (ญ)', '3-3.5 นิ้ว', 'ปลาใหญ่'],
    defaultPrice: 3.50
  },
  {
    id: 'fish_10',
    category: 'พันธุ์ปลา',
    name: 'ปลาบึก',
    unit: 'ตัว',
    defaultSizes: ['1.5-2 นิ้ว', '2-3 นิ้ว', '3.5-4 นิ้ว', '4-4.5 นิ้ว', 'ปลาใหญ่'],
    defaultPrice: 6.00
  },
  {
    id: 'fish_11',
    category: 'พันธุ์ปลา',
    name: 'บิ๊กสวาย',
    unit: 'ตัว',
    defaultSizes: ['1-1.5 นิ้ว', '1.5-2 นิ้ว', '2-3 นิ้ว', '3-4 นิ้ว', '4-5 นิ้ว', 'ปลาใหญ่'],
    defaultPrice: 2.20
  },
  {
    id: 'fish_12',
    category: 'พันธุ์ปลา',
    name: 'ปลายี่สก',
    unit: 'ตัว',
    defaultSizes: ['1-1.5 นิ้ว', '1.5-2 นิ้ว', '2-2.5 นิ้ว', '2.5-3 นิ้ว', 'ปลาใหญ่'],
    defaultPrice: 1.50
  },
  {
    id: 'fish_13',
    category: 'พันธุ์ปลา',
    name: 'ปลาจีนหัวโต',
    unit: 'ตัว',
    defaultSizes: ['1-1.5 นิ้ว', '1.5-2 นิ้ว', '2-2.5 นิ้ว', '3-3.5 นิ้ว', 'ปลาใหญ่'],
    defaultPrice: 1.80
  },
  {
    id: 'fish_14',
    category: 'พันธุ์ปลา',
    name: 'ปลากิโล (ปลาเนื้อ/ปลาใหญ่)',
    unit: 'กก.',
    defaultSizes: ['ปลาดุกบิ๊กอุย กิโล', 'ปลานิล กิโล', 'ปลาใหญ่รวม'],
    defaultPrice: 65.00
  },
  {
    id: 'fish_15',
    category: 'พันธุ์ปลา',
    name: 'ลูกกุ้งก้ามกราม',
    unit: 'ตัว',
    defaultSizes: ['ลูกกุ้งก้ามกราม เล็ก', 'ลูกกุ้งก้ามกราม ชำ'],
    defaultPrice: 0.35
  },

  // หมวดอาหารปลา
  {
    id: 'feed_1',
    category: 'อาหารปลา',
    name: 'อาหารไฮเกรด 9006T อนุบาลลูกปลา (10 กก.)',
    unit: 'กระสอบ',
    defaultSizes: ['กระสอบ 10 กก.'],
    defaultPrice: 620
  },
  {
    id: 'feed_2',
    category: 'อาหารปลา',
    name: 'อาหารปลาดุกเล็ก เบอร์ 1 (20 กก.)',
    unit: 'กระสอบ',
    defaultSizes: ['กระสอบ 20 กก.'],
    defaultPrice: 480
  },
  {
    id: 'feed_3',
    category: 'อาหารปลา',
    name: 'อาหารปลาดุกใหญ่ เบอร์ 3 (20 กก.)',
    unit: 'กระสอบ',
    defaultSizes: ['กระสอบ 20 กก.'],
    defaultPrice: 440
  },
  {
    id: 'feed_4',
    category: 'อาหารปลา',
    name: 'อาหารปลากินพืช เบอร์ 2 (20 กก.)',
    unit: 'กระสอบ',
    defaultSizes: ['กระสอบ 20 กก.'],
    defaultPrice: 410
  },

  // หมวดกระชังเลี้ยงปลา
  {
    id: 'cage_1',
    category: 'กระชังเลี้ยงปลา',
    name: 'กระชังบกเย็บสำเร็จ ผ้ายาง+มุ้งไนลอน 2x3x1.2 ม.',
    unit: 'หลัง',
    defaultSizes: ['2x3x1.2 เมตร'],
    defaultPrice: 850
  },
  {
    id: 'cage_2',
    category: 'กระชังเลี้ยงปลา',
    name: 'กระชังบกเย็บสำเร็จ ผ้ายาง+มุ้งไนลอน 3x4x1.2 ม.',
    unit: 'หลัง',
    defaultSizes: ['3x4x1.2 เมตร'],
    defaultPrice: 1250
  },
  {
    id: 'cage_3',
    category: 'กระชังเลี้ยงปลา',
    name: 'กระชังน้ำมุ้งเขียว 3x4x1.5 ม. พร้อมเชือกร้อย',
    unit: 'ปาก',
    defaultSizes: ['3x4x1.5 เมตร'],
    defaultPrice: 650
  },
  {
    id: 'cage_4',
    category: 'กระชังเลี้ยงปลา',
    name: 'กระชังน้ำมุ้งเขียว 4x6x2.0 ม. หูแขวนหนาพิเศษ',
    unit: 'ปาก',
    defaultSizes: ['4x6x2.0 เมตร'],
    defaultPrice: 1100
  },

  // หมวดยารักษาโรคปลา & เคมีภัณฑ์
  {
    id: 'med_1',
    category: 'ยารักษาโรคปลา',
    name: 'ด่างทับทิมเกรดบ่อปลา ฆ่าเชื้อปรสิต (500 กรัม)',
    unit: 'ขวด',
    defaultSizes: ['ขวด 500 กรัม'],
    defaultPrice: 85
  },
  {
    id: 'med_2',
    category: 'ยารักษาโรคปลา',
    name: 'ยาเหลืองป้องกันแผลและเชื้อรา (ซอง 50 กรัม)',
    unit: 'ซอง',
    defaultSizes: ['ซอง 50 กรัม'],
    defaultPrice: 120
  },
  {
    id: 'med_3',
    category: 'ยารักษาโรคปลา',
    name: 'วิตามินซีเข้มข้น + แร่ธาตุคลายเครียดลูกปลา (1 กก.)',
    unit: 'กระปุก',
    defaultSizes: ['กระปุก 1 กก.'],
    defaultPrice: 320
  },
  {
    id: 'med_4',
    category: 'ยารักษาโรคปลา',
    name: 'เกลือสมุทรบริสุทธิ์เกรดบ่อเพาะพันธุ์ (25 กก.)',
    unit: 'กระสอบ',
    defaultSizes: ['กระสอบ 25 กก.'],
    defaultPrice: 150
  },
  {
    id: 'med_5',
    category: 'ยารักษาโรคปลา',
    name: 'จุลินทรีย์บำบัดน้ำและย่อยสลายของเสียก้นบ่อ (5 ลิตร)',
    unit: 'แกลลอน',
    defaultSizes: ['แกลลอน 5 ลิตร'],
    defaultPrice: 280
  }
];

// Helper สร้างวันที่เปรียบเทียบ (วันนี้, เมื่อวาน, พรุ่งนี้, ฯลฯ)
function getDateOffset(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// รูปจำลองสำหรับปลาเสียหาย (SVG Data URL คมชัด ไม่ต้องพึ่งพาอินเทอร์เน็ตภายนอก)
const SAMPLE_CLAIM_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23fee2e2'/%3E%3Cpath d='M80 150 C 140 100, 260 100, 320 150 C 260 200, 140 200, 80 150 Z' fill='%23ef4444' stroke='%23b91c1c' stroke-width='4'/%3E%3Ccircle cx='130' cy='140' r='8' fill='%23ffffff'/%3E%3Cline x1='124' y1='134' x2='136' y2='146' stroke='%23000' stroke-width='3'/%3E%3Cline x1='136' y1='134' x2='124' y2='146' stroke='%23000' stroke-width='3'/%3E%3Cpolygon points='320,150 370,110 350,150 370,190' fill='%23ef4444' stroke='%23b91c1c' stroke-width='3'/%3E%3Ctext x='200' y='250' font-family='sans-serif' font-size='18' font-weight='bold' fill='%23991b1b' text-anchor='middle'%3Eหลักฐานภาพถ่าย: ปลาน็อคน้ำหน้างาน (200 ตัว)%3C/text%3E%3Ctext x='200' y='275' font-family='sans-serif' font-size='14' fill='%23b91c1c' text-anchor='middle'%3Eฟาร์มปลาผู้ใหญ่พร - ระบบตรวจสอบ QC%3C/text%3E%3C/svg%3E";

const SAMPLE_SLIP_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='350' height='450' viewBox='0 0 350 450'%3E%3Crect width='350' height='450' fill='%23f0fdf4' rx='16' stroke='%2316a34a' stroke-width='3'/%3E%3Ccircle cx='175' cy='70' r='35' fill='%2322c55e'/%3E%3Cpath d='M160 70 L170 80 L195 55' fill='none' stroke='%23ffffff' stroke-width='6' stroke-linecap='round'/%3E%3Ctext x='175' y='140' font-family='sans-serif' font-size='20' font-weight='bold' fill='%2315803d' text-anchor='middle'%3Eโอนเงินสำเร็จ (สลิปตัวอย่าง)%3C/text%3E%3Ctext x='175' y='170' font-family='sans-serif' font-size='14' fill='%23166534' text-anchor='middle'%3EBANK TRANSFER SUCCESS%3C/text%3E%3Cline x1='40' y1='195' x2='310' y2='195' stroke='%23bbf7d0' stroke-width='2' stroke-dasharray='6'/%3E%3Ctext x='50' y='235' font-family='sans-serif' font-size='14' fill='%23374151'%3Eโอนเข้าบัญชี:%3C/text%3E%3Ctext x='300' y='235' font-family='sans-serif' font-size='14' font-weight='bold' fill='%23111827' text-anchor='end'%3Eฟาร์มปลาผู้ใหญ่พร%3C/text%3E%3Ctext x='50' y='275' font-family='sans-serif' font-size='14' fill='%23374151'%3Eยอดเงินที่ชำระ:%3C/text%3E%3Ctext x='300' y='275' font-family='sans-serif' font-size='18' font-weight='bold' fill='%2315803d' text-anchor='end'%3E฿5,400.00%3C/text%3E%3Ctext x='50' y='315' font-family='sans-serif' font-size='14' fill='%23374151'%3Eวิธีการ:%3C/text%3E%3Ctext x='300' y='315' font-family='sans-serif' font-size='14' fill='%234b5563' text-anchor='end'%3Eสแกน QR Code หน้างาน%3C/text%3E%3Crect x='40' y='360' width='270' height='50' fill='%23dcfce7' rx='8'/%3E%3Ctext x='175' y='390' font-family='sans-serif' font-size='13' font-weight='bold' fill='%23166534' text-anchor='middle'%3Eตรวจสอบยอดเงินแล้วโดย คนขับรถ%3C/text%3E%3C/svg%3E";

// ลูกค้าตัวอย่าง
const INITIAL_CUSTOMERS = [
  {
    id: 'cust_1',
    name: 'กำนันสมพร บ่อทองคำ',
    phone: '081-234-5678',
    address: '88 หมู่ 4 ต.หนองกี่ อ.กบินทร์บุรี จ.ปราจีนบุรี',
    mapsUrl: 'https://maps.google.com/?q=13.9876,101.9876',
    notes: 'บ่อดิน 10 ไร่ สั่งประจำทุกต้นฤดูฝน ชอบปลาดุกบิ๊กอุยไซส์ 3 นิ้ว',
    totalSpentYear: 68500,
    totalSpentLifetime: 142000,
    orderCount: 8,
    vipTier: 'VIP', // VIP, Regular, Normal
    registeredAt: '2023-05-10'
  },
  {
    id: 'cust_2',
    name: 'เจ๊หน่อย ฟาร์มปลาเนื้อ',
    phone: '089-987-6543',
    address: '15/2 ต.บ้านโพธิ์ อ.เมือง จ.ฉะเชิงเทรา',
    mapsUrl: 'https://maps.google.com/?q=13.6890,101.0720',
    notes: 'ลูกค้าประจำ สั่งปลานิลแปลงเพศและอาหารปลาจำนวนมาก มารับเองหน้าฟาร์มบ่อย',
    totalSpentYear: 52400,
    totalSpentLifetime: 98000,
    orderCount: 6,
    vipTier: 'VIP',
    registeredAt: '2023-08-15'
  },
  {
    id: 'cust_3',
    name: 'ลุงเปี๊ยก สวนเกษตรผสมผสาน',
    phone: '086-555-4321',
    address: '42 หมู่ 7 ต.วังดาล อ.กบินทร์บุรี จ.ปราจีนบุรี',
    mapsUrl: 'https://maps.google.com/?q=14.0210,101.8950',
    notes: 'เลี้ยงในกระชังบก สั่งกระชังและพันธุ์ปลาหมอ + ยาป้องกันเชื้อรา',
    totalSpentYear: 18900,
    totalSpentLifetime: 26500,
    orderCount: 3,
    vipTier: 'Regular',
    registeredAt: '2024-02-01'
  },
  {
    id: 'cust_4',
    name: 'ผู้ช่วยประสิทธิ์ เกษตรอินทรีย์',
    phone: '084-112-2334',
    address: '109 หมู่ 2 ต.เมืองเก่า อ.กบินทร์บุรี จ.ปราจีนบุรี',
    mapsUrl: 'https://maps.google.com/?q=13.9720,101.9540',
    notes: 'ลูกค้าใหม่ เพิ่งขุดบ่อ 2 บ่อ เน้นปลาทับทิมและปลาสวาย',
    totalSpentYear: 8600,
    totalSpentLifetime: 8600,
    orderCount: 1,
    vipTier: 'Normal',
    registeredAt: '2024-06-20'
  },
  {
    id: 'cust_5',
    name: 'คุณวิชัย บ่อตกปลาวันหยุด',
    phone: '087-778-8990',
    address: '99/5 ต.ท่าตูม อ.ศรีมหาโพธิ จ.ปราจีนบุรี',
    mapsUrl: 'https://maps.google.com/?q=13.8820,101.5640',
    notes: 'สั่งปลาไซส์ใหญ่ ปลากดคัง และปลาสวาย ลงบ่อตกปลา',
    totalSpentYear: 74500,
    totalSpentLifetime: 185000,
    orderCount: 11,
    vipTier: 'VIP',
    registeredAt: '2022-11-05'
  }
];

// รายการคำสั่งจองและคิวส่งตัวอย่าง (Orders & Deliveries)
const INITIAL_ORDERS = [
  // 1. ส่งวันนี้ (Today) - อยู่ระหว่างเดินทาง
  {
    id: 'ORD-20240912-001',
    orderNumber: '001',
    customerId: 'cust_1',
    customerName: 'กำนันสมพร บ่อทองคำ',
    customerPhone: '081-234-5678',
    deliveryType: 'delivery', // 'delivery' หรือ 'pickup'
    deliveryAddress: '88 หมู่ 4 ต.หนองกี่ อ.กบินทร์บุรี จ.ปราจีนบุรี',
    mapsUrl: 'https://maps.google.com/?q=13.9876,101.9876',
    deliveryDate: getDateOffset(0), // วันนี้
    deliveryTimeSlot: 'ช่วงเช้า (07:00 - 09:30 น.)',
    status: 'in_transit', // pending, preparing, in_transit, delivered, problem
    paymentStatus: 'deposit_paid', // unpaid, deposit_paid, paid_full
    paymentMethod: 'โอนเงิน', // เงินสด, โอนเงิน
    paymentProof: SAMPLE_SLIP_IMG,
    driverName: 'พี่บุญมี (รถกระบะ ป้ายทะเบียน บธ-4512 ปราจีนบุรี)',
    notes: 'บ่ออยู่ท้ายสวน ก่อนถึงศาลากลางหมู่บ้าน ให้โทรหาก่อนถึง 15 นาที',
    
    // รายการสินค้าที่สั่ง
    items: [
      {
        id: 'item_1_1',
        category: 'พันธุ์ปลา',
        name: 'ปลาดุกบิ๊กอุย',
        size: '3-4 นิ้ว',
        qty: 10000,
        unit: 'ตัว',
        unitPrice: 1.40,
        unitDiscount: 0.15, // ลด 0.15 บาท/ตัว (ไม่มี %)
        netUnitPrice: 1.25,
        totalPrice: 12500
      },
      {
        id: 'item_1_2',
        category: 'อาหารปลา',
        name: 'อาหารปลาดุกเล็ก เบอร์ 1 (20 กก.)',
        size: 'กระสอบ 20 กก.',
        qty: 5,
        unit: 'กระสอบ',
        unitPrice: 480,
        unitDiscount: 20, // ลด 20 บาท/กระสอบ
        netUnitPrice: 460,
        totalPrice: 2300
      },
      {
        id: 'item_1_3',
        category: 'ยารักษาโรคปลา',
        name: 'วิตามินซีเข้มข้น + แร่ธาตุคลายเครียดลูกปลา (1 กก.)',
        size: 'กระปุก 1 กก.',
        qty: 2,
        unit: 'กระปุก',
        unitPrice: 320,
        unitDiscount: 20,
        netUnitPrice: 300,
        totalPrice: 600
      }
    ],
    grossTotal: 17040,      // ราคาก่อนหักส่วนลด (14,000 + 2,400 + 640)
    totalDiscount: 1640,    // รวมส่วนลดทั้งหมด (1,500 + 100 + 40)
    netTotal: 15400,        // ยอดสุทธิ
    deposit: 5000,          // มัดจำแล้ว
    remainingBalance: 10400, // ยอดเก็บหน้างาน
    actualCollected: 0,
    collectedMethod: 'ยังไม่ได้เก็บ',
    createdAt: getDateOffset(-2) + ' 09:30',
    editHistory: [
      {
        id: 'log_001',
        timestamp: getDateOffset(-1) + ' 16:45',
        editorName: 'คุณสมศักดิ์ (ผู้จัดการฟาร์ม)',
        editorRole: 'ผู้จัดการฟาร์ม',
        reason: 'ลูกค้าขอเพิ่มอาหารปลาดุกเล็กจากเดิม 3 กระสอบ เป็น 5 กระสอบ และเพิ่มวิตามินซีบำรุงตับ',
        oldDate: getDateOffset(-1),
        newDate: getDateOffset(0),
        oldTotal: 12500,
        newTotal: 15400,
        changeSummary: 'เพิ่มอาหารปลา 2 กระสอบ, เพิ่มวิตามินซี 2 กระปุก และเลื่อนวันส่งเป็นวันนี้'
      }
    ]
  },

  // 2. ส่งวันนี้ (Today) - จัดส่งสำเร็จ และมีการเคลมปลาเสียหาย
  {
    id: 'ORD-20240912-002',
    orderNumber: '002',
    customerId: 'cust_3',
    customerName: 'ลุงเปี๊ยก สวนเกษตรผสมผสาน',
    customerPhone: '086-555-4321',
    deliveryType: 'delivery',
    deliveryAddress: '42 หมู่ 7 ต.วังดาล อ.กบินทร์บุรี จ.ปราจีนบุรี',
    mapsUrl: 'https://maps.google.com/?q=14.0210,101.8950',
    deliveryDate: getDateOffset(0), // วันนี้
    deliveryTimeSlot: 'ช่วงสาย (10:00 - 12:00 น.)',
    status: 'problem', // มีปัญหาเรื่องการเคลม
    paymentStatus: 'paid_full',
    paymentMethod: 'เงินสด',
    paymentProof: '',
    driverName: 'พี่บุญมี',
    notes: 'ถนนทางเข้าแคบ เลี้ยวขวาตรงต้นโพธิ์ใหญ่',
    items: [
      {
        id: 'item_2_1',
        category: 'พันธุ์ปลา',
        name: 'ปลาหมอชุมพร 1',
        size: '2-3 นิ้ว',
        qty: 3000,
        unit: 'ตัว',
        unitPrice: 1.60,
        unitDiscount: 0.10,
        netUnitPrice: 1.50,
        totalPrice: 4500
      },
      {
        id: 'item_2_2',
        category: 'กระชังเลี้ยงปลา',
        name: 'กระชังบกเย็บสำเร็จ ผ้ายาง+มุ้งไนลอน 2x3x1.2 ม.',
        size: '2x3x1.2 เมตร',
        qty: 1,
        unit: 'หลัง',
        unitPrice: 850,
        unitDiscount: 50,
        netUnitPrice: 800,
        totalPrice: 800
      },
      {
        id: 'item_2_3',
        category: 'ยารักษาโรคปลา',
        name: 'ด่างทับทิมเกรดบ่อปลา ฆ่าเชื้อปรสิต (500 กรัม)',
        size: 'ขวด 500 กรัม',
        qty: 2,
        unit: 'ขวด',
        unitPrice: 85,
        unitDiscount: 5,
        netUnitPrice: 80,
        totalPrice: 160
      }
    ],
    grossTotal: 5820,
    totalDiscount: 360,
    netTotal: 5460,
    deposit: 2000,
    remainingBalance: 3460,
    actualCollected: 3160, // หักเคลมหน้างาน 300 บาท
    collectedMethod: 'เงินสด',
    claimRecord: {
      id: 'CLM-001',
      date: getDateOffset(0),
      damagedItem: 'ปลาหมอชุมพร 1 (2-3 นิ้ว)',
      damagedQty: 200,
      damagedUnit: 'ตัว',
      cause: 'ปลาน็อคน้ำเนื่องจากแดดแรงและอุณหภูมิในถุงสูงระหว่างขนส่ง',
      photoUrl: SAMPLE_CLAIM_IMG,
      resolutionType: 'deduct_balance', // 'deduct_balance', 'replace_next', 'refund'
      resolutionText: 'หักลดยอดจ่ายหน้างานทันที 300 บาท (200 ตัว x 1.50 บ.)',
      approvedBy: 'คุณสมศรี (QC)',
      qcStatus: 'approved' // pending, approved, rejected
    },
    createdAt: getDateOffset(-3) + ' 14:15'
  },

  // 3. วันนี้ (Today) - ลูกค้ามารับเองหน้าฟาร์ม (Farm Pickup)
  {
    id: 'ORD-20240912-003',
    orderNumber: '003',
    customerId: 'cust_2',
    customerName: 'เจ๊หน่อย ฟาร์มปลาเนื้อ',
    customerPhone: '089-987-6543',
    deliveryType: 'pickup', // ลูกค้ามารับเองหน้าฟาร์ม
    deliveryAddress: 'มารับเองที่ ฟาร์มปลาผู้ใหญ่พร (บ่ออนุบาล 2)',
    mapsUrl: '',
    deliveryDate: getDateOffset(0), // วันนี้
    deliveryTimeSlot: 'ช่วงบ่าย (14:00 น.)',
    status: 'preparing', // กำลังเตรียมปลา/อัดออกซิเจน
    paymentStatus: 'deposit_paid',
    paymentMethod: 'โอนเงิน',
    paymentProof: '',
    driverName: 'รับเองหน้าฟาร์ม (ลูกค้านำรถกระบะพร้อมถังมาเอง)',
    notes: 'เตรียมถุงออกซิเจนขนาด 30x40 นิ้ว ให้พร้อม 20 ถุง ลูกค้าจะนำถังออกซิเจนมาเองด้วย',
    items: [
      {
        id: 'item_3_1',
        category: 'พันธุ์ปลา',
        name: 'ปลานิลจิตรลดา',
        size: '3-5 ซม.',
        qty: 15000,
        unit: 'ตัว',
        unitPrice: 1.50,
        unitDiscount: 0.20, // ลด 0.20 บาท/ตัว (สั่งเยอะ)
        netUnitPrice: 1.30,
        totalPrice: 19500
      },
      {
        id: 'item_3_2',
        category: 'อาหารปลา',
        name: 'อาหารไฮเกรด 9006T อนุบาลลูกปลา (10 กก.)',
        size: 'กระสอบ 10 กก.',
        qty: 4,
        unit: 'กระสอบ',
        unitPrice: 620,
        unitDiscount: 30,
        netUnitPrice: 590,
        totalPrice: 2360
      }
    ],
    grossTotal: 24980,
    totalDiscount: 3120,
    netTotal: 21860,
    deposit: 10000,
    remainingBalance: 11860,
    actualCollected: 0,
    collectedMethod: 'ยังไม่ได้เก็บ',
    createdAt: getDateOffset(-1) + ' 11:00'
  },

  // 4. พรุ่งนี้ (Tomorrow) - นัดจัดส่ง
  {
    id: 'ORD-20240913-001',
    orderNumber: '004',
    customerId: 'cust_5',
    customerName: 'คุณวิชัย บ่อตกปลาวันหยุด',
    customerPhone: '087-778-8990',
    deliveryType: 'delivery',
    deliveryAddress: '99/5 ต.ท่าตูม อ.ศรีมหาโพธิ จ.ปราจีนบุรี',
    mapsUrl: 'https://maps.google.com/?q=13.8820,101.5640',
    deliveryDate: getDateOffset(1), // พรุ่งนี้
    deliveryTimeSlot: 'ช่วงเช้า (06:30 น.)',
    status: 'pending',
    paymentStatus: 'deposit_paid',
    paymentMethod: 'โอนเงิน',
    paymentProof: SAMPLE_SLIP_IMG,
    driverName: 'พี่บุญมี',
    notes: 'ส่งเร็วช่วงเช้าตรู่ก่อนแดดออก ปลากดคังต้องอัดออกซิเจนแน่นเป็นพิเศษ',
    items: [
      {
        id: 'item_4_1',
        category: 'พันธุ์ปลา',
        name: 'ปลากดคังน้ำจืด',
        size: '5-7 นิ้ว',
        qty: 2000,
        unit: 'ตัว',
        unitPrice: 4.50,
        unitDiscount: 0.30,
        netUnitPrice: 4.20,
        totalPrice: 8400
      },
      {
        id: 'item_4_2',
        category: 'พันธุ์ปลา',
        name: 'ปลาสวายบ่อ',
        size: '5-6 นิ้ว',
        qty: 3000,
        unit: 'ตัว',
        unitPrice: 2.00,
        unitDiscount: 0.20,
        netUnitPrice: 1.80,
        totalPrice: 5400
      }
    ],
    grossTotal: 15000,
    totalDiscount: 1200,
    netTotal: 13800,
    deposit: 5000,
    remainingBalance: 8800,
    actualCollected: 0,
    collectedMethod: 'ยังไม่ได้เก็บ',
    createdAt: getDateOffset(-2) + ' 16:20'
  },

  // 5. อีก 3 วันข้างหน้า - นัดจัดส่ง
  {
    id: 'ORD-20240915-001',
    orderNumber: '005',
    customerId: 'cust_4',
    customerName: 'ผู้ช่วยประสิทธิ์ เกษตรอินทรีย์',
    customerPhone: '084-112-2334',
    deliveryType: 'delivery',
    deliveryAddress: '109 หมู่ 2 ต.เมืองเก่า อ.กบินทร์บุรี จ.ปราจีนบุรี',
    mapsUrl: 'https://maps.google.com/?q=13.9720,101.9540',
    deliveryDate: getDateOffset(3),
    deliveryTimeSlot: 'ช่วงสาย (09:00 น.)',
    status: 'pending',
    paymentStatus: 'deposit_paid',
    paymentMethod: 'เงินสด',
    paymentProof: '',
    driverName: 'ยังไม่ได้ระบุ',
    notes: 'ลูกค้าเตรียมบ่อดินใหม่ ปูนขาวพร้อมแล้ว',
    items: [
      {
        id: 'item_5_1',
        category: 'พันธุ์ปลา',
        name: 'ปลาทับทิมซีพี',
        size: '2-3 นิ้ว',
        qty: 4000,
        unit: 'ตัว',
        unitPrice: 2.20,
        unitDiscount: 0.15,
        netUnitPrice: 2.05,
        totalPrice: 8200
      },
      {
        id: 'item_5_2',
        category: 'กระชังเลี้ยงปลา',
        name: 'กระชังน้ำมุ้งเขียว 3x4x1.5 ม. พร้อมเชือกร้อย',
        size: '3x4x1.5 เมตร',
        qty: 2,
        unit: 'ปาก',
        unitPrice: 650,
        unitDiscount: 50,
        netUnitPrice: 600,
        totalPrice: 1200
      }
    ],
    grossTotal: 10100,
    totalDiscount: 700,
    netTotal: 9400,
    deposit: 3000,
    remainingBalance: 6400,
    actualCollected: 0,
    collectedMethod: 'ยังไม่ได้เก็บ',
    createdAt: getDateOffset(-1) + ' 15:45'
  },

  // 6. ออเดอร์ในอดีต (เมื่อ 5 วันก่อน) - จัดส่งสำเร็จเรียบร้อย
  {
    id: 'ORD-20240907-001',
    orderNumber: '006',
    customerId: 'cust_1',
    customerName: 'กำนันสมพร บ่อทองคำ',
    customerPhone: '081-234-5678',
    deliveryType: 'delivery',
    deliveryAddress: '88 หมู่ 4 ต.หนองกี่ อ.กบินทร์บุรี จ.ปราจีนบุรี',
    mapsUrl: 'https://maps.google.com/?q=13.9876,101.9876',
    deliveryDate: getDateOffset(-5),
    deliveryTimeSlot: 'ช่วงเช้า (08:00 น.)',
    status: 'delivered',
    paymentStatus: 'paid_full',
    paymentMethod: 'โอนเงิน',
    paymentProof: SAMPLE_SLIP_IMG,
    driverName: 'พี่บุญมี',
    notes: 'ส่งเรียบร้อย ปลานิลแข็งแรงดี ลูกค้าชมว่าปลาไซส์สม่ำเสมอ',
    items: [
      {
        id: 'item_6_1',
        category: 'พันธุ์ปลา',
        name: 'ปลานิลจิตรลดา',
        size: '2-3 ซม.',
        qty: 20000,
        unit: 'ตัว',
        unitPrice: 1.20,
        unitDiscount: 0.15,
        netUnitPrice: 1.05,
        totalPrice: 21000
      },
      {
        id: 'item_6_2',
        category: 'อาหารปลา',
        name: 'อาหารไฮเกรด 9006T อนุบาลลูกปลา (10 กก.)',
        size: 'กระสอบ 10 กก.',
        qty: 6,
        unit: 'กระสอบ',
        unitPrice: 620,
        unitDiscount: 30,
        netUnitPrice: 590,
        totalPrice: 3540
      }
    ],
    grossTotal: 27720,
    totalDiscount: 3180,
    netTotal: 24540,
    deposit: 10000,
    remainingBalance: 14540,
    actualCollected: 14540,
    collectedMethod: 'โอนเงิน',
    createdAt: getDateOffset(-8) + ' 10:00'
  }
];

// รายการเคลมสินค้าทั้งหมด (Claims List)
const INITIAL_CLAIMS = [
  {
    id: 'CLM-001',
    orderId: 'ORD-20240912-002',
    customerName: 'ลุงเปี๊ยก สวนเกษตรผสมผสาน',
    customerPhone: '086-555-4321',
    date: getDateOffset(0),
    damagedItem: 'ปลาหมอชุมพร 1 (2-3 นิ้ว)',
    damagedQty: 200,
    damagedUnit: 'ตัว',
    cause: 'ปลาน็อคน้ำเนื่องจากแดดแรงและอุณหภูมิในถุงสูงระหว่างขนส่ง',
    photoUrl: SAMPLE_CLAIM_IMG,
    resolutionType: 'deduct_balance',
    resolutionText: 'หักลดยอดจ่ายหน้างานทันที 300 บาท (200 ตัว x 1.50 บ.)',
    claimAmount: 300,
    approvedBy: 'คุณสมศรี (QC)',
    qcStatus: 'approved',
    createdAt: getDateOffset(0) + ' 11:30'
  }
];

// ====================================================================
// 3. FARM INVENTORY AGENT: ข้อมูลบ่อปลา สต็อกปลา และคลังสินค้า
// ====================================================================

// ====================================================================
// ตาคัดขนาดมาตรฐานและตารางราคาตามเกณฑ์ไซส์ปลา (Standard Sieve & Pricing Matrix)
// ====================================================================
const STANDARD_SIEVE_GRADES = [
  { code: 'จ', name: 'ตาคัดจิ๋ว (จ)', sizeRange: '1.5-2.0 ซม.', desc: 'ลูกปลาจิ๋ว/เพิ่งขึ้นอ่าง' },
  { code: 'ล', name: 'ตาคัดเล็ก (ล)', sizeRange: '1.0-1.5 นิ้ว', desc: 'ลูกปลาเล็ก อนุบาลระยะแรก' },
  { code: 'ลสส', name: 'ตาคัดเล็กสม่ำเสมอ (ลสส.)', sizeRange: '1.8-1.9 นิ้ว', desc: 'คัดไซส์เสมอกัน' },
  { code: 'ก', name: 'ตาคัดกลาง (ก)', sizeRange: '1.8-2.0 นิ้ว', desc: 'ไซส์กลางเลี้ยงต่อหรือเริ่มปล่อย' },
  { code: 'ก.ส.', name: 'ตาคัดกลางสม่ำเสมอ (ก.ส.)', sizeRange: '2.0-2.5 นิ้ว', desc: 'ไซส์ยอดนิยมพร้อมลงบ่อดิน' },
  { code: 'ญ', name: 'ตาคัดใหญ่ (ญ)', sizeRange: '2.5-3.0 นิ้ว', desc: 'ปลาโตพร้อมส่งมอบ' },
  { code: 'ญ.ส.', name: 'ตาคัดใหญ่สม่ำเสมอ (ญ.ส.)', sizeRange: '2.5-3.0 นิ้ว', desc: 'ปลาคัดเกรดพิเศษ ขนาดเท่ากัน' },
  { code: 'ญ.พ.', name: 'ตาคัดใหญ่พิเศษ (ญ.พ.)', sizeRange: '3.0-4.0 นิ้ว', desc: 'ปลาไซส์ใหญ่โตเร็ว' },
  { code: 'ปลาใหญ่', name: 'ปลาใหญ่ / ปลากิโล', sizeRange: '4 นิ้วขึ้นไป / น้ำหนักต่อ กก.', desc: 'ปลาเนื้อ / พ่อแม่พันธุ์' }
];

const FISH_SIZE_PRICING = {
  'ปลาดุกบิ๊กอุย': {
    '1-1.5 นิ้ว (ล)': { price: 0.80, cost: 0.40, sieve: 'ล', code: '40104001' },
    '1.5-2 นิ้ว (ก)': { price: 1.00, cost: 0.50, sieve: 'ก', code: '40104002' },
    '2-3 นิ้ว (ก.ส.)': { price: 1.20, cost: 0.60, sieve: 'ก.ส.', code: '40104003' },
    '3-4 นิ้ว (ญ)': { price: 1.50, cost: 0.80, sieve: 'ญ', code: '40104004' },
    '4-5 นิ้ว (ญ.พ.)': { price: 1.90, cost: 1.00, sieve: 'ญ.พ.', code: '40104005' },
    '5-6 นิ้ว': { price: 2.50, cost: 1.40, sieve: 'ปลาใหญ่', code: '40104006' },
    'ปลาใหญ่': { price: 3.50, cost: 2.00, sieve: 'ปลาใหญ่', code: '40104007' }
  },
  'ปลานิลจิตรลดา': {
    '2-2.5 เซน (จ)': { price: 0.70, cost: 0.35, sieve: 'จ', code: '40103001' },
    '1.5-1.8 นิ้ว (ล)': { price: 1.10, cost: 0.55, sieve: 'ล', code: '40103002' },
    '1.5-2 นิ้ว (ก)': { price: 1.30, cost: 0.65, sieve: 'ก', code: '40103003' },
    '2-2.5 นิ้ว (ก.ส)': { price: 1.50, cost: 0.75, sieve: 'ก.ส.', code: '40103004' },
    '2.5-3 นิ้ว (ญ)': { price: 1.80, cost: 0.95, sieve: 'ญ', code: '40103005' },
    '2.5-3 นิ้ว (ญ.ส)': { price: 2.00, cost: 1.05, sieve: 'ญ.ส.', code: '40103006' },
    '2.5-3 นิ้ว (ญ.พ.)': { price: 2.20, cost: 1.15, sieve: 'ญ.พ.', code: '40103007' },
    'ปลาใหญ่': { price: 3.00, cost: 1.60, sieve: 'ปลาใหญ่', code: '40103008' }
  },
  'ปลาทับทิมหมัน': {
    '1.5-2.5 เซน (จ)': { price: 1.20, cost: 0.60, sieve: 'จ', code: '40124001' },
    '1-1.5 นิ้ว (ล)': { price: 1.60, cost: 0.80, sieve: 'ล', code: '40124002' },
    '1.5-2 นิ้ว (ก)': { price: 1.90, cost: 0.95, sieve: 'ก', code: '40124003' },
    '2-2.5 นิ้ว (ก.ส.)': { price: 2.20, cost: 1.10, sieve: 'ก.ส.', code: '40124004' },
    '2.5-3 นิ้ว (ญ)': { price: 2.60, cost: 1.35, sieve: 'ญ', code: '40124005' },
    '3-3.5 นิ้ว (ญ.ส)': { price: 3.00, cost: 1.60, sieve: 'ญ.ส.', code: '40124006' },
    '3.5-4 นิ้ว (ญ.พ.)': { price: 3.50, cost: 1.90, sieve: 'ญ.พ.', code: '40124007' },
    'ปลาใหญ่': { price: 4.50, cost: 2.50, sieve: 'ปลาใหญ่', code: '40124008' }
  },
  'ปลาหมอแปลงเพศ': {
    '1.5-2.5 เซน (จ)': { price: 0.90, cost: 0.45, sieve: 'จ', code: '40106001' },
    '1-1.5 นิ้ว (ล)': { price: 1.20, cost: 0.60, sieve: 'ล', code: '40106002' },
    '1.5-2 นิ้ว (ก)': { price: 1.50, cost: 0.75, sieve: 'ก', code: '40106003' },
    '2-2.5 นิ้ว (ก.ส.)': { price: 1.80, cost: 0.95, sieve: 'ก.ส.', code: '40106004' },
    '2.5-3 นิ้ว (ญ)': { price: 2.20, cost: 1.20, sieve: 'ญ', code: '40106005' },
    '3-3.5 นิ้ว (ญ.ส.)': { price: 2.70, cost: 1.50, sieve: 'ญ.ส.', code: '40106006' },
    'ปลาใหญ่': { price: 3.80, cost: 2.10, sieve: 'ปลาใหญ่', code: '40106007' }
  },
  'ปลาสวาย': {
    '1.5-2 นิ้ว (ก)': { price: 1.50, cost: 0.70, sieve: 'ก', code: '40105001' },
    '2-2.5 นิ้ว (ก.ส.)': { price: 1.80, cost: 0.90, sieve: 'ก.ส.', code: '40105002' },
    '2.5-3 นิ้ว (ญ)': { price: 2.00, cost: 1.05, sieve: 'ญ', code: '40105003' },
    '3-4 นิ้ว (ญ.พ.)': { price: 2.50, cost: 1.30, sieve: 'ญ.พ.', code: '40105004' },
    'ปลาใหญ่': { price: 3.50, cost: 1.90, sieve: 'ปลาใหญ่', code: '40105007' }
  },
  'ปลาตะเพียน': {
    '1.5-2 เซน (จ)': { price: 0.60, cost: 0.30, sieve: 'จ', code: '40101001' },
    '1-1.5 นิ้ว (ล)': { price: 0.80, cost: 0.40, sieve: 'ล', code: '40101002' },
    '1.8-2 นิ้ว (ก)': { price: 1.00, cost: 0.50, sieve: 'ก', code: '40101004' },
    '2-2.5 นิ้ว (ก.ส.)': { price: 1.20, cost: 0.60, sieve: 'ก.ส.', code: '40101006' },
    '2.5-3 นิ้ว (ญ.ส.)': { price: 1.50, cost: 0.75, sieve: 'ญ.ส.', code: '40101007' },
    '3.5-4 นิ้ว': { price: 2.00, cost: 1.10, sieve: 'ญ.พ.', code: '40101008' },
    'ปลาใหญ่': { price: 3.00, cost: 1.60, sieve: 'ปลาใหญ่', code: '40101009' }
  }
};

// รายการบ่อปลาในฟาร์ม (Live Fish Stock in Ponds)
const INITIAL_PONDS = [
  {
    id: 'pond_1',
    name: 'บ่อดิน 1',
    type: 'earthen',
    typeName: 'บ่อดินธรรมชาติ',
    sizeDesc: 'ขนาด 1 ไร่ (ลึก 1.8 ม.)',
    fishId: 'fish_1',
    fishCode: '40104003',
    fishName: 'ปลาดุกบิ๊กอุย',
    fishSize: '2-3 นิ้ว (ก.ส.)',
    sieveCode: 'ก.ส.',
    status: 'ready', // ready, growing, resting, empty
    statusLabel: 'พร้อมขาย',
    totalQty: 45000,
    reservedQty: 15000, // ถูกกั๊กยอดโดยออเดอร์ในระบบ (Hold)
    mortalityQty: 120, // ตายสะสมในรอบนี้
    unitPrice: 1.20,
    unitCost: 0.60,
    stockedDate: getDateOffset(-45),
    lastGradedDate: getDateOffset(-9), // เกิน 7 วัน -> ขึ้นเตือนรอบคัดขนาด!
    estReadyDate: getDateOffset(-5),
    notes: 'น้ำเขียวสวย แข็งแรง กินอาหารดี ถึงรอบคัดขนาดแบ่งไซส์'
  },
  {
    id: 'pond_2',
    name: 'บ่อดิน 2',
    type: 'earthen',
    typeName: 'บ่อดินธรรมชาติ',
    sizeDesc: 'ขนาด 2 ไร่ (ลึก 2.0 ม.)',
    fishId: 'fish_2',
    fishCode: '40103004',
    fishName: 'ปลานิลจิตรลดา',
    fishSize: '2-2.5 นิ้ว (ก.ส)',
    sieveCode: 'ก.ส.',
    status: 'ready',
    statusLabel: 'พร้อมขาย',
    totalQty: 60000,
    reservedQty: 20000,
    mortalityQty: 250,
    unitPrice: 1.50,
    unitCost: 0.75,
    stockedDate: getDateOffset(-60),
    lastGradedDate: getDateOffset(-3), // คัดเมื่อ 3 วันก่อน -> ปกติ
    estReadyDate: getDateOffset(-10),
    notes: 'ไซส์สม่ำเสมอ คัดขนาดแล้ว พร้อมส่งมอบ'
  },
  {
    id: 'pond_3',
    name: 'บ่อดิน 3',
    type: 'earthen',
    typeName: 'บ่อดินธรรมชาติ',
    sizeDesc: 'ขนาด 1.5 ไร่',
    fishId: 'fish_3',
    fishCode: '40124006',
    fishName: 'ปลาทับทิมหมัน',
    fishSize: '3-3.5 นิ้ว (ญ.ส)',
    sieveCode: 'ญ.ส.',
    status: 'ready',
    statusLabel: 'พร้อมขาย',
    totalQty: 25000,
    reservedQty: 4000,
    mortalityQty: 80,
    unitPrice: 3.00,
    unitCost: 1.60,
    stockedDate: getDateOffset(-50),
    lastGradedDate: getDateOffset(-12), // เกิน 10 วัน -> เตือนด่วน!
    estReadyDate: getDateOffset(-3),
    notes: 'สีแดงชมพูสด เกล็ดแน่น ปลาโตเร็วมาก ควรคัดแยกปลาใหญ่'
  },
  {
    id: 'pond_4',
    name: 'บ่อดิน 4',
    type: 'earthen',
    typeName: 'บ่อดินธรรมชาติ',
    sizeDesc: 'ขนาด 1 ไร่',
    fishId: 'fish_7',
    fishCode: '40106004',
    fishName: 'ปลาหมอแปลงเพศ',
    fishSize: '2-2.5 นิ้ว (ก.ส.)',
    sieveCode: 'ก.ส.',
    status: 'ready',
    statusLabel: 'พร้อมขาย',
    totalQty: 18000,
    reservedQty: 3000,
    mortalityQty: 50,
    unitPrice: 1.80,
    unitCost: 0.95,
    stockedDate: getDateOffset(-40),
    lastGradedDate: getDateOffset(-2), // 2 วันก่อน -> ปกติ
    estReadyDate: getDateOffset(-2),
    notes: 'แข็งแรง ปราดเปรียว ไม่เป็นโรค'
  },
  {
    id: 'pond_5',
    name: 'บ่อปูนอนุบาล 1',
    type: 'concrete',
    typeName: 'บ่อปูนซีเมนต์',
    sizeDesc: 'ขนาด 4x8 ม. ลึก 1 ม.',
    fishId: 'fish_1',
    fishCode: '40104001',
    fishName: 'ปลาดุกบิ๊กอุย',
    fishSize: '1-1.5 นิ้ว (ล)',
    sieveCode: 'ล',
    status: 'growing',
    statusLabel: 'กำลังอนุบาล',
    totalQty: 50000,
    reservedQty: 0,
    mortalityQty: 310,
    unitPrice: 0.80,
    unitCost: 0.40,
    stockedDate: getDateOffset(-12),
    lastGradedDate: getDateOffset(-8), // เกิน 7 วัน -> เตือนรอบคัดขนาด!
    estReadyDate: getDateOffset(14), // อีก 14 วันพร้อมขาย
    notes: 'ให้อาหารไฮเกรด 9006T วันละ 4 มื้อ ออกซิเจน 24 ชม. ถึงรอบคัดไซส์ลงบ่อดิน'
  },
  {
    id: 'pond_6',
    name: 'บ่อปูนอนุบาล 2',
    type: 'concrete',
    typeName: 'บ่อปูนซีเมนต์',
    sizeDesc: 'ขนาด 4x8 ม. ลึก 1 ม.',
    fishId: 'fish_2',
    fishCode: '40103001',
    fishName: 'ปลานิลจิตรลดา',
    fishSize: '2-2.5 เซน (จ)',
    sieveCode: 'จ',
    status: 'growing',
    statusLabel: 'กำลังอนุบาล',
    totalQty: 40000,
    reservedQty: 0,
    mortalityQty: 180,
    unitPrice: 0.70,
    unitCost: 0.35,
    stockedDate: getDateOffset(-10),
    lastGradedDate: getDateOffset(-4), // ปกติ
    estReadyDate: getDateOffset(10),
    notes: 'แปลงเพศเรียบร้อย อัตราการรอด 92%'
  },
  {
    id: 'pond_7',
    name: 'กระชังน้ำ 1',
    type: 'cage',
    typeName: 'กระชังลอยน้ำ',
    sizeDesc: 'ขนาด 3x6 ม. ลึก 1.5 ม.',
    fishId: 'fish_4',
    fishCode: '40105004',
    fishName: 'ปลาสวาย',
    fishSize: '3-4 นิ้ว (ญ.พ.)',
    sieveCode: 'ญ.พ.',
    status: 'ready',
    statusLabel: 'พร้อมขาย',
    totalQty: 8000,
    reservedQty: 0,
    mortalityQty: 20,
    unitPrice: 2.50,
    unitCost: 1.30,
    stockedDate: getDateOffset(-70),
    lastGradedDate: getDateOffset(-15), // เกิน 10 วัน -> เตือนคัดขนาดด่วน!
    estReadyDate: getDateOffset(-20),
    notes: 'อยู่ในแม่น้ำน้อย น้ำไหลเวียนดี ปลาไซส์ใหญ่พร้อมตักส่ง'
  },
  {
    id: 'pond_8',
    name: 'บ่อดิน 5',
    type: 'earthen',
    typeName: 'บ่อดินธรรมชาติ',
    sizeDesc: 'ขนาด 1.5 ไร่',
    fishId: '',
    fishCode: '',
    fishName: 'ว่าง (ไม่มีปลา)',
    fishSize: '-',
    sieveCode: '-',
    status: 'resting',
    statusLabel: 'พักบ่อ / ตากบ่อ',
    totalQty: 0,
    reservedQty: 0,
    mortalityQty: 0,
    unitPrice: 0,
    unitCost: 0,
    stockedDate: '',
    lastGradedDate: '',
    estReadyDate: '',
    notes: 'สูบน้ำแห้ง ตากแดดและโรยปูนขาวฆ่าเชื้อ พร้อมลงปลารุ่นใหม่ใน 7 วัน'
  }
];

// รายการคลังอาหารปลาและเวชภัณฑ์ (Feed & Supplies Inventory)
const INITIAL_SUPPLIES = [
  {
    id: 'sup_1',
    category: 'อาหารปลา',
    name: 'อาหารไฮเกรด 9006T อนุบาลลูกปลา',
    packageSize: 'กระสอบ 10 กก.',
    unit: 'กระสอบ',
    stockQty: 18,
    minThreshold: 10,
    unitPrice: 620,
    supplier: 'ซีพีเอฟ'
  },
  {
    id: 'sup_2',
    category: 'อาหารปลา',
    name: 'อาหารปลาดุกเล็ก เบอร์ 1',
    packageSize: 'กระสอบ 20 กก.',
    unit: 'กระสอบ',
    stockQty: 6, // ต่ำกว่าเกณฑ์เตือน! (ROP = 15)
    minThreshold: 15,
    unitPrice: 480,
    supplier: 'เบทาโกร'
  },
  {
    id: 'sup_3',
    category: 'อาหารปลา',
    name: 'อาหารปลาดุกใหญ่ เบอร์ 3',
    packageSize: 'กระสอบ 20 กก.',
    unit: 'กระสอบ',
    stockQty: 24,
    minThreshold: 10,
    unitPrice: 440,
    supplier: 'เบทาโกร'
  },
  {
    id: 'sup_4',
    category: 'อาหารปลา',
    name: 'อาหารปลากินพืช เบอร์ 2',
    packageSize: 'กระสอบ 20 กก.',
    unit: 'กระสอบ',
    stockQty: 14,
    minThreshold: 10,
    unitPrice: 410,
    supplier: 'ไทยเพ็ทฟู๊ด'
  },
  {
    id: 'sup_5',
    category: 'ยารักษาโรคปลา',
    name: 'ด่างทับทิมเกรดบ่อปลา ฆ่าเชื้อปรสิต',
    packageSize: 'ขวด 500 กรัม',
    unit: 'ขวด',
    stockQty: 3, // ต่ำกว่าเกณฑ์เตือน! (ROP = 8)
    minThreshold: 8,
    unitPrice: 85,
    supplier: 'เคมีเกษตรอยุธยา'
  },
  {
    id: 'sup_6',
    category: 'ยารักษาโรคปลา',
    name: 'วิตามินซีเข้มข้น + แร่ธาตุคลายเครียด',
    packageSize: 'กระปุก 1 กก.',
    unit: 'กระปุก',
    stockQty: 11,
    minThreshold: 5,
    unitPrice: 320,
    supplier: 'อควาฟาร์มา'
  },
  {
    id: 'sup_7',
    category: 'สารปรับสภาพน้ำ',
    name: 'ปูนขาวร้อน ปรับสภาพกรด-ด่างดินบ่อ',
    packageSize: 'กระสอบ 25 กก.',
    unit: 'กระสอบ',
    stockQty: 28,
    minThreshold: 15,
    unitPrice: 110,
    supplier: 'โรงปูนสระบุรี'
  },
  {
    id: 'sup_8',
    category: 'สารปรับสภาพน้ำ',
    name: 'เกลือสมุทรเม็ดใหญ่ ฆ่าเชื้อบ่อปลา',
    packageSize: 'กระสอบ 50 กก.',
    unit: 'กระสอบ',
    stockQty: 19,
    minThreshold: 10,
    unitPrice: 190,
    supplier: 'เกลือสมุทรสาคร'
  }
];

// รายการประวัติปลาตาย/สูญเสีย (Mortality Logs)
const INITIAL_MORTALITY_LOGS = [
  {
    id: 'mort_1',
    date: getDateOffset(-1),
    pondId: 'pond_1',
    pondName: 'บ่อดิน 1 (ปลาดุกบิ๊กอุย)',
    qty: 120,
    cause: 'สภาพอากาศร้อนจัดช่วงบ่าย ออกซิเจนผิวน้ำลดลงชั่วคราว',
    reporter: 'คุณสมศักดิ์ (ผู้จัดการฟาร์ม)',
    actionTaken: 'เปิดกังหันตีน้ำเพิ่ม 2 ตัว และเติมวิตามินซีลดเครียด'
  },
  {
    id: 'mort_2',
    date: getDateOffset(-3),
    pondId: 'pond_5',
    pondName: 'บ่อปูนอนุบาล 1 (ลูกปลาดุก)',
    qty: 150,
    cause: 'การสูญเสียธรรมชาติช่วงฝึกกินอาหารเม็ด',
    reporter: 'คุณสมศรี (QC)',
    actionTaken: 'ปรับเบอร์อาหารเป็นผงละเอียดพิเศษ ไฮเกรด 9006T'
  }
];

// รายการบันทึกเหตุการณ์ของระบบสำหรับ AI Supervisor (System Events & Audit)
const INITIAL_SYSTEM_EVENTS = [
  {
    id: 'evt_1',
    timestamp: getDateOffset(0) + ' 08:15',
    source: 'Farm Inventory Agent',
    type: 'STOCK_ALERT_LOW',
    severity: 'warning',
    message: 'อาหารปลาดุกเล็ก เบอร์ 1 เหลือ 6 กระสอบ (ต่ำกว่าเกณฑ์สั่งซื้อขั้นต่ำ 15 กระสอบ)',
    status: 'action_required'
  },
  {
    id: 'evt_2',
    timestamp: getDateOffset(0) + ' 08:16',
    source: 'Farm Inventory Agent',
    type: 'STOCK_ALERT_LOW',
    severity: 'warning',
    message: 'ด่างทับทิมเกรดบ่อปลา เหลือ 3 ขวด (ต่ำกว่าเกณฑ์สั่งซื้อขั้นต่ำ 8 ขวด)',
    status: 'action_required'
  },
  {
    id: 'evt_3',
    timestamp: getDateOffset(0) + ' 07:00',
    source: 'Master Supervisory AI',
    type: 'AUDIT_INTEGRITY',
    severity: 'info',
    message: 'ตรวจสอบความสอดคล้องยอดจอง Booking กับสต็อกปลาในบ่อ: ปกติ ทุกออเดอร์มีปลาพร้อมส่ง',
    status: 'verified'
  }
];

// รายการประวัติการคัดขนาดปลา (Fish Grading Logs)
const INITIAL_GRADING_LOGS = [
  {
    id: 'GRD-20240910-001',
    date: getDateOffset(-3),
    sourcePondId: 'pond_2',
    sourcePondName: 'บ่อดิน 2',
    fishName: 'ปลานิลจิตรลดา',
    originalSize: '1.5-2 นิ้ว (ก)',
    sieveUsed: 'ตาคัดเบอร์ 2.0 ซม. (ก.ส.)',
    initialQty: 60000,
    splits: [
      {
        targetSize: '2-2.5 นิ้ว (ก.ส)',
        sieveCode: 'ก.ส.',
        qty: 48000,
        targetPondId: 'pond_2',
        targetPondName: 'บ่อดิน 2 (เลี้ยงต่อ)',
        newUnitPrice: 1.50
      },
      {
        targetSize: '2.5-3 นิ้ว (ญ)',
        sieveCode: 'ญ',
        qty: 11800,
        targetPondId: 'pond_2',
        targetPondName: 'บ่อดิน 2 (คัดไซส์ใหญ่)',
        newUnitPrice: 1.80
      }
    ],
    mortalityQty: 200,
    operator: 'คุณสมศักดิ์ (ผู้จัดการฟาร์ม)',
    notes: 'ปลาโตสม่ำเสมอ แข็งแรง กินอาหารดี อัตราสูญเสียต่ำ'
  },
  {
    id: 'GRD-20240905-002',
    date: getDateOffset(-8),
    sourcePondId: 'pond_5',
    sourcePondName: 'บ่อปูนอนุบาล 1',
    fishName: 'ปลาดุกบิ๊กอุย',
    originalSize: 'ใบมะขาม (จ)',
    sieveUsed: 'ตาคัดเบอร์เล็ก 1 นิ้ว (ล)',
    initialQty: 52000,
    splits: [
      {
        targetSize: '1-1.5 นิ้ว (ล)',
        sieveCode: 'ล',
        qty: 50000,
        targetPondId: 'pond_5',
        targetPondName: 'บ่อปูนอนุบาล 1',
        newUnitPrice: 0.80
      }
    ],
    mortalityQty: 2000,
    operator: 'คุณสมศรี (QC)',
    notes: 'คัดแยกออกจากอ่างอนุบาลระยะแรก อัตราการรอด 96%'
  }
];

// รายการใบรับสินค้าและนำเข้า (Goods Received Notes - GRN)
const INITIAL_GRN_LOGS = [
  {
    id: 'GRN-20240912-001',
    date: getDateOffset(-2),
    type: 'fingerling', // fingerling (ลูกปลา), supply (อาหาร/เคมีภัณฑ์)
    supplier: 'ศูนย์เพาะพันธุ์ลูกปลาดุกลพบุรี',
    targetDestination: 'บ่อดิน 1 (ปลาดุกบิ๊กอุย)',
    items: [
      {
        name: 'ลูกปลาดุกบิ๊กอุย',
        size: '1-1.5 นิ้ว (ล)',
        sieveCode: 'ล',
        qty: 20000,
        unit: 'ตัว',
        unitCost: 0.45,
        totalCost: 9000
      }
    ],
    totalAmount: 9000,
    financeStatus: 'submitted', // submitted (ส่งยื่นบัญชีแล้ว), pending
    receiverName: 'คุณสมศักดิ์ (ผู้จัดการฟาร์ม)',
    notes: 'ปลาแข็งแรง ลอยถุงปรับอุณหภูมิน้ำ 30 นาทีก่อนปล่อย'
  },
  {
    id: 'GRN-20240911-002',
    date: getDateOffset(-4),
    type: 'supply',
    supplier: 'บจก. ซีพีเอฟ (ประเทศไทย)',
    targetDestination: 'คลังอาหารปลาหลัก',
    items: [
      {
        name: 'อาหารไฮเกรด 9006T อนุบาลลูกปลา',
        size: 'กระสอบ 10 กก.',
        sieveCode: '-',
        qty: 20,
        unit: 'กระสอบ',
        unitCost: 550,
        totalCost: 11000
      }
    ],
    totalAmount: 11000,
    financeStatus: 'submitted',
    receiverName: 'คุณสมศักดิ์ (ผู้จัดการฟาร์ม)',
    notes: 'ตรวจนับสภาพกระสอบสมบูรณ์ ไม่ชื้น ไม่ฉีกขาด ส่งเรื่องบัญชีแล้ว'
  }
];

