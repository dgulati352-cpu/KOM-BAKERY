import React from 'react';
import { X, Clock, MapPin, Phone, Navigation, Car, Store } from 'lucide-react';
import { STORE_SCHEDULE } from '../data/storeHours';

interface StoreInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreInfoModal: React.FC<StoreInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-[#1C130E]/75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EFE8DE] z-10 animate-fade-up max-h-[90vh] overflow-y-auto space-y-6 my-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DE]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FBEDDE] flex items-center justify-center text-[#C87D55]">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1C130E]">Bakery Location & Hours</h3>
              <p className="text-xs text-[#705446]">Bloom Quarter, Bengaluru</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close store hours"
            className="p-1.5 rounded-full hover:bg-[#F4ECE0] text-[#705446]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs uppercase font-bold tracking-wider text-[#705446] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#C87D55]" />
            <span>Weekly Baking & Counter Hours</span>
          </h4>

          <div className="bg-white rounded-2xl border border-[#EFE8DE] overflow-hidden text-xs divide-y divide-[#EFE8DE]">
            {Object.values(STORE_SCHEDULE).map((sched) => (
              <div key={sched.shortCode} className="flex justify-between p-3">
                <span className="font-semibold text-[#1C130E]">{sched.dayName}</span>
                <span className="text-[#533D32]">
                  {sched.openTime === '07:00' ? '7:00 AM' : '8:00 AM'} –{' '}
                  {sched.closeTime === '19:00'
                    ? '7:00 PM'
                    : sched.closeTime === '20:00'
                    ? '8:00 PM'
                    : '5:00 PM'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-[#EFE8DE] space-y-2.5 text-xs text-[#533D32]">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#C87D55] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#1C130E]">Maison Dorée Flagship Hearth</p>
              <p className="text-[#705446]">14/A, Artisan Lane, Bloom Quarter, Bengaluru, KA 560034</p>
              <p className="text-[11px] text-[#947665] mt-1">Landmark: Opposite Bloom Botanical Pavilion</p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#EFE8DE] flex gap-2">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#FAF6ED] hover:bg-[#F4ECE0] text-[#3D2B22] border border-[#DEC9B5] font-semibold transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-[#C87D55]" />
              <span>Google Maps</span>
            </a>
            <a
              href="tel:+919876543210"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#FAF6ED] hover:bg-[#F4ECE0] text-[#3D2B22] border border-[#DEC9B5] font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C87D55]" />
              <span>Call Counter</span>
            </a>
          </div>
        </div>

        <div className="p-3 bg-[#FAF6ED] rounded-xl border border-[#EFE8DE] text-xs text-[#705446] flex items-start gap-2">
          <Car className="w-4 h-4 text-[#C87D55] shrink-0 mt-0.5" />
          <p>
            Reserved 15-minute quick curbside parking bays available directly in front of the bakery for online order pickups.
          </p>
        </div>
      </div>
    </div>
  );
};
