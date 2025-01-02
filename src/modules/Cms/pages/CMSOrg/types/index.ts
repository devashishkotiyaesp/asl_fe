export interface PointData {
  title: string;
  description: string;
}

export interface BannerResponse {
  eyebrow_title: string;
  title: string;
  description: string;
  button_text: string;
  button_url: string | null;
  form_title: string;
  point_data_array: PointData[];
}

export interface OrgWorkResponse {
  eyebrow_title: string;
  title: string;
  description: string;
  point_data_array: PointData[];
}

export interface CtaStripeResponse {
  button_url: string | null;
  title: string;
  description: string;
  button_text: string;
}

interface Benefit {
  banner_image: string;
  benefit_title: string;
  description: string;
  button_text: string;
  button_url: string | null;
  uniqueId?: number; // Unique ID may be optional as not all objects have it
}

export interface OrgBenefitResponse {
  eyebrow_title: string;
  banner_title: string;
  description: string;
  benefitList: Benefit[];
}
