import "./PostList.css";
import type { Post } from "../../interfaces/dummy-list.interface";

type PostListProps = {
  posts: Post[];
};

function PostList(props: PostListProps) {
  const { posts } = props;

  return (
    <ul className="posts-list">
      {posts.slice(0, 3).map((post) => (
        <li key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <div className="post-meta">
            <span>👁 {post.views}</span>
            <span>👍 {post.reactions.likes}</span>
            <span>👎 {post.reactions.dislikes}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
