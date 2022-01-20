export const fetchData = (uri) =>
  fetch(uri)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error));
