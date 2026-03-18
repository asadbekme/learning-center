import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Clock, Monitor, Users, Search, Filter } from 'lucide-react';
import { GlassCard, GlowButton, FadeIn } from '@/components/animations';
import { useAppData } from '@/hooks/useLocalStorageState';
import { Input } from '@/components/ui/input';

const modeIcons = {
  online: Monitor,
  offline: Users,
  hybrid: Monitor,
};

const categories = ['All', 'Design Systems', 'UX Research', 'Interface Design', 'Frontend', 'No-Code', 'Career'];

export function CoursesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data } = useAppData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const visibleCourses = data.courses
    .filter(c => c.isVisible)
    .sort((a, b) => a.order - b.order);

  const filteredCourses = visibleCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredCourse = visibleCourses.find(c => c.isFeatured);

  return (
    <div className="min-h-screen bg-[#F6F7FA] pt-24 pb-20">
      <div className="container-custom">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow mb-4 block">ALL COURSES</span>
            <h1 className="display-section text-[#111216] mb-6">
              Find your path.
            </h1>
            <p className="text-lg text-[#6B6F7A]">
              From fundamentals to specialization—learn at your own pace.
            </p>
          </div>
        </FadeIn>

        {/* Search & Filter */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6F7A]" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl border-[#111216]/10 bg-white"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-[#6B6F7A] flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#7B61FF] text-white'
                      : 'bg-white text-[#6B6F7A] hover:bg-[#7B61FF]/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Featured Course */}
        {featuredCourse && selectedCategory === 'All' && !searchQuery && (
          <FadeIn delay={0.2}>
            <div className="mb-12">
              <h2 className="text-xl font-bold text-[#111216] mb-4">Featured Course</h2>
              <GlassCard className="overflow-hidden group cursor-pointer">
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-72 lg:h-auto overflow-hidden">
                    <img
                      src={featuredCourse.image}
                      alt={featuredCourse.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: 'saturate(0.85) contrast(1.05)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                    <div className="absolute top-4 left-4 pill-violet">
                      Featured
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="pill bg-[#111216]/5 text-[#6B6F7A]">
                        {featuredCourse.category}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-[#6B6F7A]">
                        <Clock className="w-4 h-4" />
                        {featuredCourse.duration}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-[#111216] mb-4">
                      {featuredCourse.title}
                    </h3>
                    <p className="text-[#6B6F7A] mb-6">
                      {featuredCourse.description}
                    </p>
                    {featuredCourse.instructor && (
                      <p className="text-sm text-[#6B6F7A] mb-6">
                        Instructor: <span className="text-[#111216] font-medium">{featuredCourse.instructor}</span>
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {(() => {
                          const Icon = modeIcons[featuredCourse.mode];
                          return <Icon className="w-4 h-4 text-[#7B61FF]" />;
                        })()}
                        <span className="text-sm text-[#6B6F7A] capitalize">
                          {featuredCourse.mode}
                        </span>
                      </div>
                      <GlowButton variant="primary" size="md">
                        <span className="flex items-center gap-2">
                          Enroll Now
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </GlowButton>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </FadeIn>
        )}

        {/* Course Grid */}
        <div ref={ref}>
          <h2 className="text-xl font-bold text-[#111216] mb-4">
            {searchQuery || selectedCategory !== 'All' ? 'Search Results' : 'All Courses'}
          </h2>
          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => {
                if (course.isFeatured && selectedCategory === 'All' && !searchQuery) return null;
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GlassCard className="overflow-hidden group cursor-pointer h-full flex flex-col">
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
                      <div className="p-6 flex-1 flex flex-col">
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
                        <p className="text-sm text-[#6B6F7A] mb-4 line-clamp-2 flex-1">
                          {course.description}
                        </p>
                        <div className="flex items-center justify-between">
                          {course.price && (
                            <span className="text-lg font-bold text-[#7B61FF]">{course.price}</span>
                          )}
                          <span className="text-[#7B61FF] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all ml-auto">
                            Learn More <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#6B6F7A] text-lg">No courses found matching your criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-4 text-[#7B61FF] font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
