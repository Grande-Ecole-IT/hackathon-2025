/* eslint-disable no-unused-vars */
import { extend } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import { useState } from "react";
import { Link } from "react-router";
import { LineDashedMaterial } from "three";
import robotAnimation from "../assets/animation/robot-3.json";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import SignupForm from "./SignupForm";

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
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-violet-600"
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

const BarreNavigation = ({ afficherConnexion, afficherInscription }) => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          {/* Logo avec symbole IA intégré */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            {/* Cerveau stylisé */}
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4C8 4 4 8 4 12C4 16 8 20 12 20C16 20 20 16 20 12C20 8 16 4 12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L15 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            {/* Effet circuit intégré */}
            <div className="absolute inset-0 rounded-xl border-2 border-white/20 pointer-events-none" />
          </div>

          {/* Texte avec animation */}
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
              RAIsilience
            </span>
          </div>
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
          // <RegisterForm
          //   onClose={() => setAfficherInscription(false)}
          //   showConnexion={() => {
          //     setAfficherInscription(false);
          //     setAfficherConnexion(true);
          //   }}
          // />
          <SignupForm setAfficherInscription={setAfficherInscription} />
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
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <motion.h1
                className="text-6xl md:text-7xl font-bold mb-6 tracking-tight text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-gray-800 font-extrabold">
                  Libérez votre potentiel
                </span>
              </motion.h1>

              <motion.p
                className="text-2xl md:text-3xl text-blue-600/80 leading-relaxed text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Transformez les défis de l'IA en opportunités avec notre
                plateforme intelligente
              </motion.p>

              <motion.div
                className="mt-16 text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <motion.button
                  className="px-10 py-4 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl text-xl font-semibold text-white hover:from-blue-600 hover:to-violet-600 transition-all shadow-lg shadow-blue-400/30"
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Améliorer vos compétences
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Lottie
                animationData={robotAnimation}
                loop={true}
                autoplay={true}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </motion.header>

        {/* Section Fonctionnalités */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto mb-32"
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
              couleur: "blue",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-${feature.couleur}-100 hover:border-${feature.couleur}-200/80 transition-all shadow-sm`}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start mb-6">
                <div
                  className={`p-3 rounded-lg bg-${feature.couleur}-100/80 mr-4 border-2 border-${feature.couleur}-200/50`}
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
