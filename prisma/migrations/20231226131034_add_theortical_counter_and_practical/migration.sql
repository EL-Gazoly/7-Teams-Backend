/*
  Warnings:

  - You are about to drop the column `enterCounter` on the `StudentExpriment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentExpriment" DROP COLUMN "enterCounter",
ADD COLUMN     "enterPratical" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "enterTheortical" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "enterTraining" INTEGER NOT NULL DEFAULT 0;
