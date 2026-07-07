/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, ChevronRight, HelpCircle, MapPin, 
  Clock, ShieldAlert, Award, Star, PhoneCall, BookOpen, Layers, Users, Zap,
  Frown, Smile, ShieldCheck, Play, Pause, Monitor, Smartphone, Volume2, Video,
  PenTool, ClipboardList, Globe, Calendar, Sun, Moon, Menu, X
} from 'lucide-react';
import { ClinicThemeId, LanguageId, Service, Doctor, Promo, BeforeAfterCase,FAQ } from '../types';
import { 
  LOCALIZATION, SEED_BRANCHES, SEED_SERVICES, SEED_DOCTORS, SEED_PROMOS, SEED_BEFORE_AFTER, SEED_TESTIMONIALS, SEED_BLOGS, SEED_FAQS, SEED_CLINIC_BASE 
} from '../data/seedData';
import { 
  translateService, translateDoctor, translatePromo, translateBeforeAfter, translateFAQ, translateBranch, tText 
} from '../utils/translate';
import { THEME_PRESETS } from '../data/seedData';
import { ClinicDigitalProLogo } from './Logo';

const clinicDesktopDashboard = "/clinic_desktop_dashboard_new.jpg";
const clinicMobileQuiz = "/clinic_mobile_quiz_new.jpg";

interface PublicWebsiteProps {
  themeId: ClinicThemeId;
  language: LanguageId;
  onSetLanguage: (lang: LanguageId) => void;
  onNavigateTab: (tab: string, serviceName?: string) => void;
  services: Service[];
  doctors: Doctor[];
  promos: Promo[];
  beforeAfters: BeforeAfterCase[];
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export default function PublicWebsite({ 
  themeId, 
  language, 
  onSetLanguage, 
  onNavigateTab,
  services,
  doctors,
  promos,
  beforeAfters,
  isDarkMode = false,
  onToggleDarkMode
}: PublicWebsiteProps) {
  const theme = THEME_PRESETS[themeId];
  const t = LOCALIZATION[language] || LOCALIZATION.id;

  const localizedServices = React.useMemo(() => services.map(s => translateService(s, language)), [services, language]);
  const localizedDoctors = React.useMemo(() => doctors.map(d => translateDoctor(d, language)), [doctors, language]);
  const localizedPromos = React.useMemo(() => promos.map(p => translatePromo(p, language)), [promos, language]);
  const localizedBeforeAfters = React.useMemo(() => beforeAfters.map(b => translateBeforeAfter(b, language)), [beforeAfters, language]);
  const localizedBranches = React.useMemo(() => SEED_BRANCHES.map(b => translateBranch(b, language)), [language]);
  const localizedFaqs = React.useMemo(() => SEED_FAQS.map(f => translateFAQ(f, language)), [language]);

  // Local view selection for detail modal
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);
  const [selectedDoctorDetail, setSelectedDoctorDetail] = useState<Doctor | null>(null);
  const [faqOpenState, setFaqOpenState] = useState<Record<number, boolean>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Local Video Demo state
  const [demoMode, setDemoMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [demoProgress, setDemoProgress] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  React.useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setDemoProgress((prev) => {
          if (prev >= 100) {
            return 0; // Loop walkthrough
          }
          return Math.min(100, prev + (1.2 * playbackSpeed));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const demoData = React.useMemo(() => {
    switch (themeId) {
      case 'luxury-aesthetic':
        return {
          systemName: 'Aesthetic CRM',
          quizTitle: tText("Skin & Beauty Diagnostic Quiz", language),
          quizQuestion: tText("Apa fokus utama kecantikan Anda hari ini?", language),
          quizOptions: [
            tText("Mengurangi kerutan halus", language),
            tText("Mencerahkan flek hitam", language),
            tText("V-Shape wajah & lifting", language),
            tText("Kulit kering & dehidrasi", language)
          ],
          recommendation: tText("Premium Botox Glow & SilkPeel Dermalinfusion", language),
          treatments: [
            tText("Botox Glow Treatment", language),
            tText("SilkPeel Dermalinfusion", language),
            tText("Premium Silhouette Lift", language)
          ],
          metrics: [
            tText("Kepuasan VVIP", language),
            tText("Pendapatan Premium", language)
          ],
          desktopCaptions: [
            tText("⚡ Memuat sistem CRM & grafik pendapatan klinik kecantikan secara real-time...", language),
            tText("📅 Memantau riwayat janji temu aktif pasien hari ini & status pembayaran...", language),
            tText("📈 Menghubungkan promosi & campaign berkuota otomatis secara instan...", language)
          ],
          mobileCaptions: [
            tText("🎯 Pasien meluncurkan diagnostic Skin Quiz & menginput concern kulit wajah...", language),
            tText("🔬 Rekomendasi medis cerdas menyarankan tindakan & skincare berstandar FDA...", language),
            tText("🎟️ Menyelesaikan reservasi otomatis dengan kode QR terenkripsi yang siap di-scan...", language)
          ]
        };
      case 'modern-skincare':
        return {
          systemName: 'Glow CRM',
          quizTitle: tText("Personalized Skin Glow Analyzer", language),
          quizQuestion: tText("Apa masalah kulit utama yang ingin Anda atasi?", language),
          quizOptions: [
            tText("Jerawat aktif & komedo", language),
            tText("Kulit kusam & bekas jerawat", language),
            tText("Pori-pori besar & komedo", language),
            tText("Minyak berlebih (sebum)", language)
          ],
          recommendation: tText("Acne Clear Facial & Dermal Glow Laser", language),
          treatments: [
            tText("Acne Clear Facial", language),
            tText("Dermal Glow Laser", language),
            tText("Brightening Serum Infusion", language)
          ],
          metrics: [
            tText("Skin Health Index", language),
            tText("Anggota Aktif", language)
          ],
          desktopCaptions: [
            tText("⚡ Memuat sistem CRM & metrik kesehatan kulit pasien secara real-time...", language),
            tText("📅 Melacak jadwal treatment facial & perawatan laser hari ini...", language),
            tText("📈 Mengotomatiskan penawaran promo bundling skincare hemat...", language)
          ],
          mobileCaptions: [
            tText("🎯 Pasien meluncurkan personalized Skin Analyzer & memilih tipe kulit...", language),
            tText("🔬 Formulasi dermatologi menyarankan kombinasi bahan aktif terbaik...", language),
            tText("🎟️ Reservasi treatment & pesan produk rekomendasi langsung lewat aplikasi...", language)
          ]
        };
      case 'medical-dermatology':
        return {
          systemName: 'Derm CRM',
          quizTitle: tText("Doctor-Led Dermatology Check", language),
          quizQuestion: tText("Gejala kulit apa yang sedang Anda alami?", language),
          quizOptions: [
            tText("Ruam kemerahan & gatal", language),
            tText("Eksim / Kulit sangat kering", language),
            tText("Alergi makanan/kosmetik", language),
            tText("Tahi lalat / Kutil mengganggu", language)
          ],
          recommendation: tText("Allergy Skin Patch Test & Eczema Therapy", language),
          treatments: [
            tText("Allergy Skin Patch Test", language),
            tText("Eczema Therapy Consult", language),
            tText("Psoriasis Laser Care", language)
          ],
          metrics: [
            tText("Medically Cleared", language),
            tText("Rujukan Klinis", language)
          ],
          desktopCaptions: [
            tText("⚡ Menyinkronkan rekam medis pasien & rujukan lab dermatologi...", language),
            tText("📅 Memantau antrean pasien konsultasi dokter spesialis hari ini...", language),
            tText("📈 Mengelola resep obat racikan klinis & riwayat alergi pasien...", language)
          ],
          mobileCaptions: [
            tText("🎯 Pasien menginput gejala iritasi atau alergi kulit secara detail...", language),
            tText("🔬 Sistem menyarankan rujukan dokter Sp.KK & menjadwalkan tes patch...", language),
            tText("🎟️ Mendapatkan e-resep aman & booking konsultasi medis terenkripsi...", language)
          ]
        };
      case 'dental-clinic':
        return {
          systemName: 'Dental CRM',
          quizTitle: tText("Smile Makeover & Dental Self-Test", language),
          quizQuestion: tText("Layanan gigi apa yang paling Anda butuhkan?", language),
          quizOptions: [
            tText("Gigi kuning (ingin bleaching)", language),
            tText("Karang gigi & bau mulut", language),
            tText("Gigi berlubang/sakit gigi", language),
            tText("Gigi tidak rapi (behel/aligner)", language)
          ],
          recommendation: tText("Porcelain Veneer & Scaling Stain Removal", language),
          treatments: [
            tText("Dental Scaling & Stain Removal", language),
            tText("Porcelain Veneer Makeover", language),
            tText("Wisdom Tooth Extraction", language)
          ],
          metrics: [
            tText("Smiles Transformed", language),
            tText("Retensi Pasien", language)
          ],
          desktopCaptions: [
            tText("⚡ Memuat sistem rekam medis gigi (Odontogram) & grafik pendapatan...", language),
            tText("📅 Memantau antrean dental chair & jadwal dokter gigi spesialis...", language),
            tText("📈 Mengelola kuota klaim asuransi & paket estetik veneer gigi...", language)
          ],
          mobileCaptions: [
            tText("🎯 Pasien meluncurkan Smile Assessment & memilih keluhan gigi...", language),
            tText("🔬 Analisis menyarankan estimasi tindakan scaling atau pemasangan behel...", language),
            tText("🎟️ Mengamankan jadwal dental care & klaim voucher diskon scaling...", language)
          ]
        };
      case 'family-health':
        return {
          systemName: 'Health CRM',
          quizTitle: tText("Family Health Symptom Checker", language),
          quizQuestion: tText("Keluhan kesehatan apa yang ingin dikonsultasikan?", language),
          quizOptions: [
            tText("Demam & flu berkepanjangan", language),
            tText("Kontrol tensi & gula darah", language),
            tText("Pemeriksaan anak berkala", language),
            tText("Nyeri sendi / Kelelahan kronis", language)
          ],
          recommendation: tText("General Health Check-up & Consultation", language),
          treatments: [
            tText("General Health Check-up", language),
            tText("Pediatric Immunization", language),
            tText("Hypertension Control", language)
          ],
          metrics: [
            tText("Akun Keluarga", language),
            tText("Laporan Lab Selesai", language)
          ],
          desktopCaptions: [
            tText("⚡ Mengakses database rekam medis keluarga & hasil laboratorium...", language),
            tText("📅 Memantau jadwal vaksinasi anak & pemeriksaan umum hari ini...", language),
            tText("📈 Menyinkronkan rekam medis elektronik (RME) aman regulasi Kemenkes...", language)
          ],
          mobileCaptions: [
            tText("🎯 Keluarga mengisi kuesioner gejala awal & riwayat penyakit kronis...", language),
            tText("🔬 Asisten digital mencocokkan gejala dengan kebutuhan vaksinasi...", language),
            tText("🎟️ Mendapatkan e-resep aman & booking konsultasi medis terenkripsi...", language)
          ]
        };
      case 'wellness-antiaging':
        return {
          systemName: 'Wellness CRM',
          quizTitle: tText("Wellness & Longevity Assessment", language),
          quizQuestion: tText("Apa tujuan utama program kesehatan Anda?", language),
          quizOptions: [
            tText("Meningkatkan energi & stamina", language),
            tText("Memperlambat penuaan seluler", language),
            tText("Detoksifikasi tubuh menyeluruh", language),
            tText("Manajemen stres & tidur nyenyak", language)
          ],
          recommendation: tText("NAD+ Anti-Aging Infusion & Ozone Therapy", language),
          treatments: [
            tText("NAD+ Anti-Aging Infusion", language),
            tText("Hormone Consult", language),
            tText("Ozone Therapy Session", language)
          ],
          metrics: [
            tText("Vitality Index", language),
            tText("Terapi Aktif", language)
          ],
          desktopCaptions: [
            tText("⚡ Memantau program wellness holistik & metrik kebugaran pasien...", language),
            tText("📅 Mengelola slot ruang terapi infus vitamin & terapi ozon hari ini...", language),
            tText("📈 Menghubungkan paket keanggotaan anti-aging tahunan secara otomatis...", language)
          ],
          mobileCaptions: [
            tText("🎯 Anggota meluncurkan Longevity Assessment untuk cek skor vitalitas...", language),
            tText("🔬 Sistem merancang rekomendasi infus anti-aging & nutrisi seluler...", language),
            tText("🎟️ Memesan terapi pemulihan & konfirmasi jadwal dengan satu ketukan...", language)
          ]
        };
      default:
        return {
          systemName: 'Clinic CRM',
          quizTitle: tText("Interactive Clinic Consultation", language),
          quizQuestion: tText("Pilih layanan yang Anda minati:", language),
          quizOptions: [
            tText("Konsultasi Dokter Umum", language),
            tText("Perawatan Estetik", language),
            tText("Pemeriksaan Laboratorium", language),
            tText("Paket Keluarga Sehat", language)
          ],
          recommendation: tText("Premium Aesthetic Consultation", language),
          treatments: [
            tText("Standard Consultation", language),
            tText("Clinical Checkup", language),
            tText("Specialist Care", language)
          ],
          metrics: [
            tText("Pasien Aktif", language),
            tText("Rating Kepuasan", language)
          ],
          desktopCaptions: [
            tText("⚡ Memuat sistem CRM & grafik pendapatan klinik secara real-time...", language),
            tText("📅 Memantau riwayat janji temu aktif pasien hari ini...", language),
            tText("📈 Menghubungkan promosi & campaign berkuota otomatis...", language)
          ],
          mobileCaptions: [
            tText("🎯 Pasien meluncurkan kuesioner keluhan kesehatan & klinis awal...", language),
            tText("🔬 Rekomendasi menyarankan tindakan medis & konsultasi dokter...", language),
            tText("🎟️ Menyelesaikan reservasi otomatis dengan kode QR terenkripsi...", language)
          ]
        };
    }
  }, [themeId, language]);

  const getDemoCaption = () => {
    const caps = demoMode === 'desktop' ? demoData.desktopCaptions : demoData.mobileCaptions;
    if (demoProgress < 33) return caps[0];
    if (demoProgress < 66) return caps[1];
    return caps[2];
  };

  const toggleFaq = (idx: number) => {
    setFaqOpenState(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // accounts for top announcement + sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans antialiased text-gray-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-2 select-none">
        <Sparkles className="h-3.5 w-3.5 text-yellow-400 animate-spin-slow shrink-0" />
        <span>{t.announcement || "PROMO TERBATAS BULAN INI: Hubungi Kami Via WhatsApp & Dapatkan Diskon Tindakan Hingga 25%!"}</span>
        <span className="hidden sm:inline px-2 py-0.5 rounded bg-yellow-400 text-slate-900 text-[9px] font-extrabold uppercase">HOT PROMO</span>
      </div>

      {/* 2. NAVBAR WITH LANGUAGE SWITCHER & CUSTOM LOGO */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm px-4 sm:px-6 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <div 
            className="cursor-pointer hover:scale-[1.01] active:scale-95 transition-transform" 
            onClick={() => onNavigateTab('home')}
          >
            <ClinicDigitalProLogo variant={isDarkMode ? 'light' : 'dark'} />
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-[12px] font-semibold text-slate-600 dark:text-slate-400">
            {[
              { id: 'services', label: t.navLayanan || 'Layanan' },
              { id: 'problems-solutions', label: t.navSolusi || 'Solusi' },
              { id: 'video-demo', label: t.navVideo || 'Video Demo' },
              { id: 'about', label: t.navTentang || 'Tentang Kami' },
              { id: 'doctors', label: t.navDokter || 'Dokter' },
              { id: 'promos', label: t.navPromo || 'Promo' },
              { id: 'beforeafter', label: t.navGaleri || 'Galeri' },
              { id: 'testimonials', label: t.navTestimoni || 'Testimoni' },
              { id: 'faqs', label: t.navFaq || 'FAQ' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollToSection(e, link.id)}
                onMouseEnter={() => setHoveredNav(link.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative py-1 transition-colors duration-200 hover:text-slate-900 dark:hover:text-slate-100"
                style={{ color: hoveredNav === link.id ? theme.primaryColor : undefined }}
              >
                <span>{link.label}</span>
                <span 
                  className="absolute bottom-0 left-0 h-[2px] transition-all duration-300 rounded-full"
                  style={{ 
                    width: hoveredNav === link.id ? '100%' : '0%',
                    backgroundColor: theme.primaryColor
                  }}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Language Selection Switcher */}
            <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-xl px-1.5 sm:px-2.5 py-1.5 hover:border-slate-300 dark:hover:border-slate-600 transition shadow-sm">
              <Globe className="h-3.5 w-3.5 text-slate-400 shrink-0 hidden sm:block" />
              <select
                value={language}
                onChange={(e) => onSetLanguage(e.target.value as LanguageId)}
                className="text-[11px] font-bold bg-transparent text-slate-700 dark:text-slate-200 focus:outline-none border-none p-0 pr-1 select-none cursor-pointer leading-tight"
              >
                <option value="id" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">ID</option>
                <option value="en" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">EN</option>
                <option value="ar" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">AR</option>
                <option value="zh" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">ZH</option>
                <option value="ja" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">JA</option>
              </select>
            </div>

            {/* Dark/Light mode toggle */}
            <button
              onClick={onToggleDarkMode}
              className="flex items-center justify-center h-[36px] w-[36px] bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 transition shadow-sm cursor-pointer"
              title={isDarkMode ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 text-amber-400 shrink-0" />
              ) : (
                <Moon className="h-4 w-4 text-slate-500 shrink-0" />
              )}
            </button>

            {/* Quick action button */}
            <button
              onClick={() => onNavigateTab('booking')}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:shadow-md active:scale-95"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>{t.ctaBook}</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center h-[36px] w-[36px] bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 transition shadow-sm cursor-pointer"
              title="Menu navigasi"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              ) : (
                <Menu className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Accordion Panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xl p-6 transition-all flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2">{t.navHalaman || "Navigasi Halaman"}</span>
            {[
              { id: 'services', label: t.navLayananKami || 'Layanan Kami' },
              { id: 'problems-solutions', label: t.navSolusiKulit || 'Analisis Solusi Kulit' },
              { id: 'video-demo', label: t.navVideoDemoSistem || 'Video Demo Sistem' },
              { id: 'about', label: t.navTentang || 'Tentang Kami' },
              { id: 'doctors', label: t.navDokterSpesialis || 'Dokter Spesialis' },
              { id: 'promos', label: t.navPromoSpesial || 'Promo Spesial' },
              { id: 'beforeafter', label: t.navGaleriBeforeAfter || 'Galeri Before After' },
              { id: 'testimonials', label: t.navTestimoniPasien || 'Testimoni Pasien' },
              { id: 'faqs', label: t.navFaqKlinis || 'FAQ Klinis' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleScrollToSection(e, link.id);
                }}
                className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-slate-100 py-1.5 border-b border-slate-50 dark:border-slate-850 transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Language Selector */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-slate-500 block mb-2">{tText("Pilih Bahasa", language)}</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { code: 'id', label: 'ID' },
                  { code: 'en', label: 'EN' },
                  { code: 'ar', label: 'AR' },
                  { code: 'zh', label: 'ZH' },
                  { code: 'ja', label: 'JA' }
                ].map(langOption => (
                  <button
                    key={langOption.code}
                    onClick={() => {
                      onSetLanguage(langOption.code as LanguageId);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      language === langOption.code
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {langOption.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigateTab('booking');
                }}
                className="w-full py-3 rounded-xl text-white text-xs font-black tracking-wide text-center"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {t.ctaBook}
              </button>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigateTab('quiz');
                }}
                className="w-full py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-black tracking-wide text-center"
              >
                {t.ctaQuiz}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION WITH ACCENT THEMES */}
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-gradient-to-r transition-colors duration-300" style={{ backgroundColor: isDarkMode ? `${theme.secondaryColor}15` : `${theme.secondaryColor}40` }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-rose-100/50 dark:border-slate-850 shadow-sm text-[10px] text-gray-700 dark:text-slate-300 font-extrabold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>{tText("SPESIALISASI", language)}: {tText(theme.name, language)} Edition</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight font-display">
              {t.heroTitle}
            </h1>
            
            <p className="mt-5 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              {t.heroSub} {tText(theme.description, language)}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
              <button
                onClick={() => onNavigateTab('booking')}
                className="px-8 py-4 rounded-xl text-white text-sm font-bold shadow-lg shadow-indigo-600/10 cursor-pointer flex items-center justify-center gap-2 leading-none"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {t.ctaBook} <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigateTab('quiz')}
                className="px-7 py-4 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 text-sm font-bold shadow-sm cursor-pointer flex items-center justify-center gap-2 transition-all"
              >
                {t.ctaQuiz} <Sparkles className="h-4 w-4 text-orange-500 animate-pulse" />
              </button>
            </div>

            {/* Visual highlight attributes in hero */}
            <div className="mt-10 pt-8 border-t border-gray-200/60 dark:border-slate-800 max-w-lg grid grid-cols-3 gap-2.5 sm:gap-4 text-center sm:text-left">
              <div className="bg-slate-50/60 dark:bg-slate-900/40 p-3 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-center">
                <span className="block text-lg sm:text-2xl font-black text-slate-950 dark:text-slate-50 tracking-tight">15,000+</span>
                <span className="text-[9px] sm:text-[10px] text-gray-400 dark:text-slate-500 font-extrabold uppercase mt-1 leading-tight">{t.trustLabel}</span>
              </div>
              <div className="bg-slate-50/60 dark:bg-slate-900/40 p-3 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-center">
                <span className="block text-lg sm:text-2xl font-black text-slate-950 dark:text-slate-50 tracking-tight">{t.doctorCountValue || "12 Dokter"}</span>
                <span className="text-[9px] sm:text-[10px] text-gray-400 dark:text-slate-500 font-extrabold uppercase mt-1 leading-tight">{t.doctorCountLabel || "Spesialis & Ahli"}</span>
              </div>
              <div className="bg-slate-50/60 dark:bg-slate-900/40 p-3 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-sm flex flex-col justify-center">
                <span className="block text-lg sm:text-2xl font-black text-slate-950 dark:text-slate-50 tracking-tight">{t.satisfactionValue || "99.8%"}</span>
                <span className="text-[9px] sm:text-[10px] text-gray-400 dark:text-slate-500 font-extrabold uppercase mt-1 leading-tight">{t.satisfactionLabel || "Tingkat Kepuasan"}</span>
              </div>
            </div>
          </div>

          {/* Right graphics mockup illustrating premium healthcare and anti-aging aesthetic */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 w-full h-[320px] md:h-[400px] overflow-hidden rounded-3xl border border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover" 
                alt="Clinic interior workspace" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 text-white text-left">
                <span className="text-[10px] bg-indigo-600 font-bold px-2 py-1 rounded uppercase self-start mb-2">{tText("Higienis & Aman", language)}</span>
                <h4 className="text-sm font-bold text-white mb-1">{tText("Ruang Konsultasi Utama Aurora MedBeauty", language)}</h4>
                <p className="text-[11px] text-gray-200 leading-normal">{tText("Fasilitas modern dengan proses sterilisasi mutakhir berkualitas rumah sakit.", language)}</p>
              </div>
            </div>

            {/* floating badges */}
            <div className="absolute -top-4 -left-4 z-20 bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 p-3 rounded-2xl shadow-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500 animate-pulse" />
              <div className="text-[10px]">
                <strong className="block text-slate-800 dark:text-slate-100">Best Aesthetic 2026</strong>
                <span className="text-gray-400 dark:text-slate-500">Awarded Med-Beauty Alliance</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MASALAH & SOLUSI SECTION */}
      <section id="problems-solutions" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-extrabold px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-100 dark:border-indigo-900/60">
              {tText("Analisis Klinis & Terapi Terarah", language)}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-slate-100 tracking-tight font-display mt-3">
              {tText("Identifikasi Masalah & Solusi Medis Kami", language)}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
              {tText("Setiap keluhan kulit membutuhkan penanganan yang tepat dan berbasis bukti medis. Temukan bagaimana tim spesialis kami memberikan solusi terbaik untuk Anda.", language)}
            </p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* MASALAH (STYLE MERAH) */}
          <div className="bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950/40 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 p-3 rounded-2xl">
                <Frown className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 font-bold px-2 py-0.5 rounded uppercase tracking-wider">{tText("Keluhan Umum", language)}</span>
                <h3 className="text-lg font-black text-rose-950 dark:text-rose-100">{tText("Masalah Kulit & Estetika", language)}</h3>
              </div>
            </div>

            <p className="text-xs text-rose-800/80 dark:text-rose-200/80 mb-6 font-medium leading-relaxed">
              {tText("Kondisi kulit tidak sehat yang kerap menurunkan rasa percaya diri, merusak skin barrier, dan membutuhkan perhatian medis profesional:", language)}
            </p>

            <div className="space-y-4">
              {[
                {
                  title: tText("Penuaan Dini & Kerutan", language),
                  desc: tText("Munculnya garis halus di sekitar mata/dahi, kerutan dalam, kulit mengendur, dan hilangnya elastisitas alami akibat penurunan produksi kolagen seiring usia.", language)
                },
                {
                  title: tText("Flek Hitam & Hiperpigmentasi", language),
                  desc: tText("Melasma membandel, bintik matahari (sunspots), serta bekas jerawat kemerahan (PIE) atau kehitaman (PIH) yang merusak kerataan warna kulit wajah.", language)
                },
                {
                  title: tText("Jerawat Aktif & Bopeng (Scar)", language),
                  desc: tText("Peradangan jerawat akibat sumbatan sebum dan bakteri, serta kerusakan struktur kulit mendalam yang meninggalkan jaringan parut bopeng yang kasar.", language)
                },
                {
                  title: tText("Kulit Kusam, Kering, & Dehidrasi", language),
                  desc: tText("Kerusakan lapisan pelindung kulit (skin barrier) yang menyebabkan kelembapan menguap, kulit bersisik kasar, sensitif, dan kehilangan kilau sehatnya.", language)
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 bg-white/70 dark:bg-slate-900/60 border border-rose-100/50 dark:border-rose-950/40 p-4 rounded-2xl">
                  <div className="text-rose-500 font-black text-sm select-none shrink-0 mt-0.5">🔴</div>
                  <div>
                    <h4 className="text-xs font-black text-rose-950 dark:text-rose-100 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-[11px] text-rose-900/70 dark:text-rose-300/80 leading-relaxed mt-1 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SOLUSI (STYLE HIJAU) */}
          <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-950/40 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 p-3 rounded-2xl animate-pulse">
                <Smile className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded uppercase tracking-wider">{tText("Sains & Medis", language)}</span>
                <h3 className="text-lg font-black text-emerald-950 dark:text-emerald-100">{tText("Solusi Klinis & Terapi Spesialis", language)}</h3>
              </div>
            </div>

            <p className="text-xs text-emerald-800/80 dark:text-emerald-200/80 mb-6 font-medium leading-relaxed">
              {tText("Tindakan medis presisi menggunakan kombinasi alat berstandar internasional (FDA Approved) dan racikan resep klinis oleh dokter ahli:", language)}
            </p>

            <div className="space-y-4">
              {[
                {
                  title: tText("Rejuvenasi Medis & Facelift Non-Bedah", language),
                  desc: tText("Teknologi pengencangan kulit HIFU (High-Intensity Focused Ultrasound), Radio Frequency (RF), serta micro-injection skin booster untuk merangsang kolagen baru.", language)
                },
                {
                  title: tText("Laser Picosecond & Advanced Peeling", language),
                  desc: tText("Penembakan pigmen gelap secara selektif dengan laser generasi terbaru dan peeling eksfoliasi medis terarah guna mengembalikan kecerahan alami.", language)
                },
                {
                  title: tText("Acne Clear & Scar Revision", language),
                  desc: tText("Pemberian obat topikal terarah, terapi IPL (Intense Pulsed Light) jerawat, subsisi bopeng, serta laser CO2 fraksional untuk meratakan kembali tekstur kulit.", language)
                },
                {
                  title: tText("Deep Hydration & Skin Barrier Repair", language),
                  desc: tText("Terapi infus nutrisi, facial hidrasi premium, serta pengolesan ceramide-rich barrier protector klinis untuk mengunci kelembapan dan memperkuat kulit.", language)
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 bg-white/70 dark:bg-slate-900/60 border border-emerald-100/50 dark:border-emerald-950/40 p-4 rounded-2xl">
                  <div className="text-emerald-500 font-black text-sm select-none shrink-0 mt-0.5">🟢</div>
                  <div>
                    <h4 className="text-xs font-black text-emerald-950 dark:text-emerald-100 uppercase tracking-tight flex items-center gap-1.5">
                      {item.title}
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 inline shrink-0" />
                    </h4>
                    <p className="text-[11px] text-emerald-900/70 dark:text-emerald-300/80 leading-relaxed mt-1 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* VIDEO DEMO & TUR INTERAKTIF SECTION */}
      <section id="video-demo" className="px-6 mb-16">
        <div className="py-16 px-6 sm:px-12 max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden text-slate-800 dark:text-slate-100 transition-colors duration-300">
          
          {/* Dynamic Background glow effects from selected theme */}
          <div 
            className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-[120px] pointer-events-none transition-all duration-700"
            style={{ backgroundColor: `${theme.primaryColor}15` }}
          ></div>
          <div 
            className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-[120px] pointer-events-none transition-all duration-700"
            style={{ backgroundColor: `${theme.accentColor}15` }}
          ></div>

        <div className="relative z-10">
          
          {/* Header */}
          <div className="text-center mb-12">
            <span 
              className="text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest border transition-all duration-300"
              style={{ 
                backgroundColor: `${theme.primaryColor}10`, 
                color: theme.primaryColor,
                borderColor: `${theme.primaryColor}30`
              }}
            >
              {tText("Interactive System Tour", language)}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-display mt-3">
              {tText("Video Walkthrough & ", language)}
              <span style={{ color: theme.primaryColor }}>{tText("Demo Sistem", language)}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl mx-auto font-medium">
              {tText("Saksikan simulasi video cara kerja sistem digital terintegrasi kami. Beralih antara versi Desktop (CRM Dashboard) & Mobile (Patient Diagnostic Quiz).", language)}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT PANEL: THE SIMULATED MEDIA PLAYER FRAME (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center items-center">
              
              {demoMode === 'desktop' ? (
                /* DESKTOP BROWSER FRAME MOCKUP */
                <div 
                  className="w-full max-w-2xl bg-slate-50 dark:bg-slate-950 rounded-2xl border shadow-2xl overflow-hidden transition-all duration-500 transform hover:scale-[1.01]"
                  style={{ 
                    borderColor: isDarkMode ? `${theme.primaryColor}35` : `${theme.primaryColor}20`,
                    boxShadow: isDarkMode ? `0 20px 50px -12px ${theme.primaryColor}20` : `0 20px 40px -12px rgba(0,0,0,0.06)`
                  }}
                >
                  {/* Browser Header Bar */}
                  <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex gap-1.5 items-center">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <div 
                      className="bg-white dark:bg-slate-950 px-6 py-1 rounded-md text-[10px] font-mono border w-2/3 text-center truncate select-none transition-colors duration-500"
                      style={{ 
                        borderColor: isDarkMode ? `${theme.primaryColor}25` : `${theme.primaryColor}15`, 
                        color: theme.primaryColor 
                      }}
                    >
                      https://admin.{theme.id}.com/dashboard
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span 
                        className="h-2 w-2 rounded-full animate-pulse" 
                        style={{ backgroundColor: theme.primaryColor }}
                      ></span>
                      <span 
                        className="text-[9px] font-extrabold tracking-wider uppercase font-mono"
                        style={{ color: theme.primaryColor }}
                      >
                        {tText("DEMO PLAYING", language)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Browser Screen Content */}
                  <div className="relative aspect-[16/9] bg-slate-100 dark:bg-slate-900 group overflow-hidden">
                    <img 
                      src={clinicDesktopDashboard} 
                      alt="Desktop CRM Dashboard" 
                      className="w-full h-full object-cover select-none pointer-events-none opacity-95 dark:opacity-90 transition-opacity duration-700"
                      referrerPolicy="no-referrer"
                    />

                    {/* Floating Theme Brand Badge overlay */}
                    <div 
                      className="absolute top-4 left-4 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border flex items-center gap-2 shadow-xl z-10 transition-all duration-500"
                      style={{ borderColor: isDarkMode ? `${theme.primaryColor}40` : `${theme.primaryColor}20` }}
                    >
                      <span className="text-base select-none">{theme.logoEmoji}</span>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] font-extrabold text-slate-900 dark:text-white leading-none tracking-tight">{theme.name}</span>
                        <span className="text-[8px] text-slate-500 dark:text-slate-400 leading-none mt-0.5 max-w-[150px] truncate">{theme.tagline}</span>
                      </div>
                    </div>

                    {/* Live Dynamic Stats Overlay Widget */}
                    <div 
                      className="absolute bottom-4 right-4 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md px-4 py-3 rounded-xl border shadow-xl z-10 transition-all duration-500 text-left w-56 hidden sm:block animate-fadeIn"
                      style={{ borderColor: isDarkMode ? `${theme.primaryColor}40` : `${theme.primaryColor}20` }}
                    >
                      <div className="flex justify-between items-center mb-2 border-b border-slate-200 dark:border-slate-800/60 pb-1.5">
                        <span className="text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">{demoData.systemName} LIVE</span>
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: theme.primaryColor }}></span>
                          <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: theme.primaryColor }}></span>
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between items-center text-[8px] text-slate-500 dark:text-slate-400 mb-0.5">
                            <span>{demoData.metrics[0]}</span>
                            <span className="font-mono text-xs font-bold" style={{ color: theme.primaryColor }}>
                              {Math.round(85 + (demoProgress * 0.14))}%
                            </span>
                          </div>
                          <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full transition-all duration-300"
                              style={{ 
                                width: `${Math.min(100, 85 + (demoProgress * 0.15))}%`,
                                backgroundColor: theme.primaryColor
                              }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center text-[8px] text-slate-500 dark:text-slate-400">
                            <span>{demoData.metrics[1]}</span>
                            <span className="font-mono text-xs font-extrabold" style={{ color: theme.primaryColor }}>
                              Rp {(124.5 + (demoProgress * 1.6)).toFixed(1)}M
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live theme color matching tint blends */}
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-color opacity-35 transition-all duration-700"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})` 
                      }}
                    />
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-15 transition-all duration-700"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})` 
                      }}
                    />
                    
                    {/* Dark Overlay when paused */}
                    {!isPlaying && (
                      <div className="absolute inset-0 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center transition-all duration-300">
                        <button 
                          onClick={() => setIsPlaying(true)}
                          className="text-white p-5 rounded-full shadow-2xl transition transform hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center border-2 border-white/20"
                          style={{ backgroundColor: theme.primaryColor }}
                        >
                          <Play className="h-7 w-7 fill-white translate-x-0.5 text-white" />
                        </button>
                      </div>
                    )}

                    {/* Progress scanning glow effect */}
                    {isPlaying && (
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 pointer-events-none"
                        style={{ 
                          left: `${demoProgress}%`,
                          backgroundColor: theme.primaryColor,
                          boxShadow: `0 0 15px ${theme.primaryColor}`
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              ) : (
                /* MOBILE SMARTPHONE FRAME MOCKUP */
                <div 
                  className="w-64 sm:w-72 bg-slate-50 dark:bg-slate-950 rounded-[40px] border-[8px] border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-500 transform hover:scale-[1.01] relative"
                  style={{ 
                    boxShadow: isDarkMode ? `0 20px 50px -12px ${theme.primaryColor}25` : `0 20px 40px -12px rgba(0,0,0,0.06)`
                  }}
                >
                  
                  {/* Smartphone Camera Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-slate-200 dark:bg-slate-800 rounded-b-2xl z-30 flex items-center justify-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-950"></div>
                    <div className="w-8 h-1 bg-slate-300 dark:bg-slate-950 rounded-full"></div>
                  </div>

                   {/* Mobile Screen Content */}
                  <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-900 group overflow-hidden">
                    <img 
                      src={clinicMobileQuiz} 
                      alt="Mobile Diagnostic Skin Quiz" 
                      className="w-full h-full object-cover select-none pointer-events-none opacity-95 dark:opacity-90 transition-opacity duration-700"
                      referrerPolicy="no-referrer"
                    />

                    {/* Floating Mobile Theme Brand Badge overlay */}
                    <div 
                      className="absolute top-8 left-4 right-4 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border flex items-center gap-2 shadow-lg z-10 transition-all duration-500 text-left"
                      style={{ borderColor: isDarkMode ? `${theme.primaryColor}40` : `${theme.primaryColor}20` }}
                    >
                      <span className="text-sm select-none">{theme.logoEmoji}</span>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[9px] font-extrabold text-slate-900 dark:text-white leading-none tracking-tight truncate">{theme.name}</span>
                        <span className="text-[7px] text-slate-500 dark:text-slate-400 leading-none mt-0.5 truncate">{theme.tagline}</span>
                      </div>
                    </div>

                    {/* Live Dynamic Quiz Widget Overlay for Mobile */}
                    <div 
                      className="absolute inset-x-4 bottom-4 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md p-3 rounded-xl border shadow-lg z-10 transition-all duration-500 text-left"
                      style={{ borderColor: isDarkMode ? `${theme.primaryColor}30` : `${theme.primaryColor}15` }}
                    >
                      {demoProgress < 75 ? (
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[8px] text-slate-500 dark:text-slate-400">
                            <span>{demoData.quizTitle}</span>
                            <span style={{ color: theme.primaryColor }}>Step 2/3</span>
                          </div>
                          <h5 className="text-[10px] font-bold text-slate-900 dark:text-white line-clamp-1">{demoData.quizQuestion}</h5>
                          <div className="grid grid-cols-2 gap-1.5 pt-1">
                            {demoData.quizOptions.slice(0, 4).map((opt, i) => {
                              // Simulate click selection as demo progress ticks
                              const isSelected = (demoProgress < 35 && i === 0) || (demoProgress >= 35 && i === 2);
                              return (
                                <div 
                                  key={opt}
                                  className="text-[7.5px] px-2 py-1 rounded border text-slate-700 dark:text-slate-300 font-medium transition-all truncate"
                                  style={isSelected ? {
                                    borderColor: theme.primaryColor,
                                    backgroundColor: `${theme.primaryColor}15`,
                                    color: theme.primaryColor
                                  } : {
                                    borderColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                                    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
                                  }}
                                >
                                  {opt}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5 animate-fadeIn">
                          <div className="flex items-center gap-1 text-[8px] text-emerald-500 dark:text-emerald-400 font-bold uppercase tracking-wider">
                            <Sparkles className="h-2 w-2 text-emerald-500 dark:text-emerald-400" />
                            <span>{tText("Rekomendasi Terpilih", language)}</span>
                          </div>
                          <h5 className="text-[10px] font-black text-slate-900 dark:text-white leading-tight">{demoData.recommendation}</h5>
                          <div 
                            className="text-center text-[8px] font-extrabold text-white py-1 rounded cursor-pointer animate-pulse"
                            style={{ backgroundColor: theme.primaryColor }}
                          >
                            {tText("Hubungi Kami Sekarang", language)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Live theme color matching tint blends */}
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-color opacity-35 transition-all duration-700"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})` 
                      }}
                    />
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-15 transition-all duration-700"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})` 
                      }}
                    />
                    
                    {/* Dark Overlay when paused */}
                    {!isPlaying && (
                      <div className="absolute inset-0 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center transition-all duration-300 z-20">
                        <button 
                          onClick={() => setIsPlaying(true)}
                          className="text-white p-4 rounded-full shadow-2xl transition transform hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center border-2 border-white/20"
                          style={{ backgroundColor: theme.primaryColor }}
                        >
                          <Play className="h-5 w-5 fill-white translate-x-0.5 text-white" />
                        </button>
                      </div>
                    )}

                    {/* Progress scanning glow effect */}
                    {isPlaying && (
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 pointer-events-none z-20"
                        style={{ 
                          left: `${demoProgress}%`,
                          backgroundColor: theme.primaryColor,
                          boxShadow: `0 0 15px ${theme.primaryColor}`
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT PANEL: INTERACTIVE MEDIA PLAYER CONTROLS & LOG CONSOLE (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Mode Selector Toggle Buttons */}
              <div className="flex gap-2.5 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => {
                    setDemoMode('desktop');
                    setDemoProgress(0);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  style={demoMode === 'desktop' ? {
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    color: theme.primaryColor,
                    boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.1)'
                  } : {
                    color: isDarkMode ? '#94a3b8' : '#64748b'
                  }}
                >
                  <Monitor className="h-4 w-4" />
                  <span>{tText("Desktop CRM View", language)}</span>
                </button>
                <button
                  onClick={() => {
                    setDemoMode('mobile');
                    setDemoProgress(0);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  style={demoMode === 'mobile' ? {
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                    color: theme.primaryColor,
                    boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.1)'
                  } : {
                    color: isDarkMode ? '#94a3b8' : '#64748b'
                  }}
                >
                  <Smartphone className="h-4 w-4" />
                  <span>{tText("Mobile Quiz View", language)}</span>
                </button>
              </div>

              {/* Progress Seek Bar */}
              <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 mb-2 font-mono uppercase">
                  <span>{tText("Progress Simulasi", language)}</span>
                  <span>{Math.round(demoProgress)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={demoProgress}
                  onChange={(e) => setDemoProgress(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  style={{
                    accentColor: theme.primaryColor
                  }}
                />
              </div>

              {/* Core Telemetry Action Log Console */}
              <div className="bg-slate-100 dark:bg-slate-950 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 relative">
                <div className="absolute top-3 right-4 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[8px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase">SYS_LOG</span>
                </div>
                
                <h4 className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">{tText("Live Walkthrough Captions", language)}</h4>
                
                <div className="h-20 flex items-center text-xs font-medium text-slate-700 dark:text-slate-200 leading-relaxed transition-all">
                  {getDemoCaption()}
                </div>

                <div className="border-t border-slate-200 dark:border-slate-900 pt-3 mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  <span>CHANNEL_FEED: {demoMode.toUpperCase()}_LIVE_SCREEN</span>
                  <span>RATE: {playbackSpeed}x</span>
                </div>
              </div>

              {/* Player Controllers */}
              <div className="flex items-center justify-between gap-2 bg-slate-100/50 dark:bg-slate-950/50 p-2.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800/60">
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 sm:p-3 rounded-full flex items-center justify-center transition cursor-pointer shrink-0 text-white"
                    style={{
                      backgroundColor: isPlaying ? '#e11d48' : theme.primaryColor
                    }}
                  >
                    {isPlaying ? <Pause className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-white" />}
                  </button>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isPlaying ? tText("Pause", language) : tText("Putar", language)} <span className="hidden xs:inline">{tText("Simulasi", language)}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
                  {/* Playback Rate Speed Toggle */}
                  <div className="flex gap-1 bg-slate-200/80 dark:bg-slate-900 p-0.5 sm:p-1 rounded-lg shrink-0">
                    {[1, 1.5, 2].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setPlaybackSpeed(spd)}
                        className="text-[8px] sm:text-[9px] font-extrabold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transition-all cursor-pointer"
                        style={playbackSpeed === spd ? {
                          backgroundColor: theme.primaryColor,
                          color: '#FFFFFF'
                        } : {
                          color: isDarkMode ? '#94a3b8' : '#64748b'
                        }}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>

                  {/* Sound Toggle (simulated) */}
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 sm:p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer shrink-0"
                    style={!isMuted ? { color: theme.primaryColor } : {}}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    <Volume2 className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isMuted ? 'opacity-40' : 'opacity-100'}`} />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE SYSTEM SECTION */}
      <section id="about" className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight font-display">{t.whyChooseUs}</h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{tText("Mengapa ribuan pasien memercayakan kesehatan wajah dan keluarga kepada kami secara bertahun-tahun.", language)}</p>
 
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-10">
          {[
            { tag: tText("Dokter Profesional", language), desc: tText("Ditangani dokter spesialis terdaftar STR resmi serta perawat tersertifikasi kompetensi estetika.", language), icon: Users },
            { tag: tText("Alat Berstandar FDA", language), desc: tText("Teknologi gelombang laser, HIFU, RF original terdaftar izin Kemenkes RI demi ketepatan medis.", language), icon: Award },
            { tag: tText("CRM Reminder Cerdas", language), desc: tText("Pasien diingatkan ramah otomatis lewat WhatsApp jadwal Aftercare demi kelanjutan terapi.", language), icon: Zap },
            { tag: tText("Consent Data Pasien", language), desc: tText("Data foto medis dan pribadi dienkripsi aman untuk menjaga kenyamanan privasi Anda.", language), icon: CheckCircle2 }
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-gray-100/80 dark:border-slate-800 p-4 sm:p-6 rounded-2xl shadow-sm text-left flex flex-col justify-between">
              <div>
                <div className="bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-xl p-2.5 sm:p-3 inline-block mb-3 sm:mb-4">
                  <item.icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-slate-100 mb-1.5 leading-tight">{item.tag}</h4>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 5. SERVICES / CATALOG TREATMENT */}
      <section id="services" className="px-6 mb-16">
        <div className="py-16 px-6 sm:px-12 max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 text-left">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-slate-100 font-display">{t.ourServices}</h2>
            <p className="text-xs text-gray-500 dark:text-slate-400">{tText("Katalog tindakan kecantikan dan kesehatan paripurna terintegrasi.", language)}</p>
          </div>
          <button 
            onClick={() => onNavigateTab('booking')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline mt-4 md:mt-0"
          >
            {tText("Pesan sekarang meluncur ke wizard booking", language)} <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {localizedServices.map((svc: Service) => (
            <div 
              key={svc.name}
              className="border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-50/20 dark:hover:bg-slate-900/30 rounded-2xl p-6 text-left transition hover:scale-[1.01] flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 inline-block mb-3">
                  {svc.category}
                </span>
                <h3 className="font-extrabold text-gray-900 dark:text-slate-100 border-b border-gray-200/50 dark:border-slate-800 pb-2 mb-2 text-sm">{svc.name}</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4 font-normal">{svc.description}</p>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs border-t border-gray-200/50 dark:border-slate-800 pt-3 mb-4">
                  <span className="text-gray-400 font-normal">{tText("Mulai:", language)}</span>
                  <span className="font-bold text-gray-900 dark:text-slate-100 text-sm">Rp {svc.promo_price.toLocaleString()}</span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedServiceDetail(svc)}
                    className="flex-1 py-2 text-xs font-bold rounded-lg border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {tText("Detail Layanan", language)}
                  </button>
                  <button
                    onClick={() => onNavigateTab('booking', svc.name)}
                    className="flex-1 py-2 text-xs font-bold rounded-lg text-white text-center hover:opacity-90"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 6. DOCTOR / MEDICAL TEAM PROFILES */}
      <section id="doctors" className="py-16 px-6 mb-16 text-center">
        <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-black text-gray-900 dark:text-slate-100 tracking-tight font-display">{t.ourDoctors}</h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{tText("Tim dokter ahli berizin STR resmi Kemenkes, ramah, dan berpengalaman puluhan tahun.", language)}</p>
 
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-10">
          {localizedDoctors.map((doc: Doctor) => (
            <div key={doc.name} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-4 sm:p-6 text-center shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-black text-indigo-700 dark:text-indigo-300 text-xl sm:text-2xl mx-auto mb-3 sm:mb-4 border border-indigo-50 dark:border-indigo-950/50 shadow-sm">
                  {doc.name.substring(0, 5) === 'drg. ' ? '🦷' : '👨‍⚕️'}
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 line-clamp-1">{doc.name}</h4>
                <p className="text-[9px] sm:text-[10px] text-indigo-700 dark:text-indigo-300 font-semibold mb-1.5 sm:mb-2">{doc.specialty}</p>
                <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs text-amber-500 font-semibold mb-3 sm:mb-4">
                  <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-500" />
                  <span>{doc.rating} ({doc.experience_years} {tText("thn", language)})</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-slate-400 leading-normal line-clamp-3 font-normal mb-3 sm:mb-4">
                  &ldquo;{doc.bio}&rdquo;
                </p>
              </div>
 
              <div>
                <div className="text-[8px] sm:text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 py-1 px-1 rounded-md block mb-2 sm:mb-3 font-medium uppercase line-clamp-1">
                  Spesialis: {doc.services.join(', ')}
                </div>
                <button
                  onClick={() => setSelectedDoctorDetail(doc)}
                  className="w-full py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 transition cursor-pointer"
                >
                  {tText("Lihat Praktek", language)}
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 7. ACTIVE PROMOS SECTION */}
      <section id="promos" className="px-6 mb-16">
        <div className="py-16 px-6 sm:px-12 max-w-7xl mx-auto bg-indigo-950 text-white rounded-3xl overflow-hidden relative">
        <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-slate-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 text-center mb-10">
          <h2 className="text-2xl font-black font-display text-white">{t.activePromos}</h2>
          <p className="text-xs text-white/80 mt-1">{tText("Gunakan kode digital promo ini di formulir reservasi untuk mengunci harga core diskon.", language)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 px-4">
          {localizedPromos.map((promo: Promo) => (
            <div key={promo.name} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-between text-left">
              <div>
                <span className="bg-rose-500 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase self-start mb-3 inline-block">
                  {tText("Diskon", language)} {promo.discount_percent}%
                </span>
                <h3 className="font-bold text-white text-base mb-2">{promo.name}</h3>
                <p className="text-xs text-white/80 leading-relaxed mb-4">{promo.description}</p>
              </div>

              <div className="border-t border-white/10 pt-4 mt-6">
                <div className="flex justify-between text-xs mb-3 text-white/70">
                  <span>{tText("Harga Promo:", language)}</span>
                  <span className="font-extrabold text-white text-sm">Rp {promo.promo_price.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => onNavigateTab('booking', promo.service)}
                  className="w-full py-2.5 rounded-lg bg-white text-indigo-950 text-xs font-extrabold hover:bg-slate-100 tracking-wide transition uppercase cursor-pointer text-center"
                >
                  {promo.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 8. BEFORE-AFTER GALLERY */}
      <section id="beforeafter" className="py-16 px-6 mb-16 text-center">
        <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-black text-gray-900 dark:text-slate-100 font-display">{t.beforeAfterTitle}</h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{tText("Hasil klinis visual pencapaian pasien tepercaya kami setelah rangkaian treatment berkala.", language)}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {localizedBeforeAfters.map((bef: BeforeAfterCase) => (
            <div key={bef.case_title} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden p-5 shadow-sm text-left">
              {/* Dummy Image visualization boxes side-by-side */}
              <div className="grid grid-cols-2 gap-2 h-44 mb-4">
                <div className="relative bg-slate-100 dark:bg-slate-800 border border-gray-200/50 dark:border-slate-700 rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale" alt="Skin before" />
                  <span className="absolute bottom-1.5 left-1.5 bg-black/70 text-white font-extrabold text-[8px] py-0.5 px-2 rounded-full uppercase tracking-widest">BEFORE</span>
                </div>
                <div className="relative bg-slate-100 dark:bg-slate-800 border border-gray-200/50 dark:border-slate-700 rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Skin after" />
                  <span className="absolute bottom-1.5 left-1.5 bg-emerald-600/90 text-white font-extrabold text-[8px] py-0.5 px-2 rounded-full uppercase tracking-widest">AFTER</span>
                </div>
              </div>

              <h4 className="text-xs font-extrabold text-gray-900 dark:text-slate-100 leading-snug">{bef.case_title}</h4>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1">{tText("Dokter pendamping:", language)} {bef.doctor} | {tText("Durasi:", language)} {bef.duration}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-normal mt-2 line-clamp-3">{bef.description}</p>
              <p className="text-[8px] text-rose-500 dark:text-rose-400 italic mt-3 font-semibold">* DISCLAIMER: {bef.disclaimer}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* TESTIMONI (4 CARDS) SECTION */}
      <section id="testimonials" className="px-4 sm:px-6 mb-16">
        <div className="py-12 sm:py-16 px-4 sm:px-12 max-w-7xl mx-auto bg-slate-50/50 dark:bg-slate-900/40 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div className="text-center mb-8 sm:text-center sm:mb-12">
          <span className="text-[10px] bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-extrabold px-3 py-1 rounded-full uppercase tracking-widest border border-amber-100 dark:border-amber-900/40">
            {tText("Suara Kepuasan Pasien", language)}
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-gray-900 dark:text-slate-100 tracking-tight font-display mt-3">
            {tText("Apa Kata Mereka Tentang Kami?", language)}
          </h2>
          <p className="text-[11px] sm:text-sm text-gray-500 dark:text-slate-400 mt-2 max-w-2xl mx-auto font-medium">
            {tText("Lebih dari 10.000+ pasien telah mempercayakan kesehatan kulit & estetika wajah mereka kepada spesialis kami. Berikut testimoni jujur dari mereka:", language)}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {[
            {
              name: "Nadia Rahma",
              initials: "NR",
              bgColor: "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300",
              service: "Acne Clear Program",
              rating: 5,
              review: "Awalnya ragu karena jerawat saya cukup parah, tapi setelah konsultasi dan treatment bertahap, kulit terasa jauh lebih bersih dan terkontrol. Admin juga ramah banget sering ingetin jadwal follow-up!",
              source: "Google Review"
            },
            {
              name: "Clara Santoso",
              initials: "CS",
              bgColor: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
              service: "HIFU Face Lifting",
              rating: 5,
              review: "Kliniknya sangat bersih, wangi, dan estetik. Dokternya menjelaskan detail struktur wajah saya sebelum treatment HIFU. Hasilnya natural, kerutan halus berkurang dan langsung keliatan kencang.",
              source: "Verified Patient"
            },
            {
              name: "Michael Tan",
              initials: "MT",
              bgColor: "bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300",
              service: "Dental Scaling",
              rating: 5,
              review: "Proses scaling gigi sangat cepat, minim rasa ngilu, dan alatnya modern sekali. Reservasi online dari rumah juga gampang banget, tinggal scan QR code waktu check-in di klinik.",
              source: "Google Review"
            },
            {
              name: "Aline Wijaya",
              initials: "AW",
              bgColor: "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300",
              service: "Laser Rejuvenation",
              rating: 5,
              review: "Puas banget sama hasil laser di sini! Baru 3 kali sesi tapi flek hitam membandel di pipi sudah memudar drastis. Wajah jadi kelihatan glowing merata dan cerah berseri.",
              source: "Instagram Verified"
            }
          ].map((testi, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-3 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left">
              <div>
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold text-[10px] sm:text-xs flex items-center justify-center shrink-0 ${testi.bgColor}`}>
                      {testi.initials}
                    </div>
                    <div>
                      <h4 className="text-[10px] sm:text-xs font-extrabold text-gray-900 dark:text-slate-100 line-clamp-1">{testi.name}</h4>
                      <span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-slate-500 font-semibold">{testi.source}</span>
                    </div>
                  </div>
                  <div className="self-start xs:self-center bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-1.5 sm:px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-bold flex items-center gap-1 shrink-0">
                    <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-amber-500 text-amber-500 shrink-0" />
                    <span>{testi.rating.toFixed(1)}</span>
                  </div>
                </div>

                <span className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-1.5 sm:px-2 py-0.5 rounded-full inline-block mb-2 sm:mb-3">
                  {testi.service}
                </span>

                <p className="text-[10px] sm:text-xs text-gray-600 dark:text-slate-300 leading-relaxed font-normal italic line-clamp-6">
                  &ldquo;{tText(testi.review, language)}&rdquo;
                </p>
              </div>

              <div className="border-t border-gray-100/80 dark:border-slate-800 pt-2 sm:pt-3 mt-3 sm:mt-4 flex flex-col xs:flex-row xs:items-center justify-between gap-1 text-[8px] sm:text-[9px] font-semibold text-gray-400">
                <span>{tText("Pasien Terdaftar", language)}</span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  Verified Case
                </span>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 9. OUTLET BRANCHES & MAPS SECTION */}
      <section className="px-6 mb-16">
        <div className="py-16 px-6 sm:px-12 max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm grid grid-cols-1 lg:grid-cols-5 gap-12 text-left">
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-slate-100 font-display mb-3">{t.addressLabel}</h2>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-6">
              {tText("Kunjungi 3 outlet cabang utama Aurora MedBeauty yang didesain estetik, premium, nyaman, ramah disabilitas, dan parkir luas.", language)}
            </p>
 
            <div className="flex flex-col gap-5">
              {localizedBranches.map(b => (
                <div key={b.name} className="border-l-2 border-indigo-500 pl-4 py-1">
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100">{b.name}</h4>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-normal mt-0.5">{b.address}</p>
                  <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1 font-semibold flex items-center gap-1.5">
                    <Clock className="h-3 w-3 inline text-slate-400 dark:text-slate-500" />
                    {tText("Buka:", language)} {b.opening_hours}
                  </p>
                </div>
              ))}
            </div>
          </div>
 
          <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
            <h5 className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-widest mb-2">{tText("Layanan Emergency:", language)}</h5>
            <div className="text-[10px] text-gray-500 dark:text-slate-400">
              {tText("Butuh konsultasi gawat darurat paska-tindakan? Hubungi WhatsApp Careline 24/7 di ", language)}<strong className="text-indigo-600 dark:text-indigo-400">{SEED_CLINIC_BASE.whatsapp}</strong>{tText(" untuk asisten medis instan.", language)}
            </div>
          </div>
        </div>
 
        {/* Mocking responsive interactive Google Maps visual frame */}
        <div className="lg:col-span-3 bg-slate-100 dark:bg-slate-950/40 rounded-2xl overflow-hidden min-h-[300px] border border-gray-200 dark:border-slate-800 flex items-center justify-center relative shadow-sm">
          <div className="absolute inset-0 select-none pointer-events-none opacity-40">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
          <div className="text-center p-8 relative z-10">
            <MapPin className="h-10 w-10 text-indigo-600 animate-bounce mx-auto mb-3" />
            <span className="text-xs font-mono bg-indigo-600 text-white px-2.5 py-1 rounded-full font-bold mb-1.5 inline-block">{tText("Interactive Maps Simulation", language)}</span>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{tText("Senopati, Bandung Riau, & Sungkono Surabaya Center", language)}</h4>
            <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1">{tText("Sistem rute koordinat terintegrasi langsung dengan GPS Maps API untuk navigasi instan di handphone pasien.", language)}</p>
          </div>
        </div>
        </div>
      </section>

      {/* 10. FAQS ACCORDION */}
      <section id="faqs" className="py-16 px-6 mb-16 text-left">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black text-gray-950 dark:text-slate-100 font-display text-center mb-1.5">{t.faqTitle}</h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 text-center mb-10">{tText("Jawaban resmi tim medis atas pertanyaan yang paling sering diajukan calon pasien.", language)}</p>

          <div className="flex flex-col gap-3 max-w-4xl mx-auto">
          {localizedFaqs.map((faq: FAQ, idx: number) => {
            const isOpen = !!faqOpenState[idx];
            return (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-xs font-extrabold text-slate-800 dark:text-slate-100 text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-800 border-0 flex justify-between items-center transition"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    {faq.question}
                  </span>
                  <span className="font-mono text-gray-400 dark:text-slate-500 text-sm">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-normal border-t border-slate-50 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        </div>
      </section>

      {/* 10.5 CALL TO ACTION (CTA) SECTION */}
      <section id="cta" className="px-6 mb-16">
        <div className="py-16 px-6 sm:px-12 max-w-7xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white border border-indigo-800 shadow-xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -translate-x-20 translate-y-20"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="bg-indigo-500/10 text-indigo-300 font-extrabold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest border border-indigo-500/20 mb-6 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>{tText("Mulai Transformasi Kulit Anda Hari Ini", language)}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight leading-tight mb-4 text-white">
            {tText("Siap Dapatkan Kulit Sehat & Glowing Impian?", language)}
          </h2>
          
          <p className="text-xs sm:text-sm text-indigo-200/80 leading-relaxed mb-10 max-w-xl font-medium">
            {tText("Ikuti Skin Concern Quiz berbasis medis kami secara gratis, atau buat reservasi instan bersama Dokter Spesialis andalan Anda hanya dalam beberapa menit saja.", language)}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => onNavigateTab('quiz')}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 border border-indigo-400/20"
            >
              <PenTool className="h-4 w-4 shrink-0" />
              <span>{tText("Mulai Skin Quiz (Gratis)", language)}</span>
            </button>
            <button
              onClick={() => onNavigateTab('booking')}
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg hover:shadow-slate-200/10 transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <ClipboardList className="h-4 w-4 text-indigo-600 shrink-0" />
              <span>{tText("Buat Reservasi Online", language)}</span>
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[10px] sm:text-xs text-indigo-200/60 font-semibold border-t border-indigo-800/60 pt-8 w-full max-w-xl">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              {tText("Sertifikat Kemenkes RI", language)}
            </span>
            <span className="hidden sm:inline text-indigo-800">•</span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400 shrink-0" />
              {tText("Peralatan FDA Approved", language)}
            </span>
            <span className="hidden sm:inline text-indigo-800">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-indigo-400 shrink-0" />
              {tText("3 Cabang Eksklusif", language)}
            </span>
          </div>
        </div>
        </div>
      </section>

      {/* 11. PERSISTENT BRIDGING STICKY BAR IN FOOTER */}
      <section className="bg-indigo-900 text-white rounded-t-3xl py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <ClinicDigitalProLogo variant="light" />
            <p className="text-xs text-indigo-200/80 leading-relaxed mt-4 max-w-sm">
              {tText(SEED_CLINIC_BASE.description, language)}
            </p>
            <div className="mt-4 text-[10px] bg-indigo-950 text-indigo-300 py-1.5 px-3 rounded-lg inline-block font-mono border border-indigo-800">
              NIB: {SEED_CLINIC_BASE.license_number} | Kemenkes RI Standard Certified
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-widest mb-3">{tText("Tautan Cepat", language)}</h5>
            <ul className="text-xs text-indigo-200/80 flex flex-col gap-2 font-semibold">
              <li><a href="#services" onClick={(e) => handleScrollToSection(e, 'services')} className="hover:text-white transition">{tText("Katalog Medis", language)}</a></li>
              <li><a href="#problems-solutions" onClick={(e) => handleScrollToSection(e, 'problems-solutions')} className="hover:text-white transition">{tText("Masalah & Solusi", language)}</a></li>
              <li><a href="#testimonials" onClick={(e) => handleScrollToSection(e, 'testimonials')} className="hover:text-white transition">{tText("Testimoni Pasien", language)}</a></li>
              <li><a href="#doctors" onClick={(e) => handleScrollToSection(e, 'doctors')} className="hover:text-white transition">{tText("Tim Dokter", language)}</a></li>
              <li><a href="#promos" onClick={(e) => handleScrollToSection(e, 'promos')} className="hover:text-white transition">{tText("Promo Khusus", language)}</a></li>
              <li><button onClick={() => onNavigateTab('quiz')} className="hover:text-white transition cursor-pointer text-left">{tText("Mulai Skin Quiz", language)}</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-widest mb-3">{tText("Cabang Layanan", language)}</h5>
            <ul className="text-xs text-indigo-200/80 flex flex-col gap-2">
              {localizedBranches.map(b => (
                <li key={b.city}>{b.city} Office Hub</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal licensing medical compliance disclaimer footer */}
        <div className="border-t border-indigo-950/80 mt-10 pt-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[10px] text-indigo-300/80 gap-4">
          <span>&copy; 2026 {SEED_CLINIC_BASE.name}. All Rights Reserved. {tText("Dibuat oleh", language)} <a href="https://contech.id" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold">Contech ID</a></span>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:underline text-indigo-200">Medical Consent Disclaimer</span>
            <span className="cursor-pointer hover:underline text-indigo-200">Patient Privacy Policy</span>
            <span className="cursor-pointer hover:underline text-indigo-200">Operational License Link</span>
          </div>
        </div>
      </section>

      {/* SERVICE DETAIL MODAL FOR DEMOCRAFT */}
      {selectedServiceDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-8 max-h-[85vh] overflow-y-auto text-left relative border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-black text-gray-900 dark:text-slate-100 border-b border-gray-100 dark:border-slate-800 pb-3 mb-4 font-display flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              {selectedServiceDetail.name}
            </h3>
            
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-4">{selectedServiceDetail.description}</p>
            
            <div className="flex flex-col gap-3 font-normal text-xs text-gray-600 dark:text-slate-300 mb-6">
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                <strong className="block text-slate-800 dark:text-slate-200 mb-1">{tText("Manfaat Utama:", language)}</strong>
                <ul className="list-disc pl-4 text-gray-600 dark:text-slate-300">
                  {selectedServiceDetail.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                <strong className="block text-slate-800 dark:text-slate-200 mb-1">{tText("Cocok Untuk Permasalahan:", language)}</strong>
                <span className="text-gray-600 dark:text-slate-300">{selectedServiceDetail.suitable_for.join(', ')}</span>
              </div>

              <div className="bg-slate-50 dark:bg-rose-950/20 p-3 rounded-xl border border-slate-200/60 dark:border-rose-900/30">
                <strong className="block text-rose-800 dark:text-rose-300 mb-1 border-b border-rose-100 dark:border-rose-900/20 pb-1 flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5" /> {tText("Kontraindikasi (Halangan):", language)}
                </strong>
                <span className="text-gray-600 dark:text-slate-300">{selectedServiceDetail.contraindications.join(', ')}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                <strong className="block text-slate-800 dark:text-slate-200 mb-1">{tText("Persiapan Tindakan:", language)}</strong>
                <span className="text-gray-600 dark:text-slate-300">{selectedServiceDetail.preparation}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                <strong className="block text-indigo-800 dark:text-indigo-300 mb-1">{tText("Panduan Aftercare (Pasca Tindakan):", language)}</strong>
                <span className="text-gray-600 dark:text-slate-300">{selectedServiceDetail.aftercare}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedServiceDetail(null)} 
                className="flex-1 py-3 text-xs font-bold rounded-xl border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {tText("Tutup Detail", language)}
              </button>
              <button
                onClick={() => {
                  setSelectedServiceDetail(null);
                  onNavigateTab('booking', selectedServiceDetail.name);
                }}
                className="flex-1 py-3 text-xs font-bold rounded-xl text-white hover:opacity-90 transition leading-none text-center"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {tText("Booking Treatment Ini", language)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCTOR DETAIL / HOURS MODAL */}
      {selectedDoctorDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 text-left relative border border-slate-100 dark:border-slate-800">
            <div className="text-center border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 text-xl mx-auto mb-2 border border-indigo-50 dark:border-indigo-950/40">
                👩‍⚕️
              </div>
              <h3 className="font-extrabold text-gray-900 dark:text-slate-100 text-base">{selectedDoctorDetail.name}</h3>
              <p className="text-xs text-indigo-700 dark:text-indigo-400 font-semibold">{selectedDoctorDetail.specialty}</p>
            </div>

            <h4 className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {tText("Jadwal Praktik Utama (Konsultasi):", language)}
            </h4>
            
            <div className="flex flex-col gap-2 mb-6">
              {selectedDoctorDetail.schedule.map((slot, i) => (
                <div key={i} className="flex justify-between items-center text-xs p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{slot.day}</span>
                  <span className="text-gray-500 dark:text-slate-400">{slot.time} WIB</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setSelectedDoctorDetail(null)} 
              className="w-full py-3 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border-0"
            >
              {tText("Tutup Jadwal", language)}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
