-- CreateTable
CREATE TABLE "Feedbacks" (
    "customer_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "rate" INTEGER,
    "content" TEXT,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Feedbacks_pkey" PRIMARY KEY ("customer_id","product_id")
);

-- AddForeignKey
ALTER TABLE "Feedbacks" ADD CONSTRAINT "Feedbacks_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedbacks" ADD CONSTRAINT "Feedbacks_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
