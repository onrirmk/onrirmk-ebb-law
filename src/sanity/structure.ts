import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

const SINGLETONS: Array<{ id: string; title: string }> = [
  { id: "siteSettings", title: "Site Settings" },
  { id: "homePage", title: "Home Page" },
  { id: "aboutPage", title: "About Page" },
  { id: "practiceAreasPage", title: "Practice Areas Page" },
  { id: "teamPage", title: "Team Page" },
  { id: "contactPage", title: "Contact Page" },
];

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map(({ id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(id).documentId(id).title(title)),
      ),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "practiceArea",
        title: "Practice Areas",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "teamMember",
        title: "Team Members",
        S,
        context,
      }),
    ]);

export const SINGLETON_IDS = SINGLETONS.map((s) => s.id);
