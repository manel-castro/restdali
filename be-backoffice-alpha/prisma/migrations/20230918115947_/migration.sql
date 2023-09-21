/*
  Warnings:

  - You are about to drop the column `paginasLinks` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `paginasOrder` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "paginasLinks",
DROP COLUMN "paginasOrder",
ADD COLUMN     "pagesLinks" TEXT[],
ADD COLUMN     "pagesOrder" TEXT[];
