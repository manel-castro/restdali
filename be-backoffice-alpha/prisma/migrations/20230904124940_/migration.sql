/*
  Warnings:

  - You are about to drop the column `value` on the `FieldValueByProject` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FieldValueByProject" DROP COLUMN "value",
ADD COLUMN     "values" TEXT[];
