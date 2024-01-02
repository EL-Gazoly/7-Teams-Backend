/*
  Warnings:

  - You are about to drop the column `totalTimeSpent` on the `StudentExpriment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentExpriment" DROP COLUMN "totalTimeSpent",
ADD COLUMN     "totalPraticalTime" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalTheorticalTime" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalTrainingTime" INTEGER NOT NULL DEFAULT 0;
