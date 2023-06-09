/*
  Warnings:

  - You are about to drop the `cart_detail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemID` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_userID_fkey";

-- DropForeignKey
ALTER TABLE "cart_detail" DROP CONSTRAINT "cart_detail_cartID_fkey";

-- DropForeignKey
ALTER TABLE "cart_detail" DROP CONSTRAINT "cart_detail_itemID_fkey";

-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "itemID" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "cart_detail";

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "product_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
