/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ClinicThemeId = 
  | 'luxury-aesthetic' 
  | 'modern-skincare' 
  | 'medical-dermatology' 
  | 'dental-clinic' 
  | 'family-health' 
  | 'wellness-antiaging';

export interface ThemeConfig {
  id: ClinicThemeId;
  name: string;
  tagline: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  cardColor: string;
  textColor: string;
  fontSans: string;
  fontDisplay: string;
  logoEmoji: string;
}

export type LanguageId = 'id' | 'en' | 'ar' | 'zh' | 'ja';

export interface Branch {
  name: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  opening_hours: string;
  maps_url: string;
  is_main_branch: boolean;
}

export interface ServiceCategory {
  name: string;
  slug: string;
  description: string;
}

export interface Service {
  name: string;
  category: string;
  price_start: number;
  promo_price: number;
  duration: string;
  description: string;
  benefits: string[];
  suitable_for: string[];
  contraindications: string[];
  preparation: string;
  aftercare: string;
  cta: string;
}

export interface DoctorSchedule {
  day: string;
  time: string;
}

export interface Doctor {
  name: string;
  specialty: string;
  experience_years: number;
  languages: string[];
  branch: string;
  bio: string;
  schedule: DoctorSchedule[];
  services: string[];
  rating: number;
  avatar?: string;
}

export type AppointmentStatus = 
  | 'Pending' 
  | 'Confirmed' 
  | 'Waiting Payment' 
  | 'Paid' 
  | 'Rescheduled' 
  | 'Cancelled' 
  | 'No Show' 
  | 'Checked In' 
  | 'Completed' 
  | 'Follow Up Needed';

export type PaymentStatus = 
  | 'Pending' 
  | 'Paid' 
  | 'Failed' 
  | 'Expired' 
  | 'Refunded' 
  | 'Cancelled' 
  | 'Manual Verification';

export interface Appointment {
  booking_code: string;
  patient_name: string;
  whatsapp: string;
  email: string;
  service: string;
  doctor: string;
  branch: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  payment_status: PaymentStatus;
  source: string;
  initial_complaint: string;
  notes: string;
  payment_fee: number;
}

export type LeadStatus = 
  | 'New Lead' 
  | 'Contacted' 
  | 'Hot Lead' 
  | 'Warm Lead' 
  | 'Cold Lead' 
  | 'Consultation Booked' 
  | 'Treatment Booked' 
  | 'Visited' 
  | 'Completed' 
  | 'No Response' 
  | 'Lost' 
  | 'Reactivation';

export interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  source: string;
  campaign?: string;
  interest: string;
  concern: string[];
  budget: string;
  branch_interest: string;
  status: LeadStatus;
  lead_score: number;
  assigned_admin: string;
  last_contacted: string;
  next_action: string;
  notes: string;
  age?: number;
}

export interface Promo {
  name: string;
  description: string;
  service: string;
  normal_price: number;
  promo_price: number;
  discount_percent: number;
  start_date: string;
  end_date: string;
  quota: number;
  branch: string[];
  status: 'Active' | 'Inactive';
  cta: string;
}

export interface Membership {
  name: string;
  price: number;
  duration: string;
  benefits: string[];
}

export interface BeforeAfterCase {
  case_title: string;
  service: string;
  doctor: string;
  duration: string;
  description: string;
  consent_status: 'Approved' | 'Pending';
  disclaimer: string;
  imageBefore?: string;
  imageAfter?: string;
}

export interface Testimonial {
  name: string;
  service: string;
  rating: number;
  review: string;
  source: string;
}

export interface BlogPost {
  title: string;
  category: string;
  author: string;
  excerpt: string;
  tags: string[];
  status: 'Published' | 'Draft';
  date: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface AdminUser {
  name: string;
  email: string;
  role: string;
  access: string;
}

export interface PaymentLog {
  invoice_number: string;
  booking_code: string;
  patient_name: string;
  amount: number;
  payment_method: string;
  payment_status: PaymentStatus;
  paid_at: string | null;
  description: string;
}

export interface AuditLog {
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details: string;
}

export interface NotificationTemplate {
  name: string;
  subject: string;
  content: string;
}
