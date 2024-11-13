import { Database } from ".";

export default class DatabaseUsers {
  public database: Database;

  constructor(database: Database) {
    this.database = database;
  }
  public async get(id: number): Promise<User | undefined> {
    return this.database.connection.get<User>(
      "SELECT * FROM users WHERE id = $1;",
      id
    );
  }
}
