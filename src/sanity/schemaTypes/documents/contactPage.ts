import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  groups: [
    { name: "hero", title: "Hero" },
    { name: "form", title: "Form" },
    { name: "office", title: "Office card" },
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
        "Önerilen: 2400×1400 px ölçülerinde JPG dosyası (dosya boyutu 600 KB'ın altında olmalı). Sayfanın en üstünde, ekran yüksekliğinin yaklaşık %82'sini (en az 560–630 px) kaplayan tam genişlikte bir bant olarak gösterilir. Başlık ve onun üstündeki küçük ön başlık görselin tam ortasına gelir. Güvenli alan: ana konunun yazıyla çakışmaması için görselin orta dikey bandını boş bırakın; sağ ve sol kenardan yaklaşık 200 px'lik şerit ile üst-alt kısımlar dar ekranlarda kırpılabilir. Mutlaka görünmesi gerekenleri Sanity'nin Hotspot (odak noktası) aracıyla işaretleyin.",
    }),
    defineField({
      name: "formTitle",
      title: "Form section title",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "formSubtitle",
      title: "Form section subtitle",
      type: "text",
      rows: 2,
      group: "form",
    }),
    defineField({
      name: "officeEyebrow",
      title: "Office eyebrow",
      type: "string",
      group: "office",
    }),
    defineField({
      name: "officeName",
      title: "Office name",
      type: "string",
      group: "office",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
