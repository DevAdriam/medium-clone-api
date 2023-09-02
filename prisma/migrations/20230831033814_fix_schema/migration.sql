/*
  Warnings:

  - You are about to drop the column `type` on the `Categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Categories_type_key` ON `Categories`;

-- AlterTable
ALTER TABLE `Categories` DROP COLUMN `type`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Categories_title_key` ON `Categories`(`title`);
