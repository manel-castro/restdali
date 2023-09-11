/*
  Warnings:

  - Added the required column `name` to the `FieldValueByProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FieldValueByProject" ADD COLUMN     "name" TEXT NOT NULL;
