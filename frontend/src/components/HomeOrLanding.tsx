import Home from "../pages/Home";
import Landing from "../pages/Landing";
import { useAuth } from "../hooks/useAuth";

function HomeOrLanding() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Home /> : <Landing />;
}

export default HomeOrLanding;
