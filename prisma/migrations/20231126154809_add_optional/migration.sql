/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_deviceID_fkey";

-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "studentId" TEXT;

-- AlterTable
ALTER TABLE "SignInOut" ALTER COLUMN "signOut" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "deviceID" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StudentExpriment" ALTER COLUMN "practicalTestGrade" SET DEFAULT 0.0,
ALTER COLUMN "progress" SET DEFAULT 0.0,
ALTER COLUMN "theoreticalTestGrade" SET DEFAULT 0.0;

-- CreateIndex
CREATE UNIQUE INDEX "Device_studentId_key" ON "Device"("studentId");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE SET NULL ON UPDATE CASCADE;
