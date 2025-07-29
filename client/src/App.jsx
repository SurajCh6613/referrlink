// import Refer from "./components/Refer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Hero from "./pages/Home/Hero";
import Login from "./pages/Auth/Login";
import HowItWorks from "./pages/Home/HowItWorks";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
