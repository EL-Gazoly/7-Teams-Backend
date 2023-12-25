/*
  Warnings:

  - Added the required column `adminId` to the `Teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teams" ADD COLUMN     "adminId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
