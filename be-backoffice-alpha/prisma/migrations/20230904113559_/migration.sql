/*
  Warnings:

  - You are about to drop the column `sectionId` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `pageId` on the `Section` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_pageId_fkey";

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "sectionId";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "pageId";

-- CreateTable
CREATE TABLE "_PageToSection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FieldToSection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PageToSection_AB_unique" ON "_PageToSection"("A", "B");

-- CreateIndex
CREATE INDEX "_PageToSection_B_index" ON "_PageToSection"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FieldToSection_AB_unique" ON "_FieldToSection"("A", "B");

-- CreateIndex
CREATE INDEX "_FieldToSection_B_index" ON "_FieldToSection"("B");

-- AddForeignKey
ALTER TABLE "_PageToSection" ADD CONSTRAINT "_PageToSection_A_fkey" FOREIGN KEY ("A") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToSection" ADD CONSTRAINT "_PageToSection_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FieldToSection" ADD CONSTRAINT "_FieldToSection_A_fkey" FOREIGN KEY ("A") REFERENCES "Field"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FieldToSection" ADD CONSTRAINT "_FieldToSection_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
