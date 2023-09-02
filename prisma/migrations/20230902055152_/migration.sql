/*
  Warnings:

  - You are about to drop the `LikePosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `LikePosts` DROP FOREIGN KEY `LikePosts_blogPostId_fkey`;

-- DropForeignKey
ALTER TABLE `LikePosts` DROP FOREIGN KEY `LikePosts_userId_fkey`;

-- AlterTable
ALTER TABLE `BLogPosts` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Comments` ADD PRIMARY KEY (`userId`, `blogPostId`);

-- DropTable
DROP TABLE `LikePosts`;

-- CreateTable
CREATE TABLE `like_user` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `blogPostId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `like_user_id_key`(`id`),
    PRIMARY KEY (`userId`, `blogPostId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `like_user` ADD CONSTRAINT `like_user_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like_user` ADD CONSTRAINT `like_user_blogPostId_fkey` FOREIGN KEY (`blogPostId`) REFERENCES `BLogPosts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
