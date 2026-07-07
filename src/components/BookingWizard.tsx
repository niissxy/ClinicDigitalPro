/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Calendar, Clock, MapPin, Users, HeartPulse, Check, 
  ArrowLeft, ArrowRight, CreditCard, Shield, Image as ImageIcon, Send, Copy, FileText 
} from 'lucide-react';
import { 
  SEED_CATEGORIES, SEED_SERVICES, SEED_DOCTORS, SEED_BRANCHES 
} from '../data/seedData';
import { ClinicThemeId, Appointment, PaymentStatus, AppointmentStatus, Service, Doctor, LanguageId } from '../types';
import { THEME_PRESETS } from '../data/seedData';
import { tText, translateService, translateDoctor } from '../utils/translate';

interface BookingWizardProps {
  themeId: ClinicThemeId;
  language: LanguageId;
  preselectedService?: string;
  onBookingConfirmed: (appointment: Appointment) => void;
}

export default function BookingWizard({ themeId, language, preselectedService = '', onBookingConfirmed }: BookingWizardProps) {
  const theme = THEME_PRESETS[themeId];
  
  // Steps: 1. Service & Category -> 2. Branch & Doctor -> 3. Date & Time -> 4. Patient Info & Upload -> 5. Payment simulation -> 6. Success Ticket
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(SEED_CATEGORIES[0].name);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBranch, setSelectedBranch] = useState(SEED_BRANCHES[0].name);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('2026-06-05');
  const [selectedTime, setSelectedTime] = useState('11:00');
  
  // Patient details state
  const [patientName, setPatientName] = useState('');
  const [patientWhatsapp, setPatientWhatsapp] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [initialComplaint, setInitialComplaint] = useState('');
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [photoConsent, setPhotoConsent] = useState(false);
  const [generalConsent, setGeneralConsent] = useState(false);

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [simulatedStatus, setSimulatedStatus] = useState<PaymentStatus>('Pending');
  const [activeAppointment, setActiveAppointment] = useState<Appointment | null>(null);

  // Auto select service when preselected from Skin Quiz
  useEffect(() => {
    if (preselectedService) {
      const matchSvc = SEED_SERVICES.find(s => s.name === preselectedService);
      if (matchSvc) {
        setSelectedService(matchSvc);
        setSelectedCategory(matchSvc.category);
        // Also auto preselect first matching doctor
        const doc = SEED_DOCTORS.find(d => d.services.includes(matchSvc.name));
        if (doc) setSelectedDoctor(doc);
      }
    } else {
      // Pick first service as default
      const defaultSvc = SEED_SERVICES.find(s => s.category === selectedCategory) || SEED_SERVICES[0];
      setSelectedService(defaultSvc);
    }
  }, [preselectedService, selectedCategory]);

  // Handle service change
  const handleSelectService = (svc: Service) => {
    setSelectedService(svc);
    // Find compatible doctors
    const compDocs = SEED_DOCTORS.filter(d => d.services.includes(svc.name));
    if (compDocs.length > 0) {
      setSelectedDoctor(compDocs[0]);
    } else {
      setSelectedDoctor(SEED_DOCTORS[0]);
    }
  };

  // Helper lists
  const filteredServices = SEED_SERVICES.filter(s => s.category === selectedCategory);
  const compatibleDoctors = selectedService 
    ? SEED_DOCTORS.filter(d => d.services.includes(selectedService.name))
    : SEED_DOCTORS;

  // Next steps guards
  const handleNextToBranch = () => {
    if (!selectedService) {
      alert(tText("Pilih Layanan/Treatment medis yang Anda butuhkan!", language));
      return;
    }
    setStep(2);
  };

  const handleNextToTime = () => {
    if (!selectedDoctor) {
      alert(tText("Pilih dokter atau spesialis terapis kecantikan!", language));
      return;
    }
    setStep(3);
  };

  const handleNextToInfo = () => {
    if (!selectedDate || !selectedTime) {
      alert(tText("Pilih tanggal dan jam kehadiran konsultasi.", language));
      return;
    }
    setStep(4);
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientWhatsapp || !patientEmail) {
      alert(tText("Lengkapi info registrasi pasien secara utuh.", language));
      return;
    }
    if (!generalConsent) {
      alert(tText("Anda harus menyetujui lembar kepatuhan medis tertera.", language));
      return;
    }
    setStep(5);
  };

  // Simulation upload file
  const handleDummyImage = () => {
    setImageFile("https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500&auto=format&fit=crop&q=60");
    setPhotoConsent(true);
  };

  const confirmBooking = () => {
    const bookingCode = `AMB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const bookingFee = selectedService ? Math.floor(selectedService.price_start * 0.1) : 100000;
    
    const newAppointment: Appointment = {
      booking_code: bookingCode,
      patient_name: patientName,
      whatsapp: patientWhatsapp,
      email: patientEmail,
      service: selectedService?.name || "Premium Consultation",
      doctor: selectedDoctor?.name || "Tim Asisten Dokter",
      branch: selectedBranch,
      date: selectedDate,
      time: selectedTime,
      status: paymentMethod === 'Pay at Clinic' ? 'Confirmed' : 'Pending',
      payment_status: paymentMethod === 'Pay at Clinic' ? 'Pending' : 'Paid', // Simulation automatically completes upon pay button clicked for demo smoothness
      source: 'Website Booking Flow',
      initial_complaint: initialComplaint || 'Minat konsultasi estetik klinis',
      notes: `Metode Bayar: ${paymentMethod}. Booking fee sebesar Rp ${bookingFee.toLocaleString()}`,
      payment_fee: bookingFee
    };

    setActiveAppointment(newAppointment);
    onBookingConfirmed(newAppointment);
    setStep(6);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-rose-100/50 dark:border-slate-800 max-w-4xl mx-auto overflow-hidden">
      {/* Top flow indicator bar */}
      <div className="bg-slate-100 dark:bg-slate-950/60 flex items-center justify-around border-b border-gray-100 dark:border-slate-800 py-3 text-xs font-semibold text-gray-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap px-4">
        <span className={step === 1 ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-gray-500 dark:text-slate-400"}>{tText("1. Treatment", language)}</span>
        <span className="text-gray-300 dark:text-slate-800">/</span>
        <span className={step === 2 ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-gray-500 dark:text-slate-400"}>{tText("2. Cabang & Dokter", language)}</span>
        <span className="text-gray-300 dark:text-slate-800">/</span>
        <span className={step === 3 ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-gray-500 dark:text-slate-400"}>{tText("3. Tanggal & Jam", language)}</span>
        <span className="text-gray-300 dark:text-slate-800">/</span>
        <span className={step === 4 ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-gray-500 dark:text-slate-400"}>{tText("4. Data Pasien", language)}</span>
        <span className="text-gray-300 dark:text-slate-800">/</span>
        <span className={step === 5 ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-gray-500 dark:text-slate-400"}>{tText("5. Pembayaran", language)}</span>
        <span className="text-gray-300 dark:text-slate-800">/</span>
        <span className={step === 6 ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-gray-500 dark:text-slate-400"}>{tText("6. QR Ticket", language)}</span>
      </div>

      <div className="p-8">
        
        {/* STEP 1: SELECT CATEGORY & SERVICE */}
        {step === 1 && (
          <div>
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 dark:text-slate-100 flex items-center gap-2 font-display">
                <HeartPulse className="h-5 w-5" style={{ color: theme.primaryColor }} />
                {tText("Pilih Layanan & Kategori Treatment Medis", language)}
              </h4>
              <p className="text-xs text-gray-500 dark:text-slate-400">{tText("Katalog perawatan mutakhir yang aman, berizin resmi, didukung peralatan modern dan higienis.", language)}</p>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 leading-none no-scrollbar">
              {SEED_CATEGORIES.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat.name 
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900' 
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300'
                  }`}
                >
                  {tText(cat.name, language)}
                </button>
              ))}
            </div>

            {/* Services listing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredServices.map(svcRaw => {
                const svc = translateService(svcRaw, language);
                const isSelected = selectedService?.name === svcRaw.name;
                return (
                  <div
                    key={svcRaw.name}
                    onClick={() => handleSelectService(svcRaw)}
                    className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 ring-1 ring-indigo-500/20 dark:ring-indigo-400/20' 
                        : 'border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-bold text-gray-900 dark:text-slate-100 text-sm">{svc.name}</h5>
                      <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                        Rp {svc.promo_price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">{svc.description}</p>
                    <div className="flex items-center justify-between text-[11px] text-gray-400 dark:text-slate-500">
                      <span>{tText("Durasi:", language)} {tText(svc.duration, language)}</span>
                      {svc.price_start > svc.promo_price && (
                        <span className="line-through">{tText("Normal:", language)} Rp {svc.price_start.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky/Bottom details of current selection */}
            {selectedService && (() => {
              const svcTrans = translateService(selectedService, language);
              return (
                <div className="mt-8 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-5">
                  <h5 className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mb-2">{tText("Detail Treatment Terpilih:", language)}</h5>
                  <p className="text-xs text-gray-600 dark:text-slate-400 my-1"><strong className="text-gray-700 dark:text-slate-300">{tText("Manfaat Utama:", language)}</strong> {svcTrans.benefits.join(', ')}</p>
                  <p className="text-xs text-gray-600 dark:text-slate-400 my-1"><strong className="text-gray-700 dark:text-slate-300">{tText("Cocok Untuk:", language)}</strong> {svcTrans.suitable_for.join(', ')}</p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleNextToBranch}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold shadow-md cursor-pointer hover:opacity-95"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      {tText("Lanjut Pilih Dokter", language)} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* STEP 2: CHOOSE BRANCH & DOCTOR */}
        {step === 2 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-slate-100 flex items-center gap-2 font-display">
                  <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  {tText("Pilih Cabang Klinik & Dokter/Terapis", language)}
                </h4>
                <p className="text-xs text-gray-500 dark:text-slate-400">{tText("Tentukan lokasi terdekat Anda dan tim medis tepercaya yang siap melayani dari hati.", language)}</p>
              </div>
              <button onClick={() => setStep(1)} className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400">
                <ArrowLeft className="h-3.5 w-3.5" /> {tText("Kembali", language)}
              </button>
            </div>

            {/* Branch option row */}
            <h5 className="text-xs font-bold text-gray-700 dark:text-slate-300 mb-2.5">{tText("1. Cabang Klinik Aurora:", language)}</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {SEED_BRANCHES.map(b => {
                const isSel = selectedBranch === b.name;
                return (
                  <button
                    key={b.name}
                    onClick={() => {
                      setSelectedBranch(b.name);
                    }}
                    className={`p-3.5 rounded-xl border text-left flex flex-col transition-all cursor-pointer ${
                      isSel 
                        ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-300 ring-1 ring-indigo-500/10' 
                        : 'border-gray-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-gray-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold">{tText(b.city, language)}</span>
                    <span className="text-[10px] text-gray-400 dark:text-slate-500 mt-0.5 line-clamp-1">{tText(b.address, language)}</span>
                  </button>
                );
              })}
            </div>

            {/* Doctors listing */}
            <h5 className="text-xs font-bold text-gray-700 dark:text-slate-300 mb-2.5">{tText("2. Tim Medis Tepercaya:", language)}</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {compatibleDoctors.map(docRaw => {
                const doc = translateDoctor(docRaw, language);
                const isSelected = selectedDoctor?.name === docRaw.name;
                return (
                  <div
                    key={docRaw.name}
                    onClick={() => setSelectedDoctor(docRaw)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex gap-4 items-start ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50/30 dark:bg-indigo-950/30 dark:border-indigo-500/50' 
                        : 'border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 flex items-center justify-center font-bold text-indigo-700 dark:text-indigo-300 shrink-0 select-none">
                      {docRaw.name.substring(0, 5) === 'drg. ' ? '🦷' : '👩‍⚕️'}
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-gray-900 dark:text-slate-100">{doc.name}</h6>
                      <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">{doc.specialty}</p>
                      <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1">{tText("Pengalaman", language)}: {doc.experience_years} {tText("tahun", language)} | ⭐ {doc.rating}</p>
                      <div className="mt-2 text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full inline-block">
                        {tText("Praktik Utama", language)}: {tText(doc.branch, language)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between mt-8 pt-4 border-t border-gray-100 dark:border-slate-800">
              <button onClick={() => setStep(1)} className="px-5 py-2.5 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"> {tText("Kembali", language)} </button>
              <button 
                onClick={handleNextToTime} 
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold shadow-md cursor-pointer"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {tText("Lanjut Jadwalkan Kunjungan", language)} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SCHEDULE & SLOTS */}
        {step === 3 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-slate-100 flex items-center gap-2 font-display">
                  <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  {tText("Atur Hari & Jam Kedatangan", language)}
                </h4>
                <p className="text-xs text-gray-500 dark:text-slate-400">{tText("Pilih slot jadwal yang longgar. Kami memprioritaskan ketepatan antrean agar menghindari no-show.", language)}</p>
              </div>
              <button onClick={() => setStep(2)} className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400">
                <ArrowLeft className="h-3.5 w-3.5" /> {tText("Kembali", language)}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Datepicker simulations */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-2">{tText("Pilih Tanggal Booking:", language)}</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Besok (5 Jun)", dateStr: "2026-06-05" },
                    { label: "Sabtu (6 Jun)", dateStr: "2026-06-06" },
                    { label: "Minggu (7 Jun)", dateStr: "2026-06-07" },
                    { label: "Senin (8 Jun)", dateStr: "2026-06-08" },
                    { label: "Selasa (9 Jun)", dateStr: "2026-06-09" },
                    { label: "Rabu (10 Jun)", dateStr: "2026-06-10" }
                  ].map(d => {
                    const isSel = selectedDate === d.dateStr;
                    return (
                      <button
                        key={d.dateStr}
                        onClick={() => setSelectedDate(d.dateStr)}
                        className={`p-3 text-xs font-semibold rounded-xl border transition-all ${
                          isSel 
                            ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500/20' 
                            : 'border-gray-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-950'
                        }`}
                      >
                        {tText(d.label, language)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeslot simulations */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-2">
                  {tText("Slot Jam Tersedia", language)} ({selectedDoctor ? translateDoctor(selectedDoctor, language).name : tText("Dokter", language)}):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['09:00', '10:30', '11:00', '13:00', '14:30', '15:30', '17:00', '18:30', '19:00'].map(t => {
                    const isSel = selectedTime === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`p-3 text-xs font-semibold rounded-xl border transition-all ${
                          isSel 
                            ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-505/20' 
                            : 'border-gray-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-950'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-amber-50 dark:bg-amber-950/20 rounded-xl p-4 gap-2 border border-amber-100 dark:border-amber-950/30 flex items-start text-left text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                {tText("Jadwal praktik dokter yang dipilih adalah", language)}{' '}
                <strong className="text-amber-900 dark:text-amber-200">
                  {selectedDoctor?.schedule.map(s => `${tText(s.day, language)} ${s.time}`).join(', ') || tText('Senin s/d Sabtu', language)}
                </strong>.
                {tText("Sistem akan memvalidasi slot konfirmasi langsung dengan asisten perawat pasca booking.", language)}
              </div>
            </div>

            <div className="flex justify-between mt-8 pt-4 border-t border-gray-100 dark:border-slate-800">
              <button onClick={() => setStep(2)} className="px-5 py-2.5 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"> {tText("Kembali", language)} </button>
              <button 
                onClick={handleNextToInfo} 
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold shadow-md cursor-pointer"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {tText("Lanjut Isi Riwayat Medis", language)} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PATIENT INFO REGISTER */}
        {step === 4 && (
          <form onSubmit={handleNextToPayment}>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-slate-100 flex items-center gap-2 font-display">
                  <HeartPulse className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  {tText("Lembar Riwayat Konsultasi & Data Pasien", language)}
                </h4>
                <p className="text-xs text-gray-500 dark:text-slate-400">{tText("Lengkapi data kesehatan Anda agar dokter dapat memahami keluhan awal secara paripurna.", language)}</p>
              </div>
              <button type="button" onClick={() => setStep(3)} className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400">
                <ArrowLeft className="h-3.5 w-3.5" /> {tText("Kembali", language)}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">{tText("Nama Lengkap Sesuai KTP *", language)}</label>
                <input
                  type="text"
                  required
                  placeholder={tText("Contoh: Nadia Rahma", language)}
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">{tText("No. WhatsApp Aktif *", language)}</label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: +62 812-3456-7890"
                  value={patientWhatsapp}
                  onChange={(e) => setPatientWhatsapp(e.target.value)}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100"
                />
              </div>

              <div className="md:col-span-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">{tText("Alamat Email Aktif *", language)}</label>
                  <input
                    type="email"
                    required
                    placeholder="Contoh: nadia.rahma@email.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">{tText("Keluhan Awal atau Riwayat Estetik (Opsional)", language)}</label>
                <textarea
                  placeholder={tText("Ceritakan sejarah iritasi kulit Anda, alergi logam, pemakaian krim racikan dokter sebelumnya, atau masalah scaling gigi di sini...", language)}
                  rows={3}
                  value={initialComplaint}
                  onChange={(e) => setInitialComplaint(e.target.value)}
                  className="w-full text-xs p-4 rounded-xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Optional picture upload widget */}
            <div className="border border-dashed border-gray-300 dark:border-slate-800 rounded-xl p-5 mb-5 text-center bg-gray-50/50 dark:bg-slate-950/20">
              <div className="flex flex-col items-center">
                <ImageIcon className="h-6 w-6 text-gray-400 dark:text-slate-500 mb-2" />
                <span className="text-xs font-bold text-gray-700 dark:text-slate-300">{tText("Lampirkan Foto Skin Concern Anda (Opsional)", language)}</span>
                <span className="text-[10px] text-gray-400 dark:text-slate-500 mt-1">{tText("Membantu dokter mengevaluasi visual kondisi jerawat/eksim Anda sebelum berkunjung.", language)}</span>
                
                {imageFile ? (
                  <div className="mt-3 relative inline-block border border-indigo-200 dark:border-indigo-950 p-1 bg-white dark:bg-slate-900 rounded-lg">
                    <img src={imageFile} className="h-24 w-24 object-cover rounded-md" alt="Preview uploaded file" />
                    <button type="button" onClick={() => setImageFile(null)} className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full p-0.5 text-[8px] h-4 w-4 flex items-center justify-center">X</button>
                    <div className="mt-2 text-[8px] bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold py-0.5 rounded px-2">{tText("Uploaded & Encrypted", language)}</div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleDummyImage}
                    className="mt-3 px-3.5 py-1.5 rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-[11px] text-indigo-600 dark:text-indigo-400"
                  >
                    {tText("Simulasikan Kamera & Upload", language)}
                  </button>
                )}
              </div>

              {imageFile && (
                <div className="flex items-center gap-2 mt-4 justify-center">
                  <input 
                    type="checkbox" 
                    id="photoConsent" 
                    checked={photoConsent} 
                    onChange={(e) => setPhotoConsent(e.target.checked)} 
                    className="rounded text-indigo-600" 
                  />
                  <label htmlFor="photoConsent" className="text-[10px] text-gray-500 dark:text-slate-400">{tText("Saya mengizinkan dokter melihat foto medis ini hanya untuk keperluan penunjang medis internal.", language)}</label>
                </div>
              )}
            </div>

            {/* General compliance check */}
            <div className="flex items-start gap-2.5 mb-6">
              <input 
                type="checkbox" 
                id="generalConsent" 
                required
                checked={generalConsent} 
                onChange={(e) => setGeneralConsent(e.target.checked)}
                className="rounded border-gray-300 dark:border-slate-800 text-indigo-600 mt-0.5 cursor-pointer bg-white dark:bg-slate-950" 
              />
              <label htmlFor="generalConsent" className="text-[11px] text-gray-500 dark:text-slate-400 leading-normal select-none">
                <strong>Consent:</strong> {tText("Saya menyatakan bahwa semua rincian riwayat medis di atas diisi secara jujur. Saya setuju data saya dilindungi aman sesuai dengan Kebijakan Rahasia Pasien & Consent Klinik Medis", language)} {tText(selectedBranch, language)}.
              </label>
            </div>

            <div className="flex justify-between mt-8 pt-4 border-t border-gray-100 dark:border-slate-800">
              <button type="button" onClick={() => setStep(3)} className="px-5 py-2.5 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"> {tText("Kembali", language)} </button>
              <button 
                type="submit" 
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold shadow-md cursor-pointer"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {tText("Lanjut ke Metode Pembayaran", language)} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: SIMULATE PAYMENT FEE */}
        {step === 5 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-slate-100 flex items-center gap-2 font-display">
                  <CreditCard className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  {tText("Simulasi Pembayaran Booking Fee", language)}
                </h4>
                <p className="text-xs text-gray-500 dark:text-slate-400">{tText("Pembayaran booking fee mengunci slot antrean dan menghindari no-show yang merugikan slot pasien lain.", language)}</p>
              </div>
              <button onClick={() => setStep(4)} className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400">
                <ArrowLeft className="h-3.5 w-3.5" /> {tText("Kembali", language)}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Payment selection list */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-3">{tText("Pilih Metode Pembayaran Berizin:", language)}</label>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'QRIS', label: 'E-Payment QRIS (Otomatis Verifikasi)', badge: 'Instan' },
                    { id: 'Mandiri VA', label: 'Virtual Account Mandiri', badge: 'Instan' },
                    { id: 'BCA VA', label: 'Virtual Account BCA', badge: 'Instan' },
                    { id: 'BRI VA', label: 'Virtual Account BRI', badge: 'Instan' },
                    { id: 'GoPay', label: 'Gopay Digital Wallet', badge: 'Diskon 5%' },
                    { id: 'DANA', label: 'DANA Wallet', badge: 'Instan' },
                    { id: 'Pay at Clinic', label: 'Bayar Langsung di Klinik (Hari H)', badge: 'Konfirmasi CS' }
                  ].map(pm => {
                    const isSel = paymentMethod === pm.id;
                    return (
                      <button
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`p-3 text-xs font-semibold rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                          isSel 
                            ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 ring-1 ring-indigo-500/10' 
                            : 'border-gray-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-950'
                        }`}
                      >
                        {tText(pm.label, language)}
                        <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full font-bold">{tText(pm.badge, language)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Booking breakdown card */}
              <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h5 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-3">{tText("Ringkasan Medis Kunjungan:", language)}</h5>
                  <div className="flex flex-col gap-2.5 text-xs text-gray-600 dark:text-slate-400">
                    <div className="flex justify-between border-b border-gray-200/50 dark:border-slate-800 pb-2">
                      <span>{tText("Layanan Medis:", language)}</span>
                      <span className="font-bold text-gray-900 dark:text-slate-100">
                        {selectedService ? translateService(selectedService, language).name : ''}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200/50 dark:border-slate-800 pb-2">
                      <span>{tText("Dokter/Spesialis:", language)}</span>
                      <span className="font-bold text-gray-900 dark:text-slate-100">
                        {selectedDoctor ? translateDoctor(selectedDoctor, language).name : ''}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200/50 dark:border-slate-800 pb-2">
                      <span>{tText("Cabang & Waktu:", language)}</span>
                      <span className="font-bold text-gray-900 dark:text-slate-100 text-right">{tText(selectedBranch, language)} ( {selectedDate} {selectedTime} )</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200/50 dark:border-slate-800 pb-2 text-indigo-700 dark:text-indigo-400">
                      <span>{tText("Harga Treatment:", language)}</span>
                      <span className="font-bold">Rp {selectedService?.promo_price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 text-rose-700 dark:text-rose-400 font-bold">
                      <span>{tText("Booking Fee Terkunci:", language)}</span>
                      <span>
                        {paymentMethod === 'Pay at Clinic' 
                          ? 'Rp 0' 
                          : `Rp ${(Math.floor((selectedService?.price_start || 500000) * 0.1)).toLocaleString()}`
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-4 text-center">
                  <button
                    onClick={confirmBooking}
                    className="w-full py-4 rounded-xl text-white text-sm font-bold shadow-md cursor-pointer hover:opacity-95 flex items-center justify-center gap-2"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {tText("PROSES AMANKAN JADWAL", language)} <Check className="h-5 w-5" />
                  </button>
                  <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-2.5">
                    {tText("Dengan menekan tombol diatas, Anda memicu simulasi auto-approve payment pada dashboard CRM dan mendaftarkan jadwal ke database Aurora.", language)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: BOOKING TICKET SUCCESS AND WHATSAPP TEMPLATE MOCK */}
        {step === 6 && activeAppointment && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-850">
              <Check className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>

            <h4 className="text-2xl font-bold text-gray-900 dark:text-slate-100 font-display">{tText("Appointment Berhasil Dijadwalkan!", language)}</h4>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
              {tText("Sistem medis Clinic Digital Pro berhasil mendaftarkan Anda ke antrean prioritas outlet", language)} {tText(activeAppointment.branch, language)}.
            </p>

            {/* Premium Digital Receipt Layout */}
            <div className="my-8 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 text-left max-w-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              
              {/* QR and Code info left */}
              <div className="md:col-span-1 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest font-bold">{tText("Check-In QR", language)}</span>
                
                {/* Visual mock code block simulating a QR */}
                <div className="bg-slate-950 p-2 rounded-lg my-3 inline-block select-none pointer-events-none">
                  <div className="grid grid-cols-3 gap-1 w-20 h-20 bg-white p-2">
                    <div className="bg-black w-4 h-4 rounded"></div>
                    <div className="bg-black w-4 h-4 rounded"></div>
                    <div className="bg-black w-2 h-4 rounded ml-auto"></div>
                    <div className="bg-black w-4 h-4 rounded"></div>
                    <div className="bg-black w-2 h-2 rounded my-auto mx-auto"></div>
                    <div className="bg-black w-4 h-4 rounded"></div>
                    <div className="bg-black w-4 h-4 rounded"></div>
                    <div className="bg-black w-4 h-4 rounded"></div>
                    <div className="bg-black w-4 h-4 rounded"></div>
                  </div>
                </div>

                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 tracking-wider font-mono">{activeAppointment.booking_code}</span>
              </div>

              {/* Booking summary definitions right */}
              <div className="md:col-span-2 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mb-1">{tText("Status Kunjungan:", language)}</div>
                  <div className="flex gap-2 mb-4">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">Confirmed</span>
                    <span className="px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-[10px] font-bold">Paid ({tText("Lunas", language)})</span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                    <div>
                      <span className="text-gray-400 dark:text-slate-500 block text-[9px] uppercase font-bold">{tText("Pasien:", language)}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{activeAppointment.patient_name}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 dark:text-slate-500 block text-[9px] uppercase font-bold">WhatsApp:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{activeAppointment.whatsapp}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 dark:text-slate-500 block text-[9px] uppercase font-bold">Treatment:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {selectedService ? translateService(selectedService, language).name : activeAppointment.service}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 dark:text-slate-500 block text-[9px] uppercase font-bold">{tText("Dokter/Terapis:", language)}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {selectedDoctor ? translateDoctor(selectedDoctor, language).name : activeAppointment.doctor}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 dark:text-slate-500 block text-[9px] uppercase font-bold">{tText("Waktu kedatangan:", language)}</span>
                      <span className="font-bold text-indigo-700 dark:text-indigo-300">{activeAppointment.date} @ {activeAppointment.time} WIB</span>
                    </div>
                    <div>
                      <span className="text-gray-400 dark:text-slate-500 block text-[9px] uppercase font-bold">{tText("Cabang:", language)}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{tText(activeAppointment.branch, language)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/50 dark:border-slate-800 text-[10px] text-gray-400 dark:text-slate-500">
                  {tText("Total booking fee sebesar", language)} <strong className="text-gray-700 dark:text-slate-300">Rp {activeAppointment.payment_fee.toLocaleString()}</strong> {tText("telah disimulasikan lunas via", language)} {tText(paymentMethod, language)}.
                </div>
              </div>
            </div>

            {/* WA Remainder Preview Box */}
            <div className="my-6 max-w-xl mx-auto rounded-2xl border border-emerald-100 dark:border-emerald-950/30 bg-emerald-50/50 dark:bg-emerald-950/10 p-5 text-left">
              <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 tracking-wider block mb-2 flex items-center gap-1.5">
                <Send className="h-3.5 w-3.5" />
                {tText("Simulasi WhatsApp Auto-Reminder template:", language)}
              </span>
              <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-4 font-mono text-xs text-gray-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed select-all">
{tText("Halo", language)} {activeAppointment.patient_name}, {tText("booking Anda di Aurora MedBeauty Clinic sudah dikonfirmasi.", language)}

{tText("Kode Booking:", language)} {activeAppointment.booking_code}
{tText("Layanan:", language)} {selectedService ? translateService(selectedService, language).name : activeAppointment.service}
{tText("Dokter/Terapis:", language)} {selectedDoctor ? translateDoctor(selectedDoctor, language).name : activeAppointment.doctor}
{tText("Cabang:", language)} {tText(activeAppointment.branch, language)}
{tText("Tanggal:", language)} {activeAppointment.date}
{tText("Jam:", language)} {activeAppointment.time} WIB

{tText("Mohon hadir 10 menit lebih awal untuk registrasi ulang. Terima kasih.", language)}
              </div>
              <div className="mt-3 flex justify-between items-center text-[10px] text-emerald-700 dark:text-emerald-400">
                <span>{tText("Pemicu: WhatsApp Business API Sandbox Simulator", language)}</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`Halo ${activeAppointment.patient_name}, booking Anda di Aurora MedBeauty Clinic sudah dikonfirmasi...`);
                  }}
                  className="flex items-center gap-1 hover:underline font-bold cursor-pointer"
                >
                  <Copy className="h-3 w-3" /> {tText("Salin Teks", language)}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <button
                onClick={() => {
                  setStep(1);
                  setPatientName('');
                  setPatientWhatsapp('');
                  setPatientEmail('');
                  setInitialComplaint('');
                  setImageFile(null);
                }}
                className="px-6 py-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-gray-600 dark:text-slate-300 text-sm font-semibold transition cursor-pointer"
              >
                {tText("Buat Booking Baru Pelanggan Lain", language)}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
