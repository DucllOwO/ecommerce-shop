/*
  Warnings:

  - The `authorID` column on the `feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `userID` on the `cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userID` on the `order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userID` on the `receipt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `authorID` on the `review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_userID_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_authorID_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_userID_fkey";

-- DropForeignKey
ALTER TABLE "receipt" DROP CONSTRAINT "receipt_userID_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_authorID_fkey";

-- AlterTable
ALTER TABLE "cart" DROP COLUMN "userID",
ADD COLUMN     "userID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "feedback" DROP COLUMN "authorID",
ADD COLUMN     "authorID" INTEGER;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "userID",
ADD COLUMN     "userID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "receipt" DROP COLUMN "userID",
ADD COLUMN     "userID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "review" DROP COLUMN "authorID",
ADD COLUMN     "authorID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
