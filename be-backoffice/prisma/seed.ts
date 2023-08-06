import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.section.createMany({
    data: [
      {
        title: "Hero",
        id: "hero-section",
      },
      {
        title: "Tabs",
        id: "tabs-section",
      },
    ],
  });
  await prisma.field.createMany({
    data: [
      {
        fieldId: "hero-title-es",
        fieldLabel: "Título",
        fieldType: "text",
        fieldValue: "Título inicial",
        lang: "es",
        sectionId: "hero-section",
      },
      {
        fieldId: "hero-description-es",
        fieldLabel: "Descripción",
        fieldType: "text",
        fieldValue: "Descripción inicial",
        lang: "es",
        sectionId: "hero-section",
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
