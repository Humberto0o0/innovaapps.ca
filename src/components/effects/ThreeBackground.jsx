// Effect: three.js background scene.
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function ParticleSphere({ count = 2400, radius = 1.6, x, y }) {
  const pointsRef = useRef(null);
  const groupRef = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = radius + (Math.random() - 0.5) * 0.08;

      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const width = typeof window !== "undefined" ? window.innerWidth : 1;
    const height = typeof window !== "undefined" ? window.innerHeight : 1;
    const mx = x ? x.get() : width / 2;
    const my = y ? y.get() : height / 2;
    const nx = (mx / width) * 2 - 1;
    const ny = (my / height) * 2 - 1;

    pointsRef.current.rotation.y += delta * 0.06;
    pointsRef.current.rotation.x += delta * 0.02;
    pointsRef.current.rotation.z += delta * 0.015;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        nx * 0.5,
        0.16
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -ny * 0.4,
        0.16
      );
    }

    const t = state.clock.elapsedTime;
    pointsRef.current.position.y = Math.sin(t * 0.25) * 0.035;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color={new THREE.Color("#7dd3fc")}
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh rotation={[0.2, 0.1, 0]}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color("#38bdf8")}
          transparent
          opacity={0.12}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function ThreeBackground({ x, y }) {
  const [count, setCount] = useState(1800);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const update = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCount(1100);
      } else if (width < 1280) {
        setCount(1600);
      } else {
        setCount(2200);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" style={{ filter: "blur(0.6px)" }}>
      <Canvas
        dpr={[1, 1.25]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 4], fov: 45 }}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[3, 2, 4]} intensity={0.9} color="#7dd3fc" />
        <pointLight position={[-3, -2, -4]} intensity={0.55} color="#60a5fa" />
        <ParticleSphere count={count} x={x} y={y} />
      </Canvas>
    </div>
  );
}
