-- AlterTable
ALTER TABLE "Roles" ADD COLUMN     "isCertificatesAccess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isCoursesAccsess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDashboardAccess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLibraryAccess" BOOLEAN NOT NULL DEFAULT false;
