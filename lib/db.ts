// lib/db.ts
import Database from 'better-sqlite3';
import path from 'path';

// Points to your SQLite file (adjust as needed)
const db = new Database(path.join(process.cwd(), 'data.db'));

// Example migration (create table if not exists)
db.exec(`
  CREATE TABLE IF NOT EXISTS boards (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS cards (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    points INTEGER DEFAULT 0,
    labels TEXT,
    column_id TEXT NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS columns (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    board_id TEXT NOT NULL,
    position INTEGER DEFAULT 0
  );
`);

export default db;
