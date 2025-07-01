import React from "react";
import { useGLTF } from "@react-three/drei";

export default function PortfolioClean(props) {
  const gltf = useGLTF("./church_whitewindows.glb");

  return (
    <group {...props}>
      <primitive object={gltf.scene} />
    </group>
  );
}

useGLTF.preload("./church_whitewindows.glb");