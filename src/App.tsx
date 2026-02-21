import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import PostList from "./components/Postlist/PostList";
import type { DummyList, Post } from "./interfaces/dummy-list.interface";
import PostForm from "./components/PostForm/PostForm";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

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
      <PostForm onAddPost={handleAddPost} />
      <PostList posts={posts} />
    </>
  );
}

export default App;
