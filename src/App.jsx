import { Route, BrowserRouter as Router, Routes } from "react-router";
import Login from "./layout/Login";
import Register from "./layout/Register";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import AuthProvider from "./providers/AuthProvider";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
