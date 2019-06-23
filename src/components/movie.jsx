import React, { Component } from "react";
import Images from "./imageImports.js";
import $ from "jquery";
import "./moviestyle.css";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.viewMovie = this.viewMovie.bind(this);
    this.state = {
      isHovering: false,
      showFullMovie: false,
      genres: []
    };
  }

  handleMouseHover = toggleState => {
    const urlString =
      "https://api.themoviedb.org/3/movie/" +
      this.props.movie.id +
      "?api_key=8dcc8f59a2c1968b0b281498347d6305";
    $.ajax({
      url: urlString,
      success: searchResults => {
        this.setState({
          runtime: this.convertMinutesToHours(searchResults.runtime),
          tagline: searchResults.tagline,
          genres: searchResults.genres
        });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
    this.setState(this.toggleHoverState(toggleState));
  };

  toggleHoverState(state) {
    return {
      isHovering: state
    };
  }

  viewMovie() {
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.id;
    window.location.href = url;
  }

  convertMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    return hours + "h " + (minutes - hours * 60) + "m";
  }

  render() {
    return (
      <div
        className="movieObject"
        onMouseEnter={() => this.handleMouseHover(true)}
        onMouseLeave={() => this.handleMouseHover(false)}
      >
        <div className="movieTease">
          <img
            src={
              "https://image.tmdb.org/t/p/w500/" +
              this.props.movie.backdrop_path
            }
            alt={this.props.movie.title}
          />

          {this.state.isHovering && (
            <div className="moviePeak">
              <div className="movieDescription">
                <h3>
                  <strong>{this.props.movie.title}</strong>
                </h3>
                <p>{this.state.runtime}</p>
                <p>{this.state.tagline}</p>
                <ul>
                  {this.state.genres.map(genre => {
                    return <li key={genre.id}>{genre.name}</li>;
                  })}
                </ul>
              </div>
              <button onClick={this.viewMovie}>
                <img src={Images[0]} alt="goToSite" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Movie;
