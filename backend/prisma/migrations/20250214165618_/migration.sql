/*
  Warnings:

  - You are about to drop the `Library` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_libraryId_fkey";

-- DropForeignKey
ALTER TABLE "Library" DROP CONSTRAINT "Library_userId_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "Library";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
