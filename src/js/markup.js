import getRefs from './refs';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

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
}
export { createMarkUp };
