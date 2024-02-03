-- AlterTable
ALTER TABLE "EventLiveFeedbackPrompt" ADD COLUMN     "isMultipleChoice" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "multipleChoiceOptions" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "EventLiveFeedbackPromptResponse" ADD COLUMN     "isMultipleChoice" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "multipleChoiceResponse" TEXT NOT NULL DEFAULT '';
