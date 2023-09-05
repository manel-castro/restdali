-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'ES', 'FR');

-- CreateTable
CREATE TABLE "Translation" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "pageId" TEXT,
    "sectionId" TEXT,
    "fieldId" TEXT,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageName" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PageName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionName" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pageId" TEXT,

    CONSTRAINT "SectionName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralPageContent" (
    "id" TEXT NOT NULL,
    "pageTitle" TEXT NOT NULL,
    "favicon" TEXT NOT NULL,

    CONSTRAINT "GeneralPageContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "generalPageContentId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "pageNameId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "pageNameId" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" TEXT NOT NULL,
    "translationsLabel" TEXT[],
    "sectionId" TEXT,
    "pageNameId" TEXT NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionName" ADD CONSTRAINT "SectionName_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_generalPageContentId_fkey" FOREIGN KEY ("generalPageContentId") REFERENCES "GeneralPageContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_pageNameId_fkey" FOREIGN KEY ("pageNameId") REFERENCES "PageName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_pageNameId_fkey" FOREIGN KEY ("pageNameId") REFERENCES "PageName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_pageNameId_fkey" FOREIGN KEY ("pageNameId") REFERENCES "PageName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
