import { encodeBase64 } from "../utils/encodeBase64";
import { useRouter } from "next/router";
import { Variable } from "../components/common/VariablesEditor/VariablesEditor";

type ChangeUrlParams = {
  variables: Variable[];
  query: string;
  url: string;
};

export function useChangeURL() {
  const router = useRouter();

  const changeURL = ({ variables, query, url }: ChangeUrlParams) => {
    const queryParams = router.asPath.split("?")[1];
    const endpoint = url ? encodeBase64(url) : encodeBase64("url");
    const variablesObject = variables.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});
    const body = encodeBase64(
      JSON.stringify({
        query,
        ...(variables && { variables: variablesObject }),
      }),
    );

    const newURL = queryParams
      ? `/graphiql/${endpoint}/${body}?${queryParams}`
      : `/graphiql/${endpoint}/${body}`;

    router.replace({}, newURL, { shallow: true });
  };

  return { changeURL };
}
