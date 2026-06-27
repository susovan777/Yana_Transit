// Path: apps/admin/src/components/layout/AppLayout.tsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F9FC]">
      {/* Fixed sidebar */}
      <Sidebar />

      {/* Right panel: topbar + scrollable content */}
      <div className="flex flex-col flex-1 min-w-0 ml-[240px]">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
