-- AlterTable
ALTER TABLE "Event" DROP COLUMN "currentQuestion",
ADD COLUMN     "currentQuestion" INTEGER NOT NULL DEFAULT -1;

-- AlterTable
ALTER TABLE "EventQuestion" DROP COLUMN "position",
ADD COLUMN     "position" INTEGER NOT NULL DEFAULT -1;

