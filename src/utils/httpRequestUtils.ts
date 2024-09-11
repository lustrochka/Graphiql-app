import { Header } from "../components/common/HeadersEditor/HeadersEditor";

export const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

export const validateHeaders = (headers: Header[]): boolean => {
  for (const header of headers) {
    if (header.key.trim() === "" || /\s/.test(header.key)) {
      return false;
    }
  }
  return true;
};

export const createRequestOptions = (
  method: string,
  headers: Header[],
  body: string,
): RequestInit => {
  const options: RequestInit = {
    method: method ?? "GET",
    headers: headers.reduce(
      (acc, header) => {
        acc[header.key] = header.value;
        return acc;
      },
      {} as Record<string, string>,
    ),
  };

  if (method !== "GET" && method !== "HEAD") {
    options.body = body;
  }

  return options;
};

export const handleResponse = async (response: Response): Promise<string> => {
  const text = await response.text();
  try {
    const json = JSON.parse(text);
    return JSON.stringify(json, null, 2);
  } catch {
    return text;
  }
};
