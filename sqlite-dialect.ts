import { SqliteDialectConfig } from "./sqlite-dialect-config.ts";
import { SqliteDriver } from "./sqlite-driver.ts";
import {
  Kysely,
  Driver,
  SqliteQueryCompiler,
  SqliteAdapter,
  SqliteIntrospector,
  Dialect,
  QueryCompiler,
  DialectAdapter,
  DatabaseIntrospector,
} from "kysely";
/**
 * SQLite dialect that uses the [sqlite3](https://deno.land/x/sqlite3) library.
 *
 * The constructor takes an instance of {@link SqliteDialectConfig}.
 *
 * ```ts
 * import { Database } from "https://deno.land/x/sqlite3/mod.ts";
 *
 * new SqliteDialect({
 *   database: new Database('db.sqlite')
 * })
 * ```
 *
 * If you want the pool to only be created once it's first used, `database`
 * can be a function:
 *
 * ```ts
 * import { Database } from "https://deno.land/x/sqlite3/mod.ts";
 *
 * new SqliteDialect({
 *   database: async () => new Database('db.sqlite')
 * })
 * ```
 */
export class SqliteDialect implements Dialect {
  readonly #config: SqliteDialectConfig;

  constructor(config: SqliteDialectConfig) {
    this.#config = Object.freeze({ ...config });
  }

  createDriver(): Driver {
    return new SqliteDriver(this.#config);
  }

  createQueryCompiler(): QueryCompiler {
    return new SqliteQueryCompiler();
  }

  createAdapter(): DialectAdapter {
    return new SqliteAdapter();
  }

  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    return new SqliteIntrospector(db);
  }
}
