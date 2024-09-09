import { useFormContext, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";

const HeadersEditor: React.FC = () => {
  const { control, setValue } = useFormContext();
  const [error, setError] = useState("");

  const router = useRouter();

  const updateUrl = (headers) => {
    console.log(headers);
    try {
      const parsedHeaders = JSON.parse(headers);
      setError("");
      Object.keys(parsedHeaders).forEach(
        (key: string) =>
          (parsedHeaders[key] = encodeURIComponent(parsedHeaders[key])),
      );

      const stringHeaders = new URLSearchParams(
        Object.entries(parsedHeaders),
      ).toString();

      const newPath = `${router.asPath.split("?")[0]}?${stringHeaders}`;
      console.log(newPath);
      router.replace({}, newPath, { shallow: true });
      //setValue("headers", headers);
    } catch {
      setError("Headers should be in JSON format");
    }
  };

  return (
    <>
      <label htmlFor="headers">headers</label>
      <Controller
        name="headers"
        control={control}
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
      <div>{error}</div>
    </>
  );
};

export default HeadersEditor;
