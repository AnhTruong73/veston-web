/*
  Warnings:

  - The values [FABRIC_SAMPLE,ACCESSORIES] on the enum `FashionCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FashionCategory_new" AS ENUM ('VEST', 'SHIRT', 'TROUSERS', 'BLAZER', 'GILE');
ALTER TABLE "Product" ALTER COLUMN "category" TYPE "FashionCategory_new" USING ("category"::text::"FashionCategory_new");
ALTER TYPE "FashionCategory" RENAME TO "FashionCategory_old";
ALTER TYPE "FashionCategory_new" RENAME TO "FashionCategory";
DROP TYPE "FashionCategory_old";
COMMIT;
