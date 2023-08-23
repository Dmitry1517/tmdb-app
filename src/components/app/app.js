import { Component } from "react";
import React from "react";

import "./app.scss";

import MovieCardList from "../movie-card-list/movie-card-list";

export default class App extends Component {
  render() {
    return (
      <>
        <MovieCardList />
      </>
    );
  }
}
