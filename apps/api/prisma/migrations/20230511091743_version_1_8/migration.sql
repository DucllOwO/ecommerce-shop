/*
  Warnings:

  - You are about to drop the column `tagID` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_tagID_fkey";

-- AlterTable
ALTER TABLE "discount" ADD COLUMN     "name" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "product" DROP COLUMN "tagID";

-- CreateTable
CREATE TABLE "have_tag" (
    "id" SERIAL NOT NULL,
    "tagID" INTEGER NOT NULL,
    "productID" INTEGER NOT NULL,

    CONSTRAINT "have_tag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "have_tag" ADD CONSTRAINT "have_tag_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "have_tag" ADD CONSTRAINT "have_tag_productID_fkey" FOREIGN KEY ("productID") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
