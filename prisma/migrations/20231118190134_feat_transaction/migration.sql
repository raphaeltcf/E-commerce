-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "cardType" TEXT NOT NULL,
    "expiryMonth" INTEGER NOT NULL,
    "expiryYear" INTEGER NOT NULL,
    "cvv" INTEGER NOT NULL,
    "amount" DECIMAL(9,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);
