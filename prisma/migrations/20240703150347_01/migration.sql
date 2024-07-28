-- CreateEnum
CREATE TYPE "FashionCategory" AS ENUM ('VEST', 'SHIRT', 'TROUSERS', 'FABRIC_SAMPLE', 'ACCESSORIES');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPPERADMIN');

-- CreateEnum
CREATE TYPE "YesNo" AS ENUM ('Y', 'N');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('RECEPTIONIST', 'SEWINGSTAFF', 'STOREMANAGER', 'SHIPPER', 'SECURITYGUARD', 'BRANCHMANAGER', 'GENERALMANAGER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('REQUEST', 'REJECT', 'APPROVE', 'INPROCESS', 'DONE');

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "usr_email" TEXT NOT NULL,
    "usr_name" TEXT NOT NULL,
    "usrname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "del_yn" "YesNo" NOT NULL DEFAULT 'N',
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,
    "usr_id" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "area_id" CHAR(3) NOT NULL,
    "area_nm" TEXT NOT NULL,
    "branch_id" CHAR(5) NOT NULL,
    "branch_nm" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "del_yn" "YesNo" NOT NULL DEFAULT 'N',
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,
    "headoffice_yn" "YesNo" NOT NULL DEFAULT 'N',

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "branchBranch_id" CHAR(5) NOT NULL,
    "imgsrc" TEXT,
    "employee_id" TEXT NOT NULL,
    "employee_nm" TEXT NOT NULL,
    "position" "Position" NOT NULL,
    "salary" INTEGER NOT NULL,
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

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "Costcode" (
    "cost_cd" TEXT NOT NULL,
    "cost_nm" TEXT NOT NULL,
    "cost_color" TEXT NOT NULL,
    "cost_type" TEXT NOT NULL,
    "cost_uom" TEXT NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Costcode_pkey" PRIMARY KEY ("cost_cd")
);

-- CreateTable
CREATE TABLE "WarehouseDetail" (
    "cost_cd" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,
    "branch_id" CHAR(5) NOT NULL,

    CONSTRAINT "WarehouseDetail_pkey" PRIMARY KEY ("branch_id","cost_cd")
);

-- CreateTable
CREATE TABLE "GoodsInvoiceMaster" (
    "inv_id" TEXT NOT NULL,
    "branch_id" CHAR(5) NOT NULL,
    "status" "Status" NOT NULL,
    "total_amt" INTEGER NOT NULL,
    "provider_nm" TEXT NOT NULL,
    "provider_phone" TEXT NOT NULL,
    "issue_dt" TEXT NOT NULL,
    "provider_representative" TEXT NOT NULL,
    "provider_address" TEXT NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "GoodsInvoiceMaster_pkey" PRIMARY KEY ("branch_id","inv_id")
);

-- CreateTable
CREATE TABLE "GoodsInvoiceDetail" (
    "inv_id" TEXT NOT NULL,
    "branch_id" CHAR(5) NOT NULL,
    "total_amt" DOUBLE PRECISION NOT NULL,
    "cost_cd" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit_amount" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "GoodsInvoiceDetail_pkey" PRIMARY KEY ("branch_id","inv_id","cost_cd")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" CHAR(10) NOT NULL,
    "product_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "FashionCategory" NOT NULL,
    "price" DOUBLE PRECISION,
    "product_img" TEXT NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "ProductDetail" (
    "product_detail_id" CHAR(10) NOT NULL,
    "product_id" CHAR(10) NOT NULL,
    "cost_cd" TEXT NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "ProductDetail_pkey" PRIMARY KEY ("product_detail_id")
);

-- CreateTable
CREATE TABLE "Shareholder" (
    "imgsrc" TEXT,
    "shareholder_id" TEXT NOT NULL,
    "shareholder_nm" TEXT NOT NULL,
    "email" TEXT,
    "birthday" TIMESTAMP(3) NOT NULL,
    "del_yn" "YesNo" NOT NULL DEFAULT 'N',
    "gender" "Gender" NOT NULL,
    "share_value" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Shareholder_pkey" PRIMARY KEY ("shareholder_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_usr_email_key" ON "Account"("usr_email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_usrname_key" ON "Account"("usrname");

-- CreateIndex
CREATE UNIQUE INDEX "Account_usr_id_key" ON "Account"("usr_id");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_branchBranch_id_fkey" FOREIGN KEY ("branchBranch_id") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseDetail" ADD CONSTRAINT "WarehouseDetail_cost_cd_fkey" FOREIGN KEY ("cost_cd") REFERENCES "Costcode"("cost_cd") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseDetail" ADD CONSTRAINT "WarehouseDetail_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsInvoiceMaster" ADD CONSTRAINT "GoodsInvoiceMaster_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsInvoiceDetail" ADD CONSTRAINT "GoodsInvoiceDetail_branch_id_inv_id_fkey" FOREIGN KEY ("branch_id", "inv_id") REFERENCES "GoodsInvoiceMaster"("branch_id", "inv_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsInvoiceDetail" ADD CONSTRAINT "GoodsInvoiceDetail_cost_cd_fkey" FOREIGN KEY ("cost_cd") REFERENCES "Costcode"("cost_cd") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_cost_cd_fkey" FOREIGN KEY ("cost_cd") REFERENCES "Costcode"("cost_cd") ON DELETE RESTRICT ON UPDATE CASCADE;
