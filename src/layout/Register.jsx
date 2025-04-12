import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import Button from "../components/Button";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register data:", formData);
  };

  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg dark:shadow-gray-900 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Inscription
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-inner border border-gray-200 dark:border-gray-600">
            <User className="text-gray-500 dark:text-gray-400 mr-3 w-5 h-5" />
            <input
              type="text"
              name="name"
              placeholder="Nom complet"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-inner border border-gray-200 dark:border-gray-600">
            <Mail className="text-gray-500 dark:text-gray-400 mr-3 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-inner border border-gray-200 dark:border-gray-600">
            <Lock className="text-gray-500 dark:text-gray-400 mr-3 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" color="dark">
          S'inscrire
        </Button>

        <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          Déjà un compte ?{" "}
          <button type="button" className="text-blue-500 hover:underline">
            Se connecter
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
