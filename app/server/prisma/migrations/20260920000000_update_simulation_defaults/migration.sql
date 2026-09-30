ALTER TABLE "Event"
ALTER COLUMN "simulationParticipantCount" SET DEFAULT 3,
ALTER COLUMN "simulationCovariates" SET DEFAULT ARRAY['gender', 'education', 'politics']::TEXT[];
