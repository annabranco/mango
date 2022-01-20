export const fetchData = (uri) =>
  fetch(uri)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) =>
      console.warn(`Failed to fetch data from ${uri}. Using default values.`)
    );
