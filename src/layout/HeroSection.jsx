/* eslint-disable no-unused-vars */
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function FloatingBinaryOrbs() {
  const group = useRef();
  const orbs = useMemo(() => {
    return Array.from({ length: 12 }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ),
      scale: 0.3 + Math.random() * 0.5,
      speed: 0.2 + Math.random() * 0.3,
    }));
  }, []);

  useFrame((state) => {
    orbs.forEach((orb, i) => {
      orb.position.y = Math.sin(state.clock.getElapsedTime() * orb.speed) * 2;
      orb.position.x =
        Math.cos(state.clock.getElapsedTime() * orb.speed * 0.5) * 3;
    });
    group.current.rotation.y += 0.002;
  });

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <mesh
          key={i}
          position={orb.position}
          scale={[orb.scale, orb.scale, orb.scale]}
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#ffffff" : "#000000"}
            emissive={i % 3 === 0 ? "#ffffff" : "#000000"}
            emissiveIntensity={0.1}
            roughness={0.2}
            metalness={0.95}
            wireframe={i % 2 === 0}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function MorphingShard() {
  const mesh = useRef();
  const [active, setActive] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = time * 0.2;
    mesh.current.rotation.y = time * 0.3;
    mesh.current.position.y = Math.sin(time * 0.5) * 0.2;

    if (active) {
      mesh.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
    } else {
      mesh.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setActive(true)}
      onPointerOut={() => setActive(false)}
    >
      <boxGeometry args={[1, 1, 1, 8, 8, 8]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.1}
        metalness={0.9}
        wireframe={!active}
        emissive="#ffffff"
        emissiveIntensity={active ? 0.5 : 0.1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function ValueCard3D({ index }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    mesh.current.rotation.y += 0.01;
    if (hovered) {
      mesh.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
    } else {
      mesh.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  const shapes = [
    <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />,
    <dodecahedronGeometry args={[0.8, 0]} />,
    <octahedronGeometry args={[0.9, 0]} />,
  ];

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {shapes[index]}
      <meshStandardMaterial
        color={hovered ? "#ffffff" : "#000000"}
        emissive={hovered ? "#ffffff" : "#000000"}
        emissiveIntensity={hovered ? 0.3 : 0.1}
        roughness={0.2}
        metalness={0.95}
        wireframe={!hovered}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Arrière-plan animé */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <FloatingBinaryOrbs />
          <Environment preset="studio" />
        </Canvas>
      </div>

      {/* Section Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mx-auto text-center"
        >
          <motion.div
            className="relative h-64 w-full mb-12"
            whileHover={{ scale: 1.02 }}
          >
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
              />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <Suspense fallback={null}>
                <MorphingShard />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.5}
                enablePan={false}
              />
            </Canvas>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-black mb-8">
            <motion.span
              className="inline-block"
              animate={{
                textShadow: "0 0 10px rgba(255,255,255,0.3)",
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
              }}
            >
              SKILLBRIDGE
            </motion.span>
          </h1>

          <motion.div
            className="bg-gray-50 rounded-2xl shadow-neumorph p-6 mb-12 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-2xl md:text-3xl text-black leading-tight">
              <span className="block font-bold">
                Transformer les menaces de l'IA
              </span>
              <span className="block">en opportunité</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.8)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-black rounded-xl shadow-xl text-lg font-medium"
            >
              EXPLORER LES POSSIBILITÉS
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Section Valeurs */}
      <section className="relative z-10 py-24 bg-transparent">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-black mb-16"
          >
            NOTRE TECHNOLOGIE
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "ADAPTATION INTELLIGENTE",
                description: "Algorithmes évolutifs pour votre parcours",
              },
              {
                title: "SYNCHRONISATION HUMAINE",
                description: "Connexion optimale avec le marché",
              },
              {
                title: "OPTIMISATION CONTINUE",
                description: "Amélioration permanente par IA",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gray-50 shadow-xl h-full flex flex-col"
              >
                <div className="h-40 mb-6 flex-1">
                  <Canvas flat linear>
                    <ambientLight intensity={0.5} />
                    <spotLight
                      position={[10, 10, 10]}
                      angle={0.15}
                      penumbra={1}
                      intensity={1}
                    />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />
                    <Suspense fallback={null}>
                      <ValueCard3D index={index} />
                    </Suspense>
                    <OrbitControls
                      enableZoom={false}
                      autoRotate
                      autoRotateSpeed={2}
                      enablePan={false}
                    />
                  </Canvas>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block p-12 rounded-3xl bg-gray-50 shadow-neumorph-xl"
          >
            <h2 className="text-3xl font-bold text-black mb-8">
              PRÊT À TRANSFORMER VOTRE AVENIR?
            </h2>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.8)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-black text-white rounded-xl shadow-neumorph-invert text-lg font-medium"
            >
              COMMENCER MAINTENANT
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer minimaliste */}
      <footer className="relative z-10 py-8 bg-black text-white text-center">
        <div className="container mx-auto px-6">
          <p className="text-sm">
            © SHIFT 2025 - L'ÉQUILIBRE ENTRE TECHNOLOGIE ET HUMANITÉ
          </p>
        </div>
      </footer>
    </div>
  );
}
