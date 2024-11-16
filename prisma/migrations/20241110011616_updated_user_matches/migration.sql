/*
  Warnings:

  - Added the required column `usersId` to the `usermatches` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usermatches` DROP FOREIGN KEY `userMatches_ibfk_2`;

-- AlterTable
ALTER TABLE `usermatches` ADD COLUMN `usersId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `usermatches` ADD CONSTRAINT `usermatches_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
