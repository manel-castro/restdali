/*
  Warnings:

  - The primary key for the `Field` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Field` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Field" DROP CONSTRAINT "Field_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Field_pkey" PRIMARY KEY ("fieldId");
