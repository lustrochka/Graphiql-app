import VariablesEditor from "../common/VariablesEditor/VariablesEditor";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { useChangeURL } from "../../hooks/useChangeURL";

interface HeadersWrapperProps {
  value: { [key: string]: string };
}

const VariablesWrapper: React.FC<HeadersWrapperProps> = ({ value }) => {
  const { setValue, getValues } = useFormContext();
  const [variables, setVariables] = useState([]);
  const { changeURL } = useChangeURL();

  useEffect(() => {
    if (value) {
      const variablesArray = Object.entries(value).map(([key, value]) => {
        return { key, value };
      });
      setVariables(variablesArray);
      setFormVariables(variablesArray);
    }
  }, [value]);

  const handleVariables = (variables) => {
    setVariables(variables);
    const filteredVariables = variables.filter(
      ({ key, value }) => key && value,
    );
    updateUrl(filteredVariables);
    setFormVariables(filteredVariables);
  };

  const updateUrl = (variables) => {
    const endpoint = getValues("url");
    const query = getValues("query");
    changeURL({ variables, url: endpoint, query });
  };

  const setFormVariables = (newVariables) =>
    setValue("variables", newVariables);

  return (
    <>
      <VariablesEditor
        variables={variables}
        setVariables={(newVariables) => {
          handleVariables(newVariables);
        }}
      />
    </>
  );
};

export default VariablesWrapper;
