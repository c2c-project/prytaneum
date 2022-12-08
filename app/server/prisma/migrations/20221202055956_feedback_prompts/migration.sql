-- CreateEnum
CREATE TYPE "Vote" AS ENUM ('FOR', 'AGAINST', 'CONFLICTED');

-- CreateTable
CREATE TABLE "EventLiveFeedbackPrompt" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prompt" VARCHAR(500) NOT NULL,
    "isVote" BOOLEAN NOT NULL DEFAULT false,
    "isOpenEnded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EventLiveFeedbackPrompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventLiveFeedbackPromptResponse" (
    "id" UUID NOT NULL,
    "promptId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVote" BOOLEAN NOT NULL DEFAULT false,
    "vote" "Vote" NOT NULL DEFAULT 'CONFLICTED',
    "isOpenEnded" BOOLEAN NOT NULL DEFAULT false,
    "response" VARCHAR(500) NOT NULL,
    "createdById" UUID NOT NULL,

    CONSTRAINT "EventLiveFeedbackPromptResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventLiveFeedbackPrompt" ADD CONSTRAINT "EventLiveFeedbackPrompt_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLiveFeedbackPromptResponse" ADD CONSTRAINT "EventLiveFeedbackPromptResponse_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "EventLiveFeedbackPrompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLiveFeedbackPromptResponse" ADD CONSTRAINT "EventLiveFeedbackPromptResponse_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
