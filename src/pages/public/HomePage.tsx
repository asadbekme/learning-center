import { motion } from 'framer-motion';
import {
  HeroSection,
  StatsSection,
  CoursesPreviewSection,
  EventsSection,
  ResultsSection,
  CTASection,
} from '@/sections';

export function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <StatsSection />
      <CoursesPreviewSection />
      <EventsSection />
      <ResultsSection />
      <CTASection />
    </motion.div>
  );
}
