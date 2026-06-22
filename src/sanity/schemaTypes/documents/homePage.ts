import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero" },
    { name: "welcome", title: "Welcome" },
    { name: "awardsTestimonial", title: "Awards & Testimonial" },
    { name: "cta", title: "Call to action" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroTitleLine1",
      title: "Hero title — line 1",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTitleLine2",
      title: "Hero title — line 2",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSlides",
      title: "Hero slides",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          name: "heroSlide",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
          preview: { select: { title: "alt", media: "image" } },
        },
      ],
    }),
    defineField({
      name: "welcomeTitle",
      title: "Welcome title",
      type: "string",
      group: "welcome",
    }),
    defineField({
      name: "welcomeParagraphs",
      title: "Welcome paragraphs",
      type: "array",
      group: "welcome",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "testimonialTitle",
      title: "Testimonial section title",
      type: "string",
      group: "awardsTestimonial",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "awardsTestimonial",
      of: [
        {
          type: "object",
          name: "testimonial",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
            defineField({ name: "author", title: "Author", type: "string" }),
            defineField({ name: "role", title: "Role/Source", type: "string" }),
          ],
          preview: {
            select: { title: "author", subtitle: "role", description: "quote" },
          },
        },
      ],
    }),
    defineField({
      name: "awardsTitle",
      title: "Awards section title",
      type: "string",
      group: "awardsTestimonial",
    }),
    defineField({
      name: "awards",
      title: "Awards",
      type: "array",
      group: "awardsTestimonial",
      of: [
        {
          type: "object",
          name: "award",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({
              name: "icon",
              title: "Badge icon",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: "label", media: "icon" } },
        },
      ],
    }),
    defineField({
      name: "ctaEyebrow",
      title: "CTA eyebrow",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA title",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA description",
      type: "text",
      rows: 3,
      group: "cta",
    }),
    defineField({
      name: "ctaPrimaryButton",
      title: "CTA button label",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
