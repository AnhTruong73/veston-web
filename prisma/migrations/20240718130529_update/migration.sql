/*
  Warnings:

  - Added the required column `prepaid` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'BRANCHMANAGER';
ALTER TYPE "Role" ADD VALUE 'STOREMANAGER';
ALTER TYPE "Role" ADD VALUE 'RECEPTIONIST';
ALTER TYPE "Role" ADD VALUE 'SHAREHOLDER';

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "prepaid" DOUBLE PRECISION NOT NULL;
