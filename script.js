'use strict';

/* ==========================================================================
   الكيمياء العضوية — أداة المذاكرة التفاعلية
   بنية الملف: بيانات (chemistryData) ثم منطق الواجهة (init* functions).
   كل شيء مغلّف داخل IIFE واحد لتفادي أي متغيرات عامة على window.
   ========================================================================== */
(() => {

/* ==========================================================================
   CHEMISTRY DATA
   المصدر: دليل الكيمياء العضوية والملخص التحصيلي - الباب الخامس (الدروس 1-3)
   القسم المعلّم "Additional Chemistry Data" يحتوي على بيانات إضافية لازمة
   لعمل أداة البحث فقط، وهو منفصل تمامًا عن محتوى الـ PDF الأصلي.
   ========================================================================== */
/* ==========================================================================
   CHEMISTRY DATA
   المصدر: دليل الكيمياء العضوية والملخص التحصيلي - الباب الخامس (الدروس 1-3)
   القسم المعلّم "Additional Chemistry Data" يحتوي على بيانات إضافية لازمة
   لعمل أداة البحث فقط، وهو منفصل تمامًا عن محتوى الـ PDF الأصلي.
   ========================================================================== */

const chemistryData = {

  /* ---------------------- المركبات (من الـ PDF) ---------------------- */
  compounds: [
    {
      id: "urea",
      names: { arabic: "اليوريا", iupac: "Urea", common: "Carbamide / بولينا" },
      aliases: ["urea", "يوريا", "اليوريا", "carbamide", "h2n-co-nh2", "بولينا"],
      formula: "H2N-CO-NH2",
      type: "organic",
      typeLabel: "مركب عضوي",
      use: "أول مركب عضوي يُحضَّر في المختبر من مركبات غير عضوية (فوهلر 1828). يتكوّن في بول الثدييات، ويستخدم في صناعة الأسمدة.",
      related: ["ammonium-cyanate"]
    },
    {
      id: "ammonium-cyanate",
      names: { arabic: "سيانات الأمونيوم", iupac: "Ammonium cyanate", common: "" },
      aliases: ["ammonium cyanate", "سيانات الأمونيوم", "nh4cno"],
      formula: "NH4CNO",
      type: "inorganic",
      typeLabel: "مركب غير عضوي (وسيط)",
      use: "مركب وسيط يتحول بالتسخين وإعادة الترتيب الجزيئي إلى اليوريا — الخطوة التاريخية التي أسقطت نظرية القوة الحيوية.",
      related: ["urea"]
    },
    {
      id: "methane",
      names: { arabic: "الميثان", iupac: "Methane", common: "Marsh Gas / غاز المستنقعات" },
      aliases: ["methane", "ميثان", "الميثان", "ch4", "marsh gas", "غاز المستنقعات"],
      formula: "CH4",
      type: "alkane",
      typeLabel: "ألكان",
      use: "أبسط الألكانات، يشكّل أكثر من 90% من الغاز الطبيعي، ويُستخدم كوقود ومادة خام صناعية.",
      related: ["chloromethane", "carbon-black", "water-gas", "sodium-acetate"]
    },
    {
      id: "ethane",
      names: { arabic: "الإيثان", iupac: "Ethane", common: "" },
      aliases: ["ethane", "ايثان", "إيثان", "الإيثان", "c2h6"],
      formula: "C2H6",
      type: "alkane",
      typeLabel: "ألكان",
      use: "ثاني أبسط الألكانات؛ يُحضَّر معمليًا بالتقطير الجاف لبروبانوات الصوديوم.",
      related: ["sodium-propanoate", "methane"]
    },
    {
      id: "propane",
      names: { arabic: "البروبان", iupac: "Propane", common: "" },
      aliases: ["propane", "بروبان", "البروبان", "c3h8"],
      formula: "C3H8",
      type: "alkane",
      typeLabel: "ألكان",
      use: "أحد مكوّني غاز البوتاجاز، أكثر تطايرًا وأقل غليانًا من البيوتان، ويكثر استخدامه في المناطق الباردة.",
      related: ["butagas", "sodium-butanoate", "ethane"]
    },
    {
      id: "butane",
      names: { arabic: "البيوتان", iupac: "Butane", common: "" },
      aliases: ["butane", "بيوتان", "البيوتان", "c4h10"],
      formula: "C4H10",
      type: "alkane",
      typeLabel: "ألكان",
      use: "المكوّن الثاني لغاز البوتاجاز، ويكثر في المناطق الدافئة. ينتج أيضًا من التكسير الحراري للأوكتان.",
      related: ["butagas", "octane"]
    },
    {
      id: "octane",
      names: { arabic: "الأوكتان", iupac: "Octane", common: "" },
      aliases: ["octane", "اوكتان", "الأوكتان", "c8h18"],
      formula: "C8H18",
      type: "alkane",
      typeLabel: "ألكان",
      use: "ألكان ثقيل يخضع للتكسير الحراري (Cracking) تحت حرارة وضغط وعامل حفاز لإنتاج ألكان وألكين أقصر.",
      related: ["butane"]
    },
    {
      id: "carbon-black",
      names: { arabic: "أسود الكربون", iupac: "Carbon black", common: "" },
      aliases: ["carbon black", "اسود الكربون", "أسود الكربون", "c(s)", "كربون مجزأ"],
      formula: "C",
      type: "other",
      typeLabel: "كربون مجزّأ",
      use: "مسحوق أسود ناعم ناتج من تفكك الميثان بالحرارة بمعزل عن الهواء، يدخل في إطارات السيارات والحبر والبويات وورنيش الأحذية.",
      related: ["methane"]
    },
    {
      id: "water-gas",
      names: { arabic: "الغاز المائي", iupac: "Water gas", common: "" },
      aliases: ["water gas", "الغاز المائي", "co + h2"],
      formula: "CO + 3H2",
      type: "mixture",
      typeLabel: "خليط غازي",
      use: "خليط ناتج من تفاعل الميثان وبخار الماء، يُستخدم كعامل مختزل قوي في فرن مدركس لصناعة الحديد، وكوقود.",
      related: ["methane"]
    },
    {
      id: "sodium-lime",
      names: { arabic: "الجير الصودي", iupac: "Soda lime (NaOH + CaO)", common: "" },
      aliases: ["soda lime", "الجير الصودي", "naoh+cao", "جير صودي"],
      formula: "NaOH + CaO",
      type: "inorganic",
      typeLabel: "خليط غير عضوي",
      use: "مزيج من الصودا الكاوية والجير الحي، يُستخدم في التقطير الجاف؛ CaO يخفض درجة انصهار المزيج.",
      related: ["sodium-acetate", "methane"]
    },
    {
      id: "chloroform",
      names: { arabic: "الكلوروفورم", iupac: "Trichloromethane", common: "Chloroform" },
      aliases: ["chloroform", "كلوروفورم", "الكلوروفورم", "chcl3", "trichloromethane"],
      formula: "CHCl3",
      type: "halogenated",
      typeLabel: "مشتق هالوجيني للألكان",
      use: "مخدر استُخدم سابقًا في العمليات الجراحية وتم إيقافه لأن عدم التقدير الدقيق للجرعة يسبب الوفاة.",
      related: ["chloromethane", "dichloromethane", "carbon-tetrachloride"]
    },
    {
      id: "halothane",
      names: { arabic: "الهالوثان", iupac: "2-bromo-2-chloro-1,1,1-trifluoroethane", common: "Halothane" },
      aliases: ["halothane", "هالوثان", "الهالوثان", "cf3-chbrcl", "cf3chbrcl"],
      formula: "CF3-CHBrCl",
      type: "halogenated",
      typeLabel: "مشتق هالوجيني",
      use: "مخدر آمن وحديث يُستخدم حاليًا في العمليات الجراحية.",
      related: ["chloroform"]
    },
    {
      id: "dry-clean-solvent",
      names: { arabic: "منظف التنظيف الجاف", iupac: "1,1,1-Trichloroethane", common: "" },
      aliases: ["trichloroethane", "منظف التنظيف الجاف", "ch3ccl3"],
      formula: "CH3-CCl3",
      type: "halogenated",
      typeLabel: "مشتق هالوجيني (ثلاثي كلورو إيثان)",
      use: "مذيب عضوي فعّال وقوي جدًا، يُستخدم بشكل شائع في عمليات التنظيف الجاف للأقمشة والمنسوجات.",
      related: []
    },
    {
      id: "freon12",
      names: { arabic: "الفريون 12", iupac: "Dichlorodifluoromethane", common: "Freon-12" },
      aliases: ["freon 12", "freon-12", "الفريون 12", "cf2cl2"],
      formula: "CF2Cl2",
      type: "halogenated",
      typeLabel: "مشتق هالوجيني (ثنائي كلورو ثنائي فلورو)",
      use: "أشهر الفريونات، يُستخدم في أجهزة التكييف والتبريد ودافعًا للسوائل والروائح؛ غير سام ولا يسبب تآكل المعادن لكنه يضر طبقة الأوزون.",
      related: []
    },
    {
      id: "butagas",
      names: { arabic: "غاز البوتاجاز", iupac: "Propane–Butane mixture", common: "" },
      aliases: ["butagas", "بوتاجاز", "غاز البوتاجاز", "c3h8+c4h10"],
      formula: "C3H8 + C4H10",
      type: "mixture",
      typeLabel: "خليط ألكانات مسالة",
      use: "خليط يُسال ويُعبّأ في أسطوانات الغاز المنزلي، يجمع بين البروبان والبيوتان.",
      related: ["propane", "butane"]
    },
    {
      id: "chloromethane",
      names: { arabic: "كلوروميثان", iupac: "Chloromethane", common: "" },
      aliases: ["chloromethane", "كلوروميثان", "ch3cl"],
      formula: "CH3Cl",
      type: "halogenated",
      typeLabel: "مشتق هالوجيني للميثان",
      use: "ناتج الخطوة الأولى من هلجنة الميثان بالكلور في وجود الأشعة فوق البنفسجية.",
      related: ["methane", "dichloromethane"]
    },
    {
      id: "dichloromethane",
      names: { arabic: "ثنائي كلورو ميثان", iupac: "Dichloromethane", common: "كلوريد الميثيلين" },
      aliases: ["dichloromethane", "كلوريد الميثيلين", "ch2cl2"],
      formula: "CH2Cl2",
      type: "halogenated",
      typeLabel: "مشتق هالوجيني للميثان",
      use: "ناتج الخطوة الثانية من هلجنة الميثان — كلوريد الميثيلين.",
      related: ["chloromethane", "chloroform"]
    },
    {
      id: "carbon-tetrachloride",
      names: { arabic: "رابع كلوريد الكربون", iupac: "Tetrachloromethane", common: "" },
      aliases: ["carbon tetrachloride", "رابع كلوريد الكربون", "ccl4"],
      formula: "CCl4",
      type: "halogenated",
      typeLabel: "مشتق هالوجيني للميثان",
      use: "ناتج الخطوة الرابعة والأخيرة من هلجنة الميثان، بعد استبدال كل ذرات الهيدروجين.",
      related: ["chloroform"]
    },
    {
      id: "sodium-acetate",
      names: { arabic: "أسيتات الصوديوم", iupac: "Sodium acetate (anhydrous)", common: "" },
      aliases: ["sodium acetate", "اسيتات الصوديوم", "ch3coona"],
      formula: "CH3COONa",
      type: "inorganic",
      typeLabel: "ملح حمض كربوكسيلي صوديومي",
      use: "يُستخدم في التقطير الجاف مع الجير الصودي لتحضير الميثان في المعمل.",
      related: ["methane", "sodium-lime"]
    },
    {
      id: "sodium-propanoate",
      names: { arabic: "بروبانوات الصوديوم", iupac: "Sodium propanoate", common: "" },
      aliases: ["sodium propanoate", "بروبانوات الصوديوم", "c2h5coona"],
      formula: "C2H5COONa",
      type: "inorganic",
      typeLabel: "ملح حمض كربوكسيلي صوديومي",
      use: "بالتقطير الجاف مع الجير الصودي ينتج الإيثان.",
      related: ["ethane"]
    },
    {
      id: "sodium-butanoate",
      names: { arabic: "بيوتانوات الصوديوم", iupac: "Sodium butanoate", common: "" },
      aliases: ["sodium butanoate", "بيوتانوات الصوديوم", "c3h7coona"],
      formula: "C3H7COONa",
      type: "inorganic",
      typeLabel: "ملح حمض كربوكسيلي صوديومي",
      use: "بالتقطير الجاف مع الجير الصودي ينتج البروبان.",
      related: ["propane"]
    }
  ],

  /* -------- Additional Chemistry Data (خارج الـ PDF - لدعم أداة البحث فقط) -------- */
  additionalCompounds: [
    { id: "pentane", names: { arabic: "البنتان", iupac: "Pentane", common: "" }, aliases: ["pentane","بنتان","c5h12"], formula: "C5H12", type: "alkane", typeLabel: "ألكان", use: "خامس الألكانات في السلسلة المتجانسة.", related: [] },
    { id: "hexane", names: { arabic: "الهكسان", iupac: "Hexane", common: "" }, aliases: ["hexane","هكسان","c6h14"], formula: "C6H14", type: "alkane", typeLabel: "ألكان", use: "سادس الألكانات في السلسلة المتجانسة.", related: [] },
    { id: "heptane", names: { arabic: "الهبتان", iupac: "Heptane", common: "" }, aliases: ["heptane","هبتان","c7h16"], formula: "C7H16", type: "alkane", typeLabel: "ألكان", use: "سابع الألكانات في السلسلة المتجانسة.", related: [] },
    { id: "nonane", names: { arabic: "النونان", iupac: "Nonane", common: "" }, aliases: ["nonane","نونان","c9h20"], formula: "C9H20", type: "alkane", typeLabel: "ألكان", use: "تاسع الألكانات في السلسلة المتجانسة.", related: [] },
    { id: "decane", names: { arabic: "الديكان", iupac: "Decane", common: "" }, aliases: ["decane","ديكان","c10h22"], formula: "C10H22", type: "alkane", typeLabel: "ألكان", use: "عاشر الألكانات في السلسلة المتجانسة.", related: [] }
  ],

  /* ---------------------- التفاعلات (من الـ PDF) ---------------------- */
  reactions: [
    {
      id: "r1", compoundIds: ["ammonium-cyanate","urea"],
      nameArabic: "تحضير سيانات الأمونيوم",
      nameStandard: "Preparation of Ammonium Cyanate",
      equation: "NH4Cl(aq) + AgCNO(aq) -> AgCl(s) + NH4CNO(aq)",
      conditions: "تفاعل استبدال مزدوج في محلول مائي",
      products: "AgCl (راسب أبيض) + NH4CNO",
      type: "substitution",
      desc: "تفاعل استبدال مزدوج ينتج عنه سيانات الأمونيوم وكلوريد الفضة (راسب أبيض)."
    },
    {
      id: "r2", compoundIds: ["ammonium-cyanate","urea"],
      nameArabic: "تحضير اليوريا في المختبر",
      nameStandard: "Laboratory Synthesis of Urea (Wöhler Synthesis)",
      equation: "NH4CNO(aq) --heat--> H2N-CO-NH2(s)",
      conditions: "تسخين (إعادة ترتيب جزيئي)",
      products: "اليوريا H2N-CO-NH2",
      type: "conversion",
      desc: "إعادة ترتيب جزيئي بالحرارة لإنتاج اليوريا — أول مركب عضوي معملي، حقق فوهلر به ضربة قاضية لنظرية القوة الحيوية."
    },
    {
      id: "r3", compoundIds: [],
      nameArabic: "الكشف عن الهيدروجين",
      nameStandard: "Detection of Hydrogen",
      equation: "2H + CuO(s) --heat--> Cu(s) + H2O(v)",
      conditions: "تسخين أكسيد النحاس الأسود",
      products: "Cu + بخار ماء",
      type: "oxidation",
      desc: "الهيدروجين يختزل أكسيد النحاس الأسود الساخن لتكوين بخار الماء (يُزرق كبريتات النحاس II البيضاء)."
    },
    {
      id: "r4", compoundIds: [],
      nameArabic: "الكشف عن الكربون",
      nameStandard: "Detection of Carbon",
      equation: "C + 2CuO(s) --heat--> 2Cu(s) + CO2(g)",
      conditions: "تسخين أكسيد النحاس الأسود",
      products: "Cu + CO2",
      type: "oxidation",
      desc: "الكربون يختزل أكسيد النحاس الأسود الساخن لتكوين غاز ثاني أكسيد الكربون (يُعكّر ماء الجير)."
    },
    {
      id: "r5", compoundIds: ["sodium-acetate","sodium-lime","methane"],
      nameArabic: "تحضير الميثان في المعمل",
      nameStandard: "Laboratory Preparation of Methane",
      equation: "CH3COONa(s) + NaOH(s) --CaO / heat--> CH4(g) + Na2CO3(s)",
      conditions: "تقطير جاف، CaO لخفض درجة الانصهار",
      products: "CH4 + Na2CO3",
      type: "lab",
      desc: "التقطير الجاف لأسيتات الصوديوم اللامائية مع الجير الصودي (مزيج NaOH و CaO لخفض درجة الانصهار)."
    },
    {
      id: "r6", compoundIds: ["methane"],
      nameArabic: "احتراق الميثان",
      nameStandard: "Complete Combustion of Methane",
      equation: "CH4(g) + 2O2(g) --heat--> CO2(g) + 2H2O(v) + Energy",
      conditions: "حرارة",
      products: "CO2 + H2O + طاقة",
      type: "combustion",
      desc: "احتراق تام طارد للحرارة بشدة، ينتج طاقة عالية وثاني أكسيد كربون وبخار ماء."
    },
    {
      id: "r7", compoundIds: ["octane","butane"],
      nameArabic: "التكسير الحراري للأوكتان",
      nameStandard: "Thermal Cracking of Octane",
      equation: "C8H18(l) --heat, P, cat--> C4H10(g) + C4H8(g)",
      conditions: "حرارة + ضغط + عامل حفاز",
      products: "C4H10 + C4H8",
      type: "industrial",
      desc: "تكسير الألكانات الثقيلة تحت حرارة وضغط وعامل حفاز لإنتاج ألكان وألكين أقصر سلسلة."
    },
    {
      id: "r8", compoundIds: ["methane","chloromethane"],
      nameArabic: "هلجنة الميثان: خطوة 1",
      nameStandard: "Halogenation of Methane — Step 1",
      equation: "CH4 + Cl2 --UV--> CH3Cl + HCl",
      conditions: "أشعة فوق بنفسجية UV",
      products: "CH3Cl + HCl",
      type: "halogenation",
      desc: "الخطوة الأولى: استبدال ذرة هيدروجين بكلور في وجود الأشعة فوق البنفسجية لإنتاج كلوروميثان."
    },
    {
      id: "r9", compoundIds: ["chloromethane","dichloromethane"],
      nameArabic: "هلجنة الميثان: خطوة 2",
      nameStandard: "Halogenation of Methane — Step 2",
      equation: "CH3Cl + Cl2 --UV--> CH2Cl2 + HCl",
      conditions: "أشعة فوق بنفسجية UV",
      products: "CH2Cl2 + HCl",
      type: "halogenation",
      desc: "الخطوة الثانية: تفاعل كلوروميثان مع الكلور لإنتاج ثنائي كلوروميثان (كلوريد الميثيلين)."
    },
    {
      id: "r10", compoundIds: ["dichloromethane","chloroform"],
      nameArabic: "هلجنة الميثان: خطوة 3",
      nameStandard: "Halogenation of Methane — Step 3",
      equation: "CH2Cl2 + Cl2 --UV--> CHCl3 + HCl",
      conditions: "أشعة فوق بنفسجية UV",
      products: "CHCl3 + HCl",
      type: "halogenation",
      desc: "الخطوة الثالثة: إنتاج ثلاثي كلوروميثان (الكلوروفورم — مخدر غير آمن سابقًا)."
    },
    {
      id: "r11", compoundIds: ["chloroform","carbon-tetrachloride"],
      nameArabic: "هلجنة الميثان: خطوة 4",
      nameStandard: "Halogenation of Methane — Step 4",
      equation: "CHCl3 + Cl2 --UV--> CCl4 + HCl",
      conditions: "أشعة فوق بنفسجية UV",
      products: "CCl4 + HCl",
      type: "halogenation",
      desc: "الخطوة الرابعة: استبدال ذرة الهيدروجين الأخيرة لإنتاج رابع كلوريد الكربون."
    },
    {
      id: "r12", compoundIds: ["methane","carbon-black"],
      nameArabic: "الحصول على أسود الكربون",
      nameStandard: "Production of Carbon Black",
      equation: "CH4 --1000C, no air--> C(s) + 2H2(g)",
      conditions: "1000°م بمعزل عن الهواء",
      products: "C + H2",
      type: "industrial",
      desc: "تسخين الميثان عند 1000 درجة مئوية بمعزل عن الهواء للحصول على أسود الكربون المستخدم في الإطارات والحبر."
    },
    {
      id: "r13", compoundIds: ["methane","water-gas"],
      nameArabic: "الحصول على الغاز المائي",
      nameStandard: "Production of Water Gas",
      equation: "CH4 + H2O --725C, cat--> CO(g) + 3H2(g)",
      conditions: "725°م + عامل حفاز",
      products: "CO + 3H2",
      type: "industrial",
      desc: "تفاعل الميثان مع بخار الماء عند 725 درجة وعوامل حفازة لإنتاج الغاز المائي (عامل مختزل ووقود)."
    },
    {
      id: "r14", compoundIds: ["sodium-propanoate","ethane"],
      nameArabic: "تحضير الإيثان بالتقطير الجاف",
      nameStandard: "Dry Distillation → Ethane",
      equation: "C2H5COONa(s) + NaOH(s) --CaO / heat--> C2H6(g) + Na2CO3(s)",
      conditions: "تقطير جاف",
      products: "C2H6 + Na2CO3",
      type: "lab",
      desc: "بروبانوات الصوديوم (3 ذرات كربون) بالتقطير الجاف تنتج الإيثان (ذرتا كربون)."
    },
    {
      id: "r15", compoundIds: ["sodium-butanoate","propane"],
      nameArabic: "تحضير البروبان بالتقطير الجاف",
      nameStandard: "Dry Distillation → Propane",
      equation: "C3H7COONa(s) + NaOH(s) --CaO / heat--> C3H8(g) + Na2CO3(s)",
      conditions: "تقطير جاف",
      products: "C3H8 + Na2CO3",
      type: "lab",
      desc: "بيوتانوات الصوديوم (4 ذرات كربون) بالتقطير الجاف تنتج البروبان (3 ذرات كربون)."
    }
  ],

  reactionTypes: [
    { id: "all", label: "الكل", icon: "🧪" },
    { id: "combustion", label: "احتراق", icon: "🔥" },
    { id: "halogenation", label: "هلجنة", icon: "☀️" },
    { id: "substitution", label: "استبدال", icon: "⚡" },
    { id: "oxidation", label: "أكسدة", icon: "🧪" },
    { id: "industrial", label: "صناعي", icon: "🏭" },
    { id: "lab", label: "تحضير معملي", icon: "🔬" },
    { id: "conversion", label: "تحول", icon: "🔄" },
    { id: "other", label: "أخرى", icon: "•" }
  ],

  /* ---------------------- القوانين العامة ---------------------- */
  formulas: [
    { name: "الألكانات (البرافينات)", equation: "CnH2n+2", note: "هيدروكربونات أليفاتية مشبعة مفتوحة السلسلة" },
    { name: "الألكينات (الأوليفينات)", equation: "CnH2n", note: "تحتوي على رابطة تساهمية ثنائية C=C" },
    { name: "الألكاينات (الأسيتيلينات)", equation: "CnH2n-2", note: "تحتوي على رابطة تساهمية ثلاثية" },
    { name: "الألكانات الحلقية", equation: "CnH2n", note: "هيدروكربونات حلقية مشبعة" },
    { name: "مجموعة الألكيل", equation: "CnH2n+1", note: "شق عضوي رمزه -R، لا يوجد منفردًا" }
  ],

  sigma: {
    rules: [
      "عدد روابط سيجما (σ) بين ذرات الكربون فقط = n − 1",
      "عدد روابط سيجما بين ذرات الكربون والهيدروجين = 2n + 2",
      "عدد روابط سيجما الكلية في جزيء الألكان = 3n + 1"
    ],
    example: {
      title: "مثال تطبيقي: البروبان C3H8 (عدد الكربونات n = 3)",
      lines: [
        "الروابط بين الكربون: 3 − 1 = 2 رابطة سيجما",
        "الروابط بين الكربون والهيدروجين: (2×3) + 2 = 8 روابط سيجما",
        "الروابط الكلية في الجزيء: (3×3) + 1 = 10 روابط سيجما"
      ]
    }
  },

  distillation: {
    rule: "التقطير الجاف لملح حمض كربوكسيلي صوديومي صيغته CnH2n+1COONa مع الجير الصودي (NaOH + CaO) ينتج دائمًا ألكانًا مشبعًا صيغته CnH2n+2 — أي أن الألكان الناتج يحتوي دائمًا على عدد ذرات كربون أقل بمقدار ذرة كربون واحدة من الملح المستخدم.",
    flow: ["CnH2n+1COONa(s) + NaOH(s)", "CaO / heat", "CnH2n+2(g) + Na2CO3(s)"],
    examples: [
      "أسيتات الصوديوم CH3COONa (ذرة كربون واحدة) → الميثان CH4",
      "بروبانوات الصوديوم C2H5COONa (3 ذرات كربون) → الإيثان C2H6 (ذرتا كربون)",
      "بيوتانوات الصوديوم C3H7COONa (4 ذرات كربون) → البروبان C3H8 (3 ذرات كربون)"
    ]
  },

  homologous: {
    intro: "سلسلة من المركبات العضوية يجمعها قانون جزيئي عام، تشترك في خواصها الكيميائية، وتتدرج في خواصها الفيزيائية مثل درجتي الغليان والانصهار والحالة الفيزيائية. يزيد كل مركب في السلسلة عن الذي يسبقه بمجموعة ميثيلين -(CH2)- كتلتها المولية 14 g/mol.",
    groups: [
      { title: "الحالة الغازية", range: "C1 – C4", detail: "الميثان، الإيثان، البروبان، البيوتان" },
      { title: "الحالة السائلة", range: "C5 – C17", detail: "الجازولين والكيروسين" },
      { title: "الحالة الصلبة", range: "C18 فأكثر", detail: "شمع البرافين والشحوم" }
    ]
  },

  /* ---------------------- أقسام المذاكرة (11 قسم) ---------------------- */
  sections: [
    {
      id: "s1", title: "1. المقدمة التاريخية",
      paragraphs: [
        "تُعد الكيمياء العضوية أحد أهم الفروع الكيميائية وأكثرها وفرة. في عام 1806، قسّم العالم برزيليوس المركبات إلى عضوية وغير عضوية."
      ],
      note: "هذه بداية الفصل بين الكيمياء العضوية وغير العضوية كما ورد في الملخص.",
      equations: [],
      summary: ["برزيليوس قسّم المركبات إلى عضوية وغير عضوية عام 1806."]
    },
    {
      id: "s2", title: "2. نظرية القوة الحيوية",
      paragraphs: [
        "صاغ برزيليوس نظرية القوة الحيوية التي تفترض أن المركبات العضوية لا يمكن تحضيرها إلا داخل خلايا الكائنات الحية بفعل قوى حيوية غامضة."
      ],
      note: "هذه النظرية كانت سائدة قبل أن يسقطها فوهلر عام 1828.",
      equations: [],
      summary: ["نظرية القوة الحيوية: المركبات العضوية تُحضَّر فقط داخل الكائنات الحية."]
    },
    {
      id: "s3", title: "3. فوهلر وتحضير اليوريا",
      paragraphs: [
        "في عام 1828، وجّه العالم الألماني فوهلر ضربة قاضية لنظرية القوة الحيوية بنجاحه في تحضير اليوريا (مركب عضوي يتكوّن في بول الثدييات) في معمله، عن طريق تسخين محلول مائي لمركبين غير عضويين هما كلوريد الأمونيوم وسيانات الفضة."
      ],
      note: "هذا الحدث يُعتبر ميلاد الكيمياء العضوية الحديثة.",
      equations: ["NH4Cl(aq) + AgCNO(aq) -> AgCl(s) + NH4CNO(aq)", "NH4CNO(aq) --heat--> H2N-CO-NH2(s)"],
      summary: ["فوهلر حضّر اليوريا معمليًا عام 1828 من كلوريد الأمونيوم وسيانات الفضة.", "هذا أسقط نظرية القوة الحيوية."]
    },
    {
      id: "s4", title: "4. المركبات العضوية وغير العضوية",
      paragraphs: [
        "تتخطى المركبات العضوية اليوم أكثر من 10 ملايين مركب، بينما لا تتجاوز غير العضوية نصف مليون مركب. النسبة التقريبية للعضوية إلى غير العضوية هي 20 : 1. ويرجع هذا التوفر الهائل إلى قدرة ذرات الكربون الفريدة على الارتباط مع نفسها أو مع غيرها بروابط أحادية أو ثنائية أو ثلاثية، وتكوين سلاسل مستمرة أو متفرعة، أو حلقات متجانسة وغير متجانسة.",
        "المركبات العضوية: روابط تساهمية، انخفاض درجتي الانصهار والغليان، لا توصّل الكهرباء (لا إلكتروليتية)، وبطء تفاعلاتها.",
        "المركبات غير العضوية: روابط أيونية غالبًا، ارتفاع درجتي الانصهار والغليان، موصّلة جيدة للكهرباء غالبًا، وسرعة تفاعلاتها."
      ],
      note: "نسبة المركبات العضوية إلى غير العضوية 20 : 1.",
      equations: [],
      summary: ["نسبة العضوية لغير العضوية 20:1 بسبب قدرة الكربون على تكوين روابط وسلاسل متنوعة.", "العضوية: تساهمية وبطيئة التفاعل. غير العضوية: أيونية وسريعة التفاعل غالبًا."]
    },
    {
      id: "s5", title: "5. أهم التفاعلات",
      paragraphs: [
        "يضم الملخص مجموعة من أهم المعادلات الكيميائية بدءًا من تحضير سيانات الأمونيوم واليوريا، مرورًا بالكشف عن الهيدروجين والكربون، وحتى تفاعلات الميثان المختلفة من احتراق وهلجنة وتكسير حراري."
      ],
      note: "راجع قسم ⚗️ محرك التفاعلات لعرض كل التفاعلات مصنّفة.",
      equations: [],
      summary: ["كل التفاعلات موجودة ومصنّفة في قسم محرك التفاعلات."]
    },
    {
      id: "s6", title: "6. الميثان",
      paragraphs: [
        "الميثان CH4 هو أبسط الألكانات، ويُعرف بغاز المستنقعات، ويشكّل أكثر من 90% من الغاز الطبيعي، ويُستخدم كوقود ومادة خام. يخضع الميثان لعدة تفاعلات مهمة: الاحتراق التام، الهلجنة التدريجية بالكلور (أربع خطوات)، التفكك الحراري لإنتاج أسود الكربون، والتفاعل مع بخار الماء لإنتاج الغاز المائي."
      ],
      note: "الميثان يمثل أكثر من 90% من الغاز الطبيعي.",
      equations: ["CH4(g) + 2O2(g) --heat--> CO2(g) + 2H2O(v) + Energy"],
      summary: ["الميثان = أبسط الألكانات = غاز المستنقعات.", "يشكّل أكثر من 90% من الغاز الطبيعي."]
    },
    {
      id: "s7", title: "7. المركبات والاستخدامات",
      paragraphs: [
        "يستعرض الملخص أهم المركبات العضوية وغير العضوية المرتبطة بالميثان واستخداماتها: اليوريا، الميثان، الجير الصودي، الكلوروفورم، الهالوثان، منظف التنظيف الجاف، الفريون 12، أسود الكربون، الغاز المائي، وغاز البوتاجاز."
      ],
      note: "راجع قسم 🧬 المركبات العضوية للتفاصيل الكاملة لكل مركب.",
      equations: [],
      summary: ["10 مركبات رئيسية موضحة باستخداماتها في قسم المركبات."]
    },
    {
      id: "s8", title: "8. قوانين الهيدروكربونات",
      paragraphs: [
        "توجد خمس صيغ عامة أساسية للهيدروكربونات: الألكانات CnH2n+2، الألكينات CnH2n، الألكاينات CnH2n-2، الألكانات الحلقية CnH2n، ومجموعة الألكيل CnH2n+1."
      ],
      note: "تذكّر: الألكينات والألكانات الحلقية لهما نفس الصيغة العامة CnH2n لكنهما مختلفتان في البنية.",
      equations: [],
      summary: ["5 صيغ عامة: ألكانات، ألكينات، ألكاينات، ألكانات حلقية، ألكيل."]
    },
    {
      id: "s9", title: "9. روابط سيجما",
      paragraphs: [
        "في الألكانات: عدد روابط سيجما بين ذرات الكربون فقط = n − 1، وعدد روابط سيجما بين الكربون والهيدروجين = 2n + 2، وعدد الروابط الكلية = 3n + 1. مثال: البروبان C3H8 له 2 رابطة C-C و8 روابط C-H أي 10 روابط سيجما كلية."
      ],
      note: "القانون الكلي 3n+1 يجمع نوعي الروابط معًا.",
      equations: [],
      summary: ["C-C = n−1، C-H = 2n+2، الإجمالي = 3n+1.", "مثال البروبان: 2 + 8 = 10 روابط سيجما."]
    },
    {
      id: "s10", title: "10. التقطير الجاف",
      paragraphs: [
        "التقطير الجاف لملح حمض كربوكسيلي صوديومي CnH2n+1COONa مع الجير الصودي NaOH+CaO ينتج دائمًا ألكانًا مشبعًا CnH2n+2 يقل بذرة كربون واحدة عن الملح الأصلي.",
        "أمثلة: أسيتات الصوديوم → الميثان، بروبانوات الصوديوم → الإيثان، بيوتانوات الصوديوم → البروبان."
      ],
      note: "الجير الصودي = NaOH + CaO، وCaO يخفض درجة انصهار المزيج.",
      equations: ["CH3COONa(s) + NaOH(s) --CaO / heat--> CH4(g) + Na2CO3(s)"],
      summary: ["الملح ينتج ألكانًا أقل بذرة كربون واحدة.", "أمثلة: أسيتات→ميثان، بروبانوات→إيثان، بيوتانوات→بروبان."]
    },
    {
      id: "s11", title: "11. السلسلة المتجانسة",
      paragraphs: [
        "السلسلة المتجانسة هي سلسلة من المركبات العضوية يجمعها قانون جزيئي عام، تشترك في خواصها الكيميائية، وتتدرج في خواصها الفيزيائية. يزيد كل مركب عن سابقه بمجموعة ميثيلين -(CH2)- كتلتها المولية 14 جم/مول.",
        "في الألكانات: الحالة الغازية من C1 إلى C4 (الميثان، الإيثان، البروبان، البيوتان)، الحالة السائلة من C5 إلى C17 (الجازولين والكيروسين)، والحالة الصلبة من C18 فأكثر (شمع البرافين والشحوم)."
      ],
      note: "فرق الكتلة المولية بين كل مركبين متتاليين = 14 g/mol.",
      equations: [],
      summary: ["كل حد يزيد عن السابق بـ CH2 (كتلته المولية 14 g/mol).", "غازات C1-C4، سوائل C5-C17، صلبة C18+."]
    }
  ],

  /* ---------------------- Flashcards ---------------------- */
  flashcards: [
    { front: "من الذي قسّم المركبات إلى عضوية وغير عضوية وصاغ نظرية القوة الحيوية؟ ومتى؟", back: "العالم برزيليوس، عام 1806." },
    { front: "من الذي أسقط نظرية القوة الحيوية، وكيف؟", back: "فوهلر عام 1828، بتحضير اليوريا معمليًا من كلوريد الأمونيوم وسيانات الفضة." },
    { front: "ما نسبة المركبات العضوية إلى غير العضوية تقريبًا؟", back: "20 : 1" },
    { front: "ما الصيغة العامة للألكانات؟", back: "CnH2n+2" },
    { front: "ما الصيغة العامة للألكينات؟", back: "CnH2n" },
    { front: "ما الصيغة العامة للألكاينات؟", back: "CnH2n-2" },
    { front: "ما الصيغة العامة لمجموعة الألكيل؟", back: "CnH2n+1" },
    { front: "ما قانون عدد روابط سيجما بين ذرات الكربون فقط في الألكانات؟", back: "n − 1" },
    { front: "ما قانون عدد روابط سيجما الكلية في جزيء الألكان؟", back: "3n + 1" },
    { front: "كم عدد روابط سيجما الكلية في البروبان C3H8؟", back: "10 روابط (2 بين الكربون + 8 بين الكربون والهيدروجين)." },
    { front: "ماذا ينتج التقطير الجاف لأسيتات الصوديوم مع الجير الصودي؟", back: "الميثان CH4 + Na2CO3" },
    { front: "ما نواتج الاحتراق التام للميثان؟", back: "CO2 + 2H2O + طاقة عالية" },
    { front: "ما الناتج الأول لهلجنة الميثان بالكلور تحت الأشعة فوق البنفسجية؟", back: "كلوروميثان CH3Cl + HCl" },
    { front: "ماذا ينتج عن تسخين الميثان عند 1000°م بمعزل عن الهواء؟", back: "أسود الكربون C + الهيدروجين H2" },
    { front: "ما مكوّنا الغاز المائي، وكيف يتكوّن؟", back: "CO + 3H2، من تفاعل الميثان مع بخار الماء عند 725°م بعامل حفاز." },
    { front: "ما هو الجير الصودي؟", back: "مزيج من NaOH و CaO يُستخدم في التقطير الجاف؛ CaO يخفض درجة انصهار المزيج." },
    { front: "لماذا تم إيقاف استخدام الكلوروفورم كمخدر؟", back: "لأن عدم التقدير الدقيق للجرعة يسبب الوفاة." },
    { front: "ما مكوّنا غاز البوتاجاز؟", back: "البروبان C3H8 والبيوتان C4H10" },
    { front: "بكم مقدار يزيد كل مركب في السلسلة المتجانسة عن الذي يسبقه؟", back: "بمجموعة ميثيلين -(CH2)- كتلتها المولية 14 g/mol." },
    { front: "ما مدى عدد ذرات الكربون للألكانات الغازية؟", back: "من C1 إلى C4 (الميثان، الإيثان، البروبان، البيوتان)." }
  ],

  /* ---------------------- Quiz (12 سؤال) ---------------------- */
  quiz: [
    {
      q: "من صاغ نظرية القوة الحيوية وقسّم المركبات إلى عضوية وغير عضوية؟",
      type: "mc",
      options: ["فوهلر", "برزيليوس", "لافوازييه", "مندليف"],
      correct: 1,
      explain: "برزيليوس هو من صاغ نظرية القوة الحيوية عام 1806."
    },
    {
      q: "حضّر فوهلر اليوريا معمليًا عام 1828.",
      type: "tf",
      correct: true,
      explain: "صحيح، وهذا أسقط نظرية القوة الحيوية."
    },
    {
      q: "نسبة المركبات العضوية إلى غير العضوية تقريبًا هي:",
      type: "mc",
      options: ["1 : 1", "5 : 1", "20 : 1", "100 : 1"],
      correct: 2,
      explain: "النسبة التقريبية هي 20 : 1 لصالح المركبات العضوية."
    },
    {
      q: "المركبات العضوية توصّل الكهرباء جيدًا بشكل عام.",
      type: "tf",
      correct: false,
      explain: "خطأ، المركبات العضوية لا إلكتروليتية (لا توصّل الكهرباء) بشكل عام، بعكس أغلب غير العضوية."
    },
    {
      q: "ما ناتج تفاعل: CH4 + 2O2 --heat--> ؟",
      type: "equation",
      options: ["CO2 + 2H2O + Energy", "CO + H2O", "C + 2H2O", "CH3Cl + HCl"],
      correct: 0,
      explain: "احتراق الميثان التام ينتج CO2 وبخار ماء وطاقة عالية."
    },
    {
      q: "ما ناتج الخطوة الأولى من هلجنة الميثان بالكلور تحت الأشعة فوق البنفسجية؟",
      type: "equation",
      options: ["CH2Cl2 + HCl", "CH3Cl + HCl", "CCl4 + HCl", "CHCl3 + HCl"],
      correct: 1,
      explain: "CH4 + Cl2 --UV--> CH3Cl + HCl هي الخطوة الأولى."
    },
    {
      q: "ما الصيغة العامة للألكانات؟",
      type: "mc",
      options: ["CnH2n", "CnH2n+2", "CnH2n-2", "CnH2n+1"],
      correct: 1,
      explain: "الألكانات (البرافينات) صيغتها العامة CnH2n+2."
    },
    {
      q: "عدد روابط سيجما الكلية في جزيء الألكان يساوي n − 1.",
      type: "tf",
      correct: false,
      explain: "خطأ، n − 1 هو عدد روابط C-C فقط. الإجمالي الكلي = 3n + 1."
    },
    {
      q: "كم عدد روابط سيجما الكلية في البروبان C3H8؟",
      type: "mc",
      options: ["8", "9", "10", "12"],
      correct: 2,
      explain: "3n+1 = (3×3)+1 = 10 روابط سيجما كلية."
    },
    {
      q: "التقطير الجاف لأسيتات الصوديوم مع الجير الصودي ينتج:",
      type: "mc",
      options: ["الإيثان", "الميثان", "البروبان", "اليوريا"],
      correct: 1,
      explain: "أسيتات الصوديوم (ذرة كربون واحدة) تنتج الميثان بالتقطير الجاف."
    },
    {
      q: "يُستخدم الكلوروفورم حاليًا كمخدر آمن في العمليات الجراحية.",
      type: "tf",
      correct: false,
      explain: "خطأ، تم إيقافه لخطورته، واستُبدل بالهالوثان كمخدر آمن حديث."
    },
    {
      q: "ما نواتج تسخين الميثان عند 1000°م بمعزل عن الهواء؟",
      type: "equation",
      options: ["CO + 3H2", "C + 2H2", "CO2 + 2H2O", "CH3Cl + HCl"],
      correct: 1,
      explain: "CH4 --1000C, no air--> C(s) + 2H2(g) لإنتاج أسود الكربون."
    }
  ]
};

/* ==========================================================================
   APP UTILITIES
   دوال مساعدة مشتركة بين أكثر من قسم (البحث، المركبات، التفاعلات، خريطة
   التفاعلات، البحث العام) — لذلك بقيت على مستوى الموديول بدل تكرارها.
   ========================================================================== */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const allCompounds = [...chemistryData.compounds, ...chemistryData.additionalCompounds];
const byId = Object.fromEntries(allCompounds.map(c => [c.id, c]));

const esc = value => String(value ?? '').replace(/[&<>"']/g, m => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]
));
const eq = value => `<div class="equation ltr-chem">${esc(value)}</div>`;
const norm = value => String(value || '').trim().toLowerCase().replace(/[−–—]/g, '-').replace(/\s+/g, '');

function findCompound(query) {
  const q = norm(query);
  if (!q) return null;

  const byNameOrFormula = allCompounds.find(c => [
    c.names?.arabic, c.names?.iupac, c.names?.common, c.formula, ...(c.aliases || [])
  ].some(v => norm(v) === q));
  if (byNameOrFormula) return byNameOrFormula;

  // Safe alkane formula recognition: only formulas actually represented in the local database.
  const match = q.match(/^c(\d+)h(\d+)$/i);
  if (match) {
    const expectedHydrogens = 2 * Number(match[1]) + 2;
    if (Number(match[2]) === expectedHydrogens) {
      return allCompounds.find(c => norm(c.formula) === q) || null;
    }
  }
  return null;
}

function renderReaction(r) {
  const typeLabel = (chemistryData.reactionTypes.find(t => t.id === r.type) || {}).label || r.type;
  return `<article class="card reaction-card">
    <h3 class="reaction-card-title">${esc(r.nameArabic)}</h3>
    <div class="reaction-card-sub" dir="ltr">${esc(r.nameStandard)}</div>
    ${eq(r.equation)}
    <div class="reaction-meta"><span>الشروط: ${esc(r.conditions)}</span><span>النواتج: ${esc(r.products)}</span></div>
    <span class="reaction-type-badge">${esc(typeLabel)}</span>
    <div class="reaction-desc">${esc(r.desc)}</div>
  </article>`;
}

function renderCompound(c) {
  const reactions = chemistryData.reactions.filter(r => r.compoundIds.includes(c.id));
  const related = (c.related || []).map(id => byId[id]).filter(Boolean);
  return `<div class="card result-card">
    <div class="result-header"><h3>${esc(c.names.arabic)}</h3><span class="result-badge">${esc(c.typeLabel)}</span></div>
    <div class="result-grid">
      <div><label>IUPAC</label><b dir="ltr">${esc(c.names.iupac)}</b></div>
      <div><label>Common Name</label><b dir="ltr">${esc(c.names.common || '—')}</b></div>
      <div><label>Formula</label><b dir="ltr" class="ltr-chem">${esc(c.formula)}</b></div>
      <div><label>التصنيف</label><b>${esc(c.typeLabel)}</b></div>
    </div>
    <p>${esc(c.use)}</p>
    ${reactions.length
      ? `<h4 class="result-reactions-title">🧪 تفاعلات المركب</h4><div class="reactions-grid">${reactions.map(renderReaction).join('')}</div>`
      : '<p class="section-desc">لا توجد تفاعلات مرتبطة بهذا المركب في قاعدة بيانات الملخص.</p>'}
    ${related.length
      ? `<h4 class="result-reactions-title">🔗 مركبات مرتبطة</h4><div class="related-compounds">${related.map(x => `<button type="button" class="related-chip" data-compound-id="${esc(x.id)}">${esc(x.formula)}</button>`).join('')}</div>`
      : ''}
  </div>`;
}

function showCompound(c) {
  const box = $('#searchResult');
  if (!box || !c) return;
  box.hidden = false;
  box.innerHTML = renderCompound(c);
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
}

/* ==========================================================================
   NAVIGATION
   تطبيق واحد فقط مسؤول عن الـ Navbar/Hamburger/Mobile Menu وتمييز الرابط
   النشط. لا يوجد أي منطق تنقل آخر في أي مكان غير هذه الدالة.
   ========================================================================== */
function initNavigation() {
  const navbar = $('#navbar');
  const hamburger = $('#hamburgerBtn');
  const menu = $('#navLinks');
  if (!navbar) return;

  // Keep --navbar-height in sync with the real rendered height, so the
  // mobile drawer and scroll-margin-top never drift from the actual navbar
  // (fixes overlap/gap issues at narrow widths where the brand or links wrap).
  const syncNavbarHeight = () => {
    document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`);
  };
  syncNavbarHeight();
  window.addEventListener('resize', syncNavbarHeight);
  if ('ResizeObserver' in window) {
    new ResizeObserver(syncNavbarHeight).observe(navbar);
  }

  if (hamburger && menu) {
    const openMenu = () => {
      menu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
    };
    const closeMenu = () => {
      menu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', event => {
      event.stopPropagation();
      menu.classList.contains('open') ? closeMenu() : openMenu();
    });

    $$('[data-nav]', menu).forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', event => {
      if (menu.classList.contains('open') && !menu.contains(event.target) && !hamburger.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  // Highlight the nav link matching the section currently in view.
  // In-page navigation itself relies on native anchor behaviour plus
  // `scroll-behavior: smooth` and `scroll-margin-top` in the CSS — no
  // manual scroll math, no preventDefault, no history hacks, so it behaves
  // identically whether the page is opened via file:// or a local server.
  const sections = $$('main section[id]');
  const navLinks = $$('[data-nav]');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -55%' });
    sections.forEach(section => observer.observe(section));
  }
}

/* ==========================================================================
   COMPOUND SEARCH (hero search box)
   ========================================================================== */
function initCompoundSearch() {
  const form = $('#compoundSearchForm');
  const input = $('#compoundInput');
  const box = $('#searchResult');
  if (!form || !input || !box) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const compound = findCompound(input.value);
    if (!compound) {
      box.hidden = false;
      box.innerHTML = `<div class="card result-card">
        <p class="not-found">المركب غير موجود في قاعدة البيانات المحلية.</p>
        <small>ابحث باسم عربي/إنجليزي أو صيغة موجودة في الموقع.</small>
      </div>`;
      return;
    }
    showCompound(compound);
  });

  $$('.chip[data-example]').forEach(chip => chip.addEventListener('click', () => {
    input.value = chip.dataset.example;
    form.requestSubmit();
  }));

  box.addEventListener('click', event => {
    const button = event.target.closest('[data-compound-id]');
    if (button) showCompound(byId[button.dataset.compoundId]);
  });
}

/* ==========================================================================
   REACTIONS (filterable grid)
   ========================================================================== */
function initReactions() {
  const tabs = $('#reactionTabs');
  const grid = $('#reactionsGrid');
  if (!tabs || !grid) return;

  tabs.innerHTML = chemistryData.reactionTypes.map(t => (
    `<button type="button" class="tab-btn${t.id === 'all' ? ' active' : ''}" data-type="${esc(t.id)}" role="tab">${esc(t.icon)} ${esc(t.label)}</button>`
  )).join('');

  const render = type => {
    const reactions = type === 'all' ? chemistryData.reactions : chemistryData.reactions.filter(r => r.type === type);
    grid.innerHTML = reactions.map(renderReaction).join('');
  };
  render('all');

  tabs.addEventListener('click', event => {
    const button = event.target.closest('.tab-btn');
    if (!button) return;
    $$('.tab-btn', tabs).forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    render(button.dataset.type);
  });
}

/* ==========================================================================
   COMPOUNDS GRID
   ========================================================================== */
function initCompounds() {
  const grid = $('#compoundsGrid');
  if (!grid) return;

  grid.innerHTML = allCompounds.map(c => (
    `<article class="card compound-card" data-compound-id="${esc(c.id)}">
      <h3>${esc(c.names.arabic)}</h3>
      <div dir="ltr" class="formula equation">${esc(c.formula)}</div>
      <div class="compound-class">${esc(c.typeLabel)}</div>
      <div class="compound-use">${esc(c.use)}</div>
    </article>`
  )).join('');

  grid.addEventListener('click', event => {
    const card = event.target.closest('[data-compound-id]');
    if (card) showCompound(byId[card.dataset.compoundId]);
  });
}

/* ==========================================================================
   METHANE REACTION MAP
   ========================================================================== */
function initReactionMap() {
  const root = $('#reactionMap');
  if (!root) return;

  const reactionIds = ['r8', 'r6', 'r12', 'r13'];
  const branches = reactionIds.map(id => {
    const reaction = chemistryData.reactions.find(r => r.id === id);
    if (!reaction) return '';
    const product = reaction.products.split('+')[0].trim();
    const targetId = reaction.compoundIds.find(cid => cid !== 'methane') || '';
    return `<div class="map-branch">
      <div class="map-line"></div>
      <div class="map-condition">${esc(reaction.conditions)}</div>
      <button type="button" class="map-product-btn" data-compound-id="${esc(targetId)}" data-product="${esc(product)}">${esc(product)}</button>
    </div>`;
  }).join('');

  root.innerHTML = `<div class="map-tree">
    <div class="map-root">CH4</div>
    <div class="map-branches">${branches}</div>
    <div id="mapDetail" class="map-detail"></div>
  </div>`;

  root.addEventListener('click', event => {
    const button = event.target.closest('.map-product-btn');
    if (!button) return;
    const compound = byId[button.dataset.compoundId];
    const detail = $('#mapDetail', root);
    detail.innerHTML = compound
      ? renderCompound(compound)
      : `<p>الناتج <b dir="ltr">${esc(button.dataset.product)}</b> غير مسجل كمركب مستقل في قاعدة البيانات.</p>`;
  });
}

/* ==========================================================================
   FORMULAS / SIGMA BONDS / DRY DISTILLATION / HOMOLOGOUS SERIES
   ========================================================================== */
function initFormulas() {
  const formulasGrid = $('#formulasGrid');
  if (formulasGrid) {
    formulasGrid.innerHTML = chemistryData.formulas.map(f => (
      `<article class="card formula-card"><h4>${esc(f.name)}</h4>${eq(f.equation)}<p>${esc(f.note)}</p></article>`
    )).join('');
  }

  const sigmaCard = $('#sigmaCard');
  if (sigmaCard) {
    sigmaCard.innerHTML = `<div class="sigma-rules">${chemistryData.sigma.rules.map(rule => `<div>${esc(rule)}</div>`).join('')}</div>
      <div class="sigma-example">
        <b>${esc(chemistryData.sigma.example.title)}</b>
        ${chemistryData.sigma.example.lines.map(line => `<p>${esc(line)}</p>`).join('')}
      </div>`;
  }

  const distillationFlow = $('#distillationFlow');
  if (distillationFlow) {
    distillationFlow.innerHTML = `<p>${esc(chemistryData.distillation.rule)}</p>
      <div class="dist-flow-steps">${chemistryData.distillation.flow.map((step, i) => (i ? '<div class="dist-arrow">↓</div>' : '') + eq(step)).join('')}</div>
      <div class="dist-examples">${chemistryData.distillation.examples.map(example => `<div>${esc(example)}</div>`).join('')}</div>`;
  }

  const homologousCard = $('#homologousCard');
  if (homologousCard) {
    homologousCard.innerHTML = `<p>${esc(chemistryData.homologous.intro)}</p>
      <div class="homologous-groups">${chemistryData.homologous.groups.map(group => (
        `<div class="hg-card"><h5>${esc(group.title)}</h5><b dir="ltr">${esc(group.range)}</b><p>${esc(group.detail)}</p></div>`
      )).join('')}</div>`;
  }
}

/* ==========================================================================
   STUDY SECTIONS (accordion + progress tracking)
   ========================================================================== */
const STUDY_DONE_KEY = 'organicStudyDone';

function getDoneSections() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STUDY_DONE_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

function updateProgress() {
  const done = getDoneSections();
  const pct = Math.round((done.size / chemistryData.sections.length) * 100);
  const label = $('#progressPercentLabel');
  if (label) label.textContent = `${pct}%`;
  [$('#progressBarInner'), $('#navProgressFill')].forEach(el => {
    if (el) el.style.width = `${pct}%`;
  });
}

function initStudy() {
  const list = $('#studySectionsList');
  if (!list) return;

  const done = getDoneSections();

  list.innerHTML = chemistryData.sections.map(s => `<article class="study-item${done.has(s.id) ? ' done' : ''}" data-section="${esc(s.id)}">
    <button type="button" class="study-item-header" aria-expanded="false">
      <span>${esc(s.title)}</span>
      <span><span class="check">✓</span> <span class="arrow">▼</span></span>
    </button>
    <div class="study-item-body">
      <div>${s.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}</div>
      ${s.note ? `<div class="study-note"><b>ملاحظة مهمة:</b> ${esc(s.note)}</div>` : ''}
      ${s.equations?.length ? `<div class="study-eq-list">${s.equations.map(eq).join('')}</div>` : ''}
      <div class="study-summary">
        <h4>⚡ الخلاصة في 10 ثواني</h4>
        <ul>${s.summary.map(item => `<li>${esc(item)}</li>`).join('')}</ul>
      </div>
      <button type="button" class="btn btn-outline btn-sm mark-done-btn">${done.has(s.id) ? 'إلغاء الإنهاء' : 'أنهيت هذا القسم ✓'}</button>
    </div>
  </article>`).join('');

  list.addEventListener('click', event => {
    const header = event.target.closest('.study-item-header');
    if (header) {
      const item = header.closest('.study-item');
      const open = item.classList.toggle('open');
      header.setAttribute('aria-expanded', String(open));
      return;
    }

    const markDoneBtn = event.target.closest('.mark-done-btn');
    if (!markDoneBtn) return;
    const item = markDoneBtn.closest('.study-item');
    const id = item.dataset.section;

    done.has(id) ? done.delete(id) : done.add(id);
    localStorage.setItem(STUDY_DONE_KEY, JSON.stringify([...done]));
    item.classList.toggle('done', done.has(id));
    markDoneBtn.textContent = done.has(id) ? 'إلغاء الإنهاء' : 'أنهيت هذا القسم ✓';
    updateProgress();
    toast(done.has(id) ? 'جامد! واحدة كمان 🔥' : 'تم التحديث');
  });

  updateProgress();
}

/* ==========================================================================
   FLASHCARDS
   ========================================================================== */
function initFlashcards() {
  const card = $('#flashcard');
  if (!card) return;

  const front = $('#flashcardFront');
  const back = $('#flashcardBack');
  const counter = $('#flashcardCounter');
  const flipBtn = $('#flipFlashcardBtn');
  const prevBtn = $('#prevFlashcard');
  const nextBtn = $('#nextFlashcard');
  const shuffleBtn = $('#shuffleFlashcards');

  let index = 0;
  let deck = [...chemistryData.flashcards];

  const render = () => {
    const item = deck[index];
    if (!item) return;
    front.textContent = item.front;
    back.textContent = item.back;
    counter.textContent = `${index + 1} / ${deck.length}`;
    card.classList.remove('flipped');
  };

  const flip = () => card.classList.toggle('flipped');

  card.addEventListener('click', flip);
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      flip();
    }
  });
  flipBtn?.addEventListener('click', flip);
  prevBtn?.addEventListener('click', () => {
    index = (index - 1 + deck.length) % deck.length;
    render();
  });
  nextBtn?.addEventListener('click', () => {
    index = (index + 1) % deck.length;
    render();
  });
  shuffleBtn?.addEventListener('click', () => {
    deck = [...deck].sort(() => Math.random() - 0.5);
    index = 0;
    render();
    toast('تم خلط البطاقات 🔀');
  });

  render();
}

/* ==========================================================================
   QUIZ
   ========================================================================== */
function initQuiz() {
  const startBtn = $('#startQuizBtn');
  const intro = $('#quizIntro');
  const area = $('#quizArea');
  const result = $('#quizResult');
  if (!startBtn || !intro || !area || !result) return;

  let index = 0;
  let score = 0;

  function renderQuestion() {
    const q = chemistryData.quiz[index];
    const options = q.type === 'tf' ? ['صح', 'خطأ'] : q.options;
    area.innerHTML = `<div class="card quiz-question-card">
      <div class="quiz-progress">السؤال ${index + 1} من ${chemistryData.quiz.length}</div>
      <div class="quiz-question-text">${esc(q.q)}</div>
      <div class="quiz-options">${options.map((o, i) => `<button type="button" class="quiz-option" data-answer="${i}">${esc(o)}</button>`).join('')}</div>
      <div id="quizFeedback"></div>
    </div>`;
    $$('.quiz-option', area).forEach(btn => btn.addEventListener('click', () => answerQuestion(Number(btn.dataset.answer), q)));
  }

  function answerQuestion(answer, q) {
    const correct = q.type === 'tf' ? (answer === 0) === q.correct : answer === q.correct;
    const buttons = $$('.quiz-option', area);
    buttons.forEach(btn => { btn.disabled = true; });

    const correctIndex = q.type === 'tf' ? (q.correct ? 0 : 1) : q.correct;
    buttons[correctIndex]?.classList.add('correct');
    if (!correct) buttons[answer]?.classList.add('incorrect');
    else score += 1;

    const isLast = index + 1 === chemistryData.quiz.length;
    $('#quizFeedback').innerHTML = `
      <div class="quiz-feedback ${correct ? 'correct-text' : 'incorrect-text'}">${correct ? 'برافو! 🧪🔥' : 'قريبة! راجع النقطة دي 👀'}</div>
      <div class="quiz-explain">${esc(q.explain)}</div>
      <button type="button" class="btn btn-primary quiz-next-btn" id="quizNext">${isLast ? 'النتيجة' : 'السؤال التالي'}</button>`;

    $('#quizNext').addEventListener('click', () => {
      index += 1;
      if (index < chemistryData.quiz.length) renderQuestion();
      else showResult();
    });
  }

  function showResult() {
    const pct = Math.round((score / chemistryData.quiz.length) * 100);
    area.hidden = true;
    result.hidden = false;
    const message = pct >= 80 ? 'الكربون فخور بيك 😂🧪' : pct >= 50 ? 'ممتاز، كمل مراجعة النقاط اللي غلطت فيها 💪' : 'ولا يهمك… نعيدها واحدة واحدة 👀';
    result.innerHTML = `<div class="score-num">${score} / ${chemistryData.quiz.length}</div>
      <p>${message}</p>
      <button type="button" class="btn btn-outline" id="retryQuiz">إعادة الاختبار</button>`;
    $('#retryQuiz').addEventListener('click', () => startBtn.click());
  }

  startBtn.addEventListener('click', () => {
    index = 0;
    score = 0;
    intro.hidden = true;
    result.hidden = true;
    area.hidden = false;
    renderQuestion();
  });
}

/* ==========================================================================
   SITE-WIDE SEARCH
   ========================================================================== */
function initSiteSearch() {
  const input = $('#siteSearchInput');
  const out = $('#siteSearchResults');
  if (!input || !out) return;

  let hits = [];

  input.addEventListener('input', () => {
    const q = norm(input.value);
    if (q.length < 2) {
      out.hidden = true;
      hits = [];
      return;
    }

    hits = [];
    chemistryData.sections.forEach(s => {
      if (norm(`${s.title} ${s.paragraphs.join(' ')}`).includes(q)) {
        hits.push({ title: s.title, desc: 'قسم المذاكرة', anchor: '#study' });
      }
    });
    allCompounds.forEach(c => {
      if (norm([c.names.arabic, c.names.iupac, c.names.common, c.formula, ...(c.aliases || [])].join(' ')).includes(q)) {
        hits.push({ title: c.names.arabic, desc: c.formula, anchor: c.id });
      }
    });
    chemistryData.reactions.forEach(r => {
      if (norm(`${r.nameArabic} ${r.nameStandard} ${r.equation} ${r.desc}`).includes(q)) {
        hits.push({ title: r.nameArabic, desc: r.equation, anchor: '#reactions' });
      }
    });
    chemistryData.formulas.forEach(f => {
      if (norm(`${f.name} ${f.equation} ${f.note}`).includes(q)) {
        hits.push({ title: f.name, desc: f.equation, anchor: '#formulas' });
      }
    });
    chemistryData.flashcards.forEach(f => {
      if (norm(`${f.front} ${f.back}`).includes(q)) {
        hits.push({ title: f.front, desc: 'Flashcard', anchor: '#flashcards' });
      }
    });

    hits = hits.slice(0, 12);
    out.hidden = hits.length === 0;
    out.innerHTML = hits.length
      ? hits.map((h, i) => `<button type="button" class="site-search-item" data-hit="${i}"><b>${esc(h.title)}</b><small>${esc(h.desc)}</small></button>`).join('')
      : '<div class="site-search-item">لا توجد نتائج.</div>';
  });

  out.addEventListener('click', event => {
    const button = event.target.closest('[data-hit]');
    if (!button) return;
    const hit = hits[Number(button.dataset.hit)];
    if (!hit) return;
    if (hit.anchor.startsWith('#')) {
      document.querySelector(hit.anchor)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      showCompound(byId[hit.anchor]);
    }
    out.hidden = true;
  });
}

/* ==========================================================================
   THEME (dark/light mode + focused study mode)
   ========================================================================== */
function initTheme() {
  const darkBtn = $('#darkModeBtn');
  const studyBtn = $('#studyModeBtn');

  if (darkBtn) {
    const isDark = localStorage.getItem('organicDark') !== 'off';
    document.body.classList.toggle('light-mode', !isDark);
    darkBtn.textContent = isDark ? '☀️' : '🌙';
    darkBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('organicDark', isLight ? 'off' : 'on');
      darkBtn.textContent = isLight ? '🌙' : '☀️';
    });
  }

  if (studyBtn) {
    const isStudyMode = localStorage.getItem('organicStudyMode') === 'on';
    document.body.classList.toggle('study-mode', isStudyMode);
    studyBtn.classList.toggle('active', isStudyMode);
    studyBtn.addEventListener('click', () => {
      const on = document.body.classList.toggle('study-mode');
      localStorage.setItem('organicStudyMode', on ? 'on' : 'off');
      studyBtn.classList.toggle('active', on);
    });
  }
}

/* ==========================================================================
   APP ENTRY POINT
   ========================================================================== */
function initApp() {
  initNavigation();
  initCompoundSearch();
  initReactions();
  initCompounds();
  initReactionMap();
  initFormulas();
  initStudy();
  initFlashcards();
  initQuiz();
  initSiteSearch();
  initTheme();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

})();
