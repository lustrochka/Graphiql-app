import UrlInput from "../common/UrlInput/UrlInput";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { useChangeURL } from "../../hooks/useChangeURL";

interface HeadersWrapperProps {
  value: string;
}

const UrlWrapper: React.FC<HeadersWrapperProps> = ({ value }) => {
  const { setValue, getValues } = useFormContext();
  const [url, setUrl] = useState("");
  const { changeURL } = useChangeURL();

  useEffect(() => {
    if (value) {
      setUrl(value);
      setFormUrl(value);
    }
  }, [value]);

  const handleUrl = (url) => {
    setUrl(url);
    updateUrl(url);
    setFormUrl(url);
  };

  const updateUrl = (endpoint) => {
    const query = getValues("query");
    const variables = getValues("variables");
    changeURL({ url: endpoint, query, variables });
  };

  const setFormUrl = (newUrl) => setValue("url", newUrl);

  return (
    <>
      <UrlInput
        url={url}
        setUrl={(newUrl) => {
          handleUrl(newUrl);
        }}
      />
    </>
  );
};

export default UrlWrapper;