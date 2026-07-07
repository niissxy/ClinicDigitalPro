/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, Calendar, Clock, CreditCard, Shield, Star, 
  MapPin, Printer, Receipt, ThumbsUp, RefreshCw, XCircle, ArrowRight, UserCheck 
} from 'lucide-react';
import { Appointment, AppointmentStatus, PaymentStatus, Membership, LanguageId } from '../types';
import { SEED_MEMBERSHIPS, THEME_PRESETS, SEED_SERVICES, SEED_DOCTORS } from '../data/seedData';
import { ClinicThemeId } from '../types';
import { tText, translateService, translateDoctor } from '../utils/translate';

interface PatientPortalProps {
  themeId: ClinicThemeId;
  language: LanguageId;
  appointments: Appointment[];
  memberships: Membership[];
  onUpdateAppointmentStatus: (bookingCode: string, status: AppointmentStatus, paymentStatus?: PaymentStatus) => void;
}

export default function PatientPortal({ themeId, language, appointments, memberships, onUpdateAppointmentStatus }: PatientPortalProps) {
  const theme = THEME_PRESETS[themeId];
  
  const [selectedInvoice, setSelectedInvoice] = useState<Appointment | null>(null);
  const [rescheduleCode, setRescheduleCode] = useState<string | null>(null);
  const [newRescheduleDate, setNewRescheduleDate] = useState('2026-06-12');
  const [newRescheduleTime, setNewRescheduleTime] = useState('14:30');
  const [activePortalTab, setActivePortalTab] = useState<'dashboard' | 'bookings' | 'history' | 'membership'>('dashboard');

  // Simulated Loyalty points
  const loyaltyPoints = 350;
  const patientTier = memberships[1]; // Silver Beauty Plan for demo purposes

  // Reschedule request simulations
  const submitReschedule = (code: string) => {
    onUpdateAppointmentStatus(code, 'Rescheduled');
    setRescheduleCode(null);
    alert(
      tText("Request reschedule untuk booking", language) + " " + code + " " +
      tText("berhasil diajukan demi slot", language) + " " + newRescheduleDate + " " +
      tText("pukul", language) + " " + newRescheduleTime + "!"
    );
  };

  const cancelAppointment = (code: string) => {
    if (confirm(tText("Apakah Anda yakin ingin membatalkan pendaftaran jadwal", language) + " " + code + "?")) {
      onUpdateAppointmentStatus(code, 'Cancelled', 'Cancelled');
      alert(tText("Appointment", language) + " " + code + " " + tText("telah ditandai batal.", language));
    }
  };

  // Find respective aftercare instructions for booked treatments
  const getTreatmentInstructions = (svcName: string): string => {
    const svc = SEED_SERVICES.find(s => s.name === svcName);
    return svc ? translateService(svc, language).aftercare : tText("Gunakan tabir surya (sunscreen), bersihkan wajah lembut, dan hindari eksfoliasi berlebih selama 3 hari.", language);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden max-w-6xl mx-auto my-8">
      {/* Patient header frame */}
      <div className="bg-slate-900 dark:bg-slate-950 p-8 text-white text-left flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl">
            👑
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">Nadia Rahma</h3>
              <span className="bg-indigo-600 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wide">
                {patientTier.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{tText("ID Member:", language)} AMB-IND-9921 | {tText("Telepon:", language)} +62 812-3456-7890</p>
          </div>
        </div>

        {/* Loyalty score card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex gap-6">
          <div>
            <span className="block text-[10px] text-zinc-400 uppercase font-bold">{tText("Loyalty Points:", language)}</span>
            <span className="text-xl font-black text-white">{loyaltyPoints} Pts</span>
          </div>
          <div className="border-l border-white/10 pl-6">
            <span className="block text-[10px] text-zinc-400 uppercase font-bold">{tText("Active Bookings:", language)}</span>
            <span className="text-xl font-black text-indigo-400">{appointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending').length}</span>
          </div>
        </div>
      </div>

      {/* Navigation sub-tabs */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 px-6 py-2.5 flex items-center gap-2 overflow-x-auto whitespace-nowrap leading-none">
        {[
          { id: 'dashboard', label: tText('Overview Patient Account', language) },
          { id: 'bookings', label: tText('Booking & Tiket QR Saya', language) },
          { id: 'history', label: tText('Riwayat Kunjungan Medis', language) },
          { id: 'membership', label: tText('Benefit Stat Level Member', language) }
        ].map(bt => (
          <button
            key={bt.id}
            onClick={() => setActivePortalTab(bt.id as any)}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold leading-none cursor-pointer transition-colors ${
              activePortalTab === bt.id 
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900' 
                : 'text-gray-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200'
            }`}
          >
            {bt.label}
          </button>
        ))}
      </div>

      <div className="p-8">
        
        {/* TAB 1: OVERVIEW ACCOUNT DASHBOARD */}
        {activePortalTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Quick alert notifications */}
            <div className="lg:col-span-2 text-left flex flex-col gap-6">
              
              {/* Upcoming Appointment notice block */}
              <div>
                <h4 className="text-sm font-bold text-gray-800 dark:text-slate-300 tracking-tight uppercase tracking-wider mb-3">{tText("Agenda Kunjungan Medis Terdekat:", language)}</h4>
                {appointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending').length === 0 ? (
                  <div className="bg-white dark:bg-slate-950/40 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 text-center text-xs text-gray-500 dark:text-slate-400">
                    {tText("Tidak ada agenda booking aktif. Silakan lakukan penjadwalan via formulir reservasi.", language)}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {appointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending').map(ap => {
                      const matchSvc = SEED_SERVICES.find(s => s.name === ap.service);
                      const localizedSvcName = matchSvc ? translateService(matchSvc, language).name : ap.service;
                      return (
                        <div key={ap.booking_code} className="bg-white dark:bg-slate-950/40 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                          <div className="flex justify-between items-start border-b border-gray-100/80 dark:border-slate-800 pb-3 mb-3">
                            <div>
                              <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded tracking-wide font-mono mr-2">
                                {ap.booking_code}
                              </span>
                              <span className="text-xs font-bold text-gray-900 dark:text-slate-100">{localizedSvcName}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${ap.status === 'Confirmed' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'}`}>
                              {ap.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="text-gray-400 dark:text-slate-500 font-bold text-[9px] uppercase">{tText("Dokter Pendamping:", language)}</span>
                              <span className="block text-gray-800 dark:text-slate-200 font-medium">
                                {SEED_DOCTORS.find(d => d.name === ap.doctor) ? translateDoctor(SEED_DOCTORS.find(d => d.name === ap.doctor)!, language).name : ap.doctor}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400 dark:text-slate-500 font-bold text-[9px] uppercase">{tText("Waktu Reservasi:", language)}</span>
                              <span className="block text-indigo-600 dark:text-indigo-400 font-semibold">{ap.date} @ {ap.time} WIB</span>
                            </div>
                          </div>

                          {/* Interactive operations */}
                          <div className="flex gap-2.5 mt-5 border-t border-gray-100 dark:border-slate-800 pt-4">
                            <button
                              onClick={() => setRescheduleCode(ap.booking_code)}
                              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                            >
                              <RefreshCw className="h-3.5 w-3.5" /> Request Reschedule
                            </button>
                            
                            <button
                              onClick={() => cancelAppointment(ap.booking_code)}
                              className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 bg-transparent border-0 ml-auto cursor-pointer"
                            >
                              <XCircle className="h-3.5 w-3.5" /> {tText("Batalkan Booking", language)}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Automatic Treatment aftercare instructions board based on actively booked services */}
              <div>
                <h4 className="text-xs font-extrabold text-gray-700 dark:text-slate-300 uppercase tracking-widest mb-3">{tText("Panduan Pasca Tindakan (Aftercare) Aktif:", language)}</h4>
                <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100/80 dark:border-amber-950/20 rounded-2xl p-6">
                  <div className="flex gap-3">
                    <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-extrabold text-amber-900 dark:text-amber-300">{tText("Petunjuk Perawatan Kulit Penting:", language)}</h5>
                      <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed font-normal mt-1.5">
                        {appointments.length > 0 
                          ? getTreatmentInstructions(appointments[0].service)
                          : tText("Panduan asisten aftercare medis akan otomatis aktif di sini sesaat setelah Anda menyelesaikan tindakan konsultasi bersama tim dokter di outlet.", language)
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Loyalty points card and fast checkout receipts lookup */}
            <div className="text-left flex flex-col gap-6">
              
              <div className="bg-white dark:bg-slate-950/40 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h4 className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mb-4">{tText("Benefit Memberaktif Anda:", language)}</h4>
                <div className="flex flex-col gap-3 text-xs leading-relaxed text-gray-500 dark:text-slate-400">
                  {patientTier.benefits.map((b, i) => (
                    <div key={i} className="flex gap-2 items-start font-normal">
                      <Star className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5 fill-indigo-100 dark:fill-indigo-950/40" />
                      <span>{tText(b, language)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950/30 rounded-xl p-3.5 mt-6 text-[10px] text-rose-800 dark:text-rose-300 font-medium">
                  🌟 <strong>{tText("Hadiah Ulang Tahun Menanti:", language)}</strong> {tText("Voucher free facial treatment senilai Rp 150.000 akan otomatis aktif di email Anda pada tanggal lahir terdaftar!", language)}
                </div>
              </div>

              {/* Invoices Lookup Quick button index */}
              <div className="bg-white dark:bg-slate-950/40 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h4 className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mb-3">{tText("E-Invoices Pembayaran:", language)}</h4>
                <div className="flex flex-col gap-2">
                  {appointments.map(ap => {
                    const matchSvc = SEED_SERVICES.find(s => s.name === ap.service);
                    const localizedSvcName = matchSvc ? translateService(matchSvc, language).name : ap.service;
                    return (
                      <button
                        key={ap.booking_code}
                        onClick={() => setSelectedInvoice(ap)}
                        className="p-3 rounded-xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-left text-xs transition cursor-pointer text-slate-800 dark:text-slate-200"
                      >
                        <div>
                          <span className="block font-bold text-slate-800 dark:text-slate-200">{localizedSvcName}</span>
                          <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">Invoice #{ap.booking_code}</span>
                        </div>
                        <Receipt className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: DETAILED MY ACTIVE BOOKINGS & QR TICKET */}
        {activePortalTab === 'bookings' && (
          <div className="text-left">
            <h4 className="text-sm font-bold text-gray-800 dark:text-slate-300 uppercase tracking-wider mb-4">{tText("Tiket Antrean Prioritas QR Code Saya:", language)}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending').map(ap => {
                const matchSvc = SEED_SERVICES.find(s => s.name === ap.service);
                const localizedSvcName = matchSvc ? translateService(matchSvc, language).name : ap.service;
                return (
                  <div key={ap.booking_code} className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
                    
                    {/* Realtime check in receipt code and QR */}
                    <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 min-w-[140px] text-center select-none rounded-2xl">
                      <span className="text-[9px] text-gray-400 dark:text-slate-500 uppercase tracking-widest font-extrabold mb-2">{tText("Check-In QR", language)}</span>
                      <div className="bg-white dark:bg-slate-950 p-2 border border-slate-200/50 dark:border-slate-800 rounded-xl mb-2">
                        <div className="grid grid-cols-3 gap-0.5 w-16 h-16 bg-black dark:bg-slate-100 p-1">
                          <div className="bg-white dark:bg-slate-900 w-4 h-4" />
                          <div className="bg-white dark:bg-slate-900 w-4 h-4" />
                          <div className="bg-white dark:bg-slate-900 w-4 h-4 ml-auto" />
                          <div className="bg-white dark:bg-slate-900 w-4 h-4" />
                          <div className="bg-white dark:bg-slate-900 w-2 h-2 mx-auto" />
                          <div className="bg-white dark:bg-slate-900 w-4 h-4" />
                          <div className="bg-white dark:bg-slate-900 w-4 h-4" />
                          <div className="bg-white dark:bg-slate-900 w-4 h-4" />
                          <div className="bg-white dark:bg-slate-900 w-4 h-4" />
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400 tracking-wider uppercase">{ap.booking_code}</span>
                    </div>

                    {/* Summary lists */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h5 className="font-bold text-gray-900 dark:text-slate-100 text-sm mb-1">{localizedSvcName}</h5>
                        <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                          {SEED_DOCTORS.find(d => d.name === ap.doctor) ? translateDoctor(SEED_DOCTORS.find(d => d.name === ap.doctor)!, language).name : ap.doctor}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-y-2 text-[10px] text-gray-500 dark:text-slate-400 mt-4 leading-normal">
                          <div>
                            <strong>{tText("Cabang:", language)}</strong> {tText(ap.branch, language)}
                          </div>
                          <div>
                            <strong>{tText("Waktu:", language)}</strong> {ap.date} @ {ap.time} WIB
                          </div>
                          <div>
                            <strong>{tText("Bayar:", language)}</strong> Rp {ap.payment_fee.toLocaleString()}
                          </div>
                          <div>
                            <strong>{tText("Status Bayar:", language)}</strong> <span className="font-bold text-green-700 dark:text-green-400">{tText(ap.payment_status, language)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 dark:border-slate-800 pt-3 mt-4 text-[9px] text-gray-400 dark:text-slate-500 font-normal">
                        {tText("Tunjukkan QR Code di atas kepada assisten meja resepsionis setibanya Anda di klinik untuk pemindaian instan tanpa antrean manual.", language)}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: VISITED MEDIC HISTORY LIST */}
        {activePortalTab === 'history' && (
          <div className="text-left">
            <h4 className="text-sm font-bold text-gray-800 dark:text-slate-300 uppercase tracking-wider mb-4">{tText("Riwayat Kunjungan Medis & Terapi:", language)}</h4>
            
            <div className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-950 shadow-sm overflow-x-auto">
              <table className="w-full text-xs text-left text-gray-600 dark:text-slate-300">
                <thead className="bg-slate-950 dark:bg-slate-900 text-white uppercase text-[9px] tracking-wider">
                  <tr>
                    <th className="p-4">{tText("Tanggal Kunjungan", language)}</th>
                    <th className="p-4">{tText("Kode Booking", language)}</th>
                    <th className="p-4">{tText("Layanan / Tindakan", language)}</th>
                    <th className="p-4">{tText("Spesialis Dokter", language)}</th>
                    <th className="p-4">{tText("Cabang", language)}</th>
                    <th className="p-4">{tText("Status & Aftercare", language)}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150 dark:divide-slate-800">
                  {appointments.filter(a => a.status === 'Completed' || a.status === 'Paid' || a.status === 'Confirmed' || a.status === 'Rescheduled').map(ap => {
                    const matchSvc = SEED_SERVICES.find(s => s.name === ap.service);
                    const localizedSvcName = matchSvc ? translateService(matchSvc, language).name : ap.service;
                    return (
                      <tr key={ap.booking_code} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="p-4 font-bold">{ap.date}</td>
                        <td className="p-4 font-mono text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{ap.booking_code}</td>
                        <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">{localizedSvcName}</td>
                        <td className="p-4">
                          {SEED_DOCTORS.find(d => d.name === ap.doctor) ? translateDoctor(SEED_DOCTORS.find(d => d.name === ap.doctor)!, language).name : ap.doctor}
                        </td>
                        <td className="p-4">{tText(ap.branch, language)}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wide">
                            {tText(ap.status === "Completed" ? "Completed" : "Paid", language)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: MEMBERSHIP BENEFITS LEVEL OVERVIEW */}
        {activePortalTab === 'membership' && (
          <div className="text-left">
            <h4 className="text-sm font-bold text-gray-800 dark:text-slate-300 uppercase tracking-wider mb-4 justify-between flex items-center">
              <span>{tText("Program Member Plan Aurora", language)}</span>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
                {tText("Level Anda:", language)} {tText(patientTier.name, language)}
              </span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {SEED_MEMBERSHIPS.map(m => {
                const isActive = m.name === patientTier.name;
                return (
                  <div 
                    key={m.name} 
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      isActive 
                        ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20 shadow-md ring-2 ring-indigo-500/20 scale-[1.02]' 
                        : 'border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/40 text-gray-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <h5 className="font-extrabold text-xs text-slate-900 dark:text-slate-100 border-b border-gray-100 dark:border-slate-800 pb-2 flex items-center gap-1.5 justify-between">
                        {tText(m.name, language)}
                        {isActive && <span className="bg-indigo-600 text-[8px] text-white py-0.5 px-1.5 rounded uppercase tracking-wider">{tText("Aktif", language)}</span>}
                      </h5>
                      <div className="my-4 text-xs">
                        <span className="block text-gray-400 dark:text-slate-500 font-normal">{tText("Harga Keanggotaan:", language)}</span>
                        <span className="text-sm font-black text-slate-900 dark:text-slate-100">
                          {m.price === 0 ? tText("Fakultatif (Gratis)", language) : `Rp ${m.price.toLocaleString()}`}
                        </span>
                      </div>
                      
                      <ul className="flex flex-col gap-2.5 text-[10px] text-gray-500 dark:text-slate-400 font-normal mt-3 leading-relaxed">
                        {m.benefits.map((b, idx) => (
                          <li key={idx} className="flex gap-1.5">
                            <Star className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5 fill-indigo-100 dark:fill-indigo-950/40" />
                            <span>{tText(b, language)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-3 border-t border-gray-100 dark:border-slate-800">
                      <span className="text-[9px] text-gray-400 dark:text-slate-500 block mb-2">{tText("Durasi level:", language)} {tText(m.duration, language)}</span>
                      {!isActive && (
                        <button
                          type="button"
                          onClick={() => alert(tText("Silakan hubungi Billing Finance Admin untuk mendaftarkan upgrade level ke", language) + " " + tText(m.name, language) + " " + tText("secara aman!", language))}
                          className="w-full py-2 text-xs font-bold text-center border border-gray-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg cursor-pointer"
                        >
                          {tText("Daftar Plan Ini", language)}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* MODAL VIEW / SIMULATION PRINT INVOICE & RECEIPT */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-8 max-h-[90vh] overflow-y-auto text-left relative border border-slate-200 dark:border-slate-800">
            
            {/* Real aesthetic invoice layout printable */}
            <div id="printInvoiceArea" className="border-b border-dashed border-gray-200 dark:border-slate-800 pb-4 mb-4">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-2xl mr-1">✨</span>
                  <span className="text-sm font-extrabold text-gray-900 dark:text-slate-100">Aurora MedBeauty Clinic</span>
                  <p className="text-[9px] text-gray-400 dark:text-slate-500 uppercase tracking-widest font-bold mt-0.5">Senopati Office, Jakarta Selatan</p>
                </div>
                <div className="text-right">
                  <h4 className="text-xs font-black text-indigo-700 dark:text-indigo-400 font-mono">{tText("INVOICE PEMBAYARAN", language)}</h4>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500 block">{tText("Nomor:", language)} INV-{selectedInvoice.booking_code}</span>
                  <span className="text-[10px] text-gray-400 dark:text-slate-500 block">{tText("Tanggal:", language)} {selectedInvoice.date}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs border-y border-gray-100 dark:border-slate-800 py-3 mb-6 bg-slate-50/50 dark:bg-slate-950/40 px-3 rounded-xl">
                <div>
                  <span className="text-gray-400 dark:text-slate-500 block text-[9px] uppercase font-bold">{tText("Identitas Pasien:", language)}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedInvoice.patient_name}</span>
                  <span className="block text-[10px] text-gray-500 dark:text-slate-400">WhatsApp: {selectedInvoice.whatsapp}</span>
                </div>
                <div>
                  <span className="text-gray-400 dark:text-slate-500 block text-[9px] uppercase font-bold">{tText("Metode Transaksi:", language)}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{tText("E-Payment Simulator (VA/QRIS)", language)}</span>
                  <span className="block text-[10px] text-green-700 dark:text-green-400 font-extrabold flex items-center gap-0.5">
                    <UserCheck className="h-3 w-3 inline" /> {tText("PAID / LUNAS", language)}
                  </span>
                </div>
              </div>

              {/* Items tables */}
              <div className="text-xs">
                <div className="flex justify-between font-bold text-gray-400 dark:text-slate-500 border-b border-gray-100 dark:border-slate-800 pb-2 mb-2 uppercase text-[9px] tracking-wider">
                  <span>{tText("Deskripsi Pekerjaan Medis / Treatment", language)}</span>
                  <span>{tText("Biaya Terkandungi", language)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-150 dark:border-slate-800 pb-2 mb-3">
                  <div>
                    <span className="font-extrabold text-slate-900 dark:text-slate-100 block">
                      {SEED_SERVICES.find(s => s.name === selectedInvoice.service) ? translateService(SEED_SERVICES.find(s => s.name === selectedInvoice.service)!, language).name : selectedInvoice.service}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-slate-500">
                      {tText("Pakar Medis:", language)} {SEED_DOCTORS.find(d => d.name === selectedInvoice.doctor) ? translateDoctor(SEED_DOCTORS.find(d => d.name === selectedInvoice.doctor)!, language).name : selectedInvoice.doctor}
                    </span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Rp {selectedInvoice.payment_fee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100 text-sm border-t border-gray-100 dark:border-slate-800 pt-3">
                  <span>{tText("TOTAL PEMBAYARAN BOOKING FEE:", language)}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-black">Rp {selectedInvoice.payment_fee.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="text-[9px] text-gray-400 dark:text-slate-500 italic text-center mb-6">
              {tText("Pembayaran ini sah diproses secara digital dan dilidungi enkripsi Aurora MedBeauty. Biaya pelunasan treatment penuh dilakukan di kasir outlet pasca tindakan selesai.", language)}
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-3 text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer border-0"
              >
                <Printer className="h-4 w-4" /> {tText("Cetak Buku Receipt (PDF)", language)}
              </button>
              <button 
                onClick={() => setSelectedInvoice(null)} 
                className="px-6 py-3 text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl border-y-0"
              >
                {tText("Tutup Invoice", language)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DISPATCH RESCHEDULE RESIDENCE DIALOG */}
      {rescheduleCode && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 text-left relative border border-slate-200 dark:border-slate-800">
            <h3 className="font-black text-gray-900 dark:text-slate-100 text-base mb-2 font-display">{tText("Ajukan Perubahan Jadwal Medis", language)}</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">{tText("Pilih shift tanggal dan jam alternatif untuk booking", language)} <strong>{rescheduleCode}</strong> {tText("sesuai kelonggaran jadwal Anda:", language)}</p>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">{tText("Tanggal Baru:", language)}</label>
                <input
                  type="date"
                  value={newRescheduleDate}
                  onChange={(e) => setNewRescheduleDate(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-slate-800 focus:outline-none bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">{tText("Pilih Jam Alternatif:", language)}</label>
                <select
                  value={newRescheduleTime}
                  onChange={(e) => setNewRescheduleTime(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-slate-800 focus:outline-none bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100"
                >
                  {['09:00', '10:30', '11:00', '13:00', '14:30', '15:30', '17:00', '18:30', '19:00'].map(t => (
                    <option key={t} value={t}>{t} WIB</option>
                  ))}
                </select>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl text-[10px] text-amber-800 dark:text-amber-300 leading-relaxed font-normal">
                {tText("Sistem asisten perawat akan mencocokkan ketersediaan jadwal dokter dan mengirim notifikasi WhatsApp konfirmasi maksimal dalam 1 jam terhitung sejak request dikirim.", language)}
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setRescheduleCode(null)} 
                className="flex-1 py-3 text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl border-0 cursor-pointer"
              >
                {tText("Batal", language)}
              </button>
              <button 
                onClick={() => submitReschedule(rescheduleCode)} 
                className="flex-1 py-3 text-xs font-bold text-white hover:opacity-90 rounded-xl border-0 cursor-pointer"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {tText("Ajukan Sekarang", language)}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
