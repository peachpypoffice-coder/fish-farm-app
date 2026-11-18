// ข้อมูลสต็อกสินค้า POS นำเข้าจากไฟล์ export_product_all_19_11_2026.xlsx (483 รายการ)
const INITIAL_POS_PRODUCTS = [
    {
        "id":  "pos_prod_1",
        "code":  "20101009",
        "name":  "cp อาหารปลากินพืช 9932",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  340,
        "price":  360
    },
    {
        "id":  "pos_prod_2",
        "code":  "20101023",
        "name":  "cp อาหารกบดีฟ้อกซ์ 3762 กระสอบ",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  702,
        "price":  740
    },
    {
        "id":  "pos_prod_3",
        "code":  "20101014",
        "name":  "cp อาหารปลาช่อน ไฮเกรด 9984",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  720,
        "price":  750
    },
    {
        "id":  "pos_prod_4",
        "code":  "20101040",
        "name":  "ปลาป่น กระสอบ 25 กก.",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  2,
        "unit":  "กระสอบ",
        "cost":  775,
        "price":  880
    },
    {
        "id":  "pos_prod_5",
        "code":  "20101011",
        "name":  "cp อาหารปลาช่อน ไฮเกรด 9981",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0.6,
        "unit":  "กระสอบ",
        "cost":  735,
        "price":  780
    },
    {
        "id":  "pos_prod_6",
        "code":  "20101022",
        "name":  "ลี อาหารปลาดุกเล็ก   011U",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  529,
        "price":  560
    },
    {
        "id":  "pos_prod_7",
        "code":  "20101004",
        "name":  "cp อาหารปลาดุกกลางใหญ่ 9922",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  443.6,
        "price":  465
    },
    {
        "id":  "pos_prod_8",
        "code":  "20101016",
        "name":  "ลี อาหารปลากินพืชเล็ก 022US",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  341,
        "price":  380
    },
    {
        "id":  "pos_prod_9",
        "code":  "20101015",
        "name":  "cp อาหารปลาไฮเกรด 9006T เม็ดจิ๋ว กระสอบ",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  1277,
        "price":  1440
    },
    {
        "id":  "pos_prod_10",
        "code":  "20101026",
        "name":  "ลี  อาหารกบเม็ดจิ๋ว 051S",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  730,
        "price":  820
    },
    {
        "id":  "pos_prod_11",
        "code":  "20101007",
        "name":  "trr อาหารปลากินพืชใหญ่ 888",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  280,
        "price":  310
    },
    {
        "id":  "pos_prod_12",
        "code":  "PD69000052",
        "name":  "อาหารปลา กระพง Foo กระสอบ",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  1500,
        "price":  1800
    },
    {
        "id":  "pos_prod_13",
        "code":  "20101019",
        "name":  "ลี  อาหารปลาดุกเล็ก  013",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  445,
        "price":  475
    },
    {
        "id":  "pos_prod_14",
        "code":  "20101003",
        "name":  "cp อาหารปลาดุกกลาง9921",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  460,
        "price":  475
    },
    {
        "id":  "pos_prod_15",
        "code":  "20101025",
        "name":  "cp อาหารกบดีฟ้อกซ์ 3764",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  588.12,
        "price":  625
    },
    {
        "id":  "pos_prod_16",
        "code":  "PD66000003",
        "name":  "อาหารปลากินพืช ใหญ่ 789  กระสอบ 20กก.",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  278,
        "price":  300
    },
    {
        "id":  "pos_prod_17",
        "code":  "PD69000079",
        "name":  "อาหารปลาดุก กลาง 288 20กก",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  410,
        "price":  440
    },
    {
        "id":  "pos_prod_18",
        "code":  "20101020",
        "name":  "ลี อาหารปลาดุกกลาง 014",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  413,
        "price":  465
    },
    {
        "id":  "pos_prod_19",
        "code":  "20101049",
        "name":  "อาหารปลากระพง 903  กระสอบ",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  1,
        "unit":  "ชิ้น",
        "cost":  1100,
        "price":  1350
    },
    {
        "id":  "pos_prod_20",
        "code":  "20101024",
        "name":  "cpอาหารกบดีฟ้อกซ์ 3763",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  634.6,
        "price":  665
    },
    {
        "id":  "pos_prod_21",
        "code":  "20101008",
        "name":  "cp อาหารปลากินพืช 9931",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  380,
        "price":  420
    },
    {
        "id":  "pos_prod_22",
        "code":  "20101005",
        "name":  "trr อาหารปลาดุกกลาง 803M",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  405,
        "price":  440
    },
    {
        "id":  "pos_prod_23",
        "code":  "20101013",
        "name":  "cp อาหารปลาช่อน ไฮเกรด 9983",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0.8,
        "unit":  "กระสอบ",
        "cost":  725,
        "price":  760
    },
    {
        "id":  "pos_prod_24",
        "code":  "20101012",
        "name":  "cp อาหารปลาช่อน ไฮเกรด 9982",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  730,
        "price":  770
    },
    {
        "id":  "pos_prod_25",
        "code":  "20101006",
        "name":  "trr อาหารปลาดุกใหญ่ 803L",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  400,
        "price":  430
    },
    {
        "id":  "pos_prod_26",
        "code":  "20101017",
        "name":  "ลี  อาหารปลากินพืชกลาง  022V",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  320,
        "price":  350
    },
    {
        "id":  "pos_prod_27",
        "code":  "20101010",
        "name":  "cp อาหารปลากินพืช 9933 (กระสอบ)",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  320,
        "price":  350
    },
    {
        "id":  "pos_prod_28",
        "code":  "20101018",
        "name":  "ลี  อาหารปลากินพืชใหญ่  022VL",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  314,
        "price":  340
    },
    {
        "id":  "pos_prod_29",
        "code":  "20101001",
        "name":  "cp อาหารปลาดุกเล็กพิเศษ 7710S",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  590,
        "price":  620
    },
    {
        "id":  "pos_prod_30",
        "code":  "20101021",
        "name":  "ลี อาหารปลาดุกใหญ่ 015",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  413,
        "price":  445
    },
    {
        "id":  "pos_prod_31",
        "code":  "20101039",
        "name":  "รำละเอียด กส. 25กก.",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  16,
        "unit":  "กระสอบ",
        "cost":  225,
        "price":  350
    },
    {
        "id":  "pos_prod_32",
        "code":  "20201001",
        "name":  "cp อาหารปลาดุกเล็กพิเศษ 7710S 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  57.38,
        "price":  75
    },
    {
        "id":  "pos_prod_33",
        "code":  "20201003",
        "name":  "cp อาหารปลาดุกเล็ก9920D 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  10,
        "unit":  "ถุง",
        "cost":  46.22,
        "price":  60
    },
    {
        "id":  "pos_prod_34",
        "code":  "20201004",
        "name":  "cp อาหารปลาดุกกลาง9921 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  44.82,
        "price":  55
    },
    {
        "id":  "pos_prod_35",
        "code":  "20201005",
        "name":  "cp อาหารปลาดุกกลางใหญ่ 9922 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  44.36,
        "price":  50
    },
    {
        "id":  "pos_prod_36",
        "code":  "20201006",
        "name":  "trr อาหารปลาดุกกลาง 803M 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  40.5,
        "price":  53
    },
    {
        "id":  "pos_prod_37",
        "code":  "20201007",
        "name":  "trr อาหารปลาดุกกลาง 803L 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ขวด",
        "cost":  40,
        "price":  50
    },
    {
        "id":  "pos_prod_38",
        "code":  "20201008",
        "name":  "trr อาหารปลากินพืชใหญ่ 888 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  28,
        "price":  40
    },
    {
        "id":  "pos_prod_39",
        "code":  "20201009",
        "name":  "cp อาหารปลากินพืช 9931 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  39.06,
        "price":  50
    },
    {
        "id":  "pos_prod_40",
        "code":  "20201010",
        "name":  "cp อาหารปลากินพืช 9932 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ขวด",
        "cost":  33,
        "price":  45
    },
    {
        "id":  "pos_prod_41",
        "code":  "20201011",
        "name":  "cp อาหารปลากินพืช 9933 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ขวด",
        "cost":  31.15,
        "price":  45
    },
    {
        "id":  "pos_prod_42",
        "code":  "20201012",
        "name":  "cp อาหารปลาช่อน ไฮเกรด 9981 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  6,
        "unit":  "ถุง",
        "cost":  69.37,
        "price":  85
    },
    {
        "id":  "pos_prod_43",
        "code":  "20201013",
        "name":  "cp อาหารปลาช่อน ไฮเกรด 9982 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  68.44,
        "price":  85
    },
    {
        "id":  "pos_prod_44",
        "code":  "20201014",
        "name":  "cp อาหารปลาช่อน ไฮเกรด 9983 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  8,
        "unit":  "ถุง",
        "cost":  67.97,
        "price":  80
    },
    {
        "id":  "pos_prod_45",
        "code":  "20201015",
        "name":  "cp อาหารปลาช่อน ไฮเกรด 9984 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  67.5,
        "price":  80
    },
    {
        "id":  "pos_prod_46",
        "code":  "20201016",
        "name":  "cp อาหารปลาไฮเกรด 9006T เม็ดจิ๋ว 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  140,
        "price":  145
    },
    {
        "id":  "pos_prod_47",
        "code":  "20201017",
        "name":  "ลี อาหารปลากินพืชเล็ก 022US 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  34.1,
        "price":  50
    },
    {
        "id":  "pos_prod_48",
        "code":  "20201018",
        "name":  "ลี  อาหารปลากินพืชกลาง  022V  2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ขวด",
        "cost":  32,
        "price":  45
    },
    {
        "id":  "pos_prod_49",
        "code":  "20201019",
        "name":  "ลี  อาหารปลากินพืชใหญ่  022VL 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ขวด",
        "cost":  31.4,
        "price":  45
    },
    {
        "id":  "pos_prod_50",
        "code":  "20201020",
        "name":  "ลี  อาหารปลาดุกเล็ก  013 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  44.4,
        "price":  58
    },
    {
        "id":  "pos_prod_51",
        "code":  "20201021",
        "name":  "ลี อาหารปลาดุกกลาง 014 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  41.3,
        "price":  55
    },
    {
        "id":  "pos_prod_52",
        "code":  "20201022",
        "name":  "ลี อาหารปลาดุกใหญ่ 015 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  41.3,
        "price":  50
    },
    {
        "id":  "pos_prod_53",
        "code":  "20201023",
        "name":  "ลี อาหารปลาดุกเล็ก   011U 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  52.9,
        "price":  65
    },
    {
        "id":  "pos_prod_54",
        "code":  "20201024",
        "name":  "cp อาหารกบดีฟ้อกซ์ 3762 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  69.04,
        "price":  80
    },
    {
        "id":  "pos_prod_55",
        "code":  "20201025",
        "name":  "cpอาหารกบดีฟ้อกซ์ 3763 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  63.46,
        "price":  75
    },
    {
        "id":  "pos_prod_56",
        "code":  "20201026",
        "name":  "cp อาหารกบดีฟ้อกซ์ 3764 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  58.81,
        "price":  70
    },
    {
        "id":  "pos_prod_57",
        "code":  "20201027",
        "name":  "ลี อาหารกบเม็ดจิ๋ว 051S 2กก",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  73,
        "price":  85
    },
    {
        "id":  "pos_prod_58",
        "code":  "20201035",
        "name":  "รำหยาบ 1 กก.",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ขวด",
        "cost":  9.5,
        "price":  13
    },
    {
        "id":  "pos_prod_59",
        "code":  "20201036",
        "name":  "ปลาป่น 1 กก.",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  25,
        "unit":  "ถุง",
        "cost":  31,
        "price":  40
    },
    {
        "id":  "pos_prod_60",
        "code":  "40101001",
        "name":  "ปลาตะเพียน 1.5-2 เซน (จ)",
        "category":  "1 ปลาตะเพียน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.06,
        "price":  0.25
    },
    {
        "id":  "pos_prod_61",
        "code":  "40101002",
        "name":  "ปลาตะเพียน 1-1.5 นิ้ว (ล)",
        "category":  "1 ปลาตะเพียน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0.35
    },
    {
        "id":  "pos_prod_62",
        "code":  "40101004",
        "name":  "ปลาตะเพียร 1.8-2 นิ้ว (ก)",
        "category":  "1 ปลาตะเพียน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0.6
    },
    {
        "id":  "pos_prod_63",
        "code":  "40101005",
        "name":  "ปลาตะเพียน 1.8-1.9 นิ้ว (ลสส.)",
        "category":  "1 ปลาตะเพียน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0.5
    },
    {
        "id":  "pos_prod_64",
        "code":  "40101006",
        "name":  "ปลาตะเพียน 2-2.5 นิ้ว (ก.ส.)",
        "category":  "1 ปลาตะเพียน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0.8
    },
    {
        "id":  "pos_prod_65",
        "code":  "40101007",
        "name":  "ปลาตะเพียน 2.5-3 นิ้ว (ญ.ส.)",
        "category":  "1 ปลาตะเพียน",
        "quantity":  1200,
        "unit":  "ตัว",
        "cost":  0,
        "price":  1.2
    },
    {
        "id":  "pos_prod_66",
        "code":  "40101008",
        "name":  "ปลาตะเพียน 3.5-4 นิ้ว",
        "category":  "1 ปลาตะเพียน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.55,
        "price":  2
    },
    {
        "id":  "pos_prod_67",
        "code":  "40101009",
        "name":  "ปลาตะเพียน 4-4.5 นิ้ว",
        "category":  "1 ปลาตะเพียน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.6,
        "price":  2.5
    },
    {
        "id":  "pos_prod_68",
        "code":  "40102001",
        "name":  "ปลายี่สก 1-1.5 นิ้ว",
        "category":  "2 ปลายี่สก",
        "quantity":  21320,
        "unit":  "ตัว",
        "cost":  0.2,
        "price":  0.35
    },
    {
        "id":  "pos_prod_69",
        "code":  "40102002",
        "name":  "ปลายี่สก 1.5-2 นิ้ว",
        "category":  "2 ปลายี่สก",
        "quantity":  16500,
        "unit":  "ตัว",
        "cost":  0.25,
        "price":  0.4
    },
    {
        "id":  "pos_prod_70",
        "code":  "40102003",
        "name":  "ปลายี่สก 2-2.5 นิ้ว",
        "category":  "2 ปลายี่สก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.23,
        "price":  0.5
    },
    {
        "id":  "pos_prod_71",
        "code":  "40102004",
        "name":  "ปลายี่สก 2-3 นิ้ว",
        "category":  "2 ปลายี่สก",
        "quantity":  16000,
        "unit":  "ตัว",
        "cost":  0.28,
        "price":  0.6
    },
    {
        "id":  "pos_prod_72",
        "code":  "40102005",
        "name":  "ปลายี่สก 3-3.5 นิ้ว",
        "category":  "2 ปลายี่สก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.4,
        "price":  1
    },
    {
        "id":  "pos_prod_73",
        "code":  "40103001",
        "name":  "ปลานิล 2-2.5 เซน (จ)",
        "category":  "3 ปลานิล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.08,
        "price":  0.15
    },
    {
        "id":  "pos_prod_74",
        "code":  "40103002",
        "name":  "ปลานิล 1.5-1.8 นิ้ว (ล)",
        "category":  "3 ปลานิล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.15,
        "price":  0.4
    },
    {
        "id":  "pos_prod_75",
        "code":  "40103003",
        "name":  "ปลานิล 1.5-2 นิ้ว (ก)",
        "category":  "3 ปลานิล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.3,
        "price":  0.65
    },
    {
        "id":  "pos_prod_76",
        "code":  "40103004",
        "name":  "ปลานิล 1.8-2นิ้ว (ล.ส)",
        "category":  "3 ปลานิล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.3,
        "price":  0.45
    },
    {
        "id":  "pos_prod_77",
        "code":  "40103005",
        "name":  "ปลานิล 2.5-3 นิ้ว (ญ)",
        "category":  "3 ปลานิล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.55,
        "price":  1.1
    },
    {
        "id":  "pos_prod_78",
        "code":  "40104001",
        "name":  "ปลาดุกบิ๊กอุย 1-1.5 นิ้ว",
        "category":  "4 ปลาดุกบิ๊กอุย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.35,
        "price":  0.6
    },
    {
        "id":  "pos_prod_79",
        "code":  "40104002",
        "name":  "ปลาดุกบิ๊กอุย 1.5-2 นิ้ว",
        "category":  "4 ปลาดุกบิ๊กอุย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.4,
        "price":  0.65
    },
    {
        "id":  "pos_prod_80",
        "code":  "40104003",
        "name":  "ปลาดุกบิ๊กอุย 2-3 นิ้ว",
        "category":  "4 ปลาดุกบิ๊กอุย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.5,
        "price":  0.8
    },
    {
        "id":  "pos_prod_81",
        "code":  "40104004",
        "name":  "ปลาดุกบิ๊กอุย  3-4 นิ้ว",
        "category":  "4 ปลาดุกบิ๊กอุย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.65,
        "price":  1.2
    },
    {
        "id":  "pos_prod_82",
        "code":  "40104005",
        "name":  "ปลาดุกบิ๊กอุย 4-5 นิ้ว",
        "category":  "4 ปลาดุกบิ๊กอุย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.75,
        "price":  1.5
    },
    {
        "id":  "pos_prod_83",
        "code":  "40105001",
        "name":  "ปลาสวาย 1.5-2 นิ้ว",
        "category":  "5 ปลาสวาย",
        "quantity":  2000,
        "unit":  "ตัว",
        "cost":  0.3413,
        "price":  0.65
    },
    {
        "id":  "pos_prod_84",
        "code":  "40105002",
        "name":  "ปลาสวาย 2-2.5 นิ้ว",
        "category":  "5 ปลาสวาย",
        "quantity":  39500,
        "unit":  "ตัว",
        "cost":  0.45,
        "price":  0.8
    },
    {
        "id":  "pos_prod_85",
        "code":  "40105003",
        "name":  "ปลาสวาย 2-3  นิ้ว",
        "category":  "5 ปลาสวาย",
        "quantity":  14000,
        "unit":  "ตัว",
        "cost":  0.4375,
        "price":  0.85
    },
    {
        "id":  "pos_prod_86",
        "code":  "40105004",
        "name":  "ปลาสวาย 3-4  นิ้ว",
        "category":  "5 ปลาสวาย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.55,
        "price":  1
    },
    {
        "id":  "pos_prod_87",
        "code":  "40105005",
        "name":  "ปลาสวาย 4-5  นิ้ว",
        "category":  "5 ปลาสวาย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.5,
        "price":  2
    },
    {
        "id":  "pos_prod_88",
        "code":  "40105006",
        "name":  "ปลาสวาย 5-6  นิ้ว",
        "category":  "5 ปลาสวาย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.95,
        "price":  2
    },
    {
        "id":  "pos_prod_89",
        "code":  "40106001",
        "name":  "ปลาหมอแปลงเพศ 1.5-2.5 เซน",
        "category":  "6 ปลาหมอแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.6646,
        "price":  1
    },
    {
        "id":  "pos_prod_90",
        "code":  "40106002",
        "name":  "ปลาหมอแปลงเพศ 1-1.5 นิ้ว",
        "category":  "6 ปลาหมอแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.7,
        "price":  1
    },
    {
        "id":  "pos_prod_91",
        "code":  "40106003",
        "name":  "ปลาหมอแปลงเพศ 1.5-2 นิ้ว",
        "category":  "6 ปลาหมอแปลงเพศ",
        "quantity":  13800,
        "unit":  "ตัว",
        "cost":  0.8994,
        "price":  1.5
    },
    {
        "id":  "pos_prod_92",
        "code":  "40106004",
        "name":  "ปลาหมอแปลงเพศ 2-2.5 นิ้ว",
        "category":  "6 ปลาหมอแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.2,
        "price":  2
    },
    {
        "id":  "pos_prod_93",
        "code":  "40106005",
        "name":  "ปลาหมอแปลงเพศ 2.5-3 นิ้ว",
        "category":  "6 ปลาหมอแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1,
        "price":  3
    },
    {
        "id":  "pos_prod_94",
        "code":  "40107001",
        "name":  "ปลาจีนหัวโต 1-1.5 นิ้ว",
        "category":  "7 ปลาจีนหัวโต",
        "quantity":  5925,
        "unit":  "ตัว",
        "cost":  0.4,
        "price":  0.7
    },
    {
        "id":  "pos_prod_95",
        "code":  "40107002",
        "name":  "ปลาจีนหัวโต 1.5-2 นิ้ว",
        "category":  "7 ปลาจีนหัวโต",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.7,
        "price":  0.8
    },
    {
        "id":  "pos_prod_96",
        "code":  "40107003",
        "name":  "ปลาจีนหัวโต 2-2.5 นิ้ว",
        "category":  "7 ปลาจีนหัวโต",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.6,
        "price":  1
    },
    {
        "id":  "pos_prod_97",
        "code":  "40107004",
        "name":  "ปลาจีนหัวโต 2.5-3 นิ้ว",
        "category":  "7 ปลาจีนหัวโต",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.6,
        "price":  1.2
    },
    {
        "id":  "pos_prod_98",
        "code":  "40108001",
        "name":  "ปลาจีนแบน 1-1.5 นิ้ว",
        "category":  "8 ปลาจีนแบน",
        "quantity":  16120,
        "unit":  "ตัว",
        "cost":  0.2,
        "price":  0.4
    },
    {
        "id":  "pos_prod_99",
        "code":  "40108002",
        "name":  "ปลาจีนแบน 1.5-2 นิ้ว",
        "category":  "8 ปลาจีนแบน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.1636,
        "price":  0.5
    },
    {
        "id":  "pos_prod_100",
        "code":  "40108003",
        "name":  "ปลาจีนแบน 2.5-3 นิ้ว",
        "category":  "8 ปลาจีนแบน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.38,
        "price":  0.7
    },
    {
        "id":  "pos_prod_101",
        "code":  "40108004",
        "name":  "ปลาจีนแบน 3-3.5 นิ้ว",
        "category":  "8 ปลาจีนแบน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.25,
        "price":  0.8
    },
    {
        "id":  "pos_prod_102",
        "code":  "40108005",
        "name":  "ปลาจีนแบน 3.5-4 นิ้ว",
        "category":  "8 ปลาจีนแบน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.4327,
        "price":  1.3
    },
    {
        "id":  "pos_prod_103",
        "code":  "40109001",
        "name":  "ปลานวลจันทร์ 1-1.5 นิ้ว",
        "category":  "9 ปลานวลจันทร์",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.2,
        "price":  0.4
    },
    {
        "id":  "pos_prod_104",
        "code":  "40109002",
        "name":  "ปลานวลจันทร์ 2-2.5 นิ้ว",
        "category":  "9 ปลานวลจันทร์",
        "quantity":  12283,
        "unit":  "ตัว",
        "cost":  0.35,
        "price":  0.6
    },
    {
        "id":  "pos_prod_105",
        "code":  "40109003",
        "name":  "ปลานวลจันทร์ 1.5-2 นิ้ว",
        "category":  "9 ปลานวลจันทร์",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.2698,
        "price":  0.6
    },
    {
        "id":  "pos_prod_106",
        "code":  "40109004",
        "name":  "ปลานวลจันทร์ 2.5-3 นิ้ว",
        "category":  "9 ปลานวลจันทร์",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.25,
        "price":  0.8
    },
    {
        "id":  "pos_prod_107",
        "code":  "40109005",
        "name":  "ปลานวลจันทร์ 3-3.5 นิ้ว",
        "category":  "9 ปลานวลจันทร์",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.3,
        "price":  1
    },
    {
        "id":  "pos_prod_108",
        "code":  "40110001",
        "name":  "ปลาดุกรัสเซีย 1-1.5 นิ้ว",
        "category":  "10 ปลาดุกรัสเซีย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.25,
        "price":  0.45
    },
    {
        "id":  "pos_prod_109",
        "code":  "40110002",
        "name":  "ปลาดุกรัสเซีย 1.5-2 นิ้ว",
        "category":  "10 ปลาดุกรัสเซีย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.3,
        "price":  0.6
    },
    {
        "id":  "pos_prod_110",
        "code":  "40110003",
        "name":  "ปลาดุกรัสเซีย 2-3 นิ้ว",
        "category":  "10 ปลาดุกรัสเซีย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.4,
        "price":  0.7
    },
    {
        "id":  "pos_prod_111",
        "code":  "40110004",
        "name":  "ปลาดุกรัสเซีย 3-4 นิ้ว",
        "category":  "10 ปลาดุกรัสเซีย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.5,
        "price":  0.9
    },
    {
        "id":  "pos_prod_112",
        "code":  "40110005",
        "name":  "ปลาดุกรัสเซีย 4-5 นิ้ว",
        "category":  "10 ปลาดุกรัสเซีย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.55,
        "price":  1.2
    },
    {
        "id":  "pos_prod_113",
        "code":  "40111001",
        "name":  "ปลาจาระเม็ด 1.5-2.5 เซน",
        "category":  "11 ปลาจาระเม็ด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.5,
        "price":  0.65
    },
    {
        "id":  "pos_prod_114",
        "code":  "40111002",
        "name":  "ปลาจาระเม็ด 1-1.5 นิ้ว",
        "category":  "11 ปลาจาระเม็ด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.6,
        "price":  1.2
    },
    {
        "id":  "pos_prod_115",
        "code":  "40111003",
        "name":  "ปลาจาระเม็ด 1.5-2 นิ้ว",
        "category":  "11 ปลาจาระเม็ด",
        "quantity":  36690,
        "unit":  "ตัว",
        "cost":  0.6,
        "price":  1.5
    },
    {
        "id":  "pos_prod_116",
        "code":  "40111004",
        "name":  "ปลาจาระเม็ด 2-2.5 นิ้ว",
        "category":  "11 ปลาจาระเม็ด",
        "quantity":  4000,
        "unit":  "ตัว",
        "cost":  0.8,
        "price":  1.8
    },
    {
        "id":  "pos_prod_117",
        "code":  "40111005",
        "name":  "ปลาจาระเม็ด 2.5-3 นิ้ว",
        "category":  "11 ปลาจาระเม็ด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.2,
        "price":  2
    },
    {
        "id":  "pos_prod_118",
        "code":  "40112001",
        "name":  "ปลาสลิด 1.5-2.5 เซน",
        "category":  "12 ปลาสลิด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.17,
        "price":  0.35
    },
    {
        "id":  "pos_prod_119",
        "code":  "40112002",
        "name":  "ปลาสลิด 1-1.5 นิ้ว",
        "category":  "12 ปลาสลิด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.4757,
        "price":  0.5
    },
    {
        "id":  "pos_prod_120",
        "code":  "40112003",
        "name":  "ปลาสลิด 1.5-2 นิ้ว",
        "category":  "12 ปลาสลิด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.6423,
        "price":  1
    },
    {
        "id":  "pos_prod_121",
        "code":  "40112004",
        "name":  "ปลาสลิด 2-2.5 นิ้ว",
        "category":  "12 ปลาสลิด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.6,
        "price":  0.8
    },
    {
        "id":  "pos_prod_122",
        "code":  "40112005",
        "name":  "ปลาสลิด 2.5-3 นิ้ว",
        "category":  "12 ปลาสลิด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_123",
        "code":  "40113001",
        "name":  "ปลาทับทิม 1.5-2.5 เซน",
        "category":  "13 ปลาทับทิม",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.4,
        "price":  0.8
    },
    {
        "id":  "pos_prod_124",
        "code":  "40113002",
        "name":  "ปลาทับทิม 1.5-2 นิ้ว",
        "category":  "13 ปลาทับทิม",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.5294,
        "price":  1.2
    },
    {
        "id":  "pos_prod_125",
        "code":  "40113003",
        "name":  "ปลาทับทิม 2-2.5นิ้ว",
        "category":  "13 ปลาทับทิม",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.55,
        "price":  1.2
    },
    {
        "id":  "pos_prod_126",
        "code":  "40113004",
        "name":  "ปลาทับทิม 2.5-3 นิ้ว",
        "category":  "13 ปลาทับทิม",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.6272,
        "price":  1.5
    },
    {
        "id":  "pos_prod_127",
        "code":  "40113005",
        "name":  "ปลาทับทิม 3-3.5 นิ้ว",
        "category":  "13 ปลาทับทิม",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.8,
        "price":  2.5
    },
    {
        "id":  "pos_prod_128",
        "code":  "40114001",
        "name":  "ปลาใน 1.5-2.5 เซน",
        "category":  "14 ปลาใน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.25,
        "price":  0.4
    },
    {
        "id":  "pos_prod_129",
        "code":  "40114002",
        "name":  "ปลาใน 1-1.5 นิ้ว",
        "category":  "14 ปลาใน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.35,
        "price":  0.6
    },
    {
        "id":  "pos_prod_130",
        "code":  "40114003",
        "name":  "ปลาใน 1.5-2 นิ้ว",
        "category":  "14 ปลาใน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.3704,
        "price":  0.7
    },
    {
        "id":  "pos_prod_131",
        "code":  "40114004",
        "name":  "ปลาใน 2-2.5 นิ้ว",
        "category":  "14 ปลาใน",
        "quantity":  1200,
        "unit":  "ตัว",
        "cost":  0.4545,
        "price":  0.8
    },
    {
        "id":  "pos_prod_132",
        "code":  "40114005",
        "name":  "ปลาใน 2.5-3 นิ้ว",
        "category":  "14 ปลาใน",
        "quantity":  200,
        "unit":  "ตัว",
        "cost":  0.65,
        "price":  1
    },
    {
        "id":  "pos_prod_133",
        "code":  "40115001",
        "name":  "ปลากระโห้อินเดีย 1-1.5 นิ้ว",
        "category":  "15 ปลากระโห้อินเดีย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.5,
        "price":  1.2
    },
    {
        "id":  "pos_prod_134",
        "code":  "40115002",
        "name":  "ปลากระโห้อินเดีย 1.5-2 นิ้ว",
        "category":  "15 ปลากระโห้อินเดีย",
        "quantity":  6397,
        "unit":  "ตัว",
        "cost":  1.3,
        "price":  3.5
    },
    {
        "id":  "pos_prod_135",
        "code":  "40115003",
        "name":  "ปลากระโห้อินเดีย 2-2.5 นิ้ว",
        "category":  "15 ปลากระโห้อินเดีย",
        "quantity":  1723,
        "unit":  "ตัว",
        "cost":  1.3,
        "price":  4
    },
    {
        "id":  "pos_prod_136",
        "code":  "40115004",
        "name":  "ปลากระโห้อินเดีย 2.5-3 นิ้ว",
        "category":  "15 ปลากระโห้อินเดีย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.3,
        "price":  2
    },
    {
        "id":  "pos_prod_137",
        "code":  "40115005",
        "name":  "ปลากระโห้อินเดีย 3-3.5 นิ้ว",
        "category":  "15 ปลากระโห้อินเดีย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.5,
        "price":  3
    },
    {
        "id":  "pos_prod_138",
        "code":  "40116001",
        "name":  "ปลากระโห้ไทย 1-1.5 นิ้ว",
        "category":  "16 ปลากระโห้ไทย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  5,
        "price":  10
    },
    {
        "id":  "pos_prod_139",
        "code":  "40116002",
        "name":  "ปลากระโห้ไทย 1.5-2 นิ้ว",
        "category":  "16 ปลากระโห้ไทย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  10,
        "price":  18
    },
    {
        "id":  "pos_prod_140",
        "code":  "40116003",
        "name":  "ปลากระโห้ไทย 2-2.5 นิ้ว",
        "category":  "16 ปลากระโห้ไทย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  6,
        "price":  15
    },
    {
        "id":  "pos_prod_141",
        "code":  "40116004",
        "name":  "ปลากระโห้ไทย 2.5-3 นิ้ว",
        "category":  "16 ปลากระโห้ไทย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  9.6852,
        "price":  20
    },
    {
        "id":  "pos_prod_142",
        "code":  "40116005",
        "name":  "ปลากระโห้ไทย 3-3.5 นิ้ว",
        "category":  "16 ปลากระโห้ไทย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  20,
        "price":  30
    },
    {
        "id":  "pos_prod_143",
        "code":  "40117001",
        "name":  "ปลากดเหลือง 1-1.5 นิ้ว",
        "category":  "17 ปลากดเหลือง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.75,
        "price":  1.2
    },
    {
        "id":  "pos_prod_144",
        "code":  "40117002",
        "name":  "ปลากดเหลือง 1.5-2 นิ้ว",
        "category":  "17 ปลากดเหลือง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.9,
        "price":  1.5
    },
    {
        "id":  "pos_prod_145",
        "code":  "40117003",
        "name":  "ปลากดเหลือง 2-2.5 นิ้ว",
        "category":  "17 ปลากดเหลือง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.9,
        "price":  1.5
    },
    {
        "id":  "pos_prod_146",
        "code":  "40117004",
        "name":  "ปลากดเหลือง 2.5-3 นิ้ว",
        "category":  "17 ปลากดเหลือง",
        "quantity":  5827,
        "unit":  "ตัว",
        "cost":  1.3725,
        "price":  1.8
    },
    {
        "id":  "pos_prod_147",
        "code":  "40117005",
        "name":  "ปลากดเหลือง 3-3.5 นิ้ว",
        "category":  "17 ปลากดเหลือง",
        "quantity":  2621,
        "unit":  "ตัว",
        "cost":  2,
        "price":  2.5
    },
    {
        "id":  "pos_prod_148",
        "code":  "40118001",
        "name":  "ปลากดคัง 1-1.5 นิ้ว",
        "category":  "18 ปลากดคัง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.2,
        "price":  1.5
    },
    {
        "id":  "pos_prod_149",
        "code":  "40118002",
        "name":  "ปลากดคัง 1.5-2 นิ้ว",
        "category":  "18 ปลากดคัง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.9,
        "price":  2.5
    },
    {
        "id":  "pos_prod_150",
        "code":  "40118003",
        "name":  "ปลากดคัง 2-2.5 นิ้ว",
        "category":  "18 ปลากดคัง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2.4,
        "price":  4
    },
    {
        "id":  "pos_prod_151",
        "code":  "40118004",
        "name":  "ปลากดคัง 2.5-3 นิ้ว",
        "category":  "18 ปลากดคัง",
        "quantity":  4750,
        "unit":  "ตัว",
        "cost":  2.4632,
        "price":  4
    },
    {
        "id":  "pos_prod_152",
        "code":  "40118005",
        "name":  "ปลากดคัง 3-3.5 นิ้ว",
        "category":  "18 ปลากดคัง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2.4186,
        "price":  4
    },
    {
        "id":  "pos_prod_153",
        "code":  "40119001",
        "name":  "ปลาบึก 1.5-2 นิ้ว",
        "category":  "19 ปลาบึก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  3.913,
        "price":  10
    },
    {
        "id":  "pos_prod_154",
        "code":  "40119002",
        "name":  "ปลาบึก3.5- 4 นิ้ว",
        "category":  "19 ปลาบึก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  4,
        "price":  12
    },
    {
        "id":  "pos_prod_155",
        "code":  "40119003",
        "name":  "ปลาบึก 4-5 นิ้ว",
        "category":  "19 ปลาบึก",
        "quantity":  583,
        "unit":  "ตัว",
        "cost":  5,
        "price":  15
    },
    {
        "id":  "pos_prod_156",
        "code":  "40119004",
        "name":  "ปลาบึก 3.5-4  นิ้ว",
        "category":  "19 ปลาบึก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  10,
        "price":  13
    },
    {
        "id":  "pos_prod_157",
        "code":  "40119005",
        "name":  "ปลาบึก 4-4.5 นิ้ว",
        "category":  "19 ปลาบึก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  12,
        "price":  25
    },
    {
        "id":  "pos_prod_158",
        "code":  "40119006",
        "name":  "ปลาบึก 5-5.5  นิ้ว",
        "category":  "19 ปลาบึก",
        "quantity":  507,
        "unit":  "ตัว",
        "cost":  5,
        "price":  18
    },
    {
        "id":  "pos_prod_159",
        "code":  "40120001",
        "name":  "ปลาเทโพ 1-1.5 นิ้ว",
        "category":  "20 ปลาเทโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2,
        "price":  6
    },
    {
        "id":  "pos_prod_160",
        "code":  "40120002",
        "name":  "ปลาเทโพ 1.5-2 นิ้ว",
        "category":  "20 ปลาเทโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  3,
        "price":  8
    },
    {
        "id":  "pos_prod_161",
        "code":  "40120003",
        "name":  "ปลาเทโพ 2-2.5 นิ้ว",
        "category":  "20 ปลาเทโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  4,
        "price":  10
    },
    {
        "id":  "pos_prod_162",
        "code":  "40120004",
        "name":  "ปลาเทโพ 2.5-3 นิ้ว",
        "category":  "20 ปลาเทโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  5,
        "price":  10
    },
    {
        "id":  "pos_prod_163",
        "code":  "40120005",
        "name":  "ปลาเทโพ 3-3.5 นิ้ว",
        "category":  "20 ปลาเทโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  9,
        "price":  15
    },
    {
        "id":  "pos_prod_164",
        "code":  "40121001",
        "name":  "ปลาแรด 1.5-2.5 เซน",
        "category":  "21 ปลาแรด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.5,
        "price":  2.5
    },
    {
        "id":  "pos_prod_165",
        "code":  "40121002",
        "name":  "ปลาแรด 1-1.5 นิ้ว",
        "category":  "21 ปลาแรด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2,
        "price":  4
    },
    {
        "id":  "pos_prod_166",
        "code":  "40121003",
        "name":  "ปลาแรด 1.5-2 นิ้ว",
        "category":  "21 ปลาแรด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2.5,
        "price":  4.5
    },
    {
        "id":  "pos_prod_167",
        "code":  "40121004",
        "name":  "ปลาแรด 2-2.5 นิ้ว",
        "category":  "21 ปลาแรด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  4,
        "price":  5.5
    },
    {
        "id":  "pos_prod_168",
        "code":  "40121005",
        "name":  "ปลาแรด 2.5-3 นิ้ว",
        "category":  "21 ปลาแรด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2.7,
        "price":  6
    },
    {
        "id":  "pos_prod_169",
        "code":  "40122001",
        "name":  "ปลากราย 1-1.5 นิ้ว",
        "category":  "22 ปลากราย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.5,
        "price":  2.5
    },
    {
        "id":  "pos_prod_170",
        "code":  "40122002",
        "name":  "ปลากราย 1.5-2 นิ้ว",
        "category":  "22 ปลากราย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2.2783,
        "price":  3.5
    },
    {
        "id":  "pos_prod_171",
        "code":  "40122003",
        "name":  "ปลากราย 2-2.5  นิ้ว",
        "category":  "22 ปลากราย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2.439,
        "price":  4.5
    },
    {
        "id":  "pos_prod_172",
        "code":  "40122004",
        "name":  "ปลากราย 2.5-3  นิ้ว",
        "category":  "22 ปลากราย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  3.5,
        "price":  5
    },
    {
        "id":  "pos_prod_173",
        "code":  "40122005",
        "name":  "ปลากราย 3-3.5  นิ้ว",
        "category":  "22 ปลากราย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  4,
        "price":  5.5
    },
    {
        "id":  "pos_prod_174",
        "code":  "40123001",
        "name":  "ปลานิลแปลงเพศ 1-1.5 เซน (จ)",
        "category":  "23 ปลานิลแปลงเพศ",
        "quantity":  28000,
        "unit":  "ตัว",
        "cost":  0.22,
        "price":  0.35
    },
    {
        "id":  "pos_prod_175",
        "code":  "40123002",
        "name":  "ปลานิลแปลงเพศ 1.5-2 เซน (จ.ส.)",
        "category":  "23 ปลานิลแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.3,
        "price":  0.5
    },
    {
        "id":  "pos_prod_176",
        "code":  "40123003",
        "name":  "ปลานิลแปลงเพศ 1-1.5 นิ้ว (ล)",
        "category":  "23 ปลานิลแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.35,
        "price":  0.6
    },
    {
        "id":  "pos_prod_177",
        "code":  "40123004",
        "name":  "ปลานิลแปลงเพศ 1.5-2 (ล.ส.)",
        "category":  "23 ปลานิลแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.5,
        "price":  1
    },
    {
        "id":  "pos_prod_178",
        "code":  "40123005",
        "name":  "ปลานิลแปลงเพศ 1.5-2นิ้ว  (ก)",
        "category":  "23 ปลานิลแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.45,
        "price":  0.8
    },
    {
        "id":  "pos_prod_179",
        "code":  "40123006",
        "name":  "ปลานิลแปลงเพศ 5-6 เซน (ก.ส.)",
        "category":  "23 ปลานิลแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.6,
        "price":  1
    },
    {
        "id":  "pos_prod_180",
        "code":  "40123007",
        "name":  "ปลานิลแปลงเพศ 2-2.5 นิ้ว(ญ)",
        "category":  "23 ปลานิลแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  1.5
    },
    {
        "id":  "pos_prod_181",
        "code":  "40124001",
        "name":  "ปลาทับทิมหมัน 1.5-2.5 เซน",
        "category":  "24 ปลาทับทิมหมัน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.45,
        "price":  0.6
    },
    {
        "id":  "pos_prod_182",
        "code":  "40124002",
        "name":  "ปลาทับทิมหมัน 1-1.5 นิ้ว",
        "category":  "24 ปลาทับทิมหมัน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.8,
        "price":  1.2
    },
    {
        "id":  "pos_prod_183",
        "code":  "40124003",
        "name":  "ปลาทับทิมหมัน 1.5-2 นิ้ว",
        "category":  "24 ปลาทับทิมหมัน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.2,
        "price":  2
    },
    {
        "id":  "pos_prod_184",
        "code":  "40124004",
        "name":  "ปลาทับทิมหมัน 2-2.5 นิ้ว",
        "category":  "24 ปลาทับทิมหมัน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.5,
        "price":  3.5
    },
    {
        "id":  "pos_prod_185",
        "code":  "40124005",
        "name":  "ปลาทับทิมหมัน 2.5-3 นิ้ว",
        "category":  "24 ปลาทับทิมหมัน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2.7966,
        "price":  4
    },
    {
        "id":  "pos_prod_186",
        "code":  "40124006",
        "name":  "ปลาทับทิมหมัน 3-3.5 นิ้ว",
        "category":  "24 ปลาทับทิมหมัน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  3,
        "price":  4.5
    },
    {
        "id":  "pos_prod_187",
        "code":  "40125001",
        "name":  "ปลาช่อน 1.5-2 นิ้ว",
        "category":  "25 ปลาช่อน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.8,
        "price":  1.5
    },
    {
        "id":  "pos_prod_188",
        "code":  "40125002",
        "name":  "ปลาช่อน 2-2.5 นิ้ว",
        "category":  "25 ปลาช่อน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.9,
        "price":  2
    },
    {
        "id":  "pos_prod_189",
        "code":  "40125003",
        "name":  "ปลาช่อน 3-3.5 นิ้ว",
        "category":  "25 ปลาช่อน",
        "quantity":  980,
        "unit":  "ตัว",
        "cost":  1,
        "price":  2.5
    },
    {
        "id":  "pos_prod_190",
        "code":  "40125004",
        "name":  "ปลาช่อน 2.5-3 นิ้ว",
        "category":  "25 ปลาช่อน",
        "quantity":  1695,
        "unit":  "ตัว",
        "cost":  1.5,
        "price":  2
    },
    {
        "id":  "pos_prod_191",
        "code":  "40125005",
        "name":  "ปลาช่อน 3.5-4 นิ้ว",
        "category":  "25 ปลาช่อน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.25,
        "price":  2.5
    },
    {
        "id":  "pos_prod_192",
        "code":  "40126001",
        "name":  "ปลาบู่ 1-1.5 นิ้ว",
        "category":  "26 ปลาบู่",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1,
        "price":  5
    },
    {
        "id":  "pos_prod_193",
        "code":  "40126002",
        "name":  "ปลาบู่ 1.5-2 นิ้ว",
        "category":  "26 ปลาบู่",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2,
        "price":  3
    },
    {
        "id":  "pos_prod_194",
        "code":  "40126003",
        "name":  "ปลาบู่ 2-3 นิ้ว",
        "category":  "26 ปลาบู่",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  5
    },
    {
        "id":  "pos_prod_195",
        "code":  "40126004",
        "name":  "ปลาบู่ 3-4 นิ้ว",
        "category":  "26 ปลาบู่",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  5,
        "price":  15
    },
    {
        "id":  "pos_prod_196",
        "code":  "40127001",
        "name":  "ปลาบิ๊กโพ 1-1.5 นิ้ว",
        "category":  "27 ปลาบิ๊กโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.35,
        "price":  0.65
    },
    {
        "id":  "pos_prod_197",
        "code":  "40127002",
        "name":  "ปลาบิ๊กโพ 1.5-2 นิ้ว",
        "category":  "27 ปลาบิ๊กโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.45,
        "price":  0.85
    },
    {
        "id":  "pos_prod_198",
        "code":  "40127003",
        "name":  "ปลาบิ๊กโพ 2-3 นิ้ว",
        "category":  "27 ปลาบิ๊กโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.55,
        "price":  0.9
    },
    {
        "id":  "pos_prod_199",
        "code":  "40127004",
        "name":  "ปลาบิ๊กโพ 3-4 นิ้ว",
        "category":  "27 ปลาบิ๊กโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.65,
        "price":  1.2
    },
    {
        "id":  "pos_prod_200",
        "code":  "40127005",
        "name":  "ปลาบิ๊กโพ 4-5 นิ้ว",
        "category":  "27 ปลาบิ๊กโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.75,
        "price":  1.5
    },
    {
        "id":  "pos_prod_201",
        "code":  "40128001",
        "name":  "ปลากาดำ 1-1.5 นิ้ว",
        "category":  "28 ปลากาดำ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.8,
        "price":  1.5
    },
    {
        "id":  "pos_prod_202",
        "code":  "40128002",
        "name":  "ปลากาดำ 1.5-2 นิ้ว",
        "category":  "28 ปลากาดำ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.5765,
        "price":  1
    },
    {
        "id":  "pos_prod_203",
        "code":  "40128003",
        "name":  "ปลากาดำ 2-2.5 นิ้ว",
        "category":  "28 ปลากาดำ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1,
        "price":  1.2
    },
    {
        "id":  "pos_prod_204",
        "code":  "40128004",
        "name":  "ปลากาดำ 2-3 นิ้ว",
        "category":  "28 ปลากาดำ",
        "quantity":  150,
        "unit":  "ตัว",
        "cost":  1.8,
        "price":  2
    },
    {
        "id":  "pos_prod_205",
        "code":  "40128005",
        "name":  "ปลากาดำ 3-4 นิ้ว",
        "category":  "28 ปลากาดำ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  3,
        "price":  5
    },
    {
        "id":  "pos_prod_206",
        "code":  "40129001",
        "name":  "ปลาเทพา 1-1.5 นิ้ว",
        "category":  "29 ปลาเทพา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  3,
        "price":  10
    },
    {
        "id":  "pos_prod_207",
        "code":  "40129002",
        "name":  "ปลาเทพา 1.5-2 นิ้ว",
        "category":  "29 ปลาเทพา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  5,
        "price":  15
    },
    {
        "id":  "pos_prod_208",
        "code":  "40129003",
        "name":  "ปลาเทพา 2.5-3  นิ้ว",
        "category":  "29 ปลาเทพา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  8,
        "price":  20
    },
    {
        "id":  "pos_prod_209",
        "code":  "40129004",
        "name":  "ปลาเทพา 3-3.5  นิ้ว",
        "category":  "29 ปลาเทพา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  15,
        "price":  25
    },
    {
        "id":  "pos_prod_210",
        "code":  "40129005",
        "name":  "ปลาเทพา 3.5-4  นิ้ว",
        "category":  "29 ปลาเทพา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  20,
        "price":  30
    },
    {
        "id":  "pos_prod_211",
        "code":  "40130001",
        "name":  "ปลาบิ๊กสวาย 1-1.5 นิ้ว",
        "category":  "30 บิ๊กสวาย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.35,
        "price":  0.85
    },
    {
        "id":  "pos_prod_212",
        "code":  "40130002",
        "name":  "ปลาบิ๊กสวาย 1.5-2 นิ้ว",
        "category":  "30 บิ๊กสวาย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.4,
        "price":  0.9
    },
    {
        "id":  "pos_prod_213",
        "code":  "40130003",
        "name":  "ปลาบิ๊กสวาย 2-3  นิ้ว",
        "category":  "30 บิ๊กสวาย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.6,
        "price":  1.2
    },
    {
        "id":  "pos_prod_214",
        "code":  "40130004",
        "name":  "ปลาบิ๊กสวาย 3-4  นิ้ว",
        "category":  "30 บิ๊กสวาย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.8,
        "price":  1.5
    },
    {
        "id":  "pos_prod_215",
        "code":  "40130005",
        "name":  "ปลาบิ๊กสวาย 4-5  นิ้ว",
        "category":  "30 บิ๊กสวาย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.9,
        "price":  2
    },
    {
        "id":  "pos_prod_216",
        "code":  "40131001",
        "name":  "ปลาหมอนา 1.5-2.5 เซน",
        "category":  "31 ปลาหมอนา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.35,
        "price":  0.5
    },
    {
        "id":  "pos_prod_217",
        "code":  "40131002",
        "name":  "ปลาหมอนา 1-1.5 นิ้ว",
        "category":  "31 ปลาหมอนา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.4,
        "price":  0.6
    },
    {
        "id":  "pos_prod_218",
        "code":  "40131003",
        "name":  "ปลาหมอนา 1.5-2 นิ้ว",
        "category":  "31 ปลาหมอนา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.6,
        "price":  1
    },
    {
        "id":  "pos_prod_219",
        "code":  "40131004",
        "name":  "ปลาหมอนา 2 นิ้ว",
        "category":  "31 ปลาหมอนา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.7,
        "price":  1.2
    },
    {
        "id":  "pos_prod_220",
        "code":  "40131005",
        "name":  "ปลาหมอนา 2-2.5 นิ้ว",
        "category":  "31 ปลาหมอนา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.8,
        "price":  1.5
    },
    {
        "id":  "pos_prod_221",
        "code":  "40131006",
        "name":  "ปลาหมอนา 2.5-3 นิ้ว",
        "category":  "31 ปลาหมอนา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.9,
        "price":  2
    },
    {
        "id":  "pos_prod_222",
        "code":  "40132001",
        "name":  "ปลากระพง 1-1.5 นิ้ว",
        "category":  "32 ปลากระพง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  5,
        "price":  8
    },
    {
        "id":  "pos_prod_223",
        "code":  "40132002",
        "name":  "ปลากระพง 1.5-2 นิ้ว",
        "category":  "32 ปลากระพง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  6,
        "price":  10
    },
    {
        "id":  "pos_prod_224",
        "code":  "40132003",
        "name":  "ปลากระพง 2-2.5 นิ้ว",
        "category":  "32 ปลากระพง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  6,
        "price":  13
    },
    {
        "id":  "pos_prod_225",
        "code":  "40132004",
        "name":  "ปลากระพง 2.5-3 นิ้ว",
        "category":  "32 ปลากระพง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  7.6923,
        "price":  18
    },
    {
        "id":  "pos_prod_226",
        "code":  "40132005",
        "name":  "ปลากระพง 3-3.5 นิ้ว",
        "category":  "32 ปลากระพง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  7.76,
        "price":  20
    },
    {
        "id":  "pos_prod_227",
        "code":  "40133001",
        "name":  "ปลาหมอตาล 1.5-2.5 เซน",
        "category":  "33 ปลาหมอตาล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.85,
        "price":  1
    },
    {
        "id":  "pos_prod_228",
        "code":  "40133002",
        "name":  "ปลาหมอตาล 1-1.5 นิ้ว",
        "category":  "33 ปลาหมอตาล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.9,
        "price":  1.5
    },
    {
        "id":  "pos_prod_229",
        "code":  "40133003",
        "name":  "ปลาหมอตาล 1.5-2 นิ้ว",
        "category":  "33 ปลาหมอตาล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1,
        "price":  2
    },
    {
        "id":  "pos_prod_230",
        "code":  "40133004",
        "name":  "ปลาหมอตาล2-2.5 นิ้ว",
        "category":  "33 ปลาหมอตาล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.5,
        "price":  2.5
    },
    {
        "id":  "pos_prod_231",
        "code":  "40133005",
        "name":  "ปลาหมอตาล 2.5-3 นิ้ว",
        "category":  "33 ปลาหมอตาล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2,
        "price":  3
    },
    {
        "id":  "pos_prod_232",
        "code":  "40134001",
        "name":  "ปลายี่สกไทย 1-1.5 นิ้ว",
        "category":  "34 ปลายี่สกไทย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  3,
        "price":  6
    },
    {
        "id":  "pos_prod_233",
        "code":  "40134002",
        "name":  "ปลายี่สกไทย 1.5-2 นิ้ว",
        "category":  "34 ปลายี่สกไทย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  4.5,
        "price":  8
    },
    {
        "id":  "pos_prod_234",
        "code":  "40134003",
        "name":  "ปลายี่สกไทย 2-2.5 นิ้ว",
        "category":  "34 ปลายี่สกไทย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  6.5625,
        "price":  15
    },
    {
        "id":  "pos_prod_235",
        "code":  "40134004",
        "name":  "ปลายี่สกไทย 2.5-3 นิ้ว",
        "category":  "34 ปลายี่สกไทย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  8,
        "price":  15
    },
    {
        "id":  "pos_prod_236",
        "code":  "40134005",
        "name":  "ปลายี่สกไทย 3-4 นิ้ว",
        "category":  "34 ปลายี่สกไทย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  9.3313,
        "price":  20
    },
    {
        "id":  "pos_prod_237",
        "code":  "40135001",
        "name":  "ปลาชะโอน 1-1.5 นิ้ว",
        "category":  "35 ปลาชะโอน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2.5,
        "price":  3
    },
    {
        "id":  "pos_prod_238",
        "code":  "40135002",
        "name":  "ปลาชะโอน 1.5-2 นิ้ว",
        "category":  "35 ปลาชะโอน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2.5,
        "price":  3.5
    },
    {
        "id":  "pos_prod_239",
        "code":  "40135003",
        "name":  "ปลาชะโอน 2-2.5 นิ้ว",
        "category":  "35 ปลาชะโอน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2,
        "price":  4.5
    },
    {
        "id":  "pos_prod_240",
        "code":  "40135004",
        "name":  "ปลาชะโอน 2.5-3 นิ้ว",
        "category":  "35 ปลาชะโอน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  4,
        "price":  4.5
    },
    {
        "id":  "pos_prod_241",
        "code":  "40136001",
        "name":  "ปลาแรดเผือก 1-1.5 นิ้ว",
        "category":  "36 ปลาแรดเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.5,
        "price":  8
    },
    {
        "id":  "pos_prod_242",
        "code":  "40136002",
        "name":  "ปลาแรดเผือก 1.5-2 นิ้ว",
        "category":  "36 ปลาแรดเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  5.5,
        "price":  20
    },
    {
        "id":  "pos_prod_243",
        "code":  "40136003",
        "name":  "ปลาแรดเผือก 2-2.5 นิ้ว",
        "category":  "36 ปลาแรดเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  7.5,
        "price":  15
    },
    {
        "id":  "pos_prod_244",
        "code":  "40136004",
        "name":  "ปลาแรดเผือก 2.5-3 นิ้ว",
        "category":  "36 ปลาแรดเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  23,
        "price":  30
    },
    {
        "id":  "pos_prod_245",
        "code":  "40137001",
        "name":  "ปลาแรดกระ  1.5-2 นิ้ว",
        "category":  "37 ปลาแรดกระ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  10,
        "price":  25
    },
    {
        "id":  "pos_prod_246",
        "code":  "40137002",
        "name":  "ปลาแรดกระ   2-3 นิ้ว",
        "category":  "37 ปลาแรดกระ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  15,
        "price":  30
    },
    {
        "id":  "pos_prod_247",
        "code":  "40138001",
        "name":  "ปลาเฉาฮื้อ 1-1.5 นิ้ว",
        "category":  "38 ปลาเฉาฮื้อ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.65,
        "price":  1
    },
    {
        "id":  "pos_prod_248",
        "code":  "40138002",
        "name":  "ปลาเฉาฮื้อ 1.5-2 นิ้ว",
        "category":  "38 ปลาเฉาฮื้อ",
        "quantity":  9750,
        "unit":  "ตัว",
        "cost":  0.8,
        "price":  1.5
    },
    {
        "id":  "pos_prod_249",
        "code":  "PD66000001",
        "name":  "ค่าดำเนินการ",
        "category":  "ค่าดำเนินการ",
        "quantity":  8,
        "unit":  "ชิ้น",
        "cost":  2000,
        "price":  0
    },
    {
        "id":  "pos_prod_250",
        "code":  "20101041",
        "name":  "กระชังตาปู 3*6*1.5",
        "category":  "กระชังปลา",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  840,
        "price":  1050
    },
    {
        "id":  "pos_prod_251",
        "code":  "20101042",
        "name":  "กระชังตาปู 5*5*1.5",
        "category":  "กระชังปลา",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  950,
        "price":  1250
    },
    {
        "id":  "pos_prod_252",
        "code":  "20101043",
        "name":  "กระสอบ",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  0,
        "price":  3
    },
    {
        "id":  "pos_prod_253",
        "code":  "20101044",
        "name":  "ปูนขาว ตรา หอย 4 ตัว 10kg",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  66,
        "unit":  "ถุง",
        "cost":  20,
        "price":  35
    },
    {
        "id":  "pos_prod_254",
        "code":  "20101045",
        "name":  "ปูนขาว ตรา คนขี่กุ้ง 10kg",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "กิโล",
        "cost":  24,
        "price":  34
    },
    {
        "id":  "pos_prod_255",
        "code":  "20101046",
        "name":  "แสลน  ยาว 3 เมตร",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  80,
        "price":  120
    },
    {
        "id":  "pos_prod_256",
        "code":  "20101048",
        "name":  "ฮิวมัส  20 ลิตร",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "แกลอน",
        "cost":  1883.2,
        "price":  2200
    },
    {
        "id":  "pos_prod_257",
        "code":  "20101050",
        "name":  "จุลินทรีย์ ไมโคร สตาร์",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  150,
        "price":  180
    },
    {
        "id":  "pos_prod_258",
        "code":  "20101051",
        "name":  "จุลินทรีย์ ไทเกอร์ มิกเซอร์",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  120,
        "price":  150
    },
    {
        "id":  "pos_prod_259",
        "code":  "20101052",
        "name":  "กระชังตาปู 2*4*1.5",
        "category":  "กระชังปลา",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  540,
        "price":  690
    },
    {
        "id":  "pos_prod_260",
        "code":  "20101053",
        "name":  "กระชังมุ้ง 2*2*1.5",
        "category":  "กระชังปลา",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  187.25,
        "price":  290
    },
    {
        "id":  "pos_prod_261",
        "code":  "20101054",
        "name":  "กระชังมุ้ง 2*4*1.5",
        "category":  "กระชังปลา",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  270,
        "price":  390
    },
    {
        "id":  "pos_prod_262",
        "code":  "20101055",
        "name":  "กระชังมุ้ง 3*6*1.5",
        "category":  "กระชังปลา",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  440,
        "price":  650
    },
    {
        "id":  "pos_prod_263",
        "code":  "20101056",
        "name":  "ยาอ๊อกซี่  500 กรัม",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  1,
        "unit":  "ชิ้น",
        "cost":  450,
        "price":  550
    },
    {
        "id":  "pos_prod_264",
        "code":  "20101057",
        "name":  "ชุดวัดน้ำ PH",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  179,
        "price":  250
    },
    {
        "id":  "pos_prod_265",
        "code":  "20101058",
        "name":  "จุลินทรีย์ แม็กซ์ 99  1 kg",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  120,
        "price":  200
    },
    {
        "id":  "pos_prod_266",
        "code":  "20101059",
        "name":  "ไลน์-ซี วิตามินซี  1kg",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "กิโล",
        "cost":  120,
        "price":  180
    },
    {
        "id":  "pos_prod_267",
        "code":  "20101060",
        "name":  "วิตามิน 100  1kg",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "กิโล",
        "cost":  100,
        "price":  150
    },
    {
        "id":  "pos_prod_268",
        "code":  "20201037",
        "name":  "วิน 51 อาหารกบ เล็ก 20 kg",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  720,
        "price":  750
    },
    {
        "id":  "pos_prod_269",
        "code":  "20201038",
        "name":  "วิน 51 อาหารกบ เล็ก 2 kg",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  72,
        "price":  80
    },
    {
        "id":  "pos_prod_270",
        "code":  "40143011",
        "name":  "ปลาใหญ่รวม",
        "category":  "ปลากิโล",
        "quantity":  0,
        "unit":  "กิโล",
        "cost":  25,
        "price":  40
    },
    {
        "id":  "pos_prod_271",
        "code":  "20101061",
        "name":  "เกลือเม็ด",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  22,
        "unit":  "ชิ้น",
        "cost":  85,
        "price":  120
    },
    {
        "id":  "pos_prod_272",
        "code":  "40143017",
        "name":  "ปลาดุกบิ๊กอุย กิโล",
        "category":  "ปลากิโล",
        "quantity":  0,
        "unit":  "กิโล",
        "cost":  30,
        "price":  40
    },
    {
        "id":  "pos_prod_273",
        "code":  "40143018",
        "name":  "ปลานิล กิโล",
        "category":  "ปลากิโล",
        "quantity":  0,
        "unit":  "กิโล",
        "cost":  17,
        "price":  40
    },
    {
        "id":  "pos_prod_274",
        "code":  "40143019",
        "name":  "ปลายี่สก กิโล",
        "category":  "ปลากิโล",
        "quantity":  0,
        "unit":  "กิโล",
        "cost":  25,
        "price":  40
    },
    {
        "id":  "pos_prod_275",
        "code":  "40143020",
        "name":  "ปลาตะเพียน กิโล",
        "category":  "ปลากิโล",
        "quantity":  0,
        "unit":  "กิโล",
        "cost":  25,
        "price":  40
    },
    {
        "id":  "pos_prod_276",
        "code":  "40144019",
        "name":  "ปลายี่สก กิโล",
        "category":  "ปลากิโล",
        "quantity":  0,
        "unit":  "กิโล",
        "cost":  25,
        "price":  40
    },
    {
        "id":  "pos_prod_277",
        "code":  "20101062",
        "name":  "อัลจี้ เคลียร์ สารปรับสภาพน้ำ 1 kg",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  150,
        "price":  250
    },
    {
        "id":  "pos_prod_278",
        "code":  "20101063",
        "name":  "ฮิวมัส ตราทีพีไอ  1 ลิตร (ขวด)",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "ขวด",
        "cost":  103.79,
        "price":  120
    },
    {
        "id":  "pos_prod_279",
        "code":  "20101064",
        "name":  "ทีพีไอ ซินไบโอติกส์ 20 ลิตร",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "แกลอน",
        "cost":  1800,
        "price":  2200
    },
    {
        "id":  "pos_prod_280",
        "code":  "20101065",
        "name":  "วิน  อาหารปลาดุกเล็ก  13",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  475.08,
        "price":  475
    },
    {
        "id":  "pos_prod_281",
        "code":  "20101066",
        "name":  "วิน  อาหารปลาดุกเล็ก  13  (2 กิโล)",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  44,
        "price":  58
    },
    {
        "id":  "pos_prod_282",
        "code":  "PD67000002",
        "name":  "ฟอร์มารีน 20 ลิตร",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  23,
        "unit":  "แกลอน",
        "cost":  450,
        "price":  650
    },
    {
        "id":  "pos_prod_283",
        "code":  "20101068",
        "name":  "รำละเอียด  1 กก.",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  400,
        "unit":  "ถุง",
        "cost":  9.5,
        "price":  13
    },
    {
        "id":  "pos_prod_284",
        "code":  "20101069",
        "name":  "ลี อาหารปลาดุกจิ๋ว   011",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  650,
        "price":  700
    },
    {
        "id":  "pos_prod_285",
        "code":  "20101070",
        "name":  "ลี อาหารปลาดุกจิ๋ว   011",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  65,
        "price":  80
    },
    {
        "id":  "pos_prod_286",
        "code":  "20101071",
        "name":  "ปูนร้อน โดโลไมท์",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  100,
        "price":  150
    },
    {
        "id":  "pos_prod_287",
        "code":  "20101072",
        "name":  "กระชังใหญ่",
        "category":  "กระชังปลา",
        "quantity":  0,
        "unit":  "ใบ",
        "cost":  1800,
        "price":  2200
    },
    {
        "id":  "pos_prod_288",
        "code":  "PD68000003",
        "name":  "ตาข่ายกันนก 7*200ม.",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  1280,
        "price":  1380
    },
    {
        "id":  "pos_prod_289",
        "code":  "PD68000005",
        "name":  "กระชังแม่น้ำ ตา2.5เซน 2*4*2 มีผ้าล้อมอาหาร",
        "category":  "กระชังปลา",
        "quantity":  0,
        "unit":  "ใบ",
        "cost":  1700,
        "price":  2200
    },
    {
        "id":  "pos_prod_290",
        "code":  "PD68000008",
        "name":  "จุลินทรีย์ ไบโอนิค ซูปเปอร์ เอสเอ็กซ์",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  1,
        "unit":  "กระป๋อง",
        "cost":  275,
        "price":  350
    },
    {
        "id":  "pos_prod_291",
        "code":  "PD68000009",
        "name":  "อาหารปลากระพง 903   2กก.",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  10,
        "unit":  "ถุง",
        "cost":  110,
        "price":  150
    },
    {
        "id":  "pos_prod_292",
        "code":  "PD68000010",
        "name":  "4641 อาหารปลาดุก เบอร์ 1 (25%)",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  468,
        "price":  500
    },
    {
        "id":  "pos_prod_293",
        "code":  "PD68000011",
        "name":  "4642 อาหารปลาดุก เบอร์ 2 (25%)",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  450,
        "price":  490
    },
    {
        "id":  "pos_prod_294",
        "code":  "PD68000012",
        "name":  "4643 อาหารปลาดุก เบอร์ 3 (25%)",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  434,
        "price":  475
    },
    {
        "id":  "pos_prod_295",
        "code":  "PD68000013",
        "name":  "461 อาหารปลาดุก เบอร์ 1 (32%)",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  480,
        "price":  520
    },
    {
        "id":  "pos_prod_296",
        "code":  "PD68000014",
        "name":  "462 อาหารปลาดุก เบอร์ 2 (30%)",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  460,
        "price":  500
    },
    {
        "id":  "pos_prod_297",
        "code":  "PD68000015",
        "name":  "4301 อาหารกบ เบอร์ 1 (37%)",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  630,
        "price":  670
    },
    {
        "id":  "pos_prod_298",
        "code":  "PD68000016",
        "name":  "441 อาหารปลากินพืช เบอร์ 1 (18%)",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  410,
        "price":  445
    },
    {
        "id":  "pos_prod_299",
        "code":  "PD68000017",
        "name":  "442G อาหารปลาฟิชเมท (16%)",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  362,
        "price":  400
    },
    {
        "id":  "pos_prod_300",
        "code":  "PD68000018",
        "name":  "443R ฟิชเมท (16%)",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  322,
        "price":  355
    },
    {
        "id":  "pos_prod_301",
        "code":  "PD68000019",
        "name":  "461 อาหารปลาดุก เบอร์ 1 (32%) 2กก.",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  48,
        "price":  65
    },
    {
        "id":  "pos_prod_302",
        "code":  "PD68000020",
        "name":  "4641 อาหารปลาดุก เบอร์ 1 (25%) 2 กก.",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  46.8,
        "price":  60
    },
    {
        "id":  "pos_prod_303",
        "code":  "PD68000022",
        "name":  "4301 อาหารกบ เบอร์1 (2 กก)",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  65,
        "price":  72
    },
    {
        "id":  "pos_prod_304",
        "code":  "40108006",
        "name":  "ปลาจีนแบน 4-5 นิ้ว",
        "category":  "8 ปลาจีนแบน",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  0.7,
        "price":  1.5
    },
    {
        "id":  "pos_prod_305",
        "code":  "20101073",
        "name":  "กระชังตาปู 2*3*1.5",
        "category":  "กระชังปลา",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  440,
        "price":  590
    },
    {
        "id":  "pos_prod_306",
        "code":  "40146003",
        "name":  "ปลาบ้า 2-3 นิ้ว",
        "category":  "46 ปลาบ้าหางแดง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.152,
        "price":  3.5
    },
    {
        "id":  "pos_prod_307",
        "code":  "PD68000024",
        "name":  "กระชังตาปู 2*6*1.50",
        "category":  "กระชังปลา",
        "quantity":  1,
        "unit":  "ชิ้น",
        "cost":  650,
        "price":  800
    },
    {
        "id":  "pos_prod_308",
        "code":  "PD68000026",
        "name":  "สวก(เล็ก)",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  14,
        "unit":  "ชิ้น",
        "cost":  50,
        "price":  70
    },
    {
        "id":  "pos_prod_309",
        "code":  "PD68000028",
        "name":  "กระชังตาปู 2*6*2",
        "category":  "กระชังปลา",
        "quantity":  1,
        "unit":  "ชิ้น",
        "cost":  940,
        "price":  1150
    },
    {
        "id":  "pos_prod_310",
        "code":  "PD68000030",
        "name":  "กระชังตาปู 2*5*1.5",
        "category":  "กระชังปลา",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  680,
        "price":  750
    },
    {
        "id":  "pos_prod_311",
        "code":  "PD68000031",
        "name":  "จุรินทรีย์บาซิลลัส MT",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  1,
        "unit":  "ชิ้น",
        "cost":  250,
        "price":  300
    },
    {
        "id":  "pos_prod_312",
        "code":  "PD68000032",
        "name":  "CP 9777 อาหารปลากระพง  20กก.",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  930,
        "price":  1100
    },
    {
        "id":  "pos_prod_313",
        "code":  "PD68000033",
        "name":  "CP 9778 อาหารปลากระพง  20กก.",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  920,
        "price":  1080
    },
    {
        "id":  "pos_prod_314",
        "code":  "40101003",
        "name":  "ปลาตะเพียน 1.5-1.8 นิ้ว (ล.ส)",
        "category":  "1 ปลาตะเพียน",
        "quantity":  -100,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0.4
    },
    {
        "id":  "pos_prod_315",
        "code":  "40101010",
        "name":  "ปลาตะเพียน 4.5-5 นิ้ว",
        "category":  "1 ปลาตะเพียน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  3
    },
    {
        "id":  "pos_prod_316",
        "code":  "40101011",
        "name":  "ปลาตะเพียน ใหญ่พิเศษ",
        "category":  "1 ปลาตะเพียน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  4
    },
    {
        "id":  "pos_prod_317",
        "code":  "40102006",
        "name":  "ปลายี่สก 4-5 นิ้ว",
        "category":  "2 ปลายี่สก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.4,
        "price":  1.5
    },
    {
        "id":  "pos_prod_318",
        "code":  "40102007",
        "name":  "ปลายี่สก 3.5-4 นิ้ว",
        "category":  "2 ปลายี่สก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.4,
        "price":  1.2
    },
    {
        "id":  "pos_prod_319",
        "code":  "40103006",
        "name":  "ปลานิล 2.5-3 นิ้ว (ญ.ส)",
        "category":  "3 ปลานิล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.7,
        "price":  1.5
    },
    {
        "id":  "pos_prod_320",
        "code":  "40103007",
        "name":  "ปลานิล 2-2.5 นิ้ว (กส.)",
        "category":  "3 ปลานิล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.35,
        "price":  0.8
    },
    {
        "id":  "pos_prod_321",
        "code":  "40103008",
        "name":  "ปลานิล ใหญ่พิเศษ",
        "category":  "3 ปลานิล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_322",
        "code":  "40104006",
        "name":  "ปลาดุกบิ๊กอุย 5-6 นิ้ว",
        "category":  "4 ปลาดุกบิ๊กอุย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.9,
        "price":  2
    },
    {
        "id":  "pos_prod_323",
        "code":  "40104007",
        "name":  "ปลาดุกบิ๊กอุย ใหญ่พิเศษ",
        "category":  "4 ปลาดุกบิ๊กอุย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_324",
        "code":  "40105007",
        "name":  "ปลาสวาย ใหญ่พิเศษ",
        "category":  "5 ปลาสวาย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.5,
        "price":  2.5
    },
    {
        "id":  "pos_prod_325",
        "code":  "40106006",
        "name":  "ปลาหมอแปลงเพศ 3-3.5 นิ้ว",
        "category":  "6 ปลาหมอแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2,
        "price":  3.5
    },
    {
        "id":  "pos_prod_326",
        "code":  "40106007",
        "name":  "ปลาหมอแปลงเพศ ใหญ่พิเศษ",
        "category":  "6 ปลาหมอแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_327",
        "code":  "40107005",
        "name":  "ปลาจีนหัวโต 3-3.5 นิ้ว",
        "category":  "7 ปลาจีนหัวโต",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_328",
        "code":  "40107006",
        "name":  "ปลาจีนหัวโต 3.5-4 นิ้ว",
        "category":  "7 ปลาจีนหัวโต",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_329",
        "code":  "40107007",
        "name":  "ปลาจีนหัวโต ใหญ่พิเศษ",
        "category":  "7 ปลาจีนหัวโต",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_330",
        "code":  "40108007",
        "name":  "ปลาจีนแบน ใหญ่พิเศษ",
        "category":  "8 ปลาจีนแบน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1,
        "price":  5
    },
    {
        "id":  "pos_prod_331",
        "code":  "40109006",
        "name":  "ปลานวลจันทร์ 3.5-4 นิ้ว",
        "category":  "9 ปลานวลจันทร์",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_332",
        "code":  "40109007",
        "name":  "ปลานวลจันทร์ ใหญ่พิเศษ",
        "category":  "9 ปลานวลจันทร์",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_333",
        "code":  "40110006",
        "name":  "ปลาดุกรัสเซีย 5-6 นิ้ว",
        "category":  "10 ปลาดุกรัสเซีย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_334",
        "code":  "40110007",
        "name":  "ปลาดุกรัสเซีย ใหญ่พิเศษ",
        "category":  "10 ปลาดุกรัสเซีย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_335",
        "code":  "40111006",
        "name":  "ปลาจาระเม็ด 3-3.5 นิ้ว",
        "category":  "11 ปลาจาระเม็ด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_336",
        "code":  "40111007",
        "name":  "ปลาจาระเม็ด ใหญ่พิเศษ",
        "category":  "11 ปลาจาระเม็ด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_337",
        "code":  "40112006",
        "name":  "ปลาสลิด 3-3.5 นิ้ว",
        "category":  "12 ปลาสลิด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_338",
        "code":  "40112007",
        "name":  "ปลาสลิด ใหญ่พิเศษ",
        "category":  "12 ปลาสลิด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  5,
        "price":  0
    },
    {
        "id":  "pos_prod_339",
        "code":  "40113006",
        "name":  "ปลาทับทิม 3.5-4 นิ้ว",
        "category":  "13 ปลาทับทิม",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_340",
        "code":  "40113007",
        "name":  "ปลาทับทิม ใหญ่พิเศษ",
        "category":  "13 ปลาทับทิม",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_341",
        "code":  "40114006",
        "name":  "ปลาใน 3-3.5 นิ้ว",
        "category":  "14 ปลาใน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_342",
        "code":  "40114007",
        "name":  "ปลาใน ใหญ่พิเศษ",
        "category":  "14 ปลาใน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_343",
        "code":  "40115006",
        "name":  "ปลากระโห้อินเดีย 3.5-4 นิ้ว",
        "category":  "15 ปลากระโห้อินเดีย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_344",
        "code":  "40115007",
        "name":  "ปลากระโห้อินเดีย ใหญ่พิเศษ",
        "category":  "15 ปลากระโห้อินเดีย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_345",
        "code":  "40116006",
        "name":  "ปลากระโห้ไทย 3.5-4 นิ้ว",
        "category":  "16 ปลากระโห้ไทย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_346",
        "code":  "40116007",
        "name":  "ปลากระโห้ไทย ใหญ่พิเศษ",
        "category":  "16 ปลากระโห้ไทย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_347",
        "code":  "40117006",
        "name":  "ปลากดเหลือง 3.5-4 นิ้ว",
        "category":  "17 ปลากดเหลือง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2,
        "price":  2.5
    },
    {
        "id":  "pos_prod_348",
        "code":  "40117007",
        "name":  "ปลากดเหลือง ใหญ่พิเศษ",
        "category":  "17 ปลากดเหลือง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_349",
        "code":  "40118006",
        "name":  "ปลากดคัง 3.5-4 นิ้ว",
        "category":  "18 ปลากดคัง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  3,
        "price":  5
    },
    {
        "id":  "pos_prod_350",
        "code":  "40118007",
        "name":  "ปลากดคัง ใหญ่พิเศษ",
        "category":  "18 ปลากดคัง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  4.5,
        "price":  5.5
    },
    {
        "id":  "pos_prod_351",
        "code":  "40119007",
        "name":  "ปลาบึก 5-5.5 นิ้ว",
        "category":  "19 ปลาบึก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  18,
        "price":  35
    },
    {
        "id":  "pos_prod_352",
        "code":  "40119008",
        "name":  "ปลาบึก 5.5-6  นิ้ว",
        "category":  "19 ปลาบึก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  17,
        "price":  40
    },
    {
        "id":  "pos_prod_353",
        "code":  "40119009",
        "name":  "ปลาบึก ใหญ่พิเศษ",
        "category":  "19 ปลาบึก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  25,
        "price":  45
    },
    {
        "id":  "pos_prod_354",
        "code":  "40120006",
        "name":  "ปลาเทโพ 3.5-4 นิ้ว",
        "category":  "20 ปลาเทโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_355",
        "code":  "40120007",
        "name":  "ปลาเทโพ 4-4.5 นิ้ว",
        "category":  "20 ปลาเทโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  15,
        "price":  18
    },
    {
        "id":  "pos_prod_356",
        "code":  "40120008",
        "name":  "ปลาเทโพ 4.5-5 นิ้ว",
        "category":  "20 ปลาเทโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_357",
        "code":  "40120009",
        "name":  "ปลาเทโพ ใหญ่พิเศษ",
        "category":  "20 ปลาเทโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  30,
        "price":  35
    },
    {
        "id":  "pos_prod_358",
        "code":  "40121006",
        "name":  "ปลาแรด ใหญ่พิเศษ",
        "category":  "21 ปลาแรด",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_359",
        "code":  "40122006",
        "name":  "ปลากราย 3.5-4  นิ้ว",
        "category":  "22 ปลากราย",
        "quantity":  4947,
        "unit":  "ตัว",
        "cost":  4.3,
        "price":  6
    },
    {
        "id":  "pos_prod_360",
        "code":  "40122007",
        "name":  "ปลากราย ใหญ่พิเศษ",
        "category":  "22 ปลากราย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_361",
        "code":  "40123008",
        "name":  "ปลานิลแปลงเพศ 2-3 นิ้ว (ญ.ส.)",
        "category":  "23 ปลานิลแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2,
        "price":  3
    },
    {
        "id":  "pos_prod_362",
        "code":  "40123009",
        "name":  "ปลานิลแปลงเพศ 3-4 (จ.บ.)",
        "category":  "23 ปลานิลแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  3,
        "price":  4
    },
    {
        "id":  "pos_prod_363",
        "code":  "40123010",
        "name":  "ปลานิลแปลงเพศ 4-5 นิ้ว",
        "category":  "23 ปลานิลแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  4,
        "price":  5
    },
    {
        "id":  "pos_prod_364",
        "code":  "40124007",
        "name":  "ปลาทับทิมหมัน 4-4.5 นิ้ว",
        "category":  "24 ปลาทับทิมหมัน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  4.3,
        "price":  5.8
    },
    {
        "id":  "pos_prod_365",
        "code":  "40124008",
        "name":  "ปลาทับทิมหมัน 4.5-5 นิ้ว",
        "category":  "24 ปลาทับทิมหมัน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  3.8713,
        "price":  6
    },
    {
        "id":  "pos_prod_366",
        "code":  "40124009",
        "name":  "ปลาทับทิมหมัน 4.5-5 นิ้ว",
        "category":  "24 ปลาทับทิมหมัน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  4.5,
        "price":  6.5
    },
    {
        "id":  "pos_prod_367",
        "code":  "40124010",
        "name":  "ปลาทับทิมหมัน ใหญ่พิเศษ",
        "category":  "24 ปลาทับทิมหมัน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  5,
        "price":  8
    },
    {
        "id":  "pos_prod_368",
        "code":  "40125006",
        "name":  "ปลาช่อน 4-4.5 นิ้ว",
        "category":  "25 ปลาช่อน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  2.5,
        "price":  3.5
    },
    {
        "id":  "pos_prod_369",
        "code":  "40125007",
        "name":  "ปลาช่อน 4.5-5 นิ้ว",
        "category":  "25 ปลาช่อน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  3,
        "price":  4
    },
    {
        "id":  "pos_prod_370",
        "code":  "40125008",
        "name":  "ปลาช่อน ใหญ่พิเศษ",
        "category":  "25 ปลาช่อน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_371",
        "code":  "40126005",
        "name":  "ปลาบู่ ใหญ่พิเศษ",
        "category":  "26 ปลาบู่",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  15
    },
    {
        "id":  "pos_prod_372",
        "code":  "40127006",
        "name":  "ปลาบิ๊กโพ ใหญ่พิเศษ",
        "category":  "27 ปลาบิ๊กโพ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_373",
        "code":  "40128006",
        "name":  "ปลากาดำ ใหญ่พิเศษ",
        "category":  "28 ปลากาดำ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_374",
        "code":  "40129006",
        "name":  "ปลาเทพา 4-4.5  นิ้ว",
        "category":  "29 ปลาเทพา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_375",
        "code":  "40129007",
        "name":  "ปลาเทพา ใหญ่พิเศษ",
        "category":  "29 ปลาเทพา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_376",
        "code":  "40130006",
        "name":  "ปลาบิ๊กสวาย ใหญ่พิเศษ",
        "category":  "30 บิ๊กสวาย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_377",
        "code":  "40131007",
        "name":  "ปลาหมอนา ใหญ่พิเศษ",
        "category":  "31 ปลาหมอนา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1,
        "price":  2.5
    },
    {
        "id":  "pos_prod_378",
        "code":  "40132006",
        "name":  "ปลากระพง 3.5-4 นิ้ว",
        "category":  "32 ปลากระพง",
        "quantity":  450,
        "unit":  "ตัว",
        "cost":  7.5949,
        "price":  15
    },
    {
        "id":  "pos_prod_379",
        "code":  "40132007",
        "name":  "ปลากระพง 4-4.5 นิ้ว",
        "category":  "32 ปลากระพง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  8,
        "price":  25
    },
    {
        "id":  "pos_prod_380",
        "code":  "40132008",
        "name":  "ปลากระพง 5-6 นิ้ว",
        "category":  "32 ปลากระพง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  10,
        "price":  20
    },
    {
        "id":  "pos_prod_381",
        "code":  "40132009",
        "name":  "ปลากระพง ใหญ่พิเศษ",
        "category":  "32 ปลากระพง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_382",
        "code":  "40133006",
        "name":  "ปลาหมอตาล 3-3.5 นิ้ว",
        "category":  "33 ปลาหมอตาล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_383",
        "code":  "40133007",
        "name":  "ปลาหมอตาล ใหญ่พิเศษ",
        "category":  "33 ปลาหมอตาล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_384",
        "code":  "40134006",
        "name":  "ปลายี่สกไทย 4-5 นิ้ว",
        "category":  "34 ปลายี่สกไทย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_385",
        "code":  "40134007",
        "name":  "ปลายี่สกไทย ใหญ่พิเศษ",
        "category":  "34 ปลายี่สกไทย",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_386",
        "code":  "40135005",
        "name":  "ปลาชะโอน 3-3.5 นิ้ว",
        "category":  "35 ปลาชะโอน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  4.5,
        "price":  5
    },
    {
        "id":  "pos_prod_387",
        "code":  "40135006",
        "name":  "ปลาชะโอน 3.5-4 นิ้ว",
        "category":  "35 ปลาชะโอน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  5,
        "price":  6
    },
    {
        "id":  "pos_prod_388",
        "code":  "40135007",
        "name":  "ปลาชะโอน ใหญ่พิเศษ",
        "category":  "35 ปลาชะโอน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_389",
        "code":  "40136005",
        "name":  "ปลาแรดเผือก 3-3.5 นิ้ว",
        "category":  "36 ปลาแรดเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_390",
        "code":  "40136006",
        "name":  "ปลาแรดเผือก ใหญ่พิเศษ",
        "category":  "36 ปลาแรดเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_391",
        "code":  "40137003",
        "name":  "ปลาแรดกระ   3-4 นิ้ว",
        "category":  "37 ปลาแรดกระ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_392",
        "code":  "40137004",
        "name":  "ปลาแรดกระ   4-5 นิ้ว",
        "category":  "37 ปลาแรดกระ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_393",
        "code":  "40137005",
        "name":  "ปลาแรดกระ  ใหญ่พิเศษ",
        "category":  "37 ปลาแรดกระ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_394",
        "code":  "40138003",
        "name":  "ปลาเฉาฮื้อ 2-2.5 นิ้ว",
        "category":  "38 ปลาเฉาฮื้อ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1,
        "price":  2
    },
    {
        "id":  "pos_prod_395",
        "code":  "40138004",
        "name":  "ปลาเฉาฮื้อ 2.5-3 นิ้ว",
        "category":  "38 ปลาเฉาฮื้อ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_396",
        "code":  "40138005",
        "name":  "ปลาเฉาฮื้อ 3-3.5 นิ้ว",
        "category":  "38 ปลาเฉาฮื้อ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_397",
        "code":  "40138006",
        "name":  "ปลาเฉาฮื้อ 3.5-4 นิ้ว",
        "category":  "38 ปลาเฉาฮื้อ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_398",
        "code":  "40138007",
        "name":  "ปลาเฉาฮื้อ ใหญ่พิเศษ",
        "category":  "38 ปลาเฉาฮื้อ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_399",
        "code":  "40139001",
        "name":  "ปลาสลิดแปลงเพศ 1-2 เซน",
        "category":  "39 ปลาสลิดแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_400",
        "code":  "40139002",
        "name":  "ปลาสลิดแปลงเพศ 1-1.5 นิ้ว",
        "category":  "39 ปลาสลิดแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.55,
        "price":  0.8
    },
    {
        "id":  "pos_prod_401",
        "code":  "40139003",
        "name":  "ปลาสลิดแปลงเพศ 1.5-2 นิ้ว",
        "category":  "39 ปลาสลิดแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.65,
        "price":  1
    },
    {
        "id":  "pos_prod_402",
        "code":  "40139004",
        "name":  "ปลาสลิดแปลงเพศ 2-2.5 นิ้ว",
        "category":  "39 ปลาสลิดแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_403",
        "code":  "40139005",
        "name":  "ปลาสลิดแปลงเพศ 2.5-3 นิ้ว",
        "category":  "39 ปลาสลิดแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_404",
        "code":  "40139006",
        "name":  "ปลาสลิดแปลงเพศ 3-3.5 นิ้ว",
        "category":  "39 ปลาสลิดแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_405",
        "code":  "40139007",
        "name":  "ปลาสลิดแปลงเพศ 3.5-4 นิ้ว",
        "category":  "39 ปลาสลิดแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_406",
        "code":  "40139008",
        "name":  "ปลาสลิดแปลงเพศ 3-3.5 นิ้ว",
        "category":  "39 ปลาสลิดแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_407",
        "code":  "40139009",
        "name":  "ปลาสลิดแปลงเพศ ใหญ่พิเศษ",
        "category":  "39 ปลาสลิดแปลงเพศ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_408",
        "code":  "40140001",
        "name":  "ปลาตะเพียนทอง 1-1.5 นิ้ว",
        "category":  "40 ปลาตะเพียนทอง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_409",
        "code":  "40140002",
        "name":  "ปลาตะเพียนทอง 2-2.5 นิ้ว",
        "category":  "40 ปลาตะเพียนทอง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.8,
        "price":  2
    },
    {
        "id":  "pos_prod_410",
        "code":  "40140003",
        "name":  "ปลาตะเพียนทอง2.5-3 นิ้ว",
        "category":  "40 ปลาตะเพียนทอง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_411",
        "code":  "40140004",
        "name":  "ปลาตะเพียนทอง 3-3.5 นิ้ว",
        "category":  "40 ปลาตะเพียนทอง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_412",
        "code":  "40140005",
        "name":  "ปลาตะเพียนทอง 3.5-4 นิ้ว",
        "category":  "40 ปลาตะเพียนทอง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_413",
        "code":  "40140006",
        "name":  "ปลาตะเพียนทอง ใหญ่พิเศษ",
        "category":  "40 ปลาตะเพียนทอง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.5,
        "price":  4
    },
    {
        "id":  "pos_prod_414",
        "code":  "40141001",
        "name":  "ปลาสร้อยขาว  1.5-2 นิ้ว",
        "category":  "41 ปลาสร้อยขาว",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_415",
        "code":  "40141002",
        "name":  "ปลาสร้อยขาว  2-3 นิ้ว",
        "category":  "41 ปลาสร้อยขาว",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_416",
        "code":  "40141003",
        "name":  "ปลาสร้อยขาว  3-4 นิ้ว",
        "category":  "41 ปลาสร้อยขาว",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_417",
        "code":  "40141004",
        "name":  "ปลาสร้อยขาว  4-5 นิ้ว",
        "category":  "41 ปลาสร้อยขาว",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_418",
        "code":  "40141005",
        "name":  "ปลาสร้อยขาว  4-5 นิ้ว",
        "category":  "41 ปลาสร้อยขาว",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_419",
        "code":  "40141006",
        "name":  "ปลาสร้อยขาว  ใหญ่พิเศษ",
        "category":  "41 ปลาสร้อยขาว",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_420",
        "code":  "40142001",
        "name":  "ปลาสวายเผือก 1-1.5 นิ้ว",
        "category":  "42 ปลาสวายเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_421",
        "code":  "40142002",
        "name":  "ปลาสวายเผือก 1.5-2 นิ้ว",
        "category":  "42 ปลาสวายเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_422",
        "code":  "40142003",
        "name":  "ปลาสวายเผือก 2-2.5 นิ้ว",
        "category":  "42 ปลาสวายเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_423",
        "code":  "40142004",
        "name":  "ปลาสวายเผือก 2.5-3 นิ้ว",
        "category":  "42 ปลาสวายเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  4,
        "price":  10
    },
    {
        "id":  "pos_prod_424",
        "code":  "40142005",
        "name":  "ปลาสวายเผือก 3-3.5 นิ้ว",
        "category":  "42 ปลาสวายเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_425",
        "code":  "40142006",
        "name":  "ปลาสวายเผือก  3.5-4 นิ้ว",
        "category":  "42 ปลาสวายเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  7.8585,
        "price":  15
    },
    {
        "id":  "pos_prod_426",
        "code":  "40142007",
        "name":  "ปลาสวายเผือก ใหญ่พิเศษ",
        "category":  "42 ปลาสวายเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_427",
        "code":  "40143001",
        "name":  "ปลาดุกอุยนา  1.5-2 นิ้ว",
        "category":  "43 ปลาดุกอุยนา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.9,
        "price":  1.8
    },
    {
        "id":  "pos_prod_428",
        "code":  "40143002",
        "name":  "ปลาดุกอุยนา  2-3 นิ้ว",
        "category":  "43 ปลาดุกอุยนา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.8,
        "price":  2.5
    },
    {
        "id":  "pos_prod_429",
        "code":  "40143003",
        "name":  "ปลาดุกอุยนา  3-4 นิ้ว",
        "category":  "43 ปลาดุกอุยนา",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  0
    },
    {
        "id":  "pos_prod_430",
        "code":  "40144001",
        "name":  "ปลาหมอตาลเผือก  1.5-2 นิ้ว",
        "category":  "44 ปลาหมอตาลเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  5,
        "price":  10
    },
    {
        "id":  "pos_prod_431",
        "code":  "40144002",
        "name":  "ปลาหมอตาลเผือก  2-3 นิ้ว",
        "category":  "44 ปลาหมอตาลเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  8,
        "price":  15
    },
    {
        "id":  "pos_prod_432",
        "code":  "40144003",
        "name":  "ปลาหมอตาลเผือก 3-4 นิ้ว",
        "category":  "44 ปลาหมอตาลเผือก",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  10,
        "price":  20
    },
    {
        "id":  "pos_prod_433",
        "code":  "40145001",
        "name":  "ลูกกุ้งก้ามกราม เล็ก",
        "category":  "45 ลูกกุ้งก้ามกราม",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.15,
        "price":  0.25
    },
    {
        "id":  "pos_prod_434",
        "code":  "40145002",
        "name":  "ลูกกุ้งก้ามกราม ชำ",
        "category":  "45 ลูกกุ้งก้ามกราม",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  5,
        "price":  7
    },
    {
        "id":  "pos_prod_435",
        "code":  "40146001",
        "name":  "ปลาบ้าหางแดง 1.5-2 นิ้ว",
        "category":  "46 ปลาบ้าหางแดง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.8,
        "price":  1.5
    },
    {
        "id":  "pos_prod_436",
        "code":  "40146002",
        "name":  "ปลาบ้าหางแดง 2-3 นิ้ว",
        "category":  "46 ปลาบ้าหางแดง",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  1.2,
        "price":  2.5
    },
    {
        "id":  "pos_prod_437",
        "code":  "PD69000035",
        "name":  "CP 9774 อาหารปลากระพง  20กก.",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  950,
        "price":  1250
    },
    {
        "id":  "pos_prod_438",
        "code":  "PD69000036",
        "name":  "CP 9775 อาหารปลากระพง  20กก.",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  975,
        "price":  1150
    },
    {
        "id":  "pos_prod_439",
        "code":  "PD69000037",
        "name":  "CP 9774 อาหารปลากระพง  20กก.",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  930,
        "price":  1250
    },
    {
        "id":  "pos_prod_440",
        "code":  "PD69000038",
        "name":  "กระชังตาปู 2*7*1.50",
        "category":  "กระชังปลา",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  800,
        "price":  900
    },
    {
        "id":  "pos_prod_441",
        "code":  "PD69000039",
        "name":  "CP 9776 อาหารปลากระพง 20 กก.",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  935,
        "price":  1150
    },
    {
        "id":  "pos_prod_442",
        "code":  "PD69000040",
        "name":  "ปลาคราฟ คละสี 2-4 นิ้ว",
        "category":  "47 ปลาคราฟ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  8,
        "price":  20
    },
    {
        "id":  "pos_prod_443",
        "code":  "PD69000041",
        "name":  "ปลาคราฟ คละสี 10-12 นิ้ว",
        "category":  "47 ปลาคราฟ",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  266.6667,
        "price":  400
    },
    {
        "id":  "pos_prod_444",
        "code":  "PD69000042",
        "name":  "ฮิวมัส 5 ลิตร",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  1,
        "unit":  "ถุง",
        "cost":  350,
        "price":  440
    },
    {
        "id":  "pos_prod_445",
        "code":  "PD69000043",
        "name":  "จุลินทรีย์ ปรับสภาพน้ำ DKC  100 ก.",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  1,
        "unit":  "ถุง",
        "cost":  280,
        "price":  350
    },
    {
        "id":  "pos_prod_446",
        "code":  "PD69000045",
        "name":  "อาหารปลาดุก ใหญ่ 289 2กก.",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  30,
        "price":  45
    },
    {
        "id":  "pos_prod_447",
        "code":  "PD69000046",
        "name":  "อาหารปลาดุก กลาง 288   2กก.",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  40,
        "price":  50
    },
    {
        "id":  "pos_prod_448",
        "code":  "PD69000047",
        "name":  "อาหารปลา จจ. โปร 50%",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  2,
        "unit":  "ถุง",
        "cost":  50,
        "price":  100
    },
    {
        "id":  "pos_prod_449",
        "code":  "PD69000048",
        "name":  "อาหารผง ตกราง",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  1825,
        "unit":  "กิโล",
        "cost":  8.3,
        "price":  10
    },
    {
        "id":  "pos_prod_450",
        "code":  "PD69000049",
        "name":  "อาหารปลาเวียดนาม(เม็ดจิ๋ว) L01",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  1100,
        "price":  1400
    },
    {
        "id":  "pos_prod_451",
        "code":  "PD69000050",
        "name":  "อาหารปลาดุก AT1S (โปรตีน 32%)",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  560,
        "price":  590
    },
    {
        "id":  "pos_prod_452",
        "code":  "PD66000006",
        "name":  "อาหารปลากินพืช ใหญ่ 789  (2กก.)",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  27,
        "price":  40
    },
    {
        "id":  "pos_prod_453",
        "code":  "PD69000051",
        "name":  "CP 9777 อาหารปลากระพง  2 กก.",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  93,
        "price":  120
    },
    {
        "id":  "pos_prod_454",
        "code":  "PD69000053",
        "name":  "อาหารปลา กระพง Foo 2 กก.",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  120,
        "price":  150
    },
    {
        "id":  "pos_prod_455",
        "code":  "PD69000054",
        "name":  "อาหารไก่ไข่915",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  414,
        "price":  445
    },
    {
        "id":  "pos_prod_456",
        "code":  "PD69000084",
        "name":  "287 อาหารปลาดุก เบอร์1 (ถุง2กก.)",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  42.5,
        "price":  60
    },
    {
        "id":  "pos_prod_457",
        "code":  "PD69000082",
        "name":  "287 อาหารปลาดุก เบอร์ 1 (กระสอบ)",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  15,
        "unit":  "กระสอบ",
        "cost":  415,
        "price":  465
    },
    {
        "id":  "pos_prod_458",
        "code":  "PD67000037",
        "name":  "อาหารปลาดุก ใหญ่ 289    20กก.",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  400,
        "price":  430
    },
    {
        "id":  "pos_prod_459",
        "code":  "20101067",
        "name":  "รำละเอียด กระสอบ. 50กก.",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  325,
        "price":  850
    },
    {
        "id":  "pos_prod_460",
        "code":  "A00935",
        "name":  "อาหารปลากินพืช 999 20กก",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  260,
        "price":  290
    },
    {
        "id":  "pos_prod_461",
        "code":  "PD69000055",
        "name":  "กระชังมุ้ง 2*5*0.9",
        "category":  "กระชังปลา",
        "quantity":  0,
        "unit":  "ใบ",
        "cost":  370,
        "price":  450
    },
    {
        "id":  "pos_prod_462",
        "code":  "PD69000056",
        "name":  "กากชา",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  2,
        "unit":  "ถุง",
        "cost":  360,
        "price":  440
    },
    {
        "id":  "pos_prod_463",
        "code":  "20101027",
        "name":  "mum อาหารเป็ดไข่ 494    30kg กระสอบ",
        "category":  "201 อาหารสัตว์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  476,
        "price":  495
    },
    {
        "id":  "pos_prod_464",
        "code":  "20201028",
        "name":  "mum อาหารเป็ดไข่ 494    ถุง 2กก.",
        "category":  "202 อาหารสัตว์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  31,
        "price":  36
    },
    {
        "id":  "pos_prod_465",
        "code":  "PD69000057",
        "name":  "เกลือดำ 50 KG",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  80,
        "price":  110
    },
    {
        "id":  "pos_prod_466",
        "code":  "A01333",
        "name":  "7731 เซฟฟ์ฟีช อาหารปลากินพืช 20kg (กระสอบ)",
        "category":  "201 อาหารสัตว์ พาณิชย์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  260,
        "price":  290
    },
    {
        "id":  "pos_prod_467",
        "code":  "A01334",
        "name":  "7731 เซฟฟ์ฟีช อาหารปลากินพืช 2kg (ถุง)",
        "category":  "202 อาหารสัตว์ พาณิชย์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  26,
        "price":  40
    },
    {
        "id":  "pos_prod_468",
        "code":  "PD67000048",
        "name":  "ถุงหิ้ว ตราม้าชมพู ทุกขนาด",
        "category":  "301 ถุงหิ้ว",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  32,
        "price":  43
    },
    {
        "id":  "pos_prod_469",
        "code":  "A00156",
        "name":  "ถุงหิ้ว ม้าเขียว ทุกเบอร์",
        "category":  "301 ถุงหิ้ว",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  38,
        "price":  48
    },
    {
        "id":  "pos_prod_470",
        "code":  "A00293",
        "name":  "ถุงหิ้ว ตรา หมีคู่",
        "category":  "301 ถุงหิ้ว",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  35,
        "price":  42
    },
    {
        "id":  "pos_prod_471",
        "code":  "A01235",
        "name":  "ถุงหิ้วยักษ์ใจดี ทุกขนาด",
        "category":  "301 ถุงหิ้ว",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  34,
        "price":  40
    },
    {
        "id":  "pos_prod_472",
        "code":  "A01302",
        "name":  "BL ถุงหูหิ้ว ทุกขนาด",
        "category":  "301 ถุงหิ้ว",
        "quantity":  0,
        "unit":  "ชิ้น",
        "cost":  43,
        "price":  45
    },
    {
        "id":  "pos_prod_473",
        "code":  "PD69000058",
        "name":  "ด่างทับทิม 1กก.",
        "category":  "203 สินค้าอื่นๆ",
        "quantity":  1,
        "unit":  "ถุง",
        "cost":  140,
        "price":  170
    },
    {
        "id":  "pos_prod_474",
        "code":  "PD69000115",
        "name":  "อาหารปลาดุก 3918   20กก. (กระสอบ)",
        "category":  "201 อาหารสัตว์ พาณิชย์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  375,
        "price":  430
    },
    {
        "id":  "pos_prod_475",
        "code":  "PD69000116",
        "name":  "อาหารปลาดุก 3919   20กก. (กระสอบ)",
        "category":  "201 อาหารสัตว์ พาณิชย์ กระสอบ",
        "quantity":  0,
        "unit":  "กระสอบ",
        "cost":  375,
        "price":  430
    },
    {
        "id":  "pos_prod_476",
        "code":  "PD69000117",
        "name":  "อาหารปลาดุก 3918   2กก. (ถุง)",
        "category":  "202 อาหารสัตว์ พาณิชย์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  37.5,
        "price":  50
    },
    {
        "id":  "pos_prod_477",
        "code":  "PD69000118",
        "name":  "อาหารปลาดุก 3919   2กก. (ถุง)",
        "category":  "202 อาหารสัตว์ พาณิชย์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  37.5,
        "price":  50
    },
    {
        "id":  "pos_prod_478",
        "code":  "A01355",
        "name":  "รำละเอียด 1กก",
        "category":  "202 อาหารสัตว์ พาณิชย์ แบ่งโล",
        "quantity":  0,
        "unit":  "กิโลกรัม",
        "cost":  9,
        "price":  17
    },
    {
        "id":  "pos_prod_479",
        "code":  "PD69000059",
        "name":  "ปลานิล 2.5 เซนห(จ.ส.)",
        "category":  "3 ปลานิล",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.0999,
        "price":  0.2
    },
    {
        "id":  "pos_prod_480",
        "code":  "A01357",
        "name":  "ปลาป่น 2กก.",
        "category":  "202 อาหารสัตว์ พาณิชย์ แบ่งโล",
        "quantity":  0,
        "unit":  "ถุง",
        "cost":  60,
        "price":  70
    },
    {
        "id":  "pos_prod_481",
        "code":  "PD69000060",
        "name":  "ลูกกุ้งก้ามกราม 0.7 เซน",
        "category":  "45 ลูกกุ้งก้ามกราม",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0.08,
        "price":  0.15
    },
    {
        "id":  "pos_prod_482",
        "code":  "40101012",
        "name":  "ปลาตะเพียน ใหญ่พิเศษ(สวย)",
        "category":  "1 ปลาตะเพียน",
        "quantity":  0,
        "unit":  "ตัว",
        "cost":  0,
        "price":  5
    },
    {
        "id":  "pos_prod_483",
        "code":  "20101002",
        "name":  "cp อาหารปลาดุกเล็ก9920D (กระสอบ)",
        "category":  "201 อาหารสัตว์ พาณิชย์ กระสอบ",
        "quantity":  1,
        "unit":  "กระสอบ",
        "cost":  475,
        "price":  550
    }
];
