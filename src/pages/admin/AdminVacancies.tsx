import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, Briefcase } from 'lucide-react';
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
import type { Vacancy } from '@/types';

const emptyVacancy: Omit<Vacancy, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  department: '',
  type: 'full-time',
  location: 'remote',
  description: '',
  requirements: [''],
  isVisible: true,
  order: 0,
};

export function AdminVacancies() {
  const { data, addItem, updateItem, deleteItem } = useAppData();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [formData, setFormData] = useState(emptyVacancy);

  const vacancies = data.vacancies.sort((a, b) => a.order - b.order);

  const filteredVacancies = vacancies.filter(vacancy =>
    vacancy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vacancy.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingVacancy(null);
    setFormData({ ...emptyVacancy, order: vacancies.length });
    setIsDialogOpen(true);
  };

  const handleEdit = (vacancy: Vacancy) => {
    setEditingVacancy(vacancy);
    setFormData({
      title: vacancy.title,
      department: vacancy.department,
      type: vacancy.type,
      location: vacancy.location,
      description: vacancy.description,
      requirements: vacancy.requirements.length > 0 ? vacancy.requirements : [''],
      isVisible: vacancy.isVisible,
      order: vacancy.order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this vacancy?')) {
      deleteItem('vacancies', id);
      toast.success('Vacancy deleted successfully');
    }
  };

  const handleToggleVisibility = (vacancy: Vacancy) => {
    updateItem('vacancies', vacancy.id, { isVisible: !vacancy.isVisible });
    toast.success(vacancy.isVisible ? 'Vacancy hidden' : 'Vacancy visible');
  };

  const addRequirement = () => {
    setFormData({ ...formData, requirements: [...formData.requirements, ''] });
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({ ...formData, requirements: newRequirements });
  };

  const removeRequirement = (index: number) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: newRequirements.length > 0 ? newRequirements : [''] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanedData = {
      ...formData,
      requirements: formData.requirements.filter(r => r.trim() !== ''),
    };
    
    if (editingVacancy) {
      updateItem('vacancies', editingVacancy.id, cleanedData);
      toast.success('Vacancy updated successfully');
    } else {
      addItem('vacancies', { ...cleanedData, id: Date.now().toString() });
      toast.success('Vacancy created successfully');
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div>
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111216]">Vacancies</h1>
            <p className="text-[#6B6F7A]">Manage job openings and positions</p>
          </div>
          <GlowButton variant="primary" onClick={handleAdd}>
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Vacancy
            </span>
          </GlowButton>
        </div>
      </FadeIn>

      {/* Search */}
      <FadeIn delay={0.1}>
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6F7A]" />
          <Input
            placeholder="Search vacancies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl border-[#111216]/10 bg-white"
          />
        </div>
      </FadeIn>

      {/* Vacancies List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredVacancies.map((vacancy, index) => (
            <motion.div
              key={vacancy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <GlassCard className="p-4" hoverEffect={false}>
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#7B61FF]/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-[#7B61FF]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#111216] truncate">{vacancy.title}</h3>
                    <p className="text-sm text-[#6B6F7A]">
                      {vacancy.department} • {vacancy.type} • {vacancy.location}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="hidden md:flex items-center gap-2">
                    {!vacancy.isVisible && (
                      <span className="pill bg-gray-100 text-gray-600 text-xs">
                        Hidden
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleVisibility(vacancy)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-[#6B6F7A]"
                      title={vacancy.isVisible ? 'Hide vacancy' : 'Show vacancy'}
                    >
                      {vacancy.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(vacancy)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-[#6B6F7A]"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(vacancy.id)}
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

        {filteredVacancies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6B6F7A]">No vacancies found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingVacancy ? 'Edit Vacancy' : 'Add New Vacancy'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Title</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Job title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Department</label>
                <Input
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g. Design"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Type</label>
                <Select
                  value={formData.type}
                  onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Location</label>
                <Select
                  value={formData.location}
                  onValueChange={(value: any) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="on-site">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111216] mb-1">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Job description"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B61FF] min-h-[100px] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111216] mb-1">Requirements</label>
              <div className="space-y-2">
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={req}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      placeholder={`Requirement ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeRequirement(index)}
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
                onClick={addRequirement}
                className="mt-2"
              >
                + Add Requirement
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
                {editingVacancy ? 'Update Vacancy' : 'Create Vacancy'}
              </GlowButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
