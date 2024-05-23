import { ErrorMessages } from "../constants/ErrorMessages";

export async function fetchData<T>(
  route: string,
  options?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(route, options);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(ErrorMessages.FetchApiFailure(res.status, errorData));
    }
    return (await res.json()) as Promise<T>;
  } catch (error) {
    console.error(ErrorMessages.FectchDataException, error);
    throw error;
  }
}
