import "./movie-card-list.scss";

import { Component } from "react";
import MovieCard from "../movie-card/movie-card";
import MoviedbService from "../../services/moviedb-servce";
import { Alert, Space, Spin } from "antd";

export default class MovieCardList extends Component {
  movieData = new MoviedbService();

  state = {
    isLoaded: false,
    isError: false,
    items: [],
  };

  updateMovie(data) {
    this.setState({
      isLoaded: true,
      items: data.results,
    });
  }

  onError(data) {
    this.setState({
      isError: true,
      isLoaded: false,
    });
    console.log(data);
  }

  componentDidMount() {
    this.movieData
      .getMovie()
      .then((res) => this.updateMovie(res))
      .catch((err) => this.onError(err));
  }

  render() {
    const { items, isLoaded, isError } = this.state;
    const hasData = !(isLoaded || isError);

    const loading = hasData ? <PrintLoading /> : null;
    const content = isLoaded ? <PrintMovie items={items} /> : null;
    const error = isError ? <PrintError /> : null;

    return (
      <div className="movie-card-list">
        {loading}
        {error}
        {content}
      </div>
    );
  }
}

const PrintMovie = ({ items }) => {
  return items.map((movieData) => {
    return (
      <MovieCard
        key={movieData.id}
        backdropPath={movieData.backdrop_path}
        title={movieData.title}
        overview={movieData.overview}
        release={movieData.release_date}
      />
    );
  });
};

const PrintLoading = () => {
  return (
    <div className="movie-card-list-loading ">
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </div>
  );
};

const PrintError = () => {
  return (
    <div className="movie-card-list-loading ">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Alert
          message="Статус 404"
          showIcon
          description="Ошибка при запросе. Обновите страницу"
          type="error"
        />
      </Space>
    </div>
  );
};
