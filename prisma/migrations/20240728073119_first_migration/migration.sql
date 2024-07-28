-- CreateEnum
CREATE TYPE "FashionCategory" AS ENUM ('VEST', 'SHIRT', 'TROUSERS', 'BLAZER', 'GILE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPPERADMIN', 'BRANCHMANAGER', 'STOREMANAGER', 'RECEPTIONIST', 'SHAREHOLDER');

-- CreateEnum
CREATE TYPE "YesNo" AS ENUM ('Y', 'N');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('RECEPTIONIST', 'SEWINGSTAFF', 'STOREMANAGER', 'SHIPPER', 'SECURITYGUARD', 'BRANCHMANAGER', 'GENERALMANAGER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'REQUEST', 'REJECT', 'APPROVE', 'INPROCESS', 'DONE');

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
CREATE TABLE "StoreProduct" (
    "id" SERIAL NOT NULL,
    "productId" CHAR(10) NOT NULL,
    "branchId" CHAR(5) NOT NULL,
    "price" DOUBLE PRECISION,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "StoreProduct_pkey" PRIMARY KEY ("productId","branchId")
);

-- CreateTable
CREATE TABLE "ProductDetail" (
    "product_id" CHAR(10) NOT NULL,
    "product_detail_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "ProductDetail_pkey" PRIMARY KEY ("product_id","product_detail_id")
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

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sewingticket" (
    "id" SERIAL NOT NULL,
    "sewingTicketId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "bust" DOUBLE PRECISION NOT NULL,
    "waist" DOUBLE PRECISION NOT NULL,
    "hips" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER DEFAULT 1,
    "status" "Status" NOT NULL,
    "productId" CHAR(10) NOT NULL,
    "branchId" CHAR(5) NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Sewingticket_pkey" PRIMARY KEY ("orderId","sewingTicketId")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "customerId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "prepaid" DOUBLE PRECISION,
    "shippingMethod" TEXT NOT NULL,
    "est_delivery" TEXT,
    "actual_delivery" TEXT,
    "branchId" CHAR(5) NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "SewingticketRequest" (
    "id" SERIAL NOT NULL,
    "sewingTicketId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "bust" DOUBLE PRECISION NOT NULL,
    "waist" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER DEFAULT 1,
    "hips" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL,
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
    "prepaid" DOUBLE PRECISION,
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

-- CreateTable
CREATE TABLE "CustomerAccount" (
    "customer_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cre_usr_id" CHAR(10) NOT NULL,
    "cre_dt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upd_usr_id" CHAR(10) NOT NULL,
    "upd_dt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "CustomerAccount_pkey" PRIMARY KEY ("customer_id")
);

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
ALTER TABLE "StoreProduct" ADD CONSTRAINT "StoreProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreProduct" ADD CONSTRAINT "StoreProduct_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_product_detail_id_fkey" FOREIGN KEY ("product_detail_id") REFERENCES "Costcode"("cost_cd") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sewingticket" ADD CONSTRAINT "Sewingticket_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sewingticket" ADD CONSTRAINT "Sewingticket_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sewingticket" ADD CONSTRAINT "Sewingticket_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "CustomerAccount" ADD CONSTRAINT "CustomerAccount_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedbacks" ADD CONSTRAINT "Feedbacks_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedbacks" ADD CONSTRAINT "Feedbacks_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
