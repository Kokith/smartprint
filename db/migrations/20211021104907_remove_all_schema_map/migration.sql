/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Token` DROP FOREIGN KEY `Token_ibfk_1`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_ibfk_1`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `mdp` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191),
    `societeId` INTEGER NOT NULL,

    UNIQUE INDEX `User.email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD FOREIGN KEY (`societeId`) REFERENCES `Societe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Token` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
