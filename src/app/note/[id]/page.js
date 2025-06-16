"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrash, FaSave } from "react-icons/fa";
import ConfirmModal from "@/app/components/confirmmodal";

export default function NotePage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // pour afficher la modale

  useEffect(() => {
    async function fetchNote() {
      const res = await fetch(`http://localhost:8055/items/note/${id}`);
      const json = await res.json();
      setNote(json.data);
      setTitle(json.data.title || "");
      setContent(json.data.content || "");
    }

    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    await fetch(`http://localhost:8055/items/note/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    setIsSaving(false);

    router.push(`/note/${id}`);
    setTimeout(() => {
      window.location.reload();
    }, 10);
  };

  const handleDeleteConfirmed = async () => {
    await fetch(`http://localhost:8055/items/note/${id}`, {
      method: "DELETE",
    });

    setShowConfirm(false);

    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 10);
  };

  if (!note) return <div className="p-6">Chargement...</div>;

  return (
    <div className="relative p-6">
      {showConfirm && (
        <ConfirmModal
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setShowConfirm(false)}
          message="Supprimer cette note ?"
        />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de la note"
          className="text-xl font-semibold border-b border-gray-200 pb-2 outline-none"
        />

        <textarea
          className="w-full min-h-screen text-sm font-mono shadow-none border-none focus:outline-none focus:ring-0 focus:border-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Écris ta note ici..."
        />
      </form>

      <div className="fixed bottom-2 right-2 flex flex-row gap-2">
        <button
          onClick={() => setShowConfirm(true)}
          type="button"
          className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 shadow-md"
        >
          <FaTrash />
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500 shadow-md"
          disabled={isSaving}
        >
          <FaSave />
        </button>
      </div>
    </div>
  );
}
