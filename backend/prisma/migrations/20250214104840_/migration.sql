/*
  Warnings:

  - You are about to drop the column `facebook_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `google_id` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_facebook_id_key";

-- DropIndex
DROP INDEX "User_google_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "facebook_id",
DROP COLUMN "google_id";
