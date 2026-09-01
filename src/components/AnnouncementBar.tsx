import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Announcement" className="bg-[#2A1D17] text-[#FAF6ED] text-xs py-2 px-4 border-b border-[#3D2B22]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-[#E09F67] font-semibold">Morning Bake:</span>
          <span>Order by 2:00 PM for same-day evening pickup • Free delivery on orders over ₹2,000</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[#DEC9B5] text-[11px]">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Clock className="w-3.5 h-3.5 text-[#E09F67]" />
            <span>Open Today: 7:00 AM – 7:00 PM</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#E09F67]" />
            <span>Bloom Quarter, Bengaluru</span>
          </span>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 hover:text-[#E09F67] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#E09F67]" />
            <span>+91 98765 43210</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
