/*
  Warnings:

  - You are about to drop the `Translation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_pageId_fkey";

-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_sectionId_fkey";

-- AlterTable
ALTER TABLE "Field" ADD COLUMN     "translationsValue" TEXT[];

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "translations" TEXT[];

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "languagesForTranslation" TEXT[];

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "translations" TEXT[];

-- DropTable
DROP TABLE "Translation";
