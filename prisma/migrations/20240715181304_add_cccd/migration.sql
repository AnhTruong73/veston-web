/*
  Warnings:

  - Added the required column `cccd` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "cccd" TEXT NOT NULL;
