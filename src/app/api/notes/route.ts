import { BackendApiRoutes } from "@/app/apiService/BackendApiRoutes";
import { fetchData } from "@/app/apiService/apiService";
import { ErrorMessages } from "@/app/constants/ErrorMessages";
import { Note } from "@/app/models/frontend/note";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "auto";

export async function GET(req: NextRequest) {
  try {
    let notes = await fetchData<Note[]>(BackendApiRoutes.Notes.GetAll);
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { message: ErrorMessages.NotesApiFailure },
      { status: 500 }
    );
  }
}
