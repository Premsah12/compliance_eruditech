export type Framework =
  | "DPDPA"
  | "HIPAA"
  | "ISO27001"
  | "SOC2";

export const FRAMEWORKS = [
  {
    id: "DPDPA",
    name: "DPDPA",
    description: "Digital Personal Data Protection Act",
  },
  {
    id: "HIPAA",
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act",
  },
  {
    id: "ISO27001",
    name: "ISO 27001",
    description: "Information Security Management",
  },
  {
    id: "SOC2",
    name: "SOC 2",
    description: "Service Organization Control 2",
  },
] as const;