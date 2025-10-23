'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BirthdayShootMinimal({ auto = true, autoDelay = 700 }) {
    const [stage, setStage] = useState('hidden') // hidden -> idle -> shooting -> explode -> fireworks -> message -> gone
    const [explosionParts, setExplosionParts] = useState([])
    const [fireworks, setFireworks] = useState([])

    useEffect(() => {
        // Show animation only after 2 Nov 2025
        const today = new Date()
        const showDate = new Date('2025-11-02T00:00:00')
        if (today >= showDate) {
            setStage('idle')
        }
    }, [])

    useEffect(() => {
        if (stage === 'explode') {
            const parts = Array.from({ length: 36 }).map((_, i) => ({
                id: `e-${i}`,
                angle: Math.random() * Math.PI * 2,
                speed: 40 + Math.random() * 140,
                size: 6 + Math.random() * 12,
                life: 700 + Math.random() * 900,
                color: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#C084FC"][Math.floor(Math.random() * 5)],
            }))
            setExplosionParts(parts)
            setTimeout(() => setStage('fireworks'), 600)
        }

        if (stage === 'fireworks') {
            const bursts = Array.from({ length: 4 }).map((_, i) => ({
                id: `f-${i}`,
                xOffset: (i - 1.5) * 80 + (Math.random() * 40 - 20),
                delay: i * 250 + Math.random() * 200,
                color: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#C084FC"][Math.floor(Math.random() * 5)],
            }))
            setFireworks(bursts)
            setTimeout(() => setStage('message'), 1800)
        }

        if (stage === 'idle') {
            setExplosionParts([])
            setFireworks([])
        }
    }, [stage])

    useEffect(() => {
        if (!auto || stage !== 'idle') return
        const t = setTimeout(() => {
            setStage('shooting')
        }, autoDelay)
        return () => clearTimeout(t)
    }, [auto, autoDelay, stage])

    useEffect(() => {
        if (stage === 'shooting') {
            const t = setTimeout(() => setStage('explode'), 900)
            return () => clearTimeout(t)
        }
    }, [stage])

    useEffect(() => {
        if (stage === 'message') {
            const t = setTimeout(() => setStage('gone'), 2600)
            return () => clearTimeout(t)
        }
    }, [stage])

    const computeTarget = () => {
        if (typeof window === 'undefined') return { x: 420, y: -320 }
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        const x = vw * (vw < 480 ? 0.55 : vw < 900 ? 0.52 : 0.58)
        const y = -vh * (vw < 480 ? 0.58 : vw < 900 ? 0.5 : 0.46)
        return { x, y }
    }

    const target = computeTarget()

    if (stage === 'hidden') return null

    return (
        <AnimatePresence>
            {stage !== 'gone' && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: stage === 'gone' ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 pointer-events-none z-50 overflow-hidden bg-transparent flex items-center justify-center"
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        <AnimatePresence>
                            {stage !== 'explode' && stage !== 'fireworks' && stage !== 'message' && (
                                <motion.div
                                    key="num15"
                                    initial={{ opacity: 1, scale: 1 }}
                                    animate={stage === 'shooting' ? { scale: 0.98 } : { scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="select-none pointer-events-none"
                                >
                                    <div className="font-bold leading-none text-white text-[clamp(48px,12vw,160px)] md:text-[clamp(72px,14vw,220px)] drop-shadow-2xl">15</div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {explosionParts.map((p) => (
                                <Particle key={p.id} p={p} />
                            ))}
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {fireworks.map((b) => (
                                <FireworkBurst key={b.id} burst={b} />
                            ))}
                        </div>

                        <AnimatePresence>
                            {stage === 'message' && (
                                <motion.div
                                    key="message"
                                    initial={{ scale: 0.6, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.6, opacity: 0 }}
                                    transition={{ type: 'spring', stiffness: 140, damping: 16 }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <motion.div className="text-center">
                                        <motion.div
                                            className="font-extrabold text-transparent bg-clip-text 
               bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 
               text-[clamp(28px,8vw,84px)] md:text-[clamp(40px,9vw,110px)] 
               drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                                        >
                                            16
                                        </motion.div>

                                        <motion.div
                                            className="font-extrabold text-transparent bg-clip-text 
               bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
               text-[clamp(28px,8vw,84px)] md:text-[clamp(48px,10vw,120px)] 
               drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                                        >
                                            Happy Birthday!
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.9 }}
                                            transition={{ delay: 0.3 }}
                                            className="mt-2 text-sm text-transparent bg-clip-text 
               bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 
               drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                                        >
                                            Wishing you the best 🎉
                                        </motion.div>
                                    </motion.div>

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <AnimatePresence>
                        {stage === 'shooting' && (
                            <motion.div
                                className="absolute left-6 bottom-6 w-6 h-6 rounded-full shadow-xl"
                                initial={{ x: 0, y: 0, scale: 1 }}
                                animate={{ x: target.x, y: target.y, scale: 1 }}
                                transition={{ duration: 0.95, ease: [0.3, 0.7, 0.25, 1] }}
                                style={{ background: 'linear-gradient(45deg,#FFD93D,#FF6B6B)' }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

function Particle({ p }) {
    const style = {
        width: p.size,
        height: p.size,
        background: p.color,
        borderRadius: '50%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        boxShadow: `0 6px 18px ${p.color}44`,
    }

    useEffect(() => {
        const el = document.getElementById(`part-${p.id}`)
        if (!el) return
        const start = performance.now()
        let raf
        function frame(t) {
            const tElapsed = t - start
            const progress = Math.min(tElapsed / p.life, 1)
            const distance = p.speed * easeOutQuad(progress)
            const x = Math.cos(p.angle) * distance
            const y = Math.sin(p.angle) * distance
            el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${1 - progress})`
            el.style.opacity = String(1 - progress)
            if (progress < 1) raf = requestAnimationFrame(frame)
        }
        raf = requestAnimationFrame(frame)
        return () => cancelAnimationFrame(raf)
    }, [])

    return <div id={`part-${p.id}`} style={style} />
}

function FireworkBurst({ burst }) {
    const particles = Array.from({ length: 28 }).map((_, i) => ({
        id: `${burst.id}-p-${i}`,
        angle: (i / 28) * Math.PI * 2 + (Math.random() * 0.2 - 0.1),
        speed: 80 + Math.random() * 220,
        size: 4 + Math.random() * 8,
        life: 900 + Math.random() * 700,
        color: burst.color,
    }))

    return (
        <div style={{ position: 'absolute', left: `calc(50% + ${burst.xOffset}px)`, top: '40%' }}>
            {particles.map((p) => (
                <Particle key={p.id} p={p} />
            ))}
        </div>
    )
}

function easeOutQuad(t) {
    return t * (2 - t)
}