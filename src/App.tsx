import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Hero from "./pages/Hero";
import AddSubscription from "./pages/AddSubscription";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import AllSubscriptions from "./pages/AllSubscriptions";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OTPVerification from "./pages/OTPVerification";
import { twMerge } from "tailwind-merge";

function App() {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/verify";

  return (
    <main className={twMerge("app p-8", !isAuthRoute ? "pb-28" : "")}>
      {!isAuthRoute ? (
        <Header />
      ) : (
        <div className="w-full flex justify-center mb-4">
          <img
            src="/assets/logo.svg"
            alt="Vaultly Logo"
            className="w-12 h-12"
          />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/subscriptions" element={<AllSubscriptions />} />
        <Route path="/addSubscription" element={<AddSubscription />} />
        <Route
          path="/editSubscription/:subscriptionId"
          element={<AddSubscription />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<OTPVerification />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAuthRoute && <NavBar />}
    </main>
  );
}

export default App;
