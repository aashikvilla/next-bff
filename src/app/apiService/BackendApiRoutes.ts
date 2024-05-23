const FAKEAPI_URL = process.env.NEXT_PUBLIC_FAKEAPI_BASE_URL;
const NOTESAPP_URL = process.env.NEXT_PUBLIC_NOTESAPP_BASE_URL;
export const BackendApiRoutes = {
  Users: {
    GetAll: FAKEAPI_URL + "/users",
  },
  Notes: {
    GetAll: NOTESAPP_URL + "/notes",
  },
};
