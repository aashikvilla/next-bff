export const ErrorMessages = {
  FetchApiFailure: (status: number, errorData: any) =>
    `Failed to fetch data. Status: ${status}. Message: ${JSON.stringify(
      errorData
    )}`,
  FectchDataException: "Error in FectchData",
  UserApiFailure: "Failed to fetch users",
  NotesApiFailure: "Failed to fetch notes",
};
