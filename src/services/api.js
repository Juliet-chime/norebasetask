export async function makeApiRequest({
  method = "GET",
  url,
  data = null,
  headers = {},
  params = {},
}) {
  const urlWithParams = new URL(url);
  Object.keys(params).forEach((key) =>
    urlWithParams.searchParams.append(key, params[key])
  );

  try {
    const response = await fetch(urlWithParams, {
      method,
      body: data && JSON.stringify(data),
      headers: { ...headers },
    });
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
