/* eslint-disable no-unused-vars */
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense, useRef } from "react";
import { Link } from "react-router";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-blue-50 to-violet-50">
      {/* Grille animée */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(to right, #a5b4fc 1px, transparent 1px), 
                          linear-gradient(to bottom, #a5b4fc 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Points flottants */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-violet-400"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 40],
            x: [0, (Math.random() - 0.5) * 30],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const FloatingCore = () => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.004;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.5, 2]} />
      <meshPhysicalMaterial
        color="#8b5cf6"
        metalness={0.8}
        roughness={0.1}
        clearcoat={0.5}
        transmission={0.5}
        emissive="#6366f1"
        emissiveIntensity={0.3}
        ior={1.5}
      />
    </mesh>
  );
};

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50  backdrop-blur-md border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center">
            <span className="text-xl font-bold text-white">R</span>
          </div>
          <span className="text-xl font-bold text-gray-800">REBOOT</span>
        </Link>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-2 text-gray-700 hover:text-violet-600 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 bg-gradient-to-r from-blue-400 to-violet-500 text-white rounded-lg hover:from-blue-500 hover:to-violet-600 transition-all shadow-md"
          >
            Register
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen text-gray-800 overflow-x-hidden">
      {/* Background animé */}
      <AnimatedBackground />

      {/* Navbar */}
      <Navbar />

      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          g
          className="text-center mb-24 pt-12"
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gray-800 font-extrabold">
              Reboot your potential
            </span>
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-blue-600/80 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Transform AI challenges into opportunities with our intelligent
            career platform
          </motion.p>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl text-xl font-semibold text-white hover:from-blue-600 hover:to-violet-600 transition-all shadow-lg shadow-blue-400/30"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </motion.header>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            {
              title: "Resume Analysis",
              description:
                "AI-powered insights to optimize your resume for today's job market.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              ),
              color: "blue",
            },
            {
              title: "Business Ideas",
              description:
                "Discover opportunities that leverage AI as an advantage.",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-violet-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              ),
              color: "violet",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-${feature.color}-100/60 hover:border-${feature.color}-200/80 transition-all shadow-sm`}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start mb-6">
                <div
                  className={`p-3 rounded-lg bg-${feature.color}-100/60 mr-4 border-2 border-${feature.color}-200/50`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <div
                  className={`h-px bg-gradient-to-r from-transparent via-${feature.color}-200/50 to-transparent mb-6`}
                ></div>
                <ul className="space-y-3">
                  {feature.title === "Resume Analysis"
                    ? [
                        "Strengths identification",
                        "Weakness detection",
                        "ATS optimization",
                        "Personalized suggestions",
                      ]
                    : [
                        "Market trend analysis",
                        "Personalized concepts",
                        "Implementation roadmap",
                        "Risk assessment",
                      ].map((item, j) => (
                        <motion.li
                          key={j}
                          className="flex items-start text-gray-700"
                          whileHover={{ x: 3 }}
                        >
                          <span
                            className={`w-2 h-2 rounded-full bg-${feature.color}-400 mr-3 mt-2`}
                          ></span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Showcase */}
        <motion.div
          className="relative h-96 rounded-3xl overflow-hidden my-32 bg-white/80 backdrop-blur-sm border-2 border-blue-100/60 shadow-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.8} color="#a5b4fc" />
            <pointLight position={[3, 3, 3]} intensity={0.8} color="#a5b4fc" />
            <Suspense fallback={null}>
              <FloatingCore />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.2}
            />
          </Canvas>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-blue-100/60 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                AI-Powered Future
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Harness the power of AI to enhance your career potential
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center max-w-3xl mx-auto my-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8"
            whileHover={{ scale: 1.01 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
              Ready to begin
            </span>{" "}
            <span className="text-gray-800">your transformation?</span>
          </motion.h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Join professionals who are already leveraging AI to accelerate their
            careers.
          </p>
          <motion.div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:from-blue-600 hover:to-violet-600 transition-all shadow-lg shadow-blue-400/30"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="px-8 py-3.5 bg-white/80 border-2 border-blue-200 rounded-lg text-lg font-medium text-gray-700 hover:bg-white transition-all shadow-sm"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="text-center text-gray-500 text-sm mt-32 pb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} REBOOT. All rights reserved.</p>
        </motion.footer>
      </div>
    </div>
  );
}
