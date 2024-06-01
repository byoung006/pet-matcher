/*
  Warnings:

  - You are about to drop the column `matchId` on the `usermatches` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `usermatches` DROP FOREIGN KEY `userMatches_ibfk_2`;

-- AlterTable
ALTER TABLE `usermatches` DROP COLUMN `matchId`;

-- AddForeignKey
ALTER TABLE `userMatches` ADD CONSTRAINT `userMatches_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
