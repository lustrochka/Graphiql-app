import { useFormContext, Controller } from "react-hook-form";
import { useChangeURL } from "../../hooks/changeURL";

const BodyEditor: React.FC = () => {
  const { control, getValues } = useFormContext();
  const { changeURL } = useChangeURL();
  const DEFAULT_BODY = `
    query GetCharacter($id: ID!) {
      character(id: $id) {
        name
        species
      }
    }
    `;

  const updateUrl = (query) => {
    const endpoint = getValues("url");
    const variables = getValues("variables");
    changeURL({ query, url: endpoint, variables });
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
