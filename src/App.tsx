import ScrollToHash from "@/components/ScrollToHash";
import CaseStudy from "@/pages/CaseStudy";
import Home from "@/pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const basename = import.meta.env.BASE_URL;

function App() {
    return (
        <BrowserRouter basename={basename}>
            <ScrollToHash />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/:id" element={<CaseStudy/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;