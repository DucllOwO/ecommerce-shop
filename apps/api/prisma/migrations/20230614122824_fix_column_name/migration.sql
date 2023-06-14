/*
  Warnings:

  - You are about to drop the column `itemID` on the `order_detail` table. All the data in the column will be lost.
  - You are about to drop the column `productID` on the `product_item` table. All the data in the column will be lost.
  - Added the required column `item_id` to the `order_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_detail" DROP CONSTRAINT "order_detail_itemID_fkey";

-- DropForeignKey
ALTER TABLE "product_item" DROP CONSTRAINT "product_item_productID_fkey";

-- AlterTable
ALTER TABLE "order_detail" DROP COLUMN "itemID",
ADD COLUMN     "item_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "product_item" DROP COLUMN "productID",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "product_item" ADD CONSTRAINT "product_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "product_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
