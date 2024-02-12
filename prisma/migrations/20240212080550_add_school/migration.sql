/*
  Warnings:

  - The primary key for the `School` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `School` table. All the data in the column will be lost.
  - The required column `schoolId` was added to the `School` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Teams" DROP CONSTRAINT "Teams_schoolId_fkey";

-- AlterTable
ALTER TABLE "School" DROP CONSTRAINT "School_pkey",
DROP COLUMN "id",
ADD COLUMN     "schoolId" TEXT NOT NULL,
ADD CONSTRAINT "School_pkey" PRIMARY KEY ("schoolId");

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("schoolId") ON DELETE RESTRICT ON UPDATE CASCADE;
