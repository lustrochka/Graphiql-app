import { useFormContext, Controller } from "react-hook-form";
import { useEffect } from "react";
import styles from "../common/UrlInput/UrlInput.module.css";

const SDLInput: React.FC = () => {
  const { control, watch, setValue, getValues } = useFormContext();

  const url = watch("url");
  const defaultValue = getValues("url") ? `${getValues("url")}?sdl` : "";

  useEffect(() => {
    if (url) {
      setValue("sdl", `${url}?sdl`);
    }
  }, [url]);

  return (
    <div>
      <label htmlFor="sdl">SDL URL</label>
      <Controller
        name="sdl"
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <input type="text" {...field} className={styles.urlInput} />
        )}
      />
    </div>
  );
};

export default SDLInput;
