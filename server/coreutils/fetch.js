import { ApiError } from "./error";
async function fetch(route, queryParams = {},options = {}) {
  try {
    let url= route;
    if (queryParams) {
      const queryString = new URLSearchParams(queryParams).toString();
      url = queryString ?  (route+'?'+queryString) : route;
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new ApiError('Error occured while rest api call', response.status);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}


export { fetch };