import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export function GlassCard({ 
  children, 
  className = '',
  hoverEffect = true,
  onClick
}: GlassCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-white/70 backdrop-blur-xl
        border border-white/20
        rounded-[28px]
        shadow-[0_18px_50px_rgba(0,0,0,0.10)]
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      whileHover={hoverEffect ? {
        y: -8,
        scale: 1.02,
        boxShadow: '0 25px 60px rgba(0,0,0,0.15)'
      } : {}}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-[#7B61FF]/5 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
