import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { OfficeCard } from "@/components/sections/OfficeCard";
import { ContactMap } from "@/components/sections/ContactMap";
import { PRACTICE_AREA_SLUGS } from "@/i18n/routing";

const MAP_QUERY = "Cumhuriyet Caddesi 17/7 Taksim Istanbul";
const MAP_LINK_URL = `https://maps.google.com/?q=${encodeURIComponent(MAP_QUERY)}`;
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("pageTitle") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const practiceAreaOptions = PRACTICE_AREA_SLUGS.map((slug) => ({
    value: slug,
    label: t(`practiceAreas.areas.${slug}.title`),
  }));

  return (
    <>
      <PageHeader
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
      />

      <section className="mx-auto max-w-[1280px] px-[24px] pb-[64px] md:px-[100px] md:pb-[80px]">
        <div className="mt-[32px] grid grid-cols-1 gap-[48px] md:mt-[48px] md:grid-cols-[1fr_1.2fr] md:gap-[64px]">
          <OfficeCard
            officeEyebrow={t("contact.officeEyebrow")}
            officeName={t("contact.officeName")}
            addressLines={[
              t("contact.addressLine1"),
              t("contact.addressLine2"),
              t("contact.addressLine3"),
            ]}
            workingHours={t("contact.workingHours")}
            showOnMapLabel={t("contact.showOnMap")}
            mapUrl={MAP_LINK_URL}
            directContactTitle={t("contact.directContactTitle")}
            email={t("contact.info.email")}
            phone={t("contact.info.phone")}
          />

          <ContactForm
            labels={{
              eyebrow: t("contact.formEyebrow"),
              description: t("contact.formDescription"),
              name: t("contact.fields.name"),
              surname: t("contact.fields.surname"),
              email: t("contact.fields.email"),
              phone: t("contact.fields.phone"),
              practiceArea: t("contact.fields.practiceArea"),
              practiceAreaPlaceholder: t("contact.fields.practiceAreaPlaceholder"),
              message: t("contact.fields.message"),
              consent: t("contact.consent"),
              submit: t("contact.submit"),
              submitting: t("contact.submitting"),
              successMessage: t("contact.successMessage"),
            }}
            practiceAreaOptions={practiceAreaOptions}
          />
        </div>
      </section>

      <ContactMap src={MAP_EMBED_URL} title={t("contact.officeName")} />

      <div className="pb-[64px] md:pb-[96px]" />
    </>
  );
}
