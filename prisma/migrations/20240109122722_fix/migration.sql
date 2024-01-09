/*
  Warnings:

  - You are about to drop the column `scheduelId` on the `Song` table. All the data in the column will be lost.
  - Added the required column `scheduleId` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_scheduelId_fkey";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "scheduelId",
ADD COLUMN     "scheduleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
