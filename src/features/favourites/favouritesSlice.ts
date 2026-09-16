import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../../api/types";

interface FavouritesState {
    items: Movie[];
}

const initialState: FavouritesState = {
    items: [],
};

const favouritesSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {
        toggleFavourite(state, action: PayloadAction<Movie>) {
            const movie = action.payload;
            const exists = state.items.some((item) => item.id === movie.id);

            if (exists) {
                state.items = state.items.filter((item) => item.id !== movie.id);
            } else {
                state.items.push({
                    id: movie.id,
                    name: movie.name,
                    alternativeName: movie.alternativeName,
                    year: movie.year,
                    description: movie.description,
                    shortDescription: movie.shortDescription,
                    rating: movie.rating,
                    poster: movie.poster,
                    genres: movie.genres,
                });
            }
        },
        removeFavourite(state, action: PayloadAction<number>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
});

export const { toggleFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;