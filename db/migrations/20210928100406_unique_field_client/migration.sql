/*
  Warnings:

  - A unique constraint covering the columns `[nif]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stat]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client.nif_unique" ON "Client"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "Client.stat_unique" ON "Client"("stat");

-- CreateIndex
CREATE UNIQUE INDEX "Client.email_unique" ON "Client"("email");
