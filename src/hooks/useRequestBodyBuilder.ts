import { Variable } from "../components/common/VariablesEditor/VariablesEditor";

const useRequestBodyBuilder = (variables: Variable[]) => {
  const buildRequestBody = () => {
    const bodyObject = variables.reduce(
      (acc, variable) => {
        acc[variable.key] = variable.value;
        return acc;
      },
      {} as Record<string, string>,
    );

    return JSON.stringify(bodyObject);
  };

  return { buildRequestBody };
};

export default useRequestBodyBuilder;
