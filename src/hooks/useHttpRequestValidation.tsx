import { useMemo } from "react";

type ValidationError = {
  field: string;
  message: string;
};

const useHttpRequestValidation = (
  url: string,
  headers: { key: string; value: string }[] = [],
  variables: { key: string; value: string }[] = [],
  body: string,
  isMethodWithBody: boolean,
  requiredHeaders: string[] = [],
) => {
  return useMemo(() => {
    const validationErrors: ValidationError[] = [];

    const validateUrl = (url: string) => {
      const urlPattern =
        /^(https?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-_~:/?#[\]@!$&'()*+,;=.]+$/;

      if (!urlPattern.test(url)) {
        validationErrors.push({
          field: "url",
          message: "Invalid URL. Please enter a valid URL.",
        });
      }
    };

    const validateHeaders = (headers: { key: string; value: string }[]) => {
      headers.forEach((header, index) => {
        if (header.key.trim() === "") {
          validationErrors.push({
            field: `headers[${index}]`,
            message: `Header at position ${index + 1} has an empty key.`,
          });
        } else if (!/^[a-zA-Z0-9_-]+$/.test(header.key)) {
          validationErrors.push({
            field: `headers[${index}]`,
            message: `Header at position ${index + 1} must only contain letters, numbers, underscores, or hyphens.`,
          });
        }
      });

      requiredHeaders.forEach((requiredHeader) => {
        if (!headers.some((header) => header.key === requiredHeader)) {
          validationErrors.push({
            field: `headers.${requiredHeader}`,
            message: `Missing required header: ${requiredHeader}.`,
          });
        }
      });
    };

    const validateVariables = (variables: { key: string; value: string }[]) => {
      variables.forEach((variable, index) => {
        if (variable.key.trim() === "") {
          validationErrors.push({
            field: `variables[${index}]`,
            message: `Variable at position ${index + 1} has an empty key.`,
          });
        } else if (!/^[a-zA-Z0-9_-]+$/.test(variable.key)) {
          validationErrors.push({
            field: `variables[${index}]`,
            message: `Variable at position ${index + 1} must only contain letters, numbers, underscores, or hyphens.`,
          });
        }
      });
    };

    const validateBody = (body: string, isMethodWithBody: boolean) => {
      if (isMethodWithBody && body) {
        try {
          JSON.parse(body);
        } catch (error) {
          validationErrors.push({
            field: "body",
            message: "Invalid JSON in the request body.",
          });
        }
      }
    };

    validateUrl(url);
    validateHeaders(headers);
    validateVariables(variables);
    validateBody(body, isMethodWithBody);

    return validationErrors;
  }, [url, headers, variables, body, isMethodWithBody, requiredHeaders]);
};

export default useHttpRequestValidation;
