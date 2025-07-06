import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import PerformanceMonitor from './FPSCounter.jsx'
import IntroPage from './IntroPage.jsx'
import { useState, useRef, useEffect } from 'react'

function App() {
    const [currentPage, setCurrentPage] = useState('intro') // Start met intro pagina
    const [rotation, setRotation] = useState(30)
    const [isAnimating, setIsAnimating] = useState(false)
    const touchStartRef = useRef(null)
    const mouseStartRef = useRef(null)
    const containerRef = useRef(null)
    
    const rotateLeft = () => {
        if (!isAnimating) {
            setIsAnimating(true)
            setRotation((prev) => prev + 60)
            setTimeout(() => setIsAnimating(false), 1000) // Debounce 1 seconde
        }
    }
    
    const rotateRight = () => {
        if (!isAnimating) {
            setIsAnimating(true)
            setRotation((prev) => prev - 60)
            setTimeout(() => setIsAnimating(false), 1000) // Debounce 1 seconde
        }
    }
    
    // Swipe detection (touch en mouse)
    useEffect(() => {
        // Touch events
        const handleTouchStart = (e) => {
            touchStartRef.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                time: Date.now()
            }
        }
        
        const handleTouchEnd = (e) => {
            if (!touchStartRef.current) return
            
            const touchEnd = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
                time: Date.now()
            }
            
            const deltaX = touchEnd.x - touchStartRef.current.x
            const deltaY = touchEnd.y - touchStartRef.current.y
            const deltaTime = touchEnd.time - touchStartRef.current.time
            
            // Minimale swipe afstand en tijd
            const minSwipeDistance = 50
            const maxSwipeTime = 1000
            
            // Check of het een horizontale swipe is
            if (Math.abs(deltaX) > Math.abs(deltaY) && 
                Math.abs(deltaX) > minSwipeDistance && 
                deltaTime < maxSwipeTime) {
                
                if (deltaX > 0) {
                    // Swipe rechts
                    rotateLeft()
                } else {
                    // Swipe links
                    rotateRight()
                }
            }
            
            touchStartRef.current = null
        }
        
        // Mouse events (desktop swipe)
        const handleMouseDown = (e) => {
            mouseStartRef.current = {
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            }
        }
        
        const handleMouseUp = (e) => {
            if (!mouseStartRef.current) return
            
            const mouseEnd = {
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            }
            
            const deltaX = mouseEnd.x - mouseStartRef.current.x
            const deltaY = mouseEnd.y - mouseStartRef.current.y
            const deltaTime = mouseEnd.time - mouseStartRef.current.time
            
            // Minimale swipe afstand en tijd voor mouse
            const minSwipeDistance = 75
            const maxSwipeTime = 1000
            
            // Check of het een horizontale swipe is
            if (Math.abs(deltaX) > Math.abs(deltaY) && 
                Math.abs(deltaX) > minSwipeDistance && 
                deltaTime < maxSwipeTime) {
                
                if (deltaX > 0) {
                    // Swipe rechts
                    rotateLeft()
                } else {
                    // Swipe links
                    rotateRight()
                }
            }
            
            mouseStartRef.current = null
        }
        
        const container = containerRef.current
        if (container) {
            // Touch events
            container.addEventListener('touchstart', handleTouchStart, { passive: true })
            container.addEventListener('touchend', handleTouchEnd, { passive: true })
            
            // Mouse events
            container.addEventListener('mousedown', handleMouseDown)
            container.addEventListener('mouseup', handleMouseUp)
            
            return () => {
                container.removeEventListener('touchstart', handleTouchStart)
                container.removeEventListener('touchend', handleTouchEnd)
                container.removeEventListener('mousedown', handleMouseDown)
                container.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [isAnimating])
    
    // Render intro pagina
    if (currentPage === 'intro') {
        return <IntroPage onEnter={() => setCurrentPage('portfolio')} />
    }
    
    // Render portfolio pagina
    return (
        <div ref={containerRef} style={{ width: '100vw', height: '100vh', touchAction: 'pan-y' }}>
            <Canvas
                shadows
                camera={ {
                    fov: 50,
                    near: 0.1,
                    far: 200,
                    position: [ - 4, 3, 6 ]
                } }
            >
                <PerformanceMonitor />
                <Experience rotation={rotation} />
            </Canvas>
            
            {/* Navigatie knoppen */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '20px',
                zIndex: 1000
            }}>
                <button 
                    onClick={rotateLeft}
                    style={{
                        padding: '10px 20px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        backgroundColor: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px'
                    }}
                >
                    ← Links
                </button>
                <button 
                    onClick={rotateRight}
                    style={{
                        padding: '10px 20px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        backgroundColor: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px'
                    }}
                >
                    Rechts →
                </button>
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)