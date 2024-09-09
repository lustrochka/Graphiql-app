import { useFormContext, Controller } from "react-hook-form";
import { encodeBase64 } from "../../utils/encodeBase64";
import { useRouter } from "next/router";

const UrlBlock: React.FC = () => {
  const { control, getValues } = useFormContext();
  const DEFAULT_URL = "https://rickandmortyapi.com/graphql";

  const router = useRouter();

  const updateUrl = (endpoint) => {
    const queryParams = router.asPath.split("?")[1];
    const query = getValues("query");
    const variables = getValues("variables");
    const body = encodeBase64(
      JSON.stringify({ query, ...(variables && { variables }) }),
    );
    const newURL = queryParams
      ? `/graphql/${encodeBase64(endpoint)}/${body}?${queryParams}`
      : `/graphql/${encodeBase64(endpoint)}/${body}`;
    router.replace({}, newURL, { shallow: true });
  };

  return (
    <>
      <label htmlFor="url">url</label>
      <Controller
        name="url"
        control={control}
        defaultValue={DEFAULT_URL}
        render={({ field }) => (
          <input
            type="text"
            {...field}
            onChange={(e) => {
              field.onChange(e);
              updateUrl(e.target.value);
            }}
          />
        )}
      />
    </>
  );
};

export default UrlBlock;
