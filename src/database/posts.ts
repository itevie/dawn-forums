import { Database } from ".";

export default class DatabasePosts {
  public database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  public async getList(threadId: number): Promise<Post[]> {
    return await this.database.connection.all<Post[]>(
      "SELECT * FROM posts WHERE thread = $1;",
      threadId
    );
  }

  public async get(post: number): Promise<Post | undefined> {
    return await this.database.connection.get<Post>(
      "SELECT * FROM posts WHERE id = $1",
      post
    );
  }

  public async create(
    author: number,
    thread: number,
    title: string,
    body: string
  ): Promise<Post> {
    return (await this.database.connection.get<Post>(
      "INSERT INTO posts (author, thread, title, body) VALUES ($1, $2, $3, $4) RETURNING *;",
      author,
      thread,
      title,
      body
    )) as Post;
  }

  public async update<T extends keyof Post>(
    id: number,
    key: T,
    value: Post[T]
  ): Promise<Post> {
    return (await this.database.connection.get(
      `UPDATE posts SET ${key} = $1 WHERE id = $2;`,
      value,
      id
    )) as Post;
  }
}
