import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
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
        id: "project1",
        domain: "http://localhost:5173",
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
    ],
  });
  await prisma.section.createMany({
    data: [
      {
        name: "top",
        id: "top1",
        translations: ["top-es", "top-en", "top-fr"],
        component: "header-backoffice-section",
      },
    ],
  });
  await prisma.field.createMany({
    data: [
      {
        name: "top",
        id: "top1",
        translationsLabel: ["titulo", "title", "title"],
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
