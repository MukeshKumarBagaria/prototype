import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { SidebarItem } from '@/data/navigation';

export function Layout({ children, sidebarItems = [] }: { children: React.ReactNode, sidebarItems?: SidebarItem[] }) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />
            <Sidebar items={sidebarItems} />
            <main className="pl-16 pt-2 min-h-screen transition-all duration-300">
                <div className="pb-8 pt-4 w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
