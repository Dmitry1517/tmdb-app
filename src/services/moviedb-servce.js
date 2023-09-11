export default class MoviedbService {
	optionsGET = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmRkMGMyNzY2MDExZDI0ZTA5NzgwMTM0ZjEzNTQyYSIsInN1YiI6IjY0ZGI1Y2Y2ZDEwMGI2MDBmZjBjY2MxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T9HzQHUZnt2GUtereFkuOxKSulsglLAjhUiFOZ4FP4c',
		},
	};

	expoptionsGET = {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
	};

	optionsPOST = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json;charset=utf-8',
		},
	};

	_baseURL = 'https://api.themoviedb.org/3/';
	apiKey = '5bdd0c2766011d24e09780134f13542a';

	// eslint-disable-next-line class-methods-use-this
	async getResource(url, method) {
		const res = await fetch(url, method);
		if (!res.ok) {
			throw new Error(res.status);
		}
		// eslint-disable-next-line
		return await res.json();
	}

	async getPopularMovie(page) {
		// eslint-disable-next-line
		return await this.getResource(`${this._baseURL}movie/popular?language=en-US&page=${page}`, this.optionsGET);
	}

	async getSerachMovie(movieName, page) {
		// eslint-disable-next-line
		return await this.getResource(
			`${this._baseURL}search/movie?query=${movieName}&include_adult=false&language=en-US&page=${page}`,
			this.optionsGET
		);
	}

	async getGenreMovie() {
		// eslint-disable-next-line no-return-await
		return await this.getResource(`${this._baseURL}genre/movie/list?language=en`, this.optionsGET);
	}

	async createGuestSession() {
		// eslint-disable-next-line no-return-await
		return await this.getResource(`${this._baseURL}authentication/guest_session/new`, this.optionsGET);
	}

	async addRatingMovie(moveiId, guestSessionId, value) {
		this.optionsPOST.body = `{"value":${value}}`;
		// eslint-disable-next-line no-return-await
		return await this.getResource(
			`${this._baseURL}movie/${moveiId}/rating?guest_session_id=${guestSessionId}&api_key=${this.apiKey}`,
			this.optionsPOST
		);
	}

	async getRatedMovies(guestSessionId, page) {
		// eslint-disable-next-line no-return-await
		return await this.getResource(
			`${this._baseURL}guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
			this.expoptionsGET
		);
	}
}
