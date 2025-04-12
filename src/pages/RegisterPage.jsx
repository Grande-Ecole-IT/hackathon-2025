/* eslint-disable no-unused-vars */
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense, useRef, useState } from "react";
import Register from "../layout/Register";

const AnimatedTorus = () => {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.002;
      mesh.current.rotation.y += 0.004;
    }
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={hovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <torusKnotGeometry args={[1.8, 0.4, 256, 64, 2, 3]} />{" "}
      {/* Taille réduite */}
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.1}
        roughness={0.05}
        clearcoat={1}
        transmission={0.85}
        opacity={1}
        emissive="#ffffff"
        emissiveIntensity={hovered ? 0.2 : 0.1}
        ior={1.5}
        thickness={1.2}
        envMapIntensity={0.8}
      />
    </mesh>
  );
};

const RegisterPage = () => {
  return (
    <div className="relative w-full h-screen flex overflow-hidden bg-gray-100">
      {/* Colonne gauche avec animation 3D */}
      <div className="w-1/2 h-full relative flex items-center justify-center">
        <div className="absolute inset-0 " />

        {/* Scene 3D plus compacte */}
        <div className="absolute top-0 left-0 w-full h-full">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            {" "}
            {/* Camera plus proche */}
            <ambientLight intensity={0.7} color="#ffffff" />
            <directionalLight
              position={[3, 3, 3]}
              intensity={1}
              color="#ffffff"
            />
            <Suspense fallback={null}>
              <AnimatedTorus />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.8}
              enableDamping
              dampingFactor={0.03}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 3}
            />
          </Canvas>
        </div>

        {/* Texte repositionné */}
        <motion.div
          className="relative z-20 pl-16"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-4xl font-light text-gray-800 mb-2">
            Welcome to <span className="font-normal">Vision</span>
          </h1>
          <p className="text-gray-500/90 text-md">Your gateway to innovation</p>
        </motion.div>
      </div>

      {/* Colonne droite avec formulaire plus épuré */}
      <div className="w-1/2 h-full flex items-center justify-center p-8 bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-sm "
        >
          <Register />
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
