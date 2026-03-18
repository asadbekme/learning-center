import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GlowButton, FloatingElement } from '@/components/animations';
import { Link } from 'react-router-dom';

const heroImages = [
  { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80', style: 'top-[8%] left-[5%] w-48 h-64 rotate-[-6deg]' },
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80', style: 'top-[5%] right-[8%] w-56 h-40 rotate-[4deg]' },
  { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80', style: 'bottom-[15%] left-[3%] w-44 h-52 rotate-[5deg]' },
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80', style: 'bottom-[10%] right-[5%] w-52 h-48 rotate-[-3deg]' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80', style: 'top-[35%] left-[12%] w-40 h-32 rotate-[3deg]' },
  { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80', style: 'top-[30%] right-[15%] w-36 h-44 rotate-[-5deg]' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F6F7FA]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/5 via-transparent to-[#A78BFA]/5" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B61FF]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A78BFA]/10 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Image Cards */}
      <div className="absolute inset-0 pointer-events-none">
        {heroImages.map((img, index) => (
          <FloatingElement
            key={index}
            delay={index * 0.5}
            duration={4 + index * 0.5}
            distance={8 + index * 2}
            className={`absolute ${img.style} hidden lg:block`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: parseFloat(img.style.match(/rotate-\[(-?\d+)deg\]/)?.[1] || '0') }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3 + index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/20 to-transparent rounded-[24px]" />
              <img
                src={img.src}
                alt=""
                className="w-full h-full object-cover rounded-[24px] shadow-2xl"
                style={{ 
                  filter: 'saturate(0.85) contrast(1.05)',
                }}
              />
            </motion.div>
          </FloatingElement>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container-custom pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7B61FF]/10 text-[#7B61FF] text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>New cohort starts March 2026</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="display-hero text-[#111216] mb-6"
          >
            <span className="block">LEARN</span>
            <span className="block gradient-text">WITHOUT</span>
            <span className="block">LIMITS</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[#6B6F7A] max-w-2xl mx-auto mb-10"
          >
            Online and offline courses, events, and career pathways—built for real progress.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GlowButton variant="primary" size="lg">
              <Link to="/courses" className="flex items-center gap-2">
                Explore Courses
                <ArrowRight className="w-5 h-5" />
              </Link>
            </GlowButton>
            <GlowButton variant="outline" size="lg">
              <Link to="/contact">Get in Touch</Link>
            </GlowButton>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto"
          >
            {[
              { value: '12K+', label: 'Graduates' },
              { value: '94%', label: 'Success Rate' },
              { value: '180+', label: 'Partners' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#111216]">{stat.value}</div>
                <div className="text-sm text-[#6B6F7A]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-[#6B6F7A]/30 flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[#7B61FF]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
