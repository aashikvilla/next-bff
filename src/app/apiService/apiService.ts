export async function fetchData<T>(
  route: string,
  options?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(route, options);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Failed to fetch data. Status: ${res.status}. Message: ${JSON.stringify(
          errorData
        )}`
      );
    }
    return (await res.json()) as Promise<T>;
  } catch (error) {
    console.error("Error in Fetchdata ", error);
    throw error;
  }
}
