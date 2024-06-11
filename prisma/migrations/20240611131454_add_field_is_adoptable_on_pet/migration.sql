/*
  Warnings:

  - Added the required column `is_adoptable` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "is_adoptable" BOOLEAN NOT NULL;
