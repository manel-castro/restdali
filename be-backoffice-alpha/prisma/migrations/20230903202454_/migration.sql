/*
  Warnings:

  - You are about to drop the column `pageId` on the `Section` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_pageId_fkey";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "pageId";

-- CreateTable
CREATE TABLE "_PageToSection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PageToSection_AB_unique" ON "_PageToSection"("A", "B");

-- CreateIndex
CREATE INDEX "_PageToSection_B_index" ON "_PageToSection"("B");

-- AddForeignKey
ALTER TABLE "_PageToSection" ADD CONSTRAINT "_PageToSection_A_fkey" FOREIGN KEY ("A") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToSection" ADD CONSTRAINT "_PageToSection_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
