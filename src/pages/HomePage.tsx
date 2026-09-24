import {useState, useEffect, useRef} from "react";
import type { Movie } from "../api/types";
import {searchMovies} from "../api/movies";
import {useDebounce} from "../hooks/useDebounce";
import {MovieList} from "../components/MovieList";
import {EmptyState} from "../components/EmptyState";
import {ErrorState} from "../components/ErrorState";
import {Loader} from "../components/Loader";

export function HomePage() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const debouncedQuery = useDebounce(query.trim(), 400)

    const requestIdRef = useRef(0)

    const loadMovies = async(searchQuery: string) => {

        const currentId = ++requestIdRef.current;

        setLoading(true);
        setError(null);

        try {
            const data = await searchMovies(searchQuery)
            if (currentId !== requestIdRef.current) return;
            setMovies(data.docs);
            setHasSearched(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
            if (currentId !== requestIdRef.current) return;
            setMovies([]);
            setHasSearched(true);
        } finally {
            if (currentId === requestIdRef.current) {
                setLoading(false);
            }

        }

    useEffect(() => {
        const trimmed = debouncedQuery;

        if (trimmed.length < 3) {
            return;
        }
        loadMovies(trimmed);
    }, [debouncedQuery]);

    return(
        <div className="home-page">
            <h1>Search</h1>

            <input
                id="movie-search"
                name="movie-search"
                className="search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                autoComplete="off"
            />
            {loading && <Loader/>}
            {error && (
                <ErrorState
                    message={error}
                    onRetry={() => loadMovies(debouncedQuery)}
                />
            )}
                {!loading && !error && hasSearched && movies.length === 0 && (
                    <EmptyState message={`Nothing was found upon this request «${debouncedQuery}»`} />
                )}
                {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
}