import { GET } from "@/app/api/notes/route";
import { createMocks } from "node-mocks-http";
import { fakeNoteList } from "../../../__fixtures__/models/frontend/note";
import { fetchData } from "@/app/apiService/apiService";
import { BackendApiRoutes } from "@/app/apiService/BackendApiRoutes";

// Mocking the fetchData function
jest.mock("../../../../src/app/apiService/apiService");

describe("Get Notes", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns a list of notes", async () => {
    let fakeNotes = fakeNoteList();
    (fetchData as jest.MockedFunction<typeof fetchData>).mockResolvedValue(
      fakeNotes
    );

    const { req, res } = createMocks({
      method: "GET",
    });

    const response = await GET(req);
    let result = await response?.json();

    expect(fetchData).toHaveBeenCalledWith(BackendApiRoutes.Notes.GetAll);

    expect(result).toEqual(fakeNotes);
  });
});
