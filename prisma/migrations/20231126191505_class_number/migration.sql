/*
  Warnings:

  - Added the required column `classNumber` to the `StudentCategories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentCategories" ADD COLUMN     "classNumber" INTEGER NOT NULL;
