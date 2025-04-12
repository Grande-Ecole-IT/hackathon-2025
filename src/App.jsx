import { Route, BrowserRouter as Router, Routes } from "react-router";
import CVAnalysisDashboard from "./pages/Analysis";
import BusinessIdeasPage from "./pages/BusinessIdeasPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LaunchPlanPage from "./pages/LaunchPlanPage";
import AuthProvider from "./providers/AuthProvider";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/analysis" element={<CVAnalysisDashboard />} />
          <Route path="/business-ideas" element={<BusinessIdeasPage />}></Route>
          <Route path="/plan" element={<LaunchPlanPage />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
