import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "hero", title: "Hero" },
    { name: "narrative", title: "Narrative" },
    { name: "founders", title: "Founders" },
    { name: "cta", title: "Call to action" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page title",
      type: "string",
      description: "Used as the narrative section heading.",
    }),
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
        "Önerilen: 2400×1400 px JPG (dosya boyutu 600 KB altı). Sayfanın üstünde ekran yüksekliğinin yaklaşık %82'si kadar (en az 560–630 px) tam genişlikte bir bant olarak gösterilir. Başlık ve üst etiket görselin üzerinde ortalıdır. Güvenli alan: ana konunun, yazıyla çakışmaması için görselin orta dikey bandını doldurmamasına dikkat edin; sağ/sol kenardan yaklaşık 200 px ile alt-üst kısımlar dar ekranlarda kırpılabilir. Mutlaka görünmesi gereken yeri Sanity'nin odak noktası (hotspot) aracıyla işaretleyin.",
    }),
    defineField({
      name: "narrativeParagraphs",
      title: "Narrative paragraphs",
      type: "array",
      group: "narrative",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "foundersTitle",
      title: "Founders title",
      type: "string",
      group: "founders",
    }),
    defineField({
      name: "foundersSubtitle",
      title: "Founders subtitle",
      type: "text",
      rows: 2,
      group: "founders",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA title",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaSubtitle",
      title: "CTA subtitle",
      type: "text",
      rows: 2,
      group: "cta",
    }),
    defineField({
      name: "ctaButton",
      title: "CTA button label",
      type: "string",
      group: "cta",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
