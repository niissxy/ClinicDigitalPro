import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, 
  ArrowRight, Key, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { ThemeConfig } from '../types';

interface AdminAuthProps {
  theme: ThemeConfig;
  onLoginSuccess: (user: { name: string; email: string; role: string }) => void;
}

interface UserAccount {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: string;
}

export default function AdminAuth({ theme, onLoginSuccess }: AdminAuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Retrieve accounts from localStorage, seed default admin if not existing
  const [accounts, setAccounts] = useState<UserAccount[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('clinic_admin_accounts');
    if (stored) {
      try {
        setAccounts(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse accounts', e);
      }
    } else {
      // Seed default admin accounts
      const defaultAccounts: UserAccount[] = [
        {
          name: "Super Admin",
          email: "superadmin@auroramedbeauty.id",
          phone: "08123456789",
          passwordHash: "admin123", // Simple plain text or simulated hash for demo
          role: "Super Admin"
        },
        {
          name: "Dr. Amelia",
          email: "amelia@auroramedbeauty.id",
          phone: "08122334455",
          passwordHash: "dokter123",
          role: "Doctor"
        },
        {
          name: "Anisa Putri",
          email: "anisa@auroramedbeauty.id",
          phone: "08129988776",
          passwordHash: "anisa123",
          role: "Customer Service"
        }
      ];
      localStorage.setItem('clinic_admin_accounts', JSON.stringify(defaultAccounts));
      setAccounts(defaultAccounts);
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!name.trim()) return setError('Nama lengkap wajib diisi');
    if (!email.trim() || !email.includes('@')) return setError('Format email tidak valid');
    if (!phone.trim()) return setError('Nomor HP wajib diisi');
    if (password.length < 6) return setError('Password minimal 6 karakter');

    // Check duplicate
    const exists = accounts.some(acc => acc.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return setError('Email sudah terdaftar. Gunakan email lain.');
    }

    const newUser: UserAccount = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      passwordHash: password, // Plain text demo password validation
      role: "Super Admin" // Registered users can default to Super Admin
    };

    const updatedAccounts = [...accounts, newUser];
    localStorage.setItem('clinic_admin_accounts', JSON.stringify(updatedAccounts));
    setAccounts(updatedAccounts);

    setSuccess('Registrasi akun admin berhasil! Silakan login.');
    
    // Clear registration fields
    setName('');
    setPhone('');
    setPassword('');
    // Switch to login tab
    setTimeout(() => {
      setIsLogin(true);
      setError('');
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) return setError('Email wajib diisi');
    if (!password.trim()) return setError('Password wajib diisi');

    const matched = accounts.find(
      acc => acc.email.toLowerCase() === email.trim().toLowerCase() && acc.passwordHash === password
    );

    if (matched) {
      setSuccess(`Selamat datang kembali, ${matched.name}!`);
      setTimeout(() => {
        onLoginSuccess({
          name: matched.name,
          email: matched.email,
          role: matched.role
        });
      }, 1000);
    } else {
      setError('Email atau password salah. Coba lagi.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      {/* Title block */}
      <div className="text-center mb-8">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg"
          style={{ backgroundColor: theme.primaryColor }}
        >
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-slate-100 tracking-tight font-display">
          Admin Gate Control
        </h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 font-medium">
          Masuk ke dashboard manajemen klinik medikolegal Aurora
        </p>
      </div>

      {/* Auth Card */}
      <div className="bg-white dark:bg-slate-900/90 backdrop-blur-md rounded-3xl border border-gray-100 dark:border-slate-800 p-6 shadow-xl shadow-slate-950/5 relative overflow-hidden">
        
        {/* Decorative ambient background accent */}
        <div 
          className="absolute -top-10 -right-10 w-24 h-24 rounded-full filter blur-2xl opacity-10"
          style={{ backgroundColor: theme.primaryColor }}
        />
        
        {/* Mode switcher tabs */}
        <div className="grid grid-cols-2 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl mb-6 border border-gray-200/40 dark:border-slate-800/60">
          <button
            onClick={() => {
              setIsLogin(true);
              setError('');
              setSuccess('');
            }}
            className={`py-2.5 text-xs font-black rounded-lg transition-all cursor-pointer ${
              isLogin 
                ? 'bg-white dark:bg-slate-900 text-gray-900 dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Masuk (Login)
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError('');
              setSuccess('');
            }}
            className={`py-2.5 text-xs font-black rounded-lg transition-all cursor-pointer ${
              !isLogin 
                ? 'bg-white dark:bg-slate-900 text-gray-900 dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Daftar (Register)
          </button>
        </div>

        {/* Feedback Messages */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 p-3.5 rounded-xl text-xs mb-5 font-semibold border border-rose-100 dark:border-rose-950/50"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 p-3.5 rounded-xl text-xs mb-5 font-semibold border border-emerald-100 dark:border-emerald-950/50"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}

        {/* Forms with motion transitions */}
        {isLogin ? (
          <motion.form 
            key="login-form"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleLogin} 
            className="space-y-4"
          >
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@auroramedbeauty.id"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-1 focus:border-indigo-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-1 focus:border-indigo-500 focus:outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full text-white py-3 px-4 rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-95"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <span>Masuk Sekarang</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Quick Helper Guide */}
            <div className="mt-6 border-t border-gray-100 dark:border-slate-800/80 pt-4">
              <span className="block text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                Akun Demo Bawaan (Seed):
              </span>
              <div className="space-y-1 text-[10px] text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                <p>🔑 <strong className="text-gray-700 dark:text-slate-200">Super Admin:</strong> superadmin@auroramedbeauty.id / <code className="bg-slate-100 dark:bg-slate-950 px-1 py-0.5 rounded text-indigo-600">admin123</code></p>
                <p>🔑 <strong className="text-gray-700 dark:text-slate-200">Dokter Spesialis:</strong> amelia@auroramedbeauty.id / <code className="bg-slate-100 dark:bg-slate-950 px-1 py-0.5 rounded text-indigo-600">dokter123</code></p>
              </div>
            </div>
          </motion.form>
        ) : (
          <motion.form 
            key="register-form"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleRegister} 
            className="space-y-4"
          >
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                Nama Lengkap
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rizky Pratama"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-1 focus:border-indigo-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama.admin@auroramedbeauty.id"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-1 focus:border-indigo-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                Nomor HP (WhatsApp)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <Phone className="h-4 w-4" />
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081xxxxxxxxxx"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-1 focus:border-indigo-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-1 focus:border-indigo-500 focus:outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full text-white py-3 px-4 rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-95"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <span>Daftar Akun Baru</span>
                <Key className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}
