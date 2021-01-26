-- CreateTable
CREATE TABLE "Episode" (
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,

    PRIMARY KEY ("number")
);
