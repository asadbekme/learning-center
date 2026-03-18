import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Calendar, MapPin, Clock, Search, Filter } from 'lucide-react';
import { GlassCard, FadeIn } from '@/components/animations';
import { useAppData } from '@/hooks/useLocalStorageState';
import { Input } from '@/components/ui/input';
import { GlowButton } from '@/components/animations';

const modes = ['All', 'Online', 'Offline', 'Hybrid'];

export function EventsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data } = useAppData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState('All');
  
  const visibleEvents = data.events
    .filter(e => e.isVisible)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const filteredEvents = visibleEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode = selectedMode === 'All' || event.mode === selectedMode.toLowerCase();
    return matchesSearch && matchesMode;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: date.getDate(),
      fullDate: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    };
  };

  return (
    <div className="min-h-screen bg-[#F6F7FA] pt-24 pb-20">
      <div className="container-custom">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow mb-4 block">UPCOMING EVENTS</span>
            <h1 className="display-section text-[#111216] mb-6">
              Learn by doing.
            </h1>
            <p className="text-lg text-[#6B6F7A]">
              Workshops, critiques, and meetups—online and in your city.
            </p>
          </div>
        </FadeIn>

        {/* Search & Filter */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6F7A]" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl border-[#111216]/10 bg-white"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-[#6B6F7A] flex-shrink-0" />
              {modes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedMode === mode
                      ? 'bg-[#7B61FF] text-white'
                      : 'bg-white text-[#6B6F7A] hover:bg-[#7B61FF]/10'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Events List */}
        <div ref={ref} className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => {
              const date = formatDate(event.date);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard className="p-6 group cursor-pointer hover:border-[#7B61FF]/30">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Date Badge */}
                      <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-[#7B61FF]/10 flex flex-col items-center justify-center">
                        <span className="text-sm font-bold text-[#7B61FF]">{date.month}</span>
                        <span className="text-2xl font-bold text-[#111216]">{date.day}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className={`pill text-xs ${
                            event.mode === 'online' ? 'bg-green-100 text-green-700' :
                            event.mode === 'offline' ? 'bg-blue-100 text-blue-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {event.mode.charAt(0).toUpperCase() + event.mode.slice(1)}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-[#111216] mb-2 group-hover:text-[#7B61FF] transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-[#6B6F7A] mb-4">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B6F7A]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {date.fullDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.time || 'TBA'}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex-shrink-0 flex items-center">
                        <GlowButton variant="outline" size="sm">
                          <span className="flex items-center gap-2">
                            Register
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </GlowButton>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-20">
              <p className="text-[#6B6F7A] text-lg">No events found matching your criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedMode('All'); }}
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
