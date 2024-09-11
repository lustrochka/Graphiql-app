import { useFormContext, Controller } from "react-hook-form";
import { useEffect } from "react";

const SDLInput: React.FC = () => {
  const { control, watch, setValue } = useFormContext();
  const DEFAULT_URL = "https://rickandmortyapi.com/graphql";

  const url = watch("url");

  useEffect(() => {
    if (url) {
      setValue("sdl", `${url}?sdl`);
    }
  }, [url]);

  return (
    <>
      <label htmlFor="sdl">SDL URL</label>
      <Controller
        name="sdl"
        control={control}
        defaultValue={`${DEFAULT_URL}?sdl`}
        render={({ field }) => <input type="text" {...field} />}
      />
    </>
  );
};

export default SDLInput;
