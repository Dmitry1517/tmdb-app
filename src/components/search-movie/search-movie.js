import { Component } from 'react';
import { Input } from 'antd';

import './search-movie.scss';

export default class SearchMovie extends Component {
	onSubmit = (e) => {
		e.preventDefault();
	};

	render() {
		const { getSearchValue, searchInputValue } = this.props;

		return (
			<form className="form-serch-movie" onSubmit={this.onSubmit}>
				<Input
					className="form-serch-movie__input"
					placeholder="Type to search..."
					onChange={getSearchValue}
					value={searchInputValue}
				/>
			</form>
		);
	}
}
