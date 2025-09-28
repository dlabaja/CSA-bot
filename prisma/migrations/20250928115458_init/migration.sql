-- CreateTable
CREATE TABLE "party_members" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "party_members_uuid_key" ON "party_members"("uuid");
