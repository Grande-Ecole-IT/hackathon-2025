/* eslint-disable no-unused-vars */
import { OrbitControls, Text } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router";
import * as THREE from "three";
import { LineDashedMaterial } from "three";
import LoginForm from "./Login";
import RegisterForm from "./Register";

extend({ LineDashedMaterial });

const FondAnime = () => {
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

const TechBackground = () => {
  const group = useRef();
  const nodes = useRef([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    group.current.rotation.y = time * 0.05;

    nodes.current.forEach((node, i) => {
      if (node) {
        node.position.y = Math.sin(time * 0.3 + i * 2) * 0.3;
        node.rotation.x = time * 0.1;
      }
    });
  });

  return (
    <group ref={group}>
      <NeuralNetwork count={12} radius={4} />

      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 5;
        const z = Math.sin(angle) * 5;

        return (
          <group
            key={i}
            position={[x, 0, z]}
            ref={(el) => (nodes.current[i] = el)}
          >
            <TechIcon type={i % 3} />
          </group>
        );
      })}

      <ConnectingLines count={6} radius={5} />
    </group>
  );
};

const NeuralNetwork = ({ count = 8, radius = 3 }) => {
  const nodes = useRef([]);

  useFrame(() => {
    nodes.current.forEach((node) => {
      if (node) {
        node.rotation.y += 0.002;
      }
    });
  });

  return (
    <group>
      {[...Array(count)].map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group
            key={i}
            position={[x, 0, z]}
            ref={(el) => (nodes.current[i] = el)}
          >
            <mesh>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial
                color="#6366f1"
                emissive="#6366f1"
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {i < count - 1 && (
              <Line
                start={[x, 0, z]}
                end={[
                  Math.cos(angle + (Math.PI * 2) / count) * radius,
                  0,
                  Math.sin(angle + (Math.PI * 2) / count) * radius,
                ]}
                color="#a78bfa"
              />
            )}
          </group>
        );
      })}
    </group>
  );
};

const TechIcon = ({ type = 0 }) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.005;
  });

  const getShape = () => {
    switch (type) {
      case 0:
        return (
          <Text
            fontSize={0.8}
            color="#ffffff"
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          >
            AI
            <meshStandardMaterial
              color="#ffffff"
              emissive="#818cf8"
              emissiveIntensity={0.8}
              metalness={0.7}
            />
          </Text>
        );
      case 1:
        return (
          <mesh>
            <boxGeometry args={[0.7, 0.7, 0.1]} />
            <meshStandardMaterial
              color="#c7d2fe"
              emissive="#818cf8"
              emissiveIntensity={0.3}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        );
      case 2:
      default:
        return (
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 0.8, 6]} />
            <meshStandardMaterial
              color="#a5b4fc"
              emissive="#6366f1"
              emissiveIntensity={0.4}
              metalness={0.7}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
    }
  };

  return (
    <group ref={mesh}>
      {getShape()}
      <pointLight
        color={type === 0 ? "#818cf8" : type === 1 ? "#a5b4fc" : "#6366f1"}
        intensity={0.5}
        distance={3}
      />
    </group>
  );
};

const ConnectingLines = ({ count = 6, radius = 5 }) => {
  const lines = useRef([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    lines.current.forEach((line) => {
      if (line) {
        line.material.opacity = 0.3 + Math.sin(time * 2) * 0.2;
      }
    });
  });

  return (
    <>
      {[...Array(count)].map((_, i) => {
        const angle1 = (i / count) * Math.PI * 2;
        const angle2 = (((i + 2) % count) / count) * Math.PI * 2;

        return (
          <Line
            key={i}
            ref={(el) => (lines.current[i] = el)}
            start={[
              Math.cos(angle1) * radius,
              Math.sin(Date.now() * 0.0005 + i) * 0.3,
              Math.sin(angle1) * radius,
            ]}
            end={[
              Math.cos(angle2) * radius,
              Math.sin(Date.now() * 0.0005 + i + 2) * 0.3,
              Math.sin(angle2) * radius,
            ]}
            color="#a78bfa"
            dashed
          />
        );
      })}
    </>
  );
};

const Line = ({ start, end, color, dashed = false }) => {
  const ref = useRef();

  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints(
      [start, end].map((point) => new THREE.Vector3(...point))
    );
  }, [start, end]);

  return (
    <line ref={ref}>
      <bufferGeometry attach="geometry" />
      {dashed ? (
        <lineDashedMaterial
          attach="material"
          color={color}
          dashSize={0.2}
          gapSize={0.1}
          linewidth={1}
        />
      ) : (
        <lineBasicMaterial attach="material" color={color} linewidth={1} />
      )}
    </line>
  );
};

const CoeurFlottant = () => {
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

const BarreNavigation = ({ afficherConnexion, afficherInscription }) => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-200"
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
          <button
            onClick={afficherConnexion}
            className="px-6 py-2 text-gray-700 hover:text-violet-600 transition-colors"
          >
            Connexion
          </button>
          <button
            onClick={afficherInscription}
            className="px-6 py-2 bg-gradient-to-r from-blue-400 to-violet-500 text-white rounded-lg hover:from-blue-500 hover:to-violet-600 transition-all shadow-md"
          >
            Inscription
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default function Accueil() {
  const [afficherConnexion, setAfficherConnexion] = useState(false);
  const [afficherInscription, setAfficherInscription] = useState(false);

  return (
    <div className="min-h-screen text-gray-800 overflow-x-hidden">
      <FondAnime />

      {/* Nouveau fond 3D amélioré */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <ambientLight intensity={0.3} color="#a5b4fc" />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#818cf8" />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#6366f1"
          />
          <TechBackground />
        </Canvas>
      </div>

      <BarreNavigation
        afficherConnexion={() => setAfficherConnexion(true)}
        afficherInscription={() => setAfficherInscription(true)}
      />

      <AnimatePresence>
        {afficherConnexion && (
          <LoginForm
            onClose={() => setAfficherConnexion(false)}
            showInscription={() => {
              setAfficherConnexion(false);
              setAfficherInscription(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {afficherInscription && (
          <RegisterForm
            onClose={() => setAfficherInscription(false)}
            showConnexion={() => {
              setAfficherInscription(false);
              setAfficherConnexion(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
        {/* Section Hero */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 pt-12"
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gray-800 font-extrabold">
              Libérez votre potentiel
            </span>
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-blue-600/80 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Transformez les défis de l'IA en opportunités avec notre plateforme
            intelligente
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
              Commencez votre voyage
            </motion.button>
          </motion.div>
        </motion.header>

        {/* Section Fonctionnalités */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            {
              titre: "Analyse de CV",
              description:
                "Notre IA analyse et optimise votre CV pour le marché actuel.",
              icone: (
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
              couleur: "blue",
            },
            {
              titre: "Idées Business",
              description:
                "Découvrez des opportunités qui tirent parti de l'IA.",
              icone: (
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
              couleur: "violet",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-${feature.couleur}-100/60 hover:border-${feature.couleur}-200/80 transition-all shadow-sm`}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start mb-6">
                <div
                  className={`p-3 rounded-lg bg-${feature.couleur}-100/60 mr-4 border-2 border-${feature.couleur}-200/50`}
                >
                  {feature.icone}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {feature.titre}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <div
                  className={`h-px bg-gradient-to-r from-transparent via-${feature.couleur}-200/50 to-transparent mb-6`}
                ></div>
                <ul className="space-y-3">
                  {feature.titre === "Analyse de CV"
                    ? [
                        "Identification des points forts",
                        "Détection des faiblesses",
                        "Optimisation pour les ATS",
                        "Suggestions personnalisées",
                      ]
                    : [
                        "Analyse des tendances",
                        "Concepts personnalisés",
                        "Feuille de route",
                        "Évaluation des risques",
                      ].map((item, j) => (
                        <motion.li
                          key={j}
                          className="flex items-start text-gray-700"
                          whileHover={{ x: 3 }}
                        >
                          <span
                            className={`w-2 h-2 rounded-full bg-${feature.couleur}-400 mr-3 mt-2`}
                          ></span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section 3D améliorée */}
        <motion.div
          className="relative h-[500px] rounded-3xl overflow-hidden my-32 bg-white/10 backdrop-blur-sm border-2 border-blue-100/30 shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
            <pointLight
              position={[-10, -10, -10]}
              intensity={1}
              color="#3b82f6"
            />

            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[3, 0.3, 16, 100]} />
              <meshStandardMaterial
                color="#8b5cf6"
                emissive="#8b5cf6"
                emissiveIntensity={1.5}
                metalness={0.9}
                roughness={0.1}
                transparent
                opacity={0.9}
              />
            </mesh>

            <CoeurFlottant />

            <OrbitControls
              enableZoom={true}
              autoRotate
              autoRotateSpeed={0.5}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-blue-100/30 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                Futur propulsé par l'IA
              </h3>
              <p className="text-white/90 max-w-md mx-auto text-lg drop-shadow-md">
                Exploitez la puissance de l'IA pour booster votre potentiel
                professionnel
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Final */}
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
              Prêt à commencer
            </span>{" "}
            <span className="text-gray-800">votre transformation ?</span>
          </motion.h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Rejoignez les professionnels qui utilisent déjà l'IA pour accélérer
            leur carrière.
          </p>
          <motion.div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:from-blue-600 hover:to-violet-600 transition-all shadow-lg shadow-blue-400/30"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Commencer
            </motion.button>
            <motion.button
              className="px-8 py-3.5 bg-white/80 border-2 border-blue-200 rounded-lg text-lg font-medium text-gray-700 hover:bg-white transition-all shadow-sm"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              En savoir plus
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Pied de page */}
        <motion.footer
          className="text-center text-gray-500 text-sm mt-32 pb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} REBOOT. Tous droits réservés.</p>
        </motion.footer>
      </div>
    </div>
  );
}
