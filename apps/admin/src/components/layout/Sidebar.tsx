// Path: apps/admin/src/components/layout/Sidebar.tsx
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Car,
  CalendarCheck,
  FileText,
  BarChart3,
  Users,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../store/auth.store';
import toast from 'react-hot-toast';

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  adminOnly?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Companies', href: '/companies', icon: Building2, adminOnly: true },
  { label: 'Fleet', href: '/fleet', icon: Car, adminOnly: true },
  { label: 'Bookings', href: '/bookings', icon: CalendarCheck },
  { label: 'Invoices', href: '/invoices', icon: FileText },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  { label: 'Users', href: '/users', icon: Users, adminOnly: true },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'YAANA_ADMIN';

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch {
      toast.error('Failed to log out. Please try again.');
    }
  };

  const visibleItems = NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin);

  return (
    <aside
      className="fixed top-0 left-0 h-screen w-[240px] flex flex-col z-40"
      style={{ background: '#0B1F3A' }}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2E6FD8] flex items-center justify-center shrink-0">
            <Car size={16} className="text-white" />
          </div>
          <div>
            <p
              className="text-white font-semibold text-[15px] leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Yana Transit
            </p>
            <p className="text-white/40 text-[10px] tracking-[1.5px] uppercase font-medium">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-0.5">
          {visibleItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative',
                  isActive
                    ? 'bg-[#2E6FD8]/20 text-white'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active indicator bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#2E6FD8] rounded-r" />
                  )}
                  <item.icon
                    size={16}
                    className={isActive ? 'text-[#2E6FD8]' : 'text-current'}
                  />
                  <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {item.label}
                  </span>
                  {isActive && (
                    <ChevronRight
                      size={14}
                      className="ml-auto text-[#2E6FD8] opacity-60"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Section label for admin-only items */}
        {isAdmin && (
          <p className="mt-6 mb-2 px-3 text-[10px] font-semibold text-white/25 tracking-[1.5px] uppercase">
            Administration
          </p>
        )}
      </nav>

      {/* Bottom: user info + logout */}
      <div className="px-3 pb-4 border-t border-white/[0.07] pt-3">
        {/* User card */}
        <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#2E6FD8]/30 border border-[#2E6FD8]/40 flex items-center justify-center shrink-0">
            <span
              className="text-[#7EB3FF] text-xs font-semibold"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="text-white text-[13px] font-medium truncate"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {user?.name}
            </p>
            <p className="text-white/35 text-[11px] truncate">
              {user?.role === 'YAANA_ADMIN'
                ? 'Yana Admin'
                : user?.role === 'CORPORATE_ADMIN'
                ? 'Corp. Admin'
                : 'User'}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-150 text-sm"
        >
          <LogOut size={15} />
          <span style={{ fontFamily: 'Poppins, sans-serif' }}>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
