"use client";

import { useEffect, useState } from "react";

type User = {
  username: string;
  email: string;
};

export default function PerfilPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("acapulco_users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Usuarios Registrados</h1>
      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{user.username}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
