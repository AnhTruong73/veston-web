/*
  Warnings:

  - The primary key for the `ProductDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ProductDetail" DROP CONSTRAINT "ProductDetail_product_detail_id_fkey";

-- AlterTable
ALTER TABLE "ProductDetail" DROP CONSTRAINT "ProductDetail_pkey",
ALTER COLUMN "product_detail_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductDetail_pkey" PRIMARY KEY ("product_id", "product_detail_id");

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_product_detail_id_fkey" FOREIGN KEY ("product_detail_id") REFERENCES "Costcode"("cost_cd") ON DELETE RESTRICT ON UPDATE CASCADE;
