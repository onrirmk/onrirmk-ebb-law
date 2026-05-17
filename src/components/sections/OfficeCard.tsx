import Image from "next/image";
import { Building2, MapPin, Mail, Phone } from "lucide-react";

type Props = {
  officeEyebrow: string;
  officeName: string;
  addressLines: [string, string, string];
  workingHours: string;
  showOnMapLabel: string;
  mapUrl: string;
  directContactTitle: string;
  email: string;
  phone: string;
  photoSrc?: string;
};

export function OfficeCard({
  officeEyebrow,
  officeName,
  addressLines,
  workingHours,
  showOnMapLabel,
  mapUrl,
  directContactTitle,
  email,
  phone,
  photoSrc,
}: Props) {
  return (
    <div className="flex flex-col gap-[32px]">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#F5F5F5]">
        {photoSrc ? (
          <Image
            src={photoSrc}
            alt={officeName}
            fill
            sizes="(min-width: 768px) 520px, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center"
          >
            <Building2
              className="h-[80px] w-[80px] text-[#1C1B1F]/30"
              strokeWidth={1}
            />
          </div>
        )}
      </div>

      <div>
        <p className="mb-[12px] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1C1B1F]/60">
          {officeEyebrow}
        </p>
        <h2 className="mb-[16px] font-sans text-[20px] font-bold leading-[28px] text-[#212C60]">
          {officeName}
        </h2>
        <address className="not-italic">
          <p className="text-[16px] leading-[24px] text-[#1C1B1F]">{addressLines[0]}</p>
          <p className="text-[16px] leading-[24px] text-[#1C1B1F]">{addressLines[1]}</p>
          <p className="text-[16px] leading-[24px] text-[#1C1B1F]">{addressLines[2]}</p>
        </address>
        <p className="mt-[16px] text-[14px] leading-[20px] text-[#1C1B1F]/70">
          {workingHours}
        </p>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[16px] inline-flex items-center gap-[8px] text-[14px] font-medium text-[#212C60] transition-colors hover:underline"
        >
          <MapPin className="h-[16px] w-[16px]" aria-hidden />
          {showOnMapLabel}
        </a>
      </div>

      <div className="h-px bg-[#1C1B1F]/10" />

      <div>
        <p className="mb-[16px] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1C1B1F]/60">
          {directContactTitle}
        </p>
        <div className="flex flex-col gap-[12px]">
          <a
            href={`mailto:${email}`}
            className="group inline-flex items-center gap-[12px] text-[16px] leading-[24px] text-[#1C1B1F] transition-colors hover:text-[#212C60]"
          >
            <Mail className="h-[18px] w-[18px] flex-shrink-0 text-[#1C1B1F]/60" aria-hidden />
            <span className="group-hover:underline">{email}</span>
          </a>
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="group inline-flex items-center gap-[12px] text-[16px] leading-[24px] text-[#1C1B1F] transition-colors hover:text-[#212C60]"
          >
            <Phone className="h-[18px] w-[18px] flex-shrink-0 text-[#1C1B1F]/60" aria-hidden />
            <span className="group-hover:underline">{phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
