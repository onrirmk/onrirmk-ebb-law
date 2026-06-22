import type { SchemaTypeDefinition } from "sanity";
import { seo } from "./objects/seo";
import { siteSettings } from "./documents/siteSettings";
import { homePage } from "./documents/homePage";
import { aboutPage } from "./documents/aboutPage";
import { practiceAreasPage } from "./documents/practiceAreasPage";
import { practiceArea } from "./documents/practiceArea";
import { teamPage } from "./documents/teamPage";
import { teamMember } from "./documents/teamMember";
import { contactPage } from "./documents/contactPage";

export const schemaTypes: SchemaTypeDefinition[] = [
  seo,
  siteSettings,
  homePage,
  aboutPage,
  practiceAreasPage,
  practiceArea,
  teamPage,
  teamMember,
  contactPage,
];
