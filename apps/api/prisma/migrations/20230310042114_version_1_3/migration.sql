/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `username` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Daily_report` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Monthly_report` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Yearly_report` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `email` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Daily_report" DROP CONSTRAINT "Daily_report_month_fkey";

-- DropForeignKey
ALTER TABLE "Monthly_report" DROP CONSTRAINT "Monthly_report_year_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "username",
ADD COLUMN     "email" VARCHAR(256) NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("email");

-- AlterTable
ALTER TABLE "Daily_report" DROP CONSTRAINT "Daily_report_pkey",
ALTER COLUMN "date" SET DATA TYPE DATE,
ALTER COLUMN "month" SET DATA TYPE DATE,
ADD CONSTRAINT "Daily_report_pkey" PRIMARY KEY ("date");

-- AlterTable
ALTER TABLE "Monthly_report" DROP CONSTRAINT "Monthly_report_pkey",
ALTER COLUMN "month" SET DATA TYPE DATE,
ALTER COLUMN "year" SET DATA TYPE DATE,
ADD CONSTRAINT "Monthly_report_pkey" PRIMARY KEY ("month");

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "date" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "Receipt" ALTER COLUMN "date" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "Voucher" ALTER COLUMN "due" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Yearly_report" DROP CONSTRAINT "Yearly_report_pkey",
ALTER COLUMN "year" SET DATA TYPE DATE,
ADD CONSTRAINT "Yearly_report_pkey" PRIMARY KEY ("year");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_email_fkey" FOREIGN KEY ("email") REFERENCES "Account"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monthly_report" ADD CONSTRAINT "Monthly_report_year_fkey" FOREIGN KEY ("year") REFERENCES "Yearly_report"("year") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Daily_report" ADD CONSTRAINT "Daily_report_month_fkey" FOREIGN KEY ("month") REFERENCES "Monthly_report"("month") ON DELETE NO ACTION ON UPDATE CASCADE;
