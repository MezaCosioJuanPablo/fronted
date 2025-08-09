"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage("Por favor, llena todos los campos.");
      return;
    }

    // Obtener usuarios existentes
    const savedUsers = localStorage.getItem("acapulco_users");
    const users = savedUsers ? JSON.parse(savedUsers) : [];

    // Agregar nuevo usuario
    const newUser = { username, email };
    users.push(newUser);

    // Guardar en localStorage
    localStorage.setItem("acapulco_users", JSON.stringify(users));

    setMessage("Registro exitoso. Redirigiendo al login...");
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Registro</h1>
      <form
        onSubmit={handleRegister}
        className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <label className="block mb-2 text-gray-800">
          Usuario:
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="block mb-2 text-gray-800">
          Correo electrónico:
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block mb-4 text-gray-800">
          Contraseña:
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Registrarse
        </button>
        {message && (
          <p className="mt-4 text-sm text-center text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
}
