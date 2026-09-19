import {useState, useEffect} from "react";
import type { Movie } from "../api/types";
import {searchMovies} from "../api/movies";
import {useDebounce} from "../hooks/useDebounce";
import {MovieList} from "../components/MovieList";
import {EmptyState} from "../components/EmptyState";
import {ErrorState} from "../components/ErrorState";




export function HomePage() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const debouncedQuery = useDebounce(query, 400)

    useEffect(() => {
        const trimmed = debouncedQuery.trim();

        if (!trimmed) {
            setMovies([]);
            setError(null);
            setLoading(false);
            setHasSearched(false);
            return;
        }

        let cancelled = false;

        setLoading(true);
        setError(null);

        searchMovies(trimmed)
            .then((data) => {
                if (cancelled) return;
                setMovies(data.docs);
                setHasSearched(true);
            })
            .catch((err) => {
                if (cancelled) return;
                setError(err instanceof Error ? err.message : "Something went wrong");
                setMovies([]);
                setHasSearched(true);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [debouncedQuery]);

    return(
        <div className="home-page">
            <h1>Search</h1>

            <input
                className="search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            {error && <ErrorState message={error} />}
            {!loading && !error && hasSearched && movies.length === 0 && (
                <EmptyState message={`Nothing was found upon this request «${debouncedQuery}»`} />
            )}
            {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
}