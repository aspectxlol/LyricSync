-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "scheduleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
