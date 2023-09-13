import { BackendApiRoutes } from "@/app/apiService/BackendApiRoutes";
import { fetchData } from "@/app/apiService/apiService";
import { Note } from "@/app/models/frontend/note";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let notes = await fetchData<Note[]>(BackendApiRoutes.Notes.GetAll);
  return NextResponse.json(notes);
}
