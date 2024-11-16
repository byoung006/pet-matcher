/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pets` DROP FOREIGN KEY `pets_ibfk_1`;

-- DropForeignKey
ALTER TABLE `usermatch` DROP FOREIGN KEY `UserMatch_matcheeId_fkey`;

-- DropForeignKey
ALTER TABLE `usermatch` DROP FOREIGN KEY `UserMatch_matcherId_fkey`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `age` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserMatch` ADD CONSTRAINT `UserMatch_matcherId_fkey` FOREIGN KEY (`matcherId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMatch` ADD CONSTRAINT `UserMatch_matcheeId_fkey` FOREIGN KEY (`matcheeId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
