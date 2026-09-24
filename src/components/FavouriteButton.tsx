import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { toggleFavourite } from "../features/favourites/favouritesSlice";
import type { Movie } from "../api/types";

interface FavouriteButtonProps {
    movie: Movie;
    className?: string;
}
export function FavouriteButton({ movie, className }: FavouriteButtonProps) {
    const dispatch = useDispatch<AppDispatch>();
    const isFavourite = useSelector((state: RootState) =>
        state.favourites.items.some((item) => item.id === movie.id)
    );

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(toggleFavourite(movie));
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`favorite-btn ${isFavourite ? "favorite-btn--active" : ""} ${
                className ?? ""
            }`}
            aria-label={isFavourite ? "Remove from favs" : "Add to favs"}
        >
            {isFavourite ? "★ In favs" : "☆ To favs"}
        </button>
    );
}