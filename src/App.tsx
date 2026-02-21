import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import PostList from "./components/Postlist/PostList";
import type { DummyList, Post } from "./interfaces/dummy-list.interface";
import PostForm from "./components/PostForm/PostForm";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  const handleAddPost = (postData: { title: string; body: string }) => {
    setPosts((currentPosts) => {
      const maxId = currentPosts.reduce(
        (highestId, post) => Math.max(highestId, post.id),
        0,
      );

      const newPost: Post = {
        id: maxId + 1,
        title: postData.title,
        body: postData.body,
        tags: [],
        userId: 0,
        views: 0,
        reactions: {
          likes: 0,
          dislikes: 0,
        },
      };

      return [newPost, ...currentPosts];
    });
  };

  const handleDeletePost = (postId: number) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId),
    );
  };

  const handleEditPost = (postId: number) => {
    const postToEdit = posts.find((post) => post.id === postId);
    if (!postToEdit) return;

    setPostToEdit(postToEdit);
  };

  const updatePost = (postData: { title: string; body: string }) => {
    if (!postToEdit) return;

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postToEdit.id
          ? { ...post, title: postData.title, body: postData.body }
          : post,
      ),
    );
    setPostToEdit(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/posts");
        const data: DummyList = await response.json();
        setPosts(data.posts.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <p className="app-subtitle">Sistema de Gestão de Conteúdo</p>
      <PostForm
        onAddPost={handleAddPost}
        onEditPost={updatePost}
        postToEdit={postToEdit}
      />
      <PostList
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePost}
        posts={posts}
      />
    </>
  );
}

export default App;
