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
        "Önerilen: 2400×1400 px JPG (dosya boyutu 600 KB altı). Sayfanın üstünde ekran yüksekliğinin yaklaşık %82'si kadar (en az 560–630 px) tam genişlikte bir bant olarak gösterilir. Başlık ve üst etiket görselin üzerinde ortalıdır. Güvenli alan: ana konunun, yazıyla çakışmaması için görselin orta dikey bandını doldurmamasına dikkat edin; sağ/sol kenardan yaklaşık 200 px ile alt-üst kısımlar dar ekranlarda kırpılabilir. Mutlaka görünmesi gereken yeri Sanity'nin odak noktası (hotspot) aracıyla işaretleyin.",
    }),
    defineField({
      name: "detailHeroImage",
      title: "Detail-page hero image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description:
        "Her bir avukatın detay sayfasında (/team/[slug]) üstteki panoramik bant olarak kullanılır. Önerilen: 2400×600 px JPG (4:1 panoramik oran, dosya boyutu 400 KB altı). Yaklaşık 280–340 px yükseklikte tam genişlikte gösterilir. Avukatın adı ve geri dönüş bağlantısı SOL tarafta yer aldığı için ana konuyu görselin sağ yarısına yerleştirin.",
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
