import { Note } from "@/app/models/frontend/note";
import { deleteNote, getNotes, getPaginatedNotes } from "./noteService";
import NoteLayout from "./NoteLayout";
import { PaginationResult } from "@/app/models/frontend/paginationResult";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

interface INoteProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
async function Notes({ searchParams }: INoteProps) {
  console.log("searchparams", searchParams);
  const pageNumber =
    typeof searchParams.pageNumber === "string"
      ? Number(searchParams.pageNumber)
      : 1;
      console.log("PN", pageNumber)

      if(isNaN(pageNumber) || pageNumber<=0){
        redirect('/notes');
      }
  const pageSize = 5;

  var notes: PaginationResult<Note> = await getPaginatedNotes(
    pageNumber,
    pageSize
  );

  return (
    <NoteLayout
      notes={notes.data}
      deleteNote={deleteNote}
      currentPage={pageNumber}
      totalPages={Math.ceil(notes.count / pageSize)}
    />
  );
}

export default Notes;
