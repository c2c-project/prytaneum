-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "currentQuestion" SET DEFAULT '-1',
ALTER COLUMN "currentQuestion" SET DATA TYPE VARCHAR(14);

-- AlterTable
ALTER TABLE "EventQuestion" ALTER COLUMN "position" SET DEFAULT '-1',
ALTER COLUMN "position" SET DATA TYPE VARCHAR(14);
