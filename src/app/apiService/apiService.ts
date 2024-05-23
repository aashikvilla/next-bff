import { ErrorMessages } from "../constants/ErrorMessages";

export async function fetchData<T>(
  route: string,
  options?: RequestInit
): Promise<T> {
  try {
    //console.log("url", route);
    const res = await fetch(route, options);

    if (!res.ok) {
      const errorData = await res.json();
      console.log("url", route, "error", errorData);
      throw new Error(ErrorMessages.FetchApiFailure(res.status, errorData));
    }
    let result = await res.json();
    console.log(route ," - result",result);

    return (result) as Promise<T>;
  } catch (error) {
    console.error(ErrorMessages.FectchDataException, error);
    throw error;
  }
}

export async function deleteData(
  route: string,
  options?: RequestInit
): Promise<void> {
  try {
    const deleteOptions = {
      ...options,
      method: "DELETE",
    };

    const res = await fetch(route, deleteOptions);
    console.log("okkk", res.ok);

    if (!res.ok) {
      const errorData = await res.json();
      console.log("url", route, "error", errorData);
      throw new Error(ErrorMessages.FetchApiFailure(res.status, errorData));
    }
  } catch (error) {
    console.error(ErrorMessages.FectchDataException, error);
    throw error;
  }
}
