-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(320) NOT NULL,
    "firstName" VARCHAR(100),
    "lastName" VARCHAR(100),
    "fullName" VARCHAR(200),
    "password" TEXT,
    "preferredLang" VARCHAR(30) NOT NULL,
    "canMakeOrgs" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "userId" UUID NOT NULL,
    "currentEmail" TEXT NOT NULL,
    "updateEmail" TEXT NOT NULL,
    "updatePassword" TEXT NOT NULL,
    "deleteAccount" BOOLEAN NOT NULL DEFAULT false,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "isNotificationsEnabled" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(100) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgMember" (
    "userId" UUID NOT NULL,
    "orgId" UUID NOT NULL,

    PRIMARY KEY ("userId","orgId")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL,
    "createdById" UUID NOT NULL,
    "orgId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "topic" VARCHAR(50) NOT NULL,
    "currentQuestion" INTEGER NOT NULL DEFAULT -1,
    "isActive" BOOLEAN NOT NULL,
    "isQuestionFeedVisible" BOOLEAN NOT NULL,
    "isCollectRatingsEnabled" BOOLEAN NOT NULL,
    "isForumEnabled" BOOLEAN NOT NULL,
    "isPrivate" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventVideo" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "lang" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventLiveFeedback" (
    "id" UUID NOT NULL,
    "createdById" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" VARCHAR(500) NOT NULL,
    "isReply" BOOLEAN NOT NULL DEFAULT false,
    "refFeedbackId" UUID,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventQuestion" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refQuestionId" UUID,
    "createdById" UUID NOT NULL,
    "question" VARCHAR(500) NOT NULL,
    "position" INTEGER NOT NULL DEFAULT -1,
    "isVisible" BOOLEAN NOT NULL,
    "isAsked" BOOLEAN NOT NULL,
    "lang" VARCHAR(30) NOT NULL,
    "isFollowUp" BOOLEAN NOT NULL,
    "isQuote" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventQuestionLike" (
    "likedQuestion" UUID NOT NULL,
    "likedBy" UUID NOT NULL,

    PRIMARY KEY ("likedBy","likedQuestion")
);

-- CreateTable
CREATE TABLE "EventModerator" (
    "eventId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    PRIMARY KEY ("eventId","userId")
);

-- CreateTable
CREATE TABLE "EventInvited" (
    "eventId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    PRIMARY KEY ("eventId","userId")
);

-- CreateTable
CREATE TABLE "EventSpeaker" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "pictureUrl" VARCHAR(200) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRegistrant" (
    "userId" UUID NOT NULL,
    "eventId" UUID NOT NULL,

    PRIMARY KEY ("userId","eventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgMember" ADD FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgMember" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY ("createdById", "orgId") REFERENCES "OrgMember"("userId", "orgId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventVideo" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLiveFeedback" ADD FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLiveFeedback" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLiveFeedback" ADD FOREIGN KEY ("refFeedbackId") REFERENCES "EventLiveFeedback"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventQuestion" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventQuestion" ADD FOREIGN KEY ("refQuestionId") REFERENCES "EventQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventQuestion" ADD FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventQuestionLike" ADD FOREIGN KEY ("likedQuestion") REFERENCES "EventQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventQuestionLike" ADD FOREIGN KEY ("likedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventModerator" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventModerator" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventInvited" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventInvited" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSpeaker" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSpeaker" ADD FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRegistrant" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRegistrant" ADD FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
