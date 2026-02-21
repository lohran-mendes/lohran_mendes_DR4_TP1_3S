import "./App.css";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header/Header";
import PostList from "./components/Postlist/PostList";
import type { DummyList, Post } from "./interfaces/dummy-list.interface";
import PostForm from "./components/PostForm/PostForm";
import Toast from "./components/Toast/Toast";

type ToastType = "success" | "error" | "info";

const TYPES_OF_TOAST: Record<string, ToastType> = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [isToastClosing, setIsToastClosing] = useState(false);
  const closeToastTimer = useRef<number | null>(null);
  const hideToastTimer = useRef<number | null>(null);
  const [toastProps, setToastProps] = useState<{
    message: string;
    type: ToastType;
  }>({
    message: "",
    type: TYPES_OF_TOAST.INFO,
  });

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
      
      showToastMessage("Postagem publicada!", TYPES_OF_TOAST.SUCCESS);
      return [newPost, ...currentPosts];
    });
  };

  const handleDeletePost = (postId: number) => {
    const postToDelete = posts.find((post) => post.id === postId);
    if (!postToDelete) {
      showToastMessage(
        "Não foi possível deletar o Post.",
        TYPES_OF_TOAST.ERROR,
      );
      return;
    }

    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId),
    );
    showToastMessage("Post removido!", TYPES_OF_TOAST.SUCCESS);
  };

  const handleEditPost = (postId: number) => {
    const postToEdit = posts.find((post) => post.id === postId);
    if (!postToEdit) {
      showToastMessage("Post não encontrado.", TYPES_OF_TOAST.ERROR);
      return;
    }

    setPostToEdit(postToEdit);
  };

  const updatePost = (postData: { title: string; body: string }) => {
    if (!postToEdit) {
      showToastMessage(
        "Não há post selecionado para edição.",
        TYPES_OF_TOAST.ERROR,
      );
      return;
    }

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postToEdit.id
          ? { ...post, title: postData.title, body: postData.body }
          : post,
      ),
    );
    showToastMessage("Alterações salvas!", TYPES_OF_TOAST.SUCCESS);
    setPostToEdit(null);
  };

  const showToastMessage = (message: string, type: ToastType) => {
    if (closeToastTimer.current) {
      clearTimeout(closeToastTimer.current);
    }

    if (hideToastTimer.current) {
      clearTimeout(hideToastTimer.current);
    }

    setToastProps({ message, type });
    setShowToast(true);
    setIsToastClosing(false);

    closeToastTimer.current = window.setTimeout(() => {
      setIsToastClosing(true);

      hideToastTimer.current = window.setTimeout(() => {
        setShowToast(false);
        setIsToastClosing(false);
      }, 280);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (closeToastTimer.current) {
        clearTimeout(closeToastTimer.current);
      }

      if (hideToastTimer.current) {
        clearTimeout(hideToastTimer.current);
      }
    };
  }, []);

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
      {showToast && (
        <Toast
          message={toastProps.message}
          type={toastProps.type}
          isClosing={isToastClosing}
        />
      )}
    </>
  );
}

export default App;
