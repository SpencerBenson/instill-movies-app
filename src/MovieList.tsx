import React from 'react';

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.Title} className="col-md-4">
            <div className="card mb-4">
              <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">Year: {movie.Year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
