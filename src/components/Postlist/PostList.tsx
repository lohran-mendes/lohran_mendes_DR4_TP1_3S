import "./PostList.css";
import type { Post } from "../../interfaces/dummy-list.interface";

type PostListProps = {
  posts: Post[];
  onDeletePost: (postId: number) => void;
  onEditPost: (postId: number) => void;
};

function PostList(props: PostListProps) {
  const { posts, onDeletePost, onEditPost } = props;

  return (
    <ul className="posts-list">
      {posts.map((post) => (
        <li key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <div className="post-meta-container">
            <div className="post-meta">
              <span>👍 {post.reactions.likes}</span>
              <span>👎 {post.reactions.dislikes}</span>
              <span>👁 {post.views}</span>
            </div>
            <div className="buttons-container">
              <button onClick={() => onEditPost(post.id)}>Editar</button>
              <button className="deleteButton" onClick={() => onDeletePost(post.id)}>Excluir</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
