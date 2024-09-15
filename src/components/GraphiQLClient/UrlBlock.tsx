import { useFormContext, Controller } from "react-hook-form";
import { useChangeURL } from "../../hooks/useChangeURL";

const UrlBlock: React.FC = () => {
  const { control, getValues } = useFormContext();
  const { changeURL } = useChangeURL();
  const DEFAULT_URL = "https://rickandmortyapi.com/graphql";

  const updateUrl = (endpoint: string) => {
    const query = getValues("query");
    const variables = getValues("variables");
    changeURL({ url: endpoint, query, variables });
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
