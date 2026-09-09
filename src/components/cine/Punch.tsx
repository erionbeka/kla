import { motion } from 'motion/react'
import { cn, EASE } from '../../lib/util'

interface WordProps {
  words: string[]
  mark?: number
  className?: string
  delay?: number
}

export function PunchWords({ words, mark = -1, className = '', delay = 0 }: WordProps) {
  return (
    <span className={cn('inline', className)}>
      {words.map((wd, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: '0.6em', scale: 0.92, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ delay: delay + i * 0.1, duration: 0.7, ease: EASE }}
          className={cn('inline-block whitespace-pre', i === mark && 'text-ember')}
        >
          {wd}
        </motion.span>
      ))}
    </span>
  )
}