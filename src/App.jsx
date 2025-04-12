import AuthProvider from "./providers/AuthProvider";
import { BrowserRouter as Router, Routes } from "react-router";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
