import React, { useState } from 'react';
import MovieList from './MovieList';
import { fetchMovies } from '../apis/fetchMovies';

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
}

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);

  const [noData, setNoData] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const moviesData: Movie[] = await fetchMovies(query, type, year);
      setMovies(moviesData);
      if (moviesData.length > 0) {
        setNoData(false)
        setError('');
      } else {
        setNoData(true)
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error fetching data: ${err.message}`);
      } else {
        setError('An error occurred.');
      }
    }
  };


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-10 col-lg-12">
          <h1 className="mb-4">Movie Search App</h1>
          <form onSubmit={handleSearch}>
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
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          <div className="row">
            {noData && <div className="alert alert-secondary" role="alert">
              We couldn't find any media matching your search term. Please refine your search and try again!
            </div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!error && <MovieList movies={movies} />}
          </div>
        </div>
      </div>
    </div>
  );

};

export default MovieSearch;
