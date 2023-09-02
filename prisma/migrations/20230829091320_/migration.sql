-- DropForeignKey
ALTER TABLE `Images` DROP FOREIGN KEY `Images_blogPostId_fkey`;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_blogPostId_fkey` FOREIGN KEY (`blogPostId`) REFERENCES `BLogPosts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
