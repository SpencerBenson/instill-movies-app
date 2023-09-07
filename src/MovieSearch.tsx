import React, { useState } from 'react';
import axios from 'axios';
// import MovieList from './MovieList';
import './MovieSearch.css';

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [movies, setMovies] = useState<any[]>([]);

  const apiKey = 'fb03d60f';

  const handleSearch = () => {
    const params: any = {
      apikey: apiKey,
      s: query,
    };

    // Add optional parameters if they are set
    if (type) {
      params.type = type;
    }

    if (year) {
      params.y = year;
    }

    const apiUrl = 'http://www.omdbapi.com/';

    axios
      .get(apiUrl, { params })
      .then((response) => {
        const { Search } = response.data;

        if (Search) {
          setMovies(Search);
        } else {
          setMovies([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-10 col-lg-12">
          <h1 className="mb-4">Movie Search App</h1>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Year of Release (Optional)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                onClick={handleSearch}
                type="button"
              >
                Search
              </button>
            </div>
          </div>

          <div className="row">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={movie.Poster}
                    className="card-img-top"
                    alt={movie.Title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.Title}</h5>
                    <p className="card-text">
                      Type: {movie.Type}<br />
                      Year: {movie.Year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;
