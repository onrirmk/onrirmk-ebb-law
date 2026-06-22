import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const teamPage = defineType({
  name: "teamPage",
  title: "Team Page",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "hero", title: "Hero" },
    { name: "intro", title: "Intro" },
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
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
    }),
    defineField({
      name: "detailHeroImage",
      title: "Detail-page hero image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description: "Used as the band image on /team/[slug].",
    }),
    defineField({
      name: "intro",
      title: "Intro paragraph",
      type: "text",
      rows: 4,
      group: "intro",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Team Page" }) },
});
