-- CreateTable
CREATE TABLE "StoreProduct" (
    "id" SERIAL NOT NULL,
    "productId" CHAR(10) NOT NULL,
    "branchId" CHAR(5) NOT NULL,
    "price" DOUBLE PRECISION,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "StoreProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StoreProduct" ADD CONSTRAINT "StoreProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreProduct" ADD CONSTRAINT "StoreProduct_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;
