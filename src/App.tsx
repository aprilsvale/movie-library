import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { MoviePage } from "./pages/MoviePage";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <header className="app-header">
                    <Link to="/">Поиск</Link>
                    <Link to="/favourites">Избранное</Link>
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/favourites" element={<FavouritesPage />} />
                        <Route path="/movie/:id" element={<MoviePage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;