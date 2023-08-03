/*
  Warnings:

  - You are about to drop the column `lang` on the `Section` table. All the data in the column will be lost.
  - Added the required column `lang` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Field" ADD COLUMN     "lang" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "lang";
