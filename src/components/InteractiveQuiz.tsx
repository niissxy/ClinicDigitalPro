/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, MessageCircle, ArrowRight, UserPlus, FileText, Check, Shield } from 'lucide-react';
import { Lead, LanguageId, ClinicThemeId } from '../types';
import { SEED_BRANCHES, THEME_PRESETS } from '../data/seedData';
import { tText } from '../utils/translate';

interface InteractiveQuizProps {
  themeId: ClinicThemeId;
  language: LanguageId;
  onSubmitQuiz: (lead: Omit<Lead, 'id'>) => void;
  onNavigateToBooking: (serviceName: string) => void;
}

const CONCERNS = [
  'Jerawat aktif', 'Bekas jerawat', 'Flek hitam', 'Kulit kusam', 
  'Pori besar', 'Kerutan halus', 'Kulit kendur', 'Komedo', 
  'Kulit sensitif', 'Warna kulit tidak merata', 'Double chin', 
  'Rambut rontok', 'Stretch mark', 'Body slimming'
];

const SKIN_TYPES = [
  'Berminyak', 'Kering', 'Kombinasi', 'Sensitif', 'Normal', 'Tidak tahu'
];

const TARGETS = [
  'Kulit lebih cerah', 'Jerawat lebih terkendali', 'Bekas jerawat memudar', 
  'Kulit lebih glowing', 'Wajah lebih kencang', 'Pori tampak lebih halus', 
  'Bentuk wajah lebih proporsional', 'Ingin konsultasi dulu'
];

const BUDGET_OPTIONS = [
  'Di bawah Rp500.000',
  'Rp500.000 - Rp1.000.000',
  'Rp1.000.000 - Rp2.000.000',
  'Rp2.000.000 - Rp5.000.000',
  'Di atas Rp5.000.000'
];

// Matching logic for output
const MATCH_SERVICE_MAP: Record<string, string> = {
  'Jerawat aktif': 'Acne Clear Program',
  'Bekas jerawat': 'Laser Rejuvenation',
  'Flek hitam': 'Laser Rejuvenation',
  'Kulit kusam': 'Brightening Glow Facial',
  'Pori besar': 'Brightening Glow Facial',
  'Kulit kendur': 'HIFU Face Lifting',
  'Double chin': 'HIFU Face Lifting',
  'Rambut rontok': 'Laser Rejuvenation',
  'default': 'Brightening Glow Facial'
};

export default function InteractiveQuiz({ themeId, language, onSubmitQuiz, onNavigateToBooking }: InteractiveQuizProps) {
  const theme = THEME_PRESETS[themeId];
  const [step, setStep] = useState(1);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [skinType, setSkinType] = useState('');
  const [targetResult, setTargetResult] = useState('');
  const [leadData, setLeadData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    age: 25,
    branch: SEED_BRANCHES[0].city,
    budget: BUDGET_OPTIONS[1],
    visitTime: 'Hari kerja (Sore)'
  });
  const [recommendedService, setRecommendedService] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Toggle multiple concerns
  const toggleConcern = (concern: string) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(selectedConcerns.filter(c => c !== concern));
    } else {
      setSelectedConcerns([...selectedConcerns, concern]);
    }
  };

  const nextStep = () => {
    if (step === 1 && selectedConcerns.length === 0) {
      alert(tText("Pilih minimal satu Skin Concern Anda!", language));
      return;
    }
    if (step === 2 && !skinType) {
      alert(tText("Pilih tipe kulit Anda!", language));
      return;
    }
    if (step === 3 && !targetResult) {
      alert(tText("Pilih target hasil yang Anda inginkan!", language));
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.whatsapp || !leadData.email) {
      alert(tText("Harap lengkapi semua isian kontak utama Anda.", language));
      return;
    }

    // Determine matched service based on concerns
    const matched = selectedConcerns.map(c => MATCH_SERVICE_MAP[c]).filter(Boolean);
    const serviceName = matched[0] || MATCH_SERVICE_MAP.default;
    setRecommendedService(serviceName);

    // AI Lead Scoring calculation simulator
    let score = 70;
    if (leadData.budget.includes('Rp2.000.000') || leadData.budget.includes('Rp1.000.000')) score += 15;
    if (selectedConcerns.length > 2) score += 10;
    if (leadData.whatsapp.startsWith('+628') || leadData.whatsapp.startsWith('08')) score += 5;
    score = Math.min(score, 98);

    // Create a new lead to submit
    const newLead = {
      name: leadData.name,
      whatsapp: leadData.whatsapp,
      email: leadData.email,
      source: 'Skin Concern Quiz',
      campaign: 'Skin Quiz Automated Matching',
      interest: serviceName,
      concern: selectedConcerns,
      budget: leadData.budget,
      branch_interest: leadData.branch,
      status: 'New Lead' as const,
      lead_score: score,
      assigned_admin: 'AI Medical Coach',
      last_contacted: new Date().toISOString().split('T')[0],
      next_action: 'Hubungi via WhatsApp untuk program ' + serviceName,
      notes: `Skin Type: ${skinType}. Target: ${targetResult}. Perjalanan diagnosa quiz selesai.`,
      age: Number(leadData.age)
    };

    onSubmitQuiz(newLead);
    setIsSubmitted(true);
    setStep(5);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 max-w-3xl mx-auto my-6">
      {/* Quiz Progress header */}
      <div className="bg-gradient-to-r p-6 text-white" style={{ backgroundImage: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColor}dd)` }}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2.5 rounded-xl">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display">{tText("Skin & Wellness Assessor", language)}</h3>
            <p className="text-xs text-white/90">{tText("Dapatkan asisten rekomendasi treatment yang dipersonalisasi secara klinis.", language)}</p>
          </div>
        </div>

        {/* Step dots */}
        {!isSubmitted && (
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3, 4].map(s => (
              <React.Fragment key={s}>
                <div className={`h-2.5 rounded-full transition-all ${step === s ? 'w-8 bg-white' : 'w-2.5 bg-white/40'}`} />
                {s < 4 && <div className="flex-1 h-0.5 bg-white/20" />}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div className="p-8">
        {/* Step 1: Skin concerns selection */}
        {step === 1 && (
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">{tText("Step 1: Apa concern utama kulit atau tubuh Anda?", language)}</h4>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">{tText("Pilih sebanyak yang sesuai. Kami akan mengukur prioritas treatment terbaik.", language)}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CONCERNS.map(c => {
                const checked = selectedConcerns.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleConcern(c)}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left text-xs font-medium transition-all ${
                      checked 
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold' 
                        : 'border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-950'
                    }`}
                  >
                    <div className="w-4 h-4 rounded flex items-center justify-center border text-[10px] bg-white dark:bg-slate-950 border-gray-300 dark:border-slate-700">
                      {checked && <Check className="h-3 w-3 inline" />}
                    </div>
                    {tText(c, language)}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end mt-8 pt-4 border-t border-gray-100 dark:border-slate-800">
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {tText("Melanjutkan", language)} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Skin type */}
        {step === 2 && (
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2 font-display">{tText("Step 2: Bagaimana tipe kulit Anda saat ini?", language)}</h4>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">{tText("Membantu kami merekomendasikan formula aftercare yang aman bagi kulit wajah.", language)}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {SKIN_TYPES.map(st => {
                const isSel = skinType === st;
                return (
                  <button
                    key={st}
                    onClick={() => setSkinType(st)}
                    className={`p-4 rounded-2xl border text-center text-sm font-semibold transition-all ${
                      isSel 
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 scale-[1.02]' 
                        : 'border-gray-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-950'
                    }`}
                  >
                    {tText(st, language)}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between mt-8 pt-4 border-t border-gray-100 dark:border-slate-800">
              <button onClick={prevStep} className="px-5 py-2.5 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"> {tText("Kembali", language)} </button>
              <button 
                onClick={nextStep} 
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {tText("Melanjutkan", language)} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Target results */}
        {step === 3 && (
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2 font-display">{tText("Step 3: Apa tujuah / target utama hasil yang Anda idamkan?", language)}</h4>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">{tText("Kami mengarahkan program medis kosmetik agar hasil maksimal didapatkan pasien.", language)}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {TARGETS.map(t => {
                const isSel = targetResult === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTargetResult(t)}
                    className={`p-4 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                      isSel 
                        ? 'border-indigo-500 bg-indigo-50/55 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300' 
                        : 'border-gray-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-950'
                    }`}
                  >
                    {tText(t, language)}
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSel ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-slate-700'}`}>
                      {isSel && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between mt-8 pt-4 border-t border-gray-100 dark:border-slate-800">
              <button onClick={prevStep} className="px-5 py-2.5 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"> {tText("Kembali", language)} </button>
              <button 
                onClick={nextStep} 
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {tText("Melanjutkan", language)} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Medical contact form (Lead Gen) */}
        {step === 4 && (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-100/60 dark:border-rose-950/30 p-4 rounded-2xl mb-6">
              <UserPlus className="h-5 w-5 text-rose-500 dark:text-rose-400 flex-shrink-0" />
              <div className="text-xs text-rose-800 dark:text-rose-300">
                {tText("Data Anda aman bersama kami. Kami akan mengalkulasikan skin concern score Anda dan mengirim e-rekomendasi dokter langsung ke nomor WhatsApp Anda.", language)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">{tText("Nama Lengkap Pasien *", language)}</label>
                <input
                  type="text"
                  required
                  placeholder={tText("Contoh: Salsa Amira", language)}
                  value={leadData.name}
                  onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">{tText("No. WhatsApp Aktif (Untuk Kirim Hasil) *", language)}</label>
                <input
                  type="tel"
                  required
                  placeholder={tText("Contoh: 081211112222", language)}
                  value={leadData.whatsapp}
                  onChange={(e) => setLeadData({ ...leadData, whatsapp: e.target.value })}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">{tText("Alamat Email *", language)}</label>
                <input
                  type="email"
                  required
                  placeholder={tText("Contoh: salsa@email.com", language)}
                  value={leadData.email}
                  onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">{tText("Umur Pasien (Tahun)", language)}</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={leadData.age}
                  onChange={(e) => setLeadData({ ...leadData, age: Number(e.target.value) })}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 bg-gray-50/50 dark:bg-slate-950 text-gray-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">{tText("Cabang Utama Terdekat", language)}</label>
                <select
                  value={leadData.branch}
                  onChange={(e) => setLeadData({ ...leadData, branch: e.target.value })}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100"
                >
                  {SEED_BRANCHES.map(b => (
                    <option key={b.city} value={b.city} className="dark:bg-slate-950">{b.name} ({b.city})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5">{tText("Estimasi Budget Sekali Kunjungan *", language)}</label>
                <select
                  value={leadData.budget}
                  onChange={(e) => setLeadData({ ...leadData, budget: e.target.value })}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100"
                >
                  {BUDGET_OPTIONS.map(bo => (
                    <option key={bo} value={bo} className="dark:bg-slate-950">{tText(bo, language)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-5">
              <input type="checkbox" id="quizConsent" required className="rounded border-gray-300 text-indigo-600 bg-white dark:bg-slate-950" />
              <label htmlFor="quizConsent" className="text-[11px] text-gray-500 dark:text-slate-400">
                {tText("Saya menyetujui pengisian data konsultasi dan consent keamanan data sesuai dengan Privacy Policy Aurora MedBeauty.", language)}
              </label>
            </div>

            <div className="flex justify-between mt-8 pt-4 border-t border-gray-100 dark:border-slate-800">
              <button type="button" onClick={prevStep} className="px-5 py-2.5 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"> {tText("Kembali", language)} </button>
              <button 
                type="submit" 
                className="flex items-center gap-2 px-8 py-3 rounded-xl text-white text-sm font-semibold shadow-md cursor-pointer hover:opacity-90"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {tText("PROSES REKOMENDASI AI", language)} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 5: Matching Output */}
        {step === 5 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-50 dark:bg-emerald-950/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200 dark:border-emerald-900/40">
              <Check className="h-8 w-8 text-green-600 dark:text-emerald-400" />
            </div>

            <h4 className="text-2xl font-bold text-gray-900 dark:text-slate-100 font-display">{tText("Skin Assessor Match Terkalkulasi!", language)}</h4>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
              {tText("Sistem matcher kognitif kami telah mencocokkan keluhan medis Anda dengan program premium terbaik di", language)} {tText(theme.name, language)}.
            </p>

            <div className="my-8 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800 max-w-md mx-auto p-6 text-left">
              <div className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-400 tracking-widest mb-1.5 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 inline animate-spin-slow" />
                {tText("Rekomendasi Utama AI", language)}
              </div>
              <h5 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">{tText(recommendedService, language)}</h5>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-4">
                {tText("Program klinis terstruktur yang disesuaikan khusus untuk merawat kondisi", language)} {selectedConcerns.map(c => tText(c, language)).join(', ')} {tText("demi mendapatkan hasil terbaik secara berkala dalam", language)} {recommendedService.includes('HIFU') ? tText("12 minggu", language) : tText("4-8 minggu", language)}.
              </p>

              <div className="flex flex-col gap-2 border-t border-slate-200/60 dark:border-slate-800 pt-4">
                <div className="text-[10px] text-gray-500 dark:text-slate-400">
                  <span className="font-bold text-gray-700 dark:text-slate-300">{tText("Tipe Kulit", language)}:</span> {tText(skinType, language)}
                </div>
                <div className="text-[10px] text-gray-500 dark:text-slate-400">
                  <span className="font-bold text-gray-700 dark:text-slate-300">{tText("Target Utama", language)}:</span> {tText(targetResult, language)}
                </div>
                <div className="text-[10px] text-gray-500 dark:text-slate-400">
                  <span className="font-bold text-gray-700 dark:text-slate-300">{tText("Skor Kebutuhan Medis", language)}:</span> 
                  <span className="ml-1 px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold">{tText("94% Urgent Priority", language)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <button
                type="button"
                onClick={() => onNavigateToBooking(recommendedService)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-white text-sm font-bold shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {tText("Booking Treatment Ini Sekarang", language)} <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setIsSubmitted(false);
                  setSelectedConcerns([]);
                  setSkinType('');
                  setTargetResult('');
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                {tText("Ulangi Tes Quiz", language)}
              </button>
            </div>

            {/* Medical disclaimer layer */}
            <div className="mt-8 flex items-start gap-2.5 bg-gray-50 dark:bg-slate-950/20 border border-gray-200/80 dark:border-slate-800 p-4 rounded-xl text-left text-[10px] text-gray-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
              <Shield className="h-4 w-4 text-gray-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gray-700 dark:text-slate-300">{tText("Medical Disclaimer", language)}:</span> {tText("Rekomendasi skin quiz asisten AI ini bukan merupakan diagnosis medis formal. Tindakan dan perawatan klinis ideal harus didasarkan pada examination, anjuran medis, dan konsultasi interaktif langsung bersama dokter atau pakar kulit profesional di cabang klinik kami.", language)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
