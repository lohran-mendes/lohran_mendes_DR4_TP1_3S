import "./App.css";
import { useEffect, useState } from "react";
import Header from "./header/Header";

import PostList from "./PostList/PostList";
import type { DummyList, Post } from "./interfaces/dummy-list.interface";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/posts");
        const data: DummyList = await response.json();
        setPosts(data.posts);
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
      <PostList posts={posts} />
    </>
  );
}

export default App;
