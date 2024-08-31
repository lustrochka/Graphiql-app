export const encodeBase64 = (input: string): string => {
  return encodeURIComponent(Buffer.from(input, "utf-8").toString("base64"));
};
