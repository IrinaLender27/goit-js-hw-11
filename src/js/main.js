import Notiflix from 'notiflix';
import { fetchPhoto } from './api';
import getRefs from './refs';
import { createMarkUp } from './markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();
let page = 1;
let perPage = 40;
let q = '';
refs.btnLoading.classList.add('is-hidden');
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  page = 1;
  refs.photoGallery.innerHTML = '';
  const form = event.currentTarget;
  const { searchQuery } = form.elements;
  q = searchQuery.value.toLowerCase().trim();
  if (q === '') {
    Notiflix.Notify.info('Please, enter parameters');
    return;
  }
  fetchPhoto(q, page, perPage)
    .then(data => {
      const result = data.hits;
      if (totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
        createMarkUp(result);
      }
      if (data.totalHits > perPage) {
        refs.btnLoading.classList.remove('is-hidden');
      }
    })
    .catch(error => onError);
  refs.btnLoading.addEventListener('click', onClickLoading);
  event.currentTarget.reset();
}

function onClickLoading() {
  page += 1;
}
function onError() {
  Notiflix.Notify.failure('Oops! Something went wrong. Please, try again.');
}
