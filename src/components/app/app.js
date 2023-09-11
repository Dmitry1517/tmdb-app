/* eslint-disable react/button-has-type */
import { Component } from 'react';
import { debounce } from 'lodash';
import { Tabs } from 'antd';

import './app.scss';

import MovieCardList from '../movie-card-list/movie-card-list';
import SearchMovie from '../search-movie/search-movie';
import PaginationMovie from '../pagination-movie/pagination-movie';
import { GenreProvider } from '../moviedb-servce-context/moviedb-servce-context';
import MoviedbService from '../../services/moviedb-servce';

export default class App extends Component {
	state = {
		selectedPage: 1,
		totoalPages: null,
		searchInputValue: this.updateSearchValue,
		afterDebounceInputValue: '',
		genres: [],
		guestSession: null,
		isTabRated: false,
	};

	movieDataService = new MoviedbService();

	// Получение зн. из посковой строки
	getSearchValue = (e) => {
		this.setState({
			searchInputValue: e.target.value,
		});
		this.debounceLoading(e.target.value);
	};

	// debounce
	debounceLoading = debounce((value) => {
		this.setState({
			afterDebounceInputValue: value,
		});
	}, 250);

	// Кол-во страниц
	getTotalPages = (data) => {
		this.setState({
			totoalPages: data.total_pages * 10,
		});
	};

	// Выбранная страница
	onPaginationNumberSelected = (page) => {
		this.setState({ selectedPage: page });
	};

	componentDidMount() {
		// Получаем жанры
		this.movieDataService.getGenreMovie().then((res) => this.setState({ genres: res.genres }));
		// создаём гостевую сессию
		this.movieDataService.createGuestSession().then((res) => this.setState({ guestSession: res.guest_session_id }));
	}

	getMovieRating = (ratintMovie, idMovie) => {
		const { guestSession } = this.state;
		this.movieDataService.addRatingMovie(ratintMovie, guestSession, idMovie);
	};

	onRated = (value) => {
		this.setState({ isTabRated: value });
	};

	render() {
		const { selectedPage, searchInputValue, afterDebounceInputValue, totoalPages, genres, isTabRated, guestSession } =
			this.state;

		const items = [
			{
				key: false,
				label: 'Search',
				children: (
					<>
						<SearchMovie getSearchValue={this.getSearchValue} searchInputValue={searchInputValue} />
						<MovieCardList
							selectedPage={selectedPage}
							searchInputValue={afterDebounceInputValue.trim()}
							getTotalPages={this.getTotalPages}
							getMovieRating={this.getMovieRating}
							getIdMovie={this.getIdMovie}
							isTabRated={isTabRated}
							guestSession={guestSession}
						/>
						<PaginationMovie onPaginationNumberSelected={this.onPaginationNumberSelected} totoalPages={totoalPages} />
					</>
				),
			},
			{
				key: true,
				label: 'Rated',
				children: (
					<>
						<MovieCardList
							selectedPage={selectedPage}
							searchInputValue={afterDebounceInputValue.trim()}
							getTotalPages={this.getTotalPages}
							getMovieRating={this.getMovieRating}
							getIdMovie={this.getIdMovie}
							isTabRated={isTabRated}
							guestSession={guestSession}
						/>
						<PaginationMovie onPaginationNumberSelected={this.onPaginationNumberSelected} totoalPages={totoalPages} />
					</>
				),
			},
		];

		return (
			<GenreProvider value={genres}>
				<Tabs
					defaultActiveKey="1"
					items={items}
					onChange={this.onRated}
					centered="true"
					destroyInactiveTabPane="true"
				/>
			</GenreProvider>
		);
	}
}
