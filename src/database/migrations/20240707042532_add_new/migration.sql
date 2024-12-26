/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marialStatus` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SEX" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "marialStatus" TEXT NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "sex" "SEX" NOT NULL DEFAULT 'OTHER';

-- CreateTable
CREATE TABLE "Flight" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "returningAt" TIMESTAMP(3) NOT NULL,
    "leavingAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "passengerSize" INTEGER NOT NULL DEFAULT 1,
    "country" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "promoCode" TEXT,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FlightToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FlightToUser_AB_unique" ON "_FlightToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FlightToUser_B_index" ON "_FlightToUser"("B");

-- AddForeignKey
ALTER TABLE "_FlightToUser" ADD CONSTRAINT "_FlightToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Flight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FlightToUser" ADD CONSTRAINT "_FlightToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
