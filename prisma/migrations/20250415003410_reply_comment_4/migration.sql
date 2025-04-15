/*
  Warnings:

  - Added the required column `mock` to the `ReplyComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReplyComment" ADD COLUMN     "mock" BOOLEAN NOT NULL;
