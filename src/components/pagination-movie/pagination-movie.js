import { Pagination } from 'antd';
import { Component } from 'react';

import './pagination-movie.scss';

export default class PaginationMovie extends Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		const { onPaginationNumberSelected, totoalPages } = this.props;

		let showTotalPages = totoalPages;
		if (showTotalPages > 500) showTotalPages = 5000;

		return (
			<div className="pagination-movie">
				<Pagination onChange={onPaginationNumberSelected} defaultCurrent={1} total={showTotalPages} />
			</div>
		);
	}
}
