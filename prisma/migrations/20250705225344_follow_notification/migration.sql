/*
  Warnings:

  - Added the required column `type` to the `FollowNotification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variant` to the `FollowNotification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FollowNotification" ADD COLUMN     "type" "NotificationType" NOT NULL,
ADD COLUMN     "variant" "NotificationVariant" NOT NULL;
