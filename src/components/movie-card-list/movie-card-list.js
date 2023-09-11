import './movie-card-list.scss';

import { Component } from 'react';
import { Alert, Space, Spin } from 'antd';

import MovieCard from '../movie-card/movie-card';
import MoviedbService from '../../services/moviedb-servce';
import OfflineMessage from '../offline-message/offline-message';

export default class MovieCardList extends Component {
	movieData = new MoviedbService();

	state = {
		isLoaded: false,
		isError: false,
		isDisconected: false,
		items: [],
	};

	updateMovieData(data) {
		const { getTotalPages } = this.props;

		this.setState({
			isLoaded: true,
			items: data.results,
		});
		getTotalPages(data);
	}

	onError(data) {
		if (data.message === '404') {
			this.setState({
				isError: true,
			});
		}
		this.setState({
			isDisconected: true,
		});
	}

	updatesMovie() {
		const { selectedPage, searchInputValue, isTabRated, guestSession } = this.props;

		if (isTabRated) {
			this.movieData
				.getRatedMovies(guestSession, selectedPage)
				.then((res) => this.updateMovieData(res))
				.catch((err) => this.onError(err));
		} else if (searchInputValue === undefined || searchInputValue === '') {
			this.movieData
				.getPopularMovie(selectedPage)
				.then((res) => this.updateMovieData(res))
				.catch((err) => this.onError(err));
		} else {
			this.movieData
				.getSerachMovie(searchInputValue, selectedPage)
				.then((res) => this.updateMovieData(res))
				.catch((err) => this.onError(err));
		}
	}

	componentDidMount() {
		this.updatesMovie();
	}

	componentDidUpdate(prevProps) {
		const { selectedPage, searchInputValue } = this.props;
		if (selectedPage !== prevProps.selectedPage) {
			this.setState({ isLoaded: false });
			this.updatesMovie();
		}
		if (searchInputValue !== prevProps.searchInputValue) {
			this.updatesMovie();
		}
	}

	render() {
		const { items, isLoaded, isError, isDisconected } = this.state;
		const { getMovieRating, getIdMovie, isTabRated } = this.props;

		const downloadsData = !(isLoaded || isDisconected || isError);
		const showLoading = downloadsData ? <PrintLoading /> : null;

		const showDisconected = isDisconected ? <PrintDisconected /> : null;

		const showError = isError ? <PrintError /> : null;

		const showInfoNoData = !isTabRated && items.length === 0 && !downloadsData ? <PrintInfoNoData /> : null;
		const showInfoNoRatedMovie = isTabRated && items.length === 0 && !downloadsData ? <PrintInfoNoRatedMovie /> : null;

		const showMovie = isLoaded ? (
			<PrintMovie items={items} getMovieRating={getMovieRating} getIdMovie={getIdMovie} />
		) : null;
		return (
			<div className="movie-card-list">
				<OfflineMessage />
				{showInfoNoData}
				{showInfoNoRatedMovie}
				{showLoading}
				{showError}
				{showDisconected}
				{showMovie}
			</div>
		);
	}
}

function PrintMovie({ items, getMovieRating }) {
	return items.map((movieData) => (
		<MovieCard
			key={movieData.id}
			backdropPath={movieData.backdrop_path}
			title={movieData.title}
			overview={movieData.overview}
			release={movieData.release_date}
			rating={movieData.vote_average}
			genre={movieData.genre_ids}
			getRating={movieData.rating}
			getMovieRating={(rating) => getMovieRating(movieData.id, rating)}
		/>
	));
}

function PrintLoading() {
	return (
		<div className="movie-card-list-loading ">
			<Spin tip="Loading" size="large">
				<div className="content" />
			</Spin>
		</div>
	);
}

function PrintError() {
	return (
		<div className="movie-card-list-loading ">
			<Space direction="vertical" style={{ width: '100%' }}>
				<Alert message="Статус 404" showIcon description="Ошибка при запросе. Обновите страницу" type="error" />
			</Space>
		</div>
	);
}

function PrintDisconected() {
	return (
		<div className="movie-card-list-loading ">
			<Space direction="vertical" style={{ width: '100%' }}>
				<Alert
					message="Нет интернета"
					showIcon
					description="К содержанию, не удалось обработать Ваш запрос, проверьте интернет соединение и настройку VPN для работы с сервисом"
					type="error"
				/>
			</Space>
		</div>
	);
}

function PrintInfoNoData() {
	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<Alert
				showIcon
				description="Нет фильма с таким названием. Проверьте название или ищите в другом месте :)"
				type="info"
			/>
		</Space>
	);
}

function PrintInfoNoRatedMovie() {
	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<Alert
				showIcon
				description="Тут ещё нет оценённых фильмов. Возможно мы не получили вашу оценку, попробуйте зайти немного позже"
				type="info"
			/>
		</Space>
	);
}
