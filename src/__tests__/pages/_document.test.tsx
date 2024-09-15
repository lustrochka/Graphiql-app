import MyDocument from "../../pages/_document";
import { DocumentContext } from "next/document";

describe("MyDocument", () => {
  it("should call getInitialProps and return initial props", async () => {
    const ctx = {} as DocumentContext;

    const mockGetInitialProps = jest
      .spyOn(MyDocument, "getInitialProps")
      .mockResolvedValue({
        html: "<html></html>",
        head: [],
        styles: [],
      });

    const initialProps = await MyDocument.getInitialProps(ctx);

    expect(initialProps).toBeDefined();
    expect(initialProps.html).toBe("<html></html>");

    mockGetInitialProps.mockRestore();
  });
});
