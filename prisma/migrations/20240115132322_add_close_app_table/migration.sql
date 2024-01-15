-- CreateTable
CREATE TABLE "CloseApp" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CloseApp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CloseApp" ADD CONSTRAINT "CloseApp_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CloseApp" ADD CONSTRAINT "CloseApp_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
