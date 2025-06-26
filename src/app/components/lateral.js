"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "./confirmmodal";
export default function Lateral() {
  const [notes, setNotes] = useState([]);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const router = useRouter();

  const fetchNotes = async () => {
    const res = await fetch("http://localhost:8055/items/note");
    const json = await res.json();
    setNotes(json.data || []);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    const res = await fetch("http://localhost:8055/items/note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Nouvelle note", content: "" }),
    });
    const json = await res.json();
    router.push(`/note/${json.data.id}`);
    setTimeout(() => window.location.reload(), 10);
  };

  const confirmDelete = (id) => setNoteToDelete(id);

  const handleDeleteConfirmed = async () => {
    await fetch(`http://localhost:8055/items/note/${noteToDelete}`, {
      method: "DELETE",
    });

    setNoteToDelete(null);
    router.push("/");

    // Optionnel : recharger pour mettre à jour la liste
    setTimeout(() => window.location.reload(), 10);
  };

  return (
    <>
      {noteToDelete && (
        <ConfirmModal
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setNoteToDelete(null)}
          message="Supprimer cette note ?"
        />
      )}

      <div className="h-full w-64 bg-gray-50 p-2 flex flex-col gap-2 relative">
        <button
          onClick={handleCreateNote}
          className="bg-[#36b387] text-white px-4 py-2 rounded hover:bg-[#2fa377]"
        >
          + Nouvelle note
        </button>

        <ul className="space-y-2 overflow-y-auto">
          {notes.map((note) => (
            <li
              key={note.id}
              className="flex items-center justify-between bg-black rounded px-3 py-2"
            >
              <Link
                href={`/note/${note.id}`}
                className="text-white truncate w-full pr-2"
                title={note.title}
              >
                {note.title}
              </Link>
              <button
                onClick={() => confirmDelete(note.id)}
                className="text-white hover:text-red-400 ml-1"
                title="Supprimer la note"
              >
                <FaTrash size={14} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
