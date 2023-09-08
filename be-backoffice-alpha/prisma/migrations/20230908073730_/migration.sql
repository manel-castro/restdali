/*
  Warnings:

  - Added the required column `component` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `component` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "component" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "component" TEXT NOT NULL;
