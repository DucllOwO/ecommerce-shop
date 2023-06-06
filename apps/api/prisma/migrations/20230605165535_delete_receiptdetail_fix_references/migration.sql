/*
  Warnings:

  - You are about to drop the `receipt_detail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstname` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderID` to the `receipt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "receipt_detail" DROP CONSTRAINT "receipt_detail_productID_fkey";

-- DropForeignKey
ALTER TABLE "receipt_detail" DROP CONSTRAINT "receipt_detail_receiptID_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "address" VARCHAR(150),
ADD COLUMN     "firstname" VARCHAR(50) NOT NULL,
ADD COLUMN     "lastname" VARCHAR(50),
ADD COLUMN     "phone_number" CHAR(10);

-- AlterTable
ALTER TABLE "receipt" ADD COLUMN     "orderID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "receipt_detail";

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
