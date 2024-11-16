-- DropForeignKey
ALTER TABLE `usermatches` DROP FOREIGN KEY `usermatches_usersId_fkey`;

-- AddForeignKey
ALTER TABLE `usermatches` ADD CONSTRAINT `usermatches_usersId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
