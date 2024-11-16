/*
  Warnings:

  - You are about to drop the `usermatches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pets` DROP FOREIGN KEY `pets_ibfk_1`;

-- DropForeignKey
ALTER TABLE `usermatches` DROP FOREIGN KEY `usermatches_usersId_fkey`;

-- DropTable
DROP TABLE `usermatches`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `age` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserMatch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matcherId` INTEGER NOT NULL,
    `matcheeId` INTEGER NOT NULL,

    UNIQUE INDEX `UserMatch_matcherId_matcheeId_key`(`matcherId`, `matcheeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserMatch` ADD CONSTRAINT `UserMatch_matcherId_fkey` FOREIGN KEY (`matcherId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMatch` ADD CONSTRAINT `UserMatch_matcheeId_fkey` FOREIGN KEY (`matcheeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
