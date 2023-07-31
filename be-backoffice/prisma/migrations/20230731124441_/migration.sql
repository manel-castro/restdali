/*
  Warnings:

  - You are about to drop the column `fieldId` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the `Field` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_sectionId_fkey";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "fieldId",
ADD COLUMN     "initialFields" JSONB[];

-- DropTable
DROP TABLE "Field";
