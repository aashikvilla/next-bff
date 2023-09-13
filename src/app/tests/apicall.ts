import { BackendApiRoutes } from "../apiService/BackendApiRoutes";
import { fetchData } from "../apiService/apiService";
import { UserBE } from "../models/backend/userBE";
import { User } from "../models/frontend/user";

export const getAllUsers = async () => {
  let users = await fetchData<UserBE[]>(BackendApiRoutes.Users.GetAll);
  console.log("inside");
  let updatedUsers: User[] = users.map((user) => ({
    address: `${user.address.street} , ${user.address.city}, ${user.address.zipcode}`,
    fullname: `${user.name.firstname} ${user.name.lastname}`,
    phone: user.phone,
  }));
  return updatedUsers;
};
