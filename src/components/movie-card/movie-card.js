import './movie-card.scss';

import { Component } from 'react';
import { Card, Tag } from 'antd';
import { format } from 'date-fns';

export default class MovieCard extends Component {
	render() {
		const { backdropPath, title, overview, release } = this.props;
		const baseUrlPicture = 'https://image.tmdb.org/t/p/original';
		let description = overview;
		if (overview.length > 200) {
			description = overview.slice(0, 195);
			const lastSpace = description.lastIndexOf(' ');
			if (lastSpace > 0) {
				description = description.substr(0, lastSpace);
				description += ' ...';
			}
		}

		return (
			<div className="movie-card">
				<Card>
					<div className="movie-card__img">
						<img src={`${baseUrlPicture}${backdropPath}`} alt="Movie poster" />
					</div>
					<div className="movie-card__description discription-card">
						<h3 className="discription-card__titile">{title}</h3>
						<p className="discription-card__sub-titile">{format(new Date(release || '2000-01-01'), 'MMMM dd, yyyy')}</p>
						<div className="discription-card__genres genres-card">
							<Tag>Horror</Tag>
							<Tag>Action</Tag>
						</div>
						<p className="discription-card__text">{description}</p>
					</div>
				</Card>
			</div>
		);
	}
}
