import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, Calendar } from 'lucide-react';
import { GlassCard, FadeIn, GlowButton } from '@/components/animations';
import { useAppData } from '@/hooks/useLocalStorageState';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import type { Event } from '@/types';

const emptyEvent: Omit<Event, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  mode: 'online',
  image: '',
  isVisible: true,
  order: 0,
};

export function AdminEvents() {
  const { data, addItem, updateItem, deleteItem } = useAppData();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState(emptyEvent);

  const events = data.events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingEvent(null);
    setFormData({ ...emptyEvent, order: events.length });
    setIsDialogOpen(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time || '',
      location: event.location,
      mode: event.mode,
      image: event.image || '',
      isVisible: event.isVisible,
      order: event.order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteItem('events', id);
      toast.success('Event deleted successfully');
    }
  };

  const handleToggleVisibility = (event: Event) => {
    updateItem('events', event.id, { isVisible: !event.isVisible });
    toast.success(event.isVisible ? 'Event hidden' : 'Event visible');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEvent) {
      updateItem('events', editingEvent.id, formData);
      toast.success('Event updated successfully');
    } else {
      addItem('events', { ...formData, id: Date.now().toString() });
      toast.success('Event created successfully');
    }
    
    setIsDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div>
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111216]">Events</h1>
            <p className="text-[#6B6F7A]">Manage your workshops and meetups</p>
          </div>
          <GlowButton variant="primary" onClick={handleAdd}>
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Event
            </span>
          </GlowButton>
        </div>
      </FadeIn>

      {/* Search */}
      <FadeIn delay={0.1}>
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6F7A]" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl border-[#111216]/10 bg-white"
          />
        </div>
      </FadeIn>

      {/* Events List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <GlassCard className="p-4" hoverEffect={false}>
                <div className="flex items-center gap-4">
                  {/* Date Badge */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#7B61FF]/10 flex flex-col items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#7B61FF]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#111216] truncate">{event.title}</h3>
                    <p className="text-sm text-[#6B6F7A]">
                      {formatDate(event.date)} • {event.location}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="hidden md:flex items-center gap-2">
                    <span className={`pill text-xs ${
                      event.mode === 'online' ? 'bg-green-100 text-green-700' :
                      event.mode === 'offline' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {event.mode}
                    </span>
                    {!event.isVisible && (
                      <span className="pill bg-gray-100 text-gray-600 text-xs">
                        Hidden
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleVisibility(event)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-[#6B6F7A]"
                      title={event.isVisible ? 'Hide event' : 'Show event'}
                    >
                      {event.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(event)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-[#6B6F7A]"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 hover:bg-red-100 rounded-lg text-[#6B6F7A] hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6B6F7A]">No events found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-[#111216] mb-1">Title</label>
              <Input
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Event title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111216] mb-1">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Event description"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B61FF] min-h-[100px] resize-none"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Date</label>
                <Input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Time</label>
                <Input
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="e.g. 10:00 AM"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Mode</label>
                <Select
                  value={formData.mode}
                  onValueChange={(value: any) => setFormData({ ...formData, mode: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Location</label>
                <Input
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Design District Studio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Image URL (optional)</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.isVisible}
                onCheckedChange={(checked) => setFormData({ ...formData, isVisible: checked })}
              />
              <span className="text-sm text-[#111216]">Visible on website</span>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <GlowButton variant="primary" className="flex-1">
                {editingEvent ? 'Update Event' : 'Create Event'}
              </GlowButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
