const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function makeRequest({
  method = "GET",
  url,
  data = null,
  headers = {},
  params = {},
}) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = `https://api.coinlore.net/api/${url}`;

  const urlWithParams = new URL(proxyUrl + apiUrl);
  Object.keys(params).forEach((key) =>
    urlWithParams.searchParams.append(key, params[key])
  );

  try {
    const response = await fetch(urlWithParams, {
      method,
      body: data && JSON.stringify(data),
      headers: { ...defaultHeaders, ...headers },
    });
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
