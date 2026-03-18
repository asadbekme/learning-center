import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CountUp, GlassCard } from '@/components/animations';
import { TrendingUp, Users, Building2, Award } from 'lucide-react';
import { useAppData } from '@/hooks/useLocalStorageState';

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data } = useAppData();
  
  const stats = [
    { value: data.stats.graduates, suffix: '+', label: 'Graduates', icon: Users },
    { value: data.stats.completionRate, suffix: '%', label: 'Completion Rate', icon: TrendingUp },
    { value: data.stats.partnerCompanies, suffix: '+', label: 'Partner Companies', icon: Building2 },
    { value: data.stats.coursesCount, suffix: '+', label: 'Courses', icon: Award },
  ];

  return (
    <section ref={ref} className="section-padding bg-[#F6F7FA] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#7B61FF]/5 to-transparent" />
      
      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-4 block"
            >
              OUR RESULTS
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="display-section text-[#111216] mb-6"
            >
              Numbers that<br />speak.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-[#6B6F7A] max-w-md"
            >
              Graduates who change careers, build portfolios, and get hired. 
              Our community is growing every day.
            </motion.p>
          </div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.2 + index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <GlassCard className="p-6 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#7B61FF]/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#7B61FF]" />
                      </div>
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-[#111216] mb-2">
                      <CountUp 
                        end={stat.value} 
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                    </div>
                    <div className="text-sm text-[#6B6F7A] font-medium">
                      {stat.label}
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Photo Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <div className="flex gap-4 overflow-hidden">
            {[
              'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
              'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&q=80',
              'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80',
              'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80',
            ].map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex-shrink-0 w-64 h-40 rounded-2xl overflow-hidden"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.85) contrast(1.05)' }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
