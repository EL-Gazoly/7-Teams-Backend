/*
  Warnings:

  - You are about to drop the column `categoriesID` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `SignInOUT` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `practicalTestGrade` to the `StudentExpriment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `StudentExpriment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theoreticalTestGrade` to the `StudentExpriment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SignInOUT" DROP CONSTRAINT "SignInOUT_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_categoriesID_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "categoriesID";

-- AlterTable
ALTER TABLE "StudentExpriment" ADD COLUMN     "practicalTestGrade" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "progress" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "theoreticalTestGrade" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "SignInOUT";

-- CreateTable
CREATE TABLE "SignInOut" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "signIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "signOut" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SignInOut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriesToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriesToStudent_AB_unique" ON "_CategoriesToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriesToStudent_B_index" ON "_CategoriesToStudent"("B");

-- AddForeignKey
ALTER TABLE "SignInOut" ADD CONSTRAINT "SignInOut_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToStudent" ADD CONSTRAINT "_CategoriesToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToStudent" ADD CONSTRAINT "_CategoriesToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("studentId") ON DELETE CASCADE ON UPDATE CASCADE;
