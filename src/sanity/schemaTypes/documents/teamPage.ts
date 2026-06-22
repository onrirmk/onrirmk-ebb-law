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
        "Önerilen: 2400×1400 px ölçülerinde JPG dosyası (dosya boyutu 600 KB'ın altında olmalı). Sayfanın en üstünde, ekran yüksekliğinin yaklaşık %82'sini (en az 560–630 px) kaplayan tam genişlikte bir bant olarak gösterilir. Başlık ve onun üstündeki küçük ön başlık görselin tam ortasına gelir. Güvenli alan: ana konunun yazıyla çakışmaması için görselin orta dikey bandını boş bırakın; sağ ve sol kenardan yaklaşık 200 px'lik şerit ile üst-alt kısımlar dar ekranlarda kırpılabilir. Mutlaka görünmesi gerekenleri Sanity'nin Hotspot (odak noktası) aracıyla işaretleyin.",
    }),
    defineField({
      name: "detailHeroImage",
      title: "Detail-page hero image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description:
        "Her bir avukatın detay sayfasında (/team/[slug]) üstte yer alan panoramik bantta kullanılır. Önerilen: 2400×600 px ölçülerinde, 4:1 panoramik oranlı JPG dosyası (dosya boyutu 400 KB'ın altında olmalı). Yaklaşık 280–340 px yüksekliğinde, tam genişlikte gösterilir. Avukatın adı ve geri dönüş bağlantısı görselin SOL tarafında durduğu için ana konuyu görselin sağ yarısına yerleştirin.",
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
