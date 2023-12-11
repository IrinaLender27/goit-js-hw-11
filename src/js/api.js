import axios from 'axios';
import { Notify } from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41202570-10156722b13631e5607e239c2';

async function fetchPhoto(q, page, perPage) {
  try {
    const response = await axios.get(
      '${BASE_URL}?key=${API_KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true'
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { fetchPhoto };
