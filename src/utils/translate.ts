import { LanguageId, Service, Doctor, Promo, BeforeAfterCase, FAQ, Branch } from '../types';

// Precise dictionary mapping for dynamic content and static terms
const DICTIONARY: Record<string, Record<LanguageId, string>> = {
  // Theme Names and Descriptions
  "Luxury Aesthetic": {
    id: "Luxury Aesthetic",
    en: "Luxury Aesthetic",
    ar: "تجميل فاخر",
    zh: "奢华医美",
    ja: "ラグジュアリーエステティック"
  },
  "Modern Skincare": {
    id: "Modern Skincare",
    en: "Modern Skincare",
    ar: "العناية الحديثة بالبشرة",
    zh: "现代护肤",
    ja: "モダンスキンケア"
  },
  "Medical Dermatology": {
    id: "Medical Dermatology",
    en: "Medical Dermatology",
    ar: "أمراض الجلدية الطبية",
    zh: "临床医学皮肤科",
    ja: "メディカル皮膚科"
  },
  "Dental Clinic Pro": {
    id: "Dental Clinic Pro",
    en: "Dental Clinic Pro",
    ar: "عيادة طب الأسنان الاحترافية",
    zh: "专业牙科诊所",
    ja: "デンタルクリニックプロ"
  },
  "Family Health Clinic": {
    id: "Family Health Clinic",
    en: "Family Health Clinic",
    ar: "عيادة صحة الأسرة",
    zh: "家庭健康诊所",
    ja: "ファミリーヘルスケアクリニック"
  },
  "Perawatan medis profesional untuk berbagai kondisi penyakit kulit, alergi, eksim, hingga peremajaan klinis oleh dokter spesialis berpengalaman.": {
    id: "Perawatan medis profesional untuk berbagai kondisi penyakit kulit, alergi, eksim, hingga peremajaan klinis oleh dokter spesialis berpengalaman.",
    en: "Professional medical treatment for various skin diseases, allergies, eczema, to clinical rejuvenation by experienced specialist doctors.",
    ar: "علاج طبي احترافي لمختلف الحالات الجلدية، الحساسية، الإكزيما، وحتى تجديد البشرة السريري بواسطة أطباء أخصائيين ذوي خبرة.",
    zh: "由经验丰富的专科医生为您提供针对各种皮肤病、过敏、湿疹到临床年轻化的专业医疗护理。",
    ja: "経験豊富な専門医による、さまざまな皮膚疾患、アレルギー、湿疹から臨床的な若返り（リジュビネーション）までの専門的な医療ケア。"
  },
  "Menggabungkan keindahan, kemewahan, dan keahlian medis estetik terbaik untuk perawatan wajah dan tubuh yang dipersonalisasi.": {
    id: "Menggabungkan keindahan, kemewahan, dan keahlian medis estetik terbaik untuk perawatan wajah dan tubuh yang dipersonalisasi.",
    en: "Combining beauty, luxury, and the best aesthetic medical expertise for personalized facial and body treatments.",
    ar: "الجمع بين الجمال والفخامة وأفضل الخبرات الطبية التجميلية لعلاجات الوجه والجسم المخصصة.",
    zh: "结合美丽、奢华与最顶尖 of 医美专业知识，提供个性化的面部及身体护理。",
    ja: "美、ラグジュアリー、そして最高の美容医療技術を融合させ、パーソナライズされたフェイシャル＆ボディトリートメントを提供します。"
  },
  "Solusi kulit sehat, glowing, dan bebas jerawat didukung oleh formulasi dermatologi canggih dan bahan aktif berkualitas tinggi.": {
    id: "Solusi kulit sehat, glowing, dan bebas jerawat didukung oleh formulasi dermatologi canggih dan bahan aktif berkualitas tinggi.",
    en: "Healthy, glowing, and acne-free skin solutions backed by advanced dermatological formulations and high-quality active ingredients.",
    ar: "حلول لبشرة صحية ومتوهجة وخالية من حب الشباب مدعومة بتركيبات جلدية متطورة ومكونات نشطة عالية الجودة.",
    zh: "由先进的皮肤学配方和高品质活性成分支持，为您提供健康、透亮且无痘的肌肤解决方案。",
    ja: "高度な皮膚科処方と高品質な活性成分に裏打ちされた、健康的で輝くアクネフリーな肌ソリューション。"
  },
  "Klinik gigi modern dengan peralatan steril berstandar tinggi untuk perawatan rutin, implant, scaling, hingga estetik smile makeovers.": {
    id: "Klinik gigi modern dengan peralatan steril berstandar tinggi untuk perawatan rutin, implant, scaling, hingga estetik smile makeovers.",
    en: "Modern dental clinic with high-standard sterile equipment for routine care, implants, scaling, to aesthetic smile makeovers.",
    ar: "عيادة أسنان حديثة مجهزة بأحدث أجهزة التعقيم عالية المعايير للعناية الروتينية، الزرع، تنظيف الجير، وتجميل الابتسامة.",
    zh: "拥有高标准无菌设备的现代牙科诊所，提供常规护理、种植牙、洗牙及美学微笑重塑。",
    ja: "定期ケア、インプラント、スケーリングから審美的なスマイルメイクオーバーまで、高水準 of 滅菌設備を備えたモダンな歯科クリニック。"
  },
  "Mitra utama kesehatan keluarga Anda yang menyediakan layanan pencegahan, konsultasi medis umum, serta pemeriksaan laboratorium tepercaya.": {
    id: "Mitra utama kesehatan keluarga Anda yang menyediakan layanan pencegahan, konsultasi medis umum, serta pemeriksaan laboratorium tepercaya.",
    en: "Your family's primary healthcare partner providing preventive services, general medical consultations, and trusted laboratory tests.",
    ar: "شريك الرعاية الصحية الأساسي لعائلتك الذي يقدم الخدمات الوقائية والاستشارات الطبية العامة وفحوصات المختبر الموثوقة.",
    zh: "您家庭的首选健康伙伴，提供预防服务、全科医学咨询及值得信赖的实验室检查。",
    ja: "予防医療、一般診療相談、信頼性の高い検査を提供する、ご家族のための最良のヘルスケアパートナー。"
  },
  "SPESIALISASI": {
    id: "SPESIALISASI",
    en: "SPECIALIZATION",
    ar: "التخصص",
    zh: "特色专科",
    ja: "専門分野"
  },

  // Service categories
  "Dermatology": {
    id: "Dermatology",
    en: "Dermatology",
    ar: "علم الجلدية",
    zh: "皮肤科",
    ja: "皮膚科"
  },
  "Aesthetic Treatment": {
    id: "Aesthetic Treatment",
    en: "Aesthetic Treatment",
    ar: "علاج تجميلي",
    zh: "医学美容",
    ja: "美容施術"
  },
  "Dental Care": {
    id: "Dental Care",
    en: "Dental Care",
    ar: "رعاية الأسنان",
    zh: "牙科护理",
    ja: "歯科ケア"
  },
  "Wellness & Anti-Aging": {
    id: "Wellness & Anti-Aging",
    en: "Wellness & Anti-Aging",
    ar: "العافية ومكافحة الشيخوخة",
    zh: "健康与抗衰老",
    ja: "ウェルネス＆アンチエイジング"
  },
  "Medical Check-Up": {
    id: "Medical Check-Up",
    en: "Medical Check-Up",
    ar: "الفحص الطبي",
    zh: "医疗体检",
    ja: "健康診断"
  },

  // Service Names
  "Acne Clear Program": {
    id: "Acne Clear Program",
    en: "Acne Clear Program",
    ar: "برنامج إزالة حب الشباب",
    zh: "祛痘净肤计划",
    ja: "アクネクリアプログラム"
  },
  "Brightening Glow Facial": {
    id: "Brightening Glow Facial",
    en: "Brightening Glow Facial",
    ar: "فيشال الإشراق والتوهج",
    zh: "焕采亮颜水光面部护理",
    ja: "ブライトニンググロウフェイシャル"
  },
  "Laser Rejuvenation": {
    id: "Laser Rejuvenation",
    en: "Laser Rejuvenation",
    ar: "تجديد البشرة بالليزر",
    zh: "激光嫩肤年轻化治疗",
    ja: "レーザーリジュビネーション"
  },
  "HIFU Face Lifting": {
    id: "HIFU Face Lifting",
    en: "HIFU Face Lifting",
    ar: "شد الوجه بالهايفو",
    zh: "HIFU超声刀面部提拉",
    ja: "HIFUフェイスリフティング"
  },
  "Dental Scaling": {
    id: "Dental Scaling",
    en: "Dental Scaling",
    ar: "تنظيف الجير للأسنان",
    zh: "超声波洗牙与抛光",
    ja: "デンタルスケーリング"
  },
  "Executive Medical Check-Up": {
    id: "Executive Medical Check-Up",
    en: "Executive Medical Check-Up",
    ar: "فحص طبي تنفيذي شامل",
    zh: "尊享全套医疗体检",
    ja: "エグゼクティブ人間ドック"
  },

  // Durations
  "60 menit": { id: "60 menit", en: "60 minutes", ar: "٦٠ دقيقة", zh: "60 分钟", ja: "60分" },
  "75 menit": { id: "75 menit", en: "75 minutes", ar: "٧٥ دقيقة", zh: "75 分钟", ja: "75分" },
  "45 menit": { id: "45 menit", en: "45 minutes", ar: "٤٥ دقيقة", zh: "45 分钟", ja: "45分" },
  "90 menit": { id: "90 menit", en: "90 minutes", ar: "٩٠ دقيقة", zh: "90 分钟", ja: "90分" },
  "180 menit": { id: "180 menit", en: "180 minutes", ar: "١٨٠ دقيقة", zh: "180 分钟", ja: "180分" },

  // Service Descriptions
  "Program perawatan jerawat aktif dengan kombinasi konsultasi dokter, facial medis, dan treatment kulit sesuai kondisi.": {
    id: "Program perawatan jerawat aktif dengan kombinasi konsultasi dokter, facial medis, dan treatment kulit sesuai kondisi.",
    en: "Active acne treatment program combining medical doctor consultation, clinical facial, and tailored skin treatment.",
    ar: "برنامج علاج حب الشباب النشط الذي يجمع بين استشارة الطبيب والفيشال الطبي وعلاج البشرة المخصص حسب الحالة.",
    zh: "针对活性痤疮的专业诊疗计划，结合医生面诊、医学美肤护理及个性化皮肤治疗方案。",
    ja: "医師によるカウンセリング、メディカルフェイシャル、お肌の状態に合わせた治療を組み合わせたアクティブニキビケアプログラム。"
  },
  "Facial premium untuk membantu kulit tampak lebih cerah, lembap, dan glowing.": {
    id: "Facial premium untuk membantu kulit tampak lebih cerah, lembap, dan glowing.",
    en: "Premium facial to help the skin look brighter, deeply hydrated, and glowing.",
    ar: "جلسة فيشال فاخرة لتفتيح البشرة وترطيبها بعمق ومنحها مظهرًا متوهجًا وصحيًا.",
    zh: "高端面部护理，深层补水，焕活肌肤，缔造水润透亮的蜜光肌。",
    ja: "お肌をより明るく、潤いに満ちた、ツヤのある状態に導くプレミアムなフェイシャル。"
  },
  "Treatment laser untuk membantu memperbaiki tampilan kulit, noda hitam, dan tekstur wajah.": {
    id: "Treatment laser untuk membantu memperbaiki tampilan kulit, noda hitam, dan tekstur wajah.",
    en: "Advanced laser treatment to improve skin tone, fade dark spots, and refine overall facial texture.",
    ar: "علاج متقدم بالليزر لتحسين مظهر البشرة وتفتيح البقع الداكنة وتنعيم ملمس الوجه.",
    zh: "先进激光治疗，有效改善色沉、淡化黑斑并重塑面部平滑质感。",
    ja: "お肌のトーン、シミの改善、お顔のキメを整えるための最先端レーザー治療。"
  },
  "Treatment non-bedah untuk membantu tampilan wajah terlihat lebih kencang.": {
    id: "Treatment non-bedah untuk membantu tampilan wajah terlihat lebih kencang.",
    en: "Non-surgical skin tightening treatment to promote a firmer, lifted facial appearance.",
    ar: "علاج غير جراحي لشد الجلد وترقية تماسك وملامح الوجه بشكل طبيعي.",
    zh: "非手术紧致肌肤治疗，有效提升下垂，重塑紧致年轻轮廓。",
    ja: "お顔を引き締め、ハリのある若々しい印象に導く、切らないリフトアップ施術。"
  },
  "Pembersihan karang gigi untuk menjaga kesehatan gigi dan gusi.": {
    id: "Pembersihan karang gigi untuk menjaga kesehatan gigi dan gusi.",
    en: "Dental plaque and tartar removal to maintain excellent tooth and gum health.",
    ar: "إزالة التكلسات واللويحات السنية للحفاظ على صحة الأسنان واللثة ونظافتهما.",
    zh: "清除牙结石与牙菌斑，全方位守护牙齿及牙龈健康。",
    ja: "歯石や歯垢を除去し、大切な歯と歯茎の健康を維持するスケーリング施術。"
  },
  "Paket pemeriksaan kesehatan komprehensif untuk profesional dan keluarga.": {
    id: "Paket pemeriksaan kesehatan komprehensif untuk profesional dan keluarga.",
    en: "Comprehensive health check-up package designed for professionals and families.",
    ar: "باقة فحص طبي شاملة مصممة للمهنيين والعائلات للاطمئنان على الصحة العامة.",
    zh: "为职场精英及家庭定制的全面深度健康体检服务套餐。",
    ja: "ビジネスパーソンやご家族のために設計された、包括的な総合人間ドックプログラム。"
  },

  // Service Benefits
  "Membantu meredakan jerawat": {
    id: "Membantu meredakan jerawat",
    en: "Helps calm and reduce active acne",
    ar: "يساعد في تهدئة وتقليل حب الشباب",
    zh: "帮助舒缓并平复活性粉刺痘痘",
    ja: "アクティブなニキビを鎮静・抑制"
  },
  "Mengurangi minyak berlebih": {
    id: "Mengurangi minyak berlebih",
    en: "Reduces excess sebum and oil production",
    ar: "يقلل من إفراز الدهون الزائدة",
    zh: "控制并减少多余油脂分泌",
    ja: "過剰な皮脂分泌を抑える"
  },
  "Membersihkan pori": {
    id: "Membersihkan pori",
    en: "Deep cleanses and unclogs pores",
    ar: "ينظف المسام بعمق ويزيل الانسدادات",
    zh: "深层净化并疏通毛孔",
    ja: "毛穴をディープクレンジング"
  },
  "Membantu memperbaiki tekstur kulit": {
    id: "Membantu memperbaiki tekstur kulit",
    en: "Helps refine and improve skin texture",
    ar: "يساعد في تحسين وتنعيم ملمس البشرة",
    zh: "促进肌肤细腻光滑度",
    ja: "お肌のキメを整え改善する"
  },
  "Mencerahkan kulit": {
    id: "Mencerahkan kulit",
    en: "Brightens and illuminates the complexion",
    ar: "يفتح البشرة ويمنحها إشراقة نضرة",
    zh: "提亮肤色，展现莹润光泽",
    ja: "お肌に透明感を与え明るくする"
  },
  "Melembapkan": {
    id: "Melembapkan",
    en: "Deeply hydrates and moisturizes the skin",
    ar: "يرطب البشرة ترطيبًا عميقًا",
    zh: "深层补水并锁住水分",
    ja: "お肌を深く保湿し潤す"
  },
  "Membantu mengangkat sel kulit mati": {
    id: "Membantu mengangkat sel kulit mati",
    en: "Gently exfoliates dead skin cells",
    ar: "يقشر خلايا الجلد الميتة بلطف",
    zh: "温和去除老化角质细胞",
    ja: "古い角質をやさしく取り除く"
  },
  "Memberi efek fresh": {
    id: "Memberi efek fresh",
    en: "Provides an instant refreshing effect",
    ar: "يمنح تأثيرًا منعشًا فوريًا",
    zh: "令肌肤瞬间恢复弹润活力",
    ja: "瞬間的なリフレッシュ効果"
  },
  "Membantu menyamarkan flek": {
    id: "Membantu menyamarkan flek",
    en: "Helps fade dark spots and pigmentation",
    ar: "يساعد في تفتيح البقع الداكنة والتصبغات",
    zh: "有效淡化色斑及色素沉着",
    ja: "シミや色素沈着を薄くする"
  },
  "Meratakan warna kulit": {
    id: "Meratakan warna kulit",
    en: "Evens out skin tone and complexion",
    ar: "يوحد لون البشرة بفعالية",
    zh: "均净并提亮整体肤色",
    ja: "お肌のトーンを均一に整える"
  },
  "Memperbaiki tekstur": {
    id: "Memperbaiki tekstur",
    en: "Refines skin texture and smoothness",
    ar: "يحسن مرونة ونعومة سطح الجلد",
    zh: "改善并重塑细滑肤质",
    ja: "肌のキメと質感を高める"
  },
  "Meningkatkan tampilan kulit sehat": {
    id: "Meningkatkan tampilan kulit sehat",
    en: "Enhances the look of healthy, radiant skin",
    ar: "يعزز مظهر البشرة الصحي والنضر",
    zh: "显著提升健康皮肤的整体活力",
    ja: "健康的で輝くお肌を育む"
  },
  "Membantu mengencangkan wajah": {
    id: "Membantu mengencangkan wajah",
    en: "Helps tighten and lift facial contours",
    ar: "يساعد في شد ورفع ملامح الوجه",
    zh: "深度紧致并提升面部线条",
    ja: "フェイスラインを引き締め引き上げる"
  },
  "Membentuk kontur": {
    id: "Membentuk kontur",
    en: "Sculpts and defines natural contours",
    ar: "ينحت ويحدد ملامح الوجه الطبيعية",
    zh: "雕刻自然立体的面部轮廓",
    ja: "お顔の自然な立体感を際立たせる"
  },
  "Non-surgical": {
    id: "Non-surgical",
    en: "Completely non-surgical and non-invasive",
    ar: "علاج غير جراحي بالكامل",
    zh: "非手术、非侵入式安全疗法",
    ja: "完全非侵襲の切らない施術"
  },
  "Minim downtime": {
    id: "Minim downtime",
    en: "Minimal to no downtime required",
    ar: "الحد الأدنى من فترة التعافي",
    zh: "几乎无需恢复期，即刻随做随走",
    ja: "ダウンタイムがほとんどない"
  },
  "Membersihkan karang gigi": {
    id: "Membersihkan karang gigi",
    en: "Removes dental plaque and stubborn tartar",
    ar: "يزيل جير الأسنان والترسبات الصلبة",
    zh: "深度清除牙结石与顽固牙菌斑",
    ja: "頑固な歯石や歯垢をきれいに除去"
  },
  "Membantu mengurangi bau mulut": {
    id: "Membantu mengurangi bau mulut",
    en: "Helps reduce bad breath effectively",
    ar: "يساعد في التخلص من رائحة الفم الكريهة",
    zh: "长效保持口气清爽，祛除异味",
    ja: "口臭を効果的に予防・軽減する"
  },
  "Menjaga kesehatan gusi": {
    id: "Menjaga kesehatan gusi",
    en: "Promotes and maintains healthy gums",
    ar: "يعزز ويحافظ على صحة اللثة",
    zh: "巩固并呵护牙龈组织健康",
    ja: "歯茎の健康を維持し促進する"
  },
  "Pemeriksaan darah": {
    id: "Pemeriksaan darah",
    en: "Comprehensive laboratory blood tests",
    ar: "فحوصات معملية شاملة للدم",
    zh: "多项关键临床血液实验室检查",
    ja: "網羅的な臨床血液ラボ検査"
  },
  "Konsultasi dokter": {
    id: "Konsultasi dokter",
    en: "Professional medical doctor consultation",
    ar: "استشارة طبية مهنية مع الطبيب",
    zh: "专业医生一对一深度面诊健康评估",
    ja: "プロフェッショナルな医師のカウンセリング"
  },
  "Analisis risiko kesehatan": {
    id: "Analisis risiko kesehatan",
    en: "Personalized health risk analysis",
    ar: "تحليل مخصص للمخاطر الصحية",
    zh: "定制化潜在健康风险因素分析",
    ja: "パーソナライズされた健康リスク分析"
  },
  "Laporan hasil": {
    id: "Laporan hasil",
    en: "Detailed medical report and advice",
    ar: "تقرير طبي مفصل مع التوجيهات",
    zh: "出具权威详细的体检报告与医学建议",
    ja: "詳細な健康診断レポートとアドバイス"
  },

  // Suitable for
  "Jerawat aktif": { id: "Jerawat aktif", en: "Active acne", ar: "حب الشباب النشط", zh: "活性痘痘粉刺", ja: "活動性ニキビ" },
  "Komedo": { id: "Komedo", en: "Blackheads & whiteheads", ar: "الرؤوس السوداء والبيضاء", zh: "黑头与粉刺", ja: "毛穴の黒ずみ・コメド" },
  "Kulit berminyak": { id: "Kulit berminyak", en: "Oily skin", ar: "البشرة الدهنية", zh: "油性及混合偏油肌肤", ja: "脂性肌" },
  "Pori tersumbat": { id: "Pori tersumbat", en: "Clogged pores", ar: "المسام المسدودة", zh: "毛孔粗大堵塞", ja: "毛穴の詰まり" },
  "Kulit kusam": { id: "Kulit kusam", en: "Dull skin", ar: "البشرة الباهتة", zh: "暗沉无光泽肌肤", ja: "お肌のくすみ" },
  "Kulit kering": { id: "Kulit kering", en: "Dry skin", ar: "البشرة الجافة", zh: "干燥缺水肌肤", ja: "乾燥肌" },
  "Warna kulit tidak merata": { id: "Warna kulit tidak merata", en: "Uneven skin tone", ar: "لون البشرة غير الموحد", zh: "肤色不均与色素暗沉", ja: "色ムラ" },
  "Flek hitam": { id: "Flek hitam", en: "Dark spots & hyperpigmentation", ar: "البقع الداكنة والتصبغات", zh: "顽固色斑及色素沉着", ja: "シミ・そばかす" },
  "Bekas jerawat": { id: "Bekas jerawat", en: "Acne scars & marks", ar: "آثار وبقع حب الشباب", zh: "痘印、痘疤及轻度凹洞", ja: "ニキビ跡" },
  "Photoaging": { id: "Photoaging", en: "Sun damage & photoaging", ar: "تلف البشرة من الشمس", zh: "光老化肌肤", ja: "光老化（日光によるダメージ）" },
  "Kulit kendur": { id: "Kulit kendur", en: "Sagging skin", ar: "ترهل الجلد", zh: "皮肤松弛下垂", ja: "たるみ肌" },
  "Double chin": { id: "Double chin", en: "Double chin", ar: "الذقن المزدوج", zh: "双下巴及轮廓模糊", ja: "二重あご" },
  "Kontur wajah kurang tegas": { id: "Kontur wajah kurang tegas", en: "Loss of facial definition", ar: "فقدان تحديد ملامح الوجه", zh: "面部轮廓线条不够立体清晰", ja: "シャープさを失ったフェイスライン" },
  "Karang gigi": { id: "Karang gigi", en: "Dental tartar and calculus", ar: "جير ورواسب الأسنان", zh: "牙结石及软垢堆积", ja: "歯石・歯垢の沈着" },
  "Bau mulut": { id: "Bau mulut", en: "Bad breath (halitosis)", ar: "رائحة الفم الكريهة", zh: "顽固性口臭、异味", ja: "口臭" },
  "Gusi mudah berdarah": { id: "Gusi mudah berdarah", en: "Bleeding gums", ar: "نزيف اللثة", zh: "牙龈易红肿出血", ja: "歯茎の出血やすさ" },
  "Karyawan": { id: "Karyawan", en: "Corporate employees", ar: "الموظفون", zh: "职员与白领企业检查", ja: "会社員・企業健診" },
  "Eksekutif": { id: "Eksekutif", en: "Business executives", ar: "المدراء التنفيذيون", zh: "高管及商务人士体检", ja: "エグゼクティブ・役員" },
  "Keluarga": { id: "Keluarga", en: "Families", ar: "العائلات", zh: "家庭成员定期检查", ja: "ご家族の健康管理" },
  "Pemeriksaan rutin tahunan": { id: "Pemeriksaan rutin tahunan", en: "Annual routine wellness checkup", ar: "الفحص الدوري السنوي", zh: "年度常规预防性体检", ja: "年1回の定期健診" },

  // Contraindications
  "Ibu hamil perlu konsultasi dokter": {
    id: "Ibu hamil perlu konsultasi dokter",
    en: "Pregnant mothers require prior doctor consultation",
    ar: "تتطلب الأمهات الحوامل استشارة الطبيب أولاً",
    zh: "孕妇需提前咨询主治医生意见",
    ja: "妊娠中の方は医師の事前相談が必要です"
  },
  "Kulit sedang iritasi berat": {
    id: "Kulit sedang iritasi berat",
    en: "Severe active skin irritation or wounds",
    ar: "تهيّج شديد في الجلد أو وجود جروح مفتوحة",
    zh: "皮肤正处于严重敏感或破损发炎状态",
    ja: "ひどい皮膚炎や外傷がある状態"
  },
  "Kulit luka terbuka": {
    id: "Kulit luka terbuka",
    en: "Open wounds or active infections on the treatment area",
    ar: "وجود جروح مفتوحة أو عدوى نشطة في المنطقة",
    zh: "护理部位有开放性伤口或活动性感染",
    ja: "施術部位に傷や感染症がある状態"
  },
  "Alergi bahan aktif tertentu": {
    id: "Alergi bahan aktif tertentu",
    en: "Known allergies to specific active cosmetic ingredients",
    ar: "حساسية معروفة تجاه مكونات نشطة معينة",
    zh: "对特定化妆品活性成分存在已知过敏史",
    ja: "特定の化粧品成分に対するアレルギー"
  },
  "Kulit terbakar matahari": {
    id: "Kulit terbakar matahari",
    en: "Active sunburn or severe UV exposure",
    ar: "حروق الشمس النشطة أو التعرض المفرط للأشعة",
    zh: "严重晒伤或处于暴晒过后的急性期",
    ja: "日焼け直後のお肌（強い紫外線ダメージ）"
  },
  "Infeksi aktif": {
    id: "Infeksi aktif",
    en: "Active local infections or cold sores",
    ar: "وجود عدوى نشطة أو قروح باردة",
    zh: "护理部位有疱疹等急性活动性感染",
    ja: "急性感染症、ヘルペスなどがある状態"
  },
  "Kehamilan perlu konsultasi dokter": {
    id: "Kehamilan perlu konsultasi dokter",
    en: "Pregnancy requires professional medical clearance",
    ar: "تتطلب حالة الحمل تصريحًا طبيًا مهنيًا",
    zh: "妊娠期求美者必须获得医师书面许可",
    ja: "妊娠中の方は医師のクリアランスが必要です"
  },
  "Implan logam area wajah": {
    id: "Implan logam area wajah",
    en: "Metal implants or pacemakers in the face/neck area",
    ar: "وجود زرع معدني أو أجهزة تنظيم ضربات القلب في الوجه/الرقبة",
    zh: "面部或颈部置有金属植入物、起搏器",
    ja: "お顔や首に金属プレート、ペースメーカーの埋め込みがある場合"
  },
  "Infeksi kulit aktif": {
    id: "Infeksi kulit aktif",
    en: "Active skin infection or open lesion",
    ar: "عدوى جلدية نشطة أو آفة مفتوحة",
    zh: "治疗区域内存在活动性皮肤病变或感染",
    ja: "施術箇所の急性皮膚感染症"
  },
  "Infeksi gigi berat perlu pemeriksaan dokter gigi": {
    id: "Infeksi gigi berat perlu pemeriksaan dokter gigi",
    en: "Severe tooth infection requires dental clearance",
    ar: "تتطلب التهابات الأسنان الشديدة فحصًا مسبقًا من طبيب الأسنان",
    zh: "严重牙髓牙周感染须先进行牙病专科治疗",
    ja: "重度の歯性感染症は先に歯科治療が必要です"
  },
  "Puasa diperlukan untuk beberapa pemeriksaan": {
    id: "Puasa diperlukan untuk beberapa pemeriksaan",
    en: "Fasting is strictly required for accurate blood results",
    ar: "الصيام مطلوب تمامًا للحصول على نتائج دقيقة للدم",
    zh: "部分核心血液生化检查前须遵守空腹规定",
    ja: "一部の血液検査では事前の絶食が必要です"
  },

  // Preparations
  "Hindari peeling keras 3 hari sebelum treatment.": {
    id: "Hindari peeling keras 3 hari sebelum treatment.",
    en: "Avoid strong peeling or exfoliating acids 3 days prior.",
    ar: "تجنب التقشير القوي أو الأحماض المقشرة لمدة ٣ أيام قبل العلاج.",
    zh: "疗程前3天内，请勿使用强效去角质产品、酸类护肤品。",
    ja: "施術の3日前から、強いピーリングや酸成分配合の化粧品使用をお控えください。"
  },
  "Tidak menggunakan scrub wajah sehari sebelum treatment.": {
    id: "Tidak menggunakan scrub wajah sehari sebelum treatment.",
    en: "Do not use face scrubs or physical exfoliants 1 day prior.",
    ar: "لا تستخدم مقشرات الوجه الفيزيائية قبل الجلسة بيوم واحد.",
    zh: "护理前1天内，切勿使用磨砂膏或进行面部物理磨砂。",
    ja: "施術の1日前から、お顔のスクラブや摩擦洗顔はお控えください。"
  },
  "Hindari paparan matahari berlebih sebelum treatment.": {
    id: "Hindari paparan matahari berlebih sebelum treatment.",
    en: "Avoid excessive sun exposure or tanning before the treatment.",
    ar: "تجنب التعرض المفرط لأشعة الشمس أو التسمير قبل العلاج.",
    zh: "治疗前1周内，避免强烈的阳光直射或进行日光浴。",
    ja: "施術前1週間は、過度な日焼けや長時間の直射日光をお控えください。"
  },
  "Konsultasikan kondisi kulit dan riwayat medis sebelum treatment.": {
    id: "Konsultasikan kondisi kulit dan riwayat medis sebelum treatment.",
    en: "Consult your skin condition and full medical history before treatment.",
    ar: "استشر الطبيب حول حالة بشرتك وتاريخك الطبي الكامل قبل العلاج.",
    zh: "治疗前请务必向医生如实说明您的皮肤现状及既往医疗史。",
    ja: "施術前にお肌の状態と既往歴を医師に必ずご相談ください。"
  },
  "Sikat gigi sebelum kunjungan.": {
    id: "Sikat gigi sebelum kunjungan.",
    en: "Please brush your teeth thoroughly prior to your appointment.",
    ar: "يرجى تنظيف أسنانك بالفرشاة جيدًا قبل موعد زيارتك.",
    zh: "就诊前请认真刷牙，保持口腔基本清洁卫生。",
    ja: "ご来院の前に丁寧な歯磨きをお願いいたします。"
  },
  "Puasa 8-10 jam sebelum pemeriksaan.": {
    id: "Puasa 8-10 jam sebelum pemeriksaan.",
    en: "Fast (water only allowed) for 8-10 hours prior to the exam.",
    ar: "الصيام (يسمح بالماء فقط) لمدة ٨-١٠ ساعات قبل إجراء الفحص.",
    zh: "体检前须严格禁食（可饮少量清水）8-10小时。",
    ja: "健康診断の8～10時間前から絶食（お水は少量は可）をお願いします。"
  },

  // Aftercares
  "Gunakan sunscreen, hindari memencet jerawat, dan ikuti arahan dokter.": {
    id: "Gunakan sunscreen, hindari memencet jerawat, dan ikuti arahan dokter.",
    en: "Apply high SPF sunscreen, avoid popping pimples, and follow doctor's advice.",
    ar: "ضع واقي الشمس، وتجنب عصر البثور، واتبع إرشادات الطبيب بدقة.",
    zh: "做好防晒（涂抹防晒霜），切勿用手挤压痘痘，并尊医嘱护理。",
    ja: "日焼け止めを必ず使用し、ニキビを潰さないようにしてください。医師の指示に従ってください。"
  },
  "Gunakan pelembap dan sunscreen secara rutin.": {
    id: "Gunakan pelembap dan sunscreen secara rutin.",
    en: "Regularly apply clinical moisturizer and broad-spectrum sunscreen.",
    ar: "ضع المرطب الطبي وواقي الشمس بانتظام وبشكل يومي.",
    zh: "日常加强医学保湿与全面物理/化学防晒护肤。",
    ja: "十分な保湿とお肌に優しい日焼け止めを毎日の習慣にしてください。"
  },
  "Wajib sunscreen, hindari panas berlebih 3-5 hari.": {
    id: "Wajib sunscreen, hindari panas berlebih 3-5 hari.",
    en: "SPF is mandatory, avoid sauna, steam, and excessive heat for 3-5 days.",
    ar: "واقي الشمس إلزامي، وتجنب الساونا والبخار والحرارة الزائدة لمدة ٣-٥ أيام.",
    zh: "必须坚持涂抹防晒，3-5天内避免桑拿、高温桑拿或剧烈运动发热。",
    ja: "日焼け止めは必須です。3～5日間はサウナ、温泉、過度な発熱活動はお控えください。"
  },
  "Hindari pijat wajah berlebihan setelah treatment.": {
    id: "Hindari pijat wajah berlebihan setelah treatment.",
    en: "Avoid intense facial massages or facial friction for 2 weeks.",
    ar: "تجنب تدليك الوجه المكثف أو فرك الوجه لمدة أسبوعين.",
    zh: "治疗后2周内，请勿进行面部用力推拿、按摩或高频震动。",
    ja: "施術後2週間は、お顔のマッサージや強い摩擦はお控えください。"
  },
  "Hindari makanan terlalu panas atau dingin setelah scaling jika gigi sensitif.": {
    id: "Hindari makanan terlalu panas atau dingin setelah scaling jika gigi sensitif.",
    en: "Avoid extremely hot or cold food/drinks for 24h if teeth feel sensitive.",
    ar: "تجنب الأطعمة/المشروبات شديدة السخونة أو البرودة لمدة ٢٤ ساعة في حال وجود حساسية.",
    zh: "洗牙后若牙齿出现短暂酸软，24小时内应避免过冷、过热饮食刺激。",
    ja: "知覚過敏症状がある場合、術後24時間は極端に熱い・冷たい飲食をお避けください。"
  },
  "Konsultasikan hasil dengan dokter.": {
    id: "Konsultasikan hasil dengan dokter.",
    en: "Ensure a formal follow-up medical consultation to interpret all results.",
    ar: "احرص على إجراء استشارة طبية رسمية لتفسير جميع النتائج وفهمها.",
    zh: "请约见医生进行正式的报告解读面诊，制定健康干预建议。",
    ja: "結果の解釈と今後のアドバイスについて、必ず医師のカウンセリングをお受けください。"
  },

  // Doctor Specialties
  "Dermatology & Aesthetic": {
    id: "Dermatology & Aesthetic",
    en: "Dermatology & Aesthetic Specialists",
    ar: "أخصائي الأمراض الجلدية والتجميل",
    zh: "皮肤科与医疗美容医生",
    ja: "皮膚科・美容皮膚科専門医"
  },
  "General Health & Wellness": {
    id: "General Health & Wellness",
    en: "General Health & Wellness Expert",
    ar: "خبير الصحة العامة والعافية",
    zh: "全科健康管理与医学抗衰专家",
    ja: "一般内科・ウェルネス専門医"
  },
  "Beauty Therapist": {
    id: "Beauty Therapist",
    en: "Certified Aesthetic Therapist",
    ar: "معالجة تجميلية معتمدة",
    zh: "资深持证美疗师",
    ja: "メディカルエステティシャン"
  },

  // Doctor Bios
  "Dokter spesialis dermatologi dengan pengalaman dalam perawatan jerawat, pigmentasi, laser, dan rejuvenation.": {
    id: "Dokter spesialis dermatologi dengan pengalaman dalam perawatan jerawat, pigmentasi, laser, dan rejuvenation.",
    en: "Senior dermatologist specializing in acne revision, advanced pigmentation laser therapies, and anti-aging rejuvenation.",
    ar: "طبيب جلدية أول متخصص في علاج حب الشباب وعلاجات الليزر المتقدمة للتصبغات وتجديد ملامح الشباب.",
    zh: "资深皮肤科专科医生，在痤疮治疗、色素色斑激光干预及中胚层抗衰抗老化治疗领域拥有丰富临床经验。",
    ja: "ニキビ跡の修復、最先端のシミ・色素沈着レーザー治療、アンチエイジングリジュビネーションを専門とするベテラン皮膚科医。"
  },
  "Dokter gigi dengan fokus pada scaling, whitening, veneer consultation, dan smile care.": {
    id: "Dokter gigi dengan fokus pada scaling, whitening, veneer consultation, dan smile care.",
    en: "Expert dentist focusing on gentle scaling, premium whitening, cosmetic veneers, and comprehensive smile care.",
    ar: "طبيب أسنان مختص يركز على تنظيف الجير اللطيف، والتبييض المتميز، والعدسات التجميلية، ورعاية الابتسامة الشاملة.",
    zh: "资深牙科医生，致力于微创洁牙、牙齿美白、全瓷贴面及美学微创微笑重塑。",
    ja: "低刺激な歯石除去、プレミアムホワイトニング、ラミネートベニア、美しい笑顔を作る審美歯科を専門とする歯科医。"
  },
  "Dokter umum dengan minat pada wellness, preventive care, dan medical check-up.": {
    id: "Dokter umum dengan minat pada wellness, preventive care, dan medical check-up.",
    en: "Dedicated medical practitioner focusing on longevity wellness, preventive diagnostics, and holistic annual checks.",
    ar: "ممارس طبي متخصص يركز على عافية طول العمر، والتشخيص الوقائي، والفحوصات السنوية الشاملة.",
    zh: "全科临床医师，专注于慢性病预防、综合抗衰调理以及高管全套预防性医学体检。",
    ja: "予防医学、ウェルネス、総合的な人間ドック・健康増進プログラムに情熱を注ぐ臨床総合医。"
  },
  "Beauty therapist berpengalaman dalam facial premium, aftercare, dan customer treatment journey.": {
    id: "Beauty therapist berpengalaman dalam facial premium, aftercare, dan customer treatment journey.",
    en: "Skilled aesthetician experienced in advanced clinical facials, skin barrier recovery, and customized client care journeys.",
    ar: "خبيرة تجميل ماهرة ذات خبرة في فيشال العيادات المتقدم، واستعادة حاجز البشرة، ورحلات العناية المخصصة للعملاء.",
    zh: "高级持证美疗师，擅长医学级面部深度护理、皮肤屏障修复理疗及顾客美学疗程的全流程精细服务。",
    ja: "メディカルフェイシャル、肌バリア機能修復、お客様一人ひとりに合わせたスキンケアを熟知したベテランエステティシャン。"
  },

  // Before After Cases
  "Acne Scar Treatment": { id: "Acne Scar Treatment", en: "Acne Scar Therapy Journey", ar: "رحلة علاج آثار حب الشباب", zh: "重度痤疮凹洞疤痕修复案例", ja: "重度ニキビ跡・クレーター修復症例" },
  "Rangkaian laser Co2 fractional & subsisi bopeng pipi.": {
    id: "Rangkaian laser Co2 fractional & subsisi bopeng pipi.",
    en: "Series of fractional CO2 laser treatments & scar subcision.",
    ar: "سلسلة من جلسات ليزر CO2 الجزئي وتقطيع الألياف للندبات.",
    zh: "历时数月的二氧化碳点阵激光与局部剥离技术联合治疗成果。",
    ja: "フラクショナルCO2レーザーとサブシジョンの組み合わせ治療経過。"
  },
  "Hasil optimal tergantung kedalaman scar awal.": {
    id: "Hasil optimal tergantung kedalaman scar awal.",
    en: "Optimal results depend heavily on the initial scar depth and healing response.",
    ar: "تعتمد النتائج المثالية بشكل كبير على عمق الندبة الأولي واستجابة الجلد للشفاء.",
    zh: "治疗效果因人而异，最终呈现与患者初始凹洞深度和皮肤增生能力密切相关。",
    ja: "治療結果は、当初のクレーターの深さやご本人の回復力により異なります。"
  },
  "Pigmentation Laser": { id: "Pigmentation Laser", en: "Advanced Pigmentation Laser Therapy", ar: "ليزر متقدم لعلاج التصبغات والكلف", zh: "激光精准祛除颧骨褐青色斑", ja: "最先端レーザーによるシミ・色素沈着治療" },
  "Penghilangan melasma berlebih dengan Pico Laser 3 sesi.": {
    id: "Penghilangan melasma berlebih dengan Pico Laser 3 sesi.",
    en: "Fading stubborn hormonal melasma using 3 Pico Laser sessions.",
    ar: "تفتيح الكلف الهرموني العنيد باستخدام ٣ جلسات من البيكو ليزر.",
    zh: "采用新一代皮秒激光（Pico Laser）进行3个疗程后，顽固黄褐斑消退效果。",
    ja: "ピコレーザー3セッション照射による、頑固なホルモン性肝斑の改善効果。"
  },
  "Pasien wajib patuh sunscreen pasca-tindakan.": {
    id: "Pasien wajib patuh sunscreen pasca-tindakan.",
    en: "Patient compliance with high-protection sunscreen is strictly required.",
    ar: "التزام المريض التام بواقي الشمس عالي الحماية مطلوب بشدة بعد الجلسات.",
    zh: "术后患者必须严格执行SPF50+防晒规定，避免反黑。",
    ja: "施術後は高防御性の日焼け止め使用を厳格に守っていただきます。"
  },
  "HIFU V-Shape Lifting": { id: "HIFU V-Shape Lifting", en: "HIFU Non-Invasive V-Shape Lift", ar: "نحت وشد الوجه على شكل V بالهايفو", zh: "HIFU超声提拉紧致下颌线", ja: "HIFUによる切らない小顔Vラインリフト" },
  "Penegasan garis rahang & pengurangan double chin 1 sesi.": {
    id: "Penegasan garis rahang & pengurangan double chin 1 sesi.",
    en: "Jawline definition & double chin reduction after 1 session.",
    ar: "تحديد خط الفك وتقليل الذقن المزدوج بعد جلسة هايفو واحدة فقط.",
    zh: "进行1次超声刀全面部深层拉皮治疗后的下颌线紧致与双下巴收紧效果。",
    ja: "1セッションの照射による、顎ラインの引き締めと二重あごの解消効果。"
  },
  "Hasil bertahan hingga 6-12 bulan sesuai lifestyle.": {
    id: "Hasil bertahan hingga 6-12 bulan sesuai lifestyle.",
    en: "Results last up to 6-12 months depending on age and lifestyle factors.",
    ar: "تستمر النتائج لمدة تصل إلى ٦-١٢ شهرًا حسب العمر وعوامل أسلوب الحياة.",
    zh: "紧致效果通常可维持6-12个月，具体时间取决于年龄及日常保养习惯。",
    ja: "治療効果は年齢やライフスタイルにより、6～12か月間持続します。"
  },

  // Weekdays
  "Senin": { id: "Senin", en: "Monday", ar: "الإثنين", zh: "星期一", ja: "月曜日" },
  "Selasa": { id: "Selasa", en: "Tuesday", ar: "الثلاثاء", zh: "星期二", ja: "火曜日" },
  "Rabu": { id: "Rabu", en: "Wednesday", ar: "الأربعاء", zh: "星期三", ja: "水曜日" },
  "Kamis": { id: "Kamis", en: "Thursday", ar: "الخميس", zh: "星期四", ja: "木曜日" },
  "Jumat": { id: "Jumat", en: "Friday", ar: "الجمعة", zh: "星期五", ja: "金曜日" },
  "Sabtu": { id: "Sabtu", en: "Saturday", ar: "السبت", zh: "星期六", ja: "土曜日" },
  "Minggu": { id: "Minggu", en: "Sunday", ar: "الأحد", zh: "星期日", ja: "日曜日" },

  // Video Demo Interactive Walkthrough Captions
  "⚡ Memuat sistem CRM & grafik pendapatan klinik kecantikan secara real-time...": {
    id: "⚡ Memuat sistem CRM & grafik pendapatan klinik kecantikan secara real-time...",
    en: "⚡ Loading real-time clinic CRM data & revenue forecasting charts...",
    ar: "⚡ جاري تحميل بيانات إدارة علاقات العملاء في العيادة ورسوم التنبؤ بالإيرادات في الوقت الفعلي...",
    zh: "⚡ 正在实时载入诊所CRM智能数据监控与营业收入分析图表...",
    ja: "⚡ クリニックCRMのリアルタイムデータおよび売上予測チャートを読み込んでいます..."
  },
  "📅 Memantau riwayat janji temu aktif pasien hari ini & status pembayaran...": {
    id: "📅 Memantau riwayat janji temu aktif pasien hari ini & status pembayaran...",
    en: "📅 Monitoring today's active patient appointments & pending/paid ledger balances...",
    ar: "📅 مراقبة مواعيد المرضى النشطة اليوم وأرصدة الدفاتر المعلقة/المدفوعة...",
    zh: "📅 正在监控今日门诊预约队列、到院签到率及账单实收账款状态...",
    ja: "📅 本日のアクティブ受診予約リストおよび未決済・決済完了残高を監視しています..."
  },
  "📈 Menghubungkan promosi & campaign berkuota otomatis secara instan...": {
    id: "📈 Menghubungkan promosi & campaign berkuota otomatis secara instan...",
    en: "📈 Instantly launching targeted promotions & multi-channel marketing campaigns...",
    ar: "📈 إطلاق العروض الترويجية المستهدفة وحملات التسويق متعددة القنوات على الفور...",
    zh: "📈 一键连通限时特惠渠道推广与全域自动化营销转化模型...",
    ja: "📈 ターゲットを絞ったプロモーションと自動キャンペーンを瞬時に開始しています..."
  },
  "🎯 Pasien meluncurkan diagnostic Skin Quiz & menginput concern kulit wajah...": {
    id: "🎯 Pasien meluncurkan diagnostic Skin Quiz & menginput concern kulit wajah...",
    en: "🎯 Patient starts the digital Skin Quiz & records main cosmetic concerns...",
    ar: "🎯 يبدأ المريض اختبار الجلد الرقمي ويسجل المخاوف التجميلية الرئيسية...",
    zh: "🎯 患者启动移动端美学皮肤自测クイズ并勾选核心面部皮肤困扰...",
    ja: "🎯 お客様がデジタル肌診断クイズを開始し、主なお肌の悩みを記録しています..."
  },
  "🔬 Rekomendasi medis cerdas menyarankan tindakan & skincare berstandar FDA...": {
    id: "🔬 Rekomendasi medis cerdas menyarankan tindakan & skincare berstandar FDA...",
    en: "🔬 Intelligent medical algorithm matching certified treatments & clinical skincare...",
    ar: "🔬 الخوارزمية الطبية الذكية تطابق العلاجات المعتمدة والعناية بالبشرة السريرية...",
    zh: "🔬 智能临床算法精准匹配符合FDA标准的针对性治疗方案与药妆处方...",
    ja: "🔬 お悩みに合わせたFDA承認治療やドクターズコスメを自動選定するAIアルゴリズム..."
  },
  "🎟️ Menyelesaikan reservasi otomatis dengan kode QR terenkripsi yang siap di-scan...": {
    id: "🎟️ Menyelesaikan reservasi otomatis dengan kode QR terenkripsi yang siap di-scan...",
    en: "🎟️ Finalizing booking with an encrypted QR check-in code sent to patient portal...",
    ar: "🎟️ إكمال الحجز برمز QR مشفر لتسجيل الوصول يتم إرساله إلى بوابة المريض...",
    zh: "🎟️ 锁定专属时间档，生成经强加密、支持现场扫码登入的电子二维码通关卡...",
    ja: "🎟️ 患者ポータルに送信される、受付用暗号化QRコード付きデジタルチケットを発行中..."
  },

  // Interactive Quiz Extra Texts
  "Pilih minimal satu Skin Concern Anda!": {
    id: "Pilih minimal satu Skin Concern Anda!",
    en: "Please select at least one skin concern!",
    ar: "يرجى اختيار مأزق جلدي واحد على الأقل!",
    zh: "请至少勾选一项您的肌肤困扰！",
    ja: "お肌のお悩みを少なくとも1つ選択してください！"
  },
  "Pilih tipe kulit Anda!": {
    id: "Pilih tipe kulit Anda!",
    en: "Please select your skin type!",
    ar: "يرجى اختيار نوع بشرتك!",
    zh: "请选择您的基本皮肤类型！",
    ja: "お肌のタイプを選択してください！"
  },
  "Pilih target hasil yang Anda inginkan!": {
    id: "Pilih target hasil yang Anda inginkan!",
    en: "Please select your target aesthetic goal!",
    ar: "يرجى تحديد هدفك الجمالي المنشود!",
    zh: "请勾选您期望达到的美丽目标！",
    ja: "ご希望される改善ゴールを選択してください！"
  },

  // Skin Concerns mapping
  "Pori besar": { id: "Pori besar", en: "Enlarged pores", ar: "المسام الواسعة", zh: "毛孔粗大", ja: "毛穴の開き" },
  "Kerutan halus": { id: "Kerutan halus", en: "Fine lines & wrinkles", ar: "الخطوط الدقيقة والتجاعيد", zh: "细纹与干纹", ja: "小じわ・シワ" },
  "Rambut rontok": { id: "Rambut rontok", en: "Hair loss", ar: "تساقط الشعر", zh: "脱发困扰", ja: "抜け毛・薄毛" },
  "Stretch mark": { id: "Stretch mark", en: "Stretch marks", ar: "علامات التمدد", zh: "妊娠纹/膨胀纹", ja: "肉割れ・妊娠線" },
  "Body slimming": { id: "Body slimming", en: "Body slimming & contouring", ar: "تخسيس ونحت الجسم", zh: "身体塑形与减脂", ja: "痩身・ボディライン" },

  // Skin Types mapping
  "Berminyak": { id: "Berminyak", en: "Oily", ar: "دهنية", zh: "油性肌肤", ja: "脂性肌" },
  "Kering": { id: "Kering", en: "Dry", ar: "جافة", zh: "干燥肌肤", ja: "乾燥肌" },
  "Kombinasi": { id: "Kombinasi", en: "Combination", ar: "مختلطة", zh: "混合性肌肤", ja: "混合肌" },
  "Sensitif": { id: "Sensitif", en: "Sensitive", ar: "حساسة", zh: "敏感性肌肤", ja: "敏感肌" },
  "Normal": { id: "Normal", en: "Normal", ar: "عادية", zh: "中性肌肤", ja: "普通肌" },
  "Tidak tahu": { id: "Tidak tahu", en: "Not sure / I don't know", ar: "لا أعلم", zh: "暂不清楚", ja: "わからない" },

  // Targets mapping
  "Kulit lebih cerah": { id: "Kulit lebih cerah", en: "Brighter skin complexion", ar: "بشرة أكثر إشراقًا وتفتيحًا", zh: "肌肤更加白皙透亮", ja: "透明感のある明るい肌" },
  "Jerawat lebih terkendali": { id: "Jerawat lebih terkendali", en: "Better controlled acne breakouts", ar: "التحكم في ظهور حب الشباب", zh: "粉刺痘痘得到彻底遏制", ja: "ニキビの出にくい肌" },
  "Bekas jerawat memudar": { id: "Bekas jerawat memudar", en: "Faded acne scars & hyperpigmentation", ar: "تلاشي آثار حب الشباب والتصبغات", zh: "痘印与凹洞淡化抚平", ja: "ニキビ跡を目立たなくする" },
  "Kulit lebih glowing": { id: "Kulit lebih glowing", en: "Dewy, radiant & glowing skin", ar: "بشرة متوهجة ورطبة كالمياه", zh: "皮肤展现水润亮泽蜜光", ja: "ツヤとハリのある水光肌" },
  "Wajah lebih kencang": { id: "Wajah lebih kencang", en: "Firmer, lifted & youthful face", ar: "وجه أكثر تماسكًا وشدًا", zh: "面部轮廓深度提升紧致", ja: "若々しく引き締まった小顔" },
  "Pori tampak lebih halus": { id: "Pori tampak lebih halus", en: "Smoother & minimized pores", ar: "مسام أنعم وأصغر مظهرًا", zh: "毛孔更加细腻平滑", ja: "きめの整った滑らかな毛孔" },
  "Bentuk wajah lebih proporsional": { id: "Bentuk wajah lebih proporsional", en: "More contoured & balanced face shape", ar: "شكل وجه أكثر تناسقًا وتحديدًا", zh: "五官轮廓更具立体美学美感", ja: "バランスの整った立体的な顔立ち" },
  "Ingin konsultasi dulu": { id: "Ingin konsultasi dulu", en: "I want a general doctor consultation first", ar: "أرغب في استشارة عامة مع الطبيب أولاً", zh: "期望先与专科医师深度咨询", ja: "まずはカウンセリングで相談したい" },

  // Booking Wizard alerts
  "Pilih Layanan/Treatment medis yang Anda butuhkan!": {
    id: "Pilih Layanan/Treatment medis yang Anda butuhkan!",
    en: "Please choose the Medical Treatment/Service you need!",
    ar: "يرجى اختيار الخدمة أو العلاج الطبي الذي تريده!",
    zh: "请先选择您需要的医学美容/治疗项目！",
    ja: "ご希望される施術・治療メニューを選択してください！"
  },
  "Pilih dokter atau spesialis terapis kecantikan!": {
    id: "Pilih dokter atau spesialis terapis kecantikan!",
    en: "Please select a specialist doctor or aesthetic therapist!",
    ar: "يرجى تحديد الطبيب المختص أو المعالج التجميلي!",
    zh: "请先选择您的主治专科医生或美疗师！",
    ja: "担当医師またはエステティシャンを選択してください！"
  },

  // General Buttons and Common Terms
  "Pesan Sekarang": { id: "Pesan Sekarang", en: "Book Now", ar: "احجز الآن", zh: "立即预约", ja: "予約する" },
  "Detail Layanan": { id: "Detail Layanan", en: "Treatment Details", ar: "تفاصيل الخدمة", zh: "项目详情", ja: "メニュー詳細" },
  "Pilih Cabang": { id: "Pilih Cabang", en: "Select Branch", ar: "اختر الفرع", zh: "选择门店", ja: "店舗選択" },
  "Pilih Dokter": { id: "Pilih Dokter", en: "Select Doctor", ar: "اختر الطبيب", zh: "选择医生", ja: "医師選択" },
  "Langkah": { id: "Langkah", en: "Step", ar: "خطوة", zh: "步骤", ja: "ステップ" },
  "Sebelumnya": { id: "Sebelumnya", en: "Previous", ar: "السابق", zh: "上一步", ja: "戻る" },
  "Lanjutkan": { id: "Lanjutkan", en: "Continue", ar: "Continue", zh: "下一步", ja: "進む" },
  "Hubungi Kami": { id: "Hubungi Kami", en: "Contact Us", ar: "اتصل بنا", zh: "联系我们", ja: "お問い合わせ" },
  "Tutup Detail": { id: "Tutup Detail", en: "Close Details", ar: "إغلاق التفاصيل", zh: "关闭详情", ja: "詳細を闭じる" },
  "Booking Treatment Ini": { id: "Booking Treatment Ini", en: "Book This Treatment", ar: "احجز هذا العلاج", zh: "预约此项目", ja: "このメニューで予約" },
  "Lihat Praktek": { id: "Lihat Praktek", en: "View Schedule", ar: "عرض الجدول", zh: "查看排班", ja: "スケジュール確認" },
  "Tutup Jadwal": { id: "Tutup Jadwal", en: "Close Schedule", ar: "إغلاق الجدول", zh: "关闭日程表", ja: "日程を閉じる" },

  // Missing translation keys added for PatientPortal, BookingWizard, and InteractiveQuiz
  "Overview Patient Account": {
    id: "Ikhtisar Akun Pasien",
    en: "Overview Patient Account",
    ar: "نظرة عامة على حساب المريض",
    zh: "患者账户概览",
    ja: "患者アカウントの概要"
  },
  "Booking & Tiket QR Saya": {
    id: "Booking & Tiket QR Saya",
    en: "My Bookings & QR Tickets",
    ar: "حجوزاتي وتذاكر QR الخاصة بي",
    zh: "我的预约与二维码凭证",
    ja: "私の予約とQRチケット"
  },
  "Riwayat Kunjungan Medis": {
    id: "Riwayat Kunjungan Medis",
    en: "Medical Visit History",
    ar: "سجل الزيارات الطبية",
    zh: "历史门诊记录",
    ja: "受診履歴"
  },
  "Benefit Stat Level Member": {
    id: "Benefit Stat Level Member",
    en: "Membership Tier Status & Benefits",
    ar: "مزايا مستوى العضوية",
    zh: "会员等级专属权益",
    ja: "会員ランク特典"
  },
  "Agenda Kunjungan Medis Terdekat:": {
    id: "Agenda Kunjungan Medis Terdekat:",
    en: "Upcoming Medical Appointments:",
    ar: "المواعيد الطبية القادمة:",
    zh: "近期到院就诊计划:",
    ja: "直近の受診スケジュール:"
  },
  "Dokter Pendamping:": {
    id: "Dokter Pendamping:",
    en: "Attending Doctor:",
    ar: "الطبيب المعالج:",
    zh: "主诊医生:",
    ja: "担当医師:"
  },
  "Waktu Reservasi:": {
    id: "Waktu Reservasi:",
    en: "Reservation Time:",
    ar: "وقت الحجز:",
    zh: "预约时间:",
    ja: "予約日時:"
  },
  "Batalkan Booking": {
    id: "Batalkan Booking",
    en: "Cancel Booking",
    ar: "إلغاء الحجز",
    zh: "取消预约",
    ja: "予約をキャンセル"
  },
  "Panduan Pasca Tindakan (Aftercare) Aktif:": {
    id: "Panduan Pasca Tindakan (Aftercare) Aktif:",
    en: "Active Post-Treatment (Aftercare) Guide:",
    ar: "دليل الرعاية اللاحقة النشط بعد العلاج:",
    zh: "当前有效的术后保养指南（Aftercare）:",
    ja: "現在有効なアフターケアガイド:"
  },
  "Petunjuk Perawatan Kulit Penting:": {
    id: "Petunjuk Perawatan Kulit Penting:",
    en: "Important Skin Care Instructions:",
    ar: "إرشادات هامة للعناية بالبشرة:",
    zh: "重要的皮肤护理说明:",
    ja: "重要なスキンケアの注意事項:"
  },
  "Telepon:": {
    id: "Telepon:",
    en: "Phone:",
    ar: "الهاتف:",
    zh: "电话:",
    ja: "電話:"
  },
  "ID Member:": {
    id: "ID Member:",
    en: "Member ID:",
    ar: "رقم العضوية:",
    zh: "会员ID:",
    ja: "会員ID:"
  },
  "Pilih Bahasa": { id: "Pilih Bahasa", en: "Select Language", ar: "اختر اللغة", zh: "选择语言", ja: "言語選択" },
  "Benefit Memberaktif Anda:": { id: "Benefit Memberaktif Anda:", en: "Your Active Member Benefits:", ar: "مزايا عضويتك النشطة:", zh: "您的活跃会员权益：", ja: "アクティブ会員特典：" },
  "Voucher free facial treatment senilai Rp 150.000 akan otomatis aktif di email Anda pada tanggal lahir terdaftar!": { id: "Voucher free facial treatment senilai Rp 150.000 akan otomatis aktif di email Anda pada tanggal lahir terdaftar!", en: "A free facial treatment voucher worth Rp 150,000 will be auto-activated on your registered birthdate!", ar: "سيتم تفعيل قسيمة علاج للوجه مجانية بقيمة ١٥٠ ألف روبية تلقائيًا في عيد ميلادك المسجل!", zh: "价值 Rp 150,000 的免费面部护理优惠券将在您的注册生日当天自动生效并发送至邮箱！", ja: "ご登録いただいたお誕生日に、150,000ルピア相当の無料フェイシャルトリートメントバウチャーが自動的に有効化されます！" },
  "Hadiah Ulang Tahun Menanti:": { id: "Hadiah Ulang Tahun Menanti:", en: "Birthday Gift Awaits:", ar: "هدية عيد ميلاد بانتظارك:", zh: "生日礼遇即将开启：", ja: "お誕生日プレゼントのご案内：" },
  "E-Invoices Pembayaran:": { id: "E-Invoices Pembayaran:", en: "E-Invoices & Payments:", ar: "الفواتير الإلكترونية والمدفوعات:", zh: "电子发票与款项账单：", ja: "電子インボイス・お支払い明細：" },
  "Tiket Antrean Prioritas QR Code Saya:": { id: "Tiket Antrean Prioritas QR Code Saya:", en: "My Priority Queue QR Code Ticket:", ar: "تذكرة رمز QR لخط الانتظار السريع الخاص بي:", zh: "我的专享优先队列电子二维码：", ja: "優先キュー用QRコードデジタルチケット：" },
  "Check-In QR": { id: "Check-In QR", en: "Check-In QR", ar: "رمز QR لتسجيل الوصول", zh: "现场扫码登入", ja: "チェックインQR" },
  "Cabang:": { id: "Cabang:", en: "Branch:", ar: "الفرع:", zh: "分部/门店:", ja: "分院:" },
  "Waktu:": { id: "Waktu:", en: "Time:", ar: "الوقت:", zh: "时间:", ja: "日時:" },
  "Bayar:": { id: "Bayar:", en: "Amount Paid:", ar: "المبلغ المدفوع:", zh: "实付款额:", ja: "お支払額:" },
  "Status Bayar:": { id: "Status Bayar:", en: "Payment Status:", ar: "حالة الدفع:", zh: "付款状态:", ja: "決済ステータス:" },
  "Tunjukkan QR Code di atas kepada assisten meja resepsionis setibanya Anda di klinik untuk pemindaian instan tanpa antrean manual.": { id: "Tunjukkan QR Code di atas kepada assisten meja resepsionis setibanya Anda di klinik untuk pemindaian instan tanpa antrean manual.", en: "Present this QR code to our receptionist desk upon arrival at the clinic for instant automated check-in.", ar: "يرجى عرض رمز QR أعلاه لموظف الاستقبال عند وصولك إلى العيادة لتسجيل الوصول الفوري.", zh: "到达诊所后，请向柜台接待人员出示此二维码进行快速扫描，即可省去现场排队时间，开启绿色通道。", ja: "クリニックに到着されましたら、受付スタッフにこのQRコードをご提示いただくことで、手動の列に並ぶことなく瞬時にチェックインが完了します。" },
  "Riwayat Kunjungan Medis & Terapi:": { id: "Riwayat Kunjungan Medis & Terapi:", en: "Medical Visits & Therapy History:", ar: "سجل الزيارات الطبية والعلاجية:", zh: "历史就诊及医学理疗记录：", ja: "受診および治療の履歴：" },
  "Tanggal Kunjungan": { id: "Tanggal Kunjungan", en: "Visit Date", ar: "تاريخ الزيارة", zh: "就诊日期", ja: "受診日" },
  "Kode Booking": { id: "Kode Booking", en: "Booking Code", ar: "رمز الحجز", zh: "预约编号", ja: "予約コード" },
  "Layanan / Tindakan": { id: "Layanan / Tindakan", en: "Service / Treatment", ar: "الخدمة / العلاج", zh: "诊疗/护理项目", ja: "メニュー・施術内容" },
  "Spesialis Dokter": { id: "Spesialis Dokter", en: "Specialist Doctor", ar: "الطبيب المختص", zh: "主治专科医生", ja: "担当医・スペシャリスト" },
  "Status & Aftercare": { id: "Status & Aftercare", en: "Status & Aftercare", ar: "الحالة والرعاية اللاحقة", zh: "状态与术后护理", ja: "ステータスとアフターケア" },
  "Program Member Plan Aurora": { id: "Program Member Plan Aurora", en: "Aurora Membership Plan Program", ar: "برنامج خطط عضوية أورورا", zh: "Aurora 尊享会员计划", ja: "Aurora メンバーシッププログラム" },
  "Level Anda:": { id: "Level Anda:", en: "Your Tier:", ar: "مستواك:", zh: "当前会员等级:", ja: "現在のランク:" },
  "Harga Keanggotaan:": { id: "Harga Keanggotaan:", en: "Membership Price:", ar: "سعر العضوية:", zh: "会员计划费用:", ja: "メンバーシップ価格:" },
  "Fakultatif (Gratis)": { id: "Fakultatif (Gratis)", en: "Complimentary (Free)", ar: "مجاني", zh: "专属获赠 (免费)", ja: "無料" },
  "Durasi level:": { id: "Durasi level:", en: "Tier Duration:", ar: "مدة المستوى:", zh: "会员有效期:", ja: "有効期間:" },
  "Silakan hubungi Billing Finance Admin untuk mendaftarkan upgrade level ke": { id: "Silakan hubungi Billing Finance Admin untuk mendaftarkan upgrade level ke", en: "Please contact our Billing & Finance Administrator to upgrade your tier to", ar: "يرجى الاتصال بمسؤول الفواتير والمالية لترقية مستواك إلى", zh: "请联系财务与账单管理员申请升级您的会员等级至", ja: "メンバーシップランクのアップグレードについては、当院の経理・会計担当者までお問い合わせください：" },
  "secara aman!": { id: "secara aman!", en: "securely!", ar: "بأمان!", zh: "，我们将保障您的资金和账户安全！", ja: "安全にアップグレードを承ります。" },
  "Daftar Plan Ini": { id: "Daftar Plan Ini", en: "Join This Plan", ar: "انضم إلى هذه الخطة", zh: "加入此会员计划", ja: "このプランに参加" },
  "INVOICE PEMBAYARAN": { id: "INVOICE PEMBAYARAN", en: "PAYMENT INVOICE", ar: "فاتورة الدفع", zh: "电子款项发票", ja: "お支払いインボイス" },
  "Nomor:": { id: "Nomor:", en: "Invoice No:", ar: "رقم الفاتورة:", zh: "发票编号:", ja: "インボイス番号:" },
  "Tanggal:": { id: "Tanggal:", en: "Date:", ar: "التاريخ:", zh: "日期:", ja: "日付:" },
  "Identitas Pasien:": { id: "Identitas Pasien:", en: "Patient Identity:", ar: "هوية المريض:", zh: "患者基本信息:", ja: "患者様情報:" },
  "Metode Transaksi:": { id: "Metode Transaksi:", en: "Transaction Method:", ar: "طريقة المعاملة:", zh: "交易结算方式:", ja: "決済方法:" },
  "E-Payment Simulator (VA/QRIS)": { id: "E-Payment Simulator (VA/QRIS)", en: "E-Payment Simulator (VA/QRIS)", ar: "محاكي الدفع الإلكتروني (VA/QRIS)", zh: "在线支付仿真系统 (虚拟账户/QRIS)", ja: "電子決済シミュレータ (VA/QRIS)" },
  "PAID / LUNAS": { id: "PAID / LUNAS", en: "PAID / SUCCESSFUL", ar: "مدفوع / تم السداد", zh: "PAID / 已付讫", ja: "PAID / 決済完了" },
  "Deskripsi Pekerjaan Medis / Treatment": { id: "Deskripsi Pekerjaan Medis / Treatment", en: "Medical Service / Treatment Description", ar: "تفاصيل الخدمة الطبية / العلاج", zh: "医疗服务/诊疗护理明细描述", ja: "提供する医療サービス・治療明细" },
  "Biaya Terkandungi": { id: "Biaya Terkandungi", en: "Amount Charged", ar: "المبلغ المطلوب", zh: "计费金额", ja: "請求金額" },
  "Pakar Medis:": { id: "Pakar Medis:", en: "Medical Practitioner:", ar: "الممارس الطبي:", zh: "主诊医师/专家:", ja: "担当医师:" },
  "TOTAL PEMBAYARAN BOOKING FEE:": { id: "TOTAL PEMBAYARAN BOOKING FEE:", en: "TOTAL BOOKING FEE PAID:", ar: "إجمالي رسوم الحجز المدفوعة:", zh: "预订定金总计已收:", ja: "お支払い済み予約料合計:" },
  "Pembayaran ini sah diproses secara digital dan dilidungi enkripsi Aurora MedBeauty. Biaya pelunasan treatment penuh dilakukan di kasir outlet pasca tindakan selesai.": { id: "Pembayaran ini sah diproses secara digital dan dilidungi enkripsi Aurora MedBeauty. Biaya pelunasan treatment penuh dilakukan di kasir outlet pasca tindakan selesai.", en: "This payment is successfully processed digitally and secured with encryption. The remaining treatment balance will be paid at the clinic cashier post-treatment.", ar: "تمت معالجة هذه الدفعة رقمياً بأمان وهي مشفرة. سيتم سداد المبلغ المتبقي للعلاج في مكتب محاسبة العيادة بعد الانتهاء.", zh: "此账单由 Aurora 医美系统安全加密并完成数字化入账。疗程的尾款余额将在您现场接受治疗并完结后，在门店收银台结清。", ja: "この決済はデジタル上で安全に処理され、Auroraのセキュリティ暗号によって保護されています。残りの治療費は、施術完了後に院内レジにてご精算いただきます。" },
  "Cetak Buku Receipt (PDF)": { id: "Cetak Buku Receipt (PDF)", en: "Print Receipt (PDF)", ar: "طباعة الإيصال (PDF)", zh: "打印电子收据 (PDF)", ja: "レシート印刷 (PDF)" },
  "Tutup Invoice": { id: "Tutup Invoice", en: "Close Invoice", ar: "إغلاق الفاتورة", zh: "关闭发票", ja: "インボイスを閉じる" },
  "Ajukan Perubahan Jadwal Medis": { id: "Ajukan Perubahan Jadwal Medis", en: "Request Appointment Rescheduling", ar: "طلب إعادة جدولة الموعد", zh: "申请调整就诊预约时间", ja: "受診予約日時の変更リクエスト" },
  "Pilih shift tanggal dan jam alternatif untuk booking": { id: "Pilih shift tanggal dan jam alternatif untuk booking", en: "Select alternative date and shift time for booking", ar: "اختر تاريخًا وبديلًا لوقت الحجز", zh: "请选择您期望重新调配的备选日期和时间档：", ja: "別の受診希望日とお時間帯を選択してください：" },
  "sesuai kelonggaran jadwal Anda:": { id: "sesuai kelonggaran jadwal Anda:", en: "according to your schedule availability:", ar: "وفقًا لجدول توفرك:", zh: "，以便根据医生的空档进行排程：", ja: "（空き状況に応じて調整いたします）" },
  "Tanggal Baru:": { id: "Tanggal Baru:", en: "New Date:", ar: "التاريخ الجديد:", zh: "新日期:", ja: "変更後の日付:" },
  "Pilih Jam Alternatif:": { id: "Pilih Jam Alternatif:", en: "Select Alternative Time:", ar: "اختر وقتًا بديلًا:", zh: "选择备选时间段:", ja: "変更後の时间帯:" },
  "Sistem asisten perawat akan mencocokkan ketersediaan jadwal dokter dan mengirim notifikasi WhatsApp konfirmasi maksimal dalam 1 jam terhitung sejak request dikirim.": { id: "Sistem asisten perawat akan mencocokkan ketersediaan jadwal dokter dan mengirim notifikasi WhatsApp konfirmasi maksimal dalam 1 jam terhitung sejak request dikirim.", en: "Our nurse assistant will match your request with the doctor's availability and send a WhatsApp confirmation within 1 hour.", ar: "سيقوم ممرضنا بمطابقة طلبك مع توفر الطبيب وإرسال تأكيد عبر الواتساب في غضون ساعة واحدة.", zh: "护士助理将立刻匹配医生的出诊状态，并在1小时内通过系统服务号向您发送微信/WhatsApp日程更新通知。", ja: "看護助助手医師の空き状況と照合し、リクエスト送信から1時間以内にWhatsAppにて変更確定通知をお送りいたします。" },
  "Batal": { id: "Batal", en: "Cancel", ar: "إلغاء", zh: "取消", ja: "キャンセル" },
  "Ajukan Sekarang": { id: "Ajukan Sekarang", en: "Submit Request", ar: "إرسال الطلب", zh: "立即提交申请", ja: "変更を申請する" },

  // Booking Wizard
  "Kembali ke Beranda": { id: "Kembali ke Beranda", en: "Back to Home", ar: "العودة إلى الصفحة الرئيسية", zh: "返回主页", ja: "ホームに戻る" },
  "Kembali": { id: "Kembali", en: "Go Back", ar: "رجوع", zh: "返回", ja: "戻る" },
  "Lanjut Isi Riwayat Medis": { id: "Lanjut Isi Riwayat Medis", en: "Continue to Medical History", ar: "متابعة إلى التاريخ الطبي", zh: "继续填写既往健康状况", ja: "メディカルヒストリー入力に進む" },
  "Lembar Riwayat Konsultasi & Data Pasien": { id: "Lembar Riwayat Konsultasi & Data Pasien", en: "Consultation Form & Patient Medical History", ar: "استمارة الاستشارة والتاريخ الطبي للمريض", zh: "面诊病历及患者健康档案表", ja: "カウンセリング用メディカルシート" },
  "Lengkapi data kesehatan Anda agar dokter dapat memahami keluhan awal secara paripurna.": { id: "Lengkapi data kesehatan Anda agar dokter dapat memahami keluhan awal secara paripurna.", en: "Please complete your wellness information so our doctors can thoroughly evaluate your skin health.", ar: "يرجى إكمال معلوماتك الصحية حتى يتمكن أطباؤنا من تقييم صحة بشرتك بدقة.", zh: "请如实完整填写您的健康数据，以便临床医生能够100%全面地评估您的皮肤与身体状况。", ja: "医師がお客様の初期症状やお悩みを正しく把握できるよう、健康状態の詳細をご入力ください。" },
  "Nama Lengkap Sesuai KTP *": { id: "Nama Lengkap Sesuai KTP *", en: "Full Name (as in National ID/Passport) *", ar: "الاسم الكامل (حسب بطاقة الهوية/جواز السفر) *", zh: "患者法定真实姓名 (须与身份证一致) *", ja: "フルネーム（身分証通り） *" },
  "Contoh: Nadia Rahma": { id: "Contoh: Nadia Rahma", en: "e.g., Nadia Rahma", ar: "مثال: نادية رحمة", zh: "例如：张美玲", ja: "例：山田 花子" },
  "No. WhatsApp Aktif *": { id: "No. WhatsApp Aktif *", en: "Active WhatsApp Number *", ar: "رقم الواتساب النشط *", zh: "常用微信/WhatsApp联系号码 *", ja: "有効なWhatsApp番号 *" },
  "Alamat Email Aktif *": { id: "Alamat Email Aktif *", en: "Active Email Address *", ar: "البريد الإلكتروني النشط *", zh: "常用电子邮箱地址 *", ja: "有効なメールアドレス *" },
  "Keluhan Awal atau Riwayat Estetik (Opsional)": { id: "Keluhan Awal atau Riwayat Estetik (Opsional)", en: "Primary Concerns or Past Cosmetic Procedures (Optional)", ar: "الشكاوى الرئيسية أو الإجراءات التجميلية السابقة (اختياري)", zh: "主诉症状或过往医美治疗史 (选填)", ja: "主な症状・過去の美容施術歴（任意）" },
  "Ceritakan sejarah iritasi kulit Anda, alergi logam, pemakaian krim racikan dokter sebelumnya, atau masalah scaling gigi di sini...": { id: "Ceritakan sejarah iritasi kulit Anda, alergi logam, pemakaian krim racikan dokter sebelumnya, atau masalah scaling gigi di sini...", en: "Tell us about skin irritations, metallic allergies, prior chemical cream treatments, or scaling details...", ar: "أخبرنا عن تهيجات الجلد، أو الحساسية للمعادن، أو استخدام الكريمات السابقة...", zh: "请简要描述您的皮肤敏感史、金属/麻药过敏、是否正在使用医生处方药膏、或以前洗牙是否有过敏出血等症状...", ja: "お肌のかぶれや金属アレルギー、以前使用していたドクターズコスメ、歯科スケーリングでのトラブルなどがあればご記入ください..." },
  "Lampirkan Foto Skin Concern Anda (Opsional)": { id: "Lampirkan Foto Skin Concern Anda (Opsional)", en: "Attach Photos of Skin Concerns (Optional)", ar: "إرفاق صور لمشاكل البشرة (اختياري)", zh: "上传患处/皮肤照片 (选填)", ja: "お肌のお悩みの写真を添付（任意）" },
  "Membantu dokter mengevaluasi visual kondisi jerawat/eksim Anda sebelum berkunjung.": { id: "Membantu dokter mengevaluasi visual kondisi jerawat/eksim Anda sebelum berkunjung.", en: "Helps doctors visually evaluate your skin acne/eczema condition prior to check-in.", ar: "يساعد الأطباء على تقييم حالة حب الشباب/الإكزيما بصريًا قبل الموعد.", zh: "有助于医生在您到院前提前直观评估您面部的痤疮、痘痘、色斑或湿疹状况。", ja: "来院前にお悩みの部位（ニキビや赤み等）の状態を医師が事前に視覚的に確認・評価するのに役立ちます。" },
  "Uploaded & Encrypted": { id: "Uploaded & Encrypted", en: "Uploaded & Fully Encrypted", ar: "تم الرفع والتشفير بالكامل", zh: "照片已成功上传并进行医疗级加密", ja: "アップロード完了・暗号化保護済み" },
  "Simulasikan Kamera & Upload": { id: "Simulasikan Kamera & Upload", en: "Simulate Camera & Upload", ar: "محاكاة الكاميرا والرفع", zh: "模拟相机拍照并上传", ja: "カメラ起動およびアップロードを模擬する" },
  "Saya mengizinkan dokter melihat foto medis ini hanya untuk keperluan penunjang medis internal.": { id: "Saya mengizinkan dokter melihat foto medis ini hanya untuk keperluan penunjang medis internal.", en: "I authorize medical practitioners to view this clinical photo strictly for internal diagnostic support.", ar: "أفوض الأطباء بمشاهدة هذه الصورة السريرية الصارمة لدعم التشخيص الداخلي فقط.", zh: "我授权诊所主治医师及医疗团队出于诊疗评估目的，在医院内网查阅此照片，数据绝不外泄。", ja: "医療チームが院内でのカウンセリング・診断補助目的に限り、この写真を閲覧することに同意します。" },
  "Saya menyatakan bahwa semua rincian riwayat medis di atas diisi secara jujur. Saya setuju data saya dilindungi aman sesuai dengan Kebijakan Rahasia Pasien & Consent Klinik Medis": { id: "Saya menyatakan bahwa semua rincian riwayat medis di atas diisi secara jujur. Saya setuju data saya dilindungi aman sesuai dengan Kebijakan Rahasia Pasien & Consent Klinik Medis", en: "I declare that all medical history details above are filled truthfully. I agree that my data is securely protected under the Patient Confidentiality & Medical Clinic Consent Policy", ar: "أقر بأن جميع تفاصيل التاريخ الطبي أعلاه صحيحة. وأوافق على حماية بياناتي بأمان بموجب سياسة سرية المريض وموافقة العيادة الطبية", zh: "我郑重声明以上填写的健康数据均真实完整。我同意根据《患者隐私与保密及临床医学知情同意政策》保障我的数据安全", ja: "上記に入力したメディカルヒストリーはすべて真実であることを宣言します。患者守秘義務およびクリニック同意ポリシーに則り、個人データが安全に保護されることに同意します" },
  "Lanjut ke Metode Pembayaran": { id: "Lanjut ke Metode Pembayaran", en: "Proceed to Payment Methods", ar: "المتابعة إلى طرق الدفع", zh: "继续选择预约定金支付方式", ja: "決済方法の選択に進む" },
  "Simulasi Pembayaran Booking Fee": { id: "Simulasi Pembayaran Booking Fee", en: "Simulated Booking Fee Payment", ar: "محاكاة دفع رسوم الحجز", zh: "预订定金在线结算模拟", ja: "予約料のお支払いシミュレーション" },
  "Pembayaran booking fee mengunci slot antrean dan menghindari no-show yang merugikan slot pasien lain.": { id: "Pembayaran booking fee mengunci slot antrean dan menghindari no-show yang merugikan slot pasien lain.", en: "Booking fee payment locks your priority queue slot and avoids no-show disruption to other waiting patients.", ar: "سداد رسوم الحجز يضمن مكانك في قائمة الانتظار السريع ويمنع الغياب غير المبرر الذي يضر بالآخرين.", zh: "支付预订定金将为您专属锁定此预约时间，避免临时未到导致其他急需治疗的患者无法挂号预约。", ja: "予約料のお支払いを完了することで、診察枠が正式に確保され、他の患者様のご迷惑となる無断キャンセル（No-Show）を防止します。" },
  "Pilih Metode Pembayaran Berizin:": { id: "Pilih Metode Pembayaran Berizin:", en: "Choose Approved Payment Method:", ar: "اختر طريقة الدفع المعتمدة:", zh: "选择经合规授权的支付网关:", ja: "認可された決済方法を選択してください：" },
  "Ringkasan Medis Kunjungan:": { id: "Ringkasan Medis Kunjungan:", en: "Appointment Medical Summary:", ar: "ملخص الموعد الطبي:", zh: "本次预约就诊信息摘要：", ja: "ご受診情報の概要：" },
  "Layanan Medis:": { id: "Layanan Medis:", en: "Medical Service:", ar: "الخدمة الطبية:", zh: "诊疗护理项目:", ja: "施術メニュー:" },
  "Dokter/Spesialis:": { id: "Dokter/Spesialis:", en: "Doctor/Specialist:", ar: "الطبيب/الأخصائي:", zh: "主治医师/治疗师:", ja: "担当医・施術者:" },
  "Cabang & Waktu:": { id: "Cabang & Waktu:", en: "Branch & Time Slot:", ar: "الفرع والوقت:", zh: "就诊门店与时段:", ja: "分院および日時:" },
  "Harga Treatment:": { id: "Harga Treatment:", en: "Treatment Fee:", ar: "رسوم العلاج:", zh: "治疗标准费用:", ja: "通常料金:" },
  "Booking Fee Terkunci:": { id: "Booking Fee Terkunci:", en: "Locked Booking Fee:", ar: "رسوم الحجز المؤمنة:", zh: "已缴定金抵扣额:", ja: "確保用予約料:" },
  "PROSES AMANKAN JADWAL": { id: "PROSES AMANKAN JADWAL", en: "SECURE MY APPOINTMENT NOW", ar: "تأمين الموعد الطبي الآن", zh: "立即提交并锁死日程", ja: "予約を確定する" },
  "Dengan menekan tombol diatas, Anda memicu simulasi auto-approve payment pada dashboard CRM dan mendaftarkan jadwal ke database Aurora.": { id: "Dengan menekan tombol diatas, Anda memicu simulasi auto-approve payment pada dashboard CRM dan mendaftarkan jadwal ke database Aurora.", en: "By clicking the button above, you trigger an auto-approved payment simulation on our CRM dashboard and register your appointment into the Aurora database.", ar: "بالنقر على الزر أعلاه، فإنك تقوم بتشغيل محاكاة الدفع المعتمدة تلقائيًا على لوحة التحكم وتسجيل موعدك في قاعدة البيانات.", zh: "点击上方按钮后，系统将模拟生成一笔CRM支付结算并自动核销过账，同时将您的就诊日程正式录入系统数据库。", ja: "上のボタンをクリックすると、CRMダッシュボード上での自動決済がシミュレートされ、Auroraのデータベースに受診スケジュールが正式に登録されます。" },
  "Appointment Berhasil Dijadwalkan!": { id: "Appointment Berhasil Dijadwalkan!", en: "Appointment Successfully Scheduled!", ar: "تم جدولة الموعد بنجاح!", zh: "就诊预约日程已成功锁定！", ja: "受診予約が正常に完了しました！" },
  "Sistem medis Clinic Digital Pro berhasil mendaftarkan Anda ke antrean prioritas outlet": { id: "Sistem medis Clinic Digital Pro berhasil mendaftarkan Anda ke antrean prioritas outlet", en: "Our medical clinic system has successfully registered you into the priority queue of branch", ar: "لقد نجح نظام العiادة الطبية لدينا في تسجيلك في قائمة الانتظار السريعة لفرع", zh: "数字诊所管理系统已成功将您编入分部绿色优先接待队列：", ja: "クリニックシステムが受診枠の優先案内キューに登録しました：" },
  "Status Kunjungan:": { id: "Status Kunjungan:", en: "Visit Status:", ar: "حالة الزيارة:", zh: "预约日程状态:", ja: "受診状況:" },
  "Lunas": { id: "Lunas", en: "Paid", ar: "مدفوع", zh: "已付清/抵扣", ja: "決済完了" },
  "Pasien:": { id: "Pasien:", en: "Patient Name:", ar: "اسم المريض:", zh: "患者姓名:", ja: "患者様:" },
  "Dokter/Terapis:": { id: "Dokter/Terapis:", en: "Doctor / Therapist:", ar: "الطبيب / المعالج:", zh: "主诊医师/理疗师:", ja: "担当医師・施術者:" },
  "Waktu kedatangan:": { id: "Waktu kedatangan:", en: "Arrival Time:", ar: "وقت الوصول المتوقع:", zh: "到达时间:", ja: "ご来院予定時刻:" },
  "Total booking fee sebesar": { id: "Total booking fee sebesar", en: "Total booking fee of", ar: "إجمالي رسوم الحجز بقيمة", zh: "定金总计", ja: "予約料として" },
  "telah disimulasikan lunas via": { id: "telah disimulasikan lunas via", en: "has been simulated as PAID via", ar: "تمت محاكاتها كمدفوعة عبر", zh: "已成功通过系统仿真支付完成", ja: "は、次の決済方法によりお支払い済みとして処理されました：" },
  "Simulasi WhatsApp Auto-Reminder template:": { id: "Simulasi WhatsApp Auto-Reminder template:", en: "WhatsApp Auto-Reminder Simulated Template:", ar: "نموذج تذكير تلقائي عبر الواتساب:", zh: "微信/WhatsApp全自动通知触发表单仿真展示:", ja: "WhatsApp自動送信通知テンプレート（シミュレーション）：" },
  "Halo": { id: "Halo", en: "Hello", ar: "مرحبًا", zh: "您好", ja: "こんにちは" },
  "booking Anda di Aurora MedBeauty Clinic sudah dikonfirmasi.": { id: "booking Anda di Aurora MedBeauty Clinic sudah dikonfirmasi.", en: "your booking at Aurora MedBeauty Clinic has been confirmed.", ar: "تمت تأكيد عملية حجزك في عيادة أورورا تجميل الطبية.", zh: "您在 Aurora 医美中心预约的诊疗日程已成功核销确立。", ja: "様。Auroraメディカルビューティークリニックでのご予約が確定いたしました。" },
  "Layanan:": { id: "Layanan:", en: "Service:", ar: "الخدمة:", zh: "预约项目:", ja: "メニュー:" },
  "Jam:": { id: "Jam:", en: "Time:", ar: "الوقت:", zh: "预约时间:", ja: "時間:" },
  "Mohon hadir 10 menit lebih awal untuk registrasi ulang. Terima kasih.": { id: "Mohon hadir 10 menit lebih awal untuk registrasi ulang. Terima kasih.", en: "Please arrive 10 minutes prior for quick check-in. Thank you.", ar: "يرجى الحضور قبل الموعد بـ ١٠ دقائق لتسجيل سريع. شكرًا لك.", zh: "为保障您的就诊体验，请提前10分钟到店办理快速登记手续。期待您的光临！", ja: "再登録手続きのため、ご予約時間の10分前にお越しいただきますようお願いいたします。ご来院をお待ちしております。" },
  "Pemicu: WhatsApp Business API Sandbox Simulator": { id: "Pemicu: WhatsApp Business API Sandbox Simulator", en: "Trigger: WhatsApp Business API Sandbox Simulator", ar: "المشغل: محاكي واجهة برمجة تطبيقات واتساب للأعمال", zh: "触发表: 官方授权 WhatsApp Business API 沙盒仿真模拟器", ja: "送信元: WhatsApp Business API Sandbox Simulator" },
  "Salin Teks": { id: "Salin Teks", en: "Copy Text", ar: "نسخ النص", zh: "复制文本", ja: "テキストをコピー" },
  "Buat Booking Baru Pelanggan Lain": { id: "Buat Booking Baru Pelanggan Lain", en: "Create Booking for Another Customer", ar: "إنشاء حجز لعميل آخر", zh: "为其他顾客/亲属新建预约", ja: "他のお客様の新しい予約を作成" },

  // Interactive Quiz
  "Asisten cerdas pencocok klinis otomatis untuk mendeteksi kebutuhan perawatan terbaik sesuai dengan skin concern Anda.": { id: "Asisten cerdas pencocok klinis otomatis untuk mendeteksi kebutuhan perawatan terbaik sesuai dengan skin concern Anda.", en: "An intelligent clinical auto-matching assistant designed to detect the ideal treatment plan matching your unique skin concerns.", ar: "مساعد مطابقة سريري ذكي مصمم لتحديد خطة العلاج المثالية التي تتوافق مع مشاكل بشرتك الفريدة.", zh: "智能临床自动匹配助手，旨在为您量身检测和推荐最契合的皮肤改善与治疗方案。", ja: "お客様特有 of 肌悩みに合わせて最適な治療プランを導き出す、高精度AI肌診断アシスタント。" },
  "Skin & Wellness Assessor": { id: "Skin & Wellness Assessor", en: "Skin & Wellness Assessor", ar: "مقيّم الجلد والعافية", zh: "皮肤与健康智能评估系统", ja: "スキン＆ウェルネス・アセッサー" },
  "Dapatkan asisten rekomendasi treatment yang dipersonalisasi secara klinis.": { id: "Dapatkan asisten rekomendasi treatment yang dipersonalisasi secara klinis.", en: "Get clinically personalized treatment recommendations from our AI assistant.", ar: "احصل على توصيات علاجية مخصصة سريريًا من مساعدنا الذكي.", zh: "一键获取由临床专业医生与AI算法为您高度定制的专属治疗建议。", ja: "AIアシスタントが、医学的知見に基づきパーソナライズされた治療プランを提案します。" },
  "Step 1: Apa concern utama kulit atau tubuh Anda?": { id: "Step 1: Apa concern utama kulit atau tubuh Anda?", en: "Step 1: What is your main skin or body concern?", ar: "الخطوة ١: ما هي المشكلة الرئيسية لبشرتك أو جسمك؟", zh: "步骤 1: 什么是您目前最核心的皮肤或身体困扰？", ja: "ステップ 1: お肌や身体の最も気になるお悩みは何ですか？" },
  "Pilih sebanyak yang sesuai. Kami akan mengukur prioritas treatment terbaik.": { id: "Pilih sebanyak yang sesuai. Kami akan mengukur prioritas treatment terbaik.", en: "Select all that apply. We will calculate the optimal treatment priorities for you.", ar: "اختر كل ما ينطبق. سنقوم بحساب أولويات العلاج الأمثل لك.", zh: "请选择所有符合您当前情况的选项。我们将多维评估最适合您的黄金治疗优先级。", ja: "該当するものをすべて選択してください。お客様に最も必要な治療の優先度を算出します。" },
  "Harap lengkapi semua isian kontak utama Anda.": { id: "Harap lengkapi semua isian kontak utama Anda.", en: "Please complete all your main contact details.", ar: "يرجى إكمال جميع بيانات الاتصال الرئيسية الخاصة بك.", zh: "请务必填写完您的核心联系方式以保障报告送达。", ja: "すべての必須連絡先項目に入力してください。" },
  "Melanjutkan": { id: "Melanjutkan", en: "Continue", ar: "متابعة", zh: "继续下一步", ja: "次に進む" },
  "Step 2: Bagaimana tipe kulit Anda saat ini?": { id: "Step 2: Bagaimana tipe kulit Anda saat ini?", en: "Step 2: What is your current skin type?", ar: "الخطوة ٢: ما هو نوع بشرتك الحالي؟", zh: "步骤 2: 您目前的皮肤属于哪种基本类型？", ja: "ステップ 2: 現在の肌タイプはどれにあてはまりますか？" },
  "Membantu kami merekomendasikan formula aftercare yang aman bagi kulit wajah.": { id: "Membantu kami merekomendasikan formula aftercare yang aman bagi kulit wajah.", en: "Helps us recommend medical aftercare formulas safe for your skin barrier.", ar: "يساعدنا في التوصية بتركيبات العناية اللاحقة الآمنة لحاجز بشرتك.", zh: "有助于我们为您推荐100%温和、不会对您的皮肤屏障造成刺激的医学术后修护方案。", ja: "お肌に負担の少ない、安全なメディカルアフターケアをお勧めするために役立ちます。" },
  "Step 3: Apa tujuah / target utama hasil yang Anda idamkan?": { id: "Step 3: Apa tujuah / target utama hasil yang Anda idamkan?", en: "Step 3: What is your main aesthetic target or goal?", ar: "الخطوة ٣: ما هو هدفك الجمالي المنشود؟", zh: "步骤 3: 您期望通过本轮治疗达到的最核心美丽目标是什么？", ja: "ステップ 3: ご希望されるお肌の改善・美容ゴールは何ですか？" },
  "Kami mengarahkan program medis kosmetik agar hasil maksimal didapatkan pasien.": { id: "Kami mengarahkan program medis kosmetik agar hasil maksimal didapatkan pasien.", en: "We tailor cosmetic clinical programs to ensure patients obtain optimal results.", ar: "نوجه البرامج التجميلية السريرية لضمان حصول المرضى على نتائج مثالية.", zh: "我们将据此定制专项的医学抗衰方案，以确保疗效显著和患者满意度最大化。", ja: "お客様に最適な治療結果をご実感いただけるよう、メディカルエステプログラムを設計します。" },
  "Data Anda aman bersama kami. Kami akan mengalkulasikan skin concern score Anda dan mengirim e-rekomendasi dokter langsung ke nomor WhatsApp Anda.": { id: "Data Anda aman bersama kami. Kami akan mengalkulasikan skin concern score Anda dan mengirim e-rekomendasi dokter langsung ke nomor WhatsApp Anda.", en: "Your privacy is secured. We will calculate your skin concern score and deliver doctor e-recommendations directly to your WhatsApp.", ar: "خصوصيتك آمنة ومحمية لدينا. سنقوم باحتساب درجة قلق بشرتك وإرسال توصيات الأطباء مباشرة إلى الواتساب الخاص بك.", zh: "我们承诺100%保障您的隐私安全。系统将计算您的皮肤评估得分，并由执业医生出具电子化建议，直接投递到您的手机微信/WhatsApp上。", ja: "個人情報は安全に保護されます。お肌のトラブルスコアを算出し、医師によるアドバイスをWhatsApp宛てに直接お送りします。" },
  "Nama Lengkap Pasien *": { id: "Nama Lengkap Pasien *", en: "Patient Full Name *", ar: "اسم المريض الكامل *", zh: "患者真实姓名 *", ja: "患者様お名前 *" },
  "Contoh: Salsa Amira": { id: "Contoh: Salsa Amira", en: "e.g., Salsa Amira", ar: "مثال: سالسا أميرة", zh: "例如：林佳欣", ja: "例：佐藤 恵美" },
  "No. WhatsApp Aktif (Untuk Kirim Hasil) *": { id: "No. WhatsApp Aktif (Untuk Kirim Hasil) *", en: "Active WhatsApp Number (For Delivery) *", ar: "رقم الواتساب النشط (لتسليم التوصيات) *", zh: "常用微信/WhatsApp联系号码 (用于接收分析结果) *", ja: "有効なWhatsApp番号（結果送信先） *" },
  "Contoh: 081211112222": { id: "Contoh: 081211112222", en: "e.g., 081211112222", ar: "مثال: ٠٨١٢١١١١٢٢٢٢", zh: "例如：081211112222", ja: "例：081211112222" },
  "Alamat Email *": { id: "Alamat Email *", en: "Email Address *", ar: "البريد الإلكتروني *", zh: "电子邮箱地址 *", ja: "メールアドレス *" },
  "Contoh: salsa@email.com": { id: "Contoh: salsa@email.com", en: "e.g., salsa@email.com", ar: "مثال: salsa@email.com", zh: "例如：salsa@email.com", ja: "例：salsa@email.com" },
  "Umur Pasien (Tahun)": { id: "Umur Pasien (Tahun)", en: "Patient Age (Years)", ar: "عمر المريض (بالسنوات)", zh: "患者年龄 (岁)", ja: "ご年齢（歳）" },
  "Cabang Utama Terdekat": { id: "Cabang Utama Terdekat", en: "Nearest Preferred Branch", ar: "الفرع المفضل الأقرب إليك", zh: "距离您最近的意向分部", ja: "最寄りのクリニック分院" },
  "Estimasi Budget Sekali Kunjungan *": { id: "Estimasi Budget Sekali Kunjungan *", en: "Estimated Budget per Visit *", ar: "الميزانية التقريبية لكل زيارة *", zh: "单次就诊的预期预算范围 *", ja: "1回のご予算の目安 *" },
  "Saya menyetujui pengisian data konsultasi dan consent keamanan data sesuai dengan Privacy Policy Aurora MedBeauty.": { id: "Saya menyetujui pengisian data konsultasi dan consent keamanan data sesuai dengan Privacy Policy Aurora MedBeauty.", en: "I agree to submit this consultation data and consent to secure data handling as governed by the Aurora MedBeauty Privacy Policy.", ar: "أوافق على تقديم بيانات الاستشارة هذه والموافقة على التعامل الآمن مع البيانات بموجب سياسة خصوصية أورورا.", zh: "我已阅读并同意提交此份病历面诊自测表，并授权根据《Aurora 隐私政策》安全合规地存储我的信息。", ja: "カウンセリング用データの送信、およびAuroraメディカルのプライバシーポリシーに準拠した個人情報の安全な取り扱いに同意します。" },
  "PROSES REKOMENDASI AI": { id: "PROSES REKOMENDASI AI", en: "GENERATE AI MEDICAL RECOMMENDATION", ar: "إنشاء توصيات الذكاء الاصطناعي الطبية", zh: "启动AI多维算法生成专属皮肤报告", ja: "AI診断レポートを生成する" },
  "Skin Assessor Match Terkalkulasi!": { id: "Skin Assessor Match Terkalkulasi!", en: "Skin Assessor Match Calculated!", ar: "تم حساب مطابقة مقيم الجلد بنجاح!", zh: "智能皮肤健康评估报告已生成！", ja: "肌診断シミュレーションが完了しました！" },
  "Sistem matcher kognitif kami telah mencocokkan keluhan medis Anda dengan program premium terbaik di": { id: "Sistem matcher kognitif kami telah mencocokkan keluhan medis Anda dengan program premium terbaik di", en: "Our cognitive matcher system has successfully paired your medical skin concerns with the best premium programs at", ar: "لقد قام نظام المطابقة المعرفي لدينا بربط مخاوفك الطبية بنجاح مع أفضل البرامج المتميزة في", zh: "智能分析匹配系统已根据您的多维皮肤表现，为您个性化推荐了以下最契合的黄金治疗方案：", ja: "AI肌診断システムが、お悩みにマッチする最適なプレミアム治療プログラムを算出しました：" },
  "Rekomendasi Utama AI": { id: "Rekomendasi Utama AI", en: "Primary AI Recommendation", ar: "توصية الذكاء الاصطناعي الرئيسية", zh: "AI 主推黄金治疗方案", ja: "AI推奨のメインプログラム" },
  "Program klinis terstruktur yang disesuaikan khusus untuk merawat kondisi": { id: "Program klinis terstruktur yang disesuaikan khusus untuk merawat kondisi", en: "A structured, specialized clinical program designed specifically to treat the condition of", ar: "برنامج سريري منظم ومتخصص مصمم خصيصًا لعلاج حالة", zh: "本方案专为改善和针对您的以下皮肤困扰而设计：", ja: "本プランは、お客様の以下のお悩みを改善するために特別に設計されたものです：" },
  "demi mendapatkan hasil terbaik secara berkala dalam": { id: "demi mendapatkan hasil terbaik secara berkala dalam", en: "to obtain optimal results progressively within", ar: "للحصول على نتائج مثالية تدريجيًا في غضون", zh: "，通常在连续接受调理后，可在以下周期内达到极佳状态：", ja: "。持続的で最適な効果を得るために推奨される治療期間：" },
  "12 minggu": { id: "12 minggu", en: "12 weeks", ar: "١٢ أسبوعًا", zh: "12 周", ja: "12週間" },
  "4-8 minggu": { id: "4-8 minggu", en: "4-8 weeks", ar: "٤-٨ أسابيع", zh: "4-8 周", ja: "4〜8週間" },
  "Tipe Kulit": { id: "Tipe Kulit", en: "Skin Type", ar: "نوع البشرة", zh: "基本肤型", ja: "肌タイプ" },
  "Target Utama": { id: "Target Utama", en: "Aesthetic Goal", ar: "الهدف التجميلي", zh: "期望目标", ja: "ご希望ゴール" },
  "Skor Kebutuhan Medis": { id: "Skor Kebutuhan Medis", en: "Medical Priority Score", ar: "درجة الأولوية الطبية", zh: "医学治疗紧迫度", ja: "医療必要度スコア" },
  "94% Urgent Priority": { id: "94% Urgent Priority", en: "94% Urgent Priority", ar: "٩٤٪ أولوية عاجلة", zh: "94% 紧急治疗/高优先度", ja: "94% 優先対応対象" },
  "Booking Treatment Ini Sekarang": { id: "Booking Treatment Ini Sekarang", en: "Book This Recommended Treatment", ar: "احجز هذا العلاج الموصى به الآن", zh: "立即一键预约此黄金方案", ja: "このメニューで今すぐ予約する" },
  "Ulangi Tes Quiz": { id: "Ulangi Tes Quiz", en: "Retake Skin Quiz", ar: "إعادة إجراء الاختبار", zh: "重新评测一次", ja: "クイズを最初からやり直す" },
  "Medical Disclaimer": { id: "Medical Disclaimer", en: "Medical Disclaimer", ar: "إخلاء المسؤولية الطبية", zh: "医学免责声明", ja: "免責事項" },
  "Rekomendasi skin quiz asisten AI ini bukan merupakan diagnosis medis formal. Tindakan dan perawatan klinis ideal harus didasarkan pada examination, anjuran medis, dan konsultasi interaktif langsung bersama dokter atau pakar kulit profesional di cabang klinik kami.": { id: "Rekomendasi skin quiz asisten AI ini bukan merupakan diagnosis medis formal. Tindakan dan perawatan klinis ideal harus didasarkan pada examination, anjuran medis, dan konsultasi interaktif langsung bersama dokter atau pakar kulit profesional di cabang klinik kami.", en: "This AI assistant skin quiz recommendation does not constitute formal medical diagnosis. Ideal clinical treatments must be based on physical examination, professional prescription, and direct consultation with licensed medical doctors at our branches.", ar: "توصية اختبار البشرة بالذكاء الاصطناعي هذه لا تشكل تشخيصًا طبيًا رسميًا. يجب أن تعتمد العلاجات السريرية المثالية على الفحص السريري والاستشارة المباشرة مع الأطباء.", zh: "此 AI 皮肤诊断和推荐结果仅供辅助参考，不构成正式的临床诊断结论。最理想且符合医疗规范的安全疗程，应建立在到院后由专业执业医师进行物理面诊、病理性检查以及沟通建议的基础之上。", ja: "AIアシスタントによる肌診断結果は、正式な医師の医学的診断に代わるものではありません。最適な治療や薬の選定は、当院の分院にて医師による直接の診察、診断、対面カウンセリングに基づき行われます。" },

  "Senin s/d Sabtu": { id: "Senin s/d Sabtu", en: "Monday to Saturday", ar: "الإثنين إلى السبت", zh: "周一至周六", ja: "月曜日〜土曜日" },
  "Sistem akan memvalidasi slot konfirmasi langsung dengan asisten perawat pasca booking.": { id: "Sistem akan memvalidasi slot konfirmasi langsung dengan asisten perawat pasca booking.", en: "The system will validate the confirmed slot directly with our clinical nurses post-booking.", ar: "سيقوم النظام بالتحقق من صحة الموعد مباشرة مع ممرضينا بعد الحجز.", zh: "系统将在预约提交后，立即对接出诊护士安排您的挂号名额。", ja: "ご予約完了後、システムが看護師と連携して受診枠を正式に確定・調整します。" },

  // Clinical Problems & Solutions Section
  "Analisis Klinis & Terapi Terarah": {
    id: "Analisis Klinis & Terapi Terarah",
    en: "Clinical Analysis & Targeted Therapy",
    ar: "التحليل السريري والعلاج الموجه",
    zh: "临床分析与靶向治疗",
    ja: "臨床分析＆ターゲット療法"
  },
  "Identifikasi Masalah & Solusi Medis Kami": {
    id: "Identifikasi Masalah & Solusi Medis Kami",
    en: "Problem Identification & Our Medical Solutions",
    ar: "تحديد المشاكل وحلولنا الطبية",
    zh: "问题识别与我们的医疗解决方案",
    ja: "肌悩み特定＆当院 of 治療ソリューション"
  },
  "Setiap keluhan kulit membutuhkan penanganan yang tepat dan berbasis bukti medis. Temukan bagaimana tim spesialis kami memberikan solusi terbaik untuk Anda.": {
    id: "Setiap keluhan kulit membutuhkan penanganan yang tepat dan berbasis bukti medis. Temukan bagaimana tim spesialis kami memberikan solusi terbaik untuk Anda.",
    en: "Every skin concern requires precise and evidence-based medical handling. Discover how our specialist team provides the best solutions for you.",
    ar: "كل شكوى جلدية تتطلب تعاملاً دقيقًا وقائمًا على الأدلة الطبية. اكتشف كيف يقدم فريقنا المتخصص أفضل الحلول لك.",
    zh: "每一项皮肤诉求都需要精确且基于医学证据的处理。了解我们的专家团队如何为您提供最佳解决方案。",
    ja: "あらゆる肌の悩みには、エビデンス（医学的根拠）に基づいた正確なアプローチが必要です。当院の専門医チームが最適な解決策をご提案します。"
  },
  "Keluhan Umum": {
    id: "Keluhan Umum",
    en: "Common Concerns",
    ar: "الشكاوى الشائعة",
    zh: "常见诉求",
    ja: "よくあるお悩み"
  },
  "Masalah Kulit & Estetika": {
    id: "Masalah Kulit & Estetika",
    en: "Skin & Aesthetic Concerns",
    ar: "مشاكل البشرة والتجميل",
    zh: "皮肤与美容问题",
    ja: "肌と美容のトラブル"
  },
  "Kondisi kulit tidak sehat yang kerap menurunkan rasa percaya diri, merusak skin barrier, dan membutuhkan perhatian medis profesional:": {
    id: "Kondisi kulit tidak sehat yang kerap menurunkan rasa percaya diri, merusak skin barrier, dan membutuhkan perhatian medis profesional:",
    en: "Unhealthy skin conditions that often lower self-confidence, damage the skin barrier, and require professional medical attention:",
    ar: "حالات الجلد غير الصحية التي غالبًا ما تقلل من الثقة بالنفس، وتضر بحاجز البشرة، وتتطلب عناية طبية احترافية:",
    zh: "不健康的皮肤状况往往会降低自信心、损伤皮肤屏障，并需要专业的医疗护理：",
    ja: "自信の低下やバリア機能の低下を招き、専門的な医療ケアを必要とする健康でない肌状態："
  },
  "Penuaan Dini & Kerutan": {
    id: "Penuaan Dini & Kerutan",
    en: "Premature Aging & Wrinkles",
    ar: "الشيخوخة المبكرة والتجاعيد",
    zh: "过早老化与皱纹",
    ja: "早期老化＆シワ"
  },
  "Munculnya garis halus di sekitar mata/dahi, kerutan dalam, kulit mengendur, dan hilangnya elastisitas alami akibat penurunan produksi kolagen seiring usia.": {
    id: "Munculnya garis halus di sekitar mata/dahi, kerutan dalam, kulit mengendur, dan hilangnya elastisitas alami akibat penurunan produksi kolagen seiring usia.",
    en: "Appearance of fine lines around eyes/forehead, deep wrinkles, sagging skin, and loss of natural elasticity due to decreased collagen production over time.",
    ar: "ظهور الخطوط الدقيقة حول العينين/الجبهة، والتجاعيد العميقة، وترهل الجلد، وفقدان المرونة الطبيعية نتيجة لانخفاض إنتاج الكولاجين مع تقدم العمر.",
    zh: "由于胶原蛋白生成随年龄增长而减少，导致眼部/额头出现细纹、深层皱纹、皮肤松弛以及失去自然弹性。",
    ja: "年齢とともにコラーゲン生成が減少することによる、目元・おでこの小ジワ、深いシワ、たるみ、自然なハリの喪失。"
  },
  "Flek Hitam & Hiperpigmentasi": {
    id: "Flek Hitam & Hiperpigmentasi",
    en: "Dark Spots & Hyperpigmentation",
    ar: "البقع الداكنة وفرط التصبغ",
    zh: "黑斑与色素沉着",
    ja: "シミ＆色素沈着"
  },
  "Melasma membandel, bintik matahari (sunspots), serta bekas jerawat kemerahan (PIE) atau kehitaman (PIH) yang merusak kerataan warna kulit wajah.": {
    id: "Melasma membandel, bintik matahari (sunspots), serta bekas jerawat kemerahan (PIE) atau kehitaman (PIH) yang merusak kerataan warna kulit wajah.",
    en: "Stubborn melasma, sunspots, as well as red (PIE) or dark (PIH) acne marks that disrupt the evenness of facial skin tone.",
    ar: "الكلف العنيد، وبقع الشمس، بالإضافة إلى آثار حب الشباب الحمراء (PIE) أو الداكنة (PIH) التي تعيق تجانس لون بشرة الوجه.",
    zh: "顽固性黄褐斑、日晒斑，以及破坏面部肤色均匀度的红色痘印（PIE）或黑色素沉着（PIH）。",
    ja: "頑固な肝斑、日光黒子（シミ）、および肌の均一なトーンを損なうニキビ跡の赤み（PIE）や色素沈着（PIH）。"
  },
  "Jerawat Aktif & Bopeng (Scar)": {
    id: "Jerawat Aktif & Bopeng (Scar)",
    en: "Active Acne & Acne Scars (Atrophic)",
    ar: "حب الشباب النشط وندبات حب الشباب",
    zh: "活性痤疮与痘坑凹陷",
    ja: "活動性ニキビ＆クレーター（ニキビ跡）"
  },
  "Peradangan jerawat akibat sumbatan sebum dan bakteri, serta kerusakan struktur kulit mendalam yang meninggalkan jaringan parut bopeng yang kasar.": {
    id: "Peradangan jerawat akibat sumbatan sebum dan bakteri, serta kerusakan struktur kulit mendalam yang meninggalkan jaringan parut bopeng yang kasar.",
    en: "Acne inflammation caused by sebum blockage and bacteria, and deep skin structure damage that leaves behind rough atrophic scars.",
    ar: "التهاب حب الشباب الناتج عن انسداد الدهون والبكتيريا، وتلف بنية الجلد العميقة التي تترك ندبات وعرة خشنة.",
    zh: "因皮脂堵塞和细菌引起的痤疮发炎，以及在皮肤深层结构留下粗糙凹坑和疤痕的损伤。",
    ja: "皮脂の詰まりや細菌によるニキビの炎症、および粗い凹凸のある瘢痕組織（クレーター）を残す深部の皮膚組織損傷。"
  },
  "Kulit Kusam, Kering, & Dehidrasi": {
    id: "Kulit Kusam, Kering, & Dehidrasi",
    en: "Dull, Dry, & Dehydrated Skin",
    ar: "البشرة الباهتة والجافة والجافة للغاية",
    zh: "暗沉、干燥与缺水肌",
    ja: "くすみ・乾燥・インナードライ肌"
  },
  "Kerusakan lapisan pelindung kulit (skin barrier) yang menyebabkan kelembapan menguap, kulit bersisik kasar, sensitif, dan kehilangan kilau sehatnya.": {
    id: "Kerusakan lapisan pelindung kulit (skin barrier) yang menyebabkan kelembapan menguap, kulit bersisik kasar, sensitif, dan kehilangan kilau sehatnya.",
    en: "Damage to the skin barrier that causes moisture to evaporate, leading to rough scaly skin, sensitivity, and loss of healthy glow.",
    ar: "تلف حاجز البشرة الذي يؤدي إلى تبخر الرطوبة، مما يسبب جفاف وتقشر البشرة وحساسيتها وفقدان بريقها الصحي.",
    zh: "皮肤屏障（skin barrier）受损导致水分蒸发，使皮肤粗糙脱屑、敏感并失去健康光泽。",
    ja: "バリア機能（skin barrier）の損傷により水分が蒸発し、カサつき、敏感になり、健康的な輝きを失った状態。"
  },
  "Sains & Medis": {
    id: "Sains & Medis",
    en: "Science & Medical",
    ar: "العلوم والطب",
    zh: "前沿医学与科学",
    ja: "科学＆医療"
  },
  "Solusi Klinis & Terapi Spesialis": {
    id: "Solusi Klinis & Terapi Spesialis",
    en: "Clinical Solutions & Specialist Therapies",
    ar: "الحلول السريرية والعلاجات المتخصصة",
    zh: "临床解决方案与专家疗法",
    ja: "臨床ソリューション＆専門医セラピー"
  },
  "Tindakan medis presisi menggunakan kombinasi alat berstandar internasional (FDA Approved) dan racikan resep klinis oleh dokter ahli:": {
    id: "Tindakan medis presisi menggunakan kombinasi alat berstandar internasional (FDA Approved) dan racikan resep klinis oleh dokter ahli:",
    en: "Precision medical procedures using a combination of international standard equipment (FDA Approved) and clinical prescriptions by expert doctors:",
    ar: "إجراءات طبية دقيقة باستخدام مزيج من الأجهزة ذات المعايير الدولية (المعتمدة من إدارة الغذاء والدواء) والوصفات الطبية السريرية من قبل أطباء خبراء:",
    zh: "使用国际标准设备（FDA认证）与专家医生配方药相结合的精准医疗手段：",
    ja: "国際基準の医療機器（FDA承認）と、専門医による臨床処方药を組み合わせた精密な医療アプローチ："
  },
  "Rejuvenasi Medis & Facelift Non-Bedah": {
    id: "Rejuvenasi Medis & Facelift Non-Bedah",
    en: "Medical Rejuvenation & Non-Surgical Facelift",
    ar: "تجديد البشرة الطبي وشد الوجه غير الجراحي",
    zh: "医学抗衰年轻化与非手术拉皮",
    ja: "メディカル若返り＆非手術フェイスリフト"
  },
  "Teknologi pengencangan kulit HIFU (High-Intensity Focused Ultrasound), Radio Frequency (RF), serta micro-injection skin booster untuk merangsang kolagen baru.": {
    id: "Teknologi pengencangan kulit HIFU (High-Intensity Focused Ultrasound), Radio Frequency (RF), serta micro-injection skin booster untuk merangsang kolagen baru.",
    en: "Skin tightening technologies like HIFU (High-Intensity Focused Ultrasound), Radio Frequency (RF), and micro-injection skin boosters to stimulate new collagen.",
    ar: "تقنيات شد الجلد مثل الهايفو (HIFU)، والترددات اللاسلكية (RF)، وحقن معزز البشرة الدقيق لتحفيز الكولاجين الجديد.",
    zh: "利用超声刀（HIFU）、热玛吉（RF）等紧致提升技术以及微针/水光针（skin booster）注射来刺激胶原蛋白新生。",
    ja: "新しいコラーゲンを刺激するための、HIFU（高密度焦点式超音波）、ラジオ波（RF）、および極細インジェクションによるスキンブースター技術。"
  },
  "Laser Picosecond & Advanced Peeling": {
    id: "Laser Picosecond & Advanced Peeling",
    en: "Picosecond Laser & Advanced Peeling",
    ar: "ليزر البيكوسيكند والتقشير المتقدم",
    zh: "皮秒激光与高阶医学焕肤",
    ja: "ピコ秒レーザー＆アドバンスドピーリング"
  },
  "Penembakan pigmen gelap secara selektif dengan laser generasi terbaru dan peeling eksfoliasi medis terarah guna mengembalikan kecerahan alami.": {
    id: "Penembakan pigmen gelap secara selektif dengan laser generasi terbaru dan peeling eksfoliasi medis terarah guna mengembalikan kecerahan alami.",
    en: "Selective targeting of dark pigments with state-of-the-art lasers and targeted medical exfoliation peeling to restore natural radiance.",
    ar: "استهداف انتقائي للصبغات الداكنة بأحدث أجهزة الليزر وتقشير طبي موجه لاستعادة النضارة الطبيعية.",
    zh: "采用最新一代激光选择性击碎黑色素，并配合定向医学剥脱焕肤，以恢复肌肤天然亮泽。",
    ja: "最新世代レーザーによるメラニン色素への選択的照射と、肌本来の透明感を取り戻すためのターゲット角質ケア。"
  },
  "Acne Clear & Scar Revision": {
    id: "Acne Clear & Scar Revision",
    en: "Acne Clear & Scar Revision",
    ar: "علاج حب الشباب ومراجعة الندبات",
    zh: "控痘祛暗与瘢痕修复（凹陷修复）",
    ja: "アクネクリア＆ニキビ跡（瘢痕）修正"
  },
  "Pemberian obat topikal terarah, terapi IPL (Intense Pulsed Light) jerawat, subsisi bopeng, serta laser CO2 fraksional untuk meratakan kembali tekstur kulit.": {
    id: "Pemberian obat topikal terarah, terapi IPL (Intense Pulsed Light) jerawat, subsisi bopeng, serta laser CO2 fraksional untuk meratakan kembali tekstur kulit.",
    en: "Targeted topical medications, acne IPL (Intense Pulsed Light) therapy, scar subcision, and fractional CO2 laser to re-smooth skin texture.",
    ar: "الأدوية الموضعية الموجهة، وعلاج حب الشباب بالضوء النبضي المكثف (IPL)، وتقطيع الألياف تحت الندبة، وليزر ثاني أكسيد الكربون الجزئي لتنعيم ملمس البشرة.",
    zh: "定向外用药物治疗、强脉冲光（IPL）祛痘、凹陷皮下剥离（subsisi），以及点阵CO2激光以重新平整皮肤纹理。",
    ja: "局所的な外用薬処方、アクネIPL（強力パルスライト）治療、瘢痕サブシジョン、および肌の凹凸を平滑にするフラクショナルCO2レーザー治療。"
  },
  "Deep Hydration & Skin Barrier Repair": {
    id: "Deep Hydration & Skin Barrier Repair",
    en: "Deep Hydration & Skin Barrier Repair",
    ar: "الترطيب العميق وإصلاح حاجز البشرة",
    zh: "深度深层补水与皮肤屏障修护",
    ja: "ディープハイドレーション＆バリア機能修復"
  },
  "Terapi infus nutrisi, facial hidrasi premium, serta pengolesan ceramide-rich barrier protector klinis untuk mengunci kelembapan dan memperkuat kulit.": {
    id: "Terapi infus nutrisi, facial hidrasi premium, serta pengolesan ceramide-rich barrier protector klinis untuk mengunci kelembapan dan memperkuat kulit.",
    en: "Nutrient infusion therapy, premium hydrating facials, and clinical application of ceramide-rich barrier protectors to lock in moisture and fortify skin.",
    ar: "علاج بتسريب المغذيات، وفيشال ترطيب ممتاز، وتطبيق واقي حاجز غني بالسيراميد لإغلاق الرطوبة وتقوية البشرة.",
    zh: "营养输液疗法、高阶补水面部护理，以及临床涂抹富含神经酰胺（ceramide-rich）的屏障保护剂以锁住水分并强韧肌肤。",
    ja: "栄養補給点滴、プレミアム水分補給フェイシャル、および水分を閉じ込めてお肌を保護・強化するための、高濃度セラミド配合バリアプロテクター of 塗布。"
  },
  "Video Walkthrough & Demo Sistem": {
    id: "Video Walkthrough & Demo Sistem",
    en: "Video Walkthrough & System Demo",
    ar: "عرض الفيديو التوضيحي وتجربة النظام",
    zh: "视频演示与系统导览",
    ja: "ビデオウォークスルー＆システムデモ"
  },
  "Saksikan simulasi video cara kerja sistem digital terintegrasi kami. Beralih antara versi Desktop (CRM Dashboard) & Mobile (Patient Skin Quiz).": {
    id: "Saksikan simulasi video cara kerja sistem digital terintegrasi kami. Beralih antara versi Desktop (CRM Dashboard) & Mobile (Patient Skin Quiz).",
    en: "Watch the video simulation of how our integrated digital system works. Switch between the Desktop (CRM Dashboard) & Mobile (Patient Skin Quiz) versions.",
    ar: "شاهد محاكاة الفيديو لكيفية عمل نظامنا الرقمis المتكامل. بدّل بين نسخة سطح المكتب (لوحة تحكم علاقات العملاء) ونسخة الهاتف (اختبار بشرة المريض).",
    zh: "观看我们集成数字系统的视频模拟。在桌面版（CRM 仪表盘）和移动版（患者皮肤测试）之间切换。",
    ja: "統合デジタルシステムの動作ビデオシミュレーションをご覧ください。デスクトップ版（CRMダッシュボード）とモバイル版（患者スキンクイズ）を切り替えることができます。"
  },
  "Progress Simulasi": {
    id: "Progress Simulasi",
    en: "Simulation Progress",
    ar: "تقدم المحاكاة",
    zh: "模拟进度",
    ja: "シミュレーション進行状況"
  },
  "Putar": {
    id: "Putar",
    en: "Play",
    ar: "تشغيل",
    zh: "播放",
    ja: "再生"
  },
  "Simulasi": {
    id: "Simulasi",
    en: "Simulation",
    ar: "المحاكاة",
    zh: "模拟",
    ja: "シミュレーション"
  },
  "Mengapa ribuan pasien memercayakan kesehatan wajah dan keluarga kepada kami secara bertahun-tahun.": {
    id: "Mengapa ribuan pasien memercayakan kesehatan wajah dan keluarga kepada kami secara bertahun-tahun.",
    en: "Why thousands of patients trust their facial and family health to us for years.",
    ar: "لماذا يثق آلاف المرضى بصحة وجوههم وعائلاتهم معنا لسنوات.",
    zh: "为什么成千上万的患者多年来一直将面部和家庭健康托付给我们。",
    ja: "なぜ何千人もの患者様が長年にわたり、お顔とご家族の健康を当院に託してくださるのか。"
  },
  "Dokter Profesional": {
    id: "Dokter Profesional",
    en: "Professional Doctors",
    ar: "أطباء محترفون",
    zh: "专业医生团队",
    ja: "プロフェッショナル医師"
  },
  "Ditangani dokter spesialis terdaftar STR resmi serta perawat tersertifikasi kompetensi estetika.": {
    id: "Ditangani dokter spesialis terdaftar STR resmi serta perawat tersertifikasi kompetensi estetika.",
    en: "Handled by official STR-registered specialists and aesthetic competency-certified nurses.",
    ar: "يتم التعامل معها من قبل أخصائيين مسجلين رسميًا وممرضين معتمدين في الكفاءة التجميلية.",
    zh: "由正式注册的专科医生和具备美容资质认证的护士团队亲自诊疗。",
    ja: "公式に登録された専門医（STR保有）および美容コンピテンシー認定看護師が担当します。"
  },
  "Alat Berstandar FDA": {
    id: "Alat Berstandar FDA",
    en: "FDA Standard Equipment",
    ar: "أجهزة بمعايير إدارة الغذاء والدواء",
    zh: "FDA认证标准设备",
    ja: "FDA基準クリア機器"
  },
  "Teknologi gelombang laser, HIFU, RF original terdaftar izin Kemenkes RI demi ketepatan medis.": {
    id: "Teknologi gelombang laser, HIFU, RF original terdaftar izin Kemenkes RI demi ketepatan medis.",
    en: "Original laser, HIFU, and RF wave technologies registered under Ministry of Health RI for medical precision.",
    ar: "تقنيات موجات الليزر والهايفو والترددات اللاسلكية الأصلية المسجلة لدى وزارة الصحة لضمان الدقة الطبية.",
    zh: "拥有印尼卫生部（Kemenkes RI）注册许可的原装激光、超声刀（HIFU）、热玛吉（RF）技术，确保医疗精准度。",
    ja: "医療的な正確性のために、インドネシア保健省（Kemenkes RI）に登録されたオリジナルのレーザー、HIFU、RF技術を採用。"
  },
  "CRM Reminder Cerdas": {
    id: "CRM Reminder Cerdas",
    en: "Smart CRM Reminders",
    ar: "تذكيرات خدمة العملاء الذكية",
    zh: "智能 CRM 关怀提醒",
    ja: "スマートCRMリマインダー"
  },
  "Pasien diingatkan ramah otomatis lewat WhatsApp jadwal Aftercare demi kelanjutan terapi.": {
    id: "Pasien diingatkan ramah otomatis lewat WhatsApp jadwal Aftercare demi kelanjutan terapi.",
    en: "Patients are automatically and politely reminded via WhatsApp of Aftercare schedules for therapy continuity.",
    ar: "يتم تذكير المرضى تلقائيًا وبشكل ودي عبر الواتساب بمواعيد الرعاية اللاحقة لضمان استمرار العلاج.",
    zh: "通过 WhatsApp 自动发送亲切的术后护理排程提醒，确保治疗的延续性。",
    ja: "治療の継続性を高めるため、アフターケアのスケジュールをWhatsAppで自動かつ丁寧にお知らせします。"
  },
  "Consent Data Pasien": {
    id: "Consent Data Pasien",
    en: "Patient Data Consent",
    ar: "موافقة بيانات المريض",
    zh: "患者数据知情同意",
    ja: "患者データプライバシー同意"
  },
  "Data foto medis dan pribadi dienkripsi aman untuk menjaga kenyamanan privasi Anda.": {
    id: "Data foto medis dan pribadi dienkripsi aman untuk menjaga kenyamanan privasi Anda.",
    en: "Medical photos and personal data are securely encrypted to maintain your privacy and comfort.",
    ar: "يتم تشفير الصور الطبية والبيانات الشخصية بأمان للحفاظ على خصوصيتك وراحتك.",
    zh: "医疗照片及个人隐私数据均经过安全加密，充分保障您的隐私与安心舒适。",
    ja: "お客様のプライバシーと安心を守るため、臨床写真および個人データは高度に暗号化され安全に保管されます。"
  },
  "Katalog tindakan kecantikan dan kesehatan paripurna terintegrasi.": {
    id: "Katalog tindakan kecantikan dan kesehatan paripurna terintegrasi.",
    en: "Integrated cosmetic treatment and holistic health catalog.",
    ar: "كتالوج متكامل للعلاج التجميلي والصحة الشاملة.",
    zh: "综合美容治疗与整体健康目录。",
    ja: "総合的な美容治療と統合的なヘルスケアのカタログ。"
  },
  "Pesan sekarang meluncur ke wizard booking": {
    id: "Pesan sekarang meluncur ke wizard booking",
    en: "Book now to go to booking wizard",
    ar: "احجز الآن للانتقال إلى معالج الحجز",
    zh: "立即预约前往挂号流程",
    ja: "今すぐ予約して予約ウィザードへ進む"
  },
  "Mulai:": {
    id: "Mulai:",
    en: "Starts from:",
    ar: "يبدأ من:",
    zh: "起价：",
    ja: "開始価格："
  },
  "Tim dokter ahli berizin STR resmi Kemenkes, ramah, dan berpengalaman puluhan tahun.": {
    id: "Tim dokter ahli berizin STR resmi Kemenkes, ramah, dan berpengalaman puluhan tahun.",
    en: "A team of expert doctors officially registered with the Ministry of Health (STR), friendly, and with decades of experience.",
    ar: "فريق من الأطباء الخبراء المسجلين رسميًا لدى وزارة الصحة (STR)، ودودين، وذوي خبرة تمتد لعقود.",
    zh: "由卫生部官方注册（持有 STR 执照）的专家医生团队组成，亲切友好且拥有数十年临床经验。",
    ja: "インドネシア保健省に公式登録（STR保有）された、親切で数十年の経験を持つ専門医チーム。"
  },
  "thn": {
    id: "thn",
    en: "yrs",
    ar: "سنوات",
    zh: "年经验",
    ja: "年"
  },
  "Jadwal Praktik Utama (Konsultasi):": {
    id: "Jadwal Praktik Utama (Konsultasi):",
    en: "Main Schedule (Consultation):",
    ar: "جدول المواعيد الرئيسي (الاستشارة):",
    zh: "主要排班表 (咨询):",
    ja: "主な診療スケジュール（カウンセリング）:"
  },
  "Gunakan kode digital promo ini di formulir reservasi untuk mengunci harga core diskon.": {
    id: "Gunakan kode digital promo ini di formulir reservasi untuk mengunci harga core diskon.",
    en: "Use this digital promo code in the reservation form to lock in your core discount price.",
    ar: "استخدم رمز الترويج الرقمي هذا في نموذج الحجز لتأمين سعر الخصم الأساسي.",
    zh: "在预约表单中使用此数字促销代码以锁定核心折扣价。",
    ja: "予約フォームでこのデジタルプロモコードを使用し、割引価格を適用します。"
  },
  "Diskon": {
    id: "Diskon",
    en: "Discount",
    ar: "خصم",
    zh: "折扣",
    ja: "割引"
  },
  "Harga Promo:": {
    id: "Harga Promo:",
    en: "Promo Price:",
    ar: "سعر العرض:",
    zh: "促销价：",
    ja: "プロモ価格："
  },
  "Hasil klinis visual pencapaian pasien tepercaya kami setelah rangkaian treatment berkala.": {
    id: "Hasil klinis visual pencapaian pasien tepercaya kami setelah rangkaian treatment berkala.",
    en: "Visual clinical outcomes of our trusted patients after a series of periodic treatments.",
    ar: "النتائج السريرية البصرية لمرضانا الموثوقين بعد سلسلة من العلاجات الدورية.",
    zh: "我们信赖的患者经过一系列定期治疗后的视觉临床效果。",
    ja: "定期的な治療を重ねた信頼できる患者様のビジュアル的な臨床結果。"
  },
  "Dokter pendamping:": {
    id: "Dokter pendamping:",
    en: "Attending physician:",
    ar: "الطبيب المعالج:",
    zh: "主治医生：",
    ja: "担当医："
  },
  "Durasi:": {
    id: "Durasi:",
    en: "Duration:",
    ar: "المدة:",
    zh: "疗程时长：",
    ja: "期間："
  },
  "Suara Kepuasan Pasien": {
    id: "Suara Kepuasan Pasien",
    en: "Voice of Patient Satisfaction",
    ar: "صوت رضا المرضى",
    zh: "患者满意之声",
    ja: "患者様の満足の声"
  },
  "Apa Kata Mereka Tentang Kami?": {
    id: "Apa Kata Mereka Tentang Kami?",
    en: "What They Say About Us",
    ar: "ماذا يقولون عنا؟",
    zh: "他们的真实评价",
    ja: "お客様の声"
  },
  "Lebih dari 10.000+ pasien telah mempercayakan kesehatan kulit & estetika wajah mereka kepada spesialis kami. Berikut testimoni jujur dari mereka:": {
    id: "Lebih dari 10.000+ pasien telah mempercayakan kesehatan kulit & estetika wajah mereka kepada spesialis kami. Berikut testimoni jujur dari mereka:",
    en: "More than 10,000+ patients have trusted their skin health & facial aesthetics to our specialists. Here are their honest testimonials:",
    ar: "لقد وثق أكثر من ١٠٠٠٠ مريض بصحة بشرتهم وجمال وجوههم مع أخصائيينا. إليك شهاداتهم الصادقة:",
    zh: "超过10,000名患者将他们的皮肤健康与面部美学托付给我们的专家。以下是他们的真实评价：",
    ja: "1万人以上の患者様が、お肌の健康と顔の美しさを当院 of 専門医に託してくださっています。以下は、お客様から寄せられた率直な感想です："
  },
  "Awalnya ragu karena jerawat saya cukup parah, tapi setelah konsultasi dan treatment bertahap, kulit terasa jauh lebih bersih dan terkontrol. Admin juga ramah banget sering ingetin jadwal follow-up!": {
    id: "Awalnya ragu karena jerawat saya cukup parah, tapi setelah konsultasi dan treatment bertahap, kulit terasa jauh lebih bersih dan terkontrol. Admin juga ramah banget sering ingetin jadwal follow-up!",
    en: "Initially hesitant because my acne was quite severe, but after consultation and step-by-step treatment, my skin feels much cleaner and controlled. The admin is also very friendly, often reminding me of follow-up schedules!",
    ar: "ترددت في البداية لأن حب الشباب كان شديدًا، ولكن setelah الاستشارة والعلاج التدريجي، أصبحت بشرتي أنظف وأكثر توازناً. فريق الدعم ودود للغاية ويذكرني بمواعيد المتابعة!",
    zh: "起初因为痘痘非常严重而感到犹豫，但在面诊和针对性分期治疗后，皮肤感觉干净、清爽了许多，痘痘也得到了控制。客服人员非常贴心，经常提醒我后续护理时间！",
    ja: "ニキビがかなりひどかったので最初は不安でしたが、カウンセリングと段階的な治療を経て、肌が格段にクリアになり落ち着いてきました。スタッフの方もとても親切で、アフターケアのスケジュールをよく案内してくれます！"
  },
  "Kliniknya sangat bersih, wangi, dan estetik. Dokternya menjelaskan detail struktur wajah saya sebelum treatment HIFU. Hasilnya natural, kerutan halus berkurang dan langsung keliatan kencang.": {
    id: "Kliniknya sangat bersih, wangi, dan estetik. Dokternya menjelaskan detail struktur wajah saya sebelum treatment HIFU. Hasilnya natural, kerutan halus berkurang dan langsung keliatan kencang.",
    en: "The clinic is very clean, fragrant, and aesthetic. The doctor explained my facial structure in detail before the HIFU treatment. The result is natural, fine lines are reduced, and it immediately looks firm.",
    ar: "العيادة نظيفة للغاية، عطرة، وجميلة. شرح الطبيب بنية وجهي بالتفصيل قبل علاج الهايفو. النتيجة طبيعية، والخطوط الدقيقة تضاءلت وبشرتي مشدودة فوراً.",
    zh: "诊所环境非常整洁、清香且极具美感。医生在进行超声刀提拉之前，非常详尽地讲解了我的面部结构。效果很自然，细纹变浅了，而且做完立马就能看出紧致感。",
    ja: "クリニックはとても清潔で、良い香りが漂う素敵な空間です。医師がHIFU施術の前にお顔の構造を詳細に説明してくれました。仕上がりは自然で、細かいシワが目立たなくなり、すぐにリフトアップ効果を実感できました。"
  },
  "Proses scaling gigi sangat cepat, minim rasa ngilu, dan alatnya modern sekali. Reservasi online dari rumah juga gampang banget, tinggal scan QR code waktu check-in di klinik.": {
    id: "Proses scaling gigi sangat cepat, minim rasa ngilu, dan alatnya modern sekali. Reservasi online dari rumah juga gampang banget, tinggal scan QR code waktu check-in di klinik.",
    en: "The dental scaling process was very fast, minimal pain, and the equipment is very modern. Online reservation from home was also extremely easy, just scan the QR code when checking in at the clinic.",
    ar: "عملية تنظيف الأسنان كانت سريعة جداً، وبألم لا يذكر، والأجهزة متطورة للغاية. الحجز عبر الإنترنت من المنزل سهل جداً، يكفي مسح رمز الاستجابة السريعة عند تسجيل الوصول في العيادة.",
    zh: "洗牙过程非常迅速，酸痛感微乎其微，设备也特别先进。在家进行网上预约也超级简单，到诊所签到时只需扫一下二维码即可，非常便捷。",
    ja: "歯のクリーニング（スケーリング）は非常にスピーディーで、痛みもほとんどなく、機器も最新のものでした。自宅からのオンライン予約もとても簡単で、来院時にQRコードをスキャンするだけでスムーズに受付できました。"
  },
  "Puas banget sama hasil laser di sini! Baru 3 kali sesi tapi flek hitam membandel di pipi sudah memudar drastis. Wajah jadi kelihatan glowing merata dan cerah berseri.": {
    id: "Puas banget sama hasil laser di sini! Baru 3 kali sesi tapi flek hitam membandel di pipi sudah memudar drastis. Wajah jadi kelihatan glowing merata dan cerah berseri.",
    en: "Extremely satisfied with the laser results here! Only 3 sessions but stubborn dark spots on my cheeks have drastically faded. My face looks evenly glowing and bright.",
    ar: "راضية تماماً عن نتائج الليزر هنا! بعد ٣ جلسات فقط، تلاشت البقع الداكنة العنيدة في خدي بشكل مذهل. أصبح وجهي مشرقاً ومتوهجاً بشكل متناسق.",
    zh: "非常满意在这里做激光的效果！仅仅做了3次疗程，脸上顽固的黑斑就已经明显淡化了。现在整张脸看起来光泽度均匀、白皙透亮。",
    ja: "ここのレーザー治療には大満足です！まだ3回の施術ですが、頬の頑固なシミが劇的に薄くなりました。顔全体が均一にトーンアップし、ツヤ肌になりました。"
  },
  "Pasien Terdaftar": {
    id: "Pasien Terdaftar",
    en: "Registered Patient",
    ar: "مريض مسجل",
    zh: "已注册患者",
    ja: "登録患者"
  },
  "Kunjungi 3 outlet cabang utama Aurora MedBeauty yang didesain estetik, premium, nyaman, ramah disabilitas, dan parkir luas.": {
    id: "Kunjungi 3 outlet cabang utama Aurora MedBeauty yang didesain estetik, premium, nyaman, ramah disabilitas, dan parkir luas.",
    en: "Visit the 3 main branch outlets of Aurora MedBeauty, designed to be aesthetic, premium, comfortable, disability-friendly, and with spacious parking.",
    ar: "تفضل بزيارة الفروع الثلاثة الرئيسية لأورورا ميدبيوتي المصممة بجمال، راحة، ومجهزة لتسهيل حركة ذوي الاحتياجات الخاصة مع مواقف واسعة للسيارات.",
    zh: "欢迎莅临 Aurora 医美中心的三大核心直营分部，专为美学空间、高端尊贵、舒适体验、无障碍通道及宽敞停车位量身打造。",
    ja: "美しく、プレミアムで快適な、バリアフリー設計と広い駐車場を完備したAurora MedBeautyの主要3店舗にぜひお越しください。"
  },
  "Buka:": {
    id: "Buka:",
    en: "Open:",
    ar: "مفتوح:",
    zh: "营业时间：",
    ja: "営業時間："
  },
  "Layanan Emergency:": {
    id: "Layanan Emergency:",
    en: "Emergency Services:",
    ar: "خدمات الطوارئ:",
    zh: "紧急求助专线：",
    ja: "緊急連絡先："
  },
  "Butuh konsultasi gawat darurat paska-tindakan? Hubungi WhatsApp Careline 24/7 di ": {
    id: "Butuh konsultasi gawat darurat paska-tindakan? Hubungi WhatsApp Careline 24/7 di ",
    en: "Need emergency consultation post-treatment? Contact our 24/7 WhatsApp Careline at ",
    ar: "هل تحتاج إلى استشارة طارئة بعد العلاج؟ اتصل بخط المساعدة عبر الواتساب على مدار الساعة على ",
    zh: "术后需要紧急咨询？欢迎随时拨打我们的 24/7 WhatsApp 关怀专线 ",
    ja: "施術後の緊急相談が必要ですか？24時間年中無休のWhatsAppケアライン（"
  },
  " untuk asisten medis instan.": {
    id: " untuk asisten medis instan.",
    en: " for instant medical assistance.",
    ar: " للحصول على مساعدة طبية فورية.",
    zh: " 享受即时医学助理指导。",
    ja: "）までご連絡ください。医療アシスタントが即座に対応します。"
  },
  "Interactive Maps Simulation": {
    id: "Interactive Maps Simulation",
    en: "Interactive Maps Simulation",
    ar: "محاكاة الخرائط التفاعلية",
    zh: "交互式地图模拟展示",
    ja: "インタラクティブマップ・シミュレーション"
  },
  "Senopati, Bandung Riau, & Sungkono Surabaya Center": {
    id: "Senopati, Bandung Riau, & Sungkono Surabaya Center",
    en: "Senopati, Bandung Riau, & Sungkono Surabaya Center",
    ar: "سينوباتي، باندونغ رياو، وسونغكونو سورابايا سنتر",
    zh: "雅加达 Senopati、万隆 Riau 及泗水 Sungkono 体验中心",
    ja: "セノパティ、バンドン・リアウ、＆スラバヤ・スンコノセンター院"
  },
  "Sistem rute koordinat terintegrasi langsung dengan GPS Maps API untuk navigasi instan di handphone pasien.": {
    id: "Sistem rute koordinat terintegrasi langsung dengan GPS Maps API untuk navigasi instan di handphone pasien.",
    en: "The coordinate routing system is directly integrated with the GPS Maps API for instant navigation on patient mobile phones.",
    ar: "نظام تحديد المسارات مدمج مباشرة مع واجهة خرائط GPS للملاحة الفورية على الهواتف المحمولة للمرضى.",
    zh: "坐标路线系统直接与 GPS 地图 API 深度集成，可在患者手机上实现即时一键导航。",
    ja: "ルート案内システムはGPSマップAPIと直接連携しており、患者様のスマートフォンからワンタップでナビゲーションが可能です。"
  },
  "Jawaban resmi tim medis atas pertanyaan yang paling sering diajukan calon pasien.": {
    id: "Jawaban resmi tim medis atas pertanyaan yang paling sering diajukan calon pasien.",
    en: "Official answers from the medical team to the questions most frequently asked by prospective patients.",
    ar: "الإجابات الرسمية من الفريق الطبي على الأسئلة الأكثر تداولاً من قبل المرضى المحتملين.",
    zh: "医疗团队针对意向患者最常咨询问题的官方权威解答。",
    ja: "ご来院を検討されているお客様からよく寄せられる質問に対する、医療チームからの公式回答です。"
  },
  "Mulai Transformasi Kulit Anda Hari Ini": {
    id: "Mulai Transformasi Kulit Anda Hari Ini",
    en: "Start Your Skin Transformation Today",
    ar: "ابدأ تحول بشرتك اليوم",
    zh: "即刻开启您的肌肤蜕变之旅",
    ja: "今すぐ美肌への変身を始めましょう"
  },
  "Siap Dapatkan Kulit Sehat & Glowing Impian?": {
    id: "Siap Dapatkan Kulit Sehat & Glowing Impian?",
    en: "Ready to Achieve Your Dream Healthy & Glowing Skin?",
    ar: "هل أنت مستعد للحصول على بشرة أحلامك الصحية والمتوهجة؟",
    zh: "准备好拥有梦寐以求的健康水光肌了吗？",
    ja: "理想の健康的で輝く素肌を手に入れる準備はできましたか？"
  },
  "Ikuti Skin Concern Quiz berbasis medis kami secara gratis, atau buat reservasi instan bersama Dokter Spesialis andalan Anda hanya dalam beberapa menit saja.": {
    id: "Ikuti Skin Concern Quiz berbasis medis kami secara gratis, atau buat reservasi instan bersama Dokter Spesialis andalan Anda hanya dalam beberapa menit saja.",
    en: "Take our medical-based Skin Concern Quiz for free, or make an instant reservation with your preferred Specialist in just a few minutes.",
    ar: "أجرِ اختبار مشاكل البشرة الطبي المجاني الخاص بنا، أو احجز موعداً فورياً مع أخصائي من اختيارك في غضون دقائق قليلة.",
    zh: "免费参与我们基于医学原理的皮肤测试，或者只需几分钟即可在线预订您的专科医生面诊。",
    ja: "お肌の悩みを分析する無料のスキンクイズを受けるか、お気に入りの専門医の診察を数分で即時予約できます。"
  },
  "Mulai Skin Quiz (Gratis)": {
    id: "Mulai Skin Quiz (Gratis)",
    en: "Start Skin Quiz (Free)",
    ar: "ابدأ اختبار البشرة (مجاني)",
    zh: "开始皮肤测试（免费）",
    ja: "無料スキンクイズを始める"
  },
  "Buat Reservasi Online": {
    id: "Buat Reservasi Online",
    en: "Make Online Reservation",
    ar: "احجز موعداً عبر الإنترنت",
    zh: "立即在线预约挂号",
    ja: "オンライン予約をする"
  },
  "Sertifikat Kemenkes RI": {
    id: "Sertifikat Kemenkes RI",
    en: "Ministry of Health RI Certified",
    ar: "معتمد من وزارة الصحة",
    zh: "印尼卫生部官方认证",
    ja: "インドネシア保健省公認"
  },
  "Peralatan FDA Approved": {
    id: "Peralatan FDA Approved",
    en: "FDA Approved Equipment",
    ar: "أجهزة معتمدة من إدارة الغذاء والدواء",
    zh: "FDA 认证标准设备",
    ja: "FDA承認機器を使用"
  },
  "3 Cabang Eksklusif": {
    id: "3 Cabang Eksklusif",
    en: "3 Exclusive Branches",
    ar: "٣ فروع حصرية",
    zh: "3家尊享直营连锁分部",
    ja: "3つのエグゼクティブ店舗"
  },
  "Tautan Cepat": {
    id: "Tautan Cepat",
    en: "Quick Links",
    ar: "روابط سريعة",
    zh: "快速链接",
    ja: "クイックリンク"
  },
  "Katalog Medis": {
    id: "Katalog Medis",
    en: "Medical Catalog",
    ar: "الكتالوج الطبي",
    zh: "医疗项目目录",
    ja: "医療メニュー"
  },
  "Masalah & Solusi": {
    id: "Masalah & Solusi",
    en: "Problems & Solutions",
    ar: "المشكلات والحلول",
    zh: "皮肤问题与解决方案",
    ja: "お悩み・ソリューション"
  },
  "Testimoni Pasien": {
    id: "Testimoni Pasien",
    en: "Patient Testimonials",
    ar: "آراء المرضى",
    zh: "患者真实心声",
    ja: "患者様の体験談"
  },
  "Tim Dokter": {
    id: "Tim Dokter",
    en: "Doctor Team",
    ar: "الفريق الطبي",
    zh: "权威医生团队",
    ja: "医師チーム"
  },
  "Promo Khusus": {
    id: "Promo Khusus",
    en: "Special Promos",
    ar: "العروض الخاصة",
    zh: "限时专属特惠",
    ja: "特別プロモーション"
  },
  "Mulai Skin Quiz": {
    id: "Mulai Skin Quiz",
    en: "Start Skin Quiz",
    ar: "ابدأ اختبار البشرة",
    zh: "开始皮肤测试",
    ja: "スキンクイズを始める"
  },
  "Cabang Layanan": {
    id: "Cabang Layanan",
    en: "Service Branches",
    ar: "فروع الخدمة",
    zh: "连锁服务门店",
    ja: "サービス店舗"
  },
  "Dibuat oleh": {
    id: "Dibuat oleh",
    en: "Created by",
    ar: "تم التطوير بواسطة",
    zh: "技术支持提供：",
    ja: "制作："
  },
  "Higienis & Aman": {
    id: "Higienis & Aman",
    en: "Hygienic & Safe",
    ar: "صحي وآمن",
    zh: "卫生与安全",
    ja: "衛生的かつ安全"
  },
  "Ruang Konsultasi Utama Aurora MedBeauty": {
    id: "Ruang Konsultasi Utama Aurora MedBeauty",
    en: "Aurora MedBeauty Main Consultation Room",
    ar: "غرفة الاستشارة الرئيسية في أورورا ميدبيوتي",
    zh: "Aurora 医美核心会诊室",
    ja: "Aurora MedBeauty メインカウンセリングルーム"
  },
  "Fasilitas modern dengan proses sterilisasi mutakhir berkualitas rumah sakit.": {
    id: "Fasilitas modern dengan proses sterilisasi mutakhir berkualitas rumah sakit.",
    en: "Modern facilities with hospital-grade state-of-the-art sterilization processes.",
    ar: "مرافق حديثة مع عمليات تعقيم متطورة بمستوى المستشفيات.",
    zh: "具备医院级前沿消毒流程的现代化医疗设施。",
    ja: "病院水準の最先端滅菌プロセスを備えた最新設備。"
  },
  "Manfaat Utama:": {
    id: "Manfaat Utama:",
    en: "Key Benefits:",
    ar: "الفوائد الرئيسية:",
    zh: "主要功效:",
    ja: "主な効果・メリット:"
  },
  "Cocok Untuk Permasalahan:": {
    id: "Cocok Untuk Permasalahan:",
    en: "Suitable For Concerns:",
    ar: "مناسب للمشاكل:",
    zh: "适用皮肤问题:",
    ja: "おすすめの肌悩み:"
  },
  "Kontraindikasi (Halangan):": {
    id: "Kontraindikasi (Halangan):",
    en: "Contraindications (Avoid):",
    ar: "موانع الاستعمال:",
    zh: "禁忌症/避忌人群:",
    ja: "禁忌事項・お控えいただく方:"
  },
  "Persiapan Tindakan:": {
    id: "Persiapan Tindakan:",
    en: "Pre-Treatment Preparation:",
    ar: "التحضير قبل العلاج:",
    zh: "疗程前准备:",
    ja: "施術前の準備事項:"
  },
  "Panduan Aftercare (Pasca Tindakan):": {
    id: "Panduan Aftercare (Pasca Tindakan):",
    en: "Post-Treatment Aftercare Guide:",
    ar: "دليل الرعاية اللاحقة:",
    zh: "术后护理与保养指南:",
    ja: "アフターケア（施術後のガイド）:"
  },
  "Promo konsultasi dan treatment jerawat untuk kulit lebih sehat.": {
    id: "Promo konsultasi dan treatment jerawat untuk kulit lebih sehat.",
    en: "Consultation promo and acne treatment for healthier skin.",
    ar: "عرض الاستشارة وعلاج حب الشباب لبشرة أكثر صحة.",
    zh: "痤疮诊疗与针对性治疗特惠，重塑健康肌肤。",
    ja: "肌荒れ・ニキビ集中カウンセリング＆治療プロモーション。"
  },
  "Facial premium untuk kulit lebih cerah dan glowing.": {
    id: "Facial premium untuk kulit lebih cerah dan glowing.",
    en: "Premium facial for brighter and glowing skin.",
    ar: "جلسة فيشال ممتازة لبشرة أكثر إشراقاً وتوهجاً.",
    zh: "高端面部护理，重焕白皙水光肌肤。",
    ja: "より明るく輝く素肌へ導くプレミアムフェイシャル。"
  },
  "Paket medical check-up lengkap untuk profesional dan keluarga.": {
    id: "Paket medical check-up lengkap untuk profesional dan keluarga.",
    en: "Comprehensive medical check-up package for professionals and families.",
    ar: "باقة فحص طبي شاملة للمهنيين والعائلات.",
    zh: "专为职场精英及家庭量身定制的全面医学体检套餐。",
    ja: "働く方やご家族のための総合健康診断・メディカルチェックパック。"
  },
  "Ambil Promo Acne": {
    id: "Ambil Promo Acne",
    en: "Claim Acne Promo",
    ar: "احصل على عرض حب الشباب",
    zh: "抢购祛痘优惠",
    ja: "ニキビプロモを適用"
  },
  "Booking Glow Facial": {
    id: "Booking Glow Facial",
    en: "Book Glow Facial",
    ar: "حجز فيشال الإشراق",
    zh: "预约水光面部护理",
    ja: "フェイシャルを予約"
  },
  "Booking Check-Up": {
    id: "Booking Check-Up",
    en: "Book Check-Up",
    ar: "حجز الفحص الطبي",
    zh: "预约医学体检",
    ja: "健康診断を予約"
  },
  "Ambil Promo": {
    id: "Ambil Promo",
    en: "Claim Promo",
    ar: "احصل على العرض",
    zh: "抢购特惠",
    ja: "プロモを適用"
  },
  "8 minggu": {
    id: "8 minggu",
    en: "8 weeks",
    ar: "٨ أسابيع",
    zh: "8 周",
    ja: "8週間"
  },
  "4 minggu": {
    id: "4 minggu",
    en: "4 weeks",
    ar: "٤ أسابيع",
    zh: "4 周",
    ja: "4週間"
  },
  "Perkembangan kulit pasien setelah menjalani program perawatan jerawat bertahap secara berkala.": {
    id: "Perkembangan kulit pasien setelah menjalani program perawatan jerawat bertahap secara berkala.",
    en: "Patient's skin progression after undergoing a step-by-step acne treatment program periodically.",
    ar: "تطور بشرة المريض بعد الخضوع لبرنامج علاج حب الشباب التدريجي بشكل دوري.",
    zh: "患者定期接受针对性分期痤疮治疗后的皮肤改善轨迹。",
    ja: "段階的なニキビ治療プログラムを定期的に受診された患者様の肌の経過。"
  },
  "Tampilan kulit terlihat lebih cerah dan warna kulit lebih merata setelah treatment laser medis.": {
    id: "Tampilan kulit terlihat lebih cerah dan warna kulit lebih merata setelah treatment laser medis.",
    en: "The skin looks brighter and skin tone is more even after medical laser treatment.",
    ar: "تبدو البشرة أكثر إشراقاً وتوحيداً للون بعد العلاج بالليزر الطبي.",
    zh: "接受专业医学激光治疗后，肤色明显提亮且更加均匀。",
    ja: "医療レーザー治療の施術後、お肌に透明感が生まれ、色ムラが整った状態。"
  },
  "Perubahan tampilan kontur wajah terlihat lebih tegas dan kulit kencang setelah treatment lifting non-bedah.": {
    id: "Perubahan tampilan kontur wajah terlihat lebih tegas dan kulit kencang setelah treatment lifting non-bedah.",
    en: "Facial contour appears more defined and skin is firmer after non-surgical lifting treatment.",
    ar: "تبدو ملامح الوجه أكثر تحديداً والبشرة مشدودة بعد علاج الشد غير الجراحي.",
    zh: "接受非手术面部提拉/超声刀治疗后，面部轮廓更为清晰，皮肤明显紧致。",
    ja: "非外科的リフトアップ施術による、フェイスラインの引き締まりとハリの向上。"
  },
  "Hasil dapat berbeda pada setiap individu.": {
    id: "Hasil dapat berbeda pada setiap individu.",
    en: "Results may vary depending on the individual.",
    ar: "قد تختلف النتائج من شخص لآخر.",
    zh: "个人治疗效果因人而异。",
    ja: "効果には個人差があります。"
  },
  "Apakah bisa booking tanpa membayar booking fee?": {
    id: "Apakah bisa booking tanpa membayar booking fee?",
    en: "Can I book without paying a booking fee?",
    ar: "هل يمكنني الحجز دون دفع رسوم حجز؟",
    zh: "可以免付预约订金直接挂号吗？",
    ja: "予約金（デポジット）なしで予約することはできますか？"
  },
  "Tergantung kebijakan cabang dan layanan. Beberapa layanan membutuhkan booking fee kecil untuk mengurangi risiko no-show dan mengunci jadwal dokter.": {
    id: "Tergantung kebijakan cabang dan layanan. Beberapa layanan membutuhkan booking fee kecil untuk mengurangi risiko no-show dan mengunci jadwal dokter.",
    en: "Depending on the branch and service policy. Some services require a small booking fee to reduce no-show risks and lock in the doctor's schedule.",
    ar: "يعتمد ذلك على سياسة الفرع والخدمة. تتطلب بعض الخدمات رسوم حجز صغيرة لتقليل مخاطر عدم الحضور وتأمين جدول الطبيب.",
    zh: "具体取决于各分部及对应项目的规定。部分热门诊疗项目需要支付少额订金，以降低爽约率并为您提前锁定医生的面诊时间。",
    ja: "店舗や施術メニューのポリシーにより異なります。一部のメニューでは、無断キャンセルの防止および医師のスケジュール確保のため、少額の予約金が必要となる場合があります。"
  },
  "Apakah hasil treatment sama untuk semua orang?": {
    id: "Apakah hasil treatment sama untuk semua orang?",
    en: "Are the treatment results the same for everyone?",
    ar: "هل نتائج العلاج هي نفسها للجميع؟",
    zh: "治疗效果对所有人来说都是一样的吗？",
    ja: "治療の効果はすべての人で同じですか？"
  },
  "Tidak. Hasil treatment dapat berbeda tergantung kondisi kulit, usia, gaya hidup, faktor hormonal, dan kepatuhan terhadap instruksi aftercare.": {
    id: "Tidak. Hasil treatment dapat berbeda tergantung kondisi kulit, usia, gaya hidup, faktor hormonal, dan kepatuhan terhadap instruksi aftercare.",
    en: "No. Treatment results may vary depending on skin condition, age, lifestyle, hormonal factors, and compliance with aftercare instructions.",
    ar: "لا. قد تختلف نتائج العلاج اعتماداً على حالة البشرة، العمر، نمط الحياة، العوامل الهرمونية، والالتزام بإرشادات الرعاية اللاحقة.",
    zh: "不是。由于个人皮肤底子、年龄、生活习惯、激素水平以及术后护理配合度的不同，治疗效果也会因人而异。",
    ja: "いいえ、異なります。肌の状態、年齢、ライフスタイル、ホルモンバランス、施術後のアフターケアの遵守状況によって、効果には個人差があります。"
  },
  "Apakah konsultasi online bisa menggantikan pemeriksaan dokter?": {
    id: "Apakah konsultasi online bisa menggantikan pemeriksaan dokter?",
    en: "Can an online consultation replace a doctor's examination?",
    ar: "هل يمكن للاستشارة عبر الإنترنت أن تغني عن فحص الطبيب؟",
    zh: "线上问诊/皮肤测试能完全替代医生的面诊检查吗？",
    ja: "オンラインカウンセリングで医師の対面診察を代替できますか？"
  },
  "Tidak. Konsultasi online atau Skin Quiz hanya memberikan informasi awal dan rekomendasi umum. Diagnosis dan tindakan medis tetap memerlukan pemeriksaan langsung di klinik.": {
    id: "Tidak. Konsultasi online atau Skin Quiz hanya memberikan informasi awal dan rekomendasi umum. Diagnosis dan tindakan medis tetap memerlukan pemeriksaan langsung di klinik.",
    en: "No. Online consultations or Skin Quizzes only provide initial assessment and general recommendations. Medical diagnosis and treatments still require direct examination at our clinics.",
    ar: "لا. توفر الاستشارات عبر الإنترنت أو اختبارات البشرة تقييماً أولياً وتوصيات عامة فقط. لا يزال التشخيص والعلاج الطبي يتطلبان فحصاً مباشراً في العيادة.",
    zh: "不能。线上咨询或皮肤测试仅提供初步评估和通用建议。精准的医学诊断及具体治疗方案仍需前往诊所由医生进行现场面诊。",
    ja: "いいえ、代替できません。オンライン相談やスキンクイズは、初期判定と一般的な推奨事項の提供のみを行います。確定診断や医療行為には、クリニックでの直接の対面診察が必要です。"
  },
  "Apakah data dan foto pasien aman?": {
    id: "Apakah data dan foto pasien aman?",
    en: "Are patient data and photos safe?",
    ar: "هل بيانات وصور المرضى آمنة؟",
    zh: "患者的个人资料和照片安全吗？",
    ja: "患者様のデータや写真は安全に管理されていますか？"
  },
  "Ya. Clinic Digital Pro melindungi kebebasan privasi data pasien dengan akses hak peran terbatas, penandatanganan consent medis, dan standar enkripsi web yang aman.": {
    id: "Ya. Clinic Digital Pro melindungi kebebasan privasi data pasien dengan akses hak peran terbatas, penandatanganan consent medis, dan standar enkripsi web yang aman.",
    en: "Yes. Clinic Digital Pro protects patient data privacy through role-based access controls, signing of medical consent, and secure web encryption standards.",
    ar: "نعم. تحمي كلينيك ديجيتال برو خصوصية بيانات المرضى من خلال التحكم في الوصول القائم على الأدوار، وتوقيع الموافقة الطبية، ومعايير تشفير الويب الآمنة.",
    zh: "是的，绝对安全。Clinic Digital Pro 通过严格的角色权限控制、签署医疗知情同意书以及先进的安全网络加密标准，全方位保护患者的数据隐私。",
    ja: "はい、安全です。Clinic Digital Proは、権限管理、医療同意書の締結、および強固なWeb暗号化基準を通じて、患者様のデータプライバシーを厳格に保護しています。"
  },
  "Apakah bisa reschedule appointment?": {
    id: "Apakah bisa reschedule appointment?",
    en: "Can I reschedule my appointment?",
    ar: "هل يمكنني إعادة جدولة الموعد؟",
    zh: "预约成功后可以申请改期吗？",
    ja: "予約の変更（日程調整）は可能ですか？"
  },
  "Tentu saja. Anda dapat melakukan request perubahan jadwal minimal 24 jam sebelum waktu kunjungan lewat Patient Portal atau membalas chat WhatsApp Customer Service.": {
    id: "Tentu saja. Anda dapat melakukan request perubahan jadwal minimal 24 jam sebelum waktu kunjungan lewat Patient Portal atau membalas chat WhatsApp Customer Service.",
    en: "Of course. You can request a schedule change at least 24 hours prior to your visit through the Patient Portal or by replying to our Customer Service WhatsApp.",
    ar: "بالتأكيد. يمكنك طلب تغيير الموعد قبل ٢٤ ساعة على الأقل من موعد زيارتك عبر بوابة المرضى أو بالرد على واتساب خدمة العملاء.",
    zh: "当然可以。您只需在预约时间前至少24小时，通过患者端个人中心提交改期申请，或直接回复客服微信/WhatsApp消息进行调整。",
    ja: "はい、可能です。ご来院時間の24時間前までに、患者ポータルからご申請いただくか、カスタマーサービスのWhatsAppチャットに返信して変更をリクエストしてください。"
  },
  "Aurora MedBeauty Clinic adalah klinik modern yang menggabungkan layanan kecantikan, dermatologi, dental care, wellness, dan kesehatan keluarga dengan pendekatan profesional, aman, dan personal.": {
    id: "Aurora MedBeauty Clinic adalah klinik modern yang menggabungkan layanan kecantikan, dermatologi, dental care, wellness, dan kesehatan keluarga dengan pendekatan profesional, aman, dan personal.",
    en: "Aurora MedBeauty Clinic is a modern clinic that combines aesthetic services, dermatology, dental care, wellness, and family health with a professional, safe, and personal approach.",
    ar: "عيادة أورورا ميدبيوتي هي عيادة حديثة تجمع بين خدمات التجميل، الأمراض الجلدية، رعاية الأسنان، العافية، وصحة الأسرة بنهج مهني، آمن، وشخصي.",
    zh: "Aurora 医美健康中心是一家融合了美容、皮肤科、齿科护理、康养与家庭健康于一体的现代化诊所，坚持专业、安全、个性化的诊疗理念。",
    ja: "Aurora MedBeauty Clinicは、美容、皮膚科、歯科、ウェルネス、ご家族 of 健康管理を統合し、プロフェッショナルかつ安全で一人ひとりに寄り添うアプローチを提供するモダンな総合クリニックです。"
  },

  // Booking Wizard flow and steps
  "1. Treatment": { id: "1. Treatment", en: "1. Treatment", ar: "١. العلاج", zh: "1. 疗程项目", ja: "1. 施術・メニュー" },
  "2. Cabang & Dokter": { id: "2. Cabang & Dokter", en: "2. Branch & Doctor", ar: "٢. الفرع والطبيب", zh: "2. 门店与医生", ja: "2. 分院・医師選択" },
  "3. Tanggal & Jam": { id: "3. Tanggal & Jam", en: "3. Date & Time", ar: "٣. التاريخ والوقت", zh: "3. 日期与时间", ja: "3. 日時指定" },
  "4. Data Pasien": { id: "4. Data Pasien", en: "4. Patient Info", ar: "٤. بيانات المريض", zh: "4. 患者信息", ja: "4. 患者様情報" },
  "5. Pembayaran": { id: "5. Pembayaran", en: "5. Payment", ar: "٥. الدفع", zh: "5. 定金支付", ja: "5. お支払い" },
  "6. QR Ticket": { id: "6. QR Ticket", en: "6. QR Ticket", ar: "٦. تذكرة QR", zh: "6. 预约凭证/二维码", ja: "6. QRチケット" },
  "Pilih Layanan & Kategori Treatment Medis": {
    id: "Pilih Layanan & Kategori Treatment Medis",
    en: "Select Medical Treatment Service & Category",
    ar: "اختر خدمة وفئة العلاج الطبي",
    zh: "选择医疗美容/诊疗护理类别与项目",
    ja: "施術カテゴリーおよびメニューを選択"
  },
  "Katalog perawatan mutakhir yang aman, berizin resmi, didukung peralatan modern dan higienis.": {
    id: "Katalog perawatan mutakhir yang aman, berizin resmi, didukung peralatan modern dan higienis.",
    en: "A catalog of cutting-edge treatments that are safe, licensed, and supported by modern, hygienic equipment.",
    ar: "كتالوج من العلاجات المتطورة الآمنة والمرخصة والمدعومة بمعدات حديثة وصحية.",
    zh: "汇集行业前沿、安全合规、资质齐全、并采用国际顶尖无菌设备的现代化医疗美容护理项目。",
    ja: "安全・認可済みで、衛生的かつ最新鋭の設備を備えた高度美容医療メニューの一覧です。"
  },
  "Detail Treatment Terpilih:": {
    id: "Detail Treatment Terpilih:",
    en: "Selected Treatment Details:",
    ar: "تفاصيل العلاج المحدد:",
    zh: "已选项目详细参数:",
    ja: "選択したメニューの詳細："
  },
  "Cocok Untuk:": {
    id: "Cocok Untuk:",
    en: "Suitable For:",
    ar: "مناسب لـ:",
    zh: "适用人群与肤质:",
    ja: "こんな方におすすめ:"
  },
  "Lanjut Pilih Dokter": {
    id: "Lanjut Pilih Dokter",
    en: "Continue to Select Doctor",
    ar: "المتابعة لاختيار الطبيب",
    zh: "下一步：选择主诊医师",
    ja: "医師の選択に進む"
  },
  "Pilih Cabang Klinik & Dokter/Terapis": {
    id: "Pilih Cabang Klinik & Dokter/Terapis",
    en: "Select Clinic Branch & Doctor/Therapist",
    ar: "اختر فرع العيادة والطبيب/المعالج",
    zh: "选择就诊门店分部及医生/理疗师",
    ja: "店舗（分院）および担当医・施術者を選択"
  },
  "Tentukan lokasi terdekat Anda dan tim medis tepercaya yang siap melayani dari hati.": {
    id: "Tentukan lokasi terdekat Anda dan tim medis tepercaya yang siap melayani dari hati.",
    en: "Find your nearest location and our trusted medical team ready to serve you from the heart.",
    ar: "حدد موقعك الأقرب وفريقنا الطبي الموثوق المستعد لخدمتك من القلب.",
    zh: "选择距离您最近的门店，以及用真心守护您健康美丽、值得信赖的医疗团队。",
    ja: "最寄りの店舗と、真心を込めて対応する信頼のおける医療スタッフをお選びください。"
  },
  "1. Cabang Klinik Aurora:": {
    id: "1. Cabang Klinik Aurora:",
    en: "1. Aurora Clinic Branch:",
    ar: "١. فرع عيادة أورورا:",
    zh: "1. 挑选 Aurora 连锁门店:",
    ja: "1. Auroraクリニック分院選択："
  },
  "2. Tim Medis Tepercaya:": {
    id: "2. Tim Medis Tepercaya:",
    en: "2. Trusted Medical Team:",
    ar: "٢. الفريق الطبي الموثوق:",
    zh: "2. 选择备受信赖的医护专家:",
    ja: "2. 信頼できる医疗チーム："
  },
  "Lanjut Jadwalkan Kunjungan": {
    id: "Lanjut Jadwalkan Kunjungan",
    en: "Continue to Schedule Visit",
    ar: "المتابعة لجدولة الزيارة",
    zh: "下一步：预约到院时间",
    ja: "日時指定（スケジュール）に進む"
  },
  "Pengalaman": { id: "Pengalaman", en: "Experience", ar: "الخبرة", zh: "临床经验", ja: "臨床経験" },
  "tahun": { id: "tahun", en: "years", ar: "سنوات", zh: "年", ja: "年" },
  "Praktik Utama": { id: "Praktik Utama", en: "Primary Location", ar: "الموقع الرئيسي", zh: "主要执业地", ja: "主な勤務地" },
  "Atur Hari & Jam Kedatangan": {
    id: "Atur Hari & Jam Kedatangan",
    en: "Schedule Day & Time of Arrival",
    ar: "حدد يوم ووقت الوصول",
    zh: "规划您的到院日期与具体时段",
    ja: "ご来院の日程・時間帯を指定"
  },
  "Pilih slot jadwal yang longgar. Kami memprioritaskan ketepatan antrean agar menghindari no-show.": {
    id: "Pilih slot jadwal yang longgar. Kami memprioritaskan ketepatan antrean agar menghindari no-show.",
    en: "Please pick an open slot. We prioritize queue punctuality to eliminate no-shows.",
    ar: "يرجى اختيار موعد متاح. نحن نولي الأولوية لدقة المواعيد لتجنب التغيب.",
    zh: "请选择宽松的闲时档。我们实行精准预约制，以杜绝临时未到（No-Show）造成的公共资源浪费。",
    ja: "空いている枠をお選びください。当院ではスムーズなご案内のため、予約時間を最優先しております。"
  },
  "Pilih Tanggal Booking:": {
    id: "Pilih Tanggal Booking:",
    en: "Select Booking Date:",
    ar: "اختر تاريخ الحجز:",
    zh: "选择预约日期:",
    ja: "受診日の選択："
  },
  "Besok (5 Jun)": { id: "Besok (5 Jun)", en: "Tomorrow (Jun 5)", ar: "غداً (٥ يونيو)", zh: "明天 (6月5日)", ja: "明日 (6月5日)" },
  "Sabtu (6 Jun)": { id: "Sabtu (6 Jun)", en: "Saturday (Jun 6)", ar: "السبت (٦ يونيو)", zh: "周六 (6月6日)", ja: "土曜日 (6月6日)" },
  "Minggu (7 Jun)": { id: "Minggu (7 Jun)", en: "Sunday (Jun 7)", ar: "الأحد (٧ يونيو)", zh: "周日 (6月7日)", ja: "日曜日 (6月7日)" },
  "Senin (8 Jun)": { id: "Senin (8 Jun)", en: "Monday (Jun 8)", ar: "الاثنين (٨ يونيو)", zh: "周一 (6月8日)", ja: "月曜日 (6月8日)" },
  "Selasa (9 Jun)": { id: "Selasa (9 Jun)", en: "Tuesday (Jun 9)", ar: "الثلاثاء (٩ يونيو)", zh: "周二 (6月9日)", ja: "火曜日 (6月9日)" },
  "Rabu (10 Jun)": { id: "Rabu (10 Jun)", en: "Wednesday (Jun 10)", ar: "الأربعاء (١٠ يونيو)", zh: "周三 (6月10日)", ja: "水曜日 (6月10日)" },
  "Slot Jam Tersedia": { id: "Slot Jam Tersedia", en: "Available Time Slots", ar: "الأوقات المتاحة", zh: "可预约时间段", ja: "空き時間枠" },
  "Dokter": { id: "Dokter", en: "Doctor", ar: "طبيب", zh: "医生", ja: "医師" },
  "Jadwal praktik dokter yang dipilih adalah": {
    id: "Jadwal praktik dokter yang dipilih adalah",
    en: "The schedule of the selected doctor is",
    ar: "جدول الطبيب المختار هو",
    zh: "所选医生的出诊时间为",
    ja: "選択した医師の担当日時は"
  },

  "E-Payment QRIS (Otomatis Verifikasi)": {
    id: "E-Payment QRIS (Otomatis Verifikasi)",
    en: "E-Payment QRIS (Instant Verified)",
    ar: "الدفع الإلكتروني QRIS (تحقق تلقائي)",
    zh: "在线扫码支付 QRIS (秒级自动对账)",
    ja: "電子決済 QRIS (自動即時照合)"
  },
  "Instan": { id: "Instan", en: "Instant", ar: "فوري", zh: "即时到账", ja: "即時" },
  "Virtual Account Mandiri": {
    id: "Virtual Account Mandiri",
    en: "Mandiri Virtual Account",
    ar: "حساب افتراضي مانديري",
    zh: "网银转账-曼迪利银行虚拟账户",
    ja: "Mandiri バーチャل口座"
  },
  "Virtual Account BCA": {
    id: "Virtual Account BCA",
    en: "BCA Virtual Account",
    ar: "حساب افتراضي BCA",
    zh: "网银转账-中亚银行BCA虚拟账户",
    ja: "BCA バー玩拟账户"
  },
  "Virtual Account BRI": {
    id: "Virtual Account BRI",
    en: "BRI Virtual Account",
    ar: "حساب افتراضي BRI",
    zh: "网银转账-印尼人民银行BRI虚拟账户",
    ja: "BRI バーチャル口座"
  },
  "Gopay Digital Wallet": {
    id: "Gopay Digital Wallet",
    en: "Gopay Digital Wallet",
    ar: "محفظة جوباي الرقمية",
    zh: "GoPay 电子钱包",
    ja: "Gopay 電子マネー"
  },
  "Diskon 5%": { id: "Diskon 5%", en: "5% Discount", ar: "خصم ٥٪", zh: "5% 优惠扣减", ja: "5% 割引" },
  "DANA Wallet": { id: "DANA Wallet", en: "DANA Wallet", ar: "محفظة دانا", zh: "DANA 电子钱包", ja: "DANA ウォレット" },
  "Bayar Langsung di Klinik (Hari H)": {
    id: "Bayar Langsung di Klinik (Hari H)",
    en: "Pay Directly at Clinic (Day of Visit)",
    ar: "الدفع في العيادة (يوم الزيارة)",
    zh: "到院现场支付 (就诊当天)",
    ja: "クリニック窓口で直接支払（当日払い）"
  },
  "Konfirmasi CS": { id: "Konfirmasi CS", en: "CS Confirm", ar: "تأكيد خدمة العملاء", zh: "客服确认", ja: "CS確認" },

  "Saksikan simulasi video cara kerja sistem digital terintegrasi kami. Beralih antara versi Desktop (CRM Dashboard) & Mobile (Patient Diagnostic Quiz).": {
    id: "Saksikan simulasi video cara kerja sistem digital terintegrasi kami. Beralih antara versi Desktop (CRM Dashboard) & Mobile (Patient Diagnostic Quiz).",
    en: "Watch the video simulation of how our integrated digital system works. Switch between the Desktop (CRM Dashboard) & Mobile (Patient Diagnostic Quiz) versions.",
    ar: "شاهد محاكاة الفيديو لكيفية عمل نظامنا الرقمي المتكامل. بدّل بين نسخة سطح المكتب (لوحة تحكم علاقات العملاء) ونسخة الهاتف (الاختبار التشخيصي للمريض).",
    zh: "观看我们集成数字系统的视频模拟。在桌面版（CRM 仪表盘）和移动版（患者诊断测试）之间切换。",
    ja: "統合デジタルシステムの動作ビデオシミュレーションをご覧ください。デスクトップ版（CRMダッシュボード）とモバイル版（患者診断クイズ）を切り替えることができます。"
  },
  "Desktop CRM View": { id: "Desktop CRM View", en: "Desktop CRM View", ar: "عرض سطح المكتب للمكتب", zh: "桌面版 CRM 视图", ja: "デスクトップCRMビュー" },
  "Mobile Quiz View": { id: "Mobile Quiz View", en: "Mobile Quiz View", ar: "عرض اختبار الهاتف", zh: "移动版测试视图", ja: "モバイルクイズビュー" },
  "Live Walkthrough Captions": { id: "Live Walkthrough Captions", en: "Live Walkthrough Captions", ar: "شروحات العرض المباشر", zh: "实时演练字幕", ja: "ライブウォークスルー字幕" },
  "DEMO PLAYING": { id: "DEMO PLAYING", en: "DEMO PLAYING", ar: "عرض تجريبي يعمل", zh: "演示播放中", ja: "デモ再生中" },
  "Interactive System Tour": { id: "Interactive System Tour", en: "Interactive System Tour", ar: "جولة تفاعلية في النظام", zh: "互动系统导览", ja: "インタラクティブシステムツアー" },
  "Rekomendasi Terpilih": { id: "Rekomendasi Terpilih", en: "Selected Recommendation", ar: "التوصية المحددة", zh: "选定推荐", ja: "選択された推奨事項" },
  "Hubungi Kami Sekarang": { id: "Hubungi Kami Sekarang", en: "Contact Us Now", ar: "اتصل بنا الآن", zh: "立即联系我们", ja: "今すぐお問い合わせ" },
  "Video Walkthrough & ": { id: "Video Walkthrough & ", en: "Video Walkthrough & ", ar: "عرض الفيديو التوضيحي & ", zh: "视频演练与 ", ja: "ビデオウォークスルー＆ " },
  "Demo Sistem": { id: "Demo Sistem", en: "System Demo", ar: "تجربة النظام", zh: "系统演示", ja: "系统デモ" },
  "Pause": { id: "Pause", en: "Pause", ar: "إيقاف مؤقت", zh: "暂停", ja: "一時停止" },

  // luxury-aesthetic keys
  "Apa fokus utama kecantikan Anda hari ini?": {
    id: "Apa fokus utama kecantikan Anda hari ini?",
    en: "What is your main beauty focus today?",
    ar: "ما هو تركيزك الجمالي الرئيسي اليوم؟",
    zh: "您今天的主要美容重点是什么？",
    ja: "今日の美の主なフォーカスは何ですか？"
  },
  "Mengurangi kerutan halus": { id: "Mengurangi kerutan halus", en: "Reducing fine wrinkles", ar: "تقليل التجاعيد الدقيقة", zh: "减少细纹", ja: "小じわの軽減" },
  "Mencerahkan flek hitam": { id: "Mencerahkan flek hitam", en: "Brightening dark spots", ar: "تفتيح البقع الداكنة", zh: "淡化黑斑", ja: "シミの改善" },
  "V-Shape wajah & lifting": { id: "V-Shape wajah & lifting", en: "Facial V-Shape & lifting", ar: "شد وتحديد شكل V للوجه", zh: "面部V型紧致提升", ja: "お顔のVシェイプ＆リフティング" },
  "Kulit kering & dehidrasi": { id: "Kulit kering & dehidrasi", en: "Dry & dehydrated skin", ar: "البشرة الجافة والمصابة بالجفاف", zh: "干燥缺水肌肤", ja: "乾燥・脱水肌" },
  "Premium Botox Glow & SilkPeel Dermalinfusion": {
    id: "Premium Botox Glow & SilkPeel Dermalinfusion",
    en: "Premium Botox Glow & SilkPeel Dermalinfusion",
    ar: "بوتوكس غلو الممتاز وتدفق البشرة سيلك بيل",
    zh: "至臻肉毒焕颜与 SilkPeel 皮肤灌注",
    ja: "プレミアムボトックスグロウ＆SilkPeelダーマインフュージョン"
  },
  "Botox Glow Treatment": { id: "Botox Glow Treatment", en: "Botox Glow Treatment", ar: "علاج البوتوكس المتوهج", zh: "肉毒焕颜护理", ja: "ボトックスグロウトリートメント" },
  "SilkPeel Dermalinfusion": { id: "SilkPeel Dermalinfusion", en: "SilkPeel Dermalinfusion", ar: "تقنية سيلك بيل لتدفق البشرة", zh: "SilkPeel 皮肤灌注", ja: "SilkPeelダーマインフュージョン" },
  "Premium Silhouette Lift": { id: "Premium Silhouette Lift", en: "Premium Silhouette Lift", ar: "شد الخيوط سيلويت الممتاز", zh: "高端 Silhouette 面部悬吊线雕", ja: "プレミアムシルエットリフト" },
  "Kepuasan VVIP": { id: "Kepuasan VVIP", en: "VVIP Satisfaction", ar: "رضا كبار الشخصيات VVIP", zh: "VVIP满意度", ja: "VVIP満足度" },
  "Pendapatan Premium": { id: "Pendapatan Premium", en: "Premium Revenue", ar: "الإيرادات الفاخرة", zh: "高端业务收入", ja: "プレミアム売上" },

  // modern-skincare keys
  "Apa masalah kulit utama yang ingin Anda atasi?": {
    id: "Apa masalah kulit utama yang ingin Anda atasi?",
    en: "What is the primary skin concern you want to address?",
    ar: "ما هي مشكلة البشرة الأساسية التي ترغب في علاجها؟",
    zh: "您最想解决的皮肤首要问题是什么？",
    ja: "解決したい主なお肌の悩みは何ですか？"
  },
  "Jerawat aktif & komedo": { id: "Jerawat aktif & komedo", en: "Active acne & blackheads", ar: "حب الشباب النشط والرؤوس السوداء", zh: "活动性痤疮与黑头", ja: "活動中のニキビと角栓・黒ずみ" },
  "Kulit kusam & bekas jerawat": { id: "Kulit kusam & bekas jerawat", en: "Dull skin & acne scars", ar: "بشرة باهتة وآثار حب الشباب", zh: "暗沉肌肤与痘印痘疤", ja: "お肌のくすみとニキビ跡" },
  "Pori-pori besar & komedo": { id: "Pori-pori besar & komedo", en: "Large pores & blackheads", ar: "المسام الواسعة والرؤوس السوداء", zh: "毛孔粗大与黑头", ja: "毛穴の開きと角栓・黒ずみ" },
  "Minyak berlebih (sebum)": { id: "Minyak berlebih (sebum)", en: "Excess oil (sebum)", ar: "إفرازات دهنية زائدة (الزهم)", zh: "过剩油脂 (皮脂)", ja: "皮脂の過剰分泌" },
  "Acne Clear Facial & Dermal Glow Laser": {
    id: "Acne Clear Facial & Dermal Glow Laser",
    en: "Acne Clear Facial & Dermal Glow Laser",
    ar: "فيشال إزالة حب الشباب وليزر توهج الأدمة",
    zh: "净痘清颜面部护理与真皮焕彩激光",
    ja: "アクネクリアフェイシャル＆ダーマルグロウレーザー"
  },
  "Acne Clear Facial": { id: "Acne Clear Facial", en: "Acne Clear Facial", ar: "فيشال تنظيف حب الشباب", zh: "净痘清颜面部护理", ja: "アクネクリアフェイシャル" },
  "Dermal Glow Laser": { id: "Dermal Glow Laser", en: "Dermal Glow Laser", ar: "ليزر درمال غلو لتوهج البشرة", zh: "真皮焕彩激光", ja: "ダーmalグロウレーザー" },
  "Brightening Serum Infusion": { id: "Brightening Serum Infusion", en: "Brightening Serum Infusion", ar: "تسريب سيروم تفتيح البشرة", zh: "提亮精华导入", ja: "ブライトニング美容液導入" },
  "Skin Health Index": { id: "Skin Health Index", en: "Skin Health Index", ar: "مؤشر صحة البشرة", zh: "皮肤健康指数", ja: "お肌の健康指数" },
  "Anggota Aktif": { id: "Anggota Aktif", en: "Active Members", ar: "الأعضاء النشطون", zh: "活跃会员", ja: "アクティブメンバー" },
  "⚡ Memuat sistem CRM & metrik kesehatan kulit pasien secara real-time...": {
    id: "⚡ Memuat sistem CRM & metrik kesehatan kulit pasien secara real-time...",
    en: "⚡ Loading CRM system & patient skin health metrics in real-time...",
    ar: "⚡ جاري تحميل نظام إدارة علاقات العملاء ومقاييس صحة بشرة المريض في الوقت الفعلي...",
    zh: "⚡ 实时加载 CRM 系统及患者皮肤健康指标...",
    ja: "⚡ CRMシステムと患者のお肌の健康メトリクスをリアルタイムで読み込み中..."
  },
  "📅 Melacak jadwal treatment facial & perawatan laser hari ini...": {
    id: "📅 Melacak jadwal treatment facial & perawatan laser hari ini...",
    en: "📅 Tracking today's facial treatments & laser care schedules...",
    ar: "📅 تتبع علاجات الوجه وجداول العناية بالليزر اليوم...",
    zh: "📅 追踪今日面部护理和激光理疗日程...",
    ja: "📅 本日のフェイシャルトリートメントとレーザーケアのスケジュールを追跡中..."
  },
  "📈 Mengotomatiskan penawaran promo bundling skincare hemat...": {
    id: "📈 Mengotomatiskan penawaran promo bundling skincare hemat...",
    en: "📈 Automating promotional bundling offers for smart skincare savings...",
    ar: "📈 أتمتة عروض حزم العناية بالبشرة الترويجية الموفرة...",
    zh: "📈 自动匹配超值护肤套组优惠活动...",
    ja: "📈 お得なスキンケアのセット割引プロモーションを自動配信中..."
  },
  "🎯 Pasien meluncurkan personalized Skin Analyzer & memilih tipe kulit...": {
    id: "🎯 Pasien meluncurkan personalized Skin Analyzer & memilih tipe kulit...",
    en: "🎯 Patient launches personalized Skin Analyzer & selects skin type...",
    ar: "🎯 يقوم المريض ببدء محلل البشرة المخصص واختيار نوع البشرة...",
    zh: "🎯 患者启动个性化皮肤分析仪并选择皮肤类型...",
    ja: "🎯 患者がパーソナライズされたスキンアナライザーを起動し、肌タイプを選択中..."
  },
  "🔬 Formulasi dermatologi menyarankan kombinasi bahan aktif terbaik...": {
    id: "🔬 Formulasi dermatologi menyarankan kombinasi bahan aktif terbaik...",
    en: "🔬 Dermatological formulation recommends the best active ingredient combination...",
    ar: "🔬 تركيبة الجلدية تقترح أفضل تركيبة من المكونات النشطة...",
    zh: "🔬 皮肤学配方生成并建议最佳活性成分组合...",
    ja: "🔬 皮膚科処方に則って最適な活性成分の組み合わせを提案中..."
  },
  "🎟️ Reservasi treatment & pesan produk rekomendasi langsung lewat aplikasi...": {
    id: "🎟️ Reservasi treatment & pesan produk rekomendasi langsung lewat aplikasi...",
    en: "🎟️ Reserve treatments & order recommended products directly through the app...",
    ar: "🎟️ حجز العلاجات وطلب المنتجات الموصى بها مباشرة عبر التطبيق...",
    zh: "🎟️ 在应用内直接预约疗程及订购推荐护肤品...",
    ja: "🎟️ 施術予約とおすすめ製品の注文をアプリから直接手続き中..."
  },

  // medical-dermatology keys
  "Gejala kulit apa yang sedang Anda alami?": {
    id: "Gejala kulit apa yang sedang Anda alami?",
    en: "What skin symptoms are you currently experiencing?",
    ar: "ما هي أعراض الجلد التي تعاني منها حالياً؟",
    zh: "您目前正在经历哪些皮肤症状？",
    ja: "現在、どのようなお肌の症状がありますか？"
  },
  "Ruam kemerahan & gatal": { id: "Ruam kemerahan & gatal", en: "Red rashes & itching", ar: "طفح جلدي أحمر وحكة", zh: "红疹与发痒", ja: "赤みのある発疹とかゆみ" },
  "Eksim / Kulit sangat kering": { id: "Eksim / Kulit sangat kering", en: "Eczema / Extremely dry skin", ar: "إكزيما / بشرة شديدة الجفاف", zh: "湿疹 / 皮肤极度干燥", ja: "湿疹／お肌のひどい乾燥" },
  "Alergi makanan/kosmetik": { id: "Alergi makanan/kosmetik", en: "Food/Cosmetic allergy", ar: "حساسية الطعام/مستحضرات التجميل", zh: "食物/化妆品过敏", ja: "食物／化粧品アレルギー" },
  "Tahi lalat / Kutil mengganggu": { id: "Tahi lalat / Kutil mengganggu", en: "Bothersome moles / warts", ar: "شامات / ثآليل مزعجة", zh: "困扰性黑痣/疣", ja: "気になるホクロ／イボ" },
  "Allergy Skin Patch Test & Eczema Therapy": {
    id: "Allergy Skin Patch Test & Eczema Therapy",
    en: "Allergy Skin Patch Test & Eczema Therapy",
    ar: "اختبار رقعة الجلد للحساسية وعلاج الإكزيما",
    zh: "过敏原皮肤贴片测试与湿疹综合治疗",
    ja: "アレルギー皮膚パッチテスト＆湿疹セラピー"
  },
  "Allergy Skin Patch Test": { id: "Allergy Skin Patch Test", en: "Allergy Skin Patch Test", ar: "اختبار رقعة الجلد للحساسية", zh: "过敏原皮肤贴片测试", ja: "アレルギー皮膚パッチテスト" },
  "Eczema Therapy Consult": { id: "Eczema Therapy Consult", en: "Eczema Therapy Consult", ar: "استشارة علاج الإكزيما", zh: "湿疹治疗咨询", ja: "湿疹治療カウンセリング" },
  "Psoriasis Laser Care": { id: "Psoriasis Laser Care", en: "Psoriasis Laser Care", ar: "عناية بالليزر لمرض الصدفية", zh: "银屑病激光护理", ja: "乾癬レーザーケア" },
  "Rujukan Klinis": { id: "Rujukan Klinis", en: "Clinical Referrals", ar: "الإحالات السريرية", zh: "临床转诊", ja: "臨床紹介数" },
  "⚡ Menyinkronkan rekam medis pasien & rujukan lab dermatologi...": {
    id: "⚡ Menyinkronkan rekam medis pasien & rujukan lab dermatologi...",
    en: "⚡ Syncing patient medical records & dermatology lab referrals...",
    ar: "⚡ جاري مزامنة السجلات الطبية للمريض وإحالات مختبر الجلدية...",
    zh: "⚡ 同步患者病历与皮肤科实验室转诊...",
    ja: "⚡ 患者のカルテと皮膚科検査紹介を同期中..."
  },
  "📅 Memantau antrean pasien konsultasi dokter spesialis hari ini...": {
    id: "📅 Memantau antrean pasien konsultasi dokter spesialis hari ini...",
    en: "📅 Monitoring today's queuing patient consultations with specialists...",
    ar: "📅 مراقبة طابور استشارات المرضى مع الأطباء الأخصائيين اليوم...",
    zh: "📅 监控今日专家门诊预约排队情况...",
    ja: "📅 本日の専門医診療の待合状況をモニター中..."
  },
  "📈 Mengelola resep obat racikan klinis & riwayat alergi pasien...": {
    id: "📈 Mengelola resep obat racikan klinis & riwayat alergi pasien...",
    en: "📈 Managing compound prescription formulas & patient allergy histories...",
    ar: "📈 إدارة تركيبات الوصفات الطبية وسجلات حساسية المرضى...",
    zh: "📈 掌管临床调配处方与患者过敏史档案...",
    ja: "📈 調剤処方および患者のアレルギー履歴を管理中..."
  },
  "🎯 Pasien menginput gejala iritasi atau alergi kulit secara detail...": {
    id: "🎯 Pasien menginput gejala iritasi atau alergi kulit secara detail...",
    en: "🎯 Patient inputs details of skin irritation or allergic symptoms...",
    ar: "🎯 يقوم المريض بإدخال تفاصيل تهيج الجلد أو أعراض الحساسية...",
    zh: "🎯 患者详细输入皮肤红肿、发炎或过敏症状...",
    ja: "🎯 患者がお肌の炎症やアレルギー症状の詳細を入力中..."
  },
  "🔬 Sistem menyarankan rujukan dokter Sp.KK & menjadwalkan tes patch...": {
    id: "🔬 Sistem menyarankan rujukan dokter Sp.KK & menjadwalkan tes patch...",
    en: "🔬 System suggests board-certified dermatologist referral & schedules patch test...",
    ar: "🔬 يقترح النظام إحالة طبيب جلدية معتمد ويجدول اختبار الرقعة...",
    zh: "🔬 系统建议推荐皮肤病学专家并预约贴片测试...",
    ja: "🔬 システムが皮膚科専門医への紹介を提案し、パッチテストをスケジューリング中..."
  },
  "🎟️ Mendapatkan e-resep aman & booking konsultasi medis terenkripsi...": {
    id: "🎟️ Mendapatkan e-resep aman & booking konsultasi medis terenkripsi...",
    en: "🎟️ Obtaining secure e-prescriptions & booking encrypted medical consultation...",
    ar: "🎟️ الحصول على وصفة إلكترونية آمنة وحجز استشارة طبية مشفرة...",
    zh: "🎟️ 获取安全电子处方及预约加密医学咨询...",
    ja: "🎟️ 安全な電子処方箋の受け取りと暗号化された医療相談を予約中..."
  },

  // dental-clinic keys
  "Layanan gigi apa yang paling Anda butuhkan?": {
    id: "Layanan gigi apa yang paling Anda butuhkan?",
    en: "What dental service do you need most?",
    ar: "ما هي خدمة الأسنان الأكثر أهمية بالنسبة لك؟",
    zh: "您最需要哪项牙科服务？",
    ja: "最も必要とされている歯科施術は何ですか？"
  },
  "Gigi kuning (ingin bleaching)": { id: "Gigi kuning (ingin bleaching)", en: "Yellow teeth (want bleaching)", ar: "أسنان صفراء (ترغب في التبييض)", zh: "牙齿发黄 (希望能美白)", ja: "歯の黄ばみ（ホワイトニング希望）" },
  "Karang gigi & bau mulut": { id: "Karang gigi & bau mulut", en: "Tartar & bad breath", ar: "الجير ورائحة الفم الكريهة", zh: "牙结石与口臭问题", ja: "歯石と口臭" },
  "Gigi berlubang/sakit gigi": { id: "Gigi berlubang/sakit gigi", en: "Cavities / toothache", ar: "تسوس الأسنان / ألم الأسنان", zh: "龋齿/牙痛", ja: "虫歯／歯の痛み" },
  "Gigi tidak rapi (behel/aligner)": { id: "Gigi tidak rapi (behel/aligner)", en: "Crooked teeth (braces/aligners)", ar: "أسنان غير مرتبة (تقويم/مصففات)", zh: "牙齿不齐 (希望矫正/隐形隐形眼镜)", ja: "歯並び（矯正／アライナー希望）" },
  "Porcelain Veneer & Scaling Stain Removal": {
    id: "Porcelain Veneer & Scaling Stain Removal",
    en: "Porcelain Veneer & Scaling Stain Removal",
    ar: "فينير البورسلين وتنظيف الجير لإزالة البقع",
    zh: "全瓷牙贴面与洗牙去渍",
    ja: "ポーセレンベニア＆歯石除去・ステインクリーニング"
  },
  "Dental Scaling & Stain Removal": { id: "Dental Scaling & Stain Removal", en: "Dental Scaling & Stain Removal", ar: "تنظيف جير الأسنان وإزالة البقع", zh: "超声波洁牙与去渍", ja: "歯石・ステイン除去" },
  "Porcelain Veneer Makeover": { id: "Porcelain Veneer Makeover", en: "Porcelain Veneer Makeover", ar: "تجميل الأسنان بفينير البورسلين", zh: "全瓷牙贴面美学重塑", ja: "ポーセレンベニア治療" },
  "Wisdom Tooth Extraction": { id: "Wisdom Tooth Extraction", en: "Wisdom Tooth Extraction", ar: "خلع ضرس العقل", zh: "微创拔智齿", ja: "親知らず抜歯" },
  "Smiles Transformed": { id: "Smiles Transformed", en: "Smiles Transformed", ar: "الابتسامات المحولة", zh: "绽放新微笑", ja: "笑顔の変身数" },
  "Retensi Pasien": { id: "Retensi Pasien", en: "Patient Retention", ar: "الاحتفاظ بالمرضى", zh: "患者留存率", ja: "患者継続率" },
  "⚡ Memuat sistem rekam medis gigi (Odontogram) & grafik pendapatan...": {
    id: "⚡ Memuat sistem rekam medis gigi (Odontogram) & grafik pendapatan...",
    en: "⚡ Loading dental medical records (Odontogram) & revenue charts...",
    ar: "⚡ جاري تحميل السجلات الطبية للأسنان (Odontogram) ومخططات الإيرادات...",
    zh: "⚡ 加载牙科电子病历（牙位图）及营收图表...",
    ja: "⚡ 歯科カルテ（オドントグラム）と売上グラフを読み込み中..."
  },
  "📅 Memantau antrean dental chair & jadwal dokter gigi spesialis...": {
    id: "📅 Memantau antrean dental chair & jadwal dokter gigi spesialis...",
    en: "📅 Monitoring dental chair queues & specialist dentist schedules...",
    ar: "📅 مراقبة طابور كراسي الأسنان وجدول أطباء الأسنان الأخصائيين...",
    zh: "📅 监看综合治疗台使用状态及牙科专家排班...",
    ja: "📅 診察用チェアーの空き状況と歯科専門医スケジュールを監視中..."
  },
  "📈 Mengelola kuota klaim asuransi & paket estetik veneer gigi...": {
    id: "📈 Mengelola kuota klaim asuransi & paket estetik veneer gigi...",
    en: "📈 Managing insurance claim quotas & aesthetic veneer package campaigns...",
    ar: "📈 إدارة حصص مطالبات التأمين وحملات باقات الفينير التجميلي...",
    zh: "📈 管理保险理赔额度及贴面牙齿美学套餐推广...",
    ja: "📈 保険適用の管理や審美ベニア治療パッケージの展開..."
  },
  "🎯 Pasien meluncurkan Smile Assessment & memilih keluhan gigi...": {
    id: "🎯 Pasien meluncurkan Smile Assessment & memilih keluhan gigi...",
    en: "🎯 Patient launches Smile Assessment & selects dental concerns...",
    ar: "🎯 يقوم المريض ببدء تقييم الابتسامة واختيار مشاكل الأسنان...",
    zh: "🎯 患者开启微笑评估并选择牙齿困扰...",
    ja: "🎯 患者がスマイルアセスメントを起動し、歯の悩みを回答中..."
  },
  "🔬 Analisis menyarankan estimasi tindakan scaling atau pemasangan behel...": {
    id: "🔬 Analisis menyarankan estimasi tindakan scaling atau pemasangan behel...",
    en: "🔬 Analysis suggests estimated scaling procedures or braces installation...",
    ar: "🔬 يقترح التحليل الإجراءات المتوقعة لتنظيف الجير أو تركيب التقويم...",
    zh: "🔬 系统分析生成洗牙建议或矫牙初步方案及报价...",
    ja: "🔬 解析に基づきスケーリングや歯列矯正の適否および概算を提案中..."
  },
  "🎟️ Mengamankan jadwal dental care & klaim voucher diskon scaling...": {
    id: "🎟️ Mengamankan jadwal dental care & klaim voucher diskon scaling...",
    en: "🎟️ Securing dental care schedule & claiming scaling discount vouchers...",
    ar: "🎟️ تأمين جدول رعاية الأسنان والمطالبة بقسائم خصم تنظيف الجير...",
    zh: "🎟️ 确认牙科就诊日程并锁单抢领洗牙体验优惠券...",
    ja: "🎟️ デンタルケアの予約確保とスケーリング割引クーポンの引き換え..."
  },

  // family-health keys
  "Keluhan kesehatan apa yang ingin dikonsultasikan?": {
    id: "Keluhan kesehatan apa yang ingin dikonsultasikan?",
    en: "What health complaints do you want to consult about?",
    ar: "ما هي الشكاوى الصحية التي ترغب في استشارتنا بشأنها؟",
    zh: "您有哪些身体不适想要咨询医生？",
    ja: "どのような健康上のご相談がありますか？"
  },
  "Demam & flu berkepanjangan": { id: "Demam & flu berkepanjangan", en: "Prolonged fever & flu", ar: "حمى وإنفلونزا مستمرة", zh: "持续发烧与重感冒", ja: "长引く発熱と風邪症状" },
  "Kontrol tensi & gula darah": { id: "Kontrol tensi & gula darah", en: "Blood pressure & sugar control", ar: "مراقبة ضغط الدم والسكر", zh: "血压及血糖测量控制", ja: "血圧・血糖管理" },
  "Pemeriksaan anak berkala": { id: "Pemeriksaan anak berkala", en: "Regular child check-ups", ar: "فحوصات دورية للأطفال", zh: "定期儿童体检与生长评估", ja: "定期的な小児検診" },
  "Nyeri sendi / Kelelahan kronis": { id: "Nyeri sendi / Kelelahan kronis", en: "Joint pain / chronic fatigue", ar: "آلام المفاصل / التعب المزمن", zh: "关节疼痛 / 慢性疲劳", ja: "関節痛／慢性疲労" },
  "General Health Check-up & Consultation": {
    id: "General Health Check-up & Consultation",
    en: "General Health Check-up & Consultation",
    ar: "فحص صحي عام واستشارة طبية",
    zh: "全科体检与医生咨询",
    ja: "総合健康診断＆医師による診察"
  },
  "General Health Check-up": { id: "General Health Check-up", en: "General Health Check-up", ar: "فحص صحي عام", zh: "全科体检", ja: "総合健康診断" },
  "Pediatric Immunization": { id: "Pediatric Immunization", en: "Pediatric Immunization", ar: "تحصين الأطفال", zh: "小児预防接种", ja: "小児予防接種" },
  "Hypertension Control": { id: "Hypertension Control", en: "Hypertension Control", ar: "التحكم في ارتفاع ضغط الدم", zh: "高血压健康管理", ja: "高血圧コントロール" },
  "Akun Keluarga": { id: "Akun Keluarga", en: "Family Accounts", ar: "حسابات العائلة", zh: "家庭成员绑定数", ja: "ファミリーアカウント数" },
  "Laporan Lab Selesai": { id: "Laporan Lab Selesai", en: "Lab Reports Completed", ar: "تقارير المختبر المكتملة", zh: "已出化验报告", ja: "検査結果完了" },
  "⚡ Mengakses database rekam medis keluarga & hasil laboratorium...": {
    id: "⚡ Mengakses database rekam medis keluarga & hasil laboratorium...",
    en: "⚡ Accessing family medical records database & lab results...",
    ar: "⚡ جاري الوصول إلى قاعدة بيانات السجلات الطبية العائلية ونتائج المختبر...",
    zh: "⚡ 连接家庭健康档案库及化验科检测结果...",
    ja: "⚡ 家族カルテデータベースおよび検査結果にアクセス中..."
  },
  "📅 Memantau jadwal vaksinasi anak & pemeriksaan umum hari ini...": {
    id: "📅 Memantau jadwal vaksinasi anak & pemeriksaan umum hari ini...",
    en: "📅 Monitoring today's child vaccination & general check-up schedules...",
    ar: "📅 مراقبة تطعيمات الأطفال وجداول الفحوصات العامة اليوم...",
    zh: "📅 监看今日接种疫苗日程及普通全科就诊...",
    ja: "📅 本日の小児ワクチン接種および一般検診のスケジュールをモニター中..."
  },
  "📈 Menyinkronkan rekam medis elektronik (RME) aman regulasi Kemenkes...": {
    id: "📈 Menyinkronkan rekam medis elektronik (RME) aman regulasi Kemenkes...",
    en: "📈 Syncing electronic medical records (EMR) securely compliant with health regulations...",
    ar: "📈 مزامنة السجلات الطبية الإلكترونية (EMR) بشكل آمن ومتوافق مع الأنظمة الصحية...",
    zh: "📈 严格遵循医疗合规要求加密同步电子健康档案 (EHR)...",
    ja: "📈 医療規制に完全に準拠した暗号化電子カルテ（EMR）の同期中..."
  },
  "🎯 Keluarga mengisi kuesioner gejala awal & riwayat penyakit kronis...": {
    id: "🎯 Keluarga mengisi kuesioner gejala awal & riwayat penyakit kronis...",
    en: "🎯 Family completes questionnaire for initial symptoms & chronic disease history...",
    ar: "🎯 تقوم العائلة بتعبئة استبيان الأعراض الأولية وسجل الأمراض المزمنة...",
    zh: "🎯 家属线上勾选初始症状及慢性病过往病史...",
    ja: "🎯 家族が初期症状および慢性疾患歴の問診表を入力中..."
  },
  "🔬 Asisten digital mencocokkan gejala dengan kebutuhan vaksinasi...": {
    id: "🔬 Asisten digital mencocokkan gejala dengan kebutuhan vaksinasi...",
    en: "🔬 Digital assistant matches symptoms with vaccination or specialist requirements...",
    ar: "🔬 المساعد الرقمي يطابق الأعراض مع متطلبات التطعيم أو الأخصائيين...",
    zh: "🔬 数字AI医助匹配症状、推荐疫苗或专科专家...",
    ja: "🔬 デジタルアシスタントが症状をワクチンや専門外来の要件にマッチング中..."
  },

  // wellness-antiaging keys
  "Apa tujuan utama program kesehatan Anda?": {
    id: "Apa tujuan utama program kesehatan Anda?",
    en: "What is your primary wellness program goal?",
    ar: "ما هو الهدف الرئيسي لبرنامج العافية الخاص بك؟",
    zh: "您的健康方案的核心目标是什么？",
    ja: "健康・ウェルネスプログラムの主な目的は何ですか？"
  },
  "Meningkatkan energi & stamina": { id: "Meningkatkan energi & stamina", en: "Boosting energy & stamina", ar: "تعزيز الطاقة والتحمل", zh: "提升精力与体力", ja: "活力・スタミナの向上" },
  "Memperlambat penuaan seluler": { id: "Memperlambat penuaan seluler", en: "Slowing down cellular aging", ar: "إبطاء الشيخوخة الخلوية", zh: "延缓细胞级衰老", ja: "細胞老化のケア（エイジングケア）" },
  "Detoksifikasi tubuh menyeluruh": { id: "Detoksifikasi tubuh menyeluruh", en: "Full body detoxification", ar: "إزالة السموم من الجسم بالكامل", zh: "全身深度排毒", ja: "全身のデトックス" },
  "Manajemen stres & tidur nyenyak": { id: "Manajemen stres & tidur nyenyak", en: "Stress management & deep sleep", ar: "إدارة التوتر والنوم العميق", zh: "缓解压力与改善深度睡眠", ja: "ストレス管理＆快眠・良質な睡眠" },
  "NAD+ Anti-Aging Infusion & Ozone Therapy": {
    id: "NAD+ Anti-Aging Infusion & Ozone Therapy",
    en: "NAD+ Anti-Aging Infusion & Ozone Therapy",
    ar: "علاج تسريب NAD+ لمكافحة الشيخوخة والعلاج بالأوزون",
    zh: "NAD+ 抗衰老营养点点滴与臭氧复合疗法",
    ja: "NAD+ エイジングケア点滴＆オゾン療法"
  },
  "NAD+ Anti-Aging Infusion": { id: "NAD+ Anti-Aging Infusion", en: "NAD+ Anti-Aging Infusion", ar: "علاج NAD+ لمكافحة الشيخوخة", zh: "NAD+ 抗衰老营养点滴", ja: "NAD+ エイジングケア点滴" },
  "Hormone Consult": { id: "Hormone Consult", en: "Hormone Consult", ar: "استشارة الهرمونات", zh: "荷尔蒙平衡管理咨询", ja: "ホルモンカウンセリング" },
  "Ozone Therapy Session": { id: "Ozone Therapy Session", en: "Ozone Therapy Session", ar: "جلسة العلاج بالأوزون", zh: "臭氧复合疗法体验", ja: "オゾン療法セッション" },
  "Vitality Index": { id: "Vitality Index", en: "Vitality Index", ar: "مؤشر الحيوية", zh: "活力复元指数", ja: "バイタリティ指数" },
  "Terapi Aktif": { id: "Terapi Aktif", en: "Active Therapies", ar: "العلاجات النشطة", zh: "العلاجات النشطة", ja: "実施中の施術" },
  "⚡ Memantau program wellness holistik & metrik kebugaran pasien...": {
    id: "⚡ Memantau program wellness holistik & metrik kebugaran pasien...",
    en: "⚡ Monitoring holistic wellness programs & patient fitness metrics...",
    ar: "⚡ مراقبة برامج العافية الشاملة ومقاييس لياقة المريض...",
    zh: "⚡ 实时追踪多维健康方案及患者机体活力指标...",
    ja: "⚡ ホリスティックウェルネスプログラムと患者の健康メトリクスをモニター中..."
  },
  "📅 Mengelola slot ruang terapi infus vitamin & terapi ozon hari ini...": {
    id: "📅 Mengelola slot ruang terapi infus vitamin & terapi ozon hari ini...",
    en: "📅 Managing vitamin infusion therapy & ozone therapy room slots today...",
    ar: "📅 إدارة حجز غرف تسريب الفيتامينات والعلاج بالأوزون اليوم...",
    zh: "📅 管理今日维生素输液和臭氧治疗室的资源占用...",
    ja: "📅 本日の高濃度ビタミン点滴・オゾン療法のベッド空き状況を管理中..."
  },
  "📈 Menghubungkan paket keanggotaan anti-aging tahunan secara otomatis...": {
    id: "📈 Menghubungkan paket keanggotaan anti-aging tahunan secara otomatis...",
    en: "📈 Linking annual anti-aging membership packages automatically...",
    ar: "📈 ربط باقات العضوية السنوية لمكافحة الشيخوخة تلقائياً...",
    zh: "📈 自动关联开通年度奢华抗衰贵宾会员卡...",
    ja: "📈 年間エイジングケア会員パッケージの自動連携手続き中..."
  },
  "🎯 Anggota meluncurkan Longevity Assessment untuk cek skor vitalitas...": {
    id: "🎯 Anggota meluncurkan Longevity Assessment untuk cek skor vitalitas...",
    en: "🎯 Member launches Longevity Assessment to check vitality scores...",
    ar: "🎯 يقوم العضو ببدء تقييم طول العمر للتحقق من درجات الحيوية...",
    zh: "🎯 会员线上填写健康长寿指数（Longevity Assessment）以检测细胞活力...",
    ja: "🎯 メンバーが長寿アセスメントを起動し、バイタリティスコアをチェック中..."
  },
  "🔬 Sistem merancang rekomendasi infus anti-aging & nutrisi seluler...": {
    id: "🔬 Sistem merancang rekomendasi infus anti-aging & nutrisi seluler...",
    en: "🔬 System designs anti-aging infusion & cellular nutrition recommendations...",
    ar: "🔬 يصمم النظام توصيات علاجات تسريب مكافحة الشيخوخة والتغذية الخلوية...",
    zh: "🔬 系统定制化设计抗衰点滴配方及细胞营养补给建议...",
    ja: "🔬 解析からエイジングケア点滴および細胞栄養に関する推奨事項を作成中..."
  },
  "🎟️ Memesan terapi pemulihan & konfirmasi jadwal dengan satu ketukan...": {
    id: "🎟️ Memesan terapi pemulihan & konfirmasi jadwal dengan satu ketukan...",
    en: "🎟️ Booking recovery therapies & confirming schedules with one tap...",
    ar: "🎟️ حجز علاجات الاستشفاء وتأكيد الجداول بنقرة واحدة...",
    zh: "🎟️ 一键预约健康复原调理疗程并确认到院时间...",
    ja: "🎟️ リカバリーセラピーの予約とスケジュール確認をワンタップで実行中..."
  },

  // default keys
  "Pilih layanan yang Anda minati:": {
    id: "Pilih layanan yang Anda minati:",
    en: "Select services you are interested in:",
    ar: "اختر الخدمات التي تهمك:",
    zh: "选择您感兴趣的服务：",
    ja: "ご興味のあるメニューをお選びください："
  },
  "Konsultasi Dokter Umum": { id: "Konsultasi Dokter Umum", en: "General Doctor Consultation", ar: "استشارة طبيب عام", zh: "全科医生面诊", ja: "一般内科医師診察" },
  "Perawatan Estetik": { id: "Perawatan Estetik", en: "Aesthetic Treatment", ar: "علاج تجميلي", zh: "美学维养护理", ja: "美容エステ施術" },
  "Pemeriksaan Laboratorium": { id: "Pemeriksaan Laboratorium", en: "Laboratory Checkup", ar: "فحص مخبري", zh: "实验室化验检测", ja: "各種血液・臨床検査" },
  "Paket Keluarga Sehat": { id: "Paket Keluarga Sehat", en: "Healthy Family Package", ar: "باقة الأسرة السعيدة", zh: "家庭健康全套方案", ja: "ご家族健康パッケージ" },
  "Premium Aesthetic Consultation": { id: "Premium Aesthetic Consultation", en: "Premium Aesthetic Consultation", ar: "استشارة تجميلية ممتازة", zh: "高阶皮肤美学面诊", ja: "プレミアム美容カウンセリング" },
  "Pasien Aktif": { id: "Pasien Aktif", en: "Active Patients", ar: "المرضى النشطون", zh: "到院活跃患者", ja: "アクティブ患者数" },
  "Rating Kepuasan": { id: "Rating Kepuasan", en: "Satisfaction Rating", ar: "تقييم الرضا", zh: "就诊满意度评分", ja: "顧客満足度評価" },
  "⚡ Memuat sistem CRM & grafik pendapatan klinik secara real-time...": {
    id: "⚡ Memuat sistem CRM & grafik pendapatan klinik secara real-time...",
    en: "⚡ Loading CRM system & clinic revenue graphs in real-time...",
    ar: "⚡ jari تحميل نظام إدارة علاقات العملاء ورسوم بيانية لإيرادات العيادة في الوقت الفعلي...",
    zh: "⚡ 实时加载 CRM 系统及诊所营收数据图表...",
    ja: "⚡ CRMシステムとクリニックの売上グラフをリアルタイムで読み込み中..."
  },
  "📅 Memantau riwayat janji temu aktif pasien hari ini...": {
    id: "📅 Memantau riwayat janji temu aktif pasien hari ini...",
    en: "📅 Monitoring active patient appointments today...",
    ar: "📅 مراقبة المواعيد النشطة للمرضى اليوم...",
    zh: "📅 监控今日到院活跃患者预约记录...",
    ja: "📅 本日のアクティブな患者の予約履歴を監視中..."
  },
  "📈 Menghubungkan promosi & campaign berkuota otomatis...": {
    id: "📈 Menghubungkan promosi & campaign berkuota otomatis...",
    en: "📈 Linking promotions & automated quota campaigns...",
    ar: "📈 ربط العروض الترويجية والحملات ذات الحصص التلقائية...",
    zh: "📈 智能对接限时限量专属优惠及推广活动...",
    ja: "📈 各種プロモーションや自動割当キャンペーンを連携中..."
  },
  "🎯 Pasien meluncurkan kuesioner keluhan kesehatan & klinis awal...": {
    id: "🎯 Pasien meluncurkan kuesioner keluhan kesehatan & klinis awal...",
    en: "🎯 Patient launches health complaints & initial clinical questionnaire...",
    ar: "🎯 يقوم المريض ببدء استبيان الشكاوى الصحية والتقييم السريري الأولي...",
    zh: "🎯 患者进入就诊自测、自评身体及临床状况...",
    ja: "🎯 患者が健康に関する悩みや初期臨床問診表に入力中..."
  },
  "🔬 Rekomendasi menyarankan tindakan medis & konsultasi dokter...": {
    id: "🔬 Rekomendasi menyarankan tindakan medis & konsultasi dokter...",
    en: "🔬 Recommendations suggest medical treatments & doctor consultations...",
    ar: "🔬 تقترح التوصيات علاجات طبية واستشارات مع الأطباء...",
    zh: "🔬 预诊断引擎自动给出建议医学诊疗及面诊医生...",
    ja: "🔬 推奨に基づき必要な医療処置と医師による診察を提案中..."
  },
  "🎟️ Menyelesaikan reservasi otomatis dengan kode QR terenkripsi...": {
    id: "🎟️ Menyelesaikan reservasi otomatis dengan kode QR terenkripsi...",
    en: "🎟️ Completing automated reservation with encrypted QR code...",
    ar: "🎟️ إكمال الحجز التلقائي مع رمز الاستجابة السريعة QR المشفر...",
    zh: "🎟️ 确认生成加密二维码的预约单...",
    ja: "🎟️ 暗号化QRコードを付した自動予約を完了中..."
  },

};

// Falls back to key itself or translated value
export function tText(text: string, lang: LanguageId): string {
  if (!text) return "";
  const match = DICTIONARY[text];
  if (match && match[lang]) {
    return match[lang];
  }
  return text;
}

export function tArray(arr: string[], lang: LanguageId): string[] {
  if (!arr) return [];
  return arr.map(item => tText(item, lang));
}

// Full Translators for collections
export function translateService(svc: Service, lang: LanguageId): Service {
  return {
    ...svc,
    name: tText(svc.name, lang),
    category: tText(svc.category, lang),
    description: tText(svc.description, lang),
    benefits: tArray(svc.benefits, lang),
    suitable_for: tArray(svc.suitable_for, lang),
    contraindications: tArray(svc.contraindications, lang),
    preparation: tText(svc.preparation, lang),
    aftercare: tText(svc.aftercare, lang),
    cta: tText(svc.cta, lang)
  };
}

export function translateDoctor(doc: Doctor, lang: LanguageId): Doctor {
  return {
    ...doc,
    name: doc.name, // Doctor names stay the same
    specialty: tText(doc.specialty, lang),
    bio: tText(doc.bio, lang),
    services: doc.services.map(s => tText(s, lang)),
    schedule: doc.schedule.map(slot => ({
      day: tText(slot.day, lang),
      time: slot.time
    }))
  };
}

export function translatePromo(promo: Promo, lang: LanguageId): Promo {
  // Let's create proper translations for promo names and descriptions!
  const promoTranslations: Record<string, Record<LanguageId, { name: string, desc: string, cta: string }>> = {
    "Ramadan Glowing Beauty Pack": {
      id: { name: "Ramadan Glowing Beauty Pack", desc: "Dapatkan paket kombo Brightening Glow Facial dan konsultasi dokter gratis dengan kuota terbatas.", cta: "Klaim Promo Ramadan" },
      en: { name: "Ramadan Glowing Beauty Pack", desc: "Get a premium combo of Brightening Glow Facial and free professional skin check with limited quotas.", cta: "Claim Ramadan Offer" },
      ar: { name: "باقة جمال رمضان المتوهجة", desc: "احصل على باقة مجمعة ممتازة من فيشال الإشراق واستشارة طبيب مجانية مع حصص محدودة.", cta: "احصل على العرض الرمضاني" },
      zh: { name: "斋月至臻水光美颜礼包", desc: "尊享亮颜面部护理与免费医生面诊专享组合项目，每日限量预约。", cta: "立即抢购特惠" },
      ja: { name: "ラマダン美肌グロウ特別パック", desc: "ブライトニングフェイシャルと無料の医師診断がセットになった今だけの特別メニュー（数量限定）。", cta: "プロモを適用する" }
    },
    "New Patient Clearance Laser Offer": {
      id: { name: "New Patient Clearance Laser Offer", desc: "Diskon luar biasa 20% untuk sesi Laser Rejuvenation pertama bagi pasien baru terdaftar.", cta: "Gunakan Diskon Laser" },
      en: { name: "New Patient Clearance Laser Offer", desc: "Exceptional 20% discount on your first medical Laser Rejuvenation session for new registered patients.", cta: "Apply Laser Discount" },
      ar: { name: "عرض ليزر ترحيبي للمرضى الجدد", desc: "خصم استثنائي بقيمة ٢٠٪ على أول جلسة تجديد للبشرة بالليزر للمرضى المسجلين حديثًا.", cta: "تطبيق خصم الليزر" },
      zh: { name: "新客专享皮秒激光祛斑礼遇", desc: "首次注册会员预约激光美肤/皮秒嫩肤疗程，即可立享8折（省20%）特惠。", cta: "领用激光优惠券" },
      ja: { name: "新規患者様限定レーザー優待プラン", desc: "新規登録のお客様の初回のレーザーリジュビネーション施術が20%OFFになる特別プラン。", cta: "割引を適用する" }
    },
    "Anti-Aging HIFU Power Lift Combo": {
      id: { name: "Anti-Aging HIFU Power Lift Combo", desc: "Kunci harga spesial untuk face lift HIFU lengkap beserta bonus hidrasi premium pasca-tindakan.", cta: "Ambil Paket HIFU" },
      en: { name: "Anti-Aging HIFU Power Lift Combo", desc: "Lock in an exclusive price for full face lift HIFU including bonus premium post-care hydration.", cta: "Claim HIFU Package" },
      ar: { name: "باقة شد الوجه ومكافحة الشيخوخة بالهايفو", desc: "احصل على سعر حصري لشد الوجه الكامل بالهايفو مع ترطيب مجاني متميز لما بعد العلاج.", cta: "احجز باقة الهايفو" },
      zh: { name: "极线超声刀深度逆龄提拉套餐", desc: "全面部超声提拉（HIFU）享限时特惠，并赠送价值数百元的医学深层补水导入。", cta: "预约超声刀疗程" },
      ja: { name: "エイジングケアHIFUパワーリフトコンボ", desc: "お顔全体のHIFUリフトに、施術後のプレミアム保湿ケアを無料でお付けした特別価格プラン。", cta: "HIFUプランで予約" }
    }
  };

  const trans = promoTranslations[promo.name];
  if (trans && trans[lang]) {
    return {
      ...promo,
      name: trans[lang].name,
      description: trans[lang].desc,
      cta: trans[lang].cta,
      service: tText(promo.service, lang)
    };
  }

  return {
    ...promo,
    name: tText(promo.name, lang),
    description: tText(promo.description, lang),
    cta: tText(promo.cta, lang),
    service: tText(promo.service, lang)
  };
}

export function translateBeforeAfter(bef: BeforeAfterCase, lang: LanguageId): BeforeAfterCase {
  return {
    ...bef,
    case_title: tText(bef.case_title, lang),
    description: tText(bef.description, lang),
    disclaimer: tText(bef.disclaimer, lang),
    doctor: docNameShortener(bef.doctor, lang), // Shortener or localized title helper
    duration: tText(bef.duration, lang)
  };
}

function docNameShortener(name: string, lang: LanguageId): string {
  if (name.includes("Amelia")) {
    return lang === 'id' ? "dr. Amelia Putri, Sp.DV" : "Dr. Amelia Putri, Dermatologist";
  }
  if (name.includes("Farah")) {
    return lang === 'id' ? "dr. Farah Nabila" : "Dr. Farah Nabila, GP";
  }
  return name;
}

export function translateFAQ(faq: FAQ, lang: LanguageId): FAQ {
  // Translate the common FAQs inside public site beautifully
  const faqTranslations: Record<string, Record<LanguageId, { q: string, a: string }>> = {
    "Apakah semua tindakan di Aurora MedBeauty aman dan diawasi oleh dokter?": {
      id: {
        q: "Apakah semua tindakan di Aurora MedBeauty aman dan diawasi oleh dokter?",
        a: "Ya, seluruh tindakan medis estetika, dermatologi, dan dental care di klinik kami dilakukan langsung oleh dokter spesialis dan dokter umum yang terdaftar resmi STR, didampingi perawat tersertifikasi, serta menggunakan alat asli berstandar internasional (FDA Approved)."
      },
      en: {
        q: "Are all treatments at Aurora MedBeauty safe and doctor-supervised?",
        a: "Absolutely. All medical aesthetic, dermatology, and dental treatments in our clinics are performed directly by registered licensed medical doctors (holding official licenses), assisted by certified clinical nurses, utilizing original FDA-approved and Ministry of Health registered equipment."
      },
      ar: {
        q: "هل جميع العلاجات في أورورا آمنة وتحت إشراف الأطباء؟",
        a: "نعم بالتأكيد. جميع العلاجات التجميلية الطبية والجلدية وعلاجات الأسنان في عيادتنا يتم إجراؤها مباشرة من قبل أطباء مرخصين ومسجلين رسمياً، بمساعدة ممرضين مؤهلين، باستخدام أجهزة أصلية معتمدة من هيئة الغذاء والدواء الأمريكية (FDA) ووزارة الصحة."
      },
      zh: {
        q: "Aurora 的所有项目都是安全且有医生监督的吗？",
        a: "是的，绝对安全。我们诊所的所有医疗美容、皮肤科和牙科护理治疗均由持有正式执照的注册专科/全科医师直接操作，由认证临床护士协助，并完全使用通过美国FDA认证及卫健委注册的进口正品仪器设备。"
      },
      ja: {
        q: "Auroraでの治療はすべて安全で、医師の監視のもとで行われますか？",
        a: "はい、もちろんです。当院の美容皮膚科、歯科などのすべての医療行為は、公式ライセンスを保有する経験豊富な登録専門医が直接施術を行い、資格を持つ看護師がサポートします。使用機器もすべてFDA承認の正規品のみを使用しています。"
      }
    },
    "Bagaimana cara melakukan klaim promo setelah mendaftar online?": {
      id: {
        q: "Bagaimana cara melakukan klaim promo setelah mendaftar online?",
        a: "Anda cukup memilih jenis treatment yang sesuai dengan promo aktif pada wizard reservasi online. Diskon harga akan otomatis teraplikasikan pada kwitansi pembayaran Anda saat check-in di klinik."
      },
      en: {
        q: "How do I claim a promotional price after online booking?",
        a: "Simply select the treatment that matches the active promo in the online scheduling wizard. The discounted fee is automatically computed and applied to your invoice sheet upon physical check-in at our reception counter."
      },
      ar: {
        q: "كيف يمكنني الحصول على السعر الترويجي بعد الحجز عبر الإنترنت؟",
        a: "بساطة، اختر العلاج الذي يطابق العرض الترويجي النشط في معالج الجدولة عبر الإنترنت. سيتم احتساب الرسوم المخفضة وتطبيقها تلقائيًا على فاتورة الدفع الخاصة بك عند تسجيل الوصول الفعلي في مكتب استقبال العيادة."
      },
      zh: {
        q: "网上预约后，我该如何享受并核销促销优惠价格？",
        a: "您只需在在线预约引导流程中，选择与当前促销活动相对应的治疗项目。当您到达诊所前台办理签到时，系统将自动核算折后价格，并应用在您的电子付款账单中。"
      },
      ja: {
        q: "オンライン予約後、キャンペーン割引はどのように適用されますか？",
        a: "オンライン予約のステップで、アクティブなキャンペーン対象のメニューを選択するだけで完了します。ご来院時、受付にてチェックインを行う際に自動的に割引料金が適用されたお会計明細が生成されます。"
      }
    },
    "Berapa lama rata-rata hasil tindakan laser atau HIFU mulai terlihat?": {
      id: {
        q: "Berapa lama rata-rata hasil tindakan laser atau HIFU mulai terlihat?",
        a: "Untuk Brightening Glow Facial dan Laser Rejuvenation ringan, efek cerah seketika dapat dirasakan langsung setelah treatment selesai. Untuk Laser Pigmentasi mendalam dan HIFU Face Lifting, perubahan kolagen baru yang optimal akan terus membaik dan terlihat nyata dalam waktu 2 hingga 4 minggu."
      },
      en: {
        q: "How long until I see visual improvements from Laser or HIFU sessions?",
        a: "For Brightening Glow Facials and light Laser Rejuvenation, an immediate radiant glow can be felt right after finishing the treatment. For deeper pigmentation lasers and HIFU skin tightening, optimal collage remodeling typically shows solid results within 2 to 4 weeks."
      },
      ar: {
        q: "ما هي المدة اللازمة لرؤية تحسن مرئي بعد جلسات الليزر أو الهايفو؟",
        a: "بالنسبة لفيشال الإشراق وعلاجات تجديد البشرة بالليزر الخفيفة، يمكنك الشعور بتوهج نضر فوري بعد انتهاء الجلسة مباشرة. أما بالنسبة لليزر التصبغات العميقة وشد البشرة بالهايفو، فإن إعادة بناء الكولاجين المثالية تظهر نتائج صلبة في غضون ٢ إلى ٤ أسابيع."
      },
      zh: {
        q: "做完激光或超声刀（HIFU）项目后，一般需要多久才能看到显著改善？",
        a: "进行亮颜水光面部护理和基础激光嫩肤后，做完即可即刻感受到面部的水润与亮白；而对于针对深层色素沉着的皮秒激光和超声刀面部提拉，由于胶原蛋白新生的生理周期，最佳疗效通常会在2至4周内逐渐显现，并持续好转。"
      },
      ja: {
        q: "レーザーやHIFUの施術後、効果を実感できるまでどのくらいかかりますか？",
        a: "ブライトニングフェイシャルやマイルドなレーザーリジュビネーションの場合、施術直後からトーンアップや潤いをご実感いただけます。ディープなシミ取りレーザーやHIFUによるリフトアップの場合、コラーゲン生成が活性化する2～4週間後に最も明確な効果が現れます。"
      }
    }
  };

  const trans = faqTranslations[faq.question];
  if (trans && trans[lang]) {
    return {
      question: trans[lang].q,
      answer: trans[lang].a
    };
  }

  return {
    question: tText(faq.question, lang),
    answer: tText(faq.answer, lang)
  };
}

export function translateBranch(branch: Branch, lang: LanguageId): Branch {
  // Let's translate city names and office titles
  const branchTranslations: Record<string, Record<LanguageId, { name: string, addr: string, hours: string }>> = {
    "Aurora MedBeauty Jakarta Selatan": {
      id: { name: "Aurora MedBeauty Jakarta Selatan", addr: "Jl. Senopati Raya No. 88, Kebayoran Baru, Jakarta Selatan", hours: "Senin - Sabtu, 09.00 - 20.00" },
      en: { name: "Aurora MedBeauty South Jakarta", addr: "Jl. Senopati Raya No. 88, Kebayoran Baru, South Jakarta", hours: "Monday - Saturday, 09:00 AM - 08:00 PM" },
      ar: { name: "أورورا ميدبيوتي جنوب جاكرتا", addr: "شارع سينوباتي رايا رقم ٨٨، كيبايوران بارو، جنوب جاكرتا", hours: "الإثنين - السبت، ٠٩:٠٠ صباحًا - ٠٨:٠٠ مساءً" },
      zh: { name: "Aurora 医美中心 (雅加达南部总店)", addr: "雅加达南部 Kebayoran Baru, Senopati Raya 路 88 号", hours: "周一 至 周六, 上午 09:00 - 晚上 08:00" },
      ja: { name: "Aurora MedBeauty 南ジャカルタ院", addr: "ジャカルタ南部、ケバヨラン・バル、セノパティ・ラヤ通り88号", hours: "月曜日 - 土曜日, 09:00 AM - 08:00 PM" }
    },
    "Aurora MedBeauty Bandung": {
      id: { name: "Aurora MedBeauty Bandung", addr: "Jl. Riau No. 27, Bandung", hours: "Senin - Minggu, 10.00 - 21.00" },
      en: { name: "Aurora MedBeauty Bandung", addr: "Jl. Riau No. 27, Bandung", hours: "Monday - Sunday, 10:00 AM - 09:00 PM" },
      ar: { name: "أورورا ميدبيوتي باندونغ", addr: "شارع رياو رقم ٢٧، باندونغ", hours: "الإثنين - الأحد، ١٠:٠٠ صباحًا - ٠٩:٠٠ مساءً" },
      zh: { name: "Aurora 医美分部 (万隆中心店)", addr: "万隆市 Riau 路 27 号", hours: "周一 至 周日, 上午 10:00 - 晚上 09:00" },
      ja: { name: "Aurora MedBeauty バンドン院", addr: "バンドン、リアウ通り27号", hours: "月曜日 - 日曜日, 10:00 AM - 09:00 PM" }
    },
    "Aurora MedBeauty Surabaya": {
      id: { name: "Aurora MedBeauty Surabaya", addr: "Jl. Mayjen Sungkono No. 118, Surabaya", hours: "Senin - Sabtu, 09.00 - 19.00" },
      en: { name: "Aurora MedBeauty Surabaya", addr: "Jl. Mayjen Sungkono No. 118, Surabaya", hours: "Monday - Saturday, 09:00 AM - 07:00 PM" },
      ar: { name: "أورورا ميدبيوتي سورابايا", addr: "شارع مايجين سونغكونو رقم ١١٨، سورابايا", hours: "الإثنين - السبت، ٠٩:٠٠ صباحًا - ٠٧:٠٠ مساءً" },
      zh: { name: "Aurora 医美分部 (泗水中心店)", addr: "泗水市 Mayjen Sungkono 路 118 号", hours: "周一 至 周六, 上午 09:00 - 晚上 07:00" },
      ja: { name: "Aurora MedBeauty スラバヤ院", addr: "スラバヤ、マイジェン・スンコノ通り118号", hours: "月曜日 - 土曜日, 09:00 AM - 07:00 PM" }
    }
  };

  const trans = branchTranslations[branch.name];
  if (trans && trans[lang]) {
    return {
      ...branch,
      name: trans[lang].name,
      address: trans[lang].addr,
      opening_hours: trans[lang].hours,
      city: tText(branch.city, lang)
    };
  }

  return {
    ...branch,
    name: tText(branch.name, lang),
    address: tText(branch.address, lang),
    opening_hours: tText(branch.opening_hours, lang),
    city: tText(branch.city, lang)
  };
}
