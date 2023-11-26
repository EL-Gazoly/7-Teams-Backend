/*
  Warnings:

  - A unique constraint covering the columns `[facilityId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_facilityId_key" ON "Student"("facilityId");
