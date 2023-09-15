import { GET } from "@/app/api/notes/route";
import { createMocks } from "node-mocks-http";
import { fakeNoteList } from "../../../__fixtures__/models/frontend/note";
import { fetchData } from "@/app/apiService/apiService";
import { BackendApiRoutes } from "@/app/apiService/BackendApiRoutes";
import { ErrorMessages } from "@/app/constants/ErrorMessages";

// Mocking the fetchData function
jest.mock("../../../../src/app/apiService/apiService");

describe("Get Notes", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Should call the fetchData with correct parameters and return list of notes", async () => {
    let fakeNotes = fakeNoteList();
    (fetchData as jest.MockedFunction<typeof fetchData>).mockResolvedValue(
      fakeNotes
    );

    const { req } = createMocks({
      method: "GET",
    });

    const response = await GET(req);
    let result = await response?.json();

    expect(fetchData).toHaveBeenCalledWith(BackendApiRoutes.Notes.GetAll);

    expect(result).toEqual(fakeNotes);
  });

  it("Should handle error", async () => {
    (fetchData as jest.Mock).mockRejectedValue(new Error());
    const { req } = createMocks({
      method: "GET",
    });

    let response = await GET(req);

    expect(fetchData).toHaveBeenCalledWith(BackendApiRoutes.Users.GetAll, {
      cache: "no-cache",
    });
    expect(response.status).toBe(500);
    let result = await response?.json();

    expect(result).toEqual({
      message: ErrorMessages.NotesApiFailure,
    });
  });
});
