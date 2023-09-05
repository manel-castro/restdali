import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.section.createMany({
    data: [
      {
        title: "Hero",
        id: "hero-section",
        project: "localhost:8080",
      },
      {
        title: "Tabs",
        id: "tabs-section",
        project: "localhost:8080",
      },
    ],
  });
  await prisma.field.createMany({
    data: [
      {
        fieldId: "hero-title",
        fieldLabel: "Título",
        fieldType: "text",
        fieldValue: "Invirtiendo Juntos",
        lang: "es",
        sectionId: "hero-section",
      },
      {
        fieldId: "hero-description",
        fieldLabel: "Descripción",
        fieldType: "text",
        fieldValue:
          "Obtenga ideas de inversion de 30M de usuarios e invierta en mas de 3000 activos en una plataforma sencilal y segura",
        lang: "es",
        sectionId: "hero-section",
      },
      {
        fieldId: "hero-video",
        fieldLabel: "Video",
        fieldType: "text",
        fieldValue:
          "https://marketing.etorostatic.com/cache1/hp/v_251/videos/protools.mp4",
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
