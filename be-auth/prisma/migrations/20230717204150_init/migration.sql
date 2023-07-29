/*
  Warnings:

  - You are about to drop the column `content` on the `ContactForm` table. All the data in the column will be lost.
  - You are about to drop the column `seen` on the `ContactForm` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ContactForm` table. All the data in the column will be lost.
  - Added the required column `email` to the `ContactForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactForm" DROP COLUMN "content",
DROP COLUMN "seen",
DROP COLUMN "title",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT;
