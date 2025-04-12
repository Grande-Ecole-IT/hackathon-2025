/* eslint-disable no-unused-vars */
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Modèle 3D de robot humain (simplifié pour l'exemple)
function HumanRobot({ position = [0, 0, 0] }) {
  const group = useRef();

  useFrame((state) => {
    group.current.rotation.y =
      Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    group.current.position.y =
      Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
  });

  return (
    <group ref={group} position={position} scale={[0.8, 0.8, 0.8]}>
      {/* Tête */}
      <mesh position={[0, 1.7, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Corps */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.7, 1, 0.3]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Bras */}
      <group position={[0, 1.2, 0]}>
        <mesh position={[-0.7, 0, 0]}>
          <boxGeometry args={[0.5, 0.2, 0.2]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0.7, 0, 0]}>
          <boxGeometry args={[0.5, 0.2, 0.2]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
      {/* Jambes */}
      <group position={[0, 0.3, 0]}>
        <mesh position={[-0.2, -0.7, 0]}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0.2, -0.7, 0]}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

// Modèle 3D de CV flottant
function FloatingCV() {
  const group = useRef();

  useFrame((state) => {
    group.current.rotation.x =
      Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    group.current.rotation.z =
      Math.cos(state.clock.getElapsedTime() * 0.2) * 0.1;
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.5, 2, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          emissive="#ffffff"
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Lignes de texte simulées */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[0, 0.7 - i * 0.2, 0.01]}>
          <planeGeometry args={[1.2, 0.05, 1]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      ))}
      {/* Titre */}
      <mesh position={[0, 1, 0.01]}>
        <planeGeometry args={[0.8, 0.1, 1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

function FloatingBinaryOrbs() {
  const group = useRef();
  const orbs = useMemo(() => {
    return Array.from({ length: 24 }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ),
      scale: 0.3 + Math.random() * 0.7,
      speed: 0.2 + Math.random() * 0.5,
    }));
  }, []);

  useFrame((state) => {
    orbs.forEach((orb, i) => {
      orb.position.y = Math.sin(state.clock.getElapsedTime() * orb.speed) * 3;
      orb.position.x =
        Math.cos(state.clock.getElapsedTime() * orb.speed * 0.5) * 4;
      orb.position.z =
        Math.sin(state.clock.getElapsedTime() * orb.speed * 0.3) * 2;
    });
    group.current.rotation.y += 0.001;
    group.current.rotation.x += 0.0005;
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
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.98}
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
      mesh.current.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.1);
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
      <dodecahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.05}
        metalness={0.98}
        wireframe={!active}
        emissive="#ffffff"
        emissiveIntensity={active ? 1 : 0.3}
        transparent
        opacity={0.9}
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
      mesh.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
    } else {
      mesh.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  const shapes = [
    <torusKnotGeometry args={[0.8, 0.3, 256, 32]} />,
    <dodecahedronGeometry args={[1, 0]} />,
    <octahedronGeometry args={[1.2, 0]} />,
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
        emissiveIntensity={hovered ? 0.5 : 0.2}
        roughness={0.1}
        metalness={0.98}
        wireframe={!hovered}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Arrière-plan animé amélioré */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <Canvas>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <FloatingBinaryOrbs />
          <Environment preset="studio" />
        </Canvas>
      </div>

      {/* Section Hero améliorée */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mx-auto text-center"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-black mb-8">
            <motion.span
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600"
              animate={{
                textShadow: "0 0 20px rgba(255,255,255,0.5)",
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
              }}
            >
              SKILLBRIDGE AI
            </motion.span>
          </h1>

          <motion.div
            className=" p-8 mb-12 inline-block border border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-3xl md:text-4xl text-black leading-tight font-medium">
              <span className="block font-bold mb-2">
                Tranformer les menaces de l'IA en
              </span>
              <span className="block text-2xl">Opportunite Humaine</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "12px 12px 24px rgba(0,0,0,0.1), -12px -12px 24px rgba(255,255,255,0.8)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-white text-black rounded-xl shadow-neumorph-lg text-lg font-bold"
            >
              OPTIMISER MON CV
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "12px 12px 24px rgba(0,0,0,0.1), -12px -12px 24px rgba(255,255,255,0.8)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-black text-white rounded-xl shadow-neumorph-invert-lg text-lg font-bold"
            >
              TROUVER UN EMPLOI
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Section Valeurs améliorée */}
      <section className="relative z-10 py-24 bg-transparent">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-black mb-20"
          >
            NOTRE TECHNOLOGIE{" "}
            <span className="text-gray-500">RÉVOLUTIONNAIRE</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              {
                title: "ADAPTATION INTELLIGENTE",
                description:
                  "Algorithmes évolutifs qui s'adaptent à votre profil unique pour maximiser vos chances",
              },
              {
                title: "SYNCHRONISATION HUMAINE",
                description:
                  "Connexion optimale entre vos compétences et les besoins réels du marché",
              },
              {
                title: "OPTIMISATION CONTINUE",
                description:
                  "Amélioration permanente par IA avec feedback en temps réel",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-white shadow-xl h-full flex flex-col border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="h-52 mb-6 flex-1 relative">
                  <Canvas flat linear>
                    <ambientLight intensity={0.8} />
                    <spotLight
                      position={[10, 10, 10]}
                      angle={0.15}
                      penumbra={1}
                      intensity={1.5}
                    />
                    <pointLight position={[-10, -10, -10]} intensity={0.8} />
                    <Suspense fallback={null}>
                      <ValueCard3D index={index} />
                    </Suspense>
                    <OrbitControls
                      enableZoom={false}
                      autoRotate
                      autoRotateSpeed={3}
                      enablePan={false}
                    />
                  </Canvas>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 flex-grow">{item.description}</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 px-6 py-3 bg-white text-black rounded-lg shadow-neumorph-sm text-sm font-medium self-start"
                >
                  En savoir plus →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Processus */}
      <section className="relative z-10 py-24 ">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-black mb-20"
          >
            COMMENT ÇA <span className="text-gray-500">FONCTIONNE</span>
          </motion.h2>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-0 left-1/2 h-full w-0.5 bg-gradient-to-b from-gray-200 to-gray-300 transform -translate-x-1/2"></div>

            {[
              {
                step: "1",
                title: "UPLOAD DE VOTRE CV",
                description:
                  "Importez votre CV existant ou créez-en un nouveau directement sur notre plateforme",
                icon: "📄",
              },
              {
                step: "2",
                title: "ANALYSE PAR IA",
                description:
                  "Notre intelligence artificielle scanne et analyse chaque élément de votre profil",
                icon: "🔍",
              },
              {
                step: "3",
                title: "OPTIMISATION CIBLÉE",
                description:
                  "Adaptation de votre CV aux normes ATS et aux attentes des recruteurs",
                icon: "✨",
              },
              {
                step: "4",
                title: "MATCHING D'EMPLOIS",
                description:
                  "Proposition d'offres correspondant parfaitement à votre profil optimisé",
                icon: "💼",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`mb-12 md:flex ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                <div
                  className={`relative p-8 rounded-3xl bg-white shadow-xl max-w-md ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div className="absolute -top-6 -left-6 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final amélioré */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-12 rounded-3xl bg-gray-50 shadow-neumorph-xxl border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white opacity-10"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-black opacity-5"></div>

            <h2 className="text-4xl font-bold text-black mb-8 relative z-10">
              PRÊT À <span className="text-gray-600">RÉVOLUTIONNER</span> VOTRE
              CARRIÈRE?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto relative z-10">
              Notre IA vous accompagne de l'optimisation de votre CV jusqu'à la
              signature de votre contrat de rêve.
            </p>

            <motion.div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "12px 12px 24px rgba(0,0,0,0.1), -12px -12px 24px rgba(255,255,255,0.8)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-white text-black rounded-xl shadow-neumorph-lg text-lg font-bold flex items-center justify-center gap-3"
              >
                <span>🚀</span> COMMENCER GRATUITEMENT
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "12px 12px 24px rgba(0,0,0,0.1), -12px -12px 24px rgba(255,255,255,0.8)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-black text-white rounded-xl shadow-neumorph-invert-lg text-lg font-bold flex items-center justify-center gap-3"
              >
                <span>💡</span> VISIONNER LA DÉMO
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer amélioré */}
      <footer className="relative z-10 py-12 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SKILLBRIDGE AI</h3>
              <p className="text-gray-400">
                L'équilibre parfait entre technologie et humanité pour votre
                carrière.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">PRODUIT</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Optimisation CV
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Matching emploi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Préparation entretien
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">RESSOURCES</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">CONTACT</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">hello@skillbridge.ai</li>
                <li className="text-gray-400">Paris, France</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© SHIFT 2025 - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
