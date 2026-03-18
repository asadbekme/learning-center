import { 
  BookOpen, 
  Calendar, 
  Briefcase, 
  Trophy, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { GlassCard, FadeIn } from '@/components/animations';
import { useAppData } from '@/hooks/useLocalStorageState';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Total Courses', icon: BookOpen, key: 'courses', color: 'bg-blue-500', change: '+12%' },
  { label: 'Upcoming Events', icon: Calendar, key: 'events', color: 'bg-green-500', change: '+5%' },
  { label: 'Open Positions', icon: Briefcase, key: 'vacancies', color: 'bg-orange-500', change: '-2%' },
  { label: 'Student Results', icon: Trophy, key: 'results', color: 'bg-purple-500', change: '+18%' },
];

export function AdminDashboard() {
  const { data } = useAppData();

  const getCount = (key: string) => {
    const items = data[key as keyof typeof data] as any[];
    return items?.filter((item: any) => item.isVisible).length || 0;
  };

  const recentActivity = [
    { action: 'New course added', item: 'Design System Fundamentals', time: '2 hours ago' },
    { action: 'Event updated', item: 'Portfolio Review Week', time: '5 hours ago' },
    { action: 'Result published', item: 'Fintech App Redesign', time: '1 day ago' },
    { action: 'Vacancy created', item: 'Product Design Mentor', time: '2 days ago' },
  ];

  return (
    <div>
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111216]">Dashboard</h1>
          <p className="text-[#6B6F7A]">Welcome back! Here's what's happening with your learning center.</p>
        </div>
      </FadeIn>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const count = getCount(stat.key);
          const isPositive = stat.change.startsWith('+');
          
          return (
            <FadeIn key={stat.key} delay={index * 0.1}>
              <Link to={`/admin/${stat.key}`}>
                <GlassCard className="p-5 group cursor-pointer hover:border-[#7B61FF]/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-medium ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-[#111216] mb-1">{count}</div>
                  <div className="text-sm text-[#6B6F7A]">{stat.label}</div>
                </GlassCard>
              </Link>
            </FadeIn>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Site Stats */}
        <FadeIn delay={0.4}>
          <GlassCard className="p-6 lg:col-span-2">
            <h2 className="text-lg font-bold text-[#111216] mb-6">Site Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Graduates', value: data.stats.graduates, suffix: '+' },
                { label: 'Completion Rate', value: data.stats.completionRate, suffix: '%' },
                { label: 'Partners', value: data.stats.partnerCompanies, suffix: '+' },
                { label: 'Total Courses', value: data.stats.coursesCount, suffix: '+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-[#F6F7FA] rounded-xl">
                  <div className="text-2xl font-bold text-[#7B61FF]">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-xs text-[#6B6F7A] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-medium text-[#6B6F7A] mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/admin/courses"
                  className="px-4 py-2 bg-[#7B61FF]/10 text-[#7B61FF] rounded-lg text-sm font-medium hover:bg-[#7B61FF]/20 transition-colors"
                >
                  + Add Course
                </Link>
                <Link
                  to="/admin/events"
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                >
                  + Add Event
                </Link>
                <Link
                  to="/admin/vacancies"
                  className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors"
                >
                  + Add Vacancy
                </Link>
                <Link
                  to="/admin/results"
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                >
                  + Add Result
                </Link>
              </div>
            </div>
          </GlassCard>
        </FadeIn>

        {/* Recent Activity */}
        <FadeIn delay={0.5}>
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold text-[#111216] mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#7B61FF] mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#111216]">{activity.action}</p>
                    <p className="text-xs text-[#6B6F7A]">{activity.item}</p>
                    <p className="text-xs text-[#6B6F7A]/70 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
