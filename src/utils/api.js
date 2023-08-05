const api = async ({url, method, body}) => {
  const requestOptions = {
    method: method || (body ? "POST" : "GET")
  };

  if (body) {
    requestOptions.headers['Content-Type'] = 'application/json';
    requestOptions.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export default api;