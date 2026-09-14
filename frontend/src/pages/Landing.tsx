import { Link } from "react-router-dom";

function Landing() {
    return (
        <main>
            <h1>RoleCall</h1>
            <p>Sign in to get started.</p>
            <Link to="/login">Sign in</Link>
        </main>
    );
}

export default Landing;
