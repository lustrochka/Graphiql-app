import { encodeBase64 } from "../utils/encodeBase64";
import { useRouter } from "next/router";

type ChangeUrlParams = {
  variables: string;
  query: string;
  url: string;
};

export function useChangeURL() {
  const router = useRouter();

  const changeURL = ({ variables, query, url }: ChangeUrlParams) => {
    const queryParams = router.asPath.split("?")[1];
    const endpoint = encodeBase64(url);
    const body = encodeBase64(
      JSON.stringify({ query, ...(variables && { variables }) }),
    );

    const newURL = queryParams
      ? `/graphql/${endpoint}/${body}?${queryParams}`
      : `/graphql/${endpoint}/${body}`;

    router.replace({}, newURL, { shallow: true });
  };

  return { changeURL };
}
