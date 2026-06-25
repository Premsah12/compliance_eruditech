export interface CompanyInfo {
  firstName: string;
  companyName: string;
  industry: string;
  country: string;
  companySize: string;
  email: string;
}

export interface AssessmentState {
  companyInfo: CompanyInfo;

  selectedFrameworks: string[];

  responses: Record<
    string,
    Record<string, string>
  >;

  isComplete: boolean;

  emailConsent?: boolean;

  contactConsent?: boolean;
}