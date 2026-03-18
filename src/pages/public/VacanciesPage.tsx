import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Briefcase, MapPin, Search, Filter } from 'lucide-react';
import { GlassCard, FadeIn, GlowButton } from '@/components/animations';
import { useAppData } from '@/hooks/useLocalStorageState';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const types = ['All', 'Full-time', 'Part-time', 'Contract'];
const locations = ['All', 'Remote', 'Hybrid', 'On-site'];

export function VacanciesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data } = useAppData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedVacancy, setSelectedVacancy] = useState<typeof data.vacancies[0] | null>(null);
  
  const visibleVacancies = data.vacancies
    .filter(v => v.isVisible)
    .sort((a, b) => a.order - b.order);

  const filteredVacancies = visibleVacancies.filter(vacancy => {
    const matchesSearch = vacancy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vacancy.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || vacancy.type === selectedType.toLowerCase();
    const matchesLocation = selectedLocation === 'All' || vacancy.location === selectedLocation.toLowerCase();
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-[#F6F7FA] pt-24 pb-20">
      <div className="container-custom">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow mb-4 block">VACANCIES</span>
            <h1 className="display-section text-[#111216] mb-6">
              Join the team.
            </h1>
            <p className="text-lg text-[#6B6F7A]">
              We're building a kind, high-bar learning culture. If you love teaching and shipping, we should talk.
            </p>
          </div>
        </FadeIn>

        {/* Search & Filters */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6F7A]" />
              <Input
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl border-[#111216]/10 bg-white"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-[#6B6F7A] flex-shrink-0" />
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedType === type
                      ? 'bg-[#7B61FF] text-white'
                      : 'bg-white text-[#6B6F7A] hover:bg-[#7B61FF]/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Location Filter */}
        <FadeIn delay={0.15}>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
            <MapPin className="w-5 h-5 text-[#6B6F7A] flex-shrink-0" />
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedLocation === location
                    ? 'bg-[#111216] text-white'
                    : 'bg-white text-[#6B6F7A] hover:bg-[#111216]/5'
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Vacancies List */}
        <div ref={ref} className="space-y-4">
          {filteredVacancies.length > 0 ? (
            filteredVacancies.map((vacancy, index) => (
              <motion.div
                key={vacancy.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard 
                  className="p-6 group cursor-pointer hover:border-[#7B61FF]/30"
                  onClick={() => setSelectedVacancy(vacancy)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#7B61FF]/10 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-[#7B61FF]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#111216] mb-1 group-hover:text-[#7B61FF] transition-colors">
                        {vacancy.title}
                      </h3>
                      <p className="text-[#6B6F7A] text-sm mb-3 line-clamp-1">
                        {vacancy.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`pill text-xs ${
                          vacancy.type === 'full-time' ? 'bg-blue-100 text-blue-700' :
                          vacancy.type === 'part-time' ? 'bg-green-100 text-green-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {vacancy.type.charAt(0).toUpperCase() + vacancy.type.slice(1)}
                        </span>
                        <span className={`pill text-xs ${
                          vacancy.location === 'remote' ? 'bg-purple-100 text-purple-700' :
                          vacancy.location === 'hybrid' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {vacancy.location.charAt(0).toUpperCase() + vacancy.location.slice(1)}
                        </span>
                        <span className="pill bg-[#111216]/5 text-[#6B6F7A] text-xs">
                          {vacancy.department}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex-shrink-0">
                      <ArrowRight className="w-5 h-5 text-[#6B6F7A] group-hover:text-[#7B61FF] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-[#6B6F7A] text-lg">No positions found matching your criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedType('All'); setSelectedLocation('All'); }}
                className="mt-4 text-[#7B61FF] font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Vacancy Detail Dialog */}
        <Dialog open={!!selectedVacancy} onOpenChange={() => setSelectedVacancy(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedVacancy?.title}</DialogTitle>
              <DialogDescription className="text-[#6B6F7A]">
                {selectedVacancy?.department} • {selectedVacancy?.type} • {selectedVacancy?.location}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-[#111216] mb-6">{selectedVacancy?.description}</p>
              
              <h4 className="font-semibold text-[#111216] mb-3">Requirements:</h4>
              <ul className="space-y-2 mb-6">
                {selectedVacancy?.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#6B6F7A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7B61FF] mt-2 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>

              <GlowButton variant="primary" className="w-full">
                <span className="flex items-center justify-center gap-2">
                  Apply Now
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
