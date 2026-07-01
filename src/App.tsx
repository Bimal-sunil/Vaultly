import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Hero from "./pages/Hero";
import AddSubscription from "./pages/AddSubscription";
function App() {
  return (
    <main className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/addSubscription" element={<AddSubscription />} />
        <Route
          path="/editSubscription/:subscriptionId"
          element={<AddSubscription />}
        />
      </Routes>
    </main>
  );
}

export default App;
