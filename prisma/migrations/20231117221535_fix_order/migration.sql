/*
  Warnings:

  - You are about to drop the column `description` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `stockQuantity` on the `Order` table. All the data in the column will be lost.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('RECEBIDO', 'PREPARO', 'DESPACHADO', 'ENTREGUE');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "description",
DROP COLUMN "price",
DROP COLUMN "stockQuantity",
ADD COLUMN     "status" "STATUS" NOT NULL;
