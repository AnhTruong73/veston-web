-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'PENDING';

-- CreateTable
CREATE TABLE "Sewingticket" (
    "id" SERIAL NOT NULL,
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
    "ordersId" INTEGER,

    CONSTRAINT "Sewingticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
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

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sewingticket" ADD CONSTRAINT "Sewingticket_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sewingticket" ADD CONSTRAINT "Sewingticket_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sewingticket" ADD CONSTRAINT "Sewingticket_ordersId_fkey" FOREIGN KEY ("ordersId") REFERENCES "Orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;
