/*
  Warnings:

  - You are about to drop the column `mock` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "mock";

-- CreateTable
CREATE TABLE "DontSuggest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DontSuggest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DontSuggest" ADD CONSTRAINT "DontSuggest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
