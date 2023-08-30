export default class MoviedbService {
	options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzE0OTg4YWEzYjc3NDU5ZDA5MTY5YWVkZTYzZmVjOSIsInN1YiI6IjY0ZGI1Y2Y2ZDEwMGI2MDBmZjBjY2MxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kFxYtT6HbMSndlt2mcjKJT67QvIs2BRk7TGo0qHyKW4',
		},
	};

	_baseURL = 'https://api.themoviedb.org/3/';

	_serchMovie = 'search/movie?query=%22return%22&include_adult=false&language=en-US&page=1';

	async getResource(url) {
		const res = await fetch(url, this.options);
		if (!res.ok) {
			throw new Error(res.status);
		}
		// eslint-disable-next-line
		return await res.json();
	}

	async getPopularMovie(page) {
		// eslint-disable-next-line
		return await this.getResource(`${this._baseURL}movie/popular?language=en-US&page=${page}`);
	}

	async getSerachMovie(movieName, page) {
		// eslint-disable-next-line
		return await this.getResource(
			`${this._baseURL}search/movie?query=${movieName}&include_adult=false&language=en-US&page=${page}`
		);
	}
}
