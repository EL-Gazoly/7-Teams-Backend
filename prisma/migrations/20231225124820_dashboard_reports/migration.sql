/*
  Warnings:

  - The primary key for the `Expriments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ExprimentId` on the `Expriments` table. All the data in the column will be lost.
  - You are about to drop the column `chatperNumber` on the `Expriments` table. All the data in the column will be lost.
  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SignInOut` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chapterId` to the `Expriments` table without a default value. This is not possible if the table is not empty.
  - The required column `exprimentId` was added to the `Expriments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `classId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SignInOut" DROP CONSTRAINT "SignInOut_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCategories" DROP CONSTRAINT "StudentCategories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCategories" DROP CONSTRAINT "StudentCategories_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentExpriment" DROP CONSTRAINT "StudentExpriment_exprimentId_fkey";

-- AlterTable
ALTER TABLE "Expriments" DROP CONSTRAINT "Expriments_pkey",
DROP COLUMN "ExprimentId",
DROP COLUMN "chatperNumber",
ADD COLUMN     "chapterId" TEXT NOT NULL,
ADD COLUMN     "exprimentId" TEXT NOT NULL,
ADD CONSTRAINT "Expriments_pkey" PRIMARY KEY ("exprimentId");

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "classId" TEXT NOT NULL,
ADD COLUMN     "teamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentExpriment" ADD COLUMN     "enterCounter" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalTimeSpent" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Categories";

-- DropTable
DROP TABLE "SignInOut";

-- DropTable
DROP TABLE "StudentCategories";

-- CreateTable
CREATE TABLE "Teams" (
    "teamId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("teamId")
);

-- CreateTable
CREATE TABLE "Classes" (
    "classId" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("classId")
);

-- CreateTable
CREATE TABLE "Courses" (
    "courseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("courseId")
);

-- CreateTable
CREATE TABLE "Chatpers" (
    "chapterId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chatpers_pkey" PRIMARY KEY ("chapterId")
);

-- CreateTable
CREATE TABLE "certificates" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatpers" ADD CONSTRAINT "Chatpers_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expriments" ADD CONSTRAINT "Expriments_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chatpers"("chapterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentExpriment" ADD CONSTRAINT "StudentExpriment_exprimentId_fkey" FOREIGN KEY ("exprimentId") REFERENCES "Expriments"("exprimentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
