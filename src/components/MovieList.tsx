import type { Movie } from "../api/types";
import { MovieCard } from "./MovieCard";

interface MovieListProps {
    movies: Movie[];
}

export function MovieList({ movies }: MovieListProps) {
    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}