/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cart_detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Daily_report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Discount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Import` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImportDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Monthly_report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order_detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Receipt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReceiptDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Voucher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Yearly_report` table. If the table is not empty, all the data it contains will be lost.

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
ALTER TABLE "Daily_report" DROP CONSTRAINT "Daily_report_month_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_authorID_fkey";

-- DropForeignKey
ALTER TABLE "ImportDetail" DROP CONSTRAINT "ImportDetail_importID_fkey";

-- DropForeignKey
ALTER TABLE "ImportDetail" DROP CONSTRAINT "ImportDetail_item_fkey";

-- DropForeignKey
ALTER TABLE "Monthly_report" DROP CONSTRAINT "Monthly_report_year_fkey";

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
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_userID_fkey";

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

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_email_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "Cart_detail";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "Daily_report";

-- DropTable
DROP TABLE "Discount";

-- DropTable
DROP TABLE "Feedback";

-- DropTable
DROP TABLE "Import";

-- DropTable
DROP TABLE "ImportDetail";

-- DropTable
DROP TABLE "Monthly_report";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Order_detail";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Product_item";

-- DropTable
DROP TABLE "Receipt";

-- DropTable
DROP TABLE "ReceiptDetail";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Voucher";

-- DropTable
DROP TABLE "Yearly_report";

-- CreateTable
CREATE TABLE "account" (
    "email" VARCHAR(256) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "account_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "user" (
    "id" CHAR(12) NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50),
    "phone_number" CHAR(10),
    "address" VARCHAR(150),
    "avatar" TEXT NOT NULL DEFAULT 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    "product_viewed" TEXT[],
    "email" VARCHAR(256) NOT NULL,
    "logged_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "rate" DOUBLE PRECISION NOT NULL,
    "authorID" CHAR(12),

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discount" (
    "id" SERIAL NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "discountID" INTEGER,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "discountID" INTEGER,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "image" TEXT[],
    "view" INTEGER NOT NULL DEFAULT 0,
    "sold" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "discountID" INTEGER,
    "tagID" INTEGER NOT NULL,
    "collectionID" INTEGER,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voucher" (
    "code" CHAR(6) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT,
    "due" DATE NOT NULL,

    CONSTRAINT "voucher_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "receipt" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "status" CHAR(1) NOT NULL DEFAULT '0',
    "voucherCode" CHAR(6),
    "userID" CHAR(12) NOT NULL,

    CONSTRAINT "receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipt_detail" (
    "id" SERIAL NOT NULL,
    "receiptID" INTEGER NOT NULL,
    "productID" INTEGER NOT NULL,

    CONSTRAINT "receipt_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "comment" TEXT,
    "rate" DOUBLE PRECISION NOT NULL,
    "authorID" CHAR(12) NOT NULL,
    "productID" INTEGER NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_item" (
    "id" SERIAL NOT NULL,
    "color" VARCHAR(100) NOT NULL,
    "size" CHAR(4) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "image" TEXT[],
    "productID" INTEGER NOT NULL,

    CONSTRAINT "product_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" SERIAL NOT NULL,
    "userID" CHAR(12) NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_detail" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "cartID" INTEGER NOT NULL,
    "itemID" INTEGER NOT NULL,

    CONSTRAINT "cart_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_cost" INTEGER NOT NULL DEFAULT 0,
    "status" CHAR(1) NOT NULL DEFAULT '0',
    "userID" CHAR(12) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_detail" (
    "id" SERIAL NOT NULL,
    "itemID" INTEGER NOT NULL,
    "orderID" INTEGER NOT NULL,

    CONSTRAINT "order_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "yearly_report" (
    "year" DATE NOT NULL,
    "income" INTEGER NOT NULL DEFAULT 0,
    "outcome" INTEGER NOT NULL DEFAULT 0,
    "profit" INTEGER NOT NULL DEFAULT 0,
    "sold_quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "yearly_report_pkey" PRIMARY KEY ("year")
);

-- CreateTable
CREATE TABLE "monthly_report" (
    "month" DATE NOT NULL,
    "income" INTEGER NOT NULL DEFAULT 0,
    "outcome" INTEGER NOT NULL DEFAULT 0,
    "profit" INTEGER NOT NULL DEFAULT 0,
    "sold_quantity" INTEGER NOT NULL DEFAULT 0,
    "year" DATE NOT NULL,

    CONSTRAINT "monthly_report_pkey" PRIMARY KEY ("month")
);

-- CreateTable
CREATE TABLE "daily_report" (
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "income" INTEGER NOT NULL DEFAULT 0,
    "outcome" INTEGER NOT NULL DEFAULT 0,
    "profit" INTEGER NOT NULL DEFAULT 0,
    "sold_quantity" INTEGER NOT NULL DEFAULT 0,
    "month" DATE NOT NULL,

    CONSTRAINT "daily_report_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "importing" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "importing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "import_detail" (
    "id" SERIAL NOT NULL,
    "item" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL DEFAULT 0,
    "importID" INTEGER NOT NULL,
    "total_cost" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "import_detail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_email_fkey" FOREIGN KEY ("email") REFERENCES "account"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_discountID_fkey" FOREIGN KEY ("discountID") REFERENCES "discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_discountID_fkey" FOREIGN KEY ("discountID") REFERENCES "discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_discountID_fkey" FOREIGN KEY ("discountID") REFERENCES "discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_collectionID_fkey" FOREIGN KEY ("collectionID") REFERENCES "collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_voucherCode_fkey" FOREIGN KEY ("voucherCode") REFERENCES "voucher"("code") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_detail" ADD CONSTRAINT "receipt_detail_receiptID_fkey" FOREIGN KEY ("receiptID") REFERENCES "receipt"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_detail" ADD CONSTRAINT "receipt_detail_productID_fkey" FOREIGN KEY ("productID") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_productID_fkey" FOREIGN KEY ("productID") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_item" ADD CONSTRAINT "product_item_productID_fkey" FOREIGN KEY ("productID") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_detail" ADD CONSTRAINT "cart_detail_cartID_fkey" FOREIGN KEY ("cartID") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_detail" ADD CONSTRAINT "cart_detail_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "product_item"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "product_item"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_report" ADD CONSTRAINT "monthly_report_year_fkey" FOREIGN KEY ("year") REFERENCES "yearly_report"("year") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_report" ADD CONSTRAINT "daily_report_month_fkey" FOREIGN KEY ("month") REFERENCES "monthly_report"("month") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_detail" ADD CONSTRAINT "import_detail_item_fkey" FOREIGN KEY ("item") REFERENCES "product_item"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_detail" ADD CONSTRAINT "import_detail_importID_fkey" FOREIGN KEY ("importID") REFERENCES "importing"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
