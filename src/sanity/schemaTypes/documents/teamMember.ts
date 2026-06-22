import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "position", title: "Position", type: "string" }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description:
        "Dikey portre çekim. Hem ekibimiz sayfasındaki kartta hem de detay sayfasının yan panelinde 3:4 (eninden uzun) oranında gösterilir. Önerilen: 900×1200 px ölçülerinde JPG dosyası (dosya boyutu 400 KB'ın altında olmalı). Güvenli alan: yüz ve omuzlar çerçevenin üst üçte iki kısmında, yatayda ortalanmış olmalı. Yüzü Sanity'nin Hotspot (odak noktası) aracıyla işaretleyin — küçük ekranlarda görsel kırpıldığında yüzün her zaman görünür kalmasını sağlar.",
    }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "isFounder",
      title: "Founding partner",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "biographyParagraphs",
      title: "Biography paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      of: [
        {
          type: "object",
          name: "educationEntry",
          fields: [
            defineField({
              name: "year",
              title: "Year",
              type: "string",
              description: "Mezuniyet yılı (ör. 1999).",
            }),
            defineField({
              name: "institution",
              title: "Institution",
              type: "string",
              description: "Okulun tam adı (ör. Galatasaray Üniversitesi Hukuk Fakültesi).",
            }),
            defineField({
              name: "degree",
              title: "Degree",
              type: "string",
              description: "Derece (ör. LL.B., LL.M. in Insurance Law).",
            }),
          ],
          preview: {
            select: { title: "institution", subtitle: "year", description: "degree" },
          },
        },
      ],
    }),
    defineField({
      name: "memberships",
      title: "Memberships",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "languages",
      title: "Languages",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "practiceAreas",
      title: "Practice areas",
      type: "array",
      of: [{ type: "reference", to: [{ type: "practiceArea" }] }],
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
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
    select: {
      title: "name",
      subtitle: "position",
      media: "photo",
    },
  },
});
