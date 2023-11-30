/*
  Warnings:

  - A unique constraint covering the columns `[name,adminId]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_adminId_key" ON "Roles"("name", "adminId");
