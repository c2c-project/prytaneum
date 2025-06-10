-- CreateTable
CREATE TABLE "FeedbackFlow" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500),
    "isDraft" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FeedbackFlow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackFlowPrompt" (
    "id" UUID NOT NULL,
    "feedbackFlowId" UUID NOT NULL,
    "promptId" UUID NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "FeedbackFlowPrompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FeedbackFlowPrompt_promptId_idx" ON "FeedbackFlowPrompt"("promptId");

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackFlowPrompt_feedbackFlowId_order_key" ON "FeedbackFlowPrompt"("feedbackFlowId", "order");

-- AddForeignKey
ALTER TABLE "FeedbackFlow" ADD CONSTRAINT "FeedbackFlow_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackFlowPrompt" ADD CONSTRAINT "FeedbackFlowPrompt_feedbackFlowId_fkey" FOREIGN KEY ("feedbackFlowId") REFERENCES "FeedbackFlow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackFlowPrompt" ADD CONSTRAINT "FeedbackFlowPrompt_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "EventLiveFeedbackPrompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
