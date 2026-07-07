/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, Calendar, Clock, CreditCard, Activity, Sliders, MessageSquare, 
  ShieldAlert, Plus, Edit, Check, X, Search, Filter, RefreshCw, Send, 
  TrendingUp, ArrowRight, Award, Star, Eye, ChevronRight, Copy, User, Camera, Lock, Mail
} from 'lucide-react';
import { 
  ClinicThemeId, LanguageId, Service, Doctor, Promo, BeforeAfterCase,
  FAQ, Appointment, AppointmentStatus, PaymentStatus, Lead, LeadStatus,
  AdminUser, PaymentLog, NotificationTemplate, AuditLog, ThemeConfig
} from '../types';
import { THEME_PRESETS, SEED_DOCTORS, SEED_SERVICES, SEED_BRANCHES } from '../data/seedData';

const isEmoji = (str: string) => {
  if (!str) return false;
  return !str.startsWith('data:') && !str.startsWith('http') && !str.startsWith('/') && str.length <= 8;
};

interface AdminDashboardProps {
  themeId: ClinicThemeId;
  language: LanguageId;
  appointments: Appointment[];
  leads: Lead[];
  promos: Promo[];
  auditLogs: AuditLog[];
  adminUsers: AdminUser[];
  paymentLogs: PaymentLog[];
  notificationTemplates: NotificationTemplate[];
  onUpdateAppointmentStatus: (bookingCode: string, status: AppointmentStatus, paymentStatus?: PaymentStatus) => void;
  onUpdateLeadStatus: (leadId: string, status: LeadStatus) => void;
  onUpdatePromoQuota: (promoName: string, newQuota: number) => void;
  onAddPromo: (promo: Promo) => void;
  onUpdateThemeConfig: (themeId: ClinicThemeId, config: Partial<ThemeConfig>) => void;
  onAddAuditLog: (action: string, details: string, user?: string) => void;
  onThemeChange: (id: ClinicThemeId) => void;
  currentAdmin?: { name: string; email: string; role: string; photo?: string } | null;
  onLogout?: () => void;
  onUpdateProfile?: (updated: { name: string; email: string; photo?: string; password?: string }) => void;
}

export default function AdminDashboard({
  themeId,
  language,
  appointments,
  leads,
  promos,
  auditLogs,
  adminUsers,
  paymentLogs,
  notificationTemplates,
  onUpdateAppointmentStatus,
  onUpdateLeadStatus,
  onUpdatePromoQuota,
  onAddPromo,
  onUpdateThemeConfig,
  onAddAuditLog,
  onThemeChange,
  currentAdmin,
  onLogout,
  onUpdateProfile
}: AdminDashboardProps) {
  const currentTheme = THEME_PRESETS[themeId];

  // Tab State
  const [activeTab, setActiveTab] = useState<'analytics' | 'appointments' | 'crm' | 'promos' | 'branding' | 'comms' | 'security' | 'profile'>('analytics');

  // Search & Filter States
  const [appointmentSearch, setAppointmentSearch] = useState('');
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState<string>('all');
  const [appointmentBranchFilter, setAppointmentBranchFilter] = useState<string>('all');

  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');

  const [auditSearch, setAuditSearch] = useState('');
  const [auditUserFilter, setAuditUserFilter] = useState('all');

  // New Promo Form State
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [newPromo, setNewPromo] = useState<Omit<Promo, 'discount_percent'>>({
    name: '',
    description: '',
    service: SEED_SERVICES[0].name,
    normal_price: SEED_SERVICES[0].price_start,
    promo_price: SEED_SERVICES[0].promo_price || SEED_SERVICES[0].price_start * 0.8,
    quota: 50,
    start_date: '2026-06-01',
    end_date: '2026-06-30',
    branch: [SEED_BRANCHES[0].name],
    status: 'Active',
    cta: 'Ambil Promo'
  });

  // Branding Customization local state
  const [brandName, setBrandName] = useState(currentTheme.name);
  const [brandTagline, setBrandTagline] = useState(currentTheme.tagline);
  const [brandPrimaryColor, setBrandPrimaryColor] = useState(currentTheme.primaryColor);
  const [brandLogoEmoji, setBrandLogoEmoji] = useState(currentTheme.logoEmoji);

  // Comms playground state
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [commsTargetType, setCommsTargetType] = useState<'appointment' | 'lead'>('appointment');
  const [selectedAppointmentCode, setSelectedAppointmentCode] = useState(appointments[0]?.booking_code || '');
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0]?.id || '');
  const [simulatedLog, setSimulatedLog] = useState<string[]>([]);

  // Detailed modal simulation
  const [selectedLeadDetails, setSelectedLeadDetails] = useState<Lead | null>(null);
  const [selectedAppointmentDetails, setSelectedAppointmentDetails] = useState<Appointment | null>(null);

  // Profile Form States
  const [profileName, setProfileName] = useState(currentAdmin?.name || '');
  const [profileEmail, setProfileEmail] = useState(currentAdmin?.email || '');
  const [profilePhoto, setProfilePhoto] = useState(currentAdmin?.photo || '');
  const [profilePassword, setProfilePassword] = useState('');
  const [profileConfirmPassword, setProfileConfirmPassword] = useState('');
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');

  React.useEffect(() => {
    if (currentAdmin) {
      setProfileName(currentAdmin.name);
      setProfileEmail(currentAdmin.email);
      setProfilePhoto(currentAdmin.photo || '');
    }
  }, [currentAdmin]);

  // Calculate stats
  const totalRevenue = appointments
    .filter(a => a.payment_status === 'Paid')
    .reduce((sum, a) => {
      const serviceObj = SEED_SERVICES.find(s => s.name === a.service);
      const fee = serviceObj ? serviceObj.promo_price || serviceObj.price_start : 500000;
      return sum + fee;
    }, 0);

  const pendingPaymentsNum = appointments.filter(a => a.status === 'Waiting Payment' || a.payment_status === 'Pending').length;
  const activeLeadsNum = leads.filter(l => l.status !== 'Lost' && l.status !== 'Completed').length;
  const leadConversionRate = leads.length > 0 
    ? Math.round((leads.filter(l => l.status === 'Consultation Booked' || l.status === 'Treatment Booked' || l.status === 'Visited' || l.status === 'Completed').length / leads.length) * 105) 
    : 0;

  // Custom add promo handler
  const handleAddNewPromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromo.name || !newPromo.description) {
      alert("Mohon isi nama promo dan deskripsinya!");
      return;
    }
    const discount = Math.round(((newPromo.normal_price - newPromo.promo_price) / newPromo.normal_price) * 100);
    const promoWithDiscount: Promo = {
      ...newPromo,
      discount_percent: discount > 0 ? discount : 0,
    };
    onAddPromo(promoWithDiscount);
    onAddAuditLog('Create Promo', `Promo baru '${newPromo.name}' berhasil dibuat dengan kuota ${newPromo.quota}`);
    setShowPromoModal(false);
    alert(`Promo '${newPromo.name}' berhasil dipublikasikan untuk cabang ${newPromo.branch.join(', ')}.`);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setProfileError('Ukuran file foto maksimal 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
        setProfileError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');

    if (!profileName.trim()) {
      setProfileError('Nama lengkap tidak boleh kosong');
      return;
    }
    if (!profileEmail.trim() || !profileEmail.includes('@')) {
      setProfileError('Format email tidak valid');
      return;
    }

    if (profilePassword) {
      if (profilePassword.length < 6) {
        setProfileError('Password baru minimal 6 karakter');
        return;
      }
      if (profilePassword !== profileConfirmPassword) {
        setProfileError('Konfirmasi password tidak cocok');
        return;
      }
    }

    if (onUpdateProfile) {
      onUpdateProfile({
        name: profileName.trim(),
        email: profileEmail.trim().toLowerCase(),
        photo: profilePhoto,
        password: profilePassword || undefined
      });
      setProfileSuccess('Profil admin berhasil diperbarui!');
      onAddAuditLog(
        'Update Profile', 
        `Memperbarui profil admin (${profileEmail})`, 
        currentAdmin?.name || 'Admin'
      );
      setProfilePassword('');
      setProfileConfirmPassword('');
    }
  };

  // Custom Theme Customizer submit
  const handleSaveBrandConfig = () => {
    onUpdateThemeConfig(themeId, {
      name: brandName,
      tagline: brandTagline,
      primaryColor: brandPrimaryColor,
      logoEmoji: brandLogoEmoji
    });
    onAddAuditLog('Theme Customization', `Mengubah branding untuk preset ${themeId} ke '${brandName}'`);
    alert(`Konfigurasi branding '${brandName}' berhasil diperbarui! Seluruh visual website akan langsung menyesuaikan.`);
  };

  // Whatsapp trigger simulation
  const handleSimulateSendComms = () => {
    const template = notificationTemplates[selectedTemplateIndex];
    if (!template) return;

    let targetName = '';
    let targetPhone = '';
    let content = template.content;

    if (commsTargetType === 'appointment') {
      const app = appointments.find(a => a.booking_code === selectedAppointmentCode);
      if (!app) {
        alert("Pilih appointment tujuan terlebih dahulu!");
        return;
      }
      targetName = app.patient_name;
      targetPhone = app.whatsapp;
      content = content
        .replace(/\{\{patient_name\}\}/g, app.patient_name)
        .replace(/\{\{booking_code\}\}/g, app.booking_code)
        .replace(/\{\{service_name\}\}/g, app.service)
        .replace(/\{\{doctor_name\}\}/g, app.doctor)
        .replace(/\{\{branch_name\}\}/g, app.branch)
        .replace(/\{\{appointment_date\}\}/g, app.date)
        .replace(/\{\{appointment_time\}\}/g, app.time)
        .replace(/\{\{clinic_name\}\}/g, brandName);
    } else {
      const ld = leads.find(l => l.id === selectedLeadId);
      if (!ld) {
        alert("Pilih data leads tujuan terlebih dahulu!");
        return;
      }
      targetName = ld.name;
      targetPhone = ld.whatsapp;
      content = content
        .replace(/\{\{lead_name\}\}/g, ld.name)
        .replace(/\{\{concern\}\}/g, ld.concern.join(', '))
        .replace(/\{\{recommended_service\}\}/g, ld.interest)
        .replace(/\{\{clinic_name\}\}/g, brandName);
    }

    const timestamp = new Date().toLocaleTimeString();
    const logMsg = `[${timestamp}] WhatsApp dikirim ke ${targetName} (${targetPhone}): "${content.substring(0, 100)}..."`;
    setSimulatedLog(prev => [logMsg, ...prev]);
    onAddAuditLog('Trigger Communication', `Simulasi pengiriman WhatsApp template '${template.name}' ke ${targetName}`);
    alert(`Pesan WhatsApp berhasil dikirimkan menggunakan simulator API Whatsapp!`);
  };

  // Quick Action triggers
  const handleApprovePayment = (code: string) => {
    onUpdateAppointmentStatus(code, 'Confirmed', 'Paid');
    onAddAuditLog('Approve Payment', `Verifikasi pembayaran lunas untuk kode booking ${code}`, 'Finance Admin');
    alert(`Pembayaran untuk booking ${code} disetujui! Status pendaftaran diubah menjadi Confirmed.`);
  };

  const handleSetArrived = (code: string) => {
    onUpdateAppointmentStatus(code, 'Completed');
    onAddAuditLog('Patient Checked In', `Pasien dengan order ${code} tiba di klinik dan pendaftaran ditandai selesai/Completed`, 'CS Anisa');
    alert(`Pasien ${code} berhasil melakukan Check-In. Status diubah menjadi Completed.`);
  };

  // Helper formatting for currency
  const formatIDR = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans border-t-4" style={{ borderColor: currentTheme.primaryColor }}>
      
      {/* HEADER BAR */}
      <div className="bg-slate-950 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{brandLogoEmoji}</div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-display tracking-tight text-white">{brandName}</h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black rounded-full px-2 py-0.5 border border-emerald-500/30">
                LIVE OPS
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold">{brandTagline}</p>
          </div>
        </div>

        {/* Brand Theme quick preset selection */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">Active Preset:</span>
          <select
            value={themeId}
            onChange={(e) => onThemeChange(e.target.value as ClinicThemeId)}
            className="bg-slate-800 text-slate-200 text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-700 cursor-pointer focus:ring-1 focus:ring-slate-500 animate-none"
          >
            {Object.keys(THEME_PRESETS).map((k) => (
              <option key={k} value={k}>
                {THEME_PRESETS[k].name}
              </option>
            ))}
          </select>

          <span className="text-slate-700">|</span>
          <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            {currentAdmin?.photo ? (
              isEmoji(currentAdmin.photo) ? (
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]">{currentAdmin.photo}</span>
              ) : (
                <img 
                  src={currentAdmin.photo} 
                  alt={currentAdmin.name} 
                  className="w-5 h-5 rounded-full object-cover border border-indigo-500/40"
                  referrerPolicy="no-referrer"
                />
              )
            ) : (
              <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]">👨‍⚕️</span>
            )}
            <span>Admin: <strong className="text-white font-extrabold">{currentAdmin?.name || 'Super Admin'}</strong></span>
            <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
              {currentAdmin?.role || 'Super Admin'}
            </span>
          </div>

          {onLogout && (
            <>
              <span className="text-slate-700">|</span>
              <button
                onClick={onLogout}
                className="bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-300 border border-rose-900/30 text-[10px] font-bold py-1 px-2.5 rounded-lg transition-all cursor-pointer"
              >
                Keluar
              </button>
            </>
          )}
        </div>
      </div>

      {/* DASHBOARD GRID CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[calc(100vh-73px)]">
        
        {/* SIDE BAR NAVIGATION */}
        <div className="lg:col-span-2 bg-slate-950 border-r border-slate-800 p-4 space-y-1">
          <div className="pb-4 mb-4 border-b border-slate-800">
            <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase">Admin System Menu</span>
          </div>

          {[
            { id: 'analytics', label: 'Overview Analytics', icon: Activity },
            { id: 'appointments', label: 'Appointments Booked', icon: Calendar },
            { id: 'crm', label: 'CRM Leads Engine', icon: Users },
            { id: 'promos', label: 'Promo Campaigns', icon: Award },
            { id: 'branding', label: 'Theme & Brand Stylist', icon: Sliders },
            { id: 'comms', label: 'WhatsApp Messenger', icon: MessageSquare },
            { id: 'security', label: 'Audit Security Logs', icon: ShieldAlert },
            { id: 'profile', label: 'Profile Saya', icon: User },
          ].map((item) => {
            const IconComponent = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold tracking-wide transition-all ${
                  isSelected 
                    ? 'text-white shadow-md shadow-indigo-900/10' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
                style={{ 
                  backgroundColor: isSelected ? `${currentTheme.primaryColor}20` : undefined,
                  borderLeft: isSelected ? `3px solid ${currentTheme.primaryColor}` : '3px solid transparent'
                }}
              >
                <IconComponent className="h-4 w-4 text-slate-400" style={{ color: isSelected ? currentTheme.primaryColor : undefined }} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-24 text-center">
            <div className="mx-auto inline-block p-3 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="block text-[10px] text-zinc-500 font-bold uppercase">System Security</span>
              <span className="text-[9px] font-black font-mono text-emerald-400">SSL ENCRYPTED</span>
            </div>
          </div>
        </div>

        {/* MAIN WORKSPACE PANEL */}
        <div className="lg:col-span-10 p-6 sm:p-8 space-y-8 overflow-y-auto animate-fade-in">
          
          {/* TAB 1: OVERVIEW ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 text-left">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white font-display">Overview Clinical Operations</h2>
                <p className="text-xs text-slate-400">Monitoring real-time business health, conversions, and booking statuses.</p>
              </div>

              {/* STAT CARDS ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">ESTIMASI OMSET LUNAS</span>
                    <span className="block text-xl font-black text-white mt-1 font-mono">{formatIDR(totalRevenue)}</span>
                    <span className="block text-[10px] text-emerald-400 mt-1 font-bold">✓ Dari booking status lunas</span>
                  </div>
                  <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">CONFIRMED APPOINTMENTS</span>
                    <span className="block text-xl font-black text-white mt-1 font-mono">
                      {appointments.filter(a => a.status === 'Confirmed').length} / {appointments.length}
                    </span>
                    <span className="block text-[10px] text-slate-500 mt-1">Total reservasi terdaftar</span>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">MENUNGGU PEMBAYARAN</span>
                    <span className="block text-xl font-black text-amber-400 mt-1 font-mono">
                      {pendingPaymentsNum} Booking
                    </span>
                    <span className="block text-[10px] text-slate-500 mt-1">Perlu review manual</span>
                  </div>
                  <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
                    <CreditCard className="h-5 w-5 animate-pulse" />
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">LEAD CONVERSION FUNNEL</span>
                    <span className="block text-xl font-black text-white mt-1 font-mono">
                      {leadConversionRate}%
                    </span>
                    <span className="block text-[10px] text-indigo-400 mt-1 font-bold">{activeLeadsNum} Lead aktif terlayani</span>
                  </div>
                  <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* CHARTS CONTAINER GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 1. VISUAL BAR CHART SVG: APPOINTMENTS BY DATE */}
                <div className="bg-slate-950 p-5 sm:p-6 rounded-2xl border border-slate-800/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase">Tren Harian Kunjungan Pasien</h3>
                      <p className="text-[10px] text-slate-500">Jumlah pendaftaran terkonfirmasi berdasarkan tanggal.</p>
                    </div>
                    <span className="text-[10px] text-indigo-400 font-bold bg-indigo-500/15 py-1 px-2.5 rounded-full border border-indigo-500/25">Live 7 Days</span>
                  </div>

                  {/* SVG Bar Chart */}
                  <div className="relative h-48 w-full flex items-end justify-between pt-6 border-b border-slate-800 pb-2">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[8px] font-bold text-slate-500 select-none z-10 pointer-events-none">
                      <span>4 Bks</span>
                      <span>2 Bks</span>
                      <span>0 Bks</span>
                    </div>

                    {/* Bars rendering */}
                    {['2026-06-03', '2026-06-04', '2026-06-05', '2026-06-06', '2026-06-07', '2026-06-08', '2026-06-09'].map((dateStr, idx) => {
                      const bookingsForDate = appointments.filter(a => a.date === dateStr);
                      const count = bookingsForDate.length;
                      // Heights calculations
                      const heightPercent = Math.max(10, Math.min(100, (count / 4) * 100));
                      
                      return (
                        <div key={dateStr} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer z-10 font-sans">
                          <div className="w-8 sm:w-10 rounded-t-lg transition-all duration-300 relative"
                            style={{ 
                              height: `${heightPercent}px`, 
                              backgroundColor: count > 0 ? currentTheme.primaryColor : '#1e293b'
                            }}
                          >
                            {/* Hover Tooltip */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-950 text-white rounded px-2 py-1 text-[8px] border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                              {count} Bookings
                            </div>
                          </div>
                          <span className="text-[9px] font-semibold text-slate-500 font-mono">
                            {dateStr.substring(8, 10)} Jun
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. SERVICES CONTRIBUTION GRID & RATINGS */}
                <div className="bg-slate-950 p-5 sm:p-6 rounded-2xl border border-slate-800/80 space-y-4">
                  <div>
                    <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase">Kontribusi Popularitas Treatment</h3>
                    <p className="text-[10px] text-slate-500">Distribusi sebaran booking berdasarkan treatment yang dipilih pasien.</p>
                  </div>

                  <div className="space-y-3">
                    {SEED_SERVICES.map(svc => {
                      const count = appointments.filter(a => a.service === svc.name).length;
                      const percentage = Math.round((count / (appointments.length || 1)) * 100);

                      return (
                        <div key={svc.name} className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-semibold">
                            <span className="text-slate-300 truncate max-w-[200px]">{svc.name}</span>
                            <div className="flex gap-2">
                              <span className="text-slate-400 font-mono">{count} Booking</span>
                              <span className="text-indigo-400 font-mono font-bold">({percentage}%)</span>
                            </div>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500" 
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: currentTheme.primaryColor
                              }} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* DEMO INSTRUCTIONS AND SHORTCUTS */}
              <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 max-w-xl">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-yellow-400" />
                    Bagaimana Cara Menguji Aplikasi Ini?
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                    Klinik Digital Pro memiliki sistem backend simulasi reaktif. Anda dapat berpindah ke tab <strong>Patient Appointments Manager</strong> untuk menyetujui pembayaran, membatalkan, atau mengubah status reservasi. Anda juga bisa membuka <strong>CRM Leads Engine</strong> untuk berinteraksi dengan Leads pasca pengerjaan Skin Quiz pasien.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button 
                    onClick={() => setActiveTab('appointments')} 
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer leading-none"
                  >
                    Manage Bookings <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PATIENT APPOINTMENTS MANAGER */}
          {activeTab === 'appointments' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white font-display">Manage Appointments Booked</h2>
                  <p className="text-xs text-slate-400">Konfirmasi booking fee, check in kedatangan pasien, atur status pelayanan medis.</p>
                </div>
                <button
                  onClick={() => {
                    const code = `AMB-2026-000${appointments.length + 1}`;
                    const randomSvc = SEED_SERVICES[Math.floor(Math.random() * SEED_SERVICES.length)];
                    const randomDoc = SEED_DOCTORS[Math.floor(Math.random() * SEED_DOCTORS.length)];
                    onAddPromo({
                      name: "Dynamic Mock Trigger",
                      description: "Generated dynamically from Admin Dashboard",
                      service: randomSvc.name,
                      normal_price: randomSvc.price_start,
                      promo_price: randomSvc.promo_price || randomSvc.price_start * 0.9,
                      discount_percent: 10,
                      start_date: "2026-06-03",
                      end_date: "2026-06-30",
                      quota: 10,
                      branch: [SEED_BRANCHES[0].name],
                      status: "Active",
                      cta: "Booking Now"
                    });
                    alert("Mock scheduler ran successfully to sync quotas.");
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  🚀 Run Sync Scheduler
                </button>
              </div>

              {/* SEARCH & FILTER CONTROLS */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari kode booking or nama pasien..."
                    value={appointmentSearch}
                    onChange={(e) => setAppointmentSearch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs font-medium text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="flex gap-2.5">
                  <select
                    value={appointmentStatusFilter}
                    onChange={(e) => setAppointmentStatusFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold px-3 py-2 cursor-pointer focus:outline-none text-slate-200"
                  >
                    <option value="all">Semua Status</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Rescheduled">Rescheduled</option>
                  </select>

                  <select
                    value={appointmentBranchFilter}
                    onChange={(e) => setAppointmentBranchFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold px-3 py-2 cursor-pointer focus:outline-none text-slate-200"
                  >
                    <option value="all">Semua Cabang</option>
                    {SEED_BRANCHES.map(b => (
                      <option key={b.name} value={b.name}>{b.city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* APPOINTMENTS LIST */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900/60 text-slate-400 text-[10px] font-black uppercase tracking-wider border-b border-slate-800">
                        <th className="p-4">Booking Info</th>
                        <th className="p-4">Patient Profile</th>
                        <th className="p-4">Treatment &amp; Doctor</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-xs font-semibold">
                      {appointments
                        .filter(a => {
                          const matchesSearch = a.booking_code.toLowerCase().includes(appointmentSearch.toLowerCase()) || 
                                                a.patient_name.toLowerCase().includes(appointmentSearch.toLowerCase());
                          const matchesStatus = appointmentStatusFilter === 'all' || a.status === appointmentStatusFilter;
                          const matchesBranch = appointmentBranchFilter === 'all' || a.branch === appointmentBranchFilter;
                          return matchesSearch && matchesStatus && matchesBranch;
                        })
                        .map((app) => (
                          <tr key={app.booking_code} className="hover:bg-slate-900/40 transition-colors">
                            <td className="p-4 space-y-1">
                              <span className="inline-block px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-bold text-[10px] border border-slate-700">
                                {app.booking_code}
                              </span>
                              <div className="text-[10px] text-zinc-400 font-bold block">{app.date} @ {app.time}</div>
                              <div className="text-[9px] text-slate-500 font-semibold">{app.branch}</div>
                            </td>
                            <td className="p-4">
                              <div className="text-white font-bold">{app.patient_name}</div>
                              <div className="text-[10px] text-zinc-400">{app.whatsapp}</div>
                              <div className="text-[10px] text-zinc-500">{app.email}</div>
                            </td>
                            <td className="p-4">
                              <div className="text-slate-200">{app.service}</div>
                              <div className="text-[10px] text-zinc-400">{app.doctor}</div>
                            </td>
                            <td className="p-4 text-center">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                app.status === 'Confirmed' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                                app.status === 'Completed' ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30' :
                                app.status === 'Pending' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                                app.status === 'Cancelled' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' :
                                'bg-slate-800 text-slate-400'
                              }`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="font-mono text-slate-200 text-[11px] font-bold">
                                {formatIDR(app.payment_fee)}
                              </div>
                              <span className={`inline-block text-[9px] font-black uppercase tracking-wider mt-0.5 ${
                                app.payment_status === 'Paid' ? 'text-emerald-400' : 'text-amber-400'
                              }`}>
                                ● {app.payment_status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedAppointmentDetails(app)}
                                  title="View Details"
                                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </button>
                                
                                {app.payment_status !== 'Paid' && (
                                  <button
                                    onClick={() => handleApprovePayment(app.booking_code)}
                                    title="Approve Lunas"
                                    className="px-2 py-1 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/35 rounded text-[10px] font-extrabold cursor-pointer border border-emerald-500/30"
                                  >
                                    Set Paid
                                  </button>
                                )}

                                {app.status === 'Confirmed' && (
                                  <button
                                    onClick={() => handleSetArrived(app.booking_code)}
                                    className="px-2 py-1 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/35 rounded text-[10px] font-extrabold cursor-pointer border border-indigo-500/30"
                                  >
                                    Check-In
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CRM LEADS ENGINE */}
          {activeTab === 'crm' && (
            <div className="space-y-6 text-left">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white font-display">CRM Leads Pipeline Router</h2>
                <p className="text-xs text-slate-400">Kualifikasi prospek kecantikan dari hasil diagnostic Skin Quiz. Tentukan prioritas follow-up CS.</p>
              </div>

              {/* CONTROLS */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari prospek (nama/whatsapp/minat)..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs font-medium text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold px-3 py-2 cursor-pointer focus:outline-none text-slate-200"
                >
                  <option value="all">Semua Status Prospek</option>
                  <option value="Hot Lead">🔥 Hot Lead</option>
                  <option value="Warm Lead">⚡ Warm Lead</option>
                  <option value="Cold Lead">Cold Lead</option>
                  <option value="Treatment Booked">Treatment Booked</option>
                  <option value="Visited">Visited</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              {/* LEADS LIST CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leads
                  .filter(l => {
                    const matchesSearch = l.name.toLowerCase().includes(leadSearch.toLowerCase()) || 
                                          l.interest.toLowerCase().includes(leadSearch.toLowerCase()) ||
                                          (l.whatsapp && l.whatsapp.includes(leadSearch));
                    const matchesStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
                    return matchesSearch && matchesStatus;
                  })
                  .map((ld) => {
                    // Match score classification color
                    const scoreColor = ld.lead_score >= 85 ? 'text-red-400 bg-red-500/10 border-red-500/25' : 
                                       ld.lead_score >= 70 ? 'text-amber-400 bg-amber-500/10 border-amber-500/25' : 
                                       'text-blue-400 bg-blue-500/10 border-blue-500/25';

                    return (
                      <div key={ld.id} className="bg-slate-950 rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h3 className="font-bold text-white text-sm">{ld.name}</h3>
                                {ld.age && <span className="text-[10px] text-zinc-500">({ld.age} th)</span>}
                              </div>
                              <span className="text-[10px] text-indigo-400 font-bold block">{ld.source}</span>
                            </div>

                            <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${scoreColor}`}>
                              SCORE {ld.lead_score}
                            </span>
                          </div>

                          {/* Concerns Tag */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {ld.concern.map(conc => (
                              <span key={conc} className="bg-slate-800 text-slate-300 text-[9px] px-2 py-0.5 rounded font-bold">
                                {conc}
                              </span>
                            ))}
                          </div>

                          <div className="space-y-2 border-t border-slate-900 pt-3 text-[11px]">
                            <div className="flex justify-between text-slate-400">
                              <span>Interest Service:</span>
                              <span className="text-white font-bold">{ld.interest}</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                              <span>Cabang Pref:</span>
                              <span className="text-slate-300 font-bold">{ld.branch_interest}</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                              <span>Budget:</span>
                              <span className="text-emerald-400 font-bold">{ld.budget}</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                              <span>Status:</span>
                              <select
                                value={ld.status}
                                onChange={(e) => {
                                  onUpdateLeadStatus(ld.id, e.target.value as LeadStatus);
                                  onAddAuditLog('Lead Status Update', `Prospek ${ld.name} diubah statusnya menjadi ${e.target.value}`);
                                }}
                                className="bg-slate-900 text-[10px] py-0.5 px-2 border border-slate-700 rounded-md font-bold text-slate-200 cursor-pointer focus:outline-none"
                              >
                                <option value="New Lead">New Lead</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Hot Lead">Hot Lead</option>
                                <option value="Warm Lead">Warm Lead</option>
                                <option value="Cold Lead">Cold Lead</option>
                                <option value="Consultation Booked">Consultation Booked</option>
                                <option value="Treatment Booked">Treatment Booked</option>
                                <option value="Visited">Visited</option>
                                <option value="Completed">Completed</option>
                                <option value="Lost">Lost</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-900 flex justify-between gap-2">
                          <button
                            onClick={() => setSelectedLeadDetails(ld)}
                            className="flex-1 py-2 bg-slate-900 border border-slate-800 rounded-lg text-[10px] text-slate-300 font-bold transition hover:bg-slate-850 flex items-center justify-center gap-1.5 cursor-pointer leading-none"
                          >
                            <Eye className="h-3 w-3" /> Info Detail
                          </button>

                          <button
                            onClick={() => {
                              setCommsTargetType('lead');
                              setSelectedLeadId(ld.id);
                              const templateIdx = notificationTemplates.findIndex(n => n.name.includes("Follow-Up"));
                              if (templateIdx !== -1) setSelectedTemplateIndex(templateIdx);
                              setActiveTab('comms');
                            }}
                            className="flex-1 py-2 bg-emerald-600/10 border border-emerald-500/25 rounded-lg text-[10px] text-emerald-400 font-black transition hover:bg-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer leading-none"
                          >
                            <Send className="h-3 w-3" /> F/U Whatsapp
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* TAB 4: PROMO CAMPAIGNS */}
          {activeTab === 'promos' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white font-display">Promo &amp; Packages Manager</h2>
                  <p className="text-xs text-slate-400">Atur kuota flash sale diskon tindakan kecantikan, kelola pendaftaran paket hemat.</p>
                </div>
                <button
                  onClick={() => setShowPromoModal(true)}
                  className="px-4 py-2.5 rounded-xl text-white text-xs font-bold font-sans tracking-wide transition cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: currentTheme.primaryColor }}
                >
                  <Plus className="h-4 w-4" /> Tambah Campaign Baru
                </button>
              </div>

              {/* LIST OF PROMOS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {promos.map((pr) => (
                  <div key={pr.name} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between animate-fade-in">
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] text-indigo-400 font-extrabold uppercase">CAMPAIGN FLASH SALE</span>
                          <h3 className="text-sm font-black text-white mt-1">{pr.name}</h3>
                        </div>
                        <span className="bg-indigo-600 font-mono text-[10px] font-black px-2.5 py-1 rounded text-white shrink-0">
                          SEMAT-DISK {pr.discount_percent}%
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-semibold">{pr.description}</p>

                      <div className="grid grid-cols-2 gap-4 pt-2 text-[11px] font-semibold border-t border-slate-900">
                        <div>
                          <span className="text-slate-500 block text-[9px] uppercase">Normal Price:</span>
                          <span className="text-slate-300 block font-mono line-through">{formatIDR(pr.normal_price)}</span>
                        </div>
                        <div>
                          <span className="text-emerald-400 block text-[9px] uppercase">Promo Price:</span>
                          <span className="text-white block font-mono font-bold text-sm" style={{ color: currentTheme.primaryColor }}>{formatIDR(pr.promo_price)}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-semibold">
                          <span className="text-slate-500">Sisa Kuota:</span>
                          <span className="text-slate-200">{pr.quota} Kursi</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={pr.quota}
                            onChange={(e) => onUpdatePromoQuota(pr.name, parseInt(e.target.value))}
                            className="flex-1 accent-indigo-600 h-1 cursor-pointer bg-slate-800 rounded-lg outline-none"
                          />
                          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">{pr.quota}</span>
                        </div>
                      </div>

                      <div className="pt-2 text-[10px] text-slate-500 flex justify-between font-bold">
                        <span>Periode: {pr.start_date} s/d {pr.end_date}</span>
                        <span>Status: <strong className={pr.status === 'Active' ? 'text-emerald-400' : 'text-slate-400'}>{pr.status}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BRAND DESIGNER & THEME CONFIGURATION */}
          {activeTab === 'branding' && (
            <div className="space-y-6 text-left">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white font-display">Theme &amp; Brand Stylist Designer</h2>
                <p className="text-xs text-slate-400">Atur kustomisasi emoji logo, warna primer, meta-data jargon tanpa mengubah file kode static.</p>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 max-w-2xl space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400">Nama Klinik / Brand:</label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg text-xs font-semibold p-2.5 focus:outline-none focus:border-indigo-600 text-slate-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400">Brand Tagline / Slogan:</label>
                    <input
                      type="text"
                      value={brandTagline}
                      onChange={(e) => setBrandTagline(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg text-xs font-semibold p-2.5 focus:outline-none focus:border-indigo-600 text-slate-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400">Identitas Emoji Logo:</label>
                    <input
                      type="text"
                      value={brandLogoEmoji}
                      onChange={(e) => setBrandLogoEmoji(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg text-xs font-semibold p-2.5 focus:outline-none focus:border-indigo-600 text-slate-100 placeholder-zinc-500"
                    />
                    <span className="block text-[10px] text-zinc-500">Gunakan emoji bawaan sistem (contoh: ✨, 🌿, 🥼, 🌸)</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400">Warna Aksen / Primer (Hex):</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={brandPrimaryColor}
                        onChange={(e) => setBrandPrimaryColor(e.target.value)}
                        className="h-9 w-9 bg-slate-900 border border-slate-700 rounded cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={brandPrimaryColor}
                        onChange={(e) => setBrandPrimaryColor(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono font-bold p-2 focus:outline-none focus:border-indigo-600 text-slate-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900 flex justify-end">
                  <button
                    onClick={handleSaveBrandConfig}
                    className="px-6 py-3 rounded-xl text-xs font-bold text-white transition cursor-pointer flex items-center justify-center gap-2"
                    style={{ backgroundColor: currentTheme.primaryColor }}
                  >
                    <Check className="h-4 w-4" /> Simpan Perubahan Visual
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: COMMUNICATION TEMPLATES PLAYGROUND */}
          {activeTab === 'comms' && (
            <div className="space-y-6 text-left">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white font-display">WhatsApp Notification Simulator</h2>
                <p className="text-xs text-slate-400">Gunakan template trigger chat automation untuk mengirim pesan verifikasi invoice lunas, aftercare, atau penawaran skin quiz.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* TEMPLATE PARAMETERS */}
                <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
                  <h3 className="text-slate-300 font-bold text-sm">1. Pilih Template &amp; Target Pasien</h3>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 block">Template WhatsApp:</label>
                    <select
                      value={selectedTemplateIndex}
                      onChange={(e) => setSelectedTemplateIndex(parseInt(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold p-2.5 focus:outline-none text-slate-200"
                    >
                      {notificationTemplates.map((nt, idx) => (
                        <option key={nt.name} value={idx}>{nt.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] text-slate-500 font-black block tracking-widest uppercase">Target Hubungan / Penerima</span>
                    
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-300">
                        <input
                          type="radio"
                          name="targetType"
                          checked={commsTargetType === 'appointment'}
                          onChange={() => setCommsTargetType('appointment')}
                          className="accent-indigo-600"
                        />
                        Data Kunjungan Medis
                      </label>
                      <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-300">
                        <input
                          type="radio"
                          name="targetType"
                          checked={commsTargetType === 'lead'}
                          onChange={() => setCommsTargetType('lead')}
                          className="accent-indigo-600"
                        />
                        CRM Leads (Quiz)
                      </label>
                    </div>

                    {commsTargetType === 'appointment' ? (
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-500 font-semibold block">Pilih Appointment:</label>
                        <select
                          value={selectedAppointmentCode}
                          onChange={(e) => setSelectedAppointmentCode(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg text-xs font-medium p-2 focus:outline-none text-slate-200"
                        >
                          {appointments.map(a => (
                            <option key={a.booking_code} value={a.booking_code}>
                              [{a.booking_code}] {a.patient_name} - {a.service}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-500 font-semibold block">Pilih Leads Prospek:</label>
                        <select
                          value={selectedLeadId}
                          onChange={(e) => setSelectedLeadId(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg text-xs font-medium p-2 focus:outline-none text-slate-200"
                        >
                          {leads.map(l => (
                            <option key={l.id} value={l.id}>
                              {l.name} ({l.interest})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-900">
                    <button
                      onClick={handleSimulateSendComms}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4 animate-bounce" /> Kirim Simulasi WA Broadcast
                    </button>
                  </div>
                </div>

                {/* TEMPLATE LIVE FEEDBACK */}
                <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
                  <div className="p-6">
                    <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest block">2. Tampilan Pratinjau Chat Mockup</span>
                    
                    <div className="mt-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed space-y-4 shadow-inner max-w-md mx-auto">
                      <div className="flex justify-between border-b border-slate-800 pb-2 text-[9px] text-zinc-500">
                        <span>Pesan WhatsApp API</span>
                        <span>08.00 WIB</span>
                      </div>
                      <p className="whitespace-pre-line text-xs font-medium font-sans">
                        {(() => {
                          const template = notificationTemplates[selectedTemplateIndex];
                          if (!template) return "...";
                          let cont = template.content;
                          if (commsTargetType === 'appointment') {
                            const app = appointments.find(a => a.booking_code === selectedAppointmentCode) || appointments[0];
                            if (!app) return cont;
                            return cont
                              .replace(/\{\{patient_name\}\}/g, app.patient_name)
                              .replace(/\{\{booking_code\}\}/g, app.booking_code)
                              .replace(/\{\{service_name\}\}/g, app.service)
                              .replace(/\{\{doctor_name\}\}/g, app.doctor)
                              .replace(/\{\{branch_name\}\}/g, app.branch)
                              .replace(/\{\{appointment_date\}\}/g, app.date)
                              .replace(/\{\{appointment_time\}\}/g, app.time)
                              .replace(/\{\{clinic_name\}\}/g, brandName);
                          } else {
                            const ld = leads.find(l => l.id === selectedLeadId) || leads[0];
                            if (!ld) return cont;
                            return cont
                              .replace(/\{\{lead_name\}\}/g, ld.name)
                              .replace(/\{\{concern\}\}/g, ld.concern.join(', '))
                              .replace(/\{\{recommended_service\}\}/g, ld.interest)
                              .replace(/\{\{clinic_name\}\}/g, brandName);
                          }
                        })()}
                      </p>
                    </div>
                  </div>

                  {/* COMM HISTORY SIMULATED RECORDS */}
                  <div className="p-5 bg-slate-900/40 text-left border-t border-slate-900 flex-1">
                    <span className="text-[10px] text-slate-500 font-bold block mb-3 uppercase tracking-wider">Histori Aktivitas Chat Keluar (Terminal Logs):</span>
                    {simulatedLog.length === 0 ? (
                      <span className="text-xs text-slate-500 italic block py-4 text-center">Belum ada log pesan dikirim dlm sesi ini.</span>
                    ) : (
                      <div className="font-mono text-[10px] text-emerald-400 bg-slate-950 p-4 border border-slate-800 rounded-xl space-y-1.5 h-32 overflow-y-auto">
                        {simulatedLog.map((log, idx) => (
                          <div key={idx} className="leading-relaxed leading-tight text-left">
                            {log}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 7: SECURITY SYSTEM AUDIT LOGS */}
          {activeTab === 'security' && (
            <div className="space-y-6 text-left">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white font-display">Security Integrity Hub &amp; Logs</h2>
                <p className="text-xs text-slate-400">Catatan autentikasi operasional, pemantauan riwayat update CRM, ekspor-impor cadangan database.</p>
              </div>

              {/* AUDIT LOGS VIEW */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase">Audit Records</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Cari logs detail..."
                      value={auditSearch}
                      onChange={(e) => setAuditSearch(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs py-1.5 px-3 rounded-lg focus:outline-none text-slate-100"
                    />
                    <select
                      value={auditUserFilter}
                      onChange={(e) => setAuditUserFilter(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs font-bold py-1.5 px-2.5 rounded-lg focus:outline-none cursor-pointer text-slate-200"
                    >
                      <option value="all">Semua Staff</option>
                      {adminUsers.map(au => (
                        <option key={au.name} value={au.name}>{au.name} ({au.role})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="font-mono text-xs text-slate-400 space-y-2 border border-slate-900 p-4 rounded-xl bg-slate-950 h-96 overflow-y-auto">
                  {auditLogs
                    .filter(log => {
                      const matchesSearch = log.action.toLowerCase().includes(auditSearch.toLowerCase()) || 
                                            log.details.toLowerCase().includes(auditSearch.toLowerCase());
                      const matchesUser = auditUserFilter === 'all' || log.user === auditUserFilter;
                      return matchesSearch && matchesUser;
                    })
                    .map((log, idx) => (
                      <div key={idx} className="border-b border-slate-900/60 pb-2 text-left hover:text-white transition-colors">
                        <span className="text-indigo-400 font-bold block sm:inline mr-2">[{log.timestamp}]</span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 font-bold rounded px-1.5 mr-2">{log.user} ({log.role})</span>
                        <strong className="text-yellow-400" style={{ color: currentTheme.primaryColor }}>{log.action}</strong>: {log.details}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: PROFILE MANAGEMENT */}
          {activeTab === 'profile' && (
            <div className="space-y-6 text-left">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white font-display">Pengaturan Profile Saya</h2>
                <p className="text-xs text-slate-400">Kelola identitas administrasi Anda, perbarui foto profil, email, dan amankan kata sandi akun.</p>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg max-w-2xl">
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  
                  {/* Foto Profil / Avatar */}
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">Foto Profil Admin</span>
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      {/* Avatar preview */}
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-indigo-500/30 flex items-center justify-center overflow-hidden shadow-inner shrink-0">
                          {profilePhoto ? (
                            isEmoji(profilePhoto) ? (
                              <span className="text-4xl">{profilePhoto}</span>
                            ) : (
                              <img 
                                src={profilePhoto} 
                                alt="Profile Preview" 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            )
                          ) : (
                            <span className="text-4xl">👨‍⚕️</span>
                          )}
                        </div>
                        <label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                          <Camera className="h-5 w-5" />
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handlePhotoUpload} 
                            className="hidden" 
                          />
                        </label>
                      </div>

                      {/* Photo actions / presets */}
                      <div className="flex-1 space-y-3 w-full text-center sm:text-left">
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                          <label className="cursor-pointer bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 text-slate-300 text-[10px] font-bold py-1.5 px-3 rounded-lg transition-all flex items-center gap-1">
                            <Camera className="h-3 w-3" /> Upload Foto Baru
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handlePhotoUpload} 
                              className="hidden" 
                            />
                          </label>

                          {profilePhoto && (
                            <button
                              type="button"
                              onClick={() => setProfilePhoto('')}
                              className="bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/30 text-rose-400 hover:text-rose-300 text-[10px] font-bold py-1.5 px-3 rounded-lg transition-all"
                            >
                              Hapus Foto
                            </button>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500">Mendukung format PNG, JPG, atau WEBP. Rekomendasi rasio 1:1, maks 2MB.</p>
                        
                        {/* Custom emoji quick selection */}
                        <div className="pt-2">
                          <span className="block text-[9px] text-slate-500 font-bold uppercase mb-1">Atau Pilih Avatar Preset:</span>
                          <div className="flex gap-2 justify-center sm:justify-start">
                            {['👨‍⚕️', '👩‍⚕️', '👩‍🔬', '👩‍💼', '⭐️', '🩺'].map((emoji) => (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => {
                                  setProfilePhoto(emoji);
                                }}
                                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition flex items-center justify-center text-lg cursor-pointer"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-800" />

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-bold text-xs block">Nama Lengkap:</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                          <User className="h-4 w-4" />
                        </span>
                        <input
                          type="text"
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-indigo-500 text-slate-100"
                          placeholder="Super Admin"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-bold text-xs block">Alamat Email:</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                          <Mail className="h-4 w-4" />
                        </span>
                        <input
                          type="email"
                          value={profileEmail}
                          onChange={(e) => setProfileEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-indigo-500 text-slate-100"
                          placeholder="admin@auroramedbeauty.id"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password updates */}
                  <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-4 space-y-4">
                    <div>
                      <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
                        <Lock className="h-4 w-4 text-indigo-400" /> Pengamanan Kata Sandi (Password)
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Kosongkan jika Anda tidak ingin mengganti kata sandi saat ini.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-slate-400 font-bold text-xs block">Kata Sandi Baru:</label>
                        <input
                          type="password"
                          value={profilePassword}
                          onChange={(e) => setProfilePassword(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-indigo-500 text-slate-100 placeholder-slate-600"
                          placeholder="Minimal 6 karakter"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-400 font-bold text-xs block">Konfirmasi Kata Sandi:</label>
                        <input
                          type="password"
                          value={profileConfirmPassword}
                          onChange={(e) => setProfileConfirmPassword(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-indigo-500 text-slate-100 placeholder-slate-600"
                          placeholder="Konfirmasi password baru"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Error / Success Feedback */}
                  {profileError && (
                    <div className="bg-rose-950/40 border border-rose-900/30 text-rose-400 p-3 rounded-xl text-xs font-semibold">
                      ⚠️ {profileError}
                    </div>
                  )}

                  {profileSuccess && (
                    <div className="bg-emerald-950/40 border border-emerald-900/30 text-emerald-400 p-3 rounded-xl text-xs font-semibold">
                      ✓ {profileSuccess}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs text-white font-black rounded-xl cursor-pointer shadow-lg hover:opacity-90 transition-all"
                      style={{ backgroundColor: currentTheme.primaryColor }}
                    >
                      Simpan Perubahan Profile
                    </button>
                  </div>

                </form>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* DETAIL MODAL FOR LEADS */}
      {selectedLeadDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full max-w-md space-y-4 text-left">
            <div className="flex justify-between items-start border-b border-slate-900 pb-3">
              <div>
                <span className="text-[10px] text-indigo-400 font-black tracking-widest block uppercase">DETAIL CRM LEAD PROFILE</span>
                <h3 className="text-base font-black text-white mt-1">{selectedLeadDetails.name}</h3>
              </div>
              <button onClick={() => setSelectedLeadDetails(null)} className="p-1 hover:bg-slate-800 rounded font-bold text-slate-400 hover:text-white cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300 font-sans">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">ID Prospek:</span>
                  <span className="text-white font-mono font-bold block">{selectedLeadDetails.id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">Skor Kualifikasi:</span>
                  <span className="text-red-400 block font-bold">{selectedLeadDetails.lead_score} Pts</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">WhatsApp:</span>
                  <span className="text-zinc-300 block">{selectedLeadDetails.whatsapp}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">Email:</span>
                  <span className="text-zinc-300 block truncate">{selectedLeadDetails.email}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block text-[9px] uppercase">Keluhan / Concern Utama Pasien:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedLeadDetails.concern.map(c => (
                    <span key={c} className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-850 space-y-1">
                <span className="text-slate-400 block text-[9px] uppercase">Histori Catatan / Follow-Up Note:</span>
                <p className="text-slate-300 text-[10px] leading-relaxed">{selectedLeadDetails.notes}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">Layanan Minat:</span>
                  <span className="text-white font-bold block">{selectedLeadDetails.interest}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">Asisten Admin:</span>
                  <span className="text-slate-300 block">{selectedLeadDetails.assigned_admin}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-900 flex justify-end">
              <button
                onClick={() => setSelectedLeadDetails(null)}
                className="px-5 py-2.5 bg-slate-930 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition border border-slate-800 cursor-pointer"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL FOR APPOINTMENTS */}
      {selectedAppointmentDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full max-w-md space-y-4 text-left">
            <div className="flex justify-between items-start border-b border-slate-900 pb-3">
              <div>
                <span className="text-[10px] text-indigo-400 font-black tracking-widest block uppercase">DETAIL REKAM REGISTER TIKET</span>
                <h3 className="text-base font-black text-white mt-1">{selectedAppointmentDetails.patient_name}</h3>
              </div>
              <button onClick={() => setSelectedAppointmentDetails(null)} className="p-1 hover:bg-slate-800 rounded font-bold text-slate-400 hover:text-white cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 font-sans">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">Kode Booking:</span>
                  <span className="text-white font-mono font-bold block">{selectedAppointmentDetails.booking_code}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">Status Check-in:</span>
                  <span className="text-white font-bold block">{selectedAppointmentDetails.status}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">Tgl Reservasi:</span>
                  <span className="text-zinc-300 block">{selectedAppointmentDetails.date} @ {selectedAppointmentDetails.time} WIB</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">Pilihan Cabang:</span>
                  <span className="text-zinc-300 block">{selectedAppointmentDetails.branch}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block text-[9px] uppercase">Keluhan Awal Pasien:</span>
                <p className="text-zinc-300 leading-relaxed font-semibold">{selectedAppointmentDetails.initial_complaint || "-"}</p>
              </div>

              <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-850 space-y-1">
                <span className="text-slate-400 block text-[9px] uppercase">Informasi Klinik / Catatan Tambahan:</span>
                <p className="text-slate-300 text-[10px] leading-relaxed">{selectedAppointmentDetails.notes || "Tidak ada catatan internal dari admin."}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-900">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">Layanan Tindakan:</span>
                  <span className="text-white font-bold block">{selectedAppointmentDetails.service}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">Pendamping:</span>
                  <span className="text-slate-300 block">{selectedAppointmentDetails.doctor}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-900 flex justify-end">
              <button
                onClick={() => setSelectedAppointmentDetails(null)}
                className="px-5 py-2.5 bg-slate-935 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition border border-slate-800 cursor-pointer"
              >
                Tutup Pintu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW PROMO MODAL FORM */}
      {showPromoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full max-w-md space-y-4 text-left">
            <div className="flex justify-between items-start border-b border-slate-900 pb-3">
              <h3 className="text-base font-black text-white">Buat Campaign Promo Baru</h3>
              <button onClick={() => setShowPromoModal(false)} className="p-1 hover:bg-slate-800 rounded font-bold text-slate-400 hover:text-white cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddNewPromoSubmit} className="space-y-4 text-xs text-left">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-bold block">Nama Campaign Promo:</label>
                <input
                  type="text"
                  placeholder="Contoh: Glowing Merdeka Promo"
                  value={newPromo.name}
                  onChange={(e) => setNewPromo({...newPromo, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-indigo-600 text-slate-100 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-bold block">Deskripsi Singkat:</label>
                <textarea
                  placeholder="Tulis detail promosi Anda di sini..."
                  value={newPromo.description}
                  onChange={(e) => setNewPromo({...newPromo, description: e.target.value})}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 focus:outline-none focus:border-indigo-600 text-slate-100 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold block">Pilihan Layanan:</label>
                  <select
                    value={newPromo.service}
                    onChange={(e) => {
                      const svc = SEED_SERVICES.find(s => s.name === e.target.value);
                      setNewPromo({
                        ...newPromo, 
                        service: e.target.value,
                        normal_price: svc ? svc.price_start : 500000,
                        promo_price: svc ? svc.promo_price || svc.price_start * 0.8 : 400000
                      });
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 focus:outline-none text-slate-200 font-bold"
                  >
                    {SEED_SERVICES.map(s => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold block">Target Kuota:</label>
                  <input
                    type="number"
                    value={newPromo.quota}
                    onChange={(e) => setNewPromo({...newPromo, quota: parseInt(e.target.value) || 0})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 focus:outline-none text-slate-100 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold block">Harga Normal (IDR):</label>
                  <input
                    type="number"
                    value={newPromo.normal_price}
                    onChange={(e) => setNewPromo({...newPromo, normal_price: parseInt(e.target.value) || 0})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 focus:outline-none text-slate-100 font-mono font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold block">Harga Diskon Promo (IDR):</label>
                  <input
                    type="number"
                    value={newPromo.promo_price}
                    onChange={(e) => setNewPromo({...newPromo, promo_price: parseInt(e.target.value) || 0})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 focus:outline-none text-slate-100 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold block">Tanggal Mulai:</label>
                  <input
                    type="date"
                    value={newPromo.start_date}
                    onChange={(e) => setNewPromo({...newPromo, start_date: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 focus:outline-none text-slate-100 font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 font-bold block">Tanggal Selesai:</label>
                  <input
                    type="date"
                    value={newPromo.end_date}
                    onChange={(e) => setNewPromo({...newPromo, end_date: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 focus:outline-none text-slate-100 font-bold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-950 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPromoModal(false)}
                  className="px-4 py-2.5 bg-slate-900 text-slate-300 font-bold hover:bg-slate-850 rounded-xl cursor-pointer border border-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-white font-black rounded-xl cursor-pointer shadow-lg hover:opacity-90 transition leading-none text-xs"
                  style={{ backgroundColor: currentTheme.primaryColor }}
                >
                  Publikasikan Promo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
