/*
  Warnings:

  - You are about to drop the `categoryBooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categoryBooks" DROP CONSTRAINT "categoryBooks_bookId_fkey";

-- DropTable
DROP TABLE "categoryBooks";

-- CreateTable
CREATE TABLE "CategoryBooks" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "CategoryBooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryBooks_bookId_key" ON "CategoryBooks"("bookId");

-- AddForeignKey
ALTER TABLE "CategoryBooks" ADD CONSTRAINT "CategoryBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
