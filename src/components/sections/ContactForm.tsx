"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

type Labels = {
  eyebrow: string;
  description: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  practiceArea: string;
  practiceAreaPlaceholder: string;
  message: string;
  consent: string;
  submit: string;
  submitting: string;
  successMessage: string;
};

type Props = {
  labels: Labels;
  practiceAreaOptions: { value: string; label: string }[];
  showConsent?: boolean;
  consentText?: string;
};

export function ContactForm({
  labels,
  practiceAreaOptions,
  showConsent = false,
  consentText,
}: Props) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      surname: String(formData.get("surname") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      practiceArea: String(formData.get("practiceArea") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      // Honeypot — must stay empty. Bots fill hidden fields.
      website: String(formData.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
      };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(
          data?.error ?? "Mesajınız gönderilemedi. Lütfen tekrar deneyin.",
        );
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  }

  const submitting = status === "submitting";
  const showSuccess = status === "success";
  const showError = status === "error";

  return (
    <div className="rounded-[2px] bg-[#F8F8F6] p-[24px] sm:p-[32px] md:p-[40px]">
      <p className="mb-[12px] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1C1B1F]/60">
        {labels.eyebrow}
      </p>
      <p className="mb-[24px] text-[14px] leading-[22px] text-[#1C1B1F]/70">
        {labels.description}
      </p>

      <form onSubmit={handleSubmit} noValidate={false}>
        {/* Honeypot — visually hidden, ARIA hidden, autocomplete off.
            Real users never see or fill it; bots do. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-10000px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 sm:gap-[16px]">
          <UnderlinedField name="name" label={labels.name} required />
          <UnderlinedField name="surname" label={labels.surname} required />
        </div>

        <div className="mt-[24px]">
          <UnderlinedField
            name="email"
            type="email"
            label={labels.email}
            required
          />
        </div>

        <div className="mt-[24px]">
          <UnderlinedField name="phone" type="tel" label={labels.phone} />
        </div>

        <div className="mt-[24px]">
          <label className="block">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1C1B1F]/60">
              {labels.practiceArea}
            </span>
            <select
              name="practiceArea"
              defaultValue=""
              className="mt-[4px] block w-full appearance-none border-0 border-b border-[#1C1B1F]/20 bg-transparent bg-[length:14px_14px] bg-no-repeat py-[12px] pr-[20px] text-[16px] text-[#1C1B1F] transition-colors focus:border-[#212C60] focus:outline-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%231C1B1F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
                backgroundPosition: "right center",
              }}
            >
              <option value="" disabled>
                {labels.practiceAreaPlaceholder}
              </option>
              {practiceAreaOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-[24px]">
          <label className="block">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1C1B1F]/60">
              {labels.message} *
            </span>
            <textarea
              name="message"
              required
              rows={4}
              className="mt-[4px] block min-h-[120px] w-full resize-y border-0 border-b border-[#1C1B1F]/20 bg-transparent py-[12px] text-[16px] leading-[24px] text-[#1C1B1F] transition-colors focus:border-[#212C60] focus:outline-none"
            />
          </label>
        </div>

        {showConsent ? (
          <label className="mt-[20px] flex items-start gap-[10px] text-[13px] leading-[18px] text-[#1C1B1F]/80">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-[2px] h-[16px] w-[16px] flex-shrink-0 cursor-pointer accent-[#212C60]"
            />
            <span>{consentText?.trim() ? consentText : labels.consent} *</span>
          </label>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="mt-[24px] inline-flex w-full items-center justify-center gap-[10px] rounded-[2px] bg-[#212C60] px-[32px] py-[14px] text-[14px] font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#1a234d] disabled:opacity-60 md:w-auto"
        >
          {submitting ? labels.submitting : labels.submit}
          {!submitting ? (
            <ArrowRight className="h-[16px] w-[16px]" aria-hidden />
          ) : null}
        </button>

        {showSuccess ? (
          <p className="mt-[16px] inline-flex items-center gap-[8px] text-[14px] text-[#1f7a3e]">
            <Check className="h-[16px] w-[16px]" aria-hidden />
            {labels.successMessage}
          </p>
        ) : null}
        {showError && errorMessage ? (
          <p
            role="alert"
            className="mt-[16px] text-[14px] text-[#b42318]"
          >
            {errorMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
}

function UnderlinedField({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1C1B1F]/60">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-[4px] block w-full border-0 border-b border-[#1C1B1F]/20 bg-transparent py-[12px] text-[16px] leading-[24px] text-[#1C1B1F] transition-colors focus:border-[#212C60] focus:outline-none"
      />
    </label>
  );
}
