/* eslint-disable indent */
import './movie-card.scss';

import { Component } from 'react';
import { Card, Tag, Rate } from 'antd';
import { format } from 'date-fns';

// eslint-disable-next-line import/named
import { GenreConsumer } from '../moviedb-servce-context/moviedb-servce-context';

export default class MovieCard extends Component {
	render() {
		const { backdropPath, title, overview, release, rating, genre, getMovieRating, getRating } = this.props;
		const baseUrlPicture = 'https://image.tmdb.org/t/p/original';

		// 3 точки в конце описания
		let description = overview;
		if (overview.length > 200) {
			if (genre.length > 3) description = overview.slice(0, 175);
			else description = overview.slice(0, 195);
			const lastSpace = description.lastIndexOf(' ');
			if (lastSpace > 0) {
				description = description.substr(0, lastSpace);
				description += ' ...';
			}
		}

		// Изминение цвета рейтинга
		let colorRating = 'rating__color-red';
		if (rating > 3 && rating < 5) colorRating = 'rating__color-orange';
		else if (rating > 5 && rating < 7) colorRating = 'rating__color-yellow';
		else colorRating = 'rating__color-green';

		return (
			<GenreConsumer>
				{(genres) => (
					// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
					<div className="movie-card">
						<Card>
							<div className="movie-card__img">
								<img src={`${baseUrlPicture}${backdropPath}`} alt="Movie poster" />
							</div>
							<div className="movie-card__description discription-card">
								<div className="rating">
									<div className={`rating__text ${colorRating}`}>{rating.toFixed(1)}</div>
								</div>
								<h3 className="discription-card__titile" title={title}>
									{title}
								</h3>
								<p className="discription-card__sub-titile">
									{format(new Date(release || '2000-01-01'), 'MMMM dd, yyyy')}
								</p>
								<div className="discription-card__genres">
									{genre.map((el) => {
										// eslint-disable-next-line array-callback-return, consistent-return
										const textGenre = genres.find((gen) => {
											if (gen.id === el) return gen.name;
										});
										if (textGenre !== undefined) return <Tag key={el}>{textGenre.name}</Tag>;
										// eslint-disable-next-line no-else-return
										else return <Tag key={el}>{null}</Tag>;
									})}
								</div>
								<p className="discription-card__text">{description}</p>
								<Rate count={10} onChange={getMovieRating} defaultValue={getRating} onFocus={this.cl} />
							</div>
						</Card>
					</div>
				)}
			</GenreConsumer>
		);
	}
}
