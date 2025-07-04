import { Html } from '@react-three/drei'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function ProjectCubes() {
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const meshRefs = useRef([])
    
    // 6 unieke kleuren voor de projecten
    const colors = [
        '#FF6B6B', // Rood
        '#4ECDC4', // Turquoise
        '#45B7D1', // Blauw
        '#96CEB4', // Groen
        '#FFEAA7', // Geel
        '#DDA0DD'  // Paars
    ]
    
    // Project namen (later kun je hier echte project data gebruiken)
    const projects = [
        'Project 1',
        'Project 2', 
        'Project 3',
        'Project 4',
        'Project 5',
        'Project 6'
    ]
    
    // Posities in een cirkel rond de camera, elke 60 graden
    // Camera staat op (0, 0.8, 0) en kijkt naar buiten
    const distance = 3 // Afstand van camera (dichter bij)
    const height = 0.8 // Hoogte van kubussen (zelfde als camera)
    
    const positions = []
    for (let i = 0; i < 6; i++) {
        const angle = (i * 60 + 30) * (Math.PI / 180) // 60 graden in radialen + 30 graden offset
        const x = Math.sin(angle) * distance
        const z = Math.cos(angle) * distance
        positions.push([x, height, z])
    }
    
    // Animatie voor hover effect
    useFrame(() => {
        meshRefs.current.forEach((mesh, index) => {
            if (mesh) {
                // Target Y positie
                const targetY = hoveredIndex === index ? height + 0.05 : height
                // Smooth lerp naar target positie
                mesh.position.y += (targetY - mesh.position.y) * 0.05
                
                // Rotatie animatie bij hover
                if (hoveredIndex === index) {
                    mesh.rotation.y += 0.005 // Heel langzame rotatie
                }
            }
        })
    })
    
    return (
        <group>
            {colors.map((color, index) => {
                // Bereken licht positie achter de kubus
                const angle = (index * 60 + 30) * (Math.PI / 180)
                const lightDistance = distance + 1.5 // 1.5 units achter de kubus
                const lightX = Math.sin(angle) * lightDistance
                const lightZ = Math.cos(angle) * lightDistance
                
                return (
                    <group key={index}>
                        <mesh
                            ref={el => meshRefs.current[index] = el}
                            position={positions[index]}
                            castShadow
                            receiveShadow
                            onPointerOver={() => setHoveredIndex(index)}
                            onPointerOut={() => setHoveredIndex(null)}
                        >
                            <boxGeometry args={[0.5, 0.75, 0.5]} />
                            <meshStandardMaterial 
                                color={color} 
                                emissive={hoveredIndex === index ? color : '#000000'}
                                emissiveIntensity={hoveredIndex === index ? 0.05 : 0}
                            />
                        </mesh>
                        
                        {/* View Project button */}
                        <Html
                            position={[positions[index][0], positions[index][1] - 0.6, positions[index][2]]}
                            center
                            distanceFactor={4}
                        >
                            <button
                                style={{
                                    background: hoveredIndex === index ? color : 'rgba(0, 0, 0, 0.8)',
                                    color: 'white',
                                    border: `2px solid ${color}`,
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    whiteSpace: 'nowrap',
                                    transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                                    opacity: hoveredIndex === index ? 1 : 0.8
                                }}
                                onClick={() => {
                                    console.log(`View ${projects[index]}`)
                                    // Hier kun je navigatie toevoegen
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                View Project
                            </button>
                        </Html>
                        
                        <pointLight
                            position={[lightX, height + 1, lightZ]}
                            color="#ffffff"
                            intensity={1.5}
                            distance={8}
                            decay={2}
                            castShadow={false}
                        />
                    </group>
                )
            })}
        </group>
    )
}