/*
  Warnings:

  - Made the column `fieldId` on table `FieldValueByProject` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FieldValueByProject" DROP CONSTRAINT "FieldValueByProject_fieldId_fkey";

-- AlterTable
ALTER TABLE "FieldValueByProject" ALTER COLUMN "fieldId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "FieldValueByProject" ADD CONSTRAINT "FieldValueByProject_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
