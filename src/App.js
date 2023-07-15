import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Beers } from "./Components/Beers/Beers";
import { BeerPage } from "./Components/BeerPage/BeerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Beers />} />
      <Route path="/beer/:id" element={<BeerPage />} />
    </Routes>
  );
}

export default App;
