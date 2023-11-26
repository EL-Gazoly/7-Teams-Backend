/*
  Warnings:

  - You are about to drop the `_CategoriesToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoriesToStudent" DROP CONSTRAINT "_CategoriesToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriesToStudent" DROP CONSTRAINT "_CategoriesToStudent_B_fkey";

-- DropTable
DROP TABLE "_CategoriesToStudent";

-- CreateTable
CREATE TABLE "StudentCategories" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentCategories_pkey" PRIMARY KEY ("id")
);
