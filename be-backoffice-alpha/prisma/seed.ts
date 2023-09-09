import { PrismaClient } from "@prisma/client";
import { connectSectionsInPagePrisma } from "../src/routes/api/backoffice-alpha/pages";
import { connectFieldsInSectionPrisma } from "../src/routes/api/backoffice-alpha/sections";
const prisma = new PrismaClient();
async function main() {
  await prisma.project.deleteMany({});
  await prisma.generalPageContent.deleteMany({});
  await prisma.page.deleteMany({});
  await prisma.section.deleteMany({});
  await prisma.field.deleteMany({});
  await prisma.fieldValueByProject.deleteMany({});

  const PROJECT_ID = "project";

  await prisma.generalPageContent.createMany({
    data: [
      {
        favicon: "asdf",
        pageTitle: "asdf",
        id: "generalPageContent1",
      },
    ],
  });
  await prisma.project.createMany({
    data: [
      {
        id: PROJECT_ID,
        domain: "localhost",
        name: "project 1",
        generalPageContentId: "generalPageContent1",
        languagesForTranslation: ["es", "en", "fr"],
      },
    ],
  });
  await prisma.page.createMany({
    data: [
      {
        name: "landing",
        id: "landing1",
        translations: ["landing-es", "landing-en", "landing-fr"],
        component: "tabbed-page",
        link: "landing",
      },
      {
        name: "landing2",
        id: "landing2",
        translations: ["landing2-es", "landing2-en", "landing2-fr"],
        component: "tabbed-page",
        link: "landing",
      },
    ],
  });
  await prisma.section.createMany({
    data: [
      {
        name: "header",
        id: "header",
        translations: ["header-es", "header-en", "header-fr"],
        component: "header-backoffice-section",
      },
    ],
  });
  await prisma.field.createMany({
    data: [
      {
        name: "title",
        id: "title",
        translationsLabel: ["titulo", "title", "title"],
      },
    ],
  });

  /**
   * Add pages to project
   */
  const pagesOrder = ["landing1", "landing2"];
  const pages = ["landing1", "landing2"];

  for (const pageId of pages) {
    await prisma.project.update({
      where: {
        id: PROJECT_ID,
      },
      data: {
        paginas: { connect: { id: pageId } },
      },
    });
  }
  await prisma.project.update({
    where: {
      id: PROJECT_ID,
    },
    data: {
      paginasOrder: pagesOrder,
    },
  });

  /**
   * Add sections to page "landing"
   */
  const sectionsOrder = ["header"];
  const sectionIds = ["header"];
  const pageId = "landing1";

  await connectSectionsInPagePrisma({
    pageId,
    sectionsOrder,
    sectionIds,
  });

  /**
   * Add fields to section to header "landing"
   */
  const fieldIds = ["title"];
  const sectionId = "header";

  await connectFieldsInSectionPrisma({ fieldIds, sectionId });

  /**
   * Add values to field and project
   */
  await prisma.fieldValueByProject.createMany({
    data: [
      {
        projectId: PROJECT_ID,
        fieldId: fieldIds[0],
        values: ["title-es", "title-en", "title-fr"],
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
