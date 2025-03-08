-- AlterTable
ALTER TABLE "Exchange" ADD COLUMN     "owner_id" TEXT NOT NULL DEFAULT '1',
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
