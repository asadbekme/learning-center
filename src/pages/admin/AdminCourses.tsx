import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, GripVertical, Star } from 'lucide-react';
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
import type { Course } from '@/types';

const emptyCourse: Omit<Course, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  description: '',
  duration: '',
  mode: 'online',
  category: '',
  image: '',
  price: '',
  instructor: '',
  isFeatured: false,
  isVisible: true,
  order: 0,
};

export function AdminCourses() {
  const { data, addItem, updateItem, deleteItem } = useAppData();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState(emptyCourse);

  const courses = data.courses.sort((a, b) => a.order - b.order);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingCourse(null);
    setFormData({ ...emptyCourse, order: courses.length });
    setIsDialogOpen(true);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      mode: course.mode,
      category: course.category,
      image: course.image,
      price: course.price || '',
      instructor: course.instructor || '',
      isFeatured: course.isFeatured,
      isVisible: course.isVisible,
      order: course.order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      deleteItem('courses', id);
      toast.success('Course deleted successfully');
    }
  };

  const handleToggleVisibility = (course: Course) => {
    updateItem('courses', course.id, { isVisible: !course.isVisible });
    toast.success(course.isVisible ? 'Course hidden' : 'Course visible');
  };

  const handleToggleFeatured = (course: Course) => {
    updateItem('courses', course.id, { isFeatured: !course.isFeatured });
    toast.success(course.isFeatured ? 'Removed from featured' : 'Marked as featured');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCourse) {
      updateItem('courses', editingCourse.id, formData);
      toast.success('Course updated successfully');
    } else {
      addItem('courses', { ...formData, id: Date.now().toString() });
      toast.success('Course created successfully');
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div>
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#111216]">Courses</h1>
            <p className="text-[#6B6F7A]">Manage your courses and programs</p>
          </div>
          <GlowButton variant="primary" onClick={handleAdd}>
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Course
            </span>
          </GlowButton>
        </div>
      </FadeIn>

      {/* Search */}
      <FadeIn delay={0.1}>
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6F7A]" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl border-[#111216]/10 bg-white"
          />
        </div>
      </FadeIn>

      {/* Courses List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <GlassCard className="p-4" hoverEffect={false}>
                <div className="flex items-center gap-4">
                  {/* Drag Handle */}
                  <div className="cursor-move text-[#6B6F7A]">
                    <GripVertical className="w-5 h-5" />
                  </div>

                  {/* Image */}
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#111216] truncate">{course.title}</h3>
                      {course.isFeatured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-[#6B6F7A] truncate">{course.category} • {course.duration}</p>
                  </div>

                  {/* Status */}
                  <div className="hidden md:flex items-center gap-2">
                    <span className={`pill text-xs ${
                      course.mode === 'online' ? 'bg-green-100 text-green-700' :
                      course.mode === 'offline' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {course.mode}
                    </span>
                    {!course.isVisible && (
                      <span className="pill bg-gray-100 text-gray-600 text-xs">
                        Hidden
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleFeatured(course)}
                      className={`p-2 rounded-lg transition-colors ${
                        course.isFeatured ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100 text-[#6B6F7A]'
                      }`}
                      title={course.isFeatured ? 'Remove from featured' : 'Mark as featured'}
                    >
                      <Star className={`w-4 h-4 ${course.isFeatured ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleToggleVisibility(course)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-[#6B6F7A]"
                      title={course.isVisible ? 'Hide course' : 'Show course'}
                    >
                      {course.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(course)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-[#6B6F7A]"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
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

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6B6F7A]">No courses found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Title</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Course title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Category</label>
                <Input
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Design Systems"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111216] mb-1">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Course description"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B61FF] min-h-[100px] resize-none"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Duration</label>
                <Input
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g. 6 weeks"
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
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Price</label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g. $499"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Image URL</label>
                <Input
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">Instructor</label>
                <Input
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  placeholder="Instructor name"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <Switch
                  checked={formData.isVisible}
                  onCheckedChange={(checked) => setFormData({ ...formData, isVisible: checked })}
                />
                <span className="text-sm text-[#111216]">Visible</span>
              </label>
              <label className="flex items-center gap-2">
                <Switch
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                />
                <span className="text-sm text-[#111216]">Featured</span>
              </label>
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
                {editingCourse ? 'Update Course' : 'Create Course'}
              </GlowButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
