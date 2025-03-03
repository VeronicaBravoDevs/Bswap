-- CreateTable
CREATE TABLE "categoryBooks" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "categoryBooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categoryBooks_bookId_key" ON "categoryBooks"("bookId");

-- AddForeignKey
ALTER TABLE "categoryBooks" ADD CONSTRAINT "categoryBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
