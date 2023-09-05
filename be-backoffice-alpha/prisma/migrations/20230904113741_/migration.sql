/*
  Warnings:

  - You are about to drop the column `pageNameId` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `pageNameId` on the `Section` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "pageNameId";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "pageNameId";
