import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// useCdn: false → Sanity returns origin data (not their edge cache), so the
// only delay is our Next.js ISR window (revalidate: 10s in queries.ts).
// With useCdn: true the Sanity CDN adds ~60s on top before edits propagate.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
