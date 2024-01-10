/*
  Warnings:

  - A unique constraint covering the columns `[adminId,facilityId,generatedId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Student_facilityId_key";

-- DropIndex
DROP INDEX "Student_generatedId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Student_adminId_facilityId_generatedId_key" ON "Student"("adminId", "facilityId", "generatedId");
