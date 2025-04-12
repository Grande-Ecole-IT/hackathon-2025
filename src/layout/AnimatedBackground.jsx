import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const HumanWorld = () => {
  const peopleRef = useRef([]);
  const projectsRef = useRef([]);
  const connectionsRef = useRef([]);

  // Personnes et leurs cercles sociaux
  const people = [];
  for (let i = 0; i < 15; i++) {
    people.push({
      position: [(Math.random() - 0.5) * 15, 0, (Math.random() - 0.5) * 15],
      speed: 0.2 + Math.random() * 0.3,
      scale: 0.8 + Math.random() * 0.4,
    });
  }

  // Projets collaboratifs (représentés par des objets abstraits)
  const projects = [];
  for (let i = 0; i < 8; i++) {
    projects.push({
      position: [(Math.random() - 0.5) * 10, 0, (Math.random() - 0.5) * 10],
      rotationSpeed: 0.1 + Math.random() * 0.2,
    });
  }

  // Connexions entre les personnes
  const connections = [];
  for (let i = 0; i < 20; i++) {
    const from = Math.floor(Math.random() * people.length);
    const to = Math.floor(Math.random() * people.length);
    if (from !== to) {
      connections.push({
        from: people[from].position,
        to: people[to].position,
        speed: 0.5 + Math.random(),
      });
    }
  }

  useFrame(({ clock }) => {
    // Animation des personnes (léger mouvement de respiration)
    peopleRef.current.forEach((person, i) => {
      if (person) {
        person.position.y =
          Math.sin(clock.getElapsedTime() * people[i].speed) * 0.2;
        person.rotation.y = clock.getElapsedTime() * 0.05;
      }
    });

    // Animation des projets
    projectsRef.current.forEach((project, i) => {
      if (project) {
        project.rotation.y = clock.getElapsedTime() * projects[i].rotationSpeed;
        project.position.y = Math.sin(clock.getElapsedTime() * 0.5 + i) * 0.3;
      }
    });

    // Animation des connexions
    connectionsRef.current.forEach((conn, i) => {
      if (conn) {
        const wave =
          Math.sin(clock.getElapsedTime() * connections[i].speed) * 0.3;
        conn.position.y = wave;
      }
    });
  });

  // Personne stylisée (version plus organique)
  const Person = ({ index }) => {
    return (
      <group
        position={people[index].position}
        ref={(el) => (peopleRef.current[index] = el)}
        scale={people[index].scale}
      >
        {/* Tête */}
        <mesh position={[0, 1.7, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>

        {/* Corps (plus organique) */}
        <mesh position={[0, 1.1, 0]}>
          <capsuleGeometry args={[0.25, 0.8, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>

        {/* Bras (courbés) */}
        <group position={[0, 1.4, 0]}>
          <mesh position={[0.3, -0.1, 0]} rotation={[0, 0, 0.5]}>
            <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          <mesh position={[-0.3, -0.1, 0]} rotation={[0, 0, -0.5]}>
            <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
        </group>

        {/* Aura de connexion */}
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial
            color="#bbdefb"
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Point de connexion */}
        <pointLight
          color="#64b5f6"
          intensity={0.3}
          distance={1.5}
          position={[0, 1.7, 0]}
        />
      </group>
    );
  };

  // Projet collaboratif (abstrait)
  const Project = ({ index }) => {
    return (
      <group
        position={[
          projects[index].position[0],
          0.5,
          projects[index].position[2],
        ]}
        ref={(el) => (projectsRef.current[index] = el)}
      >
        <mesh>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#e3f2fd"
            emissiveIntensity={0.2}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>

        {/* Participants au projet (petites sphères) */}
        {[...Array(4)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.sin((i * Math.PI) / 2) * 1,
              0.2,
              Math.cos((i * Math.PI) / 2) * 1,
            ]}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#e3f2fd" transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
    );
  };

  // Connexion entre personnes
  const Connection = ({ index }) => {
    const start = connections[index].from;
    const end = connections[index].to;
    const center = [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2,
      (start[2] + end[2]) / 2,
    ];
    const length = Math.sqrt(
      Math.pow(end[0] - start[0], 2) + Math.pow(end[2] - start[2], 2)
    );
    const angle = Math.atan2(end[2] - start[2], end[0] - start[0]);

    return (
      <group
        position={[center[0], 1, center[2]]}
        rotation={[0, -angle, 0]}
        ref={(el) => (connectionsRef.current[index] = el)}
      >
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, length, 8]} />
          <meshStandardMaterial
            color="#bbdefb"
            emissive="#64b5f6"
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    );
  };

  return (
    <>
      {/* Sol organique blanc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30, 64, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>

      {/* Marques de terrain subtiles */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[30, 30, 10, 10]} />
        <meshStandardMaterial
          color="#f5f5f5"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Personnes */}
      {people.map((_, i) => (
        <Person key={`person-${i}`} index={i} />
      ))}

      {/* Projets */}
      {projects.map((_, i) => (
        <Project key={`project-${i}`} index={i} />
      ))}

      {/* Connexions */}
      {connections.map((_, i) => (
        <Connection key={`connection-${i}`} index={i} />
      ))}

      {/* Lumières ambiantes */}
      <pointLight
        position={[0, 5, 5]}
        color="#ffffff"
        intensity={0.5}
        distance={20}
      />
      <pointLight
        position={[5, 3, -5]}
        color="#bbdefb"
        intensity={0.3}
        distance={15}
      />
    </>
  );
};

const HumanCenteredBackground = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-white">
      <Canvas
        shadows
        camera={{ position: [0, 8, 12], fov: 50 }}
        gl={{
          antialias: true,
          toneMapping: THREE.NoToneMapping,
        }}
      >
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.7} color="#ffffff" />
        <directionalLight
          position={[5, 10, 7]}
          intensity={1}
          color="#ffffff"
          castShadow
          shadow-mapSize={1024}
        />

        <HumanWorld />

        <Environment preset="park" />
        <OrbitControls
          enableZoom={true}
          zoomSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          enablePan={false}
          minDistance={8}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
};

export default HumanCenteredBackground;
