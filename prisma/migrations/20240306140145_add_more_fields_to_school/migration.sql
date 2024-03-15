/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageUrl` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "School" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "uniqueId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "School_uniqueId_key" ON "School"("uniqueId");
