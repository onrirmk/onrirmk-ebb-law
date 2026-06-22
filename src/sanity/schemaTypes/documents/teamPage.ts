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
      description:
        "Recommended: 2400×1400 px JPG (< 600 KB). Displayed as a full-bleed band at ~82vh tall (min 560–630 px). Title + eyebrow are centered. Safe area: keep the subject from filling the center vertical band so it doesn't fight the headline; the left/right ~200 px and top/bottom can be cropped on narrow viewports. Use the focal hotspot to mark what must stay visible.",
    }),
    defineField({
      name: "detailHeroImage",
      title: "Detail-page hero image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description:
        "Used as the band image on /team/[slug]. Recommended: 2400×600 px JPG (4:1 panoramic, < 400 KB). Displayed at ~280–340 px tall full-bleed. The member name + back link sit on the LEFT side, so keep the subject right-of-center.",
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
