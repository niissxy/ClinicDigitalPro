/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, ShieldCheck, Heart, User, LayoutDashboard, Globe, ClipboardList, PenTool, Sun, Moon 
} from 'lucide-react';
import { 
  ClinicThemeId, LanguageId, Service, Doctor, Promo, BeforeAfterCase,
  FAQ, Appointment, AppointmentStatus, PaymentStatus, Lead, LeadStatus,
  AdminUser, PaymentLog, NotificationTemplate, AuditLog, ThemeConfig
} from './types';
import { 
  SEED_CLINIC_BASE, SEED_BRANCHES, SEED_CATEGORIES, SEED_SERVICES, SEED_DOCTORS,
  SEED_APPOINTMENTS, SEED_LEADS, SEED_PROMOS, SEED_MEMBERSHIPS, SEED_BEFORE_AFTER,
  SEED_TESTIMONIALS, SEED_BLOGS, SEED_FAQS, SEED_ADMIN_USERS, SEED_PAYMENT_LOGS,
  NOTIFICATION_TEMPLATES, INITIAL_AUDIT_LOGS, THEME_PRESETS
} from './data/seedData';

// Component Imports
import PublicWebsite from './components/PublicWebsite';
import BookingWizard from './components/BookingWizard';
import InteractiveQuiz from './components/InteractiveQuiz';
import PatientPortal from './components/PatientPortal';
import AdminDashboard from './components/AdminDashboard';
import AdminAuth from './components/AdminAuth';
import { tText } from './utils/translate';

export default function App() {
  // Global States
  const [themeId, setThemeId] = useState<ClinicThemeId>('medical-dermatology');
  const [language, setLanguage] = useState<LanguageId>(() => {
    const saved = localStorage.getItem('clinic_language');
    if (saved === 'id' || saved === 'en' || saved === 'ar' || saved === 'zh' || saved === 'ja') {
      return saved as LanguageId;
    }
    return 'id';
  });
  const [activeTab, setActiveTab] = useState<string>('home'); // home, quiz, booking, portal, admin
  const [preselectedQuizService, setPreselectedQuizService] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('clinic_theme_mode') === 'dark';
  });

  // Admin Session State
  const [currentAdminUser, setCurrentAdminUser] = useState<{ name: string; email: string; role: string } | null>(() => {
    const saved = localStorage.getItem('clinic_current_admin');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const handleAdminLogin = (user: { name: string; email: string; role: string }) => {
    setCurrentAdminUser(user);
    localStorage.setItem('clinic_current_admin', JSON.stringify(user));
  };

  const handleAdminLogout = () => {
    setCurrentAdminUser(null);
    localStorage.removeItem('clinic_current_admin');
  };

  const handleUpdateAdminProfile = (updated: { name: string; email: string; photo?: string; password?: string }) => {
    if (!currentAdminUser) return;

    // 1. Update the account in clinic_admin_accounts
    const stored = localStorage.getItem('clinic_admin_accounts');
    if (stored) {
      try {
        const accounts = JSON.parse(stored);
        const idx = accounts.findIndex((acc: any) => acc.email.toLowerCase() === currentAdminUser.email.toLowerCase());
        if (idx !== -1) {
          accounts[idx].name = updated.name;
          accounts[idx].email = updated.email.toLowerCase();
          if (updated.photo !== undefined) {
            accounts[idx].photo = updated.photo;
          }
          if (updated.password) {
            accounts[idx].passwordHash = updated.password;
          }
          localStorage.setItem('clinic_admin_accounts', JSON.stringify(accounts));
        }
      } catch (e) {
        console.error('Failed to update admin accounts', e);
      }
    }

    // 2. Update current session state
    const newSession = {
      ...currentAdminUser,
      name: updated.name,
      email: updated.email.toLowerCase(),
      photo: updated.photo !== undefined ? updated.photo : (currentAdminUser as any).photo
    };
    setCurrentAdminUser(newSession);
    localStorage.setItem('clinic_current_admin', JSON.stringify(newSession));
  };

  // Detect initial /admin route from path or hash
  React.useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/admin' || path.endsWith('/admin') || hash === '#admin' || hash === '#/admin') {
      setActiveTab('admin');
    }

    // Handle back/forward navigation
    const handlePopState = () => {
      const currentPath = window.location.pathname;
      const currentHash = window.location.hash;
      if (currentPath === '/admin' || currentPath.endsWith('/admin') || currentHash === '#admin' || currentHash === '#/admin') {
        setActiveTab('admin');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync activeTab back to the browser's address bar
  React.useEffect(() => {
    const currentPath = window.location.pathname;
    if (activeTab === 'admin') {
      if (currentPath !== '/admin' && !currentPath.endsWith('/admin')) {
        window.history.pushState({ tab: 'admin' }, '', '/admin');
      }
    } else {
      if (currentPath === '/admin' || currentPath.endsWith('/admin')) {
        window.history.pushState({ tab: 'home' }, '', '/');
      }
    }
  }, [activeTab]);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  React.useEffect(() => {
    localStorage.setItem('clinic_language', language);
  }, [language]);

  // SEO Metadata Booster Dynamics
  React.useEffect(() => {
    let title = "Clinic Digital Pro - Sistem Manajemen Klinik & CRM Estetika Premium";
    let desc = "Sistem manajemen klinik multi-spesialis & CRM estetika premium. Dilengkapi dengan kuis diagnostik kulit interaktif, rekam medis elektronik (RME) standar Kemenkes, reservasi online instan, dan dashboard analitis real-time.";
    
    if (activeTab === 'admin') {
      title = "CRM Admin Dashboard - Clinic Digital Pro";
      desc = "Dashboard analitis real-time, manajemen rekam medis elektronik (RME), pelacakan prospek, status kuota kampanye promosi, dan riwayat janji temu pasien.";
    } else if (activeTab === 'quiz') {
      title = "Skin Concern Diagnostic Quiz - Clinic Digital Pro";
      desc = "Deteksi masalah kulit wajah Anda secara instan dan dapatkan rekomendasi perawatan serta skincare medis berstandar FDA secara otomatis.";
    } else if (activeTab === 'booking') {
      title = "Reservasi Online Instan - Clinic Digital Pro";
      desc = "Pesan jadwal konsultasi dan treatment di Clinic Digital Pro secara otomatis. Dapatkan kode QR terenkripsi yang siap di-scan untuk check-in instan.";
    } else if (activeTab === 'portal') {
      title = "Patient Clinical Portal - Clinic Digital Pro";
      desc = "Masuk ke portal klinis pasien aktif Anda untuk melihat rekam medis, rujukan lab, instruksi aftercare pasca-tindakan, dan riwayat kunjungan.";
    }

    if (language === 'en') {
      if (activeTab === 'home') {
        title = "Clinic Digital Pro - Premium Clinic Management System & Aesthetic CRM";
        desc = "Premium multi-specialty clinic management system & aesthetic CRM. Featuring interactive skin diagnostic quiz, FDA-standard electronic medical records, and real-time analytical dashboards.";
      } else if (activeTab === 'admin') {
        title = "CRM Admin Dashboard - Clinic Digital Pro";
        desc = "Real-time analytics, electronic medical record (EMR) management, CRM lead tracking, promotional campaign quotas, and patient appointment history.";
      } else if (activeTab === 'quiz') {
        title = "Skin Concern Diagnostic Quiz - Clinic Digital Pro";
        desc = "Instantly diagnose your facial skin concerns and receive smart, automated, FDA-standard treatment & skincare recommendations.";
      } else if (activeTab === 'booking') {
        title = "Instant Online Booking - Clinic Digital Pro";
        desc = "Book your consultation and treatment session at Clinic Digital Pro automatically and receive your encrypted QR check-in pass.";
      } else if (activeTab === 'portal') {
        title = "Patient Clinical Portal - Clinic Digital Pro";
        desc = "Access your active patient medical records, lab referrals, post-treatment aftercare guidelines, and appointment history.";
      }
    }

    // Apply to DOM
    document.title = title;

    // Dynamically update/create meta description tag
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc);

    // Dynamically update Open Graph description as well
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', desc);
    }
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
  }, [activeTab, language]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('clinic_theme_mode', next ? 'dark' : 'light');
      return next;
    });
  };

  // Collections Store State
  const [appointments, setAppointments] = useState<Appointment[]>(SEED_APPOINTMENTS);
  const [leads, setLeads] = useState<Lead[]>(SEED_LEADS);
  const [promos, setPromos] = useState<Promo[]>(SEED_PROMOS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  
  // Static-like seed helpers
  const adminUsers = SEED_ADMIN_USERS;
  const paymentLogs = SEED_PAYMENT_LOGS;
  const notificationTemplates = NOTIFICATION_TEMPLATES;
  const memberships = SEED_MEMBERSHIPS;

  // Audit Logger helper
  const addAuditLog = (action: string, details: string, user = 'System') => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newLog: AuditLog = {
      timestamp,
      user,
      role: user === 'System' ? 'System Process' : 'Super Admin',
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // State Updates Handlers
  const handleUpdateAppointmentStatus = (bookingCode: string, status: AppointmentStatus, paymentStatus?: PaymentStatus) => {
    setAppointments(prev => prev.map(app => {
      if (app.booking_code === bookingCode) {
        const updated = { ...app, status };
        if (paymentStatus) {
          updated.payment_status = paymentStatus;
        }
        return updated;
      }
      return app;
    }));
    addAuditLog('Appointment Status Change', `Mengubah status booking '${bookingCode}' menjadi '${status}'`);
  };

  const handleUpdateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeads(prev => prev.map(ld => {
      if (ld.id === leadId) {
        return { ...ld, status };
      }
      return ld;
    }));
    addAuditLog('CRM Lead Update', `Status Prospek ID '${leadId}' diubah menjadi '${status}'`);
  };

  const handleUpdatePromoQuota = (promoName: string, newQuota: number) => {
    setPromos(prev => prev.map(pr => {
      if (pr.name === promoName) {
        return { ...pr, quota: Math.max(0, newQuota) };
      }
      return pr;
    }));
    addAuditLog('Promo Quota Change', `Kuota Promo '${promoName}' disesuaikan menjadi ${newQuota}`);
  };

  const handleAddPromo = (newPromo: Promo) => {
    setPromos(prev => [newPromo, ...prev]);
    addAuditLog('Campaign Published', `Promo baru '${newPromo.name}' berhasil dibuat`);
  };

  const handleThemeChange = (id: ClinicThemeId) => {
    setThemeId(id);
    addAuditLog('Theme Template Changed', `Preset desain estetik diubah ke '${THEME_PRESETS[id]?.name}'`);
  };

  const handleUpdateThemeConfig = (targetThemeId: ClinicThemeId, config: Partial<ThemeConfig>) => {
    const themePreset = THEME_PRESETS[targetThemeId];
    if (themePreset) {
      Object.assign(themePreset, config);
      // Trigger simple state refresh
      setThemeId('' as any);
      setTimeout(() => setThemeId(targetThemeId), 1);
    }
  };

  // Booking Flow callback
  const handleBookingConfirmed = (app: Appointment) => {
    setAppointments(prev => [app, ...prev]);
    addAuditLog('Appointment Booked', `Pendaftaran online berhasil dibuat untuk ${app.patient_name} - Kode ${app.booking_code}`);
    setActiveTab('portal'); // Redirect directly to portal to view ticket
  };

  // Quiz submission callback
  const handleQuizSubmitted = (leadOmit: Omit<Lead, 'id'>) => {
    const newLead: Lead = {
      ...leadOmit,
      id: `lead-${leads.length + 1}`
    };
    setLeads(prev => [newLead, ...prev]);
    addAuditLog('CRM Lead Created', `Prospek baru '${leadOmit.name}' mendaftar via diagnostic Skin Quiz`);
  };

  const handleNavigateToBooking = (serviceName: string) => {
    setPreselectedQuizService(serviceName);
    setActiveTab('booking');
  };

  const currentTheme = THEME_PRESETS[themeId] || THEME_PRESETS['medical-dermatology'];

  return (
    <div className={`min-h-screen transition-all duration-300 font-sans antialiased ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* RENDER ACTIVE TAB */}
      <div>
        
        {/* Home Website tab */}
        {activeTab === 'home' && (
          <PublicWebsite
            themeId={themeId}
            language={language}
            onSetLanguage={setLanguage}
            onNavigateTab={(tab, svcName) => {
              if (tab === 'booking') {
                if (svcName) setPreselectedQuizService(svcName);
                setActiveTab('booking');
              } else if (tab === 'quiz') {
                setActiveTab('quiz');
              } else if (tab === 'portal') {
                setActiveTab('portal');
              } else {
                setActiveTab('home');
              }
            }}
            services={SEED_SERVICES}
            doctors={SEED_DOCTORS}
            promos={promos}
            beforeAfters={SEED_BEFORE_AFTER}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        )}

        {/* Skin Concern Diagnostic quiz tab */}
        {activeTab === 'quiz' && (
          <div className="max-w-4xl mx-auto px-6 py-6 transition-all">
            <div className="mb-4">
              <button 
                onClick={() => setActiveTab('home')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                ← {tText("Kembali ke Beranda", language)}
              </button>
            </div>
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight">{tText("Interactive Skin Concern Quiz", language)}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-medium">{tText("Asisten cerdas pencocok klinis otomatis untuk mendeteksi kebutuhan perawatan terbaik sesuai dengan skin concern Anda.", language)}</p>
            </div>
            <InteractiveQuiz 
              themeId={themeId}
              language={language}
              onSubmitQuiz={handleQuizSubmitted}
              onNavigateToBooking={handleNavigateToBooking}
            />
          </div>
        )}

        {/* Booking Process tab */}
        {activeTab === 'booking' && (
          <div className="max-w-4xl mx-auto px-6 py-6 transition-all">
            <div className="mb-4">
              <button 
                onClick={() => {
                  setPreselectedQuizService('');
                  setActiveTab('home');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                ← {tText("Kembali ke Beranda", language)}
              </button>
            </div>
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-3xl font-black font-display text-slate-900 dark:text-white tracking-tight">{tText("Online Treatment Scheduling", language)}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-medium">{tText("Reservasi slot aman, peroleh tiket QR, dan hubungkan rekam medis perawatan Anda dlm 3 menit.", language)}</p>
            </div>
            <BookingWizard
              themeId={themeId}
              language={language}
              preselectedService={preselectedQuizService}
              onBookingConfirmed={handleBookingConfirmed}
            />
          </div>
        )}

        {/* Patient Portal tab */}
        {activeTab === 'portal' && (
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="mb-4">
              <button 
                onClick={() => setActiveTab('home')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                ← {tText("Kembali ke Beranda", language)}
              </button>
            </div>
            <PatientPortal
              themeId={themeId}
              language={language}
              appointments={appointments}
              memberships={memberships}
              onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            />
          </div>
        )}

        {/* Admin Pro Command center tab */}
        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-6 pt-4 mb-2">
            <div className="mb-4">
              <button 
                onClick={() => setActiveTab('home')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                ← {tText("Kembali ke Beranda", language)}
              </button>
            </div>
            {currentAdminUser ? (
              <AdminDashboard
                themeId={themeId}
                language={language}
                appointments={appointments}
                leads={leads}
                promos={promos}
                auditLogs={auditLogs}
                adminUsers={adminUsers}
                paymentLogs={paymentLogs}
                notificationTemplates={notificationTemplates}
                onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
                onUpdateLeadStatus={handleUpdateLeadStatus}
                onUpdatePromoQuota={handleUpdatePromoQuota}
                onAddPromo={handleAddPromo}
                onUpdateThemeConfig={handleUpdateThemeConfig}
                onAddAuditLog={addAuditLog}
                onThemeChange={handleThemeChange}
                currentAdmin={currentAdminUser}
                onLogout={handleAdminLogout}
                onUpdateProfile={handleUpdateAdminProfile}
              />
            ) : (
              <AdminAuth
                theme={currentTheme}
                onLoginSuccess={handleAdminLogin}
              />
            )}
          </div>
        )}
      </div>

    </div>
  );
}

