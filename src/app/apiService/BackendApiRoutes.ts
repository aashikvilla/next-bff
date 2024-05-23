const FAKEAPI_URL = process.env.NEXT_PUBLIC_FAKEAPI_BASE_URL;
const NOTESAPP_URL = process.env.NEXT_PUBLIC_NOTESAPP_BASE_URL;
export const BackendApiRoutes = {
  Users: {
    GetAll: FAKEAPI_URL + "/users",
  },
  Notes: {
    GetAll: NOTESAPP_URL + "/Note/GetNotesForUser/64b702c4576ee1a2851b73a9",
    Delete: (id: string) => NOTESAPP_URL + `/Note/DeleteNote/${id}`,
    GetNotesForUserWithPagination: (pageNumber: number, pageSize: number) =>
      NOTESAPP_URL +
      `/Note/GetNotesForUserWithPagination/64b702c4576ee1a2851b73a9?pageNumber=${pageNumber}&pagesize=${pageSize}`,
  },
};
