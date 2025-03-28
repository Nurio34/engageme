/*
  Warnings:

  - You are about to drop the column `clerkId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `clerkId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[postId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mediaId]` on the table `Poster` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mediaId]` on the table `Transformation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaId` to the `Poster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaId` to the `Transformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_id_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_id_fkey";

-- DropForeignKey
ALTER TABLE "Poster" DROP CONSTRAINT "Poster_id_fkey";

-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_id_fkey";

-- DropForeignKey
ALTER TABLE "Transformation" DROP CONSTRAINT "Transformation_id_fkey";

-- DropIndex
DROP INDEX "User_clerkId_key";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "clerkId",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Poster" ADD COLUMN     "mediaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transformation" ADD COLUMN     "mediaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clerkId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Location_postId_key" ON "Location"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Poster_mediaId_key" ON "Poster"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_postId_key" ON "Settings"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Transformation_mediaId_key" ON "Transformation"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poster" ADD CONSTRAINT "Poster_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transformation" ADD CONSTRAINT "Transformation_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
