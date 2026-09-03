import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact Form Submission",
  type: "document",
  icon: EnvelopeIcon,
  // Content editors write to their own documents; submissions are
  // created programmatically by /api/contact and only ever read from
  // Studio. Prevent accidental manual creation from the desk tool.
  liveEdit: false,
  fields: [
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "Yeni", value: "new" },
          { title: "Okundu", value: "read" },
          { title: "Yanıtlandı", value: "replied" },
          { title: "Arşiv / spam", value: "archived" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "name",
      title: "İsim",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "surname",
      title: "Soyisim",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "E-posta",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "practiceAreaSlug",
      title: "Çalışma alanı (slug)",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "practiceAreaTitle",
      title: "Çalışma alanı",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Mesaj",
      type: "text",
      rows: 8,
      readOnly: true,
    }),
    defineField({
      name: "consent",
      title: "KVKK onayı",
      type: "boolean",
      readOnly: true,
    }),
    defineField({
      name: "userAgent",
      title: "User agent",
      type: "string",
      readOnly: true,
      description: "Gönderen kişinin tarayıcı bilgisi — spam ayıklamak için.",
    }),
  ],
  preview: {
    select: {
      name: "name",
      surname: "surname",
      email: "email",
      submittedAt: "submittedAt",
      status: "status",
      area: "practiceAreaTitle",
    },
    prepare({ name, surname, email, submittedAt, status, area }) {
      const fullName = [name, surname].filter(Boolean).join(" ") || "(isimsiz)";
      const when = submittedAt
        ? new Date(submittedAt).toLocaleString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
      const badge =
        status === "new"
          ? "🟢"
          : status === "read"
            ? "•"
            : status === "replied"
              ? "✔"
              : "🗄";
      const subtitleParts = [when, email, area].filter(Boolean);
      return {
        title: `${badge} ${fullName}`,
        subtitle: subtitleParts.join(" · "),
      };
    },
  },
  orderings: [
    {
      title: "En yeni önce",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Duruma göre",
      name: "byStatus",
      by: [
        { field: "status", direction: "asc" },
        { field: "submittedAt", direction: "desc" },
      ],
    },
  ],
});
