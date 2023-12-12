import getRefs from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();
function createMarkUp(arr) {
  const markUp = arr.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<div class="photo-card">
      <a class="large_image" href ="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" width = "300" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${downloads}</b>
    </p>
  </div>
</div>`;
    }
  );
  refs.photoGallery.insertAdjacentHTML('beforeend', markUp.join(''));

  const lightbox = $('.gallery a').simpleLightbox({
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });
}

export { createMarkUp };
