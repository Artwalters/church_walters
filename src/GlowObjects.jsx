import { useRef } from 'react'

export default function GlowObjects() {
    // Plaats hier objecten die een glow/godray effect moeten krijgen
    // Bijvoorbeeld de ramen van de kerk
    return (
        <group>
            {/* Witte glow spheres op de posities van de ramen */}
            <mesh position={[2, 3, 0]}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
            </mesh>
            
            <mesh position={[-2, 3, 0]}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
            </mesh>
            
            {/* Voeg meer glow objecten toe waar nodig */}
        </group>
    )
}