/*
  Warnings:

  - A unique constraint covering the columns `[userId,dontSuggestUserId]` on the table `DontSuggest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dontSuggestUserId` to the `DontSuggest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DontSuggest" ADD COLUMN     "dontSuggestUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DontSuggest_userId_dontSuggestUserId_key" ON "DontSuggest"("userId", "dontSuggestUserId");

-- AddForeignKey
ALTER TABLE "DontSuggest" ADD CONSTRAINT "DontSuggest_dontSuggestUserId_fkey" FOREIGN KEY ("dontSuggestUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
