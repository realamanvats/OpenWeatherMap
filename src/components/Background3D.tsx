import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Icosahedron, Box } from '@react-three/drei';

function WeatherParticles() {
  const group = useRef<THREE.Group>();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={group}>
      {/* Suns */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Sphere
          key={`sun-${i}`}
          position={[
            Math.random() * 20 - 10,
            Math.random() * 10 - 5,
            Math.random() * 20 - 10
          ]}
          scale={1.2}
        >
          <meshStandardMaterial emissive="#FFD700" emissiveIntensity={1.2} />
        </Sphere>
      ))}

      {/* Clouds */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Icosahedron
          key={`cloud-${i}`}
          args={[1, 0]}
          position={[
            Math.random() * 30 - 15,
            Math.random() * 10,
            Math.random() * 30 - 15
          ]}
          scale={[2, 1.2, 1.2]}
        >
          <meshStandardMaterial color="#f0f0f0" opacity={0.7} transparent />
        </Icosahedron>
      ))}

      {/* Raindrops */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Box
          key={`raindrop-${i}`}
          args={[0.1, 0.4, 0.1]}
          position={[
            Math.random() * 20 - 10,
            Math.random() * 15 - 7,
            Math.random() * 20 - 10
          ]}
        >
          <meshStandardMaterial color="#00bfff" transparent opacity={0.5} />
        </Box>
      ))}

      {/* Snowflakes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Sphere
          key={`snow-${i}`}
          args={[0.1]}
          position={[
            Math.random() * 25 - 12,
            Math.random() * 15 - 5,
            Math.random() * 25 - 12
          ]}
        >
          <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />
        </Sphere>
      ))}
    </group>
  );
}

const Weather3DBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} />
        <WeatherParticles />
      </Canvas>
    </div>
  );
};

export default Weather3DBackground;
