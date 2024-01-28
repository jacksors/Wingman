-- CreateTable
CREATE TABLE "Itenerary" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Itenerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FlightToItenerary" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FlightToItenerary_AB_unique" ON "_FlightToItenerary"("A", "B");

-- CreateIndex
CREATE INDEX "_FlightToItenerary_B_index" ON "_FlightToItenerary"("B");

-- AddForeignKey
ALTER TABLE "Itenerary" ADD CONSTRAINT "Itenerary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FlightToItenerary" ADD CONSTRAINT "_FlightToItenerary_A_fkey" FOREIGN KEY ("A") REFERENCES "Flight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FlightToItenerary" ADD CONSTRAINT "_FlightToItenerary_B_fkey" FOREIGN KEY ("B") REFERENCES "Itenerary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
