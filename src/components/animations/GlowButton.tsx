import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
}

export function GlowButton({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button'
}: GlowButtonProps) {
  const baseStyles = 'relative font-semibold rounded-full transition-all duration-300 overflow-hidden';
  
  const variants = {
    primary: 'bg-[#7B61FF] text-white hover:shadow-[0_0_30px_rgba(123,97,255,0.5)] hover:shadow-[#7B61FF]/30',
    secondary: 'bg-white text-[#111216] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]',
    outline: 'bg-transparent border-2 border-[#7B61FF] text-[#7B61FF] hover:bg-[#7B61FF] hover:text-white'
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg'
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ 
        scale: 1.02,
        y: -2
      }}
      whileTap={{ 
        scale: 0.98 
      }}
      transition={{ 
        type: 'spring',
        stiffness: 400,
        damping: 17
      }}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
