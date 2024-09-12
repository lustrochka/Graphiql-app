export const createObjectFromKeyValuePairs = (
  items: { key: string; value: string }[],
) => {
  return items.reduce(
    (acc, { key, value }) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
};
