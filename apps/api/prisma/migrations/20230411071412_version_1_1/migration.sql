-- AlterTable
CREATE SEQUENCE collection_id_seq;
ALTER TABLE "Collection" ALTER COLUMN "id" SET DEFAULT nextval('collection_id_seq');
ALTER SEQUENCE collection_id_seq OWNED BY "Collection"."id";
