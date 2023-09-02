-- CreateTable
CREATE TABLE `LikePosts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `blogPostId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `LikePosts_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LikePosts` ADD CONSTRAINT `LikePosts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikePosts` ADD CONSTRAINT `LikePosts_blogPostId_fkey` FOREIGN KEY (`blogPostId`) REFERENCES `BLogPosts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
