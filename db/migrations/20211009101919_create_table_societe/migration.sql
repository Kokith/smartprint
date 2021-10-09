/*
  Warnings:

  - Added the required column `societeId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `societeId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `societe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gerant` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `banque` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `signature` VARCHAR(191),
    `rcs` VARCHAR(191) NOT NULL,
    `stat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD FOREIGN KEY (`societeId`) REFERENCES `societe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
