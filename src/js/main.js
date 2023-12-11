import Notiflix from 'notiflix';
import { fetchPhoto } from './api';
import Notiflix from 'notiflix';
import getRefs from './refs';

const refs = getRefs();
let page = 1;
let perPage = 40;
let searchQuery = '';
refs.searchForm.addEventListener('submit', onSearch);
function onSearch(event) {
  event.preventDefault;

  page = 1;
  gallery.innerHTML = '';
  const form = event.currentTarget;
  const { searchQuery } = form.elements;
  keyOfSearchPhoto = searchQuery.value;
  console.log(keyOfSearchPhoto);
}
fetchPhoto(cat, 1, 40);
