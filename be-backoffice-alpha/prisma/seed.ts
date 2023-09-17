import { PrismaClient } from "@prisma/client";
import { LandingSeed } from "./seedBackoffice/landing";
import { ProjectsSeed } from "./seedBackoffice/projects/projects";
import { ProjectSeed } from "./seedBackoffice/projects/project";
const prisma = new PrismaClient();
async function main() {
  await prisma.fieldValueByProject.deleteMany({});
  await prisma.field.deleteMany({});
  await prisma.section.deleteMany({});
  await prisma.page.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.generalPageContent.deleteMany({});

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
        layout: "user-layout",
      },
    ],
  });

  await prisma.page.createMany({
    data: [
      {
        name: "landing",
        id: "landing",
        translations: ["landing-es", "landing-en", "landing-fr"],
        component: "vertical-page",
        link: "",
      },
      {
        name: "projects",
        id: "projects",
        translations: ["projects-es", "projects-en", "projects-fr"],
        component: "vertical-page",
        link: "projects",
      },
      {
        name: "projectItem",
        id: "projectItem",
        translations: ["projectItem-es", "projectItem-en", "projectItem-fr"],
        component: "tabbed-page",
        link: "projects/:id",
        isDisplayMenu: false,
      },
    ],
  });

  /**
   * Add pages to project
   */
  const pagesOrder = ["landing", "projects", "projectItem"];
  const pages = ["landing", "projects", "projectItem"];

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

  await LandingSeed(PROJECT_ID);
  await ProjectsSeed(PROJECT_ID);
  await ProjectSeed(PROJECT_ID);
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
