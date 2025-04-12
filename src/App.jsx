import { Route, BrowserRouter as Router, Routes } from "react-router";
import Login from "./layout/Login";
import Register from "./layout/Register";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import AuthProvider from "./providers/AuthProvider";
import CVAnalysisDashboard from "./pages/Analysis";
import BusinessIdeasPage from "./pages/BusinessIdeasPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/analysis" element={<CVAnalysisDashboard />} />
          <Route path="/business-ideas" element={<BusinessIdeasPage/>}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
