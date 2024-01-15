/*
  Warnings:

  - The primary key for the `CloseApp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CloseApp` table. All the data in the column will be lost.
  - The required column `closeAppId` was added to the `CloseApp` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "CloseApp" DROP CONSTRAINT "CloseApp_pkey",
DROP COLUMN "id",
ADD COLUMN     "closeAppId" TEXT NOT NULL,
ADD CONSTRAINT "CloseApp_pkey" PRIMARY KEY ("closeAppId");
