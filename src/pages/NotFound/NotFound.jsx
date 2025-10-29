import { Link, useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate()
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="#" onClick={()=>{navigate(-1)}}>Go back from where you came...</Link>
            <Link to="/">Go to Homepage</Link>
        </div>
    );
}

export default NotFoundPage;
