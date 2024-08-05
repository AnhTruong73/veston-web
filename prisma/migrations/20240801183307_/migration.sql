/*
  Warnings:

  - The values [STOREMANAGER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Costcode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Costcode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('SUPPERADMIN', 'BRANCHMANAGER', 'RECEPTIONIST', 'SHAREHOLDER');
ALTER TABLE "Account" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "GoodsInvoiceDetail" DROP CONSTRAINT "GoodsInvoiceDetail_cost_cd_fkey";

-- DropForeignKey
ALTER TABLE "ProductDetail" DROP CONSTRAINT "ProductDetail_product_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "WarehouseDetail" DROP CONSTRAINT "WarehouseDetail_cost_cd_fkey";

-- AlterTable
ALTER TABLE "Costcode" DROP CONSTRAINT "Costcode_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Costcode_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WarehouseDetail" ADD CONSTRAINT "WarehouseDetail_cost_cd_fkey" FOREIGN KEY ("cost_cd") REFERENCES "Costcode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsInvoiceDetail" ADD CONSTRAINT "GoodsInvoiceDetail_cost_cd_fkey" FOREIGN KEY ("cost_cd") REFERENCES "Costcode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_product_detail_id_fkey" FOREIGN KEY ("product_detail_id") REFERENCES "Costcode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
