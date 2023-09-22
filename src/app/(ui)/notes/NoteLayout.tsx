"use client";
import { Note } from "@/app/models/frontend/note";
import { useCallback, useEffect, useState } from "react";
import { Pagination } from "../components/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface INoteLayout {
  notes: Note[];
  deleteNote: (id: string) => {};
  currentPage: number;
  totalPages: number;
}

function NoteLayout({
  notes,
  deleteNote,
  currentPage,
  totalPages,
}: INoteLayout) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [selectedNote, setSelectedNote] = useState<Note>(notes[0] ?? null);

  const handlePageChange = (page: number) => {
    //setSelectedNote(null);
    router.push(
      pathname + "?" + createQueryString("pageNumber", page.toString())
    );
  };

  useEffect(() => {
    setSelectedNote(notes[0]);
  }, [notes]);

  return (
    <div className="flex h-screen">
      {/* Left half - List of notes */}
      <div className="w-1/2 border-r p-4 overflow-y-auto">
        <h1 className="text-xl font-bold mb-4">Notes</h1>
        <ul>
          {notes.map((note) => (
            <li
              key={note.id}
              className={`mb-2 p-3 border rounded-lg cursor-pointer transition-colors duration-200 
               ${
                 selectedNote?.id === note.id
                   ? "bg-blue-200"
                   : "hover:bg-blue-100 bg-white"
               }`}
              onClick={() => setSelectedNote(note)}
            >
              <span className="flex items-center justify-between text-blue-500 hover:underline">
                {note.title}
                <input
                  type="image"
                  id="image"
                  alt="delete"
                  src="/icons/delete.png"
                  className="w-4 ml-2"
                  onClick={() => deleteNote(note.id)}
                />
              </span>
            </li>
          ))}
        </ul>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          totalPages={totalPages}
        />
      </div>

      {/* Description of selected note */}
      <div className="w-1/2 p-4">
        {selectedNote && (
          <div>
            <h1 className="text-xl font-bold mb-4">{selectedNote.title}</h1>
            <p>{selectedNote.description}</p>
            <p>{selectedNote.priority}</p>
            <p>{selectedNote.status}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteLayout;
