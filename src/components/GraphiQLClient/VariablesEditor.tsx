import { useFormContext, Controller } from "react-hook-form";
import { encodeBase64 } from "../../utils/encodeBase64";
import { useRouter } from "next/router";

const VariablesEditor: React.FC = () => {
  const { control, getValues } = useFormContext();
  const DEFAULT_VARIABLES = `{"id": 1}`;

  const router = useRouter();

  const updateUrl = (variables) => {
    const queryParams = router.asPath.split("?")[1];
    const endpoint = encodeBase64(getValues("url"));
    const query = getValues("query");
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
      <label htmlFor="variables">variables</label>
      <Controller
        name="variables"
        control={control}
        defaultValue={DEFAULT_VARIABLES}
        render={({ field }) => (
          <textarea
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

export default VariablesEditor;
