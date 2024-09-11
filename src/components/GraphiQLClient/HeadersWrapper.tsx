import { useRouter } from "next/router";
import HeadersEditor from "../common/HeadersEditor/HeadersEditor";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

const HeadersWrapper: React.FC = () => {
  const { setValue } = useFormContext();
  const router = useRouter();
  const [headers, setHeaders] = useState([]);

  const handleHeaders = (headers) => {
    setHeaders(headers);
    const filteredHeaders = headers.filter(({ key, value }) => key && value);
    updateUrl(filteredHeaders);
    setFormHeaders(filteredHeaders);
  };

  const updateUrl = (headers: { key: string; value: string }[]) => {
    const stringHeaders = new URLSearchParams(
      headers
        .filter(({ key, value }) => key && value)
        .map(({ key, value }) => [key, encodeURIComponent(value)]),
    ).toString();

    const newPath = `${router.asPath.split("?")[0]}?${stringHeaders}`;
    router.replace({}, newPath, { shallow: true });
  };

  const setFormHeaders = (newHeaders) => setValue("headers", newHeaders);

  return (
    <>
      <HeadersEditor
        headers={headers}
        setHeaders={(newHeaders) => {
          handleHeaders(newHeaders);
        }}
      />
    </>
  );
};

export default HeadersWrapper;
