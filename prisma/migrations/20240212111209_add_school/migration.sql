/*
  Warnings:

  - You are about to drop the column `schoolId` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_schoolId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "schoolId";
