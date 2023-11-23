/*
  Warnings:

  - The values [AGUARDANDO] on the enum `STATUS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "STATUS_new" AS ENUM ('RECEBIDO', 'PREPARO', 'DESPACHADO', 'ENTREGUE');
ALTER TABLE "Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "STATUS_new" USING ("status"::text::"STATUS_new");
ALTER TYPE "STATUS" RENAME TO "STATUS_old";
ALTER TYPE "STATUS_new" RENAME TO "STATUS";
DROP TYPE "STATUS_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'RECEBIDO';
COMMIT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'RECEBIDO';
