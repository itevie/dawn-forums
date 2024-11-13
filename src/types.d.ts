interface Options {
  forumName?: string;
  posts?: {
    title?: {
      minLength?: number;
      maxLength?: number;
      regex?: string;
    };
    body?: {
      minLength?: number;
      maxLength?: number;
      regex?: string;
    };
  };
  threads?: {
    title?: {
      minLength?: number;
      maxLength?: number;
      regex?: string;
    };
  };
}

interface User {
  id: number;
  username: string;
  password: string;
  display_name: string | null;
  avatar: string | null;
  created_at: string;
}

interface Thread {
  id: number;
  name: string;
  author: number;
  is_pinned: boolean;
  locked: boolean;
  created_at: string;
}

interface Post {
  id: number;
  thread: number;
  author: number;
  locked: boolean;
  created_at: string;
  is_edited: boolean;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  post: number;
  author: number;
  reference: number | null;
  created_at: string;
  is_edited: boolean;
  body: string;
}
