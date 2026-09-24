import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { MoviePage } from "./pages/MoviePage";
import { PageNotFound } from "./pages/PageNotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="favourites" element={<FavouritesPage />} />
                    <Route path="movie/:id" element={<MoviePage />} />
                    <Route path="*" element={<PageNotFound/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;