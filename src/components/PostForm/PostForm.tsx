import type { Post } from "../../interfaces/dummy-list.interface";
import "./PostForm.css";
import { useEffect, useState, type SubmitEvent } from "react";

type PostFormProps = {
  onAddPost: (postData: { title: string; body: string }) => void;
  onEditPost: (postData: { title: string; body: string }) => void;
  postToEdit?: Post | null;
};

function PostForm(props: PostFormProps) {
  const { onAddPost, onEditPost, postToEdit } = props;

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setBody(postToEdit.body);
    }
  }, [postToEdit]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const currentTitle = title.trim();
    const currentBody = body.trim();

    if (!currentTitle || !currentBody) return;

    if (postToEdit) {
      onEditPost({ title: currentTitle, body: currentBody });
    } else {
      onAddPost({ title: currentTitle, body: currentBody });
    }
    setTitle("");
    setBody("");
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>{postToEdit ? "Editar Post" : "Adicionar Novo Post"}</h2>
      <div className="form-group">
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Conteúdo:</label>
        <textarea
          id="body"
          name="body"
          rows={4}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          required
        ></textarea>
      </div>
      {postToEdit ? (
        <button type="submit">Salvar Alterações</button>
      ) : (
        <button type="submit">Publicar Post</button>
      )}
    </form>
  );
}

export default PostForm;
