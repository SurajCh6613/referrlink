// import Refer from "./components/Refer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Hero from "./pages/Home/Hero";
import Login from "./pages/Auth/Login";
import HowItWorks from "./pages/Home/HowItWorks";
import JuniorDashboard from "./pages/User/JuniorDashboard";
import SeniorDashboard from "./pages/User/SeniorDashboard";
import FindSenior from "./pages/FindSenior";
import PrivateRoute from "./components/PrivateRoute";
import UpdateProfile from "./pages/User/UpdateProfile";
import MyProfile from "./pages/User/MyProfile";
import RequestReferralForm from "./components/RequestReferralForm";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/User/ProfilePage";
const App = () => {
  return (
    <>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/how-it-works" element={<HowItWorks />} />

          {/* Protected Routes */}

          <Route element={<PrivateRoute allowedRoles={["junior", "senior"]} />}>
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/myProfile" element={<MyProfile />} />
            <Route path="/user/:id" element={<ProfilePage />} />
          </Route>

          {/* Junior Only */}
          <Route element={<PrivateRoute allowedRoles={["junior"]} />}>
            <Route path="/junior-dashboard" element={<JuniorDashboard />} />
            <Route path="/find-senior" element={<FindSenior />} />
            <Route
              path="/request-referral/:id"
              element={<RequestReferralForm />}
            />
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
