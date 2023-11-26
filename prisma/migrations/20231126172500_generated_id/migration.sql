/*
  Warnings:

  - A unique constraint covering the columns `[generatedId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "generatedId" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Student_generatedId_key" ON "Student"("generatedId");
