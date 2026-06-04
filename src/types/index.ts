export type ServiceType =
  | 'AI Development'
  | 'Web Development'
  | 'SaaS Development'
  | 'Automation Systems'
  | ''

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  project_details: string;
}

export interface ContactSubmission extends ContactFormData {
  id?: string;
  created_at?: string;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
