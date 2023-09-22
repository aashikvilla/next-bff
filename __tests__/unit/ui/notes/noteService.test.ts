import { deleteNote, getNotes } from "@/app/(ui)/notes/noteService";
import { fetchData, deleteData } from "@/app/apiService/apiService";
import { BackendApiRoutes } from "@/app/apiService/BackendApiRoutes";
import { BffApiRoutes } from "@/app/apiService/BffApiRoutes";
import { revalidateTag } from "next/cache";

// Mocking the fetchData and deleteData functions
jest.mock("@/app/apiService/apiService", () => ({
  fetchData: jest.fn(),
  deleteData: jest.fn(),
}));

// Mocking the revalidateTag function
jest.mock("next/cache", () => ({
  revalidateTag: jest.fn(),
}));

describe("Note Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches notes correctly", async () => {
    const mockNotes = [
      { id: "1", title: "Note 1", description: "Description 1" },
      { id: "2", title: "Note 2", description: "Description 2" },
    ];

    // Mock the fetchData function to return the mockNotes
    (fetchData as jest.Mock).mockResolvedValue(mockNotes);

    const result = await getNotes();

    expect(fetchData).toHaveBeenCalledWith(BackendApiRoutes.Notes.GetAll, {
      cache: "no-cache",
      next: {
        tags: ["get-notes"],
      },
    });
    expect(result).toEqual(mockNotes);
  });

  it("deletes a note and revalidates cache", async () => {
    const mockId = "1";

    await deleteNote(mockId);

    expect(deleteData).toHaveBeenCalledWith(BffApiRoutes.Notes.Delete(mockId));
    expect(revalidateTag).toHaveBeenCalledWith("get-notes");
  });
});
