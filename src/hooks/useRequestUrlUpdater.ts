import { encodeBase64 } from "../utils/encodeBase64";
import { useRouter } from "next/router";
import { Header } from "../components/common/HeadersEditor/HeadersEditor";

const useRequestUrlUpdater = (
  method: string,
  url: string,
  headers: Header[],
  requestBody: string,
  userInteracted: boolean,
) => {
  const router = useRouter();

  const updateBrowserUrl = () => {
    if (!userInteracted) return;

    const encodedUrl = url ? encodeBase64(url) : "";
    const encodedBody = requestBody !== "{}" ? encodeBase64(requestBody) : "";

    const headersQueryParams = headers
      .filter((header) => header.key && header.value)
      .map(
        (header) =>
          `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`,
      )
      .join("&");

    const requestUrl = `/${method}${encodedUrl ? `/${encodedUrl}` : ""}${
      encodedBody ? `/${encodedBody}` : ""
    }${headersQueryParams ? `?${headersQueryParams}` : ""}`;

    if (window.location.pathname !== requestUrl) {
      window.history.replaceState(null, "", requestUrl);
    }
  };

  return { updateBrowserUrl };
};

export default useRequestUrlUpdater;
