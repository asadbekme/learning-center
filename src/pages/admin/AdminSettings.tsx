import { useState } from 'react';
import { Save, Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';
import { GlassCard, FadeIn, GlowButton } from '@/components/animations';
import { useAppData } from '@/hooks/useLocalStorageState';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function AdminSettings() {
  const { data, updateStats, updateContactInfo } = useAppData();
  const [stats, setStats] = useState(data.stats);
  const [contactInfo, setContactInfo] = useState(data.contactInfo);

  const handleSaveStats = () => {
    updateStats(stats);
    toast.success('Statistics updated successfully');
  };

  const handleSaveContact = () => {
    updateContactInfo(contactInfo);
    toast.success('Contact information updated successfully');
  };

  return (
    <div>
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111216]">Settings</h1>
          <p className="text-[#6B6F7A]">Manage site-wide settings and information</p>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Site Statistics */}
        <FadeIn delay={0.1}>
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold text-[#111216] mb-6">Site Statistics</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">
                  Graduates
                </label>
                <Input
                  type="number"
                  value={stats.graduates}
                  onChange={(e) => setStats({ ...stats, graduates: parseInt(e.target.value) || 0 })}
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">
                  Completion Rate (%)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={stats.completionRate}
                  onChange={(e) => setStats({ ...stats, completionRate: parseInt(e.target.value) || 0 })}
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">
                  Partner Companies
                </label>
                <Input
                  type="number"
                  value={stats.partnerCompanies}
                  onChange={(e) => setStats({ ...stats, partnerCompanies: parseInt(e.target.value) || 0 })}
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">
                  Total Courses
                </label>
                <Input
                  type="number"
                  value={stats.coursesCount}
                  onChange={(e) => setStats({ ...stats, coursesCount: parseInt(e.target.value) || 0 })}
                  className="h-12"
                />
              </div>
            </div>
            <GlowButton variant="primary" className="w-full mt-6" onClick={handleSaveStats}>
              <span className="flex items-center justify-center gap-2">
                <Save className="w-4 h-4" />
                Save Statistics
              </span>
            </GlowButton>
          </GlassCard>
        </FadeIn>

        {/* Contact Information */}
        <FadeIn delay={0.2}>
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold text-[#111216] mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </span>
                </label>
                <Input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </span>
                </label>
                <Input
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </span>
                </label>
                <Input
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                  className="h-12"
                />
              </div>
            </div>

            <h3 className="text-md font-semibold text-[#111216] mt-6 mb-4">Social Links</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">
                  <span className="flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </span>
                </label>
                <Input
                  value={contactInfo.socialLinks.twitter}
                  onChange={(e) => setContactInfo({ 
                    ...contactInfo, 
                    socialLinks: { ...contactInfo.socialLinks, twitter: e.target.value }
                  })}
                  className="h-12"
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </span>
                </label>
                <Input
                  value={contactInfo.socialLinks.linkedin}
                  onChange={(e) => setContactInfo({ 
                    ...contactInfo, 
                    socialLinks: { ...contactInfo.socialLinks, linkedin: e.target.value }
                  })}
                  className="h-12"
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">
                  <span className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </span>
                </label>
                <Input
                  value={contactInfo.socialLinks.instagram}
                  onChange={(e) => setContactInfo({ 
                    ...contactInfo, 
                    socialLinks: { ...contactInfo.socialLinks, instagram: e.target.value }
                  })}
                  className="h-12"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111216] mb-1">
                  <span className="flex items-center gap-2">
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </span>
                </label>
                <Input
                  value={contactInfo.socialLinks.facebook}
                  onChange={(e) => setContactInfo({ 
                    ...contactInfo, 
                    socialLinks: { ...contactInfo.socialLinks, facebook: e.target.value }
                  })}
                  className="h-12"
                  placeholder="https://facebook.com/..."
                />
              </div>
            </div>

            <GlowButton variant="primary" className="w-full mt-6" onClick={handleSaveContact}>
              <span className="flex items-center justify-center gap-2">
                <Save className="w-4 h-4" />
                Save Contact Info
              </span>
            </GlowButton>
          </GlassCard>
        </FadeIn>
      </div>

      {/* Admin Info */}
      <FadeIn delay={0.3}>
        <div className="mt-6 p-4 bg-gray-100 rounded-xl">
          <p className="text-sm text-gray-600">
            <strong>Admin Password:</strong> <code className="bg-white px-2 py-1 rounded">admin123</code>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            To change the password, you need to modify the source code. This is a demo application.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
