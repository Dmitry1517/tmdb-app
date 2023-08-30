import { Component } from 'react';
import { debounce } from 'lodash';

import './app.scss';

import MovieCardList from '../movie-card-list/movie-card-list';
import SearchMovie from '../search-movie/search-movie';
import PaginationMovie from '../pagination-movie/pagination-movie';

export default class App extends Component {
	state = {
		selectedPage: 1,
		totoalPages: null,
		searchInputValue: this.updateSearchValue,
		afterDebounceInputValue: '',
	};

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
	}, 500);

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

	render() {
		const { selectedPage, searchInputValue, afterDebounceInputValue, totoalPages } = this.state;

		return (
			<>
				<SearchMovie getSearchValue={this.getSearchValue} searchInputValue={searchInputValue} />
				<MovieCardList
					selectedPage={selectedPage}
					searchInputValue={afterDebounceInputValue.trim()}
					getTotalPages={this.getTotalPages}
				/>
				<PaginationMovie onPaginationNumberSelected={this.onPaginationNumberSelected} totoalPages={totoalPages} />
			</>
		);
	}
}
