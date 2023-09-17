import { prisma } from "../../src/prismaclient";
import { connectSectionsInPagePrisma } from "../../src/routes/api/backoffice-alpha/pages";
import { connectFieldsInSectionPrisma } from "../../src/routes/api/backoffice-alpha/sections";

export const LandingSeed = async (projectId: string) => {
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
   * Add sections to page "landing"
   */
  const sectionsOrder = ["header", "form"];
  const sectionIds = ["header", "form"];
  const pageId = "landing";

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
        projectId: projectId,
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
        projectId: projectId,
        fieldId: fieldIdsForm[0],
        values: ["localstorage", "localstorage", "localstorage"],
      },
      {
        id: "storageKey",
        name: "storageKey",
        projectId: projectId,
        fieldId: fieldIdsForm[0],
        values: ["selectedProjectId", "selectedProjectId", "selectedProjectId"],
      },
      {
        id: "navigateToPage",
        name: "navigateToPage",
        projectId: projectId,
        fieldId: fieldIdsForm[0],
        values: ["/projects", "/projects", "/projects"],
      },
      {
        id: "button-text",
        name: "button-text",
        projectId: projectId,
        fieldId: fieldIdsForm[1],
        values: ["Enviar", "Submit", "Soumettre"],
      },
      {
        id: "inputProjectLabelValue",
        name: "inputProjectLabelValue",
        projectId: projectId,
        fieldId: fieldIdsForm[2],
        values: ["ID del proyecto", "Project ID", "ID du projet"],
      },
    ],
  });
};
