"use client";

import { useState } from 'react';
import { Menu, MessageSquare, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SignOutForm } from '@/components/auth/common/sign-out-form';
import { handleSignOut } from '@/app/(auth)/actions/sign-out';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <div className="h-screen flex">
      {/* Left Sidebar */}
      <div 
        className={cn(
          "bg-gray-100 border-r-4 border-black transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-64" : "w-0"
        )}
      >
        <div className="p-4 flex-1">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-black text-white p-2 rounded-none hover:bg-gray-800"
          >
            <Menu />
          </button>
          <nav className="mt-8 space-y-2">
            {['Ideation', 'Research', 'Design', 'Development', 'Launch'].map((item) => (
              <a
                key={item}
                href="#"
                className="block p-3 bg-white border-4 border-black hover:bg-yellow-200 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        
        {/* Sign Out Button at Bottom */}
        <div className="p-4">
          <SignOutForm signOutAction={handleSignOut} />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-white">
        <div className="h-full">{children}</div>
      </main>

      {/* Right Chat Sidebar */}
      <div 
        className={cn(
          "bg-gray-100 border-l-4 border-black transition-all duration-300",
          chatOpen ? "w-96" : "w-0"
        )}
      >
        <div className="p-4">
          <button 
            onClick={() => setChatOpen(!chatOpen)}
            className="bg-black text-white p-2 rounded-none hover:bg-gray-800"
          >
            <MessageSquare />
          </button>
          <div className="mt-8">
            <div className="bg-white border-4 border-black p-4 h-[calc(100vh-8rem)]">
              <div className="h-[calc(100%-4rem)] overflow-auto">
                {/* Chat messages would go here */}
                <div className="space-y-4">
                  <div className="bg-blue-200 p-3 border-2 border-black">
                    How can I help with your product development today?
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full p-3 border-4 border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};