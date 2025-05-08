-- CreateEnum
CREATE TYPE "NotificationVariant" AS ENUM ('like', 'comment', 'follow');

-- AlterTable
ALTER TABLE "PostCommentLikeNotification" ADD COLUMN     "isSeen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "variant" "NotificationVariant" NOT NULL DEFAULT 'like';

-- AlterTable
ALTER TABLE "PostCommentNotification" ADD COLUMN     "isSeen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "variant" "NotificationVariant" NOT NULL DEFAULT 'comment';

-- AlterTable
ALTER TABLE "PostLikeNotification" ADD COLUMN     "isSeen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "variant" "NotificationVariant" NOT NULL DEFAULT 'like';

-- AlterTable
ALTER TABLE "ReplyCommentLikeNotification" ADD COLUMN     "isSeen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "variant" "NotificationVariant" NOT NULL DEFAULT 'like';

-- AlterTable
ALTER TABLE "ReplyCommentNotification" ADD COLUMN     "isSeen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "variant" "NotificationVariant" NOT NULL DEFAULT 'comment';
