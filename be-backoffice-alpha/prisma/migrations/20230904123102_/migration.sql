/*
  Warnings:

  - You are about to drop the column `projectId` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `translationsValue` on the `Field` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_projectId_fkey";

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "projectId",
DROP COLUMN "translationsValue";

-- CreateTable
CREATE TABLE "FieldValueByProject" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "fieldId" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "FieldValueByProject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FieldValueByProject" ADD CONSTRAINT "FieldValueByProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldValueByProject" ADD CONSTRAINT "FieldValueByProject_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE SET NULL ON UPDATE CASCADE;
