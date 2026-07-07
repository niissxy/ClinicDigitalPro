/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  ThemeConfig, 
  Branch, 
  ServiceCategory, 
  Service, 
  Doctor, 
  Appointment, 
  Lead, 
  Promo, 
  Membership, 
  BeforeAfterCase, 
  Testimonial, 
  BlogPost, 
  FAQ, 
  AdminUser, 
  PaymentLog,
  NotificationTemplate,
  AuditLog,
  LanguageId
} from '../types';

export const THEME_PRESETS: Record<string, ThemeConfig> = {
  'luxury-aesthetic': {
    id: 'luxury-aesthetic',
    name: 'Luxury Aesthetic',
    tagline: 'Perfection in Beauty & Premium Medical Aesthetic',
    description: 'Menggabungkan keindahan, kemewahan, dan keahlian medis estetik terbaik untuk perawatan wajah dan tubuh yang dipersonalisasi.',
    primaryColor: '#D4AF37', // Gold
    secondaryColor: '#FAF5EF', // Ivory/Champagne
    accentColor: '#E8C5AC', // Soft Blush
    bgColor: '#FAF6F0',
    cardColor: '#FFFFFF',
    textColor: '#1A1816',
    fontSans: 'Inter',
    fontDisplay: 'Space Grotesk',
    logoEmoji: '✨'
  },
  'modern-skincare': {
    id: 'modern-skincare',
    name: 'Modern Skincare',
    tagline: 'Science-Backed Fresh Skincare & Glow Solutions',
    description: 'Solusi kulit sehat, glowing, dan bebas jerawat didukung oleh formulasi dermatologi canggih dan bahan aktif berkualitas tinggi.',
    primaryColor: '#059669', // Mint/Emerald
    secondaryColor: '#ECFDF5', // Soft Green
    accentColor: '#34D399', // Bright Mint
    bgColor: '#F4FAF8',
    cardColor: '#FFFFFF',
    textColor: '#0F172A',
    fontSans: 'Inter',
    fontDisplay: 'Outfit',
    logoEmoji: '🌿'
  },
  'medical-dermatology': {
    id: 'medical-dermatology',
    name: 'Medical Dermatology',
    tagline: 'Doctor-Led Professional Skin & Allergy Clinic',
    description: 'Perawatan medis profesional untuk berbagai kondisi penyakit kulit, alergi, eksim, hingga peremajaan klinis oleh dokter spesialis berpengalaman.',
    primaryColor: '#0284C7', // Medical Blue
    secondaryColor: '#E0F2FE', // Ice Blue
    accentColor: '#0EA5E9', // Sky Blue
    bgColor: '#F5FAFE',
    cardColor: '#FFFFFF',
    textColor: '#0F172A',
    fontSans: 'Inter',
    fontDisplay: 'Outfit',
    logoEmoji: '🥼'
  },
  'dental-clinic': {
    id: 'dental-clinic',
    name: 'Dental Clinic Pro',
    tagline: 'Your Family Smile Esthetics & Dental Health Center',
    description: 'Klinik gigi modern dengan peralatan steril berstandar tinggi untuk perawatan rutin, implant, scaling, hingga estetik smile makeovers.',
    primaryColor: '#2563EB', // Blue
    secondaryColor: '#EFF6FF', // Light Blue
    accentColor: '#60A5FA', // Sky Accent
    bgColor: '#F8FAFC',
    cardColor: '#FFFFFF',
    textColor: '#0F172A',
    fontSans: 'Inter',
    fontDisplay: 'Space Grotesk',
    logoEmoji: '🦷'
  },
  'family-health': {
    id: 'family-health',
    name: 'Family Health Clinic',
    tagline: 'Compassionate, Affordable, and Reliable Family Health',
    description: 'Mitra utama kesehatan keluarga Anda yang menyediakan layanan pencegahan, konsultasi medis umum, serta pemeriksaan laboratorium tepercaya.',
    primaryColor: '#0D9488', // Teal
    secondaryColor: '#F0FDFA', // Soft Teal
    accentColor: '#14B8A6', // Bright Teal
    bgColor: '#FAFAFA',
    cardColor: '#FFFFFF',
    textColor: '#1E293B',
    fontSans: 'Inter',
    fontDisplay: 'Inter',
    logoEmoji: '🏡'
  },
  'wellness-antiaging': {
    id: 'wellness-antiaging',
    name: 'Wellness & Anti-Aging',
    tagline: 'Rejuvenate Your Life, Vitality, and Longevity',
    description: 'Program kesehatan holistik untuk memperlambat penuaan seluler, meningkatkan level kebugaran, dan merevitalisasi kebugaran fisik dan mental Anda.',
    primaryColor: '#15803D', // Forest Emerald
    secondaryColor: '#F0FDF4', // Pale Forest
    accentColor: '#84CC16', // Lime Vitality
    bgColor: '#FAFBF9',
    cardColor: '#FFFFFF',
    textColor: '#1E293B',
    fontSans: 'Inter',
    fontDisplay: 'Outfit',
    logoEmoji: '🌸'
  }
};

export const SEED_CLINIC_BASE = {
  name: "Aurora MedBeauty Clinic",
  tagline: "Beauty, Wellness, and Health in One Trusted Place",
  type: "Klinik Kecantikan & Kesehatan",
  description: "Aurora MedBeauty Clinic adalah klinik modern yang menggabungkan layanan kecantikan, dermatologi, dental care, wellness, dan kesehatan keluarga dengan pendekatan profesional, aman, dan personal.",
  founded_year: 2018,
  license_number: "NIB-912030445566",
  email: "hello@auroramedbeauty.id",
  phone: "+62 21 8899 1122",
  whatsapp: "+62 812 8800 2200",
  website: "https://auroramedbeauty.id",
  instagram: "@auroramedbeauty",
  tiktok: "@auroramedbeauty",
  youtube: "Aurora MedBeauty Clinic"
};

export const SEED_BRANCHES: Branch[] = [
  {
    name: "Aurora MedBeauty Jakarta Selatan",
    city: "Jakarta Selatan",
    address: "Jl. Senopati Raya No. 88, Kebayoran Baru, Jakarta Selatan",
    phone: "+62 21 8899 1122",
    whatsapp: "+62 812 8800 2200",
    opening_hours: "Senin - Sabtu, 09.00 - 20.00",
    maps_url: "https://maps.google.com",
    is_main_branch: true
  },
  {
    name: "Aurora MedBeauty Bandung",
    city: "Bandung",
    address: "Jl. Riau No. 27, Bandung",
    phone: "+62 22 8899 3344",
    whatsapp: "+62 813 8800 3300",
    opening_hours: "Senin - Minggu, 10.00 - 21.00",
    maps_url: "https://maps.google.com",
    is_main_branch: false
  },
  {
    name: "Aurora MedBeauty Surabaya",
    city: "Surabaya",
    address: "Jl. Mayjen Sungkono No. 118, Surabaya",
    phone: "+62 31 8899 5566",
    whatsapp: "+62 814 8800 4400",
    opening_hours: "Senin - Sabtu, 09.00 - 19.00",
    maps_url: "https://maps.google.com",
    is_main_branch: false
  }
];

export const SEED_CATEGORIES: ServiceCategory[] = [
  {
    name: "Aesthetic Treatment",
    slug: "aesthetic-treatment",
    description: "Perawatan kecantikan wajah dan tubuh dengan teknologi modern."
  },
  {
    name: "Dermatology",
    slug: "dermatology",
    description: "Konsultasi dan perawatan masalah kulit oleh dokter profesional."
  },
  {
    name: "Dental Care",
    slug: "dental-care",
    description: "Layanan kesehatan gigi, estetika senyum, dan perawatan mulut."
  },
  {
    name: "Wellness & Anti-Aging",
    slug: "wellness-anti-aging",
    description: "Program kesehatan, kebugaran, dan anti-aging."
  },
  {
    name: "General Health",
    slug: "general-health",
    description: "Layanan kesehatan umum dan konsultasi keluarga."
  },
  {
    name: "Medical Check-Up",
    slug: "medical-check-up",
    description: "Paket pemeriksaan kesehatan dan laboratorium."
  }
];

export const SEED_SERVICES: Service[] = [
  {
    name: "Acne Clear Program",
    category: "Dermatology",
    price_start: 450000,
    promo_price: 350000,
    duration: "60 menit",
    description: "Program perawatan jerawat aktif dengan kombinasi konsultasi dokter, facial medis, dan treatment kulit sesuai kondisi.",
    benefits: ["Membantu meredakan jerawat", "Mengurangi minyak berlebih", "Membersihkan pori", "Membantu memperbaiki tekstur kulit"],
    suitable_for: ["Jerawat aktif", "Komedo", "Kulit berminyak", "Pori tersumbat"],
    contraindications: ["Ibu hamil perlu konsultasi dokter", "Kulit sedang iritasi berat"],
    preparation: "Hindari peeling keras 3 hari sebelum treatment.",
    aftercare: "Gunakan sunscreen, hindari memencet jerawat, dan ikuti arahan dokter.",
    cta: "Booking Acne Consultation"
  },
  {
    name: "Brightening Glow Facial",
    category: "Aesthetic Treatment",
    price_start: 650000,
    promo_price: 499000,
    duration: "75 menit",
    description: "Facial premium untuk membantu kulit tampak lebih cerah, lembap, dan glowing.",
    benefits: ["Mencerahkan kulit", "Melembapkan", "Membantu mengangkat sel kulit mati", "Memberi efek fresh"],
    suitable_for: ["Kulit kusam", "Kulit kering", "Warna kulit tidak merata"],
    contraindications: ["Kulit luka terbuka", "Alergi bahan aktif tertentu"],
    preparation: "Tidak menggunakan scrub wajah sehari sebelum treatment.",
    aftercare: "Gunakan pelembap dan sunscreen secara rutin.",
    cta: "Coba Glow Facial"
  },
  {
    name: "Laser Rejuvenation",
    category: "Aesthetic Treatment",
    price_start: 1500000,
    promo_price: 1200000,
    duration: "45 menit",
    description: "Treatment laser untuk membantu memperbaiki tampilan kulit, noda hitam, dan tekstur wajah.",
    benefits: ["Membantu menyamarkan flek", "Meratakan warna kulit", "Memperbaiki tekstur", "Meningkatkan tampilan kulit sehat"],
    suitable_for: ["Flek hitam", "Kulit kusam", "Bekas jerawat", "Photoaging"],
    contraindications: ["Kulit terbakar matahari", "Infeksi aktif", "Kehamilan perlu konsultasi dokter"],
    preparation: "Hindari paparan matahari berlebih sebelum treatment.",
    aftercare: "Wajib sunscreen, hindari panas berlebih 3-5 hari.",
    cta: "Booking Laser Consultation"
  },
  {
    name: "HIFU Face Lifting",
    category: "Wellness & Anti-Aging",
    price_start: 3500000,
    promo_price: 2990000,
    duration: "90 menit",
    description: "Treatment non-bedah untuk membantu tampilan wajah terlihat lebih kencang.",
    benefits: ["Membantu mengencangkan wajah", "Membentuk kontur", "Non-surgical", "Minim downtime"],
    suitable_for: ["Kulit kendur", "Double chin", "Kontur wajah kurang tegas"],
    contraindications: ["Implan logam area wajah", "Infeksi kulit aktif"],
    preparation: "Konsultasikan kondisi kulit dan riwayat medis sebelum treatment.",
    aftercare: "Hindari pijat wajah berlebihan setelah treatment.",
    cta: "Konsultasi HIFU"
  },
  {
    name: "Dental Scaling",
    category: "Dental Care",
    price_start: 350000,
    promo_price: 275000,
    duration: "45 menit",
    description: "Pembersihan karang gigi untuk menjaga kesehatan gigi dan gusi.",
    benefits: ["Membersihkan karang gigi", "Membantu mengurangi bau mulut", "Menjaga kesehatan gusi"],
    suitable_for: ["Karang gigi", "Bau mulut", "Gusi mudah berdarah"],
    contraindications: ["Infeksi gigi berat perlu pemeriksaan dokter gigi"],
    preparation: "Sikat gigi sebelum kunjungan.",
    aftercare: "Hindari makanan terlalu panas atau dingin setelah scaling jika gigi sensitif.",
    cta: "Booking Scaling"
  },
  {
    name: "Executive Medical Check-Up",
    category: "Medical Check-Up",
    price_start: 2500000,
    promo_price: 1990000,
    duration: "180 menit",
    description: "Paket pemeriksaan kesehatan komprehensif untuk profesional dan keluarga.",
    benefits: ["Pemeriksaan darah", "Konsultasi dokter", "Analisis risiko kesehatan", "Laporan hasil"],
    suitable_for: ["Karyawan", "Eksekutif", "Keluarga", "Pemeriksaan rutin tahunan"],
    contraindications: ["Puasa diperlukan untuk beberapa pemeriksaan"],
    preparation: "Puasa 8-10 jam sebelum pemeriksaan.",
    aftercare: "Konsultasikan hasil dengan dokter.",
    cta: "Booking Medical Check-Up"
  }
];

export const SEED_DOCTORS: Doctor[] = [
  {
    name: "dr. Amelia Putri, Sp.DV",
    specialty: "Dermatology & Aesthetic",
    experience_years: 11,
    languages: ["Indonesia", "English"],
    branch: "Jakarta Selatan",
    bio: "Dokter spesialis dermatologi dengan pengalaman dalam perawatan jerawat, pigmentasi, laser, dan rejuvenation.",
    schedule: [
      { day: "Senin", time: "10.00-16.00" },
      { day: "Rabu", time: "12.00-20.00" },
      { day: "Jumat", time: "10.00-18.00" }
    ],
    services: ["Acne Clear Program", "Laser Rejuvenation", "Brightening Glow Facial"],
    rating: 4.9
  },
  {
    name: "drg. Jonathan Wijaya",
    specialty: "Dental Care",
    experience_years: 8,
    languages: ["Indonesia", "English", "Mandarin"],
    branch: "Bandung",
    bio: "Dokter gigi dengan fokus pada scaling, whitening, veneer consultation, dan smile care.",
    schedule: [
      { day: "Selasa", time: "09.00-15.00" },
      { day: "Kamis", time: "13.00-20.00" },
      { day: "Sabtu", time: "10.00-17.00" }
    ],
    services: ["Dental Scaling"],
    rating: 4.8
  },
  {
    name: "dr. Farah Nabila",
    specialty: "General Health & Wellness",
    experience_years: 7,
    languages: ["Indonesia", "English", "Arabic"],
    branch: "Surabaya",
    bio: "Dokter umum dengan minat pada wellness, preventive care, dan medical check-up.",
    schedule: [
      { day: "Senin", time: "09.00-14.00" },
      { day: "Rabu", time: "09.00-14.00" },
      { day: "Sabtu", time: "09.00-15.00" }
    ],
    services: ["Executive Medical Check-Up"],
    rating: 4.7
  },
  {
    name: "Maya Lestari, A.Md.Kes",
    specialty: "Beauty Therapist",
    experience_years: 6,
    languages: ["Indonesia"],
    branch: "Jakarta Selatan",
    bio: "Beauty therapist berpengalaman dalam facial premium, aftercare, dan customer treatment journey.",
    schedule: [
      { day: "Selasa", time: "10.00-18.00" },
      { day: "Kamis", time: "10.00-18.00" },
      { day: "Minggu", time: "10.00-16.00" }
    ],
    services: ["Brightening Glow Facial"],
    rating: 4.9
  }
];

export const SEED_APPOINTMENTS: Appointment[] = [
  {
    booking_code: "AMB-2026-0001",
    patient_name: "Nadia Rahma",
    whatsapp: "+62 812 3456 7890",
    email: "nadia.rahma@email.com",
    service: "Acne Clear Program",
    doctor: "dr. Amelia Putri, Sp.DV",
    branch: "Jakarta Selatan",
    date: "2026-06-05",
    time: "11.00",
    status: "Confirmed",
    payment_status: "Paid",
    source: "Instagram Ads",
    initial_complaint: "Jerawat aktif di area pipi dan dagu selama 3 bulan.",
    notes: "Pasien tertarik paket acne 3x.",
    payment_fee: 150000
  },
  {
    booking_code: "AMB-2026-0002",
    patient_name: "Rizky Pratama",
    whatsapp: "+62 813 5555 8888",
    email: "rizky.pratama@email.com",
    service: "Dental Scaling",
    doctor: "drg. Jonathan Wijaya",
    branch: "Bandung",
    date: "2026-06-06",
    time: "14.00",
    status: "Pending",
    payment_status: "Pending",
    source: "Google Search",
    initial_complaint: "Karang gigi dan bau mulut.",
    notes: "Perlu reminder payment.",
    payment_fee: 100000
  },
  {
    booking_code: "AMB-2026-0003",
    patient_name: "Clara Santoso",
    whatsapp: "+62 811 2222 3333",
    email: "clara.santoso@email.com",
    service: "HIFU Face Lifting",
    doctor: "dr. Amelia Putri, Sp.DV",
    branch: "Jakarta Selatan",
    date: "2026-06-07",
    time: "15.30",
    status: "Confirmed",
    payment_status: "Paid",
    source: "TikTok Ads",
    initial_complaint: "Ingin treatment untuk wajah terlihat lebih kencang.",
    notes: "High value lead.",
    payment_fee: 500000
  }
];

export const SEED_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Salsa Amira",
    whatsapp: "+62 812 1111 2222",
    email: "salsa.amira@email.com",
    source: "Skin Concern Quiz",
    campaign: "Acne Free June",
    interest: "Acne Clear Program",
    concern: ["Jerawat aktif", "Bekas jerawat", "Kulit berminyak"],
    budget: "Rp500.000 - Rp1.000.000",
    branch_interest: "Jakarta Selatan",
    status: "Hot Lead",
    lead_score: 92,
    assigned_admin: "CS Anisa",
    last_contacted: "2026-06-01",
    next_action: "Follow-up WhatsApp dan tawarkan slot konsultasi",
    notes: "Sudah mengisi quiz, minta info promo acne.",
    age: 23
  },
  {
    id: "lead-2",
    name: "Michael Tan",
    whatsapp: "+62 813 7777 9999",
    email: "michael.tan@email.com",
    source: "Google Ads",
    campaign: "Dental Scaling Promo",
    interest: "Dental Scaling",
    concern: ["Karang gigi", "Bau mulut"],
    budget: "Di bawah Rp500.000",
    branch_interest: "Bandung",
    status: "Warm Lead",
    lead_score: 76,
    assigned_admin: "CS Rina",
    last_contacted: "2026-06-01",
    next_action: "Kirim jadwal dokter gigi",
    notes: "Tanya apakah scaling sakit.",
    age: 31
  },
  {
    id: "lead-3",
    name: "Dewi Kartika",
    whatsapp: "+62 811 4444 5555",
    email: "dewi.kartika@email.com",
    source: "Instagram Ads",
    campaign: "HIFU Premium Lift",
    interest: "HIFU Face Lifting",
    concern: ["Kulit kendur", "Double chin"],
    budget: "Rp2.000.000 - Rp5.000.000",
    branch_interest: "Jakarta Selatan",
    status: "Hot Lead",
    lead_score: 95,
    assigned_admin: "Beauty Consultant Maya",
    last_contacted: "2026-06-02",
    next_action: "Tawarkan konsultasi dokter",
    notes: "Prospek paket premium.",
    age: 41
  }
];

export const SEED_PROMOS: Promo[] = [
  {
    name: "Acne Free June",
    description: "Promo konsultasi dan treatment jerawat untuk kulit lebih sehat.",
    service: "Acne Clear Program",
    normal_price: 450000,
    promo_price: 350000,
    discount_percent: 22,
    start_date: "2026-06-01",
    end_date: "2026-06-30",
    quota: 100,
    branch: ["Jakarta Selatan", "Bandung"],
    status: "Active",
    cta: "Ambil Promo Acne"
  },
  {
    name: "Glow Facial Week",
    description: "Facial premium untuk kulit lebih cerah dan glowing.",
    service: "Brightening Glow Facial",
    normal_price: 650000,
    promo_price: 499000,
    discount_percent: 23,
    start_date: "2026-06-03",
    end_date: "2026-06-15",
    quota: 75,
    branch: ["Jakarta Selatan", "Surabaya"],
    status: "Active",
    cta: "Booking Glow Facial"
  },
  {
    name: "Executive Check-Up Saver",
    description: "Paket medical check-up lengkap untuk profesional dan keluarga.",
    service: "Executive Medical Check-Up",
    normal_price: 2500000,
    promo_price: 1990000,
    discount_percent: 20,
    start_date: "2026-06-01",
    end_date: "2026-07-31",
    quota: 50,
    branch: ["Surabaya"],
    status: "Active",
    cta: "Booking Check-Up"
  }
];

export const SEED_MEMBERSHIPS: Membership[] = [
  {
    name: "Basic Member",
    price: 0,
    duration: "Lifetime",
    benefits: [
      "Akses promo reguler",
      "Riwayat booking",
      "Reminder appointment",
      "Newsletter edukasi"
    ]
  },
  {
    name: "Silver Beauty Plan",
    price: 750000,
    duration: "6 bulan",
    benefits: [
      "Diskon treatment 5%",
      "1x free skin consultation",
      "Birthday voucher Rp100.000",
      "Priority WhatsApp support"
    ]
  },
  {
    name: "Gold Beauty Plan",
    price: 1500000,
    duration: "12 bulan",
    benefits: [
      "Diskon treatment 10%",
      "2x free skin consultation",
      "Birthday voucher Rp250.000",
      "Priority booking",
      "Free facial basic 1x"
    ]
  },
  {
    name: "Platinum Wellness Plan",
    price: 3500000,
    duration: "12 bulan",
    benefits: [
      "Diskon treatment 15%",
      "Priority doctor consultation",
      "Birthday voucher Rp500.000",
      "Free premium facial 2x",
      "Exclusive anti-aging package access",
      "Dedicated beauty consultant"
    ]
  }
];

export const SEED_BEFORE_AFTER: BeforeAfterCase[] = [
  {
    case_title: "Acne Progress 8 Weeks",
    service: "Acne Clear Program",
    doctor: "dr. Amelia Putri, Sp.DV",
    duration: "8 minggu",
    description: "Perkembangan kulit pasien setelah menjalani program perawatan jerawat bertahap secara berkala.",
    consent_status: "Approved",
    disclaimer: "Hasil dapat berbeda pada setiap individu."
  },
  {
    case_title: "Brightening Treatment Result",
    service: "Laser Rejuvenation",
    doctor: "dr. Amelia Putri, Sp.DV",
    duration: "4 minggu",
    description: "Tampilan kulit terlihat lebih cerah dan warna kulit lebih merata setelah treatment laser medis.",
    consent_status: "Approved",
    disclaimer: "Hasil dapat berbeda pada setiap individu."
  },
  {
    case_title: "Facial Contour Improvement",
    service: "HIFU Face Lifting",
    doctor: "dr. Amelia Putri, Sp.DV",
    duration: "12 minggu",
    description: "Perubahan tampilan kontur wajah terlihat lebih tegas dan kulit kencang setelah treatment lifting non-bedah.",
    consent_status: "Approved",
    disclaimer: "Hasil dapat berbeda pada setiap individu."
  }
];

export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    name: "Nadia Rahma",
    service: "Acne Clear Program",
    rating: 5,
    review: "Awalnya ragu karena jerawat saya cukup parah, tapi setelah konsultasi dan treatment bertahap, kulit terasa lebih terkontrol. Admin juga rajin follow-up.",
    source: "Google Review"
  },
  {
    name: "Clara Santoso",
    service: "HIFU Face Lifting",
    rating: 5,
    review: "Kliniknya nyaman, dokternya menjelaskan dengan detail, dan hasil treatment terlihat natural.",
    source: "Website"
  },
  {
    name: "Michael Tan",
    service: "Dental Scaling",
    rating: 4.8,
    review: "Booking mudah, jadwal jelas, dan proses scaling cepat. Reminder WhatsApp sangat membantu.",
    source: "Google Review"
  }
];

export const SEED_BLOGS: BlogPost[] = [
  {
    title: "Cara Memilih Treatment Jerawat yang Tepat",
    category: "Dermatology",
    author: "dr. Amelia Putri, Sp.DV",
    excerpt: "Jerawat memiliki banyak penyebab. Kenali jenis jerawat dan pentingnya konsultasi sebelum memilih treatment.",
    tags: ["jerawat", "skincare", "dermatology"],
    status: "Published",
    date: "2026-05-15"
  },
  {
    title: "Kapan Harus Melakukan Medical Check-Up?",
    category: "General Health",
    author: "dr. Farah Nabila",
    excerpt: "Medical check-up rutin membantu mendeteksi risiko kesehatan sejak dini untuk kebugaran maksimal.",
    tags: ["medical check-up", "preventive care", "kesehatan"],
    status: "Published",
    date: "2026-05-20"
  },
  {
    title: "Manfaat Scaling Gigi untuk Kesehatan Mulut",
    category: "Dental Care",
    author: "drg. Jonathan Wijaya",
    excerpt: "Scaling bukan hanya soal estetika, tetapi juga penting untuk kesehatan gusi dan mencegah bau mulut.",
    tags: ["scaling", "gigi", "dental"],
    status: "Published",
    date: "2026-05-28"
  }
];

export const SEED_FAQS: FAQ[] = [
  {
    question: "Apakah bisa booking tanpa membayar booking fee?",
    answer: "Tergantung kebijakan cabang dan layanan. Beberapa layanan membutuhkan booking fee kecil untuk mengurangi risiko no-show dan mengunci jadwal dokter."
  },
  {
    question: "Apakah hasil treatment sama untuk semua orang?",
    answer: "Tidak. Hasil treatment dapat berbeda tergantung kondisi kulit, usia, gaya hidup, faktor hormonal, dan kepatuhan terhadap instruksi aftercare."
  },
  {
    question: "Apakah konsultasi online bisa menggantikan pemeriksaan dokter?",
    answer: "Tidak. Konsultasi online atau Skin Quiz hanya memberikan informasi awal dan rekomendasi umum. Diagnosis dan tindakan medis tetap memerlukan pemeriksaan langsung di klinik."
  },
  {
    question: "Apakah data dan foto pasien aman?",
    answer: "Ya. Clinic Digital Pro melindungi kebebasan privasi data pasien dengan akses hak peran terbatas, penandatanganan consent medis, dan standar enkripsi web yang aman."
  },
  {
    question: "Apakah bisa reschedule appointment?",
    answer: "Tentu saja. Anda dapat melakukan request perubahan jadwal minimal 24 jam sebelum waktu kunjungan lewat Patient Portal atau membalas chat WhatsApp Customer Service."
  }
];

export const SEED_ADMIN_USERS: AdminUser[] = [
  {
    name: "Super Admin",
    email: "superadmin@auroramedbeauty.id",
    role: "Super Admin",
    access: "All Access"
  },
  {
    name: "Dr. Amelia",
    email: "amelia@auroramedbeauty.id",
    role: "Doctor",
    access: "Own schedule and appointments"
  },
  {
    name: "Anisa Putri",
    email: "anisa@auroramedbeauty.id",
    role: "Customer Service",
    access: "Leads and booking management"
  },
  {
    name: "Rina Marlina",
    email: "rina@auroramedbeauty.id",
    role: "Marketing Admin",
    access: "Campaign, promo, analytics, content"
  },
  {
    name: "Dimas Pradana",
    email: "finance@auroramedbeauty.id",
    role: "Finance Admin",
    access: "Payments, invoices, receipts"
  }
];

export const SEED_PAYMENT_LOGS: PaymentLog[] = [
  {
    invoice_number: "INV-AMB-2026-0001",
    booking_code: "AMB-2026-0001",
    patient_name: "Nadia Rahma",
    amount: 150000,
    payment_method: "QRIS",
    payment_status: "Paid",
    paid_at: "2026-06-01 13:45",
    description: "Booking fee Acne Clear Program"
  },
  {
    invoice_number: "INV-AMB-2026-0002",
    booking_code: "AMB-2026-0002",
    patient_name: "Rizky Pratama",
    amount: 100000,
    payment_method: "Virtual Account BCA",
    payment_status: "Pending",
    paid_at: null,
    description: "Booking fee Dental Scaling"
  },
  {
    invoice_number: "INV-AMB-2026-0003",
    booking_code: "AMB-2026-0003",
    patient_name: "Clara Santoso",
    amount: 500000,
    payment_method: "GoPay",
    payment_status: "Paid",
    paid_at: "2026-06-02 09:10",
    description: "Booking fee HIFU Face Lifting"
  }
];

export const NOTIFICATION_TEMPLATES: NotificationTemplate[] = [
  {
    name: "Booking Confirmation",
    subject: "Konfirmasi Pemesanan Jadwal Praktik",
    content: "Halo {{patient_name}}, booking Anda di {{clinic_name}} sudah dikonfirmasi.\n\nKode Booking: {{booking_code}}\nLayanan: {{service_name}}\nDokter/Terapis: {{doctor_name}}\nCabang: {{branch_name}}\nTanggal: {{appointment_date}}\nJam: {{appointment_time}}\n\nMohon hadir 10 menit lebih awal. Terima kasih."
  },
  {
    name: "Payment Reminder",
    subject: "Menunggu Hubungan Pembayaran Booking Fee",
    content: "Halo {{patient_name}}, booking Anda untuk {{service_name}} masih menunggu pembayaran.\n\nKode Booking: {{booking_code}}\nTotal Booking Fee: Rp {{amount}}\nLink Pembayaran: {{payment_link}}\n\nSilakan lakukan pembayaran sebelum {{expired_time}} agar jadwal tetap tersedia."
  },
  {
    name: "Appointment Reminder",
    subject: "Pengingat Kedatangan Appointment Esok Hari",
    content: "Halo {{patient_name}}, ini pengingat appointment Anda besok di {{clinic_name}}.\n\nLayanan: {{service_name}}\nTanggal: {{appointment_date}}\nJam: {{appointment_time}}\nCabang: {{branch_name}}\n\nSampai jumpa di klinik."
  },
  {
    name: "Follow-Up Lead",
    subject: "Hasil Skin Quiz & Tautan Konsultasi Kulit",
    content: "Halo {{lead_name}}, terima kasih sudah mengisi konsultasi awal Skin Quiz di {{clinic_name}}.\n\nBerdasarkan concern Anda: {{concern}}, tim spesialis kami merekomendasikan {{recommended_service}}.\n\nApakah Anda ingin kami bantu untuk mengunci slot jadwal konsultasi eksklusif dengan dokter?"
  },
  {
    name: "Aftercare Instructions",
    subject: "Panduan Perawatan Setelah Treatment (Aftercare)",
    content: "Halo {{patient_name}}, terima kasih sudah melakukan treatment {{service_name}} di klinik kami.\n\nInstruksi Aftercare:\n{{aftercare_instruction}}\n\nJika ada keluhan atau pertanyaan pasca tindakan, segera hubungi customer care kami di WhatsApp."
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    timestamp: "2026-06-03 10:12:30",
    user: "Super Admin",
    role: "Super Admin",
    action: "System Initialization",
    details: "Clinic Digital Pro successfully initialized with premium seed data sets."
  },
  {
    timestamp: "2026-06-03 11:24:15",
    user: "Anisa Putri",
    role: "Customer Service",
    action: "Lead Status Update",
    details: "Updated Salsa Amira from New Lead to Hot Lead after skin concern review."
  },
  {
    timestamp: "2026-06-03 11:30:55",
    user: "Dimas Pradana",
    role: "Finance Admin",
    action: "Invoice Verification",
    details: "Generated invoice number INV-AMB-2026-0001 for Nadia Rahma."
  }
];

export const LOCALIZATION: Record<LanguageId, Record<string, string>> = {
  id: {
    heroTitle: "Eksperiasi Layanan Medis Estetika Premium & Keluarga Tepercaya",
    heroSub: "Klinik Modern Yang Menggabungkan Teknologi Canggih, Sentuhan Personal, Dan Dokter Profesional Untuk Kebaikan Anda.",
    ctaBook: "Booking Appointment",
    ctaQuiz: "Cek Kondisi Kulit",
    ctaServices: "Lihat Layanan",
    trustLabel: "Pasien Aktif",
    whyChooseUs: "Mengapa Memilih Kami?",
    ourServices: "Katalog Treatment Medis",
    ourDoctors: "Tim Dokter & Terapis",
    activePromos: "Promo & Paket Hemat Aktif",
    membershipTitle: "Program Eksklusif Membership",
    beforeAfterTitle: "Galeri Hasil Sebelum-Sesudah",
    testimonialsTitle: "Suara Kepuasan Pasien Kami",
    addressLabel: "Kantor & Lokasi Cabang",
    faqTitle: "Pertanyaan yang Sering Diajukan",
    footerText: "Aurora MedBeauty Clinic - Solusi Sehat Dan Sempurna Anda.",
    disclaimerLabel: "Disclaimer Medis",
    legalLabel: "Izin Operasional & Legalitas",
    consentCheckboxText: "Saya menyetujui pengumpulan dan penggunaan informasi secara aman untuk penjadwalan medis ini.",
    earlyComplaint: "Tuliskan keluhan atau minat awal Anda di sini...",
    bookSuccess: "Booking Berhasil Terkonfirmasi!",
    bookSuccessSub: "Jadwal Anda telah diamankan. Nomor registrasi dan QR scan akan tertera di portal pasien.",
    patientPortalLabel: "Portal Pasien",
    adminDashboardLabel: "Dashboard Admin",
    skinQuizTitle: "Mulai skin concern quiz interaktif untuk mendapatkan asisten pencocok klinis otomatis.",
    budgetPlaceholder: "Pilih rentang budget Anda",
    doctorCountValue: "12 Dokter",
    doctorCountLabel: "Spesialis & Ahli",
    satisfactionValue: "99.8%",
    satisfactionLabel: "Tingkat Kepuasan",
    announcement: "PROMO TERBATAS BULAN INI: Hubungi Kami Via WhatsApp & Dapatkan Diskon Tindakan Hingga 25%!",
    navLayanan: "Layanan",
    navSolusi: "Solusi",
    navVideo: "Video Demo",
    navTentang: "Tentang Kami",
    navDokter: "Dokter",
    navPromo: "Promo",
    navGaleri: "Galeri",
    navTestimoni: "Testimoni",
    navFaq: "FAQ",
    navLayananKami: "Layanan Kami",
    navSolusiKulit: "Analisis Solusi Kulit",
    navVideoDemoSistem: "Video Demo Sistem",
    navDokterSpesialis: "Dokter Spesialis",
    navPromoSpesial: "Promo Spesial",
    navGaleriBeforeAfter: "Galeri Before After",
    navTestimoniPasien: "Testimoni Pasien",
    navFaqKlinis: "FAQ Klinis",
    navHalaman: "Navigasi Halaman"
  },
  en: {
    heroTitle: "Premium Aesthetic Medical & Family Care Experience",
    heroSub: "A Modern Clinic Combining Advanced Technology, Personal Touch, and Professional Doctors for Your Well-being.",
    ctaBook: "Book Appointment",
    ctaQuiz: "Check Skin Concern",
    ctaServices: "View Services",
    trustLabel: "Active Patients",
    whyChooseUs: "Why Choose Us?",
    ourServices: "Medical Treatment Catalog",
    ourDoctors: "Our Medical Experts & Therapists",
    activePromos: "Active Promos & Packages",
    membershipTitle: "Exclusive Membership Program",
    beforeAfterTitle: "Before-After Progress Gallery",
    testimonialsTitle: "What Our Patients Say",
    addressLabel: "Branches & Locations",
    faqTitle: "Frequently Asked Questions",
    footerText: "Aurora MedBeauty Clinic - Your Health and Perfect Radiance.",
    disclaimerLabel: "Medical Disclaimer",
    legalLabel: "Operational Licenses & Legality",
    consentCheckboxText: "I consent to the secure collection and medical utilization of some info for scheduling.",
    earlyComplaint: "Write down your early complaint or cosmetic skin history here...",
    bookSuccess: "Booking Successfully Confirmed!",
    bookSuccessSub: "Your appointment has been locked. The code and QR check-in are accessible in the patient portal.",
    patientPortalLabel: "Patient Portal",
    adminDashboardLabel: "Admin Dashboard",
    skinQuizTitle: "Start interactive skin concern quiz for auto AI clinic matchmaking recommendation.",
    budgetPlaceholder: "Select your budget range",
    doctorCountValue: "12 Doctors",
    doctorCountLabel: "Specialists & Experts",
    satisfactionValue: "99.8%",
    satisfactionLabel: "Satisfaction Rate",
    announcement: "LIMITED PROMO THIS MONTH: Contact Us on WhatsApp & Get Up to 25% Off Medical Treatments!",
    navLayanan: "Services",
    navSolusi: "Solutions",
    navVideo: "Video Demo",
    navTentang: "About Us",
    navDokter: "Doctors",
    navPromo: "Promotions",
    navGaleri: "Gallery",
    navTestimoni: "Testimonials",
    navFaq: "FAQ",
    navLayananKami: "Our Services",
    navSolusiKulit: "Skin Analysis & Solutions",
    navVideoDemoSistem: "System Video Demo",
    navDokterSpesialis: "Specialist Doctors",
    navPromoSpesial: "Special Offers",
    navGaleriBeforeAfter: "Before After Gallery",
    navTestimoniPasien: "Patient Reviews",
    navFaqKlinis: "Clinical FAQs",
    navHalaman: "Page Navigation"
  },
  ar: {
    heroTitle: "تجربة رعاية طبية تجميلية راقية وعائلية موثوقة",
    heroSub: "عيادة حديثة تجمع بين التكنولوجيا المتقدمة، اللمسة الشخصية، ونخبة من الأطباء المحترفين لأجل رفاهيتك.",
    ctaBook: "احجز موعدا الآن",
    ctaQuiz: "افحص بشرتك",
    ctaServices: "عرض العلاجات",
    trustLabel: "مريض نشط",
    whyChooseUs: "لماذا عيادتنا؟",
    ourServices: "كتالوج العلاجات الطبية",
    ourDoctors: "أطباؤنا ومعالجونا",
    activePromos: "العروض النشطة والباقات",
    membershipTitle: "برنامج العضوية الحصري",
    beforeAfterTitle: "روائع نتائج قبل وبعد",
    testimonialsTitle: "آراء مرضانا الكرام",
    addressLabel: "الفروع والمواقع المعينة",
    faqTitle: "الأسئلة الشائعة والمكررة",
    footerText: "عيادة أورورا الطبية التجميلية - صحتك وتألقك الكامل.",
    disclaimerLabel: "إخلاء المسؤولية الطبي",
    legalLabel: "التراخيص التشغيلية والشرعية",
    consentCheckboxText: "أوافق على المعالجة الآمنة لبياناتي الشخصية لغرض تسجيل الموعد الطبي.",
    earlyComplaint: "اكتب تفاصيل شكواك أو تاريخك التجميلي هنا...",
    bookSuccess: "تم تأكيد الحجز بنجاح تام!",
    bookSuccessSub: "تم حجز موعدك مع الطبيب المختص. يمكنك مراجعة الكود ورمز الاستجابة السريعة في بوابة المريض.",
    patientPortalLabel: "بوابة المريض",
    adminDashboardLabel: "لوحة تحكم المسؤول",
    skinQuizTitle: "ابدأ اختبار البشرة التفاعلي للحصول على برنامج علاجي ذكي مقترح.",
    budgetPlaceholder: "اختر حدود ميزانيتك",
    doctorCountValue: "١٢ طبيبًا",
    doctorCountLabel: "أخصائيون وخبراء",
    satisfactionValue: "٩٩.٨٪",
    satisfactionLabel: "معدل الرضا",
    announcement: "عرض محدود هذا الشهر: تواصل معنا عبر واتساب واحصل على خصم يصل إلى ٢٥٪ على العلاجات الطبية!",
    navLayanan: "الخدمات",
    navSolusi: "الحلول",
    navVideo: "فيديو تجريبي",
    navTentang: "معلومات عنا",
    navDokter: "الأطباء",
    navPromo: "العروض",
    navGaleri: "المعرض",
    navTestimoni: "الشهادات",
    navFaq: "الأسئلة الشائعة",
    navLayananKami: "خدماتنا المتميزة",
    navSolusiKulit: "تحليل البشرة والحلول",
    navVideoDemoSistem: "فيديو النظام التجريبي",
    navDokterSpesialis: "الأطباء الأخصائيون",
    navPromoSpesial: "عروض خاصة",
    navGaleriBeforeAfter: "معرض قبل وبعد",
    navTestimoniPasien: "آراء المرضى",
    navFaqKlinis: "الأسئلة الطبية",
    navHalaman: "التنقل في الصفحة"
  },
  zh: {
    heroTitle: "奢华医美与家庭健康专业诊疗体验",
    heroSub: "融合尖端科技、温情定制化服务及资深专家的现代化诊所，为您实现臻美健康蜕变。",
    ctaBook: "立即预约门诊",
    ctaQuiz: "智能肌肤测评",
    ctaServices: "浏览精选项目",
    trustLabel: "活跃患者信任",
    whyChooseUs: "Aurora 卓越优势",
    ourServices: "医学美容与治疗目录",
    ourDoctors: "医师与资深治疗师团队",
    activePromos: "特惠专区与精选礼包",
    membershipTitle: "至尊会员成长计划",
    beforeAfterTitle: "前后对比真实案例图",
    testimonialsTitle: "患者的真实口碑反馈",
    addressLabel: "分部中心与具体方位",
    faqTitle: "常见热点问题解答",
    footerText: "Aurora MedBeauty 诊所 - 您的终身健康与魅力伴侣。",
    disclaimerLabel: "医疗学术免责声明",
    legalLabel: "工商许可证与经营执照",
    consentCheckboxText: "我同意为本次医疗行程安全地收集和使用信息。",
    earlyComplaint: "请详细填写您的诊前诉求、过敏史或求美目标...",
    bookSuccess: "预约订单已成功提交！",
    bookSuccessSub: "您的黄金疗程时间已被锁定。可在患者端查看电子预约码和快捷QR二维码。",
    patientPortalLabel: "患者端账户",
    adminDashboardLabel: "管理控制台",
    skinQuizTitle: "开启智能肌肤自测系统，一键解锁定制诊疗方案推荐。",
    budgetPlaceholder: "请选择您的预算额度范围",
    doctorCountValue: "12名专家医生",
    doctorCountLabel: "专科与资深专家",
    satisfactionValue: "99.8%",
    satisfactionLabel: "患者满意度",
    announcement: "本月限时优惠：通过 WhatsApp 联系我们，即可享受高达 25% 的医疗护理折扣！",
    navLayanan: "精选项目",
    navSolusi: "解决方案",
    navVideo: "视频演示",
    navTentang: "关于我们",
    navDokter: "资深专家",
    navPromo: "特惠专区",
    navGaleri: "前后对比",
    navTestimoni: "真实口碑",
    navFaq: "热点问答",
    navLayananKami: "我们的特色服务",
    navSolusiKulit: "肌肤分析与对策",
    navVideoDemoSistem: "数字化系统演示",
    navDokterSpesialis: "各科专家医师",
    navPromoSpesial: "限时特别优惠",
    navGaleriBeforeAfter: "诊疗对比图库",
    navTestimoniPasien: "患者心声反馈",
    navFaqKlinis: "医疗临床答疑",
    navHalaman: "页面快速导航"
  },
  ja: {
    heroTitle: "感動を届けるラグジュアリー医美＆家族の安心クリニック",
    heroSub: "最先端の医療機器、洗練されたおもてなし、そして経験豊富な専門医による調和のとれた最適治療をここに。",
    ctaBook: "今すぐオンライン受診予約",
    ctaQuiz: "美肌チェック診断",
    ctaServices: "施術一覧をみる",
    trustLabel: "アクティブ患者数",
    whyChooseUs: "Aurora が選ばれる理由",
    ourServices: "メディカル＆ビューティ治疗メニュー",
    ourDoctors: "ドクターおよびスペシャリスト紹介",
    activePromos: "今月のキャンペーン・特別割引",
    membershipTitle: "プレミアム会員ステータス制度",
    beforeAfterTitle: "ビフォー・アフター軌跡ギャラリー",
    testimonialsTitle: "患者様からの心温まるメッセージ",
    addressLabel: "各店舗の地図と営業案内",
    faqTitle: "よくあるご質問（FAQ）",
    footerText: "Aurora MedBeauty クリニック - 美と健康のトータルアンサー。",
    disclaimerLabel: "医学的免責事項・各種承諾",
    legalLabel: "営業許可番号および法令遵守",
    consentCheckboxText: "医療上のスケジュール調整のため、安全な個人情報の取扱い内容に同意します。",
    earlyComplaint: "気になる箇所の状態、アレルギー、ご要望をご記入ください...",
    bookSuccess: "ご予約が完全に確定しました！",
    bookSuccessSub: "お客様専用の時間枠をキープしました。マイページより受付用QRコードと詳細を確認できます。",
    patientPortalLabel: "患者マイページ",
    adminDashboardLabel: "管理者ポータル",
    skinQuizTitle: "肌タイプや悩みのクイズからはじめて、おすすめ治療コースを自動マッチング。",
    budgetPlaceholder: "ご予算の上限をお選びください",
    doctorCountValue: "12名の専門医",
    doctorCountLabel: "スペシャリスト＆ドクター",
    satisfactionValue: "99.8%",
    satisfactionLabel: "患者様満足度",
    announcement: "今月の期間限定プロモ：WhatsAppでお問い合わせいただくと、施術代が最大25%OFF！",
    navLayanan: "施術メニュー",
    navSolusi: "お悩み解決",
    navVideo: "システムデモ",
    navTentang: "クリニック紹介",
    navDokter: "専門医紹介",
    navPromo: "キャンペーン",
    navGaleri: "症例写真",
    navTestimoni: "患者様の声",
    navFaq: "よくある質問",
    navLayananKami: "当院の提供服务",
    navSolusiKulit: "肌分析＆医療ソリューション",
    navVideoDemoSistem: "統合システムデモ",
    navDokterSpesialis: "所属スペシャリスト",
    navPromoSpesial: "特別優待割引",
    navGaleriBeforeAfter: "ビフォーアフター実績",
    navTestimoniPasien: "体験者の口コミ評価",
    navFaqKlinis: "よくある臨床的質問",
    navHalaman: "サイトナビゲーション"
  }
};

const DUMMY_DUPLICATE_DATA: any = {
  zh: {
    patientPortalLabel: "患者端账户",
    adminDashboardLabel: "管理控制台",
    skinQuizTitle: "开启智能肌肤自测系统，一键解锁定制诊疗方案推荐。",
    budgetPlaceholder: "请选择您的预算额度范围",
  },
  ja: {
    heroTitle: "感動を届けるラグジュアリー医美＆家族の安心クリニック",
    heroSub: "最先端の医療機器、洗練されたおもてなし、そして経験豊富な専門医による調和のとれた最適治療をここに。",
    ctaBook: "今すぐオンライン受診予約",
    ctaQuiz: "美肌チェック診断",
    ctaServices: "施術一覧をみる",
    trustLabel: "アクティブ患者数",
    whyChooseUs: "Aurora が選ばれる理由",
    ourServices: "メディカル＆ビューティ治療メニュー",
    ourDoctors: "ドクターおよびスペシャリスト紹介",
    activePromos: "今月のキャンペーン・特別割引",
    membershipTitle: "プレミアム会員ステータス制度",
    beforeAfterTitle: "ビフォー・アフター軌跡ギャラリー",
    testimonialsTitle: "患者様からの心温まるメッセージ",
    addressLabel: "各店舗の地図と営業案内",
    faqTitle: "よくあるご質問（FAQ）",
    footerText: "Aurora MedBeauty クリニック - 美と健康のトータルアンサー。",
    disclaimerLabel: "医学的免責事項・各種承諾",
    legalLabel: "営業許可番号および法令遵守",
    consentCheckboxText: "医療上のスケジュール調整のため、安全な個人情報の取扱い内容に同意します。",
    earlyComplaint: "気になる箇所の状態、アレルギー、ご要望をご記入ください...",
    bookSuccess: "ご予約が完全に確定しました！",
    bookSuccessSub: "お客様専用の時間枠をキープしました。マイページより受付用QRコードと詳細を確認できます。",
    patientPortalLabel: "患者マイページ",
    adminDashboardLabel: "管理者ポータル",
    skinQuizTitle: "肌タイプや悩みのクイズからはじめて、おすすめ治療コースを自動マッチング。",
    budgetPlaceholder: "ご予算の上限をお選びください",
  }
};
