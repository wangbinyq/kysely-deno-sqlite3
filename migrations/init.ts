import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable("person")
    .addColumn("id", "integer", (cb) => cb.primaryKey())
    .addColumn("first_name", "text", (cb) => cb.notNull())
    .addColumn("last_name", "text")
    .addColumn("gender", "text", (cb) => cb.notNull())
    .addColumn("created_at", "timestamp", (cb) =>
      cb.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();
}
