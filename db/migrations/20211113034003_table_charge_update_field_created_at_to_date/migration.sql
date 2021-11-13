/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Charge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Charge` DROP COLUMN `createdAt`,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
