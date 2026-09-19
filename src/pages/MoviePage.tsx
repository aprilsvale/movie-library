import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/movies";
import type { Movie } from "../api/types";
import { FavouriteButton } from "../components/FavouriteButton";
import { ErrorState } from "../components/ErrorState";
import { Loader } from "../components/Loader";

export function MoviePage() {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        let cancelled = false;

        setLoading(true);
        setError(null);

        getMovieById(id)
            .then((data) => {
                if (cancelled) return;
                setMovie(data);
            })
            .catch((err) => {
                if (cancelled) return;
                setError(err instanceof Error ? err.message : "Something went wrong");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <ErrorState message={error} />;
    if (!movie) return null;

    const poster = movie.poster?.url ?? movie.poster?.previewUrl;
    const rating = movie.rating?.kp ?? movie.rating?.imdb ?? "—";
    const genres = movie.genres?.map((g) => g.name).join(", ") ?? "—";

    return (
        <div className="movie-page">
            <h1>{movie.name ?? "No name"}</h1>

            <div className="movie-page__content">
                {poster && (
                    <img
                        src={poster}
                        alt={movie.name ?? "Poster"}
                        className="movie-page__poster"
                    />
                )}

                <div className="movie-page__info">
                    <p><b>Год:</b> {movie.year ?? "—"}</p>
                    <p><b>Рейтинг:</b> {rating}</p>
                    <p><b>Жанры:</b> {genres}</p>
                    <p className="movie-page__description">
                        {movie.description ?? movie.shortDescription ?? "Lacks description"}
                    </p>
                    <FavouriteButton movie={movie} />
                </div>
            </div>
        </div>
    );
}