/*
  Warnings:

  - You are about to alter the column `userID` on the `Cart` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(11)`.
  - The primary key for the `Collection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `Collection` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - The `discountID` column on the `Collection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Discount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Discount` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `authorID` on the `Feedback` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(11)`.
  - You are about to alter the column `status` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(1)`.
  - You are about to alter the column `userID` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(11)`.
  - You are about to alter the column `name` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - The `discountID` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `collectionID` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `color` on the `Product_item` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `size` on the `Product_item` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(4)`.
  - You are about to alter the column `status` on the `Receipt` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(1)`.
  - You are about to alter the column `voucherCode` on the `Receipt` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(6)`.
  - You are about to alter the column `authorID` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(11)`.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Tag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `name` on the `Tag` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - The `discountID` column on the `Tag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(11)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(256)`.
  - You are about to alter the column `address` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `firstname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `lastname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `phone_number` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(10)`.
  - The primary key for the `Voucher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `code` on the `Voucher` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(6)`.
  - You are about to alter the column `name` on the `Voucher` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - Changed the type of `id` on the `Collection` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tagID` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userID_fkey";

-- DropForeignKey
ALTER TABLE "Cart_detail" DROP CONSTRAINT "Cart_detail_cartID_fkey";

-- DropForeignKey
ALTER TABLE "Cart_detail" DROP CONSTRAINT "Cart_detail_itemID_fkey";

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_discountID_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_authorID_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userID_fkey";

-- DropForeignKey
ALTER TABLE "Order_detail" DROP CONSTRAINT "Order_detail_itemID_fkey";

-- DropForeignKey
ALTER TABLE "Order_detail" DROP CONSTRAINT "Order_detail_orderID_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_collectionID_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_discountID_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_tagID_fkey";

-- DropForeignKey
ALTER TABLE "Product_item" DROP CONSTRAINT "Product_item_productID_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_voucherCode_fkey";

-- DropForeignKey
ALTER TABLE "ReceiptDetail" DROP CONSTRAINT "ReceiptDetail_productID_fkey";

-- DropForeignKey
ALTER TABLE "ReceiptDetail" DROP CONSTRAINT "ReceiptDetail_receiptID_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_authorID_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productID_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_discountID_fkey";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "userID" SET DATA TYPE CHAR(11);

-- AlterTable
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(150),
DROP COLUMN "discountID",
ADD COLUMN     "discountID" INTEGER,
ADD CONSTRAINT "Collection_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Discount" DROP CONSTRAINT "Discount_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Discount_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "authorID" SET DATA TYPE CHAR(11);

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DATA TYPE CHAR(1),
ALTER COLUMN "userID" SET DATA TYPE CHAR(11);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "name" SET DATA TYPE VARCHAR(256),
DROP COLUMN "discountID",
ADD COLUMN     "discountID" INTEGER,
DROP COLUMN "tagID",
ADD COLUMN     "tagID" INTEGER NOT NULL,
DROP COLUMN "collectionID",
ADD COLUMN     "collectionID" INTEGER;

-- AlterTable
ALTER TABLE "Product_item" ALTER COLUMN "color" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "size" SET DATA TYPE CHAR(4);

-- AlterTable
ALTER TABLE "Receipt" ALTER COLUMN "status" SET DATA TYPE CHAR(1),
ALTER COLUMN "voucherCode" SET DATA TYPE CHAR(6);

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "authorID" SET DATA TYPE CHAR(11);

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(150),
DROP COLUMN "discountID",
ADD COLUMN     "discountID" INTEGER,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE CHAR(11),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "firstname" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "phone_number" SET DATA TYPE CHAR(10),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Voucher" DROP CONSTRAINT "Voucher_pkey",
ALTER COLUMN "code" SET DATA TYPE CHAR(6),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(150),
ADD CONSTRAINT "Voucher_pkey" PRIMARY KEY ("code");

-- CreateTable
CREATE TABLE "Yearly_report" (
    "year" TIMESTAMP(3) NOT NULL,
    "income" INTEGER NOT NULL DEFAULT 0,
    "sold_quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Yearly_report_pkey" PRIMARY KEY ("year")
);

-- CreateTable
CREATE TABLE "Monthly_report" (
    "month" TIMESTAMP(3) NOT NULL,
    "income" INTEGER NOT NULL DEFAULT 0,
    "sold_quantity" INTEGER NOT NULL DEFAULT 0,
    "year" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Monthly_report_pkey" PRIMARY KEY ("month")
);

-- CreateTable
CREATE TABLE "Daily_report" (
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "income" INTEGER NOT NULL DEFAULT 0,
    "sold_quantity" INTEGER NOT NULL DEFAULT 0,
    "month" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Daily_report_pkey" PRIMARY KEY ("date")
);

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_discountID_fkey" FOREIGN KEY ("discountID") REFERENCES "Discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_discountID_fkey" FOREIGN KEY ("discountID") REFERENCES "Discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_discountID_fkey" FOREIGN KEY ("discountID") REFERENCES "Discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES "Tag"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_collectionID_fkey" FOREIGN KEY ("collectionID") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_voucherCode_fkey" FOREIGN KEY ("voucherCode") REFERENCES "Voucher"("code") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptDetail" ADD CONSTRAINT "ReceiptDetail_receiptID_fkey" FOREIGN KEY ("receiptID") REFERENCES "Receipt"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptDetail" ADD CONSTRAINT "ReceiptDetail_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_item" ADD CONSTRAINT "Product_item_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_detail" ADD CONSTRAINT "Cart_detail_cartID_fkey" FOREIGN KEY ("cartID") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_detail" ADD CONSTRAINT "Cart_detail_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Product_item"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_detail" ADD CONSTRAINT "Order_detail_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Product_item"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_detail" ADD CONSTRAINT "Order_detail_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monthly_report" ADD CONSTRAINT "Monthly_report_year_fkey" FOREIGN KEY ("year") REFERENCES "Yearly_report"("year") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Daily_report" ADD CONSTRAINT "Daily_report_month_fkey" FOREIGN KEY ("month") REFERENCES "Monthly_report"("month") ON DELETE NO ACTION ON UPDATE CASCADE;
