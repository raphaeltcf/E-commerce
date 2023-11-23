/*
  Warnings:

  - You are about to drop the column `time` on the `SaleReport` table. All the data in the column will be lost.
  - Added the required column `period` to the `SaleReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleReport" DROP COLUMN "time",
ADD COLUMN     "period" JSONB NOT NULL;
