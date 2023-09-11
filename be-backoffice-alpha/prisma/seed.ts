import { PrismaClient } from "@prisma/client";
import { connectSectionsInPagePrisma } from "../src/routes/api/backoffice-alpha/pages";
import { connectFieldsInSectionPrisma } from "../src/routes/api/backoffice-alpha/sections";
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
      },
    ],
  });

  await prisma.page.createMany({
    data: [
      {
        name: "landing",
        id: "projectSelectionPage",
        translations: ["landing-es", "landing-en", "landing-fr"],
        component: "vertical-page",
        link: "",
      },
      {
        name: "projects",
        id: "projects",
        translations: ["projects-es", "projects-en", "projects-fr"],
        component: "tabbed-page",
        link: "projects",
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
      {
        name: "form",
        id: "form",
        translations: ["form-es", "form-en", "form-fr"],
        component: "form-section",
      },
    ],
  });

  await prisma.field.createMany({
    data: [
      {
        name: "title",
        id: "title",
        translationsLabel: [
          "Nombre de app",
          "App name",
          "Nom de l'application",
        ],
        component: "text",
        valuesByProjectOrder: [],
      },
      {
        name: "formWrapBackofficeEntrance",
        id: "formWrapBackofficeEntrance",
        translationsLabel: ["Form endpoint", "Form endpoint", "Form endpoint"],
        component: "form-wrap",
        valuesByProjectOrder: [
          "mechanismOfResultSaving",
          "storageKey",
          "navigateToPage",
        ],
      },
      {
        name: "submitButtonText",
        id: "submitButtonText",
        translationsLabel: [
          "Botón de submit",
          "Submit button",
          "Bouton de soumission",
        ],
        component: "button",
        valuesByProjectOrder: ["button-text"],
      },
      {
        name: "inputProject",
        id: "inputProject",
        translationsLabel: [
          "Input project ID",
          "Input project ID",
          "Input project ID",
        ],
        component: "input",
        valuesByProjectOrder: ["inputProjectLabelValue"],
      },
    ],
  });

  /**
   * Add pages to project
   */
  const pagesOrder = ["projectSelectionPage", "projects"];
  const pages = ["projectSelectionPage", "projects"];

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
  const sectionsOrder = ["header", "form"];
  const sectionIds = ["header", "form"];
  const pageId = "projectSelectionPage";

  await connectSectionsInPagePrisma({
    pageId,
    sectionsOrder,
    sectionIds,
  });

  /**
   * Add fields to section to header "landing"
   */
  const fieldIds = ["title"];
  const fieldsOrder = ["title"];
  const sectionId = "header";

  await connectFieldsInSectionPrisma({ fieldIds, sectionId, fieldsOrder });

  /**
   * Add values to field and project
   */
  await prisma.fieldValueByProject.createMany({
    data: [
      {
        id: "title-value",
        name: "title-value",
        projectId: PROJECT_ID,
        fieldId: fieldIds[0],
        values: ["Backoffice (es)", "Backoffice (en)", "Backoffice (fr)"],
      },
    ],
  });

  /**
   * Add fields to section to form in the "landing" page
   */
  const fieldIdsForm = [
    "formWrapBackofficeEntrance",
    "submitButtonText",
    "inputProject",
  ];
  const fieldsOrderForm = [
    "formWrapBackofficeEntrance",
    "submitButtonText",
    "inputProject",
  ];
  const sectionIdForm = "form";

  await connectFieldsInSectionPrisma({
    fieldIds: fieldIdsForm,
    sectionId: sectionIdForm,
    fieldsOrder: fieldsOrderForm,
  });

  /**
   * Add values to field and project
   */
  await prisma.fieldValueByProject.createMany({
    data: [
      {
        id: "mechanismOfResultSaving",
        name: "mechanismOfResultSaving",
        projectId: PROJECT_ID,
        fieldId: fieldIdsForm[0],
        values: ["localstorage", "localstorage", "localstorage"],
      },
      {
        id: "storageKey",
        name: "storageKey",
        projectId: PROJECT_ID,
        fieldId: fieldIdsForm[0],
        values: ["selectedProjectId", "selectedProjectId", "selectedProjectId"],
      },
      {
        id: "navigateToPage",
        name: "navigateToPage",
        projectId: PROJECT_ID,
        fieldId: fieldIdsForm[0],
        values: ["/projects", "/projects", "/projects"],
      },
      {
        id: "button-text",
        name: "button-text",
        projectId: PROJECT_ID,
        fieldId: fieldIdsForm[1],
        values: ["Enviar", "Submit", "Soumettre"],
      },
      {
        id: "inputProjectLabelValue",
        name: "inputProjectLabelValue",
        projectId: PROJECT_ID,
        fieldId: fieldIdsForm[2],
        values: ["ID del proyecto", "Project ID", "ID du projet"],
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
