/*
  Warnings:

  - A unique constraint covering the columns `[id,belongsToId]` on the table `Update` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Update_id_belongsToId_key" ON "Update"("id", "belongsToId");