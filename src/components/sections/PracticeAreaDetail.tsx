import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from "@portabletext/react";
import { Link } from "@/i18n/navigation";
import type {
  PracticeAreaDetailContent,
  PracticeAreaSummary,
} from "@/types/content";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[18px] leading-[1.65] text-foreground/90 md:text-[19px] md:leading-[1.6]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-sans text-[26px] font-semibold leading-[1.25] text-primary first:mt-0 md:text-[30px]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-sans text-[20px] font-semibold leading-[1.3] text-primary first:mt-0 md:text-[22px]">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary/40 pl-5 text-[18px] italic leading-[1.6] text-foreground/80 md:text-[19px]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-[18px] leading-[1.65] text-foreground/90 marker:text-primary md:text-[19px] md:leading-[1.6]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-[18px] leading-[1.65] text-foreground/90 marker:text-primary md:text-[19px] md:leading-[1.6]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({
      value,
      children,
    }: PortableTextMarkComponentProps<{ _type: string; href?: string }>) => {
      const href = value?.href ?? "#";
      const external = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
        >
          {children}
        </a>
      );
    },
  },
};

type CtaContent = {
  title: string;
  subtitle: string;
  button: string;
};

type Props = {
  area: PracticeAreaDetailContent;
  allAreas: PracticeAreaSummary[];
  sidebarLabel: string;
  backLabel: string;
  cta: CtaContent;
};

export function PracticeAreaDetail({
  area,
  allAreas,
  sidebarLabel,
  backLabel,
  cta,
}: Props) {
  return (
    <div className="container-page grid grid-cols-1 gap-12 pb-20 pt-12 md:grid-cols-12 md:gap-16 md:pb-28 md:pt-16">
      <aside
        className="md:col-span-4 lg:col-span-3"
        aria-label={sidebarLabel}
      >
        <div className="md:sticky md:top-[120px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/60">
            {sidebarLabel}
          </p>
          <ul className="mt-5 space-y-0 border-l border-[#1C1B1F]/10 text-[15px]">
            {allAreas.map((a) => {
              const isActive = a.slug === area.slug;
              return (
                <li key={a.slug} className="-ml-px">
                  <Link
                    href={{
                      pathname: "/calisma-alanlari/[slug]",
                      params: { slug: a.slug },
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={`block border-l-2 py-[10px] pl-[16px] transition-colors duration-200 ${
                      isActive
                        ? "border-primary font-semibold text-primary"
                        : "border-transparent text-foreground/65 hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {a.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <div className="md:col-span-8 lg:col-span-9">
        <Link
          href="/calisma-alanlari"
          className="mb-[32px] inline-flex items-center gap-[8px] text-[14px] font-semibold uppercase tracking-wide text-[#212C60]/70 transition-colors hover:text-[#212C60]"
        >
          <ArrowLeft className="h-[14px] w-[14px]" aria-hidden />
          {backLabel}
        </Link>
        <article className="max-w-[920px]">
          {area.paragraphs.length > 0 ? (
            <div className="space-y-6">
              <PortableText
                value={area.paragraphs}
                components={portableTextComponents}
              />
            </div>
          ) : null}
        </article>

        <div className="mt-14 max-w-[920px] rounded-sm bg-primary px-8 py-10 text-white md:mt-16 md:px-10 md:py-12">
          <p className="font-sans text-[22px] font-semibold leading-[30px] md:text-[24px] md:leading-[32px]">
            {cta.title}
          </p>
          <p className="mt-3 max-w-[520px] text-[15px] leading-[24px] text-white/75 md:text-[16px]">
            {cta.subtitle}
          </p>
          <Link
            href="/iletisim"
            className="mt-6 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white"
          >
            {cta.button}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PracticeAreaHero({
  imageSrc,
  alt,
  eyebrow,
  title,
}: {
  imageSrc?: string;
  alt: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="relative -mt-[122px] h-[360px] w-full overflow-hidden bg-primary md:h-[480px]">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#0c1230]/85 via-[#0c1230]/35 to-[#0c1230]/10"
      />
      <div className="relative mx-auto flex h-full max-w-[1680px] flex-col justify-end px-6 pb-10 md:px-[100px] md:pb-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75 md:text-[12px]">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-sans text-[36px] font-bold leading-[1.1] text-white md:mt-4 md:text-[56px]">
          {title}
        </h1>
      </div>
    </section>
  );
}
