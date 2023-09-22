//"use server";
import { BackendApiRoutes } from "@/app/apiService/BackendApiRoutes";
import { BffApiRoutes } from "@/app/apiService/BffApiRoutes";
import { deleteData, fetchData } from "@/app/apiService/apiService";
import { Note } from "@/app/models/frontend/note";
import { PaginationResult } from "@/app/models/frontend/paginationResult";
import { revalidateTag } from "next/cache";

export async function getNotes() {
  return await fetchData<Note[]>(BackendApiRoutes.Notes.GetAll, {
    cache: "no-cache",
    next: {
      tags: ["get-notes"],
    },
  });
}

export async function deleteNote(id: string) {
  "use server";
  await deleteData(BffApiRoutes.Notes.Delete(id));
  revalidateTag("get-notes");
}

export async function getPaginatedNotes(pageNumber: number, pageSize: number) {
  return fetchData<PaginationResult<Note>>(
    BackendApiRoutes.Notes.GetNotesForUserWithPagination(pageNumber, pageSize),
    {
      cache: "no-cache",
    }
  );
}
