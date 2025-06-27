import { Suspense, useRef, useState, useEffect } from 'react'
import Placeholder from './Placeholder.jsx'
import Hamburger from './Hamburger.jsx'
import { useFrame, useThree } from '@react-three/fiber'

export default function Experience({ rotation })
{
    const { camera } = useThree()
    const currentRotation = useRef(30)
    const targetRotation = useRef(30)
    const animationProgress = useRef(1)
    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    const mouseRef = useRef({ x: 0, y: 0 })
    
    // Camera positie in het midden op ooghoogte
    camera.position.set(0, 0.8, 0)
    
    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (event) => {
            // Normaliseer mouse positie (-1 tot 1)
            const x = (event.clientX / window.innerWidth) * 2 - 1
            const y = -(event.clientY / window.innerHeight) * 2 + 1
            setMouse({ x, y })
        }
        
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])
    
    // Update target rotation wanneer prop verandert
    if (targetRotation.current !== rotation) {
        targetRotation.current = rotation
        animationProgress.current = 0
    }
    
    // Update camera rotatie met animatie
    useFrame(() => {
        // Smooth mouse movement (minder responsief)
        mouseRef.current.x += (mouse.x - mouseRef.current.x) * 0.01
        mouseRef.current.y += (mouse.y - mouseRef.current.y) * 0.01
        
        // Animatie progress (0 tot 1)
        if (animationProgress.current < 1) {
            animationProgress.current = Math.min(animationProgress.current + 0.00375, 1)
            
            // Smooth ease-in-out function (smoothstep)
            const easeInOutSmooth = (t) => {
                // Smoothstep function voor zeer vloeiende animatie
                const x = Math.max(0, Math.min(1, t))
                return x * x * (3 - 2 * x)
            }
            
            const easedProgress = easeInOutSmooth(animationProgress.current)
            
            // Bereken rotatie verschil
            const start = currentRotation.current
            const end = targetRotation.current
            const diff = end - start
            
            // Interpoleer met easing zonder kortste pad logica
            const newRotation = start + (diff * easedProgress)
            currentRotation.current = newRotation
        }
        
        // Bereken basis rotatie
        const baseAngleInRadians = (currentRotation.current * Math.PI) / 180
        
        // Mouse invloed in graden (omgekeerd voor correcte richting)
        const mouseRotationOffset = -mouseRef.current.x * 7.5 // 7.5 graden max offset
        const mouseAngleInRadians = (mouseRotationOffset * Math.PI) / 180
        
        // Combineer basis rotatie met mouse offset
        const totalAngleInRadians = baseAngleInRadians + mouseAngleInRadians
        
        // Bereken kijk richting
        const lookAtX = Math.sin(totalAngleInRadians) * 10
        const lookAtY = 2.0 + mouseRef.current.y * 1.2 // Standaard omhoog (2.0) + extra muis beweging
        const lookAtZ = Math.cos(totalAngleInRadians) * 10
        
        camera.lookAt(lookAtX, lookAtY, lookAtZ)
    })
    
    return <>
        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } shadow-normalBias={ 0.04 } />
        <ambientLight intensity={ 1.5 } />

        <Suspense fallback={ <Placeholder position-y={ 0.5 } scale={ [ 2, 3, 2 ] } /> }>
            <Hamburger scale={ 0.35 } />
        </Suspense>
    </>
}