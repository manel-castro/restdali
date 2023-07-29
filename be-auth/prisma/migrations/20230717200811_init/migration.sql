/*
  Warnings:

  - The primary key for the `ContactForm` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ContactForm" DROP CONSTRAINT "ContactForm_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ContactForm_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ContactForm_id_seq";
