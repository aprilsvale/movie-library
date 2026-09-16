import { apiGet } from "./client";
import type { Movie, SearchMoviesResponse } from "./types";

export async function searchMovies(
    query: string,
    page: number = 1,
    limit: number = 10
): Promise<SearchMoviesResponse> {
    return apiGet<SearchMoviesResponse>("/movie/search", {
        query,
        page,
        limit,
    });
}

export async function getMovieById(id: string | number): Promise<Movie> {
    return apiGet<Movie>(`/movie/${id}`);
}