/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Roles` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Roles_name_adminId_key";

-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "updatedAt";
