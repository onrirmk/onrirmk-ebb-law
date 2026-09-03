import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Server-only Sanity client with a write token, used by API routes
// that create documents (e.g. /api/contact).
//
// The token must have "Editor" or "Contributor" permissions on the
// project — create one at https://sanity.io/manage → API → Tokens and
// set SANITY_API_WRITE_TOKEN on the Vercel project. Never expose this
// client to the browser.
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    throw new Error(
      "SANITY_API_WRITE_TOKEN is not set — cannot create Sanity documents.",
    );
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}
