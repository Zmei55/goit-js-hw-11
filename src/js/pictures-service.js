import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '28160645-02600786ca706ffa5b60b520e';
const BASE_URL = 'https://pixabay.com/api';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`;

    try {
      const response = await axios.get(url);
      const pictures = response.data.hits;

      this.incrementPage();

      if (pictures.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      return pictures;
    } catch (error) {
      return Notiflix.Notify.failure('Ошибка! 1', error);
    }
  }

  incrementPage() {
    this.page += 1; // увел page на 1
  }

  resetPage() {
    this.page = 1; // сброс page при новом поиске
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery.trim(); // записали input и убрали пробелы
  }
}

// .finally(() => form.reset());
