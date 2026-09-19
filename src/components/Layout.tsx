import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
    return (
        <div className="layout">
            <header className="layout__header">
                <NavLink to="/" className="layout__logo">
                    🎬 Movie Tracker
                </NavLink>

                <nav className="layout__nav">
                    <NavLink to="/">Search</NavLink>
                    <NavLink to="/favourites">Favs</NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}