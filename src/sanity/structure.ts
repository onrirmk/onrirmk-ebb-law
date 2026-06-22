import type { StructureResolver } from "sanity/structure";

const SINGLETONS: Array<{ id: string; title: string }> = [
  { id: "siteSettings", title: "Site Settings" },
  { id: "homePage", title: "Home Page" },
  { id: "aboutPage", title: "About Page" },
  { id: "practiceAreasPage", title: "Practice Areas Page" },
  { id: "teamPage", title: "Team Page" },
  { id: "contactPage", title: "Contact Page" },
];

export const structure: StructureResolver = (S) =>
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
      S.documentTypeListItem("practiceArea").title("Practice Areas"),
      S.documentTypeListItem("teamMember").title("Team Members"),
    ]);

export const SINGLETON_IDS = SINGLETONS.map((s) => s.id);
