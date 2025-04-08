/*
  Warnings:

  - Added the required column `comment` to the `PostComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostComment" ADD COLUMN     "comment" TEXT NOT NULL;
