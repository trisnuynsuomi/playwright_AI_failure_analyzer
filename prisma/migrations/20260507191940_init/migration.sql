-- CreateTable
CREATE TABLE "FailureRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "testTitle" TEXT NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "aiSummary" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "flakyScore" REAL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
