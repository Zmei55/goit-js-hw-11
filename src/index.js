import './css/styles.css';
import pictureCardTpl from './templates/gallery-card.hbs';
import NewsApiService from './js/pictures-service';
// import 'regenerator-runtime/runtime';
// import axios from 'axios';

// const KEY = '28160645-02600786ca706ffa5b60b520e';
// const BASE_URL = 'https://pixabay.com/api';

const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  picturesContainer: document.querySelector('.gallery'),
};

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
  newsApiService.fetchPictures().then(appendPicturesMarcup); // вызвали поиск из класса / нарисовали разметку
}

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  newsApiService.query = form.elements.searchQuery.value; // записали input в класс, с пом set

  if (newsApiService.query === '') {
    return console.log('Введи что-то нормальное');
  }

  newsApiService.resetPage();
  newsApiService
    .fetchPictures()
    .then(pictures => {
      clearPicturesContainer();
      appendPicturesMarcup(pictures);
      showLoadMoreBtn();
    }) // вызвали поиск из класса / удалили старую разметку / нарисовали разметку
    .catch(onFetchError)
    .finally(() => form.reset());
}

// processing resolve / обработка хорошего результата
function appendPicturesMarcup(pictures) {
  refs.picturesContainer.insertAdjacentHTML('beforeend', pictureCardTpl(pictures)); // добавляем разметку не перерисовывая разметку
}

// возвращает кнопку подгрузки
function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

// очищаем страницу перед новым поиском
function clearPicturesContainer() {
  refs.picturesContainer.innerHTML = '';
}

// processing reject / обработка плохого результата
function onFetchError(error) {
  console.log('Ошибка!');
}
