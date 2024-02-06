/*
  Warnings:

  - The primary key for the `Logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Logs` table. All the data in the column will be lost.
  - The required column `logId` was added to the `Logs` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Logs" DROP CONSTRAINT "Logs_pkey",
DROP COLUMN "id",
ADD COLUMN     "logId" TEXT NOT NULL,
ADD CONSTRAINT "Logs_pkey" PRIMARY KEY ("logId");
