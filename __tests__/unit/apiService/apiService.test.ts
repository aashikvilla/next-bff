import { fetchData } from "@/app/apiService/apiService";

describe("fetchData", () => {
  let mockFetch: jest.SpyInstance;

  beforeEach(() => {
    mockFetch = jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    mockFetch.mockRestore();
  });

  it("fetches data successfully", async () => {
    const mockData = { key: "value" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    } as any);

    const result = await fetchData("/success-route");
    expect(result).toEqual(mockData);
  });

  it("throws an error when response is not ok", async () => {
    const mockErrorData = { error: "Failed to fetch" };
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: jest.fn().mockResolvedValueOnce(mockErrorData),
    } as any);

    await expect(fetchData("/")).rejects.toThrow(
      'Failed to fetch data. Status: 400. Message: {"error":"Failed to fetch"}'
    );
  });

  it("throws an error on network failure", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network Error"));

    await expect(fetchData("/")).rejects.toThrow("Network Error");
  });
});
