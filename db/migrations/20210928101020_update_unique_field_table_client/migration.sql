/*
  Warnings:

  - A unique constraint covering the columns `[nom]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Client.email_unique";

-- DropIndex
DROP INDEX "Client.stat_unique";

-- DropIndex
DROP INDEX "Client.nif_unique";

-- CreateIndex
CREATE UNIQUE INDEX "Client.nom_unique" ON "Client"("nom");
