/*
  Warnings:

  - Added the required column `arriveTime` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departTime` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "arriveTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "departTime" TIMESTAMP(3) NOT NULL;
