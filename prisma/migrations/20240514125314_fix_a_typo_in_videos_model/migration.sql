/*
  Warnings:

  - You are about to drop the `Vidoes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Pictures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vidoes" DROP CONSTRAINT "Vidoes_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Vidoes" DROP CONSTRAINT "Vidoes_facilityId_fkey";

-- AlterTable
ALTER TABLE "Pictures" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Vidoes";

-- CreateTable
CREATE TABLE "Videos" (
    "videoId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("videoId")
);

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Student"("facilityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
