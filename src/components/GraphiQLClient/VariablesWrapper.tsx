import VariablesEditor from "../common/VariablesEditor/VariablesEditor";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { useChangeURL } from "../../hooks/useChangeURL";

interface HeadersWrapperProps {
  value: { [key: string]: string };
}

interface Variable {
  key: string;
  value: string;
}

const VariablesWrapper: React.FC<HeadersWrapperProps> = ({ value }) => {
  const { setValue, getValues } = useFormContext();
  const [variables, setVariables] = useState<Variable[]>([]);
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

  const handleVariables = (variables: Variable[]) => {
    setVariables(variables);
    const filteredVariables = variables.filter(
      ({ key, value }) => key && value,
    );
    updateUrl(filteredVariables);
    setFormVariables(filteredVariables);
  };

  const updateUrl = (variables: Variable[]) => {
    const endpoint = getValues("url");
    const query = getValues("query");
    changeURL({ variables, url: endpoint, query });
  };

  const setFormVariables = (newVariables: Variable[]) =>
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
