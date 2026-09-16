import { useAppSelector } from "../app/hooks"
import { MovieList } from "../components/MovieList";
import { EmptyState } from "../components/EmptyState"


export function FavouritesPage() {

    const Favs = useAppSelector((state) => state.favourites.items);

    return (
        <div className="favourites-page">
            <h1>Избранное</h1>
                {Favs.length === 0 ? (
                <EmptyState/>
            ) : (
                <MovieList movies = {Favs} />
            )}
        </div>
    );
}