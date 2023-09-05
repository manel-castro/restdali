/*
  Warnings:

  - You are about to drop the column `projectId` on the `Page` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_projectId_fkey";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "projectId";

-- CreateTable
CREATE TABLE "_PageToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PageToProject_AB_unique" ON "_PageToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_PageToProject_B_index" ON "_PageToProject"("B");

-- AddForeignKey
ALTER TABLE "_PageToProject" ADD CONSTRAINT "_PageToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToProject" ADD CONSTRAINT "_PageToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
