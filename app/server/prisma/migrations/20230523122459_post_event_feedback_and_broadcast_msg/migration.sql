-- CreateTable
CREATE TABLE "PostEventFeedback" (
    "id" UUID NOT NULL,
    "createdById" UUID,
    "eventId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feedback" VARCHAR(500) NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PostEventFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventBroadcastMessage" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" UUID NOT NULL,
    "broadcastMessage" VARCHAR(500) NOT NULL,
    "isVisible" BOOLEAN NOT NULL,
    "lang" VARCHAR(30) NOT NULL,

    CONSTRAINT "EventBroadcastMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostEventFeedback" ADD CONSTRAINT "PostEventFeedback_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostEventFeedback" ADD CONSTRAINT "PostEventFeedback_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBroadcastMessage" ADD CONSTRAINT "EventBroadcastMessage_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBroadcastMessage" ADD CONSTRAINT "EventBroadcastMessage_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
