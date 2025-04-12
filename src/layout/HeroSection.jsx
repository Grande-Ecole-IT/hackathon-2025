/* eslint-disable no-unused-vars */
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense, useRef } from "react";

function BinaryParticles() {
  const particles = useRef();
  const count = 500;

  useFrame(() => {
    particles.current.rotation.y += 0.002;
  });

  return (
    <group ref={particles}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
          ]}
        >
          <sphereGeometry args={[0.03 + Math.random() * 0.02, 8, 8]} />
          <meshStandardMaterial
            color={Math.random() > 0.5 ? "#ffffff" : "#000000"}
            emissiveIntensity={0.05}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// Composant 3D principal
function FloatingShard() {
  const mesh = useRef();

  useFrame((state) => {
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    mesh.current.position.y =
      Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1, 0.4, 128, 32]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.1}
        metalness={0.9}
        wireframe
        emissive="#ffffff"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
}

// Composant pour les formes 3D des cartes
function Shape3D({ index }) {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      {index === 0 && <dodecahedronGeometry args={[0.8]} />}
      {index === 1 && <octahedronGeometry args={[0.9]} />}
      {index === 2 && <icosahedronGeometry args={[0.7]} />}
      <meshStandardMaterial
        color="#000000"
        roughness={0.2}
        metalness={0.9}
        wireframe
      />
    </mesh>
  );
}

// Composant de carte de valeur
function ValueCard({ index, title, description, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      className="p-8 rounded-3xl bg-gray-50 shadow-neumorph-xl h-full flex flex-col"
    >
      <div className="h-40 mb-6 flex-1">
        <Canvas flat linear>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <Suspense fallback={null}>
            <Shape3D index={index} />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={2}
            enablePan={false}
          />
        </Canvas>
      </div>
      <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Arrière-plan animé */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none">
        <Canvas>
          <ambientLight intensity={0.5} />
          <BinaryParticles />
          <Environment preset="city" />
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
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-8">
            SKILLBRIDGE
          </h1>

          <div className="relative h-64 w-full mb-12">
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
                <FloatingShard />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.5}
                enablePan={false}
              />
            </Canvas>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl text-black mb-12 leading-tight"
          >
            TRANSFORMER LA MENACE <br />
            DE L'IA EN OPPORTUNITÉ HUMAINE
          </motion.p>

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
              className="px-8 py-4 bg-white text-black rounded-xl shadow-neumorph-xl text-lg font-medium"
            >
              COMMENCER L'ÉVALUATION
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
            NOTRE APPROCHE
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ValueCard
              index={0}
              title="Diagnostic Algorithmique"
              description="Analyse précise de votre profil par notre IA spécialisée"
            />
            <ValueCard
              index={1}
              title="Parcours Quantique"
              description="Formations optimisées pour l'ère post-automatisation"
            />
            <ValueCard
              index={2}
              title="Réseau Neuronique"
              description="Connectivité intelligente avec les acteurs clés"
            />
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
              PRÊT POUR LA TRANSITION?
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
              DÉMARRER MAINTENANT
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
