/*
  Warnings:

  - You are about to drop the column `generatedId` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminId,facilityId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Student_adminId_facilityId_generatedId_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "generatedId";

-- CreateIndex
CREATE UNIQUE INDEX "Student_adminId_facilityId_key" ON "Student"("adminId", "facilityId");
