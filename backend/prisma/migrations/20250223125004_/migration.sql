/*
  Warnings:

  - You are about to drop the column `image` on the `Book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_userId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
