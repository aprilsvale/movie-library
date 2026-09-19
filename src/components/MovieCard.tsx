import { Link } from "react-router-dom";
import type { Movie } from "../api/types";
import { FavouriteButton } from "./FavouriteButton";

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    const poster = movie.poster?.previewUrl ?? movie.poster?.url;

    return (
        <Link to={`/movie/${movie.id}`} className="movie-card">
            {poster ? (
                <img
                    src={poster}
                    alt={movie.name ?? "Poster"}
                    className="movie-card__poster"
                />
            ) : (
                <div className="movie-card__poster movie-card__poster--empty">
                    No poster
                </div>
            )}

            <div className="movie-card__info">
                <h3 className="movie-card__title">{movie.name ?? "No name"}</h3>
                <span className="movie-card__year">{movie.year ?? "—"}</span>
                <FavouriteButton movie={movie} className="movie-card__fav" />
            </div>
        </Link>
    );
}