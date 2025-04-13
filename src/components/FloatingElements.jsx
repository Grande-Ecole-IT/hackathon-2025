import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const FloatingWhiteElements = () => {
  const group = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    group.current.rotation.x = time * 0.1;
    group.current.rotation.y = time * 0.15;
  });

  return (
    <group ref={group}>
      {/* Grand icosaèdre blanc */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[3, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Petits éléments orbitaux */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.sin(angle) * 5;
        const z = Math.cos(angle) * 5;
        return (
          <mesh key={i} position={[x, 0, z]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.4}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default FloatingWhiteElements;
