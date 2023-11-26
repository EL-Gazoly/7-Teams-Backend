-- AddForeignKey
ALTER TABLE "StudentCategories" ADD CONSTRAINT "StudentCategories_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCategories" ADD CONSTRAINT "StudentCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
