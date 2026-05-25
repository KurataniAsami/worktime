-- CreateTable
CREATE TABLE "EventModel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventModel_pkey" PRIMARY KEY ("id")
);
