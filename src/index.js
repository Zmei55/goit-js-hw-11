import './css/styles.css';
import pictureCardTpl from './templates/gallery-card.hbs';

const KEY = '28160645-02600786ca706ffa5b60b520e';
const BASE_URL = 'https://pixabay.com/api';

const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('button.load-more'),
  articlesContainer: document.querySelector('.gallery'),
};

fetchPictures('cat').then(renderCard).catch(console.log);

function fetchPictures(searchValue) {
  return fetch(
    `${BASE_URL}/?key=${KEY}&q=${searchValue}&page=1&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(r => r.json());
}

function renderCard(picture) {
  const markup = pictureCardTpl(picture.hits);
  refs.articlesContainer.innerHTML = markup;
}
