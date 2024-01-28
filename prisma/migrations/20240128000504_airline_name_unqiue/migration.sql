/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Airline` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Airline_name_key" ON "Airline"("name");
