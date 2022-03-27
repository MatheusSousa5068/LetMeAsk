import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/global.scss";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rooms/new" element={<NewRoom />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
