-- CreateTable
CREATE TABLE `Replies` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `commentId` VARCHAR(191) NOT NULL,
    `blogPostId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Replies_id_key`(`id`),
    PRIMARY KEY (`userId`, `blogPostId`, `commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Replies` ADD CONSTRAINT `Replies_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Replies` ADD CONSTRAINT `Replies_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Replies` ADD CONSTRAINT `Replies_blogPostId_fkey` FOREIGN KEY (`blogPostId`) REFERENCES `BLogPosts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
