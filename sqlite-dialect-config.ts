import { DatabaseConnection } from "kysely";

/**
 * Config for the SQLite dialect.
 */
export interface SqliteDialectConfig {
  /**
   * An sqlite Database instance or a function that returns one.
   *
   * If a function is provided, it's called once when the first query is executed.
   */
  database: SqliteDatabase | (() => Promise<SqliteDatabase>);

  /**
   * Called once when the first query is executed.
   *
   * This is a Kysely specific feature and does not come from the `sqlite3` module.
   */
  onCreateConnection?: (connection: DatabaseConnection) => Promise<void>;
}

/**
 * This interface is the subset of sqlite3 driver's `Database` class that
 * kysely needs.
 *
 * We don't use the type from `sqlite3` here to not have a dependency to it.
 *
 */
export interface SqliteDatabase {
  close(): void;
  prepare(sql: string): SqliteStatement;
  readonly lastInsertRowId: number;
}

export interface SqliteStatement {
  columnNames(): string[];
  all(...parameters: ReadonlyArray<unknown>): unknown[];
  run(...parameters: ReadonlyArray<unknown>): number;
}
