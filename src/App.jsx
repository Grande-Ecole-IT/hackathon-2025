import { Route, BrowserRouter as Router, Routes } from "react-router";
import Login from "./layout/Login";
import Register from "./layout/Register";
import AuthProvider from "./providers/AuthProvider";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
