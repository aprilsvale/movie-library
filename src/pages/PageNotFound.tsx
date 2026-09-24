import {Link} from "react-router-dom";

export function PageNotFound() {
    return (
        <div className="App">
            <h1>Page not found</h1>
            <Link to="/">Go to main</Link>
        </div>
    )
}