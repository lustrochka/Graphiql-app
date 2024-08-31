export const decodeBase64 = (input: string): string => {
  return Buffer.from(decodeURIComponent(input), "base64").toString("utf-8");
};
