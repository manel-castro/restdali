import { prisma } from "../../../src/prismaclient";
import { connectSectionsInPagePrisma } from "../../../src/routes/api/backoffice-alpha/pages";
import { connectFieldsInSectionPrisma } from "../../../src/routes/api/backoffice-alpha/sections";

export const ProjectSeed = async (projectId: string) => {
  const GET_LIST_PAGES = "/api/backoffice-alpha/pagesByProjectId";

  /**
   *
   * Create sections
   *
   */
  await prisma.section.createMany({
    data: [
      {
        name: "section_header_projects_backoffice",
        id: "section_header_projects_backoffice",
        translations: [
          "section-header-es",
          "section-header-en",
          "section-header-fr",
        ],
        component: "section-header-backoffice-section",
      },
      {
        name: "inputsList_projects_backoffice_tab1",
        id: "inputsList_projects_backoffice_tab1",
        translations: ["inputsList-es", "inputsList-en", "inputsList-fr"],
        component: "inputs-list-section",
      },
      {
        name: "pagesList_projects_backoffice_tab2",
        id: "pagesList_projects_backoffice_tab2",
        translations: ["pagesList-es", "pagesList-en", "pagesList-fr"],
        component: "editable-links-list-section",
      },
    ],
  });

  /**
   * Add sections to page "landing"
   */
  const sectionsOrder = [
    "section_header_projects_backoffice",
    "inputsList_projects_backoffice_tab1",
    "pagesList_projects_backoffice_tab2",
  ];
  const sectionIds = [
    "section_header_projects_backoffice",
    "inputsList_projects_backoffice_tab1",
    "pagesList_projects_backoffice_tab2",
  ];
  const pageId = "projectItem";

  await connectSectionsInPagePrisma({
    pageId,
    sectionsOrder,
    sectionIds,
  });

  /**
   *
   * CREATE ALL NECESSARY FOR SECTION header-projects
   *
   */
  await prisma.field.createMany({
    data: [
      {
        name: "projectItem_title",
        id: "projectItem_title",
        translationsLabel: [
          "Section header name",
          "Section header name",
          "Section header name",
        ],
        component: "text",
        valuesByProjectOrder: ["projectItem_title_value"],
      },
      {
        name: "projectItem_projectId",
        id: "projectItem_projectId",
        translationsLabel: ["project id", "project id", "project id"],
        component: "text",
        valuesByProjectOrder: [
          "projectItem_projectId_text_value",
          "projectItem_projectId_type_value",
        ],
      },
    ],
  });

  /**
   * Add fields to section to header-projects "projects"
   */
  const fieldIds = ["projectItem_title", "projectItem_projectId"];
  const fieldsOrder = ["projectItem_title", "projectItem_projectId"];
  const sectionId = "section_header_projects_backoffice";

  await connectFieldsInSectionPrisma({ fieldIds, sectionId, fieldsOrder });

  /**
   * Add values to field and project
   */
  await prisma.fieldValueByProject.createMany({
    data: [
      {
        id: "projectItem_title_value",
        name: "projectItem_title_value",
        projectId: projectId,
        fieldId: fieldIds[0],
        values: ["Project id", "Project id", "Project id"],
      },
      {
        id: "projectItem_projectId_text_value",
        name: "projectItem_projectId_text_value",
        projectId: projectId,
        fieldId: fieldIds[1],
        values: ["", "", ""],
      },
      {
        id: "projectItem_projectId_type_value",
        name: "projectItem_projectId_type_value",
        projectId: projectId,
        fieldId: fieldIds[1],
        values: ["getFromParamUrl", "getFromParamUrl", "getFromParamUrl"],
      },
    ],
  });

  /**
   *
   * CREATE ALL NECESSARY FOR SECTION inputsList_projects_backoffice_tab1
   *
   */
  await prisma.field.createMany({
    data: [
      {
        name: "inputsList_projects_backoffice_tab1_submitButton",
        id: "inputsList_projects_backoffice_tab1_submitButton",
        translationsLabel: ["submit button", "submit button", "submit button"],
        component: "button",
        valuesByProjectOrder: [
          "inputsList_projects_backoffice_tab1_submitButton_text_value",
          "inputsList_projects_backoffice_tab1_submitButton_type_value",
        ],
      },
      {
        name: "inputsList_projects_backoffice_tab1_endpointItems",
        id: "inputsList_projects_backoffice_tab1_endpointItems",
        translationsLabel: ["submit button", "submit button", "submit button"],
        component: "text",
        valuesByProjectOrder: [
          "inputsList_projects_backoffice_tab1_endpointItems_endpoint",
        ],
      },
      {
        name: "inputsList_projects_backoffice_tab1_formWrap",
        id: "inputsList_projects_backoffice_tab1_formWrap",
        translationsLabel: ["submit button", "submit button", "submit button"],
        component: "form-wrap",
        valuesByProjectOrder: [
          "inputsList_projects_backoffice_tab1_formWrap_backend",
          "inputsList_projects_backoffice_tab1_formWrap_backendEndpoint",
          "inputsList_projects_backoffice_tab1_formWrap_navigateToPage",
          "inputsList_projects_backoffice_tab1_formWrap_methodType",
          "inputsList_projects_backoffice_tab1_formWrap_useParamAsIdInBody",
        ],
      },
      {
        name: "inputsList_projects_backoffice_tab1_useParamAsIdInBody",
        id: "inputsList_projects_backoffice_tab1_useParamAsIdInBody",
        translationsLabel: ["submit button", "submit button", "submit button"],
        component: "text",
        valuesByProjectOrder: [
          "inputsList_projects_backoffice_tab1_useParamAsIdInBody_id",
        ],
      },
    ],
  });

  /**
   * Add fields to section to header-projects "projects"
   */
  const inputsList_projects_backoffice_tab1_fieldIds = [
    "inputsList_projects_backoffice_tab1_submitButton",
    "inputsList_projects_backoffice_tab1_endpointItems",
    "inputsList_projects_backoffice_tab1_formWrap",
    "inputsList_projects_backoffice_tab1_useParamAsIdInBody",
  ];
  const inputsList_projects_backoffice_tab1_fieldsOrder = [
    "inputsList_projects_backoffice_tab1_submitButton",
    "inputsList_projects_backoffice_tab1_endpointItems",
    "inputsList_projects_backoffice_tab1_formWrap",
    "inputsList_projects_backoffice_tab1_useParamAsIdInBody",
  ];
  const inputsList_projects_backoffice_tab1_sectionId =
    "inputsList_projects_backoffice_tab1";

  await connectFieldsInSectionPrisma({
    fieldIds: inputsList_projects_backoffice_tab1_fieldIds,
    fieldsOrder: inputsList_projects_backoffice_tab1_fieldsOrder,
    sectionId: inputsList_projects_backoffice_tab1_sectionId,
  });

  /**
   * Add values to field and project
   */
  await prisma.fieldValueByProject.createMany({
    data: [
      {
        id: "inputsList_projects_backoffice_tab1_submitButton_text_value",
        name: "inputsList_projects_backoffice_tab1_submitButton_text_value",
        projectId: projectId,
        fieldId: inputsList_projects_backoffice_tab1_fieldIds[0],
        values: ["Save", "Guardar", "Sauvegarder"],
      },
      {
        id: "inputsList_projects_backoffice_tab1_submitButton_type_value",
        name: "inputsList_projects_backoffice_tab1_submitButton_type_value",
        projectId: projectId,
        fieldId: inputsList_projects_backoffice_tab1_fieldIds[0],
        values: ["submit", "submit", "submit"],
      },
      {
        id: "inputsList_projects_backoffice_tab1_endpointItems",
        name: "inputsList_projects_backoffice_tab1_endpointItems",
        projectId: projectId,
        fieldId: inputsList_projects_backoffice_tab1_fieldIds[1],
        values: [
          "/api/backoffice-alpha/projects/metadata",
          "/api/backoffice-alpha/projects/metadata",
          "/api/backoffice-alpha/projects/metadata",
        ],
      },

      {
        id: "inputsList_projects_backoffice_tab1_formWrap_backend",
        name: "inputsList_projects_backoffice_tab1_formWrap_backend",
        projectId: projectId,
        fieldId: inputsList_projects_backoffice_tab1_fieldIds[2],
        values: ["backend", "backend", "backend"],
      },
      {
        id: "inputsList_projects_backoffice_tab1_formWrap_backendEndpoint",
        name: "inputsList_projects_backoffice_tab1_formWrap_backendEndpoint",
        projectId: projectId,
        fieldId: inputsList_projects_backoffice_tab1_fieldIds[2],
        values: [
          "/api/backoffice-alpha/projects",
          "/api/backoffice-alpha/projects",
          "/api/backoffice-alpha/projects",
        ],
      },
      {
        id: "inputsList_projects_backoffice_tab1_formWrap_navigateToPage",
        name: "inputsList_projects_backoffice_tab1_formWrap_navigateToPage",
        projectId: projectId,
        fieldId: inputsList_projects_backoffice_tab1_fieldIds[2],
        values: ["undefined", "undefined", "undefined"],
      },
      {
        id: "inputsList_projects_backoffice_tab1_formWrap_methodType",
        name: "inputsList_projects_backoffice_tab1_formWrap_methodType",
        projectId: projectId,
        fieldId: inputsList_projects_backoffice_tab1_fieldIds[2],
        values: ["patch", "patch", "patch"],
      },
      {
        id: "inputsList_projects_backoffice_tab1_formWrap_useParamAsIdInBody",
        name: "inputsList_projects_backoffice_tab1_formWrap_useParamAsIdInBody",
        projectId: projectId,
        fieldId: inputsList_projects_backoffice_tab1_fieldIds[2],
        values: ["id", "id", "id"],
      },

      {
        id: "inputsList_projects_backoffice_tab1_useParamAsIdInBody_id",
        name: "inputsList_projects_backoffice_tab1_useParamAsIdInBody_id",
        projectId: projectId,
        fieldId: inputsList_projects_backoffice_tab1_fieldIds[3],
        values: ["id", "id", "id"],
      },
    ],
  });

  /**
   *
   * CREATE ALL NECESSARY FOR SECTION pagesList_projects_backoffice_tab2
   *
   */
  await prisma.field.createMany({
    data: [
      {
        name: "pagesList_projects_backoffice_tab2_buttonAddItem",
        id: "pagesList_projects_backoffice_tab2_buttonAddItem",
        translationsLabel: ["add button", "add button", "add button"],
        component: "button",
        valuesByProjectOrder: [
          "pagesList_projects_backoffice_tab2_buttonAddItem_text_value",
          "pagesList_projects_backoffice_tab2_buttonAddItem_type_value",
          "pagesList_projects_backoffice_tab2_buttonAddItem_link_value",
          "pagesList_projects_backoffice_tab2_buttonAddItem_isRequest_value",
          "pagesList_projects_backoffice_tab2_buttonAddItem_isRequest_queriesToInvalidate_value",
        ],
      },
      {
        name: "pagesList_projects_backoffice_tab2_buttonRemoveItem",
        id: "pagesList_projects_backoffice_tab2_buttonRemoveItem",
        translationsLabel: ["remove button", "remove button", "remove button"],
        component: "button",
        valuesByProjectOrder: [
          "pagesList_projects_backoffice_tab2_buttonRemoveItem_text_value",
          "pagesList_projects_backoffice_tab2_buttonRemoveItem_type_value",
          "pagesList_projects_backoffice_tab2_buttonRemoveItem_link_value",
          "pagesList_projects_backoffice_tab2_buttonRemoveItem_isRequest_value",
          "pagesList_projects_backoffice_tab2_buttonRemoveItem_isRequest_queriesToInvalidate_value",
        ],
      },
      {
        name: "pagesList_projects_backoffice_tab2_endpoint",
        id: "pagesList_projects_backoffice_tab2_endpoint",
        translationsLabel: ["endpoint", "endpoint", "endpoint"],
        component: "",
        valuesByProjectOrder: [
          "pagesList_projects_backoffice_tab2_endpoint_value",
        ],
      },
    ],
  });

  /**
   * Add fields to section to header-projects "projects"
   */
  const pagesList_projects_backoffice_tab2_fieldIds = [
    "pagesList_projects_backoffice_tab2_buttonAddItem",
    "pagesList_projects_backoffice_tab2_buttonRemoveItem",
    "pagesList_projects_backoffice_tab2_endpoint",
  ];
  const pagesList_projects_backoffice_tab2_fieldsOrder = [
    "pagesList_projects_backoffice_tab2_buttonAddItem",
    "pagesList_projects_backoffice_tab2_buttonRemoveItem",
    "pagesList_projects_backoffice_tab2_endpoint",
  ];
  const pagesList_projects_backoffice_tab2_sectionId =
    "pagesList_projects_backoffice_tab2";

  await connectFieldsInSectionPrisma({
    fieldIds: pagesList_projects_backoffice_tab2_fieldIds,
    fieldsOrder: pagesList_projects_backoffice_tab2_fieldsOrder,
    sectionId: pagesList_projects_backoffice_tab2_sectionId,
  });

  /**
   * Add values to field and project
   */
  await prisma.fieldValueByProject.createMany({
    data: [
      /**
       * Values for Add new page button
       */
      {
        id: "pagesList_projects_backoffice_tab2_buttonAddItem_text_value",
        name: "pagesList_projects_backoffice_tab2_buttonAddItem_text_value",
        projectId: projectId,
        fieldId: pagesList_projects_backoffice_tab2_fieldIds[0],
        values: ["Add new page", "Add new page", "Add new page"],
      },
      {
        id: "pagesList_projects_backoffice_tab2_buttonAddItem_type_value",
        name: "pagesList_projects_backoffice_tab2_buttonAddItem_type_value",
        projectId: projectId,
        fieldId: pagesList_projects_backoffice_tab2_fieldIds[0],
        values: ["button", "button", "button"],
      },
      {
        id: "pagesList_projects_backoffice_tab2_buttonAddItem_link_value",
        name: "pagesList_projects_backoffice_tab2_buttonAddItem_link_value",
        projectId: projectId,
        fieldId: pagesList_projects_backoffice_tab2_fieldIds[0],
        values: [
          "/link-to-add-new-page",
          "/link-to-add-new-page",
          "/link-to-add-new-page",
        ],
      },
      {
        id: "pagesList_projects_backoffice_tab2_buttonAddItem_isRequest_value",
        name: "pagesList_projects_backoffice_tab2_buttonAddItem_isRequest_value",
        projectId: projectId,
        fieldId: pagesList_projects_backoffice_tab2_fieldIds[0],
        values: ["true", "true", "true"],
      },
      {
        id: "pagesList_projects_backoffice_tab2_buttonAddItem_isRequest_queriesToInvalidate_value",
        name: "pagesList_projects_backoffice_tab2_buttonAddItem_isRequest_queriesToInvalidate_value",
        projectId: projectId,
        fieldId: pagesList_projects_backoffice_tab2_fieldIds[0],
        values: [GET_LIST_PAGES, GET_LIST_PAGES, GET_LIST_PAGES],
      },
      /**
       * Values for Remove page button
       */
      {
        id: "pagesList_projects_backoffice_tab2_buttonRemoveItem_text_value",
        name: "pagesList_projects_backoffice_tab2_buttonRemoveItem_text_value",
        projectId: projectId,
        fieldId: pagesList_projects_backoffice_tab2_fieldIds[1],
        values: ["Remove page", "Remove page", "Remove page"],
      },
      {
        id: "pagesList_projects_backoffice_tab2_buttonRemoveItem_type_value",
        name: "pagesList_projects_backoffice_tab2_buttonRemoveItem_type_value",
        projectId: projectId,
        fieldId: pagesList_projects_backoffice_tab2_fieldIds[1],
        values: ["button", "button", "button"],
      },
      {
        id: "pagesList_projects_backoffice_tab2_buttonRemoveItem_link_value",
        name: "pagesList_projects_backoffice_tab2_buttonRemoveItem_link_value",
        projectId: projectId,
        fieldId: pagesList_projects_backoffice_tab2_fieldIds[1],
        values: [
          "/link-to-remove-page",
          "/link-to-remove-page",
          "/link-to-remove-page",
        ],
      },
      {
        id: "pagesList_projects_backoffice_tab2_buttonRemoveItem_isRequest_value",
        name: "pagesList_projects_backoffice_tab2_buttonRemoveItem_isRequest_value",
        projectId: projectId,
        fieldId: pagesList_projects_backoffice_tab2_fieldIds[1],
        values: ["true", "true", "true"],
      },
      {
        id: "pagesList_projects_backoffice_tab2_buttonRemoveItem_isRequest_queriesToInvalidate_value",
        name: "pagesList_projects_backoffice_tab2_buttonRemoveItem_isRequest_queriesToInvalidate_value",
        projectId: projectId,
        fieldId: pagesList_projects_backoffice_tab2_fieldIds[1],
        values: [GET_LIST_PAGES, GET_LIST_PAGES, GET_LIST_PAGES],
      },
      /**
       * Endpoint to get items
       */
      {
        id: "pagesList_projects_backoffice_tab2_endpoint_value",
        name: "pagesList_projects_backoffice_tab2_endpoint_value",
        projectId: projectId,
        fieldId: pagesList_projects_backoffice_tab2_fieldIds[2],
        values: [GET_LIST_PAGES, GET_LIST_PAGES, GET_LIST_PAGES],
      },
    ],
  });
};
