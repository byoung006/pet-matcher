-- CreateTable
CREATE TABLE `pets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `petName` VARCHAR(255) NOT NULL,
    `petColor` VARCHAR(255) NOT NULL,
    `petAge` INTEGER NOT NULL,
    `petKind` ENUM('dog', 'cat', 'other') NOT NULL,

    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `age` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
