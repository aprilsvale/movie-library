import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { MovieList } from "../components/MovieList";
import { EmptyState } from "../components/EmptyState"


export function FavouritesPage() {

    const favs = useSelector((state: RootState) => state.favourites.items);

    return (
        <div className="favourites-page">
            <h1>favs</h1>
                {favs.length === 0 ? (
                <EmptyState/>
            ) : (
                <MovieList movies = {favs} />
            )}
        </div>
    );
}