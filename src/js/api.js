import axios from 'axios';
async function fetchPhoto(query = '', page = '') {
  const BASE_URL = 'https://pixabay.com/api';
  const params = new URLSearchParams({
    key: '41202570-10156722b13631e5607e239c2',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  });
  return await axios
    .get(`${BASE_URL}/?${params}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      error.message;
    });
}

console.log(fetchPhoto());
export { fetchPhoto };
