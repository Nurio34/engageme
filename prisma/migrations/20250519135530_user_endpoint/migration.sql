-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authToken" TEXT,
ADD COLUMN     "endpoint" TEXT,
ADD COLUMN     "pushToken" TEXT;
