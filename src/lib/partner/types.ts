export interface Partner {
  id: string;
  full_name: string;
  firm_name: string | null;
  arn_number: string;
  email: string;
  phone: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  linkedin_url: string | null;
  whatsapp_number: string | null;
  sebi_reg_number: string | null;
  tagline: string | null;
  about_text: string | null;
  logo_url: string | null;
  profile_photo_url: string | null;
  signature_url: string | null;
  brand_color: string;
  secondary_color: string;
  report_header_style: 'professional' | 'clean' | 'bold';
  custom_disclaimer: string | null;
  cta_text: string;
  cta_url: string | null;
  plan: 'starter' | 'pro' | 'enterprise';
  distributor_status: 'empanelled' | 'in_progress' | 'need_help' | 'exploring';
  is_active: boolean;
  reports_sent: number;
  widget_key: string;
  password_hash: string | null;
  aum_band: string | null;
  created_at: string;
}

export interface PartnerLead {
  id: string;
  partner_id: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  investable_surplus: string | null;
  risk_profile: string | null;
  current_investments: string[] | null;
  priorities: string[] | null;
  sif_category_match: string | null;
  sif_familiarity: string | null;
  top_fund_recommendations: FundRecommendation[] | null;
  report_id: string;
  report_sent_at: string | null;
  consultation_booked: boolean;
  aum_in_pipeline: number | null;
  status: 'new' | 'report_sent' | 'consultation_booked' | 'invested' | 'following_up';
  source: string;
  created_at: string;
}

export interface FundRecommendation {
  fundName: string;
  amc: string;
  alphaShieldScore: number | null;
  marchReturn: number | null;
  category: string;
  verdict: 'best_match' | 'strong_fit' | 'consider';
}

export interface PartnerStats {
  total_prospects: number;
  reports_sent: number;
  consultations_booked: number;
  aum_in_pipeline: number;
  branding_completeness_pct: number;
}

export type SignupFormData = {
  full_name: string;
  firm_name: string;
  arn_number: string;
  email: string;
  phone: string;
  city: string;
  aum_band: string;
  distributor_status: string;
  plan: string;
  password: string;
};
