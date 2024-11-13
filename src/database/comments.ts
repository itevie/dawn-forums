import { Database } from ".";

export default class DatabaseComments {
  public database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  public async getFor(post: number): Promise<Comment[]> {
    return this.database.connection.all<Comment[]>(
      "SELECT * FROM comments WHERE post = $1;",
      post
    );
  }

  public async create(
    post: number,
    author: number,
    body: string
  ): Promise<Comment> {
    return (await this.database.connection.get<Comment>(
      "INSERT INTO comments (post, author, body) VALUES ($1, $2, $3) RETURNING *;",
      post,
      author,
      body
    )) as Comment;
  }
}
