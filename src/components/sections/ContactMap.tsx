type Props = {
  src: string;
  title: string;
};

export function ContactMap({ src, title }: Props) {
  return (
    <section className="mx-auto mt-[64px] max-w-[1680px] px-[24px] md:mt-[80px] md:px-[100px]">
      <div className="h-[400px] w-full overflow-hidden rounded-[2px] border border-[#1C1B1F]/10 md:h-[500px]">
        <iframe
          src={src}
          title={title}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
