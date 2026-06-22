import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const practiceArea = defineType({
  name: "practiceArea",
  title: "Practice Area",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
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
        "Bu görsel iki yerde kullanılır. (1) Çalışma alanları sayfasındaki kart: 4:3 oranında kırpılır — ana konuyu ortada tutun. (2) Detay sayfasının üst bandı: tam genişlikte, 360 px (masaüstünde 480 px) yükseklikte gösterilir — başlık ve gezinti yolu (breadcrumb) SOL ALT köşede yer alır, bu yüzden o köşeyi yazıyla çakışacak öğelerden uzak tutun. Önerilen: 2400×1800 px JPG (dosya boyutu 600 KB altı). Mutlaka görünmesi gereken yeri Sanity'nin odak noktası (hotspot) aracıyla işaretleyin.",
    }),
    defineField({
      name: "paragraphs",
      title: "Body paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first. Use 10, 20, 30 to leave room.",
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "manualOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "heroImage" },
  },
});
