import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, TrendingUp } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import type { Result } from '@/types';

const emptyResult: Omit<Result, 'id' | 'createdAt' | 'updatedAt'> = {
  studentName: '',
  projectTitle: '',
  category: '',
  description: '',
  image: '',
  beforeImage: '',
  afterImage: '',
  stats: [{ label: '', value: '' }],
  isVisible: true,
  order: 0,
};

export function AdminResults() {
  const { data, addItem, updateItem, deleteItem } = useAppData();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<Result | null>(null);
  const [formData, setFormData] = useState(emptyResult);

  const results = data.results.sort((a, b) => a.order - b.order);

  const filteredResults = results.filter(result =>
    result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingResult(null);
    setFormData({ ...emptyResult, order: results.length });
    setIsDialogOpen(true);
  };

  const handleEdit = (result: Result) => {
    setEditingResult(result);
    setFormData({
      studentName: result.studentName,
      projectTitle: result.projectTitle,
      category: result.category,
      description: result.description,
      image: result.image,
      beforeImage: result.beforeImage || '',
      afterImage: result.afterImage || '',
      stats: result.stats && result.stats.length > 0 ? result.stats : [{ label: '', value: '' }],
      isVisible: result.isVisible,
      order: result.order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this result?')) {
      deleteItem('results', id);
      toast.success('Result deleted successfully');
    }
  };

  const handleToggleVisibility = (result: Result) => {
    updateItem('results', result.id, { isVisible: !result.isVisible });
    toast.success(result.isVisible ? 'Result hidden' : 'Result visible');
  };

  const addStat = () => {
    setFormData({ ...formData, stats: [...(formData.stats || []), { label: '', value: '' }] });
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    const newStats = [...(formData.stats || [])];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, stats: newStats });
  };

  const removeStat = (index: number) => {
    const newStats = (formData.stats || []).filter((_, i) => i !== index);
    setFormData({ ...formData, stats: newStats.length > 0 ? newStats : [{ label: '', value: '' }] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanedData = {
      ...formData,
      stats: (formData.stats || []).filter(s => s.label.trim() !== '' && s.value.trim() !== ''),
      beforeImage: formData.beforeImage || undefined,
      afterImage: formData.afterImage || undefined,
    };
    
    if (editingResult) {
      updateItem('results', editingResult.id, cleanedData);
      toast.success('Result updated successfully');
    } else {
      addItem('results', { ...cleanedData, id: Date.now().toString() });
      toast.success('Result created successfully');
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div>
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111216]">Student Results</h1>
            <p className="text-[#6B6F7A]">Manage student success stories and projects</p>
          </div>
          <GlowButton variant="primary" onClick={handleAdd}>
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Result
            </span>
          </GlowButton>
        </div>
      </FadeIn>

      {/* Search */}
      <FadeIn delay={0.1}>
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6F7A]" />
          <Input
            placeholder="Search results..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl border-[#111216]/10 bg-white"
          />
        </div>
      </FadeIn>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredResults.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <GlassCard className="overflow-hidden" hoverEffect={false}>
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={result.image}
                    alt={result.projectTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white/80 text-xs">{result.studentName}</p>
                    <p className="text-white font-semibold text-sm truncate">{result.projectTitle}</p>
                  </div>
                  {!result.isVisible && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-gray-900/80 text-white text-xs rounded">
                      Hidden
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="pill bg-[#7B61FF]/10 text-[#7B61FF] text-xs">
                      {result.category}
                    </span>
                    {result.stats && result.stats.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-[#6B6F7A]">
                        <TrendingUp className="w-3 h-3" />
                        {result.stats.length} stats
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleVisibility(result)}
                      className="flex-1 py-2 hover:bg-gray-100 rounded-lg text-[#6B6F7A] text-sm"
                      title={result.isVisible ? 'Hide' : 'Show'}
                    >
                      {result.isVisible ? <Eye className="w-4 h-4 mx-auto" /> : <EyeOff className="w-4 h-4 mx-auto" />}
                    </button>
                    <button
                      onClick={() => handleEdit(result)}
                      className="flex-1 py-2 hover:bg-gray-100 rounded-lg text-[#6B6F7A] text-sm"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 mx-auto" />
                    </button>
                    <button
                      onClick={() => handleDelete(result.id)}
                      className="flex-1 py-2 hover:bg-red-100 rounded-lg text-[#6B6F7A] hover:text-red-600 text-sm"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredResults.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-[#6B6F7A]">No results found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingResult ? 'Edit Result' : 'Add New Result'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Student Name</label>
                <Input
                  required
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="Student name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Project Title</label>
                <Input
                  required
                  value={formData.projectTitle}
                  onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  placeholder="Project title"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111216] mb-1">Category</label>
              <Input
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. UI/UX Design"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111216] mb-1">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Project description"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B61FF] min-h-[100px] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111216] mb-1">Main Image URL</label>
              <Input
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Before Image URL (optional)</label>
                <Input
                  value={formData.beforeImage}
                  onChange={(e) => setFormData({ ...formData, beforeImage: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">After Image URL (optional)</label>
                <Input
                  value={formData.afterImage}
                  onChange={(e) => setFormData({ ...formData, afterImage: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111216] mb-1">Stats</label>
              <div className="space-y-2">
                {(formData.stats || []).map((stat, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={stat.label}
                      onChange={(e) => updateStat(index, 'label', e.target.value)}
                      placeholder="Label (e.g. Conversion)"
                      className="flex-1"
                    />
                    <Input
                      value={stat.value}
                      onChange={(e) => updateStat(index, 'value', e.target.value)}
                      placeholder="Value (e.g. +25%)"
                      className="w-28"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeStat(index)}
                      className="flex-shrink-0"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={addStat}
                className="mt-2"
              >
                + Add Stat
              </Button>
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
                {editingResult ? 'Update Result' : 'Create Result'}
              </GlowButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
