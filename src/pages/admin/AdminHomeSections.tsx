import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, GripVertical, Home, BarChart3, BookOpen, Calendar, Trophy, Sparkles } from 'lucide-react';
import { GlassCard, FadeIn } from '@/components/animations';
import { useAppData } from '@/hooks/useLocalStorageState';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const sectionIcons: Record<string, React.ElementType> = {
  hero: Sparkles,
  stats: BarChart3,
  courses: BookOpen,
  events: Calendar,
  results: Trophy,
  cta: Home,
};

const sectionLabels: Record<string, string> = {
  hero: 'Hero Section',
  stats: 'Statistics Section',
  courses: 'Courses Preview',
  events: 'Events Section',
  results: 'Results Section',
  cta: 'Call to Action',
};

export function AdminHomeSections() {
  const { data, updateItem } = useAppData();
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const sections = data.homeSections.sort((a, b) => a.order - b.order);

  const handleToggleVisibility = (section: typeof sections[0]) => {
    updateItem('homeSections', section.id, { isVisible: !section.isVisible });
    toast.success(section.isVisible ? 'Section hidden' : 'Section visible');
  };

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetId) {
      const draggedIndex = sections.findIndex(s => s.id === draggedItem);
      const targetIndex = sections.findIndex(s => s.id === targetId);
      
      const newSections = [...sections];
      const [removed] = newSections.splice(draggedIndex, 1);
      newSections.splice(targetIndex, 0, removed);
      
      // Update order
      newSections.forEach((section, index) => {
        updateItem('homeSections', section.id, { order: index });
      });
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div>
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111216]">Home Sections</h1>
          <p className="text-[#6B6F7A]">Manage and reorder homepage sections</p>
        </div>
      </FadeIn>

      {/* Sections List */}
      <div className="space-y-3">
        <AnimatePresence>
          {sections.map((section, index) => {
            const Icon = sectionIcons[section.type] || Home;
            return (
              <motion.div
                key={section.id}
                draggable
                onDragStart={() => handleDragStart(section.id)}
                onDragOver={(e) => handleDragOver(e, section.id)}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`cursor-move ${draggedItem === section.id ? 'opacity-50' : ''}`}
              >
                <GlassCard className="p-4" hoverEffect={false}>
                  <div className="flex items-center gap-4">
                    {/* Drag Handle */}
                    <div className="text-[#6B6F7A]">
                      <GripVertical className="w-5 h-5" />
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-[#7B61FF]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#7B61FF]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#111216]">
                        {sectionLabels[section.type] || section.type}
                      </h3>
                      <p className="text-sm text-[#6B6F7A]">
                        Order: {section.order + 1} • {section.isVisible ? 'Visible' : 'Hidden'}
                      </p>
                    </div>

                    {/* Toggle */}
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={section.isVisible}
                        onCheckedChange={() => handleToggleVisibility(section)}
                      />
                      {section.isVisible ? (
                        <Eye className="w-4 h-4 text-green-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Info */}
      <FadeIn delay={0.3}>
        <div className="mt-8 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-700">
            <strong>Tip:</strong> Drag and drop sections to reorder them on the homepage. 
            Toggle visibility to show or hide sections from visitors.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
