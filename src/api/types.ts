export interface Movie {
    id: number;
    name: string | null;
    alternativeName?: string | null;
    year: number | null;
    description?: string | null;
    shortDescription?: string | null;
    rating?: {
        filmCritics?: number | null;
        kp?: number | null;
        imdb?: number | null;
        russianFilmCritics?: number | null;
    } | null;
    poster?: {
        url?: string | null;
        previewUrl?: string | null;
    } | null;
    genres?: Array<{ name: string }> | null;
}

export interface SearchMoviesResponse {
    docs: Movie[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}