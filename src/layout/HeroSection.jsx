/* eslint-disable no-unused-vars */
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function BinaryParticles() {
  const particles = useRef();
  const count = 1000;

  useFrame((state) => {
    particles.current.rotation.y += 0.002;
    particles.current.rotation.x =
      Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
  });

  return (
    <group ref={particles}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
          ]}
        >
          <sphereGeometry args={[0.03 + Math.random() * 0.03, 8, 8]} />
          <meshStandardMaterial
            color={Math.random() > 0.5 ? "#ffffff" : "#000000"}
            emissive={Math.random() > 0.5 ? "#ffffff" : "#000000"}
            emissiveIntensity={0.1}
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function HumanAIIntegration() {
  const group = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    group.current.position.y =
      Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  const lines = useMemo(() => {
    const points = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      points.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0)
      );
    }
    return points;
  }, []);

  return (
    <group
      ref={group}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Silhouette humaine */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 1.8, 8, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={hovered ? 0.3 : 0.1}
          metalness={0.9}
          roughness={0.2}
          wireframe={hovered}
        />
      </mesh>

      {/* Réseau IA */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
        <sphereGeometry args={[1.2, 12, 12]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#000000"
          emissiveIntensity={hovered ? 0.2 : 0.05}
          metalness={0.95}
          roughness={0.1}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Connexions */}
      <lineSegments>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(lines.flatMap((v) => [v.x, v.y, v.z]))}
            count={lines.length}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="#ffffff" linewidth={1} />
      </lineSegments>
    </group>
  );
}

function FloatingShard() {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    mesh.current.position.y =
      Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <torusKnotGeometry args={[1.2, 0.5, 256, 64]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.1}
        metalness={0.95}
        wireframe={!hovered}
        emissive="#ffffff"
        emissiveIntensity={hovered ? 0.3 : 0.1}
        transparent
        opacity={hovered ? 0.9 : 0.7}
      />
    </mesh>
  );
}

function Shape3D({ index }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {index === 0 && <dodecahedronGeometry args={[0.9]} />}
      {index === 1 && <octahedronGeometry args={[1.1]} />}
      {index === 2 && <icosahedronGeometry args={[0.8]} />}
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

function ValueCard({ index, title, description }) {
  return (
    <motion.div
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
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Arrière-plan animé */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <BinaryParticles />
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
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
            SKILLBRIDGE
          </h1>

          <div className="relative h-96 w-full mb-8">
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
              />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <Suspense fallback={null}>
                <HumanAIIntegration />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.3}
                enablePan={false}
              />
            </Canvas>
          </div>

          <motion.div
            className="bg-gray-50 rounded-2xl shadow-neumorph p-6 mb-8 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
              <span className="block">L'AVENIR DU TRAVAIL</span>
              <span className="block text-2xl md:text-3xl font-medium mt-2">
                Humain & IA Unis
              </span>
            </h2>
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
              ÉVALUER MON POTENTIEL
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

      {/* Footer */}
      <footer className="relative z-10 py-8 bg-black text-white text-center">
        <div className="container mx-auto px-6">
          <p className="text-sm">© SHIFT 2025 - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
}
