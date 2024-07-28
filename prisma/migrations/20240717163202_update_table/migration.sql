/*
  Warnings:

  - The primary key for the `Orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cccd` on the `Orders` table. All the data in the column will be lost.
  - The primary key for the `ProductDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cost_cd` on the `ProductDetail` table. All the data in the column will be lost.
  - The primary key for the `Sewingticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ordersId` on the `Sewingticket` table. All the data in the column will be lost.
  - The primary key for the `StoreProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `customerId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Sewingticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sewingTicketId` to the `Sewingticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductDetail" DROP CONSTRAINT "ProductDetail_cost_cd_fkey";

-- DropForeignKey
ALTER TABLE "Sewingticket" DROP CONSTRAINT "Sewingticket_ordersId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_pkey",
DROP COLUMN "cccd",
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD CONSTRAINT "Orders_pkey" PRIMARY KEY ("orderId");

-- AlterTable
ALTER TABLE "ProductDetail" DROP CONSTRAINT "ProductDetail_pkey",
DROP COLUMN "cost_cd",
ADD CONSTRAINT "ProductDetail_pkey" PRIMARY KEY ("product_id", "product_detail_id");

-- AlterTable
ALTER TABLE "Sewingticket" DROP CONSTRAINT "Sewingticket_pkey",
DROP COLUMN "ordersId",
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "sewingTicketId" TEXT NOT NULL,
ADD CONSTRAINT "Sewingticket_pkey" PRIMARY KEY ("orderId", "sewingTicketId");

-- AlterTable
ALTER TABLE "StoreProduct" DROP CONSTRAINT "StoreProduct_pkey",
ADD CONSTRAINT "StoreProduct_pkey" PRIMARY KEY ("productId", "branchId");

-- CreateTable
CREATE TABLE "SewingticketRequest" (
    "id" SERIAL NOT NULL,
    "sewingTicketId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "bust" DOUBLE PRECISION NOT NULL,
    "waist" DOUBLE PRECISION NOT NULL,
    "hips" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "productId" CHAR(10) NOT NULL,
    "branchId" CHAR(5) NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "SewingticketRequest_pkey" PRIMARY KEY ("orderId","sewingTicketId")
);

-- CreateTable
CREATE TABLE "OrdersRequest" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "customerId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "shippingMethod" TEXT NOT NULL,
    "est_delivery" TEXT,
    "actual_delivery" TEXT,
    "branchId" CHAR(5) NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "OrdersRequest_pkey" PRIMARY KEY ("orderId")
);

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_product_detail_id_fkey" FOREIGN KEY ("product_detail_id") REFERENCES "Costcode"("cost_cd") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sewingticket" ADD CONSTRAINT "Sewingticket_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SewingticketRequest" ADD CONSTRAINT "SewingticketRequest_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SewingticketRequest" ADD CONSTRAINT "SewingticketRequest_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SewingticketRequest" ADD CONSTRAINT "SewingticketRequest_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "OrdersRequest"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersRequest" ADD CONSTRAINT "OrdersRequest_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersRequest" ADD CONSTRAINT "OrdersRequest_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
