"use client";

import React, { JSX, useState } from "react";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NotesClientProps {
  initialNotes: Note[];
}

const API_URL = "http://localhost:3000/notes";

export default function NotesClient({
  initialNotes,
}: NotesClientProps): JSX.Element {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const fetchNotes = async () => {
    const res = await fetch(API_URL, {
      cache: "no-store",
    });
    const updatedNotes = await res.json();
    setNotes(updatedNotes);
  };

  const handleAddNote = async (note: Omit<Note, "_id" | "createdAt">) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    fetchNotes();
  };

  const handleEditNote = async (
    id: string,
    updatedNote: Omit<Note, "_id" | "createdAt">
  ) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    });
    fetchNotes();
    setEditingNote(null);
  };

  const handleDeleteNote = async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  const sortedNotes = [...notes].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Notes</h1>

      {/* Sorting Controls */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Sort by Date:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border px-2 py-1"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Notes List */}
      <ul className="mb-4">
        {sortedNotes.map((note) => (
          <li key={note._id} className="border rounded p-2 mb-2">
            <h2 className="font-semibold">{note.title}</h2>
            <p>{note.content}</p>
            <p className="text-sm text-gray-500">
              {new Date(note.createdAt).toLocaleString()}
            </p>
            <button
              onClick={() => setEditingNote(note)}
              className="text-blue-500 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteNote(note._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Add/Edit Note Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const title = form.title.value.trim();
          const content = form.content.value.trim();
          if (!title || !content) return;

          if (editingNote) {
            handleEditNote(editingNote._id, { title, content });
          } else {
            handleAddNote({ title, content });
          }

          form.reset();
        }}
        className="border rounded p-4"
      >
        <h2 className="font-bold mb-2">
          {editingNote ? "Edit Note" : "Add Note"}
        </h2>
        <div className="mb-2">
          <label className="block font-semibold">Title:</label>
          <input
            name="title"
            defaultValue={editingNote?.title || ""}
            className="border w-full px-2 py-1"
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Content:</label>
          <textarea
            name="content"
            defaultValue={editingNote?.content || ""}
            className="border w-full px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingNote ? "Update Note" : "Add Note"}
        </button>
        {editingNote && (
          <button
            type="button"
            onClick={() => setEditingNote(null)}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}