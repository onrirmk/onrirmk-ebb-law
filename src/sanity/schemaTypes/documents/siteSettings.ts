import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "branding", title: "Branding" },
    { name: "navigation", title: "Navigation" },
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
        "Recommended: 640×320 px PNG with transparent background (horizontal lockup). Displayed at 60–80 px tall, no cropping — whole logo is always visible.",
    }),
    defineField({
      name: "logoFooter",
      title: "Footer logo",
      type: "image",
      group: "branding",
      options: { hotspot: true },
      description:
        "Recommended: 960×320 px PNG with transparent background. Displayed at 80 px tall in the footer, no cropping.",
    }),
    defineField({
      name: "navLinks",
      title: "Navigation links",
      type: "array",
      group: "navigation",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({
              name: "key",
              title: "Internal key",
              type: "string",
              description:
                "Stable identifier (home, about, practiceAreas, team, contact)",
            }),
          ],
          preview: { select: { title: "label", subtitle: "key" } },
        },
      ],
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
