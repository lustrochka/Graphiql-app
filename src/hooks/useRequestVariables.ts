import { useState } from "react";
import { Variable } from "../components/common/VariablesEditor/VariablesEditor";

const useRequestVariables = () => {
  const [variables, setVariables] = useState<Variable[]>([]);

  const addVariable = (key: string, value: string) => {
    setVariables([...variables, { key, value }]);
  };

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  return {
    variables,
    setVariables,
    addVariable,
    removeVariable,
  };
};

export default useRequestVariables;
