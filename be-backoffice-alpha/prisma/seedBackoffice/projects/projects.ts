import { prisma } from "../../../src/prismaclient";
import { connectSectionsInPagePrisma } from "../../../src/routes/api/backoffice-alpha/pages";
import { connectFieldsInSectionPrisma } from "../../../src/routes/api/backoffice-alpha/sections";

export const ProjectsSeed = async (projectId: string) => {
  const GET_LIST_ITEMS = "/api/backoffice-alpha/projects/ids";

  /**
   *
   * Create sections
   *
   */
  await prisma.section.createMany({
    data: [
      {
        name: "header-section-backoffice",
        id: "header-projects",
        translations: ["header-es", "header-en", "header-fr"],
        component: "header-backoffice-section",
      },
      {
        name: "projectsList",
        id: "projectsList",
        translations: ["projectsList-es", "projectsList-en", "projectsList-fr"],
        component: "editable-links-list-section",
      },
    ],
  });

  /**
   * Add sections to page "landing"
   */
  const sectionsOrder = ["header-projects", "projectsList"];
  const sectionIds = ["header-projects", "projectsList"];
  const pageId = "projects";

  await connectSectionsInPagePrisma({
    pageId,
    sectionsOrder,
    sectionIds,
  });

  /**
   * CREATE ALL NECESSARY FOR SECTION header-projects
   */
  await prisma.field.createMany({
    data: [
      {
        name: "projects_title",
        id: "projects_title",
        translationsLabel: [
          "Nombre de app",
          "App name",
          "Nom de l'application",
        ],
        component: "text",
        valuesByProjectOrder: [],
      },
    ],
  });

  /**
   * Add fields to section to header-projects "projects"
   */
  const fieldIds = ["projects_title"];
  const fieldsOrder = ["projects_title"];
  const sectionId = "header-projects";

  await connectFieldsInSectionPrisma({ fieldIds, sectionId, fieldsOrder });

  /**
   * Add values to field and project
   */
  await prisma.fieldValueByProject.createMany({
    data: [
      {
        id: "projects_title-value",
        name: "projects_title-value",
        projectId: projectId,
        fieldId: fieldIds[0],
        values: ["Backoffice (es)", "Backoffice (en)", "Backoffice (fr)"],
      },
    ],
  });

  /**
   *
   * CREATE ALL NECESSARY FOR SECTION projectsList
   *
   */
  await prisma.field.createMany({
    data: [
      {
        name: "projectsList_addItemButton",
        id: "projectsList_addItemButton",
        translationsLabel: ["addItemButton", "", ""],
        component: "button",
        valuesByProjectOrder: [
          "projectsList_buttonAddItem_text",
          "projectsList_buttonAddItem_buttonType",
          "projectsList_buttonAddItem_linkPath",
          "projectsList_buttonAddItem_isRequest",
          "projectsList_buttonAddItem_isRequest_queriesToInvalidate",
        ],
      },
      {
        name: "projectsList_removeItemButton",
        id: "projectsList_removeItemButton",
        translationsLabel: ["", "", ""],
        component: "button",
        valuesByProjectOrder: [
          "projectsList_removeItemButton_text",
          "projectsList_removeItemButton_buttonType",
          "projectsList_removeItemButton_linkPath",
          "projectsList_removeItemButton_isRequest",
          "projectsList_removeItemButton_isRequest_queriesToInvalidate",
        ],
      },
      {
        name: "projectsList_endpointToGetItems",
        id: "projectsList_endpointToGetItems",
        translationsLabel: ["", "", ""],
        component: "text",
        valuesByProjectOrder: ["projectsList_endpointToGetItems_0"],
      },
    ],
  });

  /**
   * Add fields to section to projectsList_addItemButton "projects"
   */
  const linksList_fieldIds = [
    "projectsList_addItemButton",
    "projectsList_removeItemButton",
    "projectsList_endpointToGetItems",
  ];
  const linksList_fieldsOrder = [
    "projectsList_addItemButton",
    "projectsList_removeItemButton",
    "projectsList_endpointToGetItems",
  ];
  const linksList_sectionId = "projectsList";

  await connectFieldsInSectionPrisma({
    fieldIds: linksList_fieldIds,
    sectionId: linksList_sectionId,
    fieldsOrder: linksList_fieldsOrder,
  });

  /**
   * Add values to field and project projectsList_addItemButton
   */
  await prisma.fieldValueByProject.createMany({
    data: [
      {
        id: "projectsList_buttonAddItem_text",
        name: "projectsList_buttonAddItem_text",
        projectId: projectId,
        fieldId: linksList_fieldIds[0],
        values: ["Add item", "Add item", "Add item"],
      },
      {
        id: "projectsList_buttonAddItem_buttonType",
        name: "projectsList_buttonAddItem_buttonType",
        projectId: projectId,
        fieldId: linksList_fieldIds[0],
        values: ["button", "button", "button"],
      },
      {
        id: "projectsList_buttonAddItem_linkPath",
        name: "projectsList_buttonAddItem_linkPath",
        projectId: projectId,
        fieldId: linksList_fieldIds[0],
        values: ["/add-item", "/add-item", "/add-item"],
      },
      {
        id: "projectsList_buttonAddItem_isRequest",
        name: "projectsList_buttonAddItem_isRequest",
        projectId: projectId,
        fieldId: linksList_fieldIds[0],
        values: ["true", "true", "true"],
      },
      {
        id: "projectsList_buttonAddItem_isRequest_queriesToInvalidate",
        name: "projectsList_buttonAddItem_isRequest_queriesToInvalidate",
        projectId: projectId,
        fieldId: linksList_fieldIds[0],
        values: [GET_LIST_ITEMS, GET_LIST_ITEMS, GET_LIST_ITEMS],
      },
    ],
  });

  /**
   * Add values to field and project projectsList_removeItemButton
   */
  await prisma.fieldValueByProject.createMany({
    data: [
      {
        id: "projectsList_removeItemButton_text",
        name: "projectsList_removeItemButton_text",
        projectId: projectId,
        fieldId: linksList_fieldIds[1],
        values: ["Remove item", "Remove item", "Remove item"],
      },
      {
        id: "projectsList_removeItemButton_buttonType",
        name: "projectsList_removeItemButton_buttonType",
        projectId: projectId,
        fieldId: linksList_fieldIds[1],
        values: ["button", "button", "button"],
      },
      {
        id: "projectsList_removeItemButton_linkPath",
        name: "projectsList_removeItemButton_linkPath",
        projectId: projectId,
        fieldId: linksList_fieldIds[1],
        values: ["/remove-item", "/remove-item", "/remove-item"],
      },
      {
        id: "projectsList_removeItemButton_isRequest",
        name: "projectsList_removeItemButton_isRequest",
        projectId: projectId,
        fieldId: linksList_fieldIds[1],
        values: ["true", "true", "true"],
      },
      {
        id: "projectsList_removeItemButton_isRequest_queriesToInvalidate",
        name: "projectsList_removeItemButton_isRequest_queriesToInvalidate",
        projectId: projectId,
        fieldId: linksList_fieldIds[1],
        values: [GET_LIST_ITEMS, GET_LIST_ITEMS, GET_LIST_ITEMS],
      },
    ],
  });

  /**
   * Add values to field and project projectsList_endpointToGetItems
   */
  await prisma.fieldValueByProject.createMany({
    data: [
      {
        id: "projectsList_endpointToGetItems_0",
        name: "projectsList_endpointToGetItems_0",
        projectId: projectId,
        fieldId: linksList_fieldIds[2],
        values: [GET_LIST_ITEMS, GET_LIST_ITEMS, GET_LIST_ITEMS],
      },
    ],
  });
};
