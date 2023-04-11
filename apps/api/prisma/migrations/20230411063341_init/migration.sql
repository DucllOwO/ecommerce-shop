-- CreateTable
CREATE TABLE "Account" (
    "email" VARCHAR(256) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "User" (
    "id" CHAR(12) NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50),
    "phone_number" CHAR(10),
    "address" VARCHAR(150),
    "avatar" TEXT NOT NULL DEFAULT 'https://lggcxbdwmetbsvmtuctl.supabase.co/storage/v1/object/public/avatar/default.png',
    "product_viewed" TEXT[],
    "email" VARCHAR(256) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "rate" DOUBLE PRECISION NOT NULL,
    "authorID" CHAR(12),

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discount" (
    "id" SERIAL NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "discountID" INTEGER,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "discountID" INTEGER,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "image" TEXT[],
    "view" INTEGER NOT NULL DEFAULT 0,
    "sold" INTEGER NOT NULL DEFAULT 0,
    "discountID" INTEGER,
    "tagID" INTEGER NOT NULL,
    "collectionID" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "code" CHAR(6) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT,
    "due" DATE NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "status" CHAR(1) NOT NULL DEFAULT '0',
    "voucherCode" CHAR(6),

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceiptDetail" (
    "id" SERIAL NOT NULL,
    "receiptID" INTEGER NOT NULL,
    "productID" INTEGER NOT NULL,

    CONSTRAINT "ReceiptDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "comment" TEXT,
    "rate" DOUBLE PRECISION NOT NULL,
    "authorID" CHAR(12) NOT NULL,
    "productID" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_item" (
    "id" SERIAL NOT NULL,
    "color" VARCHAR(100) NOT NULL,
    "size" CHAR(4) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "image" TEXT[],
    "productID" INTEGER NOT NULL,

    CONSTRAINT "Product_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "userID" CHAR(12) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart_detail" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "cartID" INTEGER NOT NULL,
    "itemID" INTEGER NOT NULL,

    CONSTRAINT "Cart_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_cost" INTEGER NOT NULL DEFAULT 0,
    "status" CHAR(1) NOT NULL DEFAULT '0',
    "userID" CHAR(12) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_detail" (
    "id" SERIAL NOT NULL,
    "itemID" INTEGER NOT NULL,
    "orderID" INTEGER NOT NULL,

    CONSTRAINT "Order_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Yearly_report" (
    "year" DATE NOT NULL,
    "income" INTEGER NOT NULL DEFAULT 0,
    "sold_quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Yearly_report_pkey" PRIMARY KEY ("year")
);

-- CreateTable
CREATE TABLE "Monthly_report" (
    "month" DATE NOT NULL,
    "income" INTEGER NOT NULL DEFAULT 0,
    "sold_quantity" INTEGER NOT NULL DEFAULT 0,
    "year" DATE NOT NULL,

    CONSTRAINT "Monthly_report_pkey" PRIMARY KEY ("month")
);

-- CreateTable
CREATE TABLE "Daily_report" (
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "income" INTEGER NOT NULL DEFAULT 0,
    "sold_quantity" INTEGER NOT NULL DEFAULT 0,
    "month" DATE NOT NULL,

    CONSTRAINT "Daily_report_pkey" PRIMARY KEY ("date")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_email_fkey" FOREIGN KEY ("email") REFERENCES "Account"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

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
