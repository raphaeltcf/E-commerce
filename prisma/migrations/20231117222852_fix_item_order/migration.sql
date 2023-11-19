/*
  Warnings:

  - Added the required column `price` to the `ItemOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ItemOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `ItemOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemOrder" ADD COLUMN     "price" DECIMAL(9,2) NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "subtotal" DECIMAL(9,2) NOT NULL;
