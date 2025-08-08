"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("❌ Debes ingresar correo y contraseña.");
      return;
    }

    setMessage(`✅ Inicio de sesión  para: ${email}`);
    setTimeout(() => {
      router.push("/feed");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Iniciar sesión</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 placeholder-gray-400"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 placeholder-gray-400"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded text-white font-semibold"
            type="submit"
          >
            Iniciar sesión
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-green-400">{message}</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="text-blue-400 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
