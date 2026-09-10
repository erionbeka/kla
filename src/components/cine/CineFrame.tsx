import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/util'
import { CineParticles } from './CineParticles'

interface Props {
  children: ReactNode
  className?: string
  letterbox?: boolean
  particles?: 'embers' | 'ash' | 'rain' | 'none'
  density?: number
  tone?: 'day' | 'night'
  flash?: boolean
  duration?: number
}

export function CineFrame({
  children,
  className = '',
  letterbox = false,
  particles = 'none',
  density,
  tone = 'day',
  duration = 16,
}: Props) {
  const reduced = useReducedMotion()
  return (
    <div
      className={cn('group relative overflow-hidden bg-ink', tone === 'night' && '', className)}
      style={{
        boxShadow:
          'inset 0 0 0 1px rgba(232,228,218,0.06), inset 0 0 90px rgba(0,0,0,0.78), inset 0 0 22px rgba(0,0,0,0.55)',
      }}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={
          reduced
            ? {}
            : {
                scale: [1.02, 1.14],
                x: [0, -1.6],
                y: [0, 1.4],
              }
        }
        transition={{ duration, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
      >
        {children}
      </motion.div>

      {tone === 'night' && (
        <div className="pointer-events-none absolute inset-0 mix-blend-multiply" style={{ background: 'rgba(14,16,26,0.34)' }} />
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 12%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.35) 100%)',
        }}
      />
      {letterbox && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[calc(100%*0.085)] bg-black" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[calc(100%*0.085)] bg-black" />
        </>
      )}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-60"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(255,255,255,0.015) 3px, rgba(0,0,0,0) 4px)',
        }}
      />
      {particles !== 'none' && <CineParticles kind={particles} density={density} />}
    </div>
  )
}