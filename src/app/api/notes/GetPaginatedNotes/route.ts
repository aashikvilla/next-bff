import { BackendApiRoutes } from "@/app/apiService/BackendApiRoutes";
import { fetchData } from "@/app/apiService/apiService";
import { ErrorMessages } from "@/app/constants/ErrorMessages";
import { Note } from "@/app/models/frontend/note";
import { PaginationResult } from "@/app/models/frontend/paginationResult";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "auto";

export async function GET(req: NextRequest) {
  try {
    const { origin , searchParams } = new URL(req.url)
    const pageNumber =parseInt( searchParams.get('pageNumber')??"1" );
    console.log("search params", searchParams)
 
    let notes = await fetchData<PaginationResult<Note>>(BackendApiRoutes.Notes.GetNotesForUserWithPagination(pageNumber,5));
    console.log((pageNumber-1) * 5)
    console.log( notes.count)
    if( (pageNumber-1) * 5 > notes.count){
        redirect(origin+'/notes');
        console.log("re url" , new URL(req.url));
        return NextResponse.redirect(origin+'/notes', { status: 308 });
    }
    
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { message: ErrorMessages.NotesApiFailure },
      { status: 500 }
    );
  }
}
