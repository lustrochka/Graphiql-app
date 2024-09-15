import BodyEditor from "../common/BodyEditor/BodyEditor";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { useChangeURL } from "../../hooks/useChangeURL";

interface HeadersWrapperProps {
  value: string;
}

const BodyWrapper: React.FC<HeadersWrapperProps> = ({ value }) => {
  const { setValue, getValues } = useFormContext();
  const [body, setBody] = useState<string>("");
  const { changeURL } = useChangeURL();

  useEffect(() => {
    if (value) {
      setBody(value);
      setFormBody(value);
    }
  }, [value]);

  const handleBody = (body: string) => {
    setBody(body);
    updateUrl(body);
    setFormBody(body);
  };

  const updateUrl = (query: string) => {
    const endpoint = getValues("url");
    const variables = getValues("variables");
    changeURL({ query, url: endpoint, variables });
  };

  const setFormBody = (newBody: string) => setValue("query", newBody);

  return (
    <>
      <BodyEditor
        body={body}
        setBody={(newBody) => {
          handleBody(newBody);
        }}
      />
    </>
  );
};

export default BodyWrapper;
