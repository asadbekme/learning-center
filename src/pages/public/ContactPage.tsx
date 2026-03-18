import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { GlassCard, FadeIn, GlowButton } from '@/components/animations';
import { useAppData } from '@/hooks/useLocalStorageState';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data } = useAppData();
  const { contactInfo } = data;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast.success('Message sent successfully! We will get back to you soon.');
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F6F7FA] pt-24 pb-20">
      <div className="container-custom">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow mb-4 block">CONTACT US</span>
            <h1 className="display-section text-[#111216] mb-6">
              Get in touch.
            </h1>
            <p className="text-lg text-[#6B6F7A]">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <FadeIn delay={0.1}>
              <GlassCard className="p-6" hoverEffect={false}>
                <div className="w-12 h-12 rounded-xl bg-[#7B61FF]/10 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-[#7B61FF]" />
                </div>
                <h3 className="font-semibold text-[#111216] mb-1">Email us</h3>
                <p className="text-[#6B6F7A] text-sm">{contactInfo.email}</p>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={0.15}>
              <GlassCard className="p-6" hoverEffect={false}>
                <div className="w-12 h-12 rounded-xl bg-[#7B61FF]/10 flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-[#7B61FF]" />
                </div>
                <h3 className="font-semibold text-[#111216] mb-1">Call us</h3>
                <p className="text-[#6B6F7A] text-sm">{contactInfo.phone}</p>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <GlassCard className="p-6" hoverEffect={false}>
                <div className="w-12 h-12 rounded-xl bg-[#7B61FF]/10 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-[#7B61FF]" />
                </div>
                <h3 className="font-semibold text-[#111216] mb-1">Visit us</h3>
                <p className="text-[#6B6F7A] text-sm">{contactInfo.address}</p>
              </GlassCard>
            </FadeIn>

            {/* Social Links */}
            <FadeIn delay={0.25}>
              <div className="flex items-center gap-3 pt-4">
                {Object.entries(contactInfo.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center hover:bg-[#7B61FF] hover:text-white transition-colors text-[#6B6F7A]"
                  >
                    <span className="text-xs font-semibold uppercase">{platform[0]}</span>
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Contact Form */}
          <div ref={ref} className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#111216] mb-2">Message Sent!</h3>
                    <p className="text-[#6B6F7A]">We'll get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#111216] mb-2">
                          Your Name
                        </label>
                        <Input
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="h-12 rounded-xl border-[#111216]/10 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111216] mb-2">
                          Email Address
                        </label>
                        <Input
                          required
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-12 rounded-xl border-[#111216]/10 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111216] mb-2">
                        Subject
                      </label>
                      <Input
                        required
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="h-12 rounded-xl border-[#111216]/10 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111216] mb-2">
                        Message
                      </label>
                      <Textarea
                        required
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="min-h-[150px] rounded-xl border-[#111216]/10 bg-white resize-none"
                      />
                    </div>

                    <GlowButton variant="primary" size="lg" className="w-full">
                      <span className="flex items-center justify-center gap-2">
                        Send Message
                        <Send className="w-4 h-4" />
                      </span>
                    </GlowButton>
                  </form>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Map Placeholder */}
        <FadeIn delay={0.3}>
          <div className="mt-16">
            <div className="relative h-80 rounded-[28px] overflow-hidden bg-gradient-to-br from-[#7B61FF]/10 to-[#A78BFA]/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#7B61FF] mx-auto mb-4" />
                <p className="text-[#111216] font-semibold">{contactInfo.address}</p>
                <p className="text-[#6B6F7A] text-sm mt-1">Design District, Studio Lane</p>
              </div>
              {/* Decorative dots */}
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[#7B61FF]"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.5 + 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
