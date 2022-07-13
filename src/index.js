import './css/styles.css';
import pictureCardTpl from './templates/gallery-card.hbs';

const KEY = '28160645-02600786ca706ffa5b60b520e';
const BASE_URL = 'https://pixabay.com/api';

const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  articlesContainer: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore() {}

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.elements.searchQuery.value;

  fetchPictures(searchQuery)
    .then(renderCard)
    .catch(onFetchError)
    .finally(() => form.reset());
}

// fetch / запрос
function fetchPictures(searchValue) {
  const url = `${BASE_URL}/?key=${KEY}&q=${searchValue}&page=1&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url).then(r => {
    if (r.ok) {
      return r.json();
    }

    if (r === '') {
      return console.log(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    throw Error();
  });
}

// processing resolve / обработка хорошего результата
function renderCard(picture) {
  const markup = pictureCardTpl(picture.hits);
  refs.articlesContainer.innerHTML = markup;
}

// processing reject / обработка плохого результата
function onFetchError(error) {
  console.log('Ошибка!');
}
