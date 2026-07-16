import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const practiceArea = defineType({
  name: "practiceArea",
  title: "Practice Area",
  type: "document",
  icon: DocumentTextIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "practiceArea" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Shown on the grid card.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      description:
        "Bu görsel iki yerde kullanılır. (1) Çalışma alanları sayfasındaki kart üzerinde, 4:3 oranında kırpılarak gösterilir — ana konuyu ortada tutun. (2) Detay sayfasının üstündeki bantta, tam genişlikte ve mobilde 360 px / masaüstünde 480 px yüksekliğinde gösterilir; başlık ile gezinti yolu (breadcrumb) görselin SOL ALT köşesinde durduğu için o bölgeyi koyu ve dikkat dağıtıcı detaylardan uzak tutun. Önerilen: 2400×1800 px ölçülerinde JPG dosyası (dosya boyutu 600 KB'ın altında olmalı). Mutlaka görünmesi gerekenleri Sanity'nin Hotspot (odak noktası) aracıyla işaretleyin.",
    }),
    defineField({
      name: "paragraphs",
      title: "Body content",
      type: "array",
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
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "heroImage" },
  },
});
