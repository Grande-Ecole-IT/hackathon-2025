import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Suspense, useRef } from "react";
import Login from "../layout/Login";

const AnimatedTorus = () => {
  const mesh = useRef();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.005;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 1, 0]}>
      <torusKnotGeometry args={[2, 0.5, 128, 32]} />
      <meshStandardMaterial
        color="#cfcfcf"
        metalness={0.9}
        roughness={0.15}
        transparent
        opacity={0.85}
        emissive="#ffffff"
        emissiveIntensity={0.25}
      />
    </mesh>
  );
};

const LoginPage = () => {
  return (
    <div className="relative w-full h-screen bg-white flex overflow-hidden">
      {/* Colonne gauche avec Torus + texte */}
      <div className="w-1/2 h-full relative flex flex-col items-center justify-center bg-white">
        {/* 3D */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Canvas camera={{ position: [0, 0, 8] }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 2, 2]} intensity={1.2} />
            <Suspense fallback={null}>
              <AnimatedTorus />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={1.2}
            />
          </Canvas>
        </div>

        {/* Texte dessous */}
        <div className="relative z-10 mt-96 text-center px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-md"
          >
            <h1 className="text-4xl font-bold text-black mb-4">
              Bienvenue dans <span className="text-gray-400">l’avenir</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Colonne droite avec login */}
      <div className="w-1/2 h-full flex items-center justify-center px-6 py-12 bg-white">
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-sm"
        >
          <Login />
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
