import { UserBE } from "@/app/models/backend/userBE";
import { fakeUserBEList } from "../../../../__tests__/__fixtures__/models/backend/userBE";

export const getUsers = () => {
  return fakeUserBEList(2);
};
