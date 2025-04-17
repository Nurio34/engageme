/*
  Warnings:

  - Added the required column `type` to the `PostLikeNotification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('postLike');

-- AlterTable
ALTER TABLE "PostLikeNotification" ADD COLUMN     "type" "NotificationType" NOT NULL;
