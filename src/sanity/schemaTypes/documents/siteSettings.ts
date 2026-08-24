import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "branding", title: "Branding" },
    { name: "contact", title: "Contact" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "firmName",
      title: "Firm name",
      type: "string",
      group: "branding",
    }),
    defineField({
      name: "logoNavbar",
      title: "Navbar logo",
      type: "image",
      group: "branding",
      options: { hotspot: true },
      description:
        "Önerilen: 640×320 px ölçülerinde, şeffaf arka planlı PNG dosyası (yatay tasarım). Sitenin üst menüsünde 60–80 px yüksekliğinde gösterilir; kırpılma olmaz, logonun tamamı her zaman görünür.",
    }),
    defineField({
      name: "logoFooter",
      title: "Footer logo",
      type: "image",
      group: "branding",
      options: { hotspot: true },
      description:
        "Önerilen: 960×320 px ölçülerinde, şeffaf arka planlı PNG dosyası. Sitenin alt bilgi (footer) bölümünde 80 px yüksekliğinde gösterilir; kırpılma olmaz, logonun tamamı her zaman görünür.",
    }),
    defineField({
      name: "address",
      title: "Office address",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "line1", title: "Line 1", type: "string" }),
        defineField({ name: "line2", title: "Line 2", type: "string" }),
        defineField({ name: "line3", title: "Line 3", type: "string" }),
        defineField({
          name: "mapsQuery",
          title: "Google Maps query",
          type: "string",
          description: "Free-text query used to embed the office on the map.",
        }),
      ],
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "fax",
      title: "Fax",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "web",
      title: "Web",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "workingHours",
      title: "Working hours",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "footerCopy",
      title: "Footer copy",
      type: "text",
      rows: 3,
      group: "footer",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
