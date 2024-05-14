/*
  Warnings:

  - Added the required column `key` to the `Pictures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `Vidoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pictures" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vidoes" ADD COLUMN     "key" TEXT NOT NULL;
