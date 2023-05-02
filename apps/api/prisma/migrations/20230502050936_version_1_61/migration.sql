/*
  Warnings:

  - You are about to drop the `ImportDetai` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImportDetai" DROP CONSTRAINT "ImportDetai_importID_fkey";

-- DropForeignKey
ALTER TABLE "ImportDetai" DROP CONSTRAINT "ImportDetai_item_fkey";

-- DropTable
DROP TABLE "ImportDetai";

-- CreateTable
CREATE TABLE "ImportDetail" (
    "id" SERIAL NOT NULL,
    "item" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL DEFAULT 0,
    "importID" INTEGER NOT NULL,
    "total_cost" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ImportDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImportDetail" ADD CONSTRAINT "ImportDetail_item_fkey" FOREIGN KEY ("item") REFERENCES "Product_item"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportDetail" ADD CONSTRAINT "ImportDetail_importID_fkey" FOREIGN KEY ("importID") REFERENCES "Import"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
