import "./PostForm.css";
import { useState, type SubmitEvent } from "react";

type PostFormProps = {
  onAddPost: (postData: { title: string; body: string }) => void;
};

function PostForm({ onAddPost }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const currentTitle = title.trim();
    const currentBody = body.trim();

    if (!currentTitle || !currentBody) return;

    onAddPost({ title: currentTitle, body: currentBody });
    setTitle("");
    setBody("");
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>Adicionar Novo Post</h2>
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
      <button type="submit">Publicar Post</button>
    </form>
  );
}

export default PostForm;
