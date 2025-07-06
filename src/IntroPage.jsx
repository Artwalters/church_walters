import { Canvas } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import PerformanceMonitor from './FPSCounter.jsx'
import * as THREE from 'three'

function RotatingSphere() {
    const meshRef = useRef()
    
    // Laad normal map texture
    const normalMap = useTexture('./testnm.jpg') // Nieuwe vogel/bloemen normal map
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping
    normalMap.repeat.set(4, 3) // Minder herhalingen voor dit gedetailleerde patroon
    normalMap.anisotropy = 16
    
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.0001 // Horizontale rotatie
            // X-rotatie verwijderd voor pure horizontale draaiing
        }
    })
    
    return (
        <mesh ref={meshRef} position={[0, 0, -2.5]}>
            <sphereGeometry args={[6, 128, 128]} />
            <meshStandardMaterial 
                color="#404040" 
                metalness={0.3}
                roughness={0.6}
                normalMap={normalMap}
                normalScale={[2, 2]}
            />
        </mesh>
    )
}

export default function IntroPage({ onEnter }) {
    return (
        <div style={{ 
            width: '100vw', 
            height: '100vh', 
            backgroundColor: '#000',
            position: 'relative'
        }}>
            <Canvas
                camera={{
                    position: [0, 0, 9],
                    fov: 25
                }}
                style={{ width: '100%', height: '100%' }}
            >
                <PerformanceMonitor />
                <ambientLight intensity={0.4} />
                <pointLight 
                    position={[0, 0, 8]} 
                    intensity={25}
                    color="#ffffff"
                    distance={20}
                    decay={2}
                />
                <RotatingSphere />
            </Canvas>
            
            {/* Subtiele continue button */}
            <button
                onClick={onEnter}
                style={{
                    position: 'absolute',
                    bottom: '30px',
                    right: '30px',
                    padding: '12px 24px',
                    backgroundColor: 'rgba(78, 205, 196, 0.8)',
                    color: 'white',
                    border: '1px solid rgba(78, 205, 196, 0.5)',
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    opacity: 0.7
                }}
                onMouseOver={(e) => {
                    e.target.style.opacity = '1'
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.backgroundColor = 'rgba(78, 205, 196, 1)'
                }}
                onMouseOut={(e) => {
                    e.target.style.opacity = '0.7'
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.backgroundColor = 'rgba(78, 205, 196, 0.8)'
                }}
            >
                Continue →
            </button>
        </div>
    )
}