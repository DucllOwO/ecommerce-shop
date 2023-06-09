/*
  Warnings:

  - You are about to drop the column `userID` on the `receipt` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "receipt" DROP CONSTRAINT "receipt_userID_fkey";

-- AlterTable
ALTER TABLE "receipt" DROP COLUMN "userID";
