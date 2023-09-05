/*
  Warnings:

  - You are about to drop the column `fieldNameId` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `pageNameId` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `fieldNameId` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the `FieldName` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PageName` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SectionName` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PageToSection` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Field` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_fieldNameId_fkey";

-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_pageNameId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_pageNameId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_fieldNameId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_pageNameId_fkey";

-- DropForeignKey
ALTER TABLE "SectionName" DROP CONSTRAINT "SectionName_pageId_fkey";

-- DropForeignKey
ALTER TABLE "_PageToSection" DROP CONSTRAINT "_PageToSection_A_fkey";

-- DropForeignKey
ALTER TABLE "_PageToSection" DROP CONSTRAINT "_PageToSection_B_fkey";

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "fieldNameId",
DROP COLUMN "pageNameId",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sectionsOrder" TEXT[];

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "fieldNameId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "pageId" TEXT;

-- DropTable
DROP TABLE "FieldName";

-- DropTable
DROP TABLE "PageName";

-- DropTable
DROP TABLE "SectionName";

-- DropTable
DROP TABLE "_PageToSection";

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
