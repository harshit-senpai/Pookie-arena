/*
  Warnings:

  - You are about to drop the column `avatarId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Avatar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Element` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Map` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MapElements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Space` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `spaceElements` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MapElements" DROP CONSTRAINT "MapElements_elementId_fkey";

-- DropForeignKey
ALTER TABLE "MapElements" DROP CONSTRAINT "MapElements_mapId_fkey";

-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_avatarId_fkey";

-- DropForeignKey
ALTER TABLE "spaceElements" DROP CONSTRAINT "spaceElements_elementId_fkey";

-- DropForeignKey
ALTER TABLE "spaceElements" DROP CONSTRAINT "spaceElements_spaceId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarId",
DROP COLUMN "role",
ADD COLUMN     "email" TEXT NOT NULL;

-- DropTable
DROP TABLE "Avatar";

-- DropTable
DROP TABLE "Element";

-- DropTable
DROP TABLE "Map";

-- DropTable
DROP TABLE "MapElements";

-- DropTable
DROP TABLE "Space";

-- DropTable
DROP TABLE "spaceElements";

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
