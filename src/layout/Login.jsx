/* eslint-disable no-unused-vars */
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import FloatingWhiteElements from "../components/FloatingElements";
import { useAuth } from '../hooks/useAuth';
import { Loader } from "lucide-react";
import { useNavigate } from "react-router";

const LoginForm = ({ onClose, showRegister }) => {
  const {login} = useAuth();
  const {register} = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData)
      .then(() => {
        navigate("/home");
        // Redirection ou action après la connexion réussie
      })
      .catch((error) => {
        console.error("Login failed", error);
        setError(error);
      });
  
      onClose();
    } catch (error) {
      console.error("Login failed", error);
      setError(error);
    }
    finally {
      setLoading(false);
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
          {/* Fond 3D pour le formulaire */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <Canvas>
              <ambientLight intensity={1} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <FloatingWhiteElements />
            </Canvas>
          </div>

          <div className="relative z-10">
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <X className="text-gray-700" size={20} />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500">Sign in to your account</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Champs du formulaire */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="block w-full pl-10 pr-3 py-3 rounded-lg bg-white border border-gray-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-200 outline-none transition"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="block w-full pl-10 pr-10 py-3 rounded-lg bg-white border border-gray-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-200 outline-none transition"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-violet-600 hover:text-violet-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex space-x-4 items-center justify-center w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition"
                >
                  {loading &&<Loader className="animate-spin"/>}
                  <span>Sign in</span>
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="font-medium text-violet-600 hover:text-violet-500"
                  onClick={showRegister}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default LoginForm;
