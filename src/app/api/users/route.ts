import { BackendApiRoutes } from "@/app/apiService/BackendApiRoutes";
import { fetchData } from "@/app/apiService/apiService";
import { UserBE } from "@/app/models/backend/userBE";
import { User } from "@/app/models/frontend/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let users = await fetchData<UserBE[]>(BackendApiRoutes.Users.GetAll, {
      cache: "no-cache",
    });
    console.log("inside");
    let updatedUsers: User[] = users.map((user) => ({
      address: `${user.address.street} , ${user.address.city}, ${user.address.zipcode}`,
      fullname: `${user.name.firstname} ${user.name.lastname}`,
      phone: user.phone,
    }));

    return NextResponse.json(updatedUsers);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
