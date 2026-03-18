import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { GlassCard, GlowButton } from '@/components/animations';
import { Link } from 'react-router-dom';
import { useAppData } from '@/hooks/useLocalStorageState';

export function ResultsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data } = useAppData();
  
  const visibleResults = data.results
    .filter(r => r.isVisible)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  return (
    <section ref={ref} className="section-padding bg-[#F6F7FA] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#7B61FF]/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-4 block"
          >
            STUDENT SUCCESS
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="display-section text-[#111216] mb-6"
          >
            Work that<br />stands out.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-[#6B6F7A]"
          >
            See what our graduates have built. Real projects, real results, real careers.
          </motion.p>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {visibleResults.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <Link to="/results">
                <GlassCard className="overflow-hidden group cursor-pointer h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={result.image}
                      alt={result.projectTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: 'saturate(0.85) contrast(1.05)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="pill bg-white/90 text-[#111216] text-xs">
                        {result.category}
                      </span>
                    </div>

                    {/* Student Info */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white/80 text-sm mb-1">{result.studentName}</p>
                      <h3 className="text-white text-lg font-bold">{result.projectTitle}</h3>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <p className="text-sm text-[#6B6F7A] mb-4 line-clamp-2">
                      {result.description}
                    </p>
                    
                    {/* Stats */}
                    {result.stats && result.stats.length > 0 && (
                      <div className="flex gap-4">
                        {result.stats.map((stat, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-[#7B61FF]" />
                            <span className="text-sm font-semibold text-[#111216]">{stat.value}</span>
                            <span className="text-xs text-[#6B6F7A]">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Link to="/results">
            <GlowButton variant="outline" size="md">
              <span className="flex items-center gap-2">
                View All Results
                <ArrowRight className="w-4 h-4" />
              </span>
            </GlowButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
