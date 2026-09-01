import React, { useState } from 'react';
import { Sparkles, Upload, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CustomCakeSection: React.FC = () => {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Birthday Celebration',
    eventDate: '',
    servings: '20–30 guests',
    flavor: 'Belgian Chocolate & Salted Caramel',
    budget: '₹4,000 – ₹7,000',
    description: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.eventDate) {
      showToast('Missing Details', 'Please fill in your name, contact phone, and event date.', 'warning');
      return;
    }

    setIsSubmitted(true);
    showToast(
      'Request Received!',
      'Our Master Pâtissière will review your design and call you within 4 business hours.',
      'success'
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <section id="custom-cakes" className="py-16 sm:py-24 bg-[#FAF6ED] border-y border-[#EFE8DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative & Visual Showcase */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#C87D55]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Pâtisserie Studio</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C130E] leading-tight">
              Planning Something Special?
            </h2>

            <p className="text-sm sm:text-base text-[#533D32] leading-relaxed">
              From intimate milestone birthdays to lavish multi-tiered wedding centerpieces, our pastry chefs handcraft custom cakes tailored to your theme, palette, and guest count.
            </p>

            <div className="space-y-3 text-xs text-[#3D2B22] font-medium pt-2">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#EFE8DE]">
                <div className="w-8 h-8 rounded-full bg-[#FBEDDE] flex items-center justify-center text-[#C87D55] shrink-0">
                  🎂
                </div>
                <div>
                  <p className="font-bold text-[#1C130E]">Birthdays & Anniversaries</p>
                  <p className="text-[#705446]">Single & double tier sculpted creations</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#EFE8DE]">
                <div className="w-8 h-8 rounded-full bg-[#FBEDDE] flex items-center justify-center text-[#C87D55] shrink-0">
                  💐
                </div>
                <div>
                  <p className="font-bold text-[#1C130E]">Botanical Wedding Tiers</p>
                  <p className="text-[#705446]">Pesticide-free organic florals & French macarons</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#EFE8DE]">
                <div className="w-8 h-8 rounded-full bg-[#FBEDDE] flex items-center justify-center text-[#C87D55] shrink-0">
                  🏢
                </div>
                <div>
                  <p className="font-bold text-[#1C130E]">Corporate Events & Launches</p>
                  <p className="text-[#705446]">Custom edible brand plaques & dessert tables</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE8DE] shadow-warm-lg">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#FBEDDE] text-[#C87D55] flex items-center justify-center text-3xl mx-auto shadow-warm-sm">
                    ✨
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#1C130E]">
                    Bespoke Request Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#533D32] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#1C130E]">{formData.name}</strong>. Chef Laurent and our design team are reviewing your event details for {formData.eventDate}. We will contact you at {formData.phone} with design sketches and a transparent quote.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFileName(null);
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#C87D55] hover:text-[#8C4425] transition-colors pt-2"
                  >
                    <span>Submit another request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#EFE8DE]">
                    <h3 className="font-serif font-bold text-lg text-[#1C130E]">
                      Custom Cake Consultation
                    </h3>
                    <span className="text-[11px] text-[#947665]">Response in &lt; 4 hours</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#3D2B22]">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Meera Nambiar"
                        className="w-full p-2.5 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] focus:ring-1 focus:ring-[#C87D55]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#3D2B22]">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full p-2.5 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] focus:ring-1 focus:ring-[#C87D55]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#3D2B22]">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. meera@example.com"
                        className="w-full p-2.5 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] focus:ring-1 focus:ring-[#C87D55]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#3D2B22]">Event Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] focus:ring-1 focus:ring-[#C87D55]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#3D2B22]">Guest Servings</label>
                      <select
                        value={formData.servings}
                        onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] focus:ring-1 focus:ring-[#C87D55]"
                      >
                        <option>10–15 guests (1 Tier)</option>
                        <option>20–30 guests (2 Tiers)</option>
                        <option>40–60 guests (3 Tiers)</option>
                        <option>75+ guests (Grand Celebration)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#3D2B22]">Budget Range</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] focus:ring-1 focus:ring-[#C87D55]"
                      >
                        <option>₹2,500 – ₹4,000</option>
                        <option>₹4,000 – ₹7,000</option>
                        <option>₹7,000 – ₹12,000</option>
                        <option>₹15,000+ (Luxury Wedding Tier)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-[#3D2B22]">
                        Design Vision, Theme & Flavors
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Tell us about color palette, mood, specific flowers, cake toppers, dietary allergies..."
                        className="w-full p-2.5 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] placeholder-[#947665] focus:ring-1 focus:ring-[#C87D55]"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-[#3D2B22]">
                        Inspiration Photo Reference (Optional)
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF6ED] hover:bg-[#F4ECE0] text-[#3D2B22] border border-[#DEC9B5] text-xs font-medium cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5 text-[#C87D55]" />
                          <span>{fileName || 'Choose Photo / Moodboard'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        {fileName && (
                          <span className="text-[11px] text-[#2E4A2E] font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Photo attached
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#2A1D17] hover:bg-[#150E0A] text-[#FAF6ED] py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-md hover:shadow-warm-lg transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-[#E09F67]" />
                    <span>Send Custom Cake Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
