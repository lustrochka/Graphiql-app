import { useFormContext, Controller } from "react-hook-form";

const RequestBlock: React.FC = () => {
  const { control } = useFormContext();
  const DEFAULT_URL = "https://rickandmortyapi.com/graphql";
  const DEFAULT_BODY = `
    query GetCharacter($id: ID!) {
      character(id: $id) {
        name
        species
      }
    }
    `;
  const DEFAULT_VARIABLES = `{"id": 1}`;

  return (
    <div>
      <label htmlFor="url">url</label>
      <Controller
        name="url"
        control={control}
        defaultValue={DEFAULT_URL}
        render={({ field }) => <input type="text" {...field} />}
      />
      <label htmlFor="sdl">SDL URL</label>
      <Controller
        name="sdl"
        control={control}
        defaultValue={`${DEFAULT_URL}?sdl`}
        render={({ field }) => <input type="text" {...field} />}
      />
      <label htmlFor="query">request</label>
      <Controller
        name="query"
        control={control}
        defaultValue={DEFAULT_BODY}
        render={({ field }) => <textarea {...field} />}
      />
      <label htmlFor="variables">variables</label>
      <Controller
        name="variables"
        control={control}
        defaultValue={DEFAULT_VARIABLES}
        render={({ field }) => <textarea {...field} />}
      />
      <label htmlFor="headers">variables</label>
      <Controller
        name="headers"
        control={control}
        render={({ field }) => <textarea {...field} />}
      />
      <button type="submit">Send</button>
    </div>
  );
};

export default RequestBlock;
