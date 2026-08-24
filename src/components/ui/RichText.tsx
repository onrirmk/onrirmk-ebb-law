import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[17px] leading-[28px] text-[#1C1B1F] md:text-[18px] md:leading-[30px]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-sans text-[24px] font-semibold leading-[1.25] text-[#212C60] first:mt-0 md:text-[28px]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-sans text-[19px] font-semibold leading-[1.3] text-[#212C60] first:mt-0 md:text-[21px]">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary/40 pl-5 text-[17px] italic leading-[28px] text-foreground/80 md:text-[18px] md:leading-[30px]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-[17px] leading-[28px] text-[#1C1B1F] marker:text-primary md:text-[18px] md:leading-[30px]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-[17px] leading-[28px] text-[#1C1B1F] marker:text-primary md:text-[18px] md:leading-[30px]">
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
      // No explicit colour — inherits from the parent block. Otherwise a
      // bold span inside a heading gets forced back to text-foreground
      // (near-black) and hides the navy heading colour.
      <strong className="font-semibold">{children}</strong>
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

const largeComponents: PortableTextComponents = {
  ...components,
  block: {
    normal: ({ children }) => (
      <p className="text-[18px] leading-[1.65] text-foreground/90 md:text-[19px] md:leading-[1.6]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-sans text-[26px] font-semibold leading-[1.25] text-[#212C60] first:mt-0 md:text-[30px]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-sans text-[20px] font-semibold leading-[1.3] text-[#212C60] first:mt-0 md:text-[22px]">
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
};

type Props = {
  value: PortableTextBlock[];
  size?: "default" | "large";
};

export function RichText({ value, size = "default" }: Props) {
  return (
    <PortableText
      value={value}
      components={size === "large" ? largeComponents : components}
    />
  );
}
