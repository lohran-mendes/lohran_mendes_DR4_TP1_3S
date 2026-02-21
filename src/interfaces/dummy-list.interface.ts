export interface DummyList {
  limit: number;
  skip: number;
  total: number;
  posts: Post[];
}

export interface Post {
  id: number;
  body: string;
  title: string;
  tags: string[];
  userId: number;
  views: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
}
