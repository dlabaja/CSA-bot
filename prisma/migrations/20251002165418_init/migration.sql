/*
  Warnings:

  - The primary key for the `party_members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `approverUuid` on the `party_members` table. All the data in the column will be lost.
  - You are about to drop the column `partyNumber` on the `party_members` table. All the data in the column will be lost.
  - Added the required column `approver_uuid` to the `party_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `party_number` to the `party_members` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_party_members" (
    "party_number" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" BIGINT NOT NULL,
    "approver_uuid" BIGINT NOT NULL,
    "date" DATETIME NOT NULL
);
INSERT INTO "new_party_members" ("date", "uuid") SELECT "date", "uuid" FROM "party_members";
DROP TABLE "party_members";
ALTER TABLE "new_party_members" RENAME TO "party_members";
CREATE UNIQUE INDEX "party_members_uuid_key" ON "party_members"("uuid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
