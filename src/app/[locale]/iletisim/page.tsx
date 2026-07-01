import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { OfficeCard } from "@/components/sections/OfficeCard";
import { ContactMap } from "@/components/sections/ContactMap";
import {
  fetchContactPage,
  fetchPracticeAreas,
  fetchSiteSettings,
} from "@/sanity/lib/queries";
import { imageSrc } from "@/sanity/lib/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  await getTranslations({ locale });
  const page = await fetchContactPage();
  return { title: page?.pageTitle ?? "Contact" };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, page, areas, settings] = await Promise.all([
    getTranslations(),
    fetchContactPage(),
    fetchPracticeAreas(),
    fetchSiteSettings(),
  ]);

  const practiceAreaOptions = areas.map((a) => ({
    value: a.slug,
    label: a.title,
  }));

  const mapsQuery =
    settings?.address?.mapsQuery ??
    [settings?.address?.line1, settings?.address?.line2, settings?.address?.line3]
      .filter(Boolean)
      .join(", ");
  const mapLinkUrl = `https://maps.google.com/?q=${encodeURIComponent(mapsQuery)}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <ContactHero
        eyebrow={page?.heroEyebrow ?? ""}
        title={page?.heroTitle ?? ""}
        subtitle={page?.heroSubtitle ?? ""}
        imageSrc={imageSrc(page?.heroImage) ?? undefined}
        imageAlt={page?.heroTitle ?? ""}
        breadcrumb={{
          home: t("nav.home"),
          current: page?.pageTitle ?? "",
        }}
      />

      <section className="mx-auto max-w-[1680px] px-[24px] pb-[64px] md:pl-[100px] md:pr-[100px] md:pb-[80px]">
        <div className="mt-[32px] grid grid-cols-1 gap-[48px] md:mt-[48px] md:grid-cols-[1fr_1.2fr] md:gap-[64px]">
          <OfficeCard
            officeEyebrow={page?.officeEyebrow ?? ""}
            officeName={page?.officeName ?? ""}
            addressLines={[
              settings?.address?.line1 ?? "",
              settings?.address?.line2 ?? "",
              settings?.address?.line3 ?? "",
            ]}
            workingHours={settings?.workingHours ?? ""}
            showOnMapLabel={t("contact.showOnMap")}
            mapUrl={mapLinkUrl}
            directContactTitle={t("contact.directContactTitle")}
            email={settings?.email ?? ""}
            phone={settings?.phone ?? ""}
          />

          <ContactForm
            labels={{
              eyebrow: page?.formTitle ?? "",
              description: page?.formSubtitle ?? "",
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

      <ContactMap src={mapEmbedUrl} title={page?.officeName ?? ""} />

      <div className="pb-[64px] md:pb-[96px]" />
    </>
  );
}
