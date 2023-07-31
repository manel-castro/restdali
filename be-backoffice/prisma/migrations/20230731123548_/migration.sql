-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_fieldId_fkey";

-- AlterTable
ALTER TABLE "Field" ADD COLUMN     "sectionId" TEXT;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
