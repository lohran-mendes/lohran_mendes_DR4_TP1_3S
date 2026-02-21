import "./PostForm.css";

function PostForm() {
  return (
    <form className="post-form">
      <h2>Adicionar Novo Post</h2>
      <div className="form-group">
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" name="title" required />
      </div>
      <div className="form-group">
        <label htmlFor="body">Conteúdo:</label>
        <textarea id="body" name="body" rows={4} required></textarea>
      </div>
      <button type="submit">Publicar Post</button>
    </form>
  );
}

export default PostForm;
