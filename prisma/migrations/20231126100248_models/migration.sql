-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "LockedUntil" TIMESTAMP(3) NOT NULL,
    "passwordRetryCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "deviceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "macAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("deviceId")
);

-- CreateTable
CREATE TABLE "Student" (
    "studentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "TotalTime" INTEGER NOT NULL DEFAULT 0,
    "completedCourses" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceID" TEXT NOT NULL,
    "categoriesID" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "SignInOUT" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "signIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "signOut" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SignInOUT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expriments" (
    "ExprimentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chatperNumber" INTEGER NOT NULL,

    CONSTRAINT "Expriments_pkey" PRIMARY KEY ("ExprimentId")
);

-- CreateTable
CREATE TABLE "StudentExpriment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "exprimentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentExpriment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Device_macAddress_key" ON "Device"("macAddress");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_deviceID_fkey" FOREIGN KEY ("deviceID") REFERENCES "Device"("deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_categoriesID_fkey" FOREIGN KEY ("categoriesID") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignInOUT" ADD CONSTRAINT "SignInOUT_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentExpriment" ADD CONSTRAINT "StudentExpriment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentExpriment" ADD CONSTRAINT "StudentExpriment_exprimentId_fkey" FOREIGN KEY ("exprimentId") REFERENCES "Expriments"("ExprimentId") ON DELETE RESTRICT ON UPDATE CASCADE;
