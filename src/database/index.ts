import sqlite3, { Statement } from "sqlite3";
import { Database as SqliteDatabase, open } from "sqlite";
import DatabaseThreads from "./threads";
import DatabasePosts from "./posts";

export class Database {
  // @ts-ignore
  public connection: SqliteDatabase<sqlite3.Database, Statement>;

  public threads = new DatabaseThreads(this);
  public posts = new DatabasePosts(this);

  public async init(location: string, setupScript: string): Promise<void> {
    this.connection = await open({
      filename: location,
      driver: sqlite3.Database,
    });

    await this.connection.exec(setupScript);
  }
}

const database = new Database();
export default database;
