/*
  Warnings:

  - You are about to drop the column `hashedPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `contact` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mdp` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nom` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `hashedPassword`,
    DROP COLUMN `name`,
    DROP COLUMN `role`,
    ADD COLUMN `admin` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `contact` VARCHAR(191) NOT NULL,
    ADD COLUMN `mdp` VARCHAR(191) NOT NULL,
    ADD COLUMN `nom` VARCHAR(191) NOT NULL,
    ADD COLUMN `photo` VARCHAR(191) NOT NULL;
