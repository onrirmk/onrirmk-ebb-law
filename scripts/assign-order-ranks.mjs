// One-time migration: assign orderRank (string) to existing docs that still
// only have the legacy "order" number field. Run after installing
// @sanity/orderable-document-list.
//
// Usage:
//   SANITY_API_READ_TOKEN=... node scripts/assign-order-ranks.mjs

import { createClient } from "@sanity/client";
import { LexoRank } from "lexorank";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_API_READ_TOKEN");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-06-22",
  token,
  useCdn: false,
});

async function assignRanks(type) {
  const docs = await client.fetch(
    `*[_type == $type] | order(coalesce(order, 0) asc){ _id, order, orderRank }`,
    { type },
  );

  console.log(`\n${type}: ${docs.length} docs`);

  let rank = LexoRank.middle();
  const tx = client.transaction();
  let updated = 0;

  for (const doc of docs) {
    const hasLegacyOrder = doc.order !== undefined && doc.order !== null;
    if (doc.orderRank) {
      if (hasLegacyOrder) {
        tx.patch(doc._id, (p) => p.unset(["order"]));
        console.log(`  • ${doc._id}: dropping legacy order=${doc.order}`);
        updated++;
      } else {
        console.log(`  • ${doc._id}: already has orderRank=${doc.orderRank}, skipping`);
      }
      rank = LexoRank.parse(doc.orderRank).genNext();
      continue;
    }
    const value = rank.toString();
    tx.patch(doc._id, (p) =>
      hasLegacyOrder
        ? p.set({ orderRank: value }).unset(["order"])
        : p.set({ orderRank: value }),
    );
    console.log(`  • ${doc._id}: orderRank=${value}${hasLegacyOrder ? ` (dropped order=${doc.order})` : ""}`);
    rank = rank.genNext();
    updated++;
  }

  if (updated > 0) {
    await tx.commit();
    console.log(`  → committed ${updated} updates`);
  } else {
    console.log("  → nothing to update");
  }
}

await assignRanks("practiceArea");
await assignRanks("teamMember");

console.log("\nDone.");
