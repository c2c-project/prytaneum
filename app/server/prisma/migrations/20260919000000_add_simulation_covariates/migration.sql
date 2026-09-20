ALTER TABLE "Event"
ADD COLUMN "simulationCovariates" TEXT[] NOT NULL DEFAULT ARRAY['gender']::TEXT[];
