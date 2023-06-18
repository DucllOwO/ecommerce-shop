/*
  Warnings:

  - Added the required column `total_cost` to the `importing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "importing" ADD COLUMN     "total_cost" INTEGER NOT NULL;
