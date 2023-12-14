import Notiflix from 'notiflix';
import { fetchPhoto } from './api';
import getRefs from './refs';
import { createMarkUp } from './markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});
const perPages = 40;
let page = 1;
let searchPhoto = '';

refs.btnLoading.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  refs.photoGallery.innerHTML = '';
  page = 1;
  const { searchQuery } = event.currentTarget.elements;
  const searchPhoto = searchQuery.value.toLowerCase().trim();
  if (searchPhoto === '') {
    Notiflix.Notify.info('Please, enter parameters for search');
    return;
  }
  fetchPhoto(searchPhoto, page, perPages)
    .then(data => {
      const result = data.hits;
      if (data.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
        createMarkUp(result);
      }
      if (data.totalHits > perPages) {
        refs.btnLoading.classList.remove('is-hidden');
      }
    })
    .catch(error => console.log(error.message));
  lightbox.refresh();

  refs.btnLoading.addEventListener('click', onClickLoading);
  event.currentTarget.reset();
}

function onClickLoading() {
  page += 1;
  fetchPhoto(searchPhoto, page, perPages)
    .then(data => {
      const searchResult = data.hits;
      const lastPage = Math.ceil(data.totalHits / perPages);
      createMarkUp(searchResult);
      if (page === lastPage) {
        refs.btnLoading.classList.add('.is-hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        refs.btnLoading.removeEventListener('click', onClickLoading);
      }
      lightbox.refresh();
    })
    .catch(onError);
}

function onError() {
  Notiflix.Notify.failure('Oops! Something went wrong. Please, try again.');
}
