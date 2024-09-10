import { useFormContext, Controller } from "react-hook-form";
import { useChangeURL } from "../../hooks/changeURL";

const VariablesEditor: React.FC = () => {
  const { control, getValues } = useFormContext();
  const { changeURL } = useChangeURL();
  const DEFAULT_VARIABLES = `{"id": 1}`;

  const updateUrl = (variables) => {
    const endpoint = getValues("url");
    const query = getValues("query");
    changeURL({ variables, url: endpoint, query });
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
