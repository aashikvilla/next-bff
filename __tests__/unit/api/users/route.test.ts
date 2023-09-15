import { GET } from "@/app/api/users/route";
import { fetchData } from "../../../../src/app/apiService/apiService";
import { BackendApiRoutes } from "@/app/apiService/BackendApiRoutes";
import { fakeUserBEList } from "../../../__fixtures__/models/backend/userBE";
import { User } from "@/app/models/frontend/user";
import { ErrorMessages } from "@/app/constants/ErrorMessages";

// Mocking the fetchData function
jest.mock("../../../../src/app/apiService/apiService");

describe("Get Users", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Should call the fetchData with correct parameters and return modified users", async () => {
    let fakeUsers = fakeUserBEList();
    (fetchData as jest.MockedFunction<typeof fetchData>).mockResolvedValue(
      fakeUsers
    );

    let response = await GET();
    let result = await response?.json();

    expect(fetchData).toHaveBeenCalledWith(BackendApiRoutes.Users.GetAll, {
      cache: "no-cache",
    });

    //compare with expected result
    let expectedUsers: User[] = fakeUsers.map((user) => ({
      address: `${user.address.street} , ${user.address.city}, ${user.address.zipcode}`,
      fullname: `${user.name.firstname} ${user.name.lastname}`,
      phone: user.phone,
    }));

    expect(result).toEqual(expectedUsers);
  });

  it("Should handle error", async () => {
    (fetchData as jest.Mock).mockRejectedValue(new Error());

    let response = await GET();

    expect(fetchData).toHaveBeenCalledWith(BackendApiRoutes.Users.GetAll, {
      cache: "no-cache",
    });
    expect(response.status).toBe(500);
    let result = await response?.json();

    expect(result).toEqual({
      message: ErrorMessages.UserApiFailure,
    });
  });
});
