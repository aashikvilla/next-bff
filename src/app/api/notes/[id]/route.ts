import { BackendApiRoutes } from "@/app/apiService/BackendApiRoutes";
import { deleteData, fetchData } from "@/app/apiService/apiService";
import { ErrorMessages } from "@/app/constants/ErrorMessages";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteData(BackendApiRoutes.Notes.Delete(params.id));
    return NextResponse.json("");
  } catch (error) {
    return NextResponse.json(
      { message: ErrorMessages.DeleteNotesApiFailure },
      { status: 500 }
    );
  }
}
