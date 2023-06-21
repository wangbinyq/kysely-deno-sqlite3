import { MigrationProvider, Migration } from "kysely";

function isMigration(obj: { up?: unknown }): obj is Migration {
  return typeof obj === "object" && typeof obj?.up === "function";
}

export class FileMigrationProvider implements MigrationProvider {
  #migrationFolder: URL;

  constructor(folder?: URL) {
    this.#migrationFolder = folder || new URL("./migrations/", import.meta.url);
  }

  async getMigrations() {
    const migrations: Record<string, Migration> = {};
    for (const entry of Deno.readDirSync(this.#migrationFolder)) {
      const fileName = entry.name;
      if (
        entry.isFile &&
        (fileName.endsWith(".js") ||
          (fileName.endsWith(".ts") && !fileName.endsWith(".d.ts")) ||
          fileName.endsWith(".mjs") ||
          (fileName.endsWith(".mts") && fileName.endsWith(".d.mts")))
      ) {
        const mig = await import(
          new URL(entry.name, this.#migrationFolder).toString()
        );
        if (isMigration(mig.default)) {
          migrations[entry.name] = mig.default;
        } else if (isMigration(mig)) {
          migrations[entry.name] = mig;
        }
      }
    }

    return migrations;
  }
}
