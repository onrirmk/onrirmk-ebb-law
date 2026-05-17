import type { PracticeAreaSlug } from "@/i18n/routing";

export type Award = {
  key: string;
  label: string;
  iconSrc?: string;
};

export type PracticeAreaSummary = {
  slug: PracticeAreaSlug;
  title: string;
  summary: string;
  imageSrc?: string;
};

export type PracticeAreaDetailContent = PracticeAreaSummary & {
  paragraphs: string[];
};

export type ContactInfo = {
  address: string;
  email: string;
  web: string;
  phone: string;
  fax: string;
  labels: {
    address: string;
    email: string;
    web: string;
    phone: string;
    fax: string;
  };
};

export type NavLink = {
  key: "home" | "about" | "practiceAreas" | "team" | "contact";
  href: "/" | "/hakkimizda" | "/calisma-alanlari" | "/team" | "/iletisim";
};

export type TeamMemberEducation = {
  year: string;
  institution: string;
  degree: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  position: string;
  email: string;
  phone?: string;
  linkedinUrl?: string;
  bio: string[];
  practiceAreas: PracticeAreaSlug[];
  education: TeamMemberEducation[];
  memberships: string[];
  languages: string[];
  photoSrc?: string;
};
