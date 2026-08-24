import React from "react";

/**
 * Render a text value that may contain newlines from a Sanity `text`
 * field. Each newline becomes a `<br />` so editors control where
 * headings and titles wrap without touching component code.
 *
 * Renders nothing when the value is empty/undefined.
 */
export function renderMultiline(
  text: string | undefined | null
): React.ReactNode {
  if (!text) return null;
  const parts = text.split(/\r?\n/);
  return parts.map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < parts.length - 1 ? <br /> : null}
    </React.Fragment>
  ));
}
