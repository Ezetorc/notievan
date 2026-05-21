ALTER TABLE "token"
ALTER COLUMN "refreshedAt"
TYPE timestamp
USING "refreshedAt"::timestamp;