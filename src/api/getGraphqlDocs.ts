import axios from "axios";

export async function getGraphqlDocs(url) {
  try {
    const result = await axios.post(
      url,
      {
        query: `
                {
                    __schema {
                        types {
                            name
                            }
                        }
                    }
            `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!result.data.errors) {
      return JSON.stringify(result.data, null, 2);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching GraphQL documentation:", error);
    return null;
  }
}
