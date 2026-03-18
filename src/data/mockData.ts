import type { Course, Event, Vacancy, Result, HomeSection, ContactInfo, SiteStats } from '@/types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Design System Fundamentals',
    description: 'Build scalable UI libraries with real-world constraints. Learn component architecture, tokens, and documentation.',
    duration: '6 weeks',
    mode: 'online',
    category: 'Design Systems',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    price: '$499',
    instructor: 'Sarah Chen',
    isFeatured: true,
    isVisible: true,
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'UX Research Mastery',
    description: 'Master user research methods, from interviews to usability testing. Build a research-driven design practice.',
    duration: '8 weeks',
    mode: 'hybrid',
    category: 'UX Research',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
    price: '$699',
    instructor: 'Marcus Johnson',
    isFeatured: false,
    isVisible: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Interface Design Pro',
    description: 'Create stunning interfaces with modern design tools. From wireframes to high-fidelity prototypes.',
    duration: '10 weeks',
    mode: 'online',
    category: 'Interface Design',
    image: 'https://images.unsplash.com/photo-1561070791-36c11767b26a?w=800&q=80',
    price: '$799',
    instructor: 'Emma Williams',
    isFeatured: false,
    isVisible: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Frontend for Designers',
    description: 'Bridge the gap between design and development. Learn HTML, CSS, and basic JavaScript.',
    duration: '6 weeks',
    mode: 'online',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    price: '$599',
    instructor: 'David Park',
    isFeatured: false,
    isVisible: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'No-Code Development',
    description: 'Build web applications without writing code. Master Webflow, Framer, and other no-code tools.',
    duration: '4 weeks',
    mode: 'online',
    category: 'No-Code',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    price: '$399',
    instructor: 'Lisa Anderson',
    isFeatured: false,
    isVisible: true,
    order: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Career Accelerator',
    description: 'Prepare for your design career. Portfolio review, interview prep, and job search strategies.',
    duration: '4 weeks',
    mode: 'hybrid',
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    price: '$499',
    instructor: 'James Miller',
    isFeatured: false,
    isVisible: true,
    order: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Portfolio Review Week',
    description: 'Get feedback from hiring managers and senior designers on your portfolio.',
    date: '2026-03-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Online',
    mode: 'online',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
    isVisible: true,
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Design Systems Clinic',
    description: 'Fix consistency issues in your design system with expert guidance.',
    date: '2026-03-22',
    time: '2:00 PM - 5:00 PM',
    location: 'Design District Studio',
    mode: 'hybrid',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    isVisible: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Career Office Hours',
    description: 'Resume review, salary negotiation tips, and career planning sessions.',
    date: '2026-04-05',
    time: '11:00 AM - 3:00 PM',
    location: 'Online',
    mode: 'online',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    isVisible: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Creative Sprint',
    description: 'Ship a complete project in 48 hours with mentorship and peer feedback.',
    date: '2026-04-12',
    time: '9:00 AM - 5:00 PM',
    location: 'Design District Studio',
    mode: 'offline',
    image: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&q=80',
    isVisible: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockVacancies: Vacancy[] = [
  {
    id: '1',
    title: 'Product Design Mentor',
    department: 'Design',
    type: 'part-time',
    location: 'remote',
    description: 'Guide students through real product design work. Review projects and provide actionable feedback.',
    requirements: [
      '5+ years of product design experience',
      'Experience mentoring or teaching',
      'Strong portfolio demonstrating end-to-end design process'
    ],
    isVisible: true,
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Frontend Instructor',
    department: 'Engineering',
    type: 'contract',
    location: 'hybrid',
    description: 'Teach modern UI engineering with accessibility in mind. Cover React, CSS, and component architecture.',
    requirements: [
      'Strong knowledge of modern frontend frameworks',
      'Experience with accessibility standards',
      'Excellent communication skills'
    ],
    isVisible: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Community Lead',
    department: 'Operations',
    type: 'full-time',
    location: 'on-site',
    description: 'Grow events, partnerships, and student success. Build a thriving learning community.',
    requirements: [
      'Experience in community management',
      'Event planning and coordination skills',
      'Passion for education and student success'
    ],
    isVisible: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockResults: Result[] = [
  {
    id: '1',
    studentName: 'Alex Rivera',
    projectTitle: 'Fintech App Redesign',
    category: 'UI/UX Design',
    description: 'A complete redesign of a banking app focused on accessibility and ease of use.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    stats: [
      { label: 'User Satisfaction', value: '+45%' },
      { label: 'Task Completion', value: '+62%' }
    ],
    isVisible: true,
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    studentName: 'Maya Patel',
    projectTitle: 'EcoBrand Identity',
    category: 'Brand Design',
    description: 'Complete brand identity for a sustainable fashion startup.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80',
    stats: [
      { label: 'Brand Recognition', value: '+78%' },
      { label: 'Social Engagement', value: '+120%' }
    ],
    isVisible: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    studentName: 'Jordan Kim',
    projectTitle: 'HealthTech Dashboard',
    category: 'Product Design',
    description: 'Data visualization dashboard for healthcare professionals.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    stats: [
      { label: 'Efficiency', value: '+35%' },
      { label: 'Error Reduction', value: '-48%' }
    ],
    isVisible: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    studentName: 'Sofia Martinez',
    projectTitle: 'E-commerce Experience',
    category: 'UX Design',
    description: 'End-to-end shopping experience redesign for a luxury brand.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    stats: [
      { label: 'Conversion Rate', value: '+28%' },
      { label: 'Cart Abandonment', value: '-35%' }
    ],
    isVisible: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockHomeSections: HomeSection[] = [
  {
    id: '1',
    type: 'hero',
    title: 'Learn Without Limits',
    subtitle: 'Online and offline courses, events, and career pathways—built for real progress.',
    isVisible: true,
    order: 0
  },
  {
    id: '2',
    type: 'stats',
    title: 'Our Results',
    content: 'Numbers that speak. Graduates who change careers, build portfolios, and get hired.',
    isVisible: true,
    order: 1
  },
  {
    id: '3',
    type: 'courses',
    title: 'Featured Courses',
    subtitle: 'Start your journey with our most popular programs',
    isVisible: true,
    order: 2
  },
  {
    id: '4',
    type: 'events',
    title: 'Upcoming Events',
    subtitle: 'Learn by doing. Workshops, critiques, and meetups.',
    isVisible: true,
    order: 3
  },
  {
    id: '5',
    type: 'results',
    title: 'Student Success',
    subtitle: 'See what our graduates have built',
    isVisible: true,
    order: 4
  },
  {
    id: '6',
    type: 'cta',
    title: 'Ready to Start?',
    content: 'Apply now and get a free learning plan + career roadmap.',
    isVisible: true,
    order: 5
  }
];

export const defaultStats: SiteStats = {
  graduates: 12400,
  completionRate: 94,
  partnerCompanies: 180,
  coursesCount: 45
};

export const defaultContactInfo: ContactInfo = {
  email: 'hello@learningcenter.studio',
  phone: '+1 (555) 014-2230',
  address: '123 Studio Lane, Design District',
  socialLinks: {
    twitter: '#',
    linkedin: '#',
    instagram: '#',
    facebook: '#'
  }
};

// Initialize localStorage with mock data if empty
export function initializeMockData() {
  const existing = localStorage.getItem('learningCenterData');
  if (!existing) {
    const initialData = {
      courses: mockCourses,
      events: mockEvents,
      vacancies: mockVacancies,
      results: mockResults,
      homeSections: mockHomeSections,
      stats: defaultStats,
      contactInfo: defaultContactInfo
    };
    localStorage.setItem('learningCenterData', JSON.stringify(initialData));
  }
}
