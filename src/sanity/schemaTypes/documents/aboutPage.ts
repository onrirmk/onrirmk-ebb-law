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
        "Önerilen: 2400×1400 px ölçülerinde JPG dosyası (dosya boyutu 600 KB'ın altında olmalı). Sayfanın en üstünde, ekran yüksekliğinin yaklaşık %82'sini (en az 560–630 px) kaplayan tam genişlikte bir bant olarak gösterilir. Başlık ve onun üstündeki küçük ön başlık görselin tam ortasına gelir. Güvenli alan: ana konunun yazıyla çakışmaması için görselin orta dikey bandını boş bırakın; sağ ve sol kenardan yaklaşık 200 px'lik şerit ile üst-alt kısımlar dar ekranlarda kırpılabilir. Mutlaka görünmesi gerekenleri Sanity'nin Hotspot (odak noktası) aracıyla işaretleyin.",
    }),
    defineField({
      name: "narrativeParagraphs",
      title: "Narrative content",
      type: "array",
      group: "narrative",
      description:
        "Zengin metin editörü. Alt başlık için satırın başında \"Başlık 2\" veya \"Başlık 3\" seçin; madde işaretli veya numaralı liste, kalın/italik ve bağlantı ekleyebilirsiniz. Enter tuşu yeni paragraf açar.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Başlık 2", value: "h2" },
            { title: "Başlık 3", value: "h3" },
            { title: "Alıntı", value: "blockquote" },
          ],
          lists: [
            { title: "Madde işaretli", value: "bullet" },
            { title: "Numaralı", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Kalın", value: "strong" },
              { title: "İtalik", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Bağlantı",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (r) =>
                      r.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  },
                ],
              },
            ],
          },
        },
      ],
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
