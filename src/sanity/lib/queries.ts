import { client } from "./client";
import type { SanityImage } from "./image";

const IMAGE_PROJECTION = `..., asset->{_id, metadata { dimensions }}`;

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  firmName,
  logoNavbar { ${IMAGE_PROJECTION} },
  logoFooter { ${IMAGE_PROJECTION} },
  address,
  phone, fax, email, web, workingHours, footerCopy
}`;

const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  heroTitleLine1,
  heroTitleLine2,
  heroSlides[]{
    _key,
    alt,
    image { ${IMAGE_PROJECTION} }
  },
  welcomeTitle,
  welcomeParagraphs,
  testimonialTitle,
  testimonials[]{ _key, quote, author, role },
  awardsTitle,
  awards[]{
    _key,
    label,
    icon { ${IMAGE_PROJECTION} }
  },
  ctaEyebrow, ctaTitle, ctaDescription, ctaPrimaryButton
}`;

const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  pageTitle, heroEyebrow, heroTitle,
  heroImage { ${IMAGE_PROJECTION} },
  narrativeParagraphs,
  foundersTitle, foundersSubtitle,
  ctaTitle, ctaSubtitle, ctaButton
}`;

const PRACTICE_AREAS_PAGE_QUERY = `*[_type == "practiceAreasPage"][0]{
  pageTitle, heroEyebrow, heroTitle, heroSubtitle,
  heroImage { ${IMAGE_PROJECTION} },
  ctaTitle, ctaSubtitle, ctaButton
}`;

const TEAM_PAGE_QUERY = `*[_type == "teamPage"][0]{
  pageTitle, heroEyebrow, heroTitle,
  heroImage { ${IMAGE_PROJECTION} },
  detailHeroImage { ${IMAGE_PROJECTION} },
  intro
}`;

const CONTACT_PAGE_QUERY = `*[_type == "contactPage"][0]{
  pageTitle, heroEyebrow, heroTitle, heroSubtitle,
  heroImage { ${IMAGE_PROJECTION} },
  formTitle, formSubtitle,
  officeEyebrow, officeName
}`;

const PRACTICE_AREAS_QUERY = `*[_type == "practiceArea"] | order(orderRank asc){
  _id,
  title,
  "slug": slug.current,
  summary,
  heroImage { ${IMAGE_PROJECTION} },
  paragraphs
}`;

const PRACTICE_AREA_BY_SLUG_QUERY = `*[_type == "practiceArea" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  summary,
  heroImage { ${IMAGE_PROJECTION} },
  paragraphs
}`;

const TEAM_MEMBERS_QUERY = `*[_type == "teamMember"] | order(orderRank asc){
  _id,
  name,
  "slug": slug.current,
  position,
  photo { ${IMAGE_PROJECTION} },
  email, phone, linkedinUrl, isFounder,
  biographyParagraphs,
  education[]{ _key, year, institution, degree },
  memberships,
  languages,
  practiceAreas[]->{ "slug": slug.current, title }
}`;

const TEAM_MEMBER_BY_SLUG_QUERY = `*[_type == "teamMember" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  position,
  photo { ${IMAGE_PROJECTION} },
  email, phone, linkedinUrl, isFounder,
  biographyParagraphs,
  education[]{ _key, year, institution, degree },
  memberships,
  languages,
  practiceAreas[]->{ "slug": slug.current, title }
}`;

export type SiteSettings = {
  firmName?: string;
  logoNavbar?: SanityImage;
  logoFooter?: SanityImage;
  address?: { line1?: string; line2?: string; line3?: string; mapsQuery?: string };
  phone?: string;
  fax?: string;
  email?: string;
  web?: string;
  workingHours?: string;
  footerCopy?: string;
};

export type HeroSlide = { _key: string; alt?: string; image?: SanityImage };
export type Testimonial = { _key: string; quote?: string; author?: string; role?: string };
export type AwardItem = { _key: string; label?: string; icon?: SanityImage };

export type HomePageData = {
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroSlides?: HeroSlide[];
  welcomeTitle?: string;
  welcomeParagraphs?: string[];
  testimonialTitle?: string;
  testimonials?: Testimonial[];
  awardsTitle?: string;
  awards?: AwardItem[];
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaPrimaryButton?: string;
};

export type AboutPageData = {
  pageTitle?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroImage?: SanityImage;
  narrativeParagraphs?: string[];
  foundersTitle?: string;
  foundersSubtitle?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButton?: string;
};

export type PracticeAreasPageData = {
  pageTitle?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButton?: string;
};

export type TeamPageData = {
  pageTitle?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroImage?: SanityImage;
  detailHeroImage?: SanityImage;
  intro?: string;
};

export type ContactPageData = {
  pageTitle?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  formTitle?: string;
  formSubtitle?: string;
  officeEyebrow?: string;
  officeName?: string;
};

export type PracticeAreaDoc = {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  heroImage?: SanityImage;
  paragraphs?: string[];
};

export type EducationEntry = {
  _key: string;
  year?: string;
  institution?: string;
  degree?: string;
};

export type TeamMemberDoc = {
  _id: string;
  name: string;
  slug: string;
  position?: string;
  photo?: SanityImage;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  isFounder?: boolean;
  biographyParagraphs?: string[];
  education?: EducationEntry[];
  memberships?: string[];
  languages?: string[];
  practiceAreas?: { slug: string; title: string }[];
};

const FETCH_OPTS = { next: { revalidate: 10 } } as const;

export const fetchSiteSettings = () =>
  client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY, {}, FETCH_OPTS);

export const fetchHomePage = () =>
  client.fetch<HomePageData | null>(HOME_PAGE_QUERY, {}, FETCH_OPTS);

export const fetchAboutPage = () =>
  client.fetch<AboutPageData | null>(ABOUT_PAGE_QUERY, {}, FETCH_OPTS);

export const fetchPracticeAreasPage = () =>
  client.fetch<PracticeAreasPageData | null>(PRACTICE_AREAS_PAGE_QUERY, {}, FETCH_OPTS);

export const fetchTeamPage = () =>
  client.fetch<TeamPageData | null>(TEAM_PAGE_QUERY, {}, FETCH_OPTS);

export const fetchContactPage = () =>
  client.fetch<ContactPageData | null>(CONTACT_PAGE_QUERY, {}, FETCH_OPTS);

export const fetchPracticeAreas = () =>
  client.fetch<PracticeAreaDoc[]>(PRACTICE_AREAS_QUERY, {}, FETCH_OPTS);

export const fetchPracticeAreaBySlug = (slug: string) =>
  client.fetch<PracticeAreaDoc | null>(
    PRACTICE_AREA_BY_SLUG_QUERY,
    { slug },
    FETCH_OPTS,
  );

export const fetchTeamMembers = () =>
  client.fetch<TeamMemberDoc[]>(TEAM_MEMBERS_QUERY, {}, FETCH_OPTS);

export const fetchTeamMemberBySlug = (slug: string) =>
  client.fetch<TeamMemberDoc | null>(
    TEAM_MEMBER_BY_SLUG_QUERY,
    { slug },
    FETCH_OPTS,
  );
