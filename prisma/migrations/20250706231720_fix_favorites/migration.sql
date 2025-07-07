/*
  Warnings:

  - A unique constraint covering the columns `[userId,favoriteId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `favoriteId` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "favoriteId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_favoriteId_key" ON "Favorite"("userId", "favoriteId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
