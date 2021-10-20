/*
  Warnings:

  - Added the required column `nif` to the `Societe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Societe` ADD COLUMN `nif` VARCHAR(191) NOT NULL;
