import { Route, BrowserRouter as Router, Routes } from "react-router";
import CVAnalysisDashboard from "./pages/Analysis";
import BusinessIdeasPage from "./pages/BusinessIdeasPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LaunchPlanPage from "./pages/LaunchPlanPage";
import AuthProvider from "./providers/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/analysis" element={<ProtectedRoute><CVAnalysisDashboard /></ProtectedRoute>} />
          <Route path="/business-ideas" element={<ProtectedRoute><BusinessIdeasPage /></ProtectedRoute>}></Route>
          <Route path="/plan" element={<ProtectedRoute><LaunchPlanPage /></ProtectedRoute>}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
