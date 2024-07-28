-- CreateTable
CREATE TABLE "Customer" (
    "customer_id" TEXT NOT NULL,
    "customer_nm" TEXT NOT NULL,
    "email" TEXT,
    "birthday" TIMESTAMP(3) NOT NULL,
    "del_yn" "YesNo" NOT NULL DEFAULT 'N',
    "gender" "Gender" NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_id")
);
