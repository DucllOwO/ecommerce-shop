-- CreateTable
CREATE TABLE "Import" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Import_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportDetai" (
    "id" SERIAL NOT NULL,
    "item" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL DEFAULT 0,
    "importID" INTEGER NOT NULL,

    CONSTRAINT "ImportDetai_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImportDetai" ADD CONSTRAINT "ImportDetai_item_fkey" FOREIGN KEY ("item") REFERENCES "Product_item"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportDetai" ADD CONSTRAINT "ImportDetai_importID_fkey" FOREIGN KEY ("importID") REFERENCES "Import"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
