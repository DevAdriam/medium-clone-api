-- CreateTable
CREATE TABLE `SharePost` (
    `id` VARCHAR(191) NOT NULL,
    `UserId` VARCHAR(191) NOT NULL,
    `BlogPostId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SharePost_id_key`(`id`),
    PRIMARY KEY (`UserId`, `BlogPostId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SharePost` ADD CONSTRAINT `SharePost_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SharePost` ADD CONSTRAINT `SharePost_BlogPostId_fkey` FOREIGN KEY (`BlogPostId`) REFERENCES `BLogPosts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
