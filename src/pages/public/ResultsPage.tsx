import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, TrendingUp, Search, Filter } from 'lucide-react';
import { GlassCard, FadeIn, GlowButton } from '@/components/animations';
import { useAppData } from '@/hooks/useLocalStorageState';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const categories = ['All', 'UI/UX Design', 'Brand Design', 'Product Design', 'Frontend'];

export function ResultsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data } = useAppData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedResult, setSelectedResult] = useState<typeof data.results[0] | null>(null);
  
  const visibleResults = data.results
    .filter(r => r.isVisible)
    .sort((a, b) => a.order - b.order);

  const filteredResults = visibleResults.filter(result => {
    const matchesSearch = result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || result.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F6F7FA] pt-24 pb-20">
      <div className="container-custom">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow mb-4 block">STUDENT RESULTS</span>
            <h1 className="display-section text-[#111216] mb-6">
              Work that stands out.
            </h1>
            <p className="text-lg text-[#6B6F7A]">
              Real projects, real results, real careers. See what our graduates have built.
            </p>
          </div>
        </FadeIn>

        {/* Search & Filter */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6F7A]" />
              <Input
                placeholder="Search projects..."
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

        {/* Results Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard 
                  className="overflow-hidden group cursor-pointer h-full"
                  onClick={() => setSelectedResult(result)}
                >
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
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-[#6B6F7A] text-lg">No results found matching your criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-4 text-[#7B61FF] font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Result Detail Dialog */}
        <Dialog open={!!selectedResult} onOpenChange={() => setSelectedResult(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedResult?.projectTitle}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {/* Main Image */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
                <img
                  src={selectedResult?.image}
                  alt={selectedResult?.projectTitle}
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.85) contrast(1.05)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="pill bg-white/90 text-[#111216] text-xs mb-2 inline-block">
                    {selectedResult?.category}
                  </span>
                  <p className="text-white font-semibold">{selectedResult?.studentName}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#111216] mb-6">{selectedResult?.description}</p>

              {/* Stats */}
              {selectedResult?.stats && selectedResult.stats.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {selectedResult.stats.map((stat, i) => (
                    <div key={i} className="bg-[#7B61FF]/10 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#7B61FF]">{stat.value}</div>
                      <div className="text-sm text-[#6B6F7A]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Before/After if available */}
              {selectedResult?.beforeImage && selectedResult?.afterImage && (
                <div className="mb-6">
                  <h4 className="font-semibold text-[#111216] mb-3">Before & After</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#6B6F7A] mb-2">Before</p>
                      <img
                        src={selectedResult.beforeImage}
                        alt="Before"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-[#6B6F7A] mb-2">After</p>
                      <img
                        src={selectedResult.afterImage}
                        alt="After"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              <GlowButton variant="primary" className="w-full">
                <span className="flex items-center justify-center gap-2">
                  View Full Project
                  <ArrowRight className="w-4 h-4" />
                </span>
              </GlowButton>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
