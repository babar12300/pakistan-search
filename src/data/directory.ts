export type Lang = "en" | "ur";
export type Localized = Record<Lang, string>;

export type CategoryId =
  | "news"
  | "government"
  | "education"
  | "travel"
  | "shopping"
  | "finance"
  | "telecom"
  | "sports"
  | "health"
  | "culture";

export type CityId =
  | "nationwide"
  | "karachi"
  | "lahore"
  | "islamabad"
  | "rawalpindi"
  | "peshawar"
  | "gilgit"
  | "larkana"
  | "swat"
  | "taxila";

export const CATEGORIES: { id: CategoryId; label: Localized }[] = [
  { id: "news", label: { en: "News", ur: "خبریں" } },
  { id: "government", label: { en: "Government", ur: "حکومت" } },
  { id: "education", label: { en: "Education", ur: "تعلیم" } },
  { id: "travel", label: { en: "Travel & Places", ur: "سیاحت و مقامات" } },
  { id: "shopping", label: { en: "Shopping & Services", ur: "خریداری و خدمات" } },
  { id: "finance", label: { en: "Banking & Finance", ur: "بینکاری و مالیات" } },
  { id: "telecom", label: { en: "Telecom", ur: "ٹیلی کام" } },
  { id: "sports", label: { en: "Sports", ur: "کھیل" } },
  { id: "health", label: { en: "Health", ur: "صحت" } },
  { id: "culture", label: { en: "Culture & Food", ur: "ثقافت و کھانے" } },
];

export const CITIES: Record<CityId, Localized> = {
  nationwide: { en: "Nationwide", ur: "ملک بھر" },
  karachi: { en: "Karachi", ur: "کراچی" },
  lahore: { en: "Lahore", ur: "لاہور" },
  islamabad: { en: "Islamabad", ur: "اسلام آباد" },
  rawalpindi: { en: "Rawalpindi", ur: "راولپنڈی" },
  peshawar: { en: "Peshawar", ur: "پشاور" },
  gilgit: { en: "Gilgit-Baltistan", ur: "گلگت بلتستان" },
  larkana: { en: "Larkana", ur: "لاڑکانہ" },
  swat: { en: "Swat", ur: "سوات" },
  taxila: { en: "Taxila", ur: "ٹیکسلا" },
};

export type Entry = {
  id: string;
  url: string;
  category: CategoryId;
  city: CityId;
  title: Localized;
  description: Localized;
  tags: string[];
};

export const DIRECTORY: Entry[] = [
  // News
  {
    id: "dawn",
    url: "https://www.dawn.com",
    category: "news",
    city: "karachi",
    title: { en: "Dawn", ur: "ڈان" },
    description: {
      en: "Pakistan's oldest English-language newspaper, founded by Quaid-e-Azam. National news, opinion and business.",
      ur: "پاکستان کا سب سے پرانا انگریزی اخبار جسے قائداعظم نے قائم کیا۔ قومی خبریں، رائے اور کاروبار۔",
    },
    tags: ["newspaper", "english news", "opinion", "اخبار", "خبر"],
  },
  {
    id: "geo",
    url: "https://www.geo.tv",
    category: "news",
    city: "karachi",
    title: { en: "Geo News", ur: "جیو نیوز" },
    description: {
      en: "24-hour news channel with breaking news, politics, cricket and live TV.",
      ur: "چوبیس گھنٹے کا نیوز چینل — تازہ خبریں، سیاست، کرکٹ اور لائیو ٹی وی۔",
    },
    tags: ["tv", "breaking news", "live", "ٹی وی", "تازہ خبریں", "خبر"],
  },
  {
    id: "jang",
    url: "https://jang.com.pk",
    category: "news",
    city: "karachi",
    title: { en: "Daily Jang", ur: "روزنامہ جنگ" },
    description: {
      en: "Pakistan's most widely read Urdu newspaper.",
      ur: "پاکستان کا سب سے زیادہ پڑھا جانے والا اردو اخبار۔",
    },
    tags: ["urdu newspaper", "اردو اخبار", "اخبار", "خبر"],
  },
  {
    id: "tribune",
    url: "https://tribune.com.pk",
    category: "news",
    city: "karachi",
    title: { en: "The Express Tribune", ur: "ایکسپریس ٹریبیون" },
    description: {
      en: "English daily covering Pakistan, world news, business, sports and life & style.",
      ur: "انگریزی روزنامہ — پاکستان، دنیا، کاروبار، کھیل اور طرزِ زندگی۔",
    },
    tags: ["newspaper", "english news", "اخبار", "خبر"],
  },
  {
    id: "thenews",
    url: "https://www.thenews.com.pk",
    category: "news",
    city: "karachi",
    title: { en: "The News International", ur: "دی نیوز انٹرنیشنل" },
    description: {
      en: "English daily from the Jang Group with national and regional coverage.",
      ur: "جنگ گروپ کا انگریزی روزنامہ، قومی اور علاقائی خبریں۔",
    },
    tags: ["newspaper", "english news", "اخبار", "خبر"],
  },
  {
    id: "ary",
    url: "https://arynews.tv",
    category: "news",
    city: "karachi",
    title: { en: "ARY News", ur: "اے آر وائی نیوز" },
    description: {
      en: "News channel with live coverage of Pakistan politics, business and entertainment.",
      ur: "نیوز چینل — سیاست، کاروبار اور تفریح کی لائیو کوریج۔",
    },
    tags: ["tv", "live", "ٹی وی", "خبر"],
  },
  {
    id: "brecorder",
    url: "https://www.brecorder.com",
    category: "news",
    city: "karachi",
    title: { en: "Business Recorder", ur: "بزنس ریکارڈر" },
    description: {
      en: "Pakistan's financial daily: markets, economy, commodities and the stock exchange.",
      ur: "پاکستان کا مالیاتی اخبار — مارکیٹیں، معیشت اور اسٹاک ایکسچینج۔",
    },
    tags: ["business news", "economy", "markets", "معیشت", "کاروبار", "خبر"],
  },
  {
    id: "samaa",
    url: "https://www.samaa.tv",
    category: "news",
    city: "karachi",
    title: { en: "Samaa TV", ur: "سما ٹی وی" },
    description: {
      en: "News channel and website with Urdu and English coverage.",
      ur: "نیوز چینل اور ویب سائٹ، اردو اور انگریزی میں۔",
    },
    tags: ["tv", "live", "ٹی وی", "خبر"],
  },

  // Government
  {
    id: "pakistan-gov",
    url: "https://www.pakistan.gov.pk",
    category: "government",
    city: "islamabad",
    title: { en: "Pakistan National Portal", ur: "پاکستان قومی پورٹل" },
    description: {
      en: "Official gateway to the Government of Pakistan: ministries, services and information.",
      ur: "حکومتِ پاکستان کا سرکاری پورٹل — وزارتیں، خدمات اور معلومات۔",
    },
    tags: ["government", "ministries", "official", "سرکاری", "وزارت"],
  },
  {
    id: "nadra",
    url: "https://www.nadra.gov.pk",
    category: "government",
    city: "islamabad",
    title: { en: "NADRA", ur: "نادرا" },
    description: {
      en: "National Database & Registration Authority — CNIC, NICOP, B-form and identity services.",
      ur: "قومی ڈیٹا بیس اور رجسٹریشن اتھارٹی — شناختی کارڈ، نائیکوپ اور ب فارم۔",
    },
    tags: ["cnic", "id card", "nicop", "b-form", "identity", "شناختی کارڈ", "شناخت"],
  },
  {
    id: "dgip",
    url: "https://www.dgip.gov.pk",
    category: "government",
    city: "islamabad",
    title: { en: "Immigration & Passports (DGIP)", ur: "امیگریشن و پاسپورٹ" },
    description: {
      en: "Apply for or renew a Pakistani passport and check application status.",
      ur: "پاکستانی پاسپورٹ کے لیے درخواست، تجدید اور اسٹیٹس۔",
    },
    tags: ["passport", "visa", "immigration", "پاسپورٹ", "ویزا"],
  },
  {
    id: "fbr",
    url: "https://www.fbr.gov.pk",
    category: "government",
    city: "islamabad",
    title: { en: "Federal Board of Revenue (FBR)", ur: "فیڈرل بورڈ آف ریونیو" },
    description: {
      en: "Income tax returns, NTN registration, the Active Taxpayers List and customs.",
      ur: "انکم ٹیکس ریٹرن، این ٹی این رجسٹریشن، فعال ٹیکس دہندگان کی فہرست اور کسٹمز۔",
    },
    tags: ["tax", "ntn", "income tax", "customs", "ٹیکس", "کسٹمز"],
  },
  {
    id: "ecp",
    url: "https://www.ecp.gov.pk",
    category: "government",
    city: "islamabad",
    title: { en: "Election Commission of Pakistan", ur: "الیکشن کمیشن آف پاکستان" },
    description: {
      en: "Elections, voter registration, results and constituency information.",
      ur: "انتخابات، ووٹر رجسٹریشن، نتائج اور حلقوں کی معلومات۔",
    },
    tags: ["election", "vote", "voter", "انتخابات", "ووٹ", "الیکشن"],
  },
  {
    id: "pbs",
    url: "https://www.pbs.gov.pk",
    category: "government",
    city: "islamabad",
    title: { en: "Pakistan Bureau of Statistics", ur: "ادارہ شماریات پاکستان" },
    description: {
      en: "Census, inflation, population and economic statistics.",
      ur: "مردم شماری، مہنگائی، آبادی اور معاشی اعداد و شمار۔",
    },
    tags: ["census", "statistics", "population", "inflation", "مردم شماری", "آبادی", "مہنگائی"],
  },
  {
    id: "pta",
    url: "https://www.pta.gov.pk",
    category: "government",
    city: "islamabad",
    title: { en: "Pakistan Telecommunication Authority", ur: "پاکستان ٹیلی کمیونیکیشن اتھارٹی" },
    description: {
      en: "Mobile phone registration (DIRBS), telecom complaints and regulations.",
      ur: "موبائل فون رجسٹریشن، ٹیلی کام شکایات اور ضوابط۔",
    },
    tags: ["pta", "phone registration", "dirbs", "mobile", "موبائل"],
  },
  {
    id: "pmd",
    url: "https://www.pmd.gov.pk",
    category: "government",
    city: "islamabad",
    title: { en: "Pakistan Meteorological Department", ur: "محکمہ موسمیات پاکستان" },
    description: {
      en: "Weather forecasts, monsoon updates, rainfall and earthquake reports.",
      ur: "موسم کی پیشگوئی، مون سون، بارش اور زلزلے کی رپورٹس۔",
    },
    tags: ["weather", "forecast", "rain", "monsoon", "موسم", "بارش"],
  },
  {
    id: "punjab-gov",
    url: "https://punjab.gov.pk",
    category: "government",
    city: "lahore",
    title: { en: "Government of Punjab", ur: "حکومتِ پنجاب" },
    description: {
      en: "Official portal of the Punjab provincial government.",
      ur: "صوبائی حکومتِ پنجاب کا سرکاری پورٹل۔",
    },
    tags: ["punjab", "province", "پنجاب", "صوبہ", "سرکاری"],
  },
  {
    id: "sindh-gov",
    url: "https://www.sindh.gov.pk",
    category: "government",
    city: "karachi",
    title: { en: "Government of Sindh", ur: "حکومتِ سندھ" },
    description: {
      en: "Official portal of the Sindh provincial government.",
      ur: "صوبائی حکومتِ سندھ کا سرکاری پورٹل۔",
    },
    tags: ["sindh", "province", "سندھ", "صوبہ", "سرکاری"],
  },
  {
    id: "kp-gov",
    url: "https://kp.gov.pk",
    category: "government",
    city: "peshawar",
    title: { en: "Government of Khyber Pakhtunkhwa", ur: "حکومتِ خیبر پختونخوا" },
    description: {
      en: "Official portal of the Khyber Pakhtunkhwa provincial government.",
      ur: "صوبائی حکومتِ خیبر پختونخوا کا سرکاری پورٹل۔",
    },
    tags: ["kpk", "khyber", "province", "خیبر پختونخوا", "صوبہ", "سرکاری"],
  },

  // Education
  {
    id: "hec",
    url: "https://www.hec.gov.pk",
    category: "education",
    city: "islamabad",
    title: { en: "Higher Education Commission (HEC)", ur: "ہائر ایجوکیشن کمیشن" },
    description: {
      en: "Degree attestation, scholarships and the list of recognized universities.",
      ur: "ڈگری کی تصدیق، وظائف اور تسلیم شدہ جامعات کی فہرست۔",
    },
    tags: ["scholarship", "degree attestation", "universities", "university", "وظیفہ", "ڈگری", "یونیورسٹی", "جامعہ"],
  },
  {
    id: "lums",
    url: "https://lums.edu.pk",
    category: "education",
    city: "lahore",
    title: { en: "LUMS — Lahore University of Management Sciences", ur: "لمز — لاہور یونیورسٹی آف مینجمنٹ سائنسز" },
    description: {
      en: "Leading private university for business, science, law and humanities.",
      ur: "کاروبار، سائنس، قانون اور ہیومینیٹیز کی ممتاز نجی جامعہ۔",
    },
    tags: ["university", "admissions", "mba", "یونیورسٹی", "جامعہ", "داخلہ"],
  },
  {
    id: "nust",
    url: "https://nust.edu.pk",
    category: "education",
    city: "islamabad",
    title: { en: "NUST — National University of Sciences & Technology", ur: "نسٹ — نیشنل یونیورسٹی آف سائنسز اینڈ ٹیکنالوجی" },
    description: {
      en: "Top engineering and technology university with entry test admissions.",
      ur: "انجینئرنگ اور ٹیکنالوجی کی صفِ اول کی جامعہ۔",
    },
    tags: ["university", "engineering", "admissions", "net", "یونیورسٹی", "جامعہ", "انجینئرنگ"],
  },
  {
    id: "pu",
    url: "https://pu.edu.pk",
    category: "education",
    city: "lahore",
    title: { en: "University of the Punjab", ur: "جامعہ پنجاب" },
    description: {
      en: "Pakistan's oldest and largest public university, founded in 1882.",
      ur: "پاکستان کی سب سے پرانی اور بڑی سرکاری جامعہ، قیام 1882۔",
    },
    tags: ["university", "punjab university", "results", "یونیورسٹی", "جامعہ", "پنجاب یونیورسٹی"],
  },
  {
    id: "qau",
    url: "https://qau.edu.pk",
    category: "education",
    city: "islamabad",
    title: { en: "Quaid-i-Azam University", ur: "قائداعظم یونیورسٹی" },
    description: {
      en: "Public research university in Islamabad known for natural and social sciences.",
      ur: "اسلام آباد کی سرکاری تحقیقی جامعہ۔",
    },
    tags: ["university", "research", "یونیورسٹی", "جامعہ"],
  },
  {
    id: "iba",
    url: "https://www.iba.edu.pk",
    category: "education",
    city: "karachi",
    title: { en: "IBA Karachi", ur: "آئی بی اے کراچی" },
    description: {
      en: "Institute of Business Administration — Pakistan's oldest business school.",
      ur: "انسٹیٹیوٹ آف بزنس ایڈمنسٹریشن — پاکستان کا قدیم ترین بزنس اسکول۔",
    },
    tags: ["university", "business school", "mba", "یونیورسٹی", "جامعہ"],
  },
  {
    id: "aku",
    url: "https://www.aku.edu",
    category: "education",
    city: "karachi",
    title: { en: "Aga Khan University", ur: "آغا خان یونیورسٹی" },
    description: {
      en: "Private university known for medicine, nursing and its teaching hospital.",
      ur: "طب اور نرسنگ کے لیے مشہور نجی جامعہ اور تدریسی ہسپتال۔",
    },
    tags: ["university", "medical", "hospital", "یونیورسٹی", "جامعہ", "ہسپتال"],
  },
  {
    id: "fast",
    url: "https://www.nu.edu.pk",
    category: "education",
    city: "islamabad",
    title: { en: "FAST-NUCES", ur: "فاسٹ — نیشنل یونیورسٹی" },
    description: {
      en: "National University of Computer & Emerging Sciences, with campuses across Pakistan.",
      ur: "کمپیوٹر سائنس کی قومی جامعہ، ملک بھر میں کیمپس۔",
    },
    tags: ["university", "computer science", "admissions", "یونیورسٹی", "جامعہ", "کمپیوٹر"],
  },
  {
    id: "aiou",
    url: "https://www.aiou.edu.pk",
    category: "education",
    city: "islamabad",
    title: { en: "Allama Iqbal Open University", ur: "علامہ اقبال اوپن یونیورسٹی" },
    description: {
      en: "Distance-learning university offering programs nationwide.",
      ur: "فاصلاتی تعلیم کی جامعہ، ملک بھر میں پروگرام۔",
    },
    tags: ["university", "distance learning", "online", "یونیورسٹی", "جامعہ"],
  },

  // Travel & places
  {
    id: "tourism",
    url: "https://tourism.gov.pk",
    category: "travel",
    city: "islamabad",
    title: { en: "Pakistan Tourism (PTDC)", ur: "پاکستان سیاحت" },
    description: {
      en: "Official tourism portal: destinations, travel guides and visitor information.",
      ur: "سیاحت کا سرکاری پورٹل — مقامات، سفری رہنمائی اور معلومات۔",
    },
    tags: ["tourism", "travel", "visit", "سیاحت", "سفر"],
  },
  {
    id: "badshahi",
    url: "https://en.wikipedia.org/wiki/Badshahi_Mosque",
    category: "travel",
    city: "lahore",
    title: { en: "Badshahi Mosque", ur: "بادشاہی مسجد" },
    description: {
      en: "Mughal-era mosque built by Aurangzeb in 1673, one of Lahore's great landmarks.",
      ur: "اورنگزیب کی 1673 میں تعمیر کردہ مغلیہ مسجد، لاہور کی پہچان۔",
    },
    tags: ["mosque", "mughal", "landmark", "مسجد", "مغل"],
  },
  {
    id: "lahore-fort",
    url: "https://whc.unesco.org/en/list/171",
    category: "travel",
    city: "lahore",
    title: { en: "Lahore Fort & Shalimar Gardens", ur: "شاہی قلعہ و شالامار باغ" },
    description: {
      en: "UNESCO World Heritage Site of Mughal palaces and terraced gardens.",
      ur: "یونیسکو عالمی ورثہ — مغلیہ محلات اور باغات۔",
    },
    tags: ["fort", "unesco", "heritage", "garden", "قلعہ", "باغ", "ورثہ"],
  },
  {
    id: "faisal-mosque",
    url: "https://en.wikipedia.org/wiki/Faisal_Mosque",
    category: "travel",
    city: "islamabad",
    title: { en: "Faisal Mosque", ur: "فیصل مسجد" },
    description: {
      en: "Iconic mosque at the foot of the Margalla Hills, one of the largest in the world.",
      ur: "مارگلہ کی پہاڑیوں کے دامن میں دنیا کی بڑی مساجد میں سے ایک۔",
    },
    tags: ["mosque", "margalla", "landmark", "مسجد", "مارگلہ"],
  },
  {
    id: "mazar-e-quaid",
    url: "https://en.wikipedia.org/wiki/Mazar-e-Quaid",
    category: "travel",
    city: "karachi",
    title: { en: "Mazar-e-Quaid", ur: "مزارِ قائد" },
    description: {
      en: "The mausoleum of Quaid-e-Azam Muhammad Ali Jinnah, founder of Pakistan.",
      ur: "بانیِ پاکستان قائداعظم محمد علی جناح کا مزار۔",
    },
    tags: ["jinnah", "quaid", "mausoleum", "landmark", "قائداعظم", "جناح", "مزار"],
  },
  {
    id: "hunza",
    url: "https://en.wikipedia.org/wiki/Hunza_Valley",
    category: "travel",
    city: "gilgit",
    title: { en: "Hunza Valley", ur: "وادیِ ہنزہ" },
    description: {
      en: "Mountain valley on the Karakoram Highway with Attabad Lake, Baltit Fort and Rakaposhi views.",
      ur: "شاہراہِ قراقرم پر پہاڑی وادی — عطا آباد جھیل، بلتت قلعہ اور راکاپوشی۔",
    },
    tags: ["mountains", "valley", "karakoram", "lake", "northern areas", "پہاڑ", "وادی", "جھیل", "ہنزہ"],
  },
  {
    id: "swat",
    url: "https://en.wikipedia.org/wiki/Swat_Valley",
    category: "travel",
    city: "swat",
    title: { en: "Swat Valley", ur: "وادیِ سوات" },
    description: {
      en: "Green river valley known as the 'Switzerland of Pakistan', with Kalam and Malam Jabba.",
      ur: "'پاکستان کا سوئٹزرلینڈ' — کالام اور مالم جبہ کی سرسبز وادی۔",
    },
    tags: ["valley", "mountains", "kalam", "malam jabba", "وادی", "پہاڑ"],
  },
  {
    id: "mohenjo-daro",
    url: "https://whc.unesco.org/en/list/138",
    category: "travel",
    city: "larkana",
    title: { en: "Mohenjo-daro", ur: "موئن جو دڑو" },
    description: {
      en: "Ruins of a 4,500-year-old Indus Valley city, a UNESCO World Heritage Site.",
      ur: "وادیِ سندھ کی ساڑھے چار ہزار سال پرانی تہذیب کے کھنڈرات، عالمی ورثہ۔",
    },
    tags: ["indus", "ancient", "unesco", "heritage", "history", "تاریخ", "ورثہ", "سندھ"],
  },
  {
    id: "taxila",
    url: "https://whc.unesco.org/en/list/139",
    category: "travel",
    city: "taxila",
    title: { en: "Taxila", ur: "ٹیکسلا" },
    description: {
      en: "Gandhara-era archaeological site and museum, a UNESCO World Heritage Site.",
      ur: "گندھارا تہذیب کے آثار اور عجائب گھر، عالمی ورثہ۔",
    },
    tags: ["gandhara", "buddhist", "ancient", "museum", "unesco", "history", "تاریخ", "ورثہ", "گندھارا"],
  },
  {
    id: "pia",
    url: "https://www.piac.com.pk",
    category: "travel",
    city: "karachi",
    title: { en: "PIA — Pakistan International Airlines", ur: "پی آئی اے" },
    description: {
      en: "National flag carrier: flight booking, schedules and check-in.",
      ur: "قومی ایئرلائن — ٹکٹ بکنگ، شیڈول اور چیک اِن۔",
    },
    tags: ["airline", "flights", "tickets", "ہوائی جہاز", "پرواز", "ٹکٹ"],
  },
  {
    id: "airblue",
    url: "https://www.airblue.com",
    category: "travel",
    city: "islamabad",
    title: { en: "Airblue", ur: "ایئر بلیو" },
    description: {
      en: "Private airline with domestic and international flights.",
      ur: "نجی ایئرلائن، اندرون و بیرونِ ملک پروازیں۔",
    },
    tags: ["airline", "flights", "tickets", "پرواز", "ٹکٹ"],
  },
  {
    id: "pakrail",
    url: "https://www.pakrail.gov.pk",
    category: "travel",
    city: "lahore",
    title: { en: "Pakistan Railways", ur: "پاکستان ریلوے" },
    description: {
      en: "Train schedules, fares and online ticket booking.",
      ur: "ٹرینوں کے اوقات، کرائے اور آن لائن ٹکٹ۔",
    },
    tags: ["train", "railway", "tickets", "ٹرین", "ریل", "ٹکٹ"],
  },
  {
    id: "daewoo",
    url: "https://daewoo.com.pk",
    category: "travel",
    city: "lahore",
    title: { en: "Daewoo Express", ur: "ڈائیوو ایکسپریس" },
    description: {
      en: "Intercity bus service with online booking across Pakistan.",
      ur: "شہروں کے درمیان بس سروس، آن لائن بکنگ کے ساتھ۔",
    },
    tags: ["bus", "travel", "tickets", "بس", "سفر", "ٹکٹ"],
  },

  // Shopping & services
  {
    id: "daraz",
    url: "https://www.daraz.pk",
    category: "shopping",
    city: "nationwide",
    title: { en: "Daraz", ur: "دراز" },
    description: {
      en: "Pakistan's largest online marketplace for electronics, fashion and home goods.",
      ur: "پاکستان کی سب سے بڑی آن لائن مارکیٹ — الیکٹرانکس، فیشن اور گھریلو سامان۔",
    },
    tags: ["online shopping", "ecommerce", "electronics", "آن لائن خریداری", "شاپنگ"],
  },
  {
    id: "olx",
    url: "https://www.olx.com.pk",
    category: "shopping",
    city: "nationwide",
    title: { en: "OLX Pakistan", ur: "او ایل ایکس پاکستان" },
    description: {
      en: "Buy and sell used phones, cars, furniture and more.",
      ur: "پرانے موبائل، گاڑیاں، فرنیچر اور بہت کچھ خریدیں اور بیچیں۔",
    },
    tags: ["classifieds", "buy sell", "used", "خرید و فروخت", "استعمال شدہ"],
  },
  {
    id: "pakwheels",
    url: "https://www.pakwheels.com",
    category: "shopping",
    city: "nationwide",
    title: { en: "PakWheels", ur: "پاک ویلز" },
    description: {
      en: "Cars and bikes for sale, new car prices, reviews and auto parts.",
      ur: "گاڑیاں اور موٹر سائیکلیں، نئی گاڑیوں کی قیمتیں اور جائزے۔",
    },
    tags: ["cars", "car prices", "bikes", "auto", "گاڑی", "گاڑیاں", "موٹر سائیکل"],
  },
  {
    id: "zameen",
    url: "https://www.zameen.com",
    category: "shopping",
    city: "nationwide",
    title: { en: "Zameen.com", ur: "زمین ڈاٹ کام" },
    description: {
      en: "Property portal for houses, plots and rentals across Pakistan.",
      ur: "مکان، پلاٹ اور کرائے کی جائیداد کا پورٹل۔",
    },
    tags: ["property", "real estate", "house", "plot", "rent", "جائیداد", "مکان", "پلاٹ", "کرایہ"],
  },
  {
    id: "rozee",
    url: "https://www.rozee.pk",
    category: "shopping",
    city: "nationwide",
    title: { en: "Rozee.pk", ur: "روزی ڈاٹ پی کے" },
    description: {
      en: "Job portal with openings from Pakistani employers.",
      ur: "پاکستانی اداروں کی ملازمتوں کا پورٹل۔",
    },
    tags: ["jobs", "careers", "employment", "نوکری", "ملازمت"],
  },
  {
    id: "foodpanda",
    url: "https://www.foodpanda.pk",
    category: "shopping",
    city: "nationwide",
    title: { en: "foodpanda Pakistan", ur: "فوڈ پانڈا پاکستان" },
    description: {
      en: "Food and grocery delivery from restaurants and shops in your city.",
      ur: "آپ کے شہر کے ریستورانوں اور دکانوں سے کھانا اور سودا منگوائیں۔",
    },
    tags: ["food delivery", "restaurants", "grocery", "کھانا", "ڈیلیوری"],
  },
  {
    id: "khaadi",
    url: "https://pk.khaadi.com",
    category: "shopping",
    city: "karachi",
    title: { en: "Khaadi", ur: "کھاڈی" },
    description: {
      en: "Pakistani fashion brand for lawn, kurtas, unstitched fabric and home textiles.",
      ur: "پاکستانی فیشن برانڈ — لان، کرتے، ان سلے کپڑے۔",
    },
    tags: ["fashion", "clothes", "lawn", "kurta", "کپڑے", "فیشن", "لان"],
  },
  {
    id: "gulahmed",
    url: "https://www.gulahmedshop.com",
    category: "shopping",
    city: "karachi",
    title: { en: "Gul Ahmed", ur: "گل احمد" },
    description: {
      en: "Textile and fashion brand for lawn collections and ready-to-wear.",
      ur: "ٹیکسٹائل اور فیشن برانڈ — لان کلیکشن اور ریڈی ٹو ویئر۔",
    },
    tags: ["fashion", "clothes", "lawn", "کپڑے", "فیشن", "لان"],
  },
  {
    id: "junaidjamshed",
    url: "https://www.junaidjamshed.com",
    category: "shopping",
    city: "karachi",
    title: { en: "J. (Junaid Jamshed)", ur: "جے۔ (جنید جمشید)" },
    description: {
      en: "Clothing for men, women and kids, plus fragrances and accessories.",
      ur: "مردوں، خواتین اور بچوں کے کپڑے، خوشبوئیں اور لوازمات۔",
    },
    tags: ["fashion", "clothes", "kurta", "attar", "کپڑے", "فیشن", "خوشبو"],
  },

  // Banking & finance
  {
    id: "sbp",
    url: "https://www.sbp.org.pk",
    category: "finance",
    city: "karachi",
    title: { en: "State Bank of Pakistan", ur: "اسٹیٹ بینک آف پاکستان" },
    description: {
      en: "Central bank: monetary policy, interest rate, exchange rates and banking rules.",
      ur: "مرکزی بینک — مانیٹری پالیسی، شرحِ سود اور زرِ مبادلہ کی شرح۔",
    },
    tags: ["central bank", "interest rate", "exchange rate", "bank", "بینک", "شرح سود", "ڈالر"],
  },
  {
    id: "psx",
    url: "https://www.psx.com.pk",
    category: "finance",
    city: "karachi",
    title: { en: "Pakistan Stock Exchange", ur: "پاکستان اسٹاک ایکسچینج" },
    description: {
      en: "Live KSE-100 index, share prices and listed companies.",
      ur: "کے ایس ای 100 انڈیکس، حصص کی قیمتیں اور لسٹڈ کمپنیاں۔",
    },
    tags: ["stocks", "shares", "kse-100", "market", "حصص", "اسٹاک"],
  },
  {
    id: "hbl",
    url: "https://www.hbl.com",
    category: "finance",
    city: "karachi",
    title: { en: "HBL — Habib Bank Limited", ur: "ایچ بی ایل — حبیب بینک" },
    description: {
      en: "Pakistan's largest bank: accounts, cards, loans and HBL Mobile.",
      ur: "پاکستان کا سب سے بڑا بینک — اکاؤنٹس، کارڈز، قرضے اور موبائل بینکنگ۔",
    },
    tags: ["bank", "banking", "account", "بینک", "اکاؤنٹ"],
  },
  {
    id: "meezan",
    url: "https://www.meezanbank.com",
    category: "finance",
    city: "karachi",
    title: { en: "Meezan Bank", ur: "میزان بینک" },
    description: {
      en: "Pakistan's leading Islamic bank with Shariah-compliant accounts and financing.",
      ur: "پاکستان کا صفِ اول کا اسلامی بینک۔",
    },
    tags: ["bank", "islamic banking", "account", "بینک", "اسلامی بینکاری"],
  },
  {
    id: "ubl",
    url: "https://www.ubldigital.com",
    category: "finance",
    city: "karachi",
    title: { en: "UBL — United Bank Limited", ur: "یو بی ایل — یونائیٹڈ بینک" },
    description: {
      en: "Commercial bank with accounts, cards and the UBL Digital app.",
      ur: "کمرشل بینک — اکاؤنٹس، کارڈز اور ڈیجیٹل ایپ۔",
    },
    tags: ["bank", "banking", "account", "بینک", "اکاؤنٹ"],
  },
  {
    id: "mcb",
    url: "https://www.mcb.com.pk",
    category: "finance",
    city: "lahore",
    title: { en: "MCB Bank", ur: "ایم سی بی بینک" },
    description: {
      en: "Commercial bank offering personal and business banking.",
      ur: "ذاتی اور کاروباری بینکاری فراہم کرنے والا بینک۔",
    },
    tags: ["bank", "banking", "account", "بینک", "اکاؤنٹ"],
  },
  {
    id: "jazzcash",
    url: "https://www.jazzcash.com.pk",
    category: "finance",
    city: "nationwide",
    title: { en: "JazzCash", ur: "جاز کیش" },
    description: {
      en: "Mobile wallet for sending money, paying bills and mobile top-ups.",
      ur: "موبائل والیٹ — رقم بھیجیں، بل ادا کریں اور بیلنس لوڈ کریں۔",
    },
    tags: ["mobile wallet", "send money", "bill payment", "پیسے بھیجیں", "بل", "والیٹ"],
  },
  {
    id: "easypaisa",
    url: "https://easypaisa.com.pk",
    category: "finance",
    city: "nationwide",
    title: { en: "Easypaisa", ur: "ایزی پیسہ" },
    description: {
      en: "Digital wallet and bank for transfers, bills and savings.",
      ur: "ڈیجیٹل والیٹ اور بینک — رقم کی منتقلی، بل اور بچت۔",
    },
    tags: ["mobile wallet", "send money", "bill payment", "پیسے بھیجیں", "بل", "والیٹ"],
  },

  // Telecom
  {
    id: "jazz",
    url: "https://jazz.com.pk",
    category: "telecom",
    city: "nationwide",
    title: { en: "Jazz", ur: "جاز" },
    description: {
      en: "Pakistan's largest mobile network: packages, SIMs and 4G.",
      ur: "پاکستان کا سب سے بڑا موبائل نیٹ ورک — پیکجز، سم اور فور جی۔",
    },
    tags: ["mobile network", "sim", "packages", "4g", "موبائل", "سم", "پیکج"],
  },
  {
    id: "zong",
    url: "https://www.zong.com.pk",
    category: "telecom",
    city: "nationwide",
    title: { en: "Zong", ur: "زونگ" },
    description: {
      en: "Mobile network with 4G data bundles and call packages.",
      ur: "موبائل نیٹ ورک — فور جی ڈیٹا اور کال پیکجز۔",
    },
    tags: ["mobile network", "sim", "packages", "4g", "موبائل", "سم", "پیکج"],
  },
  {
    id: "ufone",
    url: "https://www.ufone.com",
    category: "telecom",
    city: "nationwide",
    title: { en: "Ufone", ur: "یوفون" },
    description: {
      en: "Mobile network with prepaid and postpaid packages.",
      ur: "موبائل نیٹ ورک — پری پیڈ اور پوسٹ پیڈ پیکجز۔",
    },
    tags: ["mobile network", "sim", "packages", "موبائل", "سم", "پیکج"],
  },
  {
    id: "ptcl",
    url: "https://ptcl.com.pk",
    category: "telecom",
    city: "nationwide",
    title: { en: "PTCL", ur: "پی ٹی سی ایل" },
    description: {
      en: "Landline, broadband internet and fiber connections.",
      ur: "لینڈ لائن، براڈ بینڈ انٹرنیٹ اور فائبر کنکشن۔",
    },
    tags: ["internet", "broadband", "landline", "fiber", "wifi", "انٹرنیٹ", "براڈ بینڈ"],
  },

  // Sports
  {
    id: "pcb",
    url: "https://www.pcb.com.pk",
    category: "sports",
    city: "lahore",
    title: { en: "Pakistan Cricket Board", ur: "پاکستان کرکٹ بورڈ" },
    description: {
      en: "Official home of Pakistan cricket: fixtures, squads, scores and news.",
      ur: "پاکستان کرکٹ کا سرکاری مرکز — شیڈول، ٹیمیں، اسکور اور خبریں۔",
    },
    tags: ["cricket", "pcb", "scores", "team", "کرکٹ", "اسکور", "ٹیم"],
  },
  {
    id: "psl",
    url: "https://www.psl-t20.com",
    category: "sports",
    city: "lahore",
    title: { en: "Pakistan Super League (PSL)", ur: "پاکستان سپر لیگ" },
    description: {
      en: "T20 cricket league: teams, fixtures, points table and tickets.",
      ur: "ٹی ٹوئنٹی کرکٹ لیگ — ٹیمیں، شیڈول، پوائنٹس ٹیبل اور ٹکٹ۔",
    },
    tags: ["cricket", "psl", "t20", "tickets", "کرکٹ", "ٹکٹ"],
  },
  {
    id: "cricketpakistan",
    url: "https://cricketpakistan.com.pk",
    category: "sports",
    city: "karachi",
    title: { en: "Cricket Pakistan", ur: "کرکٹ پاکستان" },
    description: {
      en: "Cricket news, live scores and analysis in English and Urdu.",
      ur: "کرکٹ کی خبریں، لائیو اسکور اور تجزیے۔",
    },
    tags: ["cricket", "live scores", "news", "کرکٹ", "اسکور"],
  },

  // Health
  {
    id: "shaukat-khanum",
    url: "https://shaukatkhanum.org.pk",
    category: "health",
    city: "lahore",
    title: { en: "Shaukat Khanum Memorial Cancer Hospital", ur: "شوکت خانم میموریل کینسر ہسپتال" },
    description: {
      en: "Charitable cancer hospital and research centre in Lahore, Peshawar and Karachi.",
      ur: "لاہور، پشاور اور کراچی میں خیراتی کینسر ہسپتال اور تحقیقی مرکز۔",
    },
    tags: ["hospital", "cancer", "charity", "donate", "ہسپتال", "کینسر", "عطیہ"],
  },
  {
    id: "indus",
    url: "https://indushospital.org.pk",
    category: "health",
    city: "karachi",
    title: { en: "The Indus Hospital & Health Network", ur: "انڈس ہسپتال" },
    description: {
      en: "Network of free-of-cost hospitals providing quality care across Pakistan.",
      ur: "ملک بھر میں مفت علاج فراہم کرنے والے ہسپتالوں کا نیٹ ورک۔",
    },
    tags: ["hospital", "free treatment", "charity", "ہسپتال", "مفت علاج"],
  },
  {
    id: "edhi",
    url: "https://edhi.org",
    category: "health",
    city: "karachi",
    title: { en: "Edhi Foundation", ur: "ایدھی فاؤنڈیشن" },
    description: {
      en: "Pakistan's largest welfare network: ambulances, shelters and relief. Ambulance: 115.",
      ur: "پاکستان کا سب سے بڑا فلاحی ادارہ — ایمبولینس، پناہ گاہیں اور امداد۔ ایمبولینس: 115۔",
    },
    tags: ["ambulance", "charity", "welfare", "donate", "emergency", "ایمبولینس", "فلاح", "عطیہ", "ایدھی"],
  },
  {
    id: "marham",
    url: "https://www.marham.pk",
    category: "health",
    city: "nationwide",
    title: { en: "Marham", ur: "مرہم" },
    description: {
      en: "Find and book doctors, online consultations and lab tests.",
      ur: "ڈاکٹر تلاش اور بک کریں، آن لائن مشورہ اور لیب ٹیسٹ۔",
    },
    tags: ["doctor", "appointment", "online consultation", "ڈاکٹر", "علاج"],
  },
  {
    id: "oladoc",
    url: "https://oladoc.com",
    category: "health",
    city: "nationwide",
    title: { en: "oladoc", ur: "اولاڈاک" },
    description: {
      en: "Book appointments with doctors and hospitals across Pakistan.",
      ur: "ملک بھر کے ڈاکٹروں اور ہسپتالوں سے وقت لیں۔",
    },
    tags: ["doctor", "appointment", "hospital", "ڈاکٹر", "ہسپتال"],
  },
  {
    id: "drap",
    url: "https://www.dra.gov.pk",
    category: "health",
    city: "islamabad",
    title: { en: "Drug Regulatory Authority of Pakistan", ur: "ڈرگ ریگولیٹری اتھارٹی" },
    description: {
      en: "Registered medicines, drug prices and safety alerts.",
      ur: "رجسٹرڈ ادویات، قیمتیں اور حفاظتی انتباہات۔",
    },
    tags: ["medicine", "drug prices", "pharmacy", "دوا", "ادویات"],
  },

  // Culture & food
  {
    id: "lok-virsa",
    url: "https://lokvirsa.org.pk",
    category: "culture",
    city: "islamabad",
    title: { en: "Lok Virsa — National Heritage Museum", ur: "لوک ورثہ" },
    description: {
      en: "Museum of Pakistan's folk heritage, crafts, music and festivals.",
      ur: "پاکستان کے لوک ورثے، دستکاری، موسیقی اور میلوں کا عجائب گھر۔",
    },
    tags: ["museum", "heritage", "folk", "crafts", "عجائب گھر", "ورثہ", "لوک"],
  },
  {
    id: "iqbal-academy",
    url: "https://iap.gov.pk",
    category: "culture",
    city: "lahore",
    title: { en: "Iqbal Academy Pakistan", ur: "اقبال اکادمی پاکستان" },
    description: {
      en: "The works, poetry and philosophy of Allama Muhammad Iqbal.",
      ur: "علامہ محمد اقبال کی تصانیف، شاعری اور فلسفہ۔",
    },
    tags: ["iqbal", "poetry", "urdu poetry", "literature", "اقبال", "شاعری", "ادب"],
  },
  {
    id: "udb",
    url: "https://udb.gov.pk",
    category: "culture",
    city: "karachi",
    title: { en: "Urdu Dictionary Board", ur: "اردو لغت بورڈ" },
    description: {
      en: "The comprehensive historical dictionary of the Urdu language.",
      ur: "اردو زبان کی جامع تاریخی لغت۔",
    },
    tags: ["urdu", "dictionary", "language", "اردو", "لغت", "زبان"],
  },
  {
    id: "coke-studio",
    url: "https://en.wikipedia.org/wiki/Coke_Studio_Pakistan",
    category: "culture",
    city: "karachi",
    title: { en: "Coke Studio Pakistan", ur: "کوک اسٹوڈیو پاکستان" },
    description: {
      en: "Music series blending folk, qawwali, classical and pop from across Pakistan.",
      ur: "لوک، قوالی، کلاسیکی اور پاپ موسیقی کا امتزاج۔",
    },
    tags: ["music", "songs", "qawwali", "موسیقی", "گانے", "قوالی"],
  },
  {
    id: "cuisine",
    url: "https://en.wikipedia.org/wiki/Pakistani_cuisine",
    category: "culture",
    city: "nationwide",
    title: { en: "Pakistani Cuisine", ur: "پاکستانی کھانے" },
    description: {
      en: "Biryani, nihari, karahi, haleem and regional dishes from every province.",
      ur: "بریانی، نہاری، کڑاہی، حلیم اور ہر صوبے کے کھانے۔",
    },
    tags: ["food", "biryani", "nihari", "karahi", "recipes", "کھانا", "بریانی", "نہاری", "کڑاہی"],
  },
];
