import React, { useEffect } from "react";
import { useGLTF, MeshReflectorMaterial } from "@react-three/drei";

export default function PortfolioClean(props) {
  const gltf = useGLTF("./church_whitewindows.glb");

  useEffect(() => {
    // Verberg de originele floor mesh
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.name === "floor") {
        child.visible = false; // Verberg de originele vloer
        console.log("Originele floor mesh verborgen voor reflecties!");
      }
    });
  }, [gltf]);

  return (
    <group {...props}>
      <primitive object={gltf.scene} />
      {/* Voeg een reflecterende vloer toe op dezelfde positie */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.3, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[0, 0]}
          resolution={1024}
          mixBlur={0}
          mixStrength={30}
          roughness={0.1}
          depthScale={0.5}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#ffffff"
          metalness={0}
          mirror={0.5}
          frames={30}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("./church_whitewindows.glb");