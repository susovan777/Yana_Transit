// Path: apps/admin/src/components/layout/Topbar.tsx
import { useLocation } from 'react-router-dom';
import { Bell, Building2 } from 'lucide-react';
import { useAuth } from '../../store/auth.store';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/companies': 'Companies',
  '/fleet': 'Fleet',
  '/bookings': 'Bookings',
  '/invoices': 'Invoices',
  '/reports': 'Reports',
  '/users': 'Users',
};

export function Topbar() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const title = PAGE_TITLES[pathname] ?? 'Yana Transit';
  const isCorporateUser = user?.role !== 'YAANA_ADMIN';

  return (
    <header
      className="h-[64px] flex items-center justify-between px-6 shrink-0 bg-white border-b"
      style={{ borderColor: '#E2E8F2' }}
    >
      {/* Left: Page title */}
      <div className="flex items-center gap-3">
        <h1
          className="text-[17px] font-semibold text-[#0B1F3A]"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {title}
        </h1>

        {/* Company scope pill — shown for corporate users so they always
            know which company's data they're viewing */}
        {isCorporateUser && user?.companyName && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F0FE] border border-[#2E6FD8]/20 text-[11px] font-semibold text-[#2E6FD8] tracking-wide">
            <Building2 size={11} />
            {user.companyName}
          </span>
        )}
      </div>

      {/* Right: Notifications + admin badge */}
      <div className="flex items-center gap-3">
        {/* YAANA_ADMIN badge */}
        {user?.role === 'YAANA_ADMIN' && (
          <span className="px-2.5 py-1 rounded-full bg-[#0B1F3A] text-[10px] font-bold text-white tracking-[1px] uppercase">
            Yana Admin
          </span>
        )}

        {/* Notification bell (placeholder — wire up in future) */}
        <button
          className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[#6B7A90] hover:bg-[#F0F5FF] hover:text-[#2E6FD8] transition-colors"
          aria-label="Notifications"
        >
          <Bell size={17} />
        </button>
      </div>
    </header>
  );
}
