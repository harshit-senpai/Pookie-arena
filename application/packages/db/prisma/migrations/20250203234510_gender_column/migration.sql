/*
  Warnings:

  - Added the required column `gender` to the `UserPersonality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPersonality" ADD COLUMN     "gender" TEXT NOT NULL;
