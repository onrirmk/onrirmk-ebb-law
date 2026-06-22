import { ThListIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const practiceAreasPage = defineType({
  name: "practiceAreasPage",
  title: "Practice Areas Page",
  type: "document",
  icon: ThListIcon,
  groups: [
    { name: "hero", title: "Hero" },
    { name: "cta", title: "Call to action" },
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
      description:
        "Önerilen: 2400×1400 px JPG (dosya boyutu 600 KB altı). Sayfanın üstünde ekran yüksekliğinin yaklaşık %82'si kadar (en az 560–630 px) tam genişlikte bir bant olarak gösterilir. Başlık ve üst etiket görselin üzerinde ortalıdır. Güvenli alan: ana konunun, yazıyla çakışmaması için görselin orta dikey bandını doldurmamasına dikkat edin; sağ/sol kenardan yaklaşık 200 px ile alt-üst kısımlar dar ekranlarda kırpılabilir. Mutlaka görünmesi gereken yeri Sanity'nin odak noktası (hotspot) aracıyla işaretleyin.",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA title",
      type: "string",
      group: "cta",
      description: "Shown on each practice area detail page. Use {area} as placeholder.",
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
  preview: { prepare: () => ({ title: "Practice Areas Page" }) },
});
