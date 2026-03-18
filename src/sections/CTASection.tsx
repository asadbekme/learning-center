import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Download, Mail, Phone, MapPin } from 'lucide-react';
import { GlowButton, GlassCard } from '@/components/animations';
import { Link } from 'react-router-dom';
import { useAppData } from '@/hooks/useLocalStorageState';

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data } = useAppData();
  const { contactInfo } = data;

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-[#0B0D10]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/20 via-transparent to-[#A78BFA]/10" />
      
      {/* Animated shapes */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B61FF]/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A78BFA]/20 rounded-full blur-3xl"
      />

      <div className="container-custom relative py-24 md:py-32">
        {/* Main CTA */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Ready to start?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-white/70 mb-10"
          >
            Apply now and get a free learning plan + career roadmap.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GlowButton variant="primary" size="lg">
              <Link to="/courses" className="flex items-center gap-2">
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </GlowButton>
            <GlowButton variant="secondary" size="lg">
              <span className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Brochure
              </span>
            </GlowButton>
          </motion.div>
        </div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20"
        >
          {[
            { icon: Mail, label: 'Email us', value: contactInfo.email },
            { icon: Phone, label: 'Call', value: contactInfo.phone },
            { icon: MapPin, label: 'Visit', value: contactInfo.address },
          ].map((contact) => {
            const Icon = contact.icon;
            return (
              <GlassCard key={contact.label} className="p-6 text-center" hoverEffect={false}>
                <div className="w-12 h-12 rounded-xl bg-[#7B61FF]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-[#7B61FF]" />
                </div>
                <div className="text-sm text-[#6B6F7A] mb-1">{contact.label}</div>
                <div className="text-[#111216] font-medium">{contact.value}</div>
              </GlassCard>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-white/10 pt-10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7B61FF] flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <div>
                <div className="text-white font-semibold">Learning Center</div>
                <div className="text-white/50 text-sm">© 2026 All rights reserved.</div>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Accessibility'].map((link) => (
                <Link
                  key={link}
                  to="#"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {['twitter', 'linkedin', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <span className="text-white/70 text-xs capitalize">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
