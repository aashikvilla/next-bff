const BFF_URL = process.env.NEXT_PUBLIC_BFF_BASE_URL;
export const BffApiRoutes = {
  Notes: {
    GetAll: BFF_URL + "/notes",
    Delete: (id: string) => BFF_URL + `/notes/${id}`,
  },
};
