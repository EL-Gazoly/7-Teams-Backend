/*
  Warnings:

  - A unique constraint covering the columns `[facilityId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Pictures" (
    "pictureId" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "Pictures_pkey" PRIMARY KEY ("pictureId")
);

-- CreateTable
CREATE TABLE "Vidoes" (
    "videoId" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "Vidoes_pkey" PRIMARY KEY ("videoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_facilityId_key" ON "Student"("facilityId");

-- AddForeignKey
ALTER TABLE "Pictures" ADD CONSTRAINT "Pictures_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Student"("facilityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pictures" ADD CONSTRAINT "Pictures_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vidoes" ADD CONSTRAINT "Vidoes_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Student"("facilityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vidoes" ADD CONSTRAINT "Vidoes_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
