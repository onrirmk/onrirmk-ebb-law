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
    defineField({
      name: "pageTitle",
      title: "Page title",
      type: "text",
      rows: 2,
      description:
        "Uzun başlıklarda satır sonu istediğiniz yere Enter tuşuyla koyabilirsiniz.",
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
      type: "text",
      rows: 2,
      description:
        "Uzun başlıklarda satır sonu istediğiniz yere Enter tuşuyla koyabilirsiniz.",
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
        "Önerilen: 2400×1400 px ölçülerinde JPG dosyası (dosya boyutu 600 KB'ın altında olmalı). Sayfanın en üstünde, ekran yüksekliğinin yaklaşık %82'sini (en az 560–630 px) kaplayan tam genişlikte bir bant olarak gösterilir. Başlık ve onun üstündeki küçük ön başlık görselin tam ortasına gelir. Güvenli alan: ana konunun yazıyla çakışmaması için görselin orta dikey bandını boş bırakın; sağ ve sol kenardan yaklaşık 200 px'lik şerit ile üst-alt kısımlar dar ekranlarda kırpılabilir. Mutlaka görünmesi gerekenleri Sanity'nin Hotspot (odak noktası) aracıyla işaretleyin.",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA title",
      type: "text",
      rows: 2,
      group: "cta",
      description:
        "Her uzmanlık alanı detay sayfasında gösterilir. Değişken alanı için {area} kullanabilirsiniz. Uzun başlıklarda satır sonu istediğiniz yere Enter tuşuyla koyabilirsiniz.",
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
