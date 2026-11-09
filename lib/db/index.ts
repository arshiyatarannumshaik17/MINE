import fs from "fs";
import path from "path";
import { DatabaseState } from "./schema";
import { createInitialDatabaseState } from "./seed";

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "universe_store.json");

class DatabaseEngine {
  private cache: DatabaseState | null = null;

  private ensureDirectory() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
  }

  public getState(): DatabaseState {
    if (this.cache) {
      return this.cache;
    }

    this.ensureDirectory();

    if (!fs.existsSync(DB_FILE)) {
      const initial = createInitialDatabaseState();
      this.saveState(initial);
      this.cache = initial;
      return initial;
    }

    try {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      this.cache = JSON.parse(raw);
      return this.cache!;
    } catch {
      const fallback = createInitialDatabaseState();
      this.saveState(fallback);
      this.cache = fallback;
      return fallback;
    }
  }

  public saveState(newState: DatabaseState) {
    this.ensureDirectory();
    this.cache = newState;
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(newState, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);
  }

  public mutate<T>(mutator: (state: DatabaseState) => T): T {
    const state = this.getState();
    const result = mutator(state);
    this.saveState(state);
    return result;
  }
}

export const db = new DatabaseEngine();
