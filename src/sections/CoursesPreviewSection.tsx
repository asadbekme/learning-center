import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Clock, Monitor, Users } from 'lucide-react';
import { GlassCard, GlowButton } from '@/components/animations';
import { Link } from 'react-router-dom';
import { useAppData } from '@/hooks/useLocalStorageState';

const modeIcons = {
  online: Monitor,
  offline: Users,
  hybrid: Monitor,
};

export function CoursesPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data } = useAppData();
  
  const visibleCourses = data.courses
    .filter(c => c.isVisible)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  return (
    <section ref={ref} className="section-padding bg-[#F6F7FA] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7B61FF]/3 to-transparent" />
      
      <div className="container-custom relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-4 block"
            >
              FEATURED COURSES
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="display-section text-[#111216]"
            >
              Find your path.
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/courses">
              <GlowButton variant="outline" size="sm">
                <span className="flex items-center gap-2">
                  View All Courses
                  <ArrowRight className="w-4 h-4" />
                </span>
              </GlowButton>
            </Link>
          </motion.div>
        </div>

        {/* Featured Course (Large) */}
        {visibleCourses[0] && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Link to={`/courses`}>
              <GlassCard className="overflow-hidden group cursor-pointer">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <img
                      src={visibleCourses[0].image}
                      alt={visibleCourses[0].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: 'saturate(0.85) contrast(1.05)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                    {visibleCourses[0].isFeatured && (
                      <div className="absolute top-4 left-4 pill-violet">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="pill bg-[#111216]/5 text-[#6B6F7A]">
                        {visibleCourses[0].category}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-[#6B6F7A]">
                        <Clock className="w-4 h-4" />
                        {visibleCourses[0].duration}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#111216] mb-3">
                      {visibleCourses[0].title}
                    </h3>
                    <p className="text-[#6B6F7A] mb-6 line-clamp-2">
                      {visibleCourses[0].description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {(() => {
                          const Icon = modeIcons[visibleCourses[0].mode];
                          return <Icon className="w-4 h-4 text-[#7B61FF]" />;
                        })()}
                        <span className="text-sm text-[#6B6F7A] capitalize">
                          {visibleCourses[0].mode}
                        </span>
                      </div>
                      <span className="text-[#7B61FF] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        )}

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {visibleCourses.slice(1, 3).map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Link to={`/courses`}>
                <GlassCard className="overflow-hidden group cursor-pointer h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: 'saturate(0.85) contrast(1.05)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="pill bg-white/90 text-[#111216] text-xs">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center gap-1 text-xs text-[#6B6F7A]">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#6B6F7A] capitalize">
                        {(() => {
                          const Icon = modeIcons[course.mode];
                          return <Icon className="w-3 h-3" />;
                        })()}
                        {course.mode}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#111216] mb-2 group-hover:text-[#7B61FF] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-[#6B6F7A] line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
