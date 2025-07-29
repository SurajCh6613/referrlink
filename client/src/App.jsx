// import Refer from "./components/Refer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Hero from "./pages/Home/Hero";
import Login from "./pages/Auth/Login";
import HowItWorks from "./pages/Home/HowItWorks";
import JuniorDashboard from "./pages/User/JuniorDashBoard";
import SeniorDashboard from "./pages/User/SeniorDashboard";
import FindSenior from "./pages/FindSenior";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/how-it-works" element={<HowItWorks />} />

          {/* Protected Routes */}
          {/* Junior Only */}
          <Route element={<PrivateRoute allowedRoles={["junior"]} />}>
            <Route path="/junior-dashboard" element={<JuniorDashboard />} />
            <Route path="/find-senior" element={<FindSenior />} />
          </Route>
          {/* Seniors Only */}
          <Route element={<PrivateRoute allowedRoles={["senior"]} />}>
            <Route path="/senior-dashboard" element={<SeniorDashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
