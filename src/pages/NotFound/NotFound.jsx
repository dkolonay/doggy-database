import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <main className="page">
            <div className="not-found">
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <div className="not-found-links">
                    <Link
                        to="#"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Go back from where you came...
                    </Link>
                    <Link to="/?page=0">Go to Homepage</Link>
                </div>
            </div>
        </main>
    );
}

export default NotFoundPage;
