/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Airline` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Airline` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TailNumber` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TailNumber` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Airline" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Airport" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "TailNumber" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
