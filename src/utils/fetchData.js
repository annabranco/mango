export const fetchData = (uri) => (callback) => {
  fetch(uri)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.success) {
        callback(jsonResponse.data);
      } else {
        console.warn(`Failed to fetch data from ${uri}. Using default values.`);
      }
    })
    .catch((error) => {});
};
