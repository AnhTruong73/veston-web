-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "prepaid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrdersRequest" ADD COLUMN     "prepaid" DOUBLE PRECISION;
