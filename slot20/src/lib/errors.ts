export function getErrorMessage(error: unknown): string {
  if (typeof error !== "object" || error === null) {
    return "Đã xảy ra lỗi, vui lòng thử lại";
  }

  if ("data" in error) {
    const data = error.data;
    if (
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof data.error === "string"
    ) {
      return data.error;
    }
  }

  if ("message" in error && typeof error.message === "string") {
    return error.message;
  }

  return "Đã xảy ra lỗi, vui lòng thử lại";
}
