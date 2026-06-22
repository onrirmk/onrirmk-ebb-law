import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  groups: [
    { name: "hero", title: "Hero" },
    { name: "form", title: "Form" },
    { name: "office", title: "Office card" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "pageTitle", title: "Page title", type: "string" }),
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
    }),
    defineField({
      name: "formTitle",
      title: "Form section title",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "formSubtitle",
      title: "Form section subtitle",
      type: "text",
      rows: 2,
      group: "form",
    }),
    defineField({
      name: "officeEyebrow",
      title: "Office eyebrow",
      type: "string",
      group: "office",
    }),
    defineField({
      name: "officeName",
      title: "Office name",
      type: "string",
      group: "office",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
