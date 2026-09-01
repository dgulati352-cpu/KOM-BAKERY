import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Car,
  Navigation,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { STORE_SCHEDULE } from '../data/storeHours';

export const ContactPage: React.FC = () => {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Missing Fields', 'Please fill in your name, email, and message.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      showToast('Message Sent', 'Thank you! Our bakery team will reply within 2 hours.', 'success');
    }, 600);
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <PageHero
        eyebrow="GET IN TOUCH"
        title="We'd Love to Hear From You"
        subtitle="Visit our hearth in Bengaluru, inquire about custom catering, or drop us a note with any questions."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Business Details & Operating Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#EFE3D3] shadow-warm-sm space-y-6">
              <h3 className="font-serif font-bold text-xl text-[#2D211D]">
                Bakery Flagship & Hearth
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#5A3026]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F8F1E7] text-[#A86A4A] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2D211D]">Address</p>
                    <p className="text-[#7D6A60]">14/A, Artisan Lane, Bloom Quarter, Bengaluru, KA 560034</p>
                    <p className="text-[11px] text-[#A86A4A] mt-0.5">Landmark: Opposite Bloom Botanical Pavilion</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F8F1E7] text-[#A86A4A] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2D211D]">Phone & WhatsApp</p>
                    <a href="tel:+919876543210" className="text-[#7D6A60] hover:text-[#2D211D]">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F8F1E7] text-[#A86A4A] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2D211D]">Email Inquiries</p>
                    <a href="mailto:hello@kombakery.com" className="text-[#7D6A60] hover:text-[#2D211D]">
                      hello@kombakery.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 flex gap-3 border-t border-[#EFE3D3]">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#F8F1E7] hover:bg-[#EFE3D3] text-[#2D211D] border border-[#EFE3D3] text-xs font-semibold transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#A86A4A]" />
                  <span>Google Maps</span>
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#F8F1E7] hover:bg-[#EFE3D3] text-[#2D211D] border border-[#EFE3D3] text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#A86A4A]" />
                  <span>Call Counter</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#EFE3D3] shadow-warm-sm space-y-4">
              <h4 className="font-serif font-bold text-base text-[#2D211D] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A86A4A]" />
                <span>Weekly Counter Hours</span>
              </h4>

              <div className="text-xs divide-y divide-[#EFE3D3] bg-[#F8F1E7]/50 rounded-xl p-3">
                {Object.values(STORE_SCHEDULE).map((sched) => (
                  <div key={sched.shortCode} className="flex justify-between py-1.5">
                    <span className="font-semibold text-[#2D211D]">{sched.dayName}</span>
                    <span className="text-[#7D6A60]">
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

              <div className="p-3 bg-[#F8F1E7] rounded-xl text-[11px] text-[#7D6A60] flex items-start gap-2">
                <Car className="w-4 h-4 text-[#A86A4A] shrink-0 mt-0.5" />
                <span>Curbside pickup bays available directly in front of the bakery.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF9] p-6 sm:p-10 rounded-3xl border border-[#EFE3D3] shadow-warm-lg">
              {isSent ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#F8F1E7] text-[#A86A4A] flex items-center justify-center text-3xl mx-auto shadow-warm-sm">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#2D211D]">
                    Message Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A3026] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#2D211D]">{formData.name}</strong>. Our team has received your note and will get back to you at {formData.email} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'General Question',
                        message: '',
                      });
                    }}
                    className="text-xs font-bold text-[#A86A4A] hover:underline pt-2 inline-block"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-[#EFE3D3] pb-3">
                    <h3 className="font-serif font-bold text-xl text-[#2D211D]">
                      Send Us a Note
                    </h3>
                    <p className="text-xs text-[#7D6A60]">
                      We typically respond within 2 to 4 hours during bakery counter hours.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2D211D]">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Aditi Rao"
                        className="w-full p-3 rounded-xl bg-[#F8F1E7] border border-[#EFE3D3] text-xs text-[#2D211D] placeholder-[#7D6A60] focus:ring-1 focus:ring-[#A86A4A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2D211D]">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. aditi@example.com"
                        className="w-full p-3 rounded-xl bg-[#F8F1E7] border border-[#EFE3D3] text-xs text-[#2D211D] placeholder-[#7D6A60] focus:ring-1 focus:ring-[#A86A4A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2D211D]">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full p-3 rounded-xl bg-[#F8F1E7] border border-[#EFE3D3] text-xs text-[#2D211D] placeholder-[#7D6A60] focus:ring-1 focus:ring-[#A86A4A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2D211D]">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#F8F1E7] border border-[#EFE3D3] text-xs text-[#2D211D] font-medium focus:ring-1 focus:ring-[#A86A4A]"
                      >
                        <option>General Question</option>
                        <option>Order Status Inquiry</option>
                        <option>Custom Cake Consultation</option>
                        <option>Event Catering / Bulk Order</option>
                        <option>Feedback / Suggestion</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-[#2D211D]">Message *</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can our pastry chefs and team help you today?"
                        className="w-full p-3 rounded-xl bg-[#F8F1E7] border border-[#EFE3D3] text-xs text-[#2D211D] placeholder-[#7D6A60] focus:ring-1 focus:ring-[#A86A4A]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#2D211D] hover:bg-[#1C1411] text-[#FFFDF9] py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-md hover:shadow-warm-lg transition-all"
                  >
                    <Send className="w-4 h-4 text-[#C9A36A]" />
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
