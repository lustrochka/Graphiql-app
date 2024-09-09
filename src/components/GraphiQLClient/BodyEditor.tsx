import { useFormContext, Controller } from "react-hook-form";
import { encodeBase64 } from "../../utils/encodeBase64";
import { useRouter } from "next/router";

const BodyEditor: React.FC = () => {
  const { control, getValues } = useFormContext();
  const DEFAULT_BODY = `
    query GetCharacter($id: ID!) {
      character(id: $id) {
        name
        species
      }
    }
    `;

  const router = useRouter();

  const updateUrl = (query) => {
    const queryParams = router.asPath.split("?")[1];
    const endpoint = encodeBase64(getValues("url"));
    const variables = getValues("variables");
    const body = encodeBase64(
      JSON.stringify({ query, ...(variables && { variables }) }),
    );
    const newURL = queryParams
      ? `/graphql/${endpoint}/${body}?${queryParams}`
      : `/graphql/${endpoint}/${body}`;
    router.replace({}, newURL, { shallow: true });
  };

  return (
    <>
      <label htmlFor="query">request</label>
      <Controller
        name="query"
        control={control}
        defaultValue={DEFAULT_BODY}
        render={({ field }) => (
          <textarea
            rows={15}
            cols={30}
            {...field}
            onBlur={(e) => {
              field.onChange(e);
              updateUrl(e.target.value);
            }}
          />
        )}
      />
    </>
  );
};

export default BodyEditor;
