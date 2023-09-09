/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" VARCHAR(255) NOT NULL DEFAULT 'first',
ADD COLUMN     "lastName" VARCHAR(255) NOT NULL DEFAULT 'last',
ADD COLUMN     "studentId" VARCHAR(255) NOT NULL DEFAULT '';
