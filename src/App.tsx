import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Hero from "./pages/Hero";
import AddSubscription from "./pages/AddSubscription";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import AllSubscriptions from "./pages/AllSubscriptions";
import Profile from "./pages/Profile";

function App() {
  return (
    <main className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/subscriptions" element={<AllSubscriptions />} />
        <Route path="/addSubscription" element={<AddSubscription />} />
        <Route
          path="/editSubscription/:subscriptionId"
          element={<AddSubscription />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NavBar />
    </main>
  );
}

export default App;
