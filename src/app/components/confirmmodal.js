// components/ConfirmModal.jsx
"use client";
import React from "react";

export default function ConfirmModal({ onConfirm, onCancel, message }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 shadow-lg w-64 text-center space-y-4">
        <p className="text-sm text-gray-800">{message || "Confirmer l'action ?"}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Supprimer
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
