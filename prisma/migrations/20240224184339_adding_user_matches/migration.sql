/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `userMatches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `matchId` INTEGER NOT NULL,

    INDEX `userId`(`userId`),
    INDEX `matchId`(`matchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);

-- AddForeignKey
ALTER TABLE `userMatches` ADD CONSTRAINT `userMatches_ibfk_2` FOREIGN KEY (`matchId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
