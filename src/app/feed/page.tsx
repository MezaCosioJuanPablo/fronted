// ...importaciones
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Cargar y guardar en localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem("acapulco_posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("acapulco_posts", JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !imageUrl) return;

    const newPost: Post = {
      id: Date.now(),
      title,
      description,
      imageUrl,
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setDescription("");
    setImageUrl("");
  };

  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* NAVBAR */}
      <nav className="bg-black bg-opacity-70 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <h1 className="text-xl font-bold">Acapulco Aventuras</h1>
        <div className="space-x-4">
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/feed" className="hover:underline">
            Feed
          </Link>
          <Link href="/perfil" className="hover:underline">
            Perfil
          </Link>
          <Link href="/crear" className="hover:underline">
            Crear post
          </Link>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div className="pt-24 p-6">
        <div className="bg-black bg-opacity-70 p-6 rounded-xl max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Comparte tus momentos inolvidables en Acapulco
          </h2>
          <p className="text-lg text-center mb-6">
            Fotos, experiencias y actividades increíbles para compartir con
            todos.
          </p>

          {/* FORMULARIO */}
          <form
            onSubmit={handleSubmit}
            className="bg-white bg-opacity-90 text-black rounded-lg p-4 mb-6 shadow-lg space-y-4"
          >
            <h3 className="text-xl font-bold">Crear nueva publicación</h3>
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="URL de la imagen"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Publicar
            </button>
          </form>

          {/* LISTA DE PUBLICACIONES */}
          <div className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-center text-white italic">
                Aún no hay publicaciones.
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white bg-opacity-90 text-black rounded-lg shadow-lg p-4 relative"
                >
                  <h3 className="text-2xl font-bold">{post.title}</h3>
                  <p className="mt-2">{post.description}</p>
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="mt-4 w-full max-h-80 object-cover rounded"
                    />
                  )}
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="absolute top-2 right-2 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
