import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Hero from "./pages/Hero";
import AddSubscription from "./pages/AddSubscription";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import AllSubscriptions from "./pages/AllSubscriptions";
import Profile from "./pages/Profile";
import AccountDetails from "./pages/AccountDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OTPVerification from "./pages/OTPVerification";
import ProtectedRoute from "./components/ProtectedRoute";
import { twMerge } from "tailwind-merge";

function App() {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/verify";

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
        <Route path="/" element={<ProtectedRoute><Hero /></ProtectedRoute>} />
        <Route path="/subscriptions" element={<ProtectedRoute><AllSubscriptions /></ProtectedRoute>} />
        <Route path="/addSubscription" element={<ProtectedRoute><AddSubscription /></ProtectedRoute>} />
        <Route
          path="/editSubscription/:subscriptionId"
          element={<ProtectedRoute><AddSubscription /></ProtectedRoute>}
        />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/account-details" element={<ProtectedRoute><AccountDetails /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<OTPVerification />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAuthRoute && <NavBar />}
    </main>
  );
}

export default App;
