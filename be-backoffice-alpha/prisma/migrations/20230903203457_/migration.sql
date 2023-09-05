/*
  Warnings:

  - Added the required column `fieldNameId` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_pageNameId_fkey";

-- AlterTable
ALTER TABLE "Field" ADD COLUMN     "fieldNameId" TEXT NOT NULL,
ALTER COLUMN "pageNameId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "fieldNameId" TEXT;

-- CreateTable
CREATE TABLE "FieldName" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FieldName_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_fieldNameId_fkey" FOREIGN KEY ("fieldNameId") REFERENCES "FieldName"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_fieldNameId_fkey" FOREIGN KEY ("fieldNameId") REFERENCES "FieldName"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_pageNameId_fkey" FOREIGN KEY ("pageNameId") REFERENCES "PageName"("id") ON DELETE SET NULL ON UPDATE CASCADE;
