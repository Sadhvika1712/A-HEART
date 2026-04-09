import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, HandHelping, Heart, Package, Bell,
  Shield, User, ChevronLeft, ChevronRight, LogOut, Menu, X
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/requests', icon: HandHelping, label: 'Help Requests' },
  { path: '/offers', icon: Heart, label: 'Help Offers' },
  { path: '/resources', icon: Package, label: 'Resources' },
  { path: '/notifications', icon: Bell, label: 'Notifications' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const adminItems = [
  { path: '/admin', icon: Shield, label: 'Admin Panel' },
];

export default function Sidebar({ user, unreadCount, pendingCount }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = user?.role === 'admin';

  const allItems = isAdmin ? [...navItems, ...adminItems] : navItems;

  const NavLink = ({ item }) => {
    const isActive = location.pathname === item.path;
    const showBadge =
      (item.path === '/notifications' && unreadCount > 0) ||
      (item.path === '/admin' && pendingCount > 0);
    const badgeCount = item.path === '/notifications' ? unreadCount : pendingCount;

    return (
      <Link
        to={item.path}
        onClick={() => setMobileOpen(false)}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
      >
        <item.icon className="w-5 h-5 shrink-0" />
        {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
        {showBadge && (
          <span className={cn(
            "bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center",
            collapsed ? "absolute -top-1 -right-1 w-4 h-4 text-[10px]" : "ml-auto w-5 h-5"
          )}>
            {badgeCount > 9 ? '9+' : badgeCount}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg shadow-lg border border-border"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full bg-sidebar border-r border-sidebar-border z-50 flex flex-col transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-sidebar-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-sidebar-foreground text-base tracking-tight">A-HEART</span>
                <p className="text-xs text-sidebar-foreground/40 leading-none mt-0.5">Community Hub</p>
              </div>
            </div>
          )}
          <button
            onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }}
            className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/60 hidden lg:flex"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-sidebar-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {allItems.map(item => <NavLink key={item.path} item={item} />)}
        </nav>

        {/* User info & Logout */}
        <div className="p-3 border-t border-sidebar-border">
          {!collapsed && user && (
            <div className="px-3 py-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-sidebar-primary">{user.full_name?.[0]?.toUpperCase() || 'U'}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-sidebar-foreground truncate">{user.full_name}</p>
                  <p className="text-[10px] text-sidebar-foreground/40 truncate capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => base44.auth.logout()}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors w-full"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
