ALTER TABLE "Event"
ADD COLUMN "simulationEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "simulationParticipantCount" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN "simulationTopic" TEXT NOT NULL DEFAULT '',
ADD COLUMN "simulationBackground" TEXT NOT NULL DEFAULT '';
