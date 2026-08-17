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
import Insights from "./pages/Insights";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";
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
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Hero />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <ProtectedRoute>
              <AllSubscriptions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addSubscription"
          element={
            <ProtectedRoute>
              <AddSubscription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editSubscription/:subscriptionId"
          element={
            <ProtectedRoute>
              <AddSubscription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account-details"
          element={
            <ProtectedRoute>
              <AccountDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<OTPVerification />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAuthRoute && <NavBar />}
      <Toaster
        position="top-center"
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              "bg-dark-accent border border-[rgba(255,255,255,0.05)] rounded-[15px] p-4 shadow-2xl flex items-start gap-3 w-[320px] items-center",
            title: "font-semibold text-light text-sm",
            description: "text-xs text-accent-bg leading-relaxed mt-1",
            icon: "w-5 h-5 flex-shrink-0",
            success: "text-accent",
            error: "text-[#FF6347]",
            info: "text-[#3f88c5]",
            warning: "text-yellow-400",
          },
        }}
      />
    </main>
  );
}

export default App;
