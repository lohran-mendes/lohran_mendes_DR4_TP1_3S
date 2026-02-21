import "./PostList.css";
import { useMemo, useState } from "react";
import type { Post } from "../../interfaces/dummy-list.interface";

type PostListProps = {
  posts: Post[];
  onDeletePost: (postId: number) => void;
  onEditPost: (postId: number) => void;
};

function PostList(props: PostListProps) {
  const { posts, onDeletePost, onEditPost } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
      ),
    [posts, searchTerm],
  );

  return (
    <section className="posts-section">
      <div className="posts-search-container">
        <label htmlFor="post-search" className="posts-search-label">
          Pesquisar por título
        </label>
        <input
          id="post-search"
          type="search"
          className="posts-search-input"
          placeholder="Digite para filtrar os posts..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <ul className="posts-list">
        {filteredPosts.map((post) => (
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
                <button
                  className="deleteButton"
                  onClick={() => onDeletePost(post.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {filteredPosts.length === 0 && (
        <p className="empty-search-message">
          Nenhum post encontrado para este termo.
        </p>
      )}
    </section>
  );
}

export default PostList;
