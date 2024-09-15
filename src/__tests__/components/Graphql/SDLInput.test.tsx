import React from "react";
import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import SDLInput from "../../../components/GraphiQLClient/SdlInput";
import { useEffect } from "react";

const url = "https://url.com";

const Form: React.FC<{ value: string }> = ({ value }) => {
  const methods = useForm();
  const { setValue } = methods;

  useEffect(() => {
    setValue("url", value);
  }, []);

  return (
    <FormProvider {...methods}>
      <SDLInput />
    </FormProvider>
  );
};

test("updates sdl value when url value changing", () => {
  render(<Form value={url} />);

  const sdlInput = screen.getByRole("textbox") as HTMLInputElement;

  expect(sdlInput.value).toBe(`${url}?sdl`);
});

test("correctly handles empty url value", () => {
  render(<Form value="" />);

  const sdlInput = screen.getByRole("textbox") as HTMLInputElement;

  expect(sdlInput.value).toBe("");
});
