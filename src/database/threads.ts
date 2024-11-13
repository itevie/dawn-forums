import { Database } from ".";

export default class DatabaseThreads {
  public database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  public async getList(): Promise<Thread[]> {
    return this.database.connection.all<Thread[]>("SELECT * FROM threads;");
  }

  public async get(id: number): Promise<Thread | undefined> {
    return this.database.connection.get<Thread>(
      "SELECT * FROM threads WHERE id = $1;",
      id
    );
  }

  public async create(author: number, title: string): Promise<Thread> {
    return (await this.database.connection.get(
      "INSERT INTO threads (author, name) VALUES ($1, $2) RETURNING *;",
      author,
      title
    )) as Thread;
  }
}
