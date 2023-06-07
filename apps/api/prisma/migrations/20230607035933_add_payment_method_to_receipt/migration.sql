/*
  Warnings:

  - Added the required column `paymentMethod` to the `receipt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "receipt" ADD COLUMN     "paymentMethod" VARCHAR(100) NOT NULL;
