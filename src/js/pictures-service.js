const API_KEY = '28160645-02600786ca706ffa5b60b520e';
const BASE_URL = 'https://pixabay.com/api';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw Error();
      })
      .then(({ hits }) => {
        this.incrementPage(); // если всё норм, то увел на 1

        if (hits.length === 0) {
          return console.log(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        return hits; // деструктуризированный контейнер с картинками
      });
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
