class ApiCall {
  //Returning data from urls
  constructor() {}

  async getApiData(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  }
}

export { ApiCall };
