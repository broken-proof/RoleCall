import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import HomeOrLanding from "./components/HomeOrLanding";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeOrLanding />} />

                <Route element={<RedirectIfAuthenticated />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
