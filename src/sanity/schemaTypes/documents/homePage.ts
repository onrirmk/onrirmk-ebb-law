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
      description:
        "Anasayfanın tam ekran hero karuseli. Her slayt, en geniş haliyle yaklaşık 1680 px'e kadar ekranı boydan boya doldurur.",
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
              description:
                "Önerilen: 2880×1620 px JPG (16:9 oran, dosya boyutu 800 KB altı). Görüntü ekranı boydan boya kaplar ve ekran boyutuna göre kırpılır — başlık sol üstte (kabaca soldan %35, yukarıdan %50'lik alanda), slayt noktaları altta ortada, oklar sağ ve sol kenarda durur. Güvenli alan: ana konuyu görselin sağ yarısında ve dikeyde ortalı konumlandırın. Dar ekranlarda kırpıldığında nelerin mutlaka görünmesi gerektiğini Sanity'nin odak noktası (hotspot) aracıyla işaretleyin.",
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
              description:
                "Önerilen: 200×220 px, saydam arka planlı PNG. 97×107 px boyutunda, oranı korunarak gösterilir — kırpılmaz, rozetin tamamı her zaman görünür.",
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
