import { fakeUserBEList } from "../../../__tests__/__fixtures__/models/backend/userBE";
import { GET } from "../api/users/route";
import { BackendApiRoutes } from "../apiService/BackendApiRoutes";
import { fetchData } from "../apiService/apiService";
import { getAllUsers } from "./apicall";

jest.mock("../apiService/apiService");

describe("getAllUsers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it("getAllUsers should call the fetchData with correct parameters", async () => {
  //   // Use the fakeUserBE fixture for mock data
  //   let fakeUsers = fakeUserBEList();

  //   // Mock the implementation of fetchData
  //   (fetchData as jest.MockedFunction<typeof fetchData>).mockResolvedValue(
  //     fakeUsers
  //   );

  //   let res = await getAllUsers();
  //   console.log("response", res);

  //   expect(fetchData).toHaveBeenCalledWith(BackendApiRoutes.Users.GetAll);
  //   //expect(res).toEqual(fakeUsers); // Check if the response matches the mocked value
  // });

  // it("GET should call the fetchData with correct parameters", async () => {
  //   // Use the fakeUserBE fixture for mock data
  //   let fakeUsers = fakeUserBEList();

  //   // Mock the implementation of fetchData
  //   (fetchData as jest.MockedFunction<typeof fetchData>).mockResolvedValue(
  //     fakeUsers
  //   );

  //   let res = await GET();
  //   console.log("response", res);

  //   expect(fetchData).toHaveBeenCalledWith(BackendApiRoutes.Users.GetAll);
  //   //expect(res).toEqual(fakeUsers); // Check if the response matches the mocked value
  // });
});
