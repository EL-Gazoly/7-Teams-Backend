/*
  Warnings:

  - You are about to drop the column `deviceID` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deviceId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_studentId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "deviceID",
ADD COLUMN     "deviceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_deviceId_key" ON "Student"("deviceId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("deviceId") ON DELETE SET NULL ON UPDATE CASCADE;
