import React, { JSX } from "react";
import NotesClient from "./NotesClient";

async function fetchNotes() {
  const res = await fetch("http://localhost:3000/notes", {
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return res.json();
}

export default async function Home(): Promise<JSX.Element> {
  const notes = await fetchNotes();
  return <NotesClient initialNotes={notes} />;
}
