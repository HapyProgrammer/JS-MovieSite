import React, { Component } from "react";
import Movie from "./movie";
import $ from "jquery";
import "./moviestyle.css";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.PerformSearch("");
  }

  PerformSearch(searchThis) {
    let urlString;
    if (searchThis === "today") {
      urlString =
        "https://api.themoviedb.org/3/trending/movie/day?api_key=8dcc8f59a2c1968b0b281498347d6305";
    } else if (searchThis === "week") {
      urlString =
        "https://api.themoviedb.org/3/trending/movie/week?api_key=8dcc8f59a2c1968b0b281498347d6305";
    } else if (searchThis) {
      urlString =
        "https://api.themoviedb.org/3/search/movie?api_key=8dcc8f59a2c1968b0b281498347d6305&query=" +
        searchThis;
    } else {
      urlString =
        "https://api.themoviedb.org/3/trending/movie/day?api_key=8dcc8f59a2c1968b0b281498347d6305";
    }
    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log("fetch data");
        const result = searchResults.results;
        let movieRows = [];

        result.forEach(movie => {
          const movieRow = <Movie movie={movie} key={movie.id} />;
          movieRows.push(movieRow);
        });
        this.setState({ movieState: movieRows });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  handleSearchChange(event) {
    const searchTerm = event.target.value;
    this.PerformSearch(searchTerm);
  }

  render() {
    return (
      <div>
        <div className="searchOptions">
          <h1>Movies</h1>
          <div className="filter">
            <div className="viewTrending">
              <h3>Trending</h3>
              <select
                name="timeTrending"
                onChange={this.handleSearchChange.bind(this)}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
              </select>
            </div>
            <input
              type="search"
              placeholder="Search"
              onChange={this.handleSearchChange.bind(this)}
            />
          </div>
        </div>
        <div className="movieList">{this.state.movieState}</div>
      </div>
    );
  }
}

export default Movies;
