import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { GlassCard, GlowButton } from '@/components/animations';
import { Link } from 'react-router-dom';
import { useAppData } from '@/hooks/useLocalStorageState';

export function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data } = useAppData();
  
  const visibleEvents = data.events
    .filter(e => e.isVisible)
    .sort((a, b) => a.order - b.order)
    .slice(0, 4);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: date.getDate(),
    };
  };

  return (
    <section ref={ref} className="section-padding bg-[#F6F7FA] relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-4 block"
            >
              UPCOMING EVENTS
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="display-section text-[#111216] mb-6"
            >
              Learn by<br />doing.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-[#6B6F7A] max-w-md mb-8"
            >
              Workshops, critiques, and meetups—online and in your city. 
              Connect with peers and learn from industry experts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/events">
                <GlowButton variant="primary" size="md">
                  <span className="flex items-center gap-2">
                    View All Events
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </GlowButton>
              </Link>
            </motion.div>
          </div>

          {/* Right Events List */}
          <div className="space-y-4">
            {visibleEvents.map((event, index) => {
              const date = formatDate(event.date);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.2 + index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <Link to="/events">
                    <GlassCard className="p-5 group cursor-pointer hover:border-[#7B61FF]/30">
                      <div className="flex gap-5">
                        {/* Date Badge */}
                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#7B61FF]/10 flex flex-col items-center justify-center">
                          <span className="text-xs font-bold text-[#7B61FF]">{date.month}</span>
                          <span className="text-xl font-bold text-[#111216]">{date.day}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-[#111216] mb-1 group-hover:text-[#7B61FF] transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-sm text-[#6B6F7A] mb-3 line-clamp-1">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-[#6B6F7A]">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {event.time || 'TBA'}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex-shrink-0 flex items-center">
                          <ArrowRight className="w-5 h-5 text-[#6B6F7A] group-hover:text-[#7B61FF] group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
