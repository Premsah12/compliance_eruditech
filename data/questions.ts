import { Framework } from "@/lib/frameworks";

export type Question = {
  id: string;
  category: string;
  question: string;
};

export const QUESTIONS: Record<Framework, Question[]> = {
  DPDPA: [
    { id: "DP1", category: "Consent", question: "Do you obtain explicit consent before collecting personal data?" },
    { id: "DP2", category: "Consent", question: "Are consent records maintained securely?" },
    { id: "DP3", category: "Consent", question: "Can users withdraw consent easily?" },
    { id: "DP4", category: "Consent", question: "Are privacy notices presented clearly?" },
    { id: "DP5", category: "Data Inventory", question: "Do you maintain a record of personal data collected?" },

    { id: "DP6", category: "Security", question: "Is personal data encrypted at rest?" },
    { id: "DP7", category: "Security", question: "Is personal data encrypted during transmission?" },
    { id: "DP8", category: "Security", question: "Do you implement access controls?" },
    { id: "DP9", category: "Security", question: "Are access logs reviewed regularly?" },
    { id: "DP10", category: "Security", question: "Do you conduct security audits?" },

    { id: "DP11", category: "Breach Response", question: "Do you have a documented breach response plan?" },
    { id: "DP12", category: "Breach Response", question: "Are breaches reported within legal timelines?" },
    { id: "DP13", category: "Breach Response", question: "Is breach response tested periodically?" },
    { id: "DP14", category: "Breach Response", question: "Are incident logs maintained?" },
    { id: "DP15", category: "Breach Response", question: "Do you conduct post-incident reviews?" },

    { id: "DP16", category: "Retention", question: "Are data retention schedules documented?" },
    { id: "DP17", category: "Retention", question: "Can users request deletion of data?" },
    { id: "DP18", category: "Retention", question: "Is secure deletion implemented?" },
    { id: "DP19", category: "Retention", question: "Are deletion activities auditable?" },
    { id: "DP20", category: "Governance", question: "Are regular privacy assessments conducted?" }
  ],

  HIPAA: [
    { id: "H1", category: "Administrative", question: "Do you have a designated Privacy Officer?" },
    { id: "H2", category: "Administrative", question: "Are HIPAA policies documented?" },
    { id: "H3", category: "Administrative", question: "Are employees trained annually?" },
    { id: "H4", category: "Administrative", question: "Are risk assessments conducted regularly?" },
    { id: "H5", category: "Administrative", question: "Do you maintain sanction policies?" },

    { id: "H6", category: "Physical", question: "Are facilities physically secured?" },
    { id: "H7", category: "Physical", question: "Are visitor logs maintained?" },
    { id: "H8", category: "Physical", question: "Are workstations protected?" },
    { id: "H9", category: "Physical", question: "Is media disposal controlled?" },
    { id: "H10", category: "Physical", question: "Is device access restricted?" },

    { id: "H11", category: "Technical", question: "Is PHI encrypted at rest?" },
    { id: "H12", category: "Technical", question: "Is PHI encrypted in transit?" },
    { id: "H13", category: "Technical", question: "Are audit logs maintained?" },
    { id: "H14", category: "Technical", question: "Are access controls enforced?" },
    { id: "H15", category: "Technical", question: "Is MFA implemented?" },

    { id: "H16", category: "Breach", question: "Do you have breach notification procedures?" },
    { id: "H17", category: "Breach", question: "Are incidents investigated?" },
    { id: "H18", category: "Breach", question: "Are Business Associate Agreements maintained?" },
    { id: "H19", category: "Breach", question: "Are breaches documented?" },
    { id: "H20", category: "Governance", question: "Do you perform compliance reviews?" }
  ],

  ISO27001: [
    { id: "ISO1", category: "Risk Management", question: "Do you conduct regular risk assessments?" },
    { id: "ISO2", category: "Risk Management", question: "Are treatment plans documented?" },
    { id: "ISO3", category: "Risk Management", question: "Are risk owners assigned?" },
    { id: "ISO4", category: "Risk Management", question: "Are risks reviewed periodically?" },
    { id: "ISO5", category: "Risk Management", question: "Are residual risks accepted formally?" },

    { id: "ISO6", category: "Policies", question: "Are security policies documented?" },
    { id: "ISO7", category: "Policies", question: "Are policies approved by management?" },
    { id: "ISO8", category: "Policies", question: "Are policies communicated to employees?" },
    { id: "ISO9", category: "Policies", question: "Are policies reviewed annually?" },
    { id: "ISO10", category: "Policies", question: "Are exceptions documented?" },

    { id: "ISO11", category: "Access Control", question: "Is least privilege enforced?" },
    { id: "ISO12", category: "Access Control", question: "Are user reviews conducted?" },
    { id: "ISO13", category: "Access Control", question: "Is MFA implemented?" },
    { id: "ISO14", category: "Access Control", question: "Are privileged accounts monitored?" },
    { id: "ISO15", category: "Access Control", question: "Are inactive accounts removed?" },

    { id: "ISO16", category: "Incident Management", question: "Do you maintain incident procedures?" },
    { id: "ISO17", category: "Incident Management", question: "Are incidents logged?" },
    { id: "ISO18", category: "Incident Management", question: "Are response exercises conducted?" },
    { id: "ISO19", category: "Incident Management", question: "Are lessons learned documented?" },
    { id: "ISO20", category: "Improvement", question: "Is continual improvement practiced?" }
  ],

  SOC2: [
    { id: "SOC1", category: "Security", question: "Are security policies documented?" },
    { id: "SOC2", category: "Security", question: "Is employee security training conducted?" },
    { id: "SOC3", category: "Security", question: "Is access granted using least privilege?" },
    { id: "SOC4", category: "Security", question: "Are background checks performed?" },
    { id: "SOC5", category: "Security", question: "Are vendor risks assessed?" },

    { id: "SOC6", category: "Availability", question: "Are backups performed regularly?" },
    { id: "SOC7", category: "Availability", question: "Are backups tested?" },
    { id: "SOC8", category: "Availability", question: "Is disaster recovery documented?" },
    { id: "SOC9", category: "Availability", question: "Are DR exercises conducted?" },
    { id: "SOC10", category: "Availability", question: "Are uptime objectives defined?" },

    { id: "SOC11", category: "Confidentiality", question: "Is sensitive data encrypted?" },
    { id: "SOC12", category: "Confidentiality", question: "Are encryption keys managed securely?" },
    { id: "SOC13", category: "Confidentiality", question: "Are logs reviewed regularly?" },
    { id: "SOC14", category: "Confidentiality", question: "Is data access monitored?" },
    { id: "SOC15", category: "Confidentiality", question: "Are retention policies enforced?" },

    { id: "SOC16", category: "Privacy", question: "Are privacy notices provided?" },
    { id: "SOC17", category: "Privacy", question: "Can users access their information?" },
    { id: "SOC18", category: "Privacy", question: "Can users request deletion?" },
    { id: "SOC19", category: "Privacy", question: "Are privacy incidents tracked?" },
    { id: "SOC20", category: "Governance", question: "Are internal audits conducted?" }
  ]
};