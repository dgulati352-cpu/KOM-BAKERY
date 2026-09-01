import React, { useState } from 'react';
import {
  X,
  Users,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Clock,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  CAKE_SIZES,
  CAKE_FLAVORS,
  CAKE_FILLINGS,
  CAKE_DECORATIONS,
  ADDON_ITEMS,
} from '../data/addons';
import type {
  CakeSizeOption,
  CustomizationFlavor,
  CustomizationFilling,
  CustomizationDecoration,
  AddonItem,
} from '../types';
import { formatPrice } from '../utils/pricing';

export const ProductCustomizerModal: React.FC = () => {
  const { activeCustomizingProduct, closeCustomizer, addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<CakeSizeOption>(CAKE_SIZES[0]);
  const [selectedFlavor, setSelectedFlavor] = useState<CustomizationFlavor>(CAKE_FLAVORS[0]);
  const [selectedFilling, setSelectedFilling] = useState<CustomizationFilling>(CAKE_FILLINGS[0]);
  const [selectedDecoration, setSelectedDecoration] = useState<CustomizationDecoration>(
    CAKE_DECORATIONS[0]
  );
  const [customMessage, setCustomMessage] = useState('');
  const [premiumLettering, setPremiumLettering] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<AddonItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialNote, setSpecialNote] = useState('');

  if (!activeCustomizingProduct) return null;

  const toggleAddon = (addon: AddonItem) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const baseSizePrice = selectedSize.price;
  const flavorAdd = selectedFlavor.priceAdd;
  const fillingAdd = selectedFilling.priceAdd;
  const decorationAdd = selectedDecoration.priceAdd;
  const letteringAdd = premiumLettering ? 250 : 0;
  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);

  const unitPrice =
    baseSizePrice + flavorAdd + fillingAdd + decorationAdd + letteringAdd + addonsTotal;
  const subtotal = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(
      activeCustomizingProduct,
      quantity,
      {
        size: selectedSize,
        flavor: selectedFlavor,
        filling: selectedFilling,
        customMessage,
        premiumLettering,
        decoration: selectedDecoration,
        selectedAddons,
      },
      specialNote
    );
    closeCustomizer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#1C130E]/75 backdrop-blur-sm transition-opacity"
        onClick={closeCustomizer}
      />

      <div className="relative w-full max-w-3xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#EFE8DE] overflow-hidden z-10 animate-fade-up max-h-[92vh] flex flex-col my-auto">
        <div className="p-5 sm:p-6 border-b border-[#EFE8DE] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={activeCustomizingProduct.image}
              alt={activeCustomizingProduct.name}
              className="w-12 h-12 rounded-xl object-cover shadow-warm-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C87D55] bg-[#FBEDDE] px-2 py-0.5 rounded-full">
                  Custom Cake Studio
                </span>
                <span className="text-xs text-[#947665] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C87D55]" />
                  24h Lead Time
                </span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#1C130E] leading-tight">
                {activeCustomizingProduct.name}
              </h2>
            </div>
          </div>

          <button
            onClick={closeCustomizer}
            aria-label="Close customizer"
            className="p-2 text-[#705446] hover:text-[#1C130E] hover:bg-[#F4ECE0] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-7 overflow-y-auto space-y-7 flex-1">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase font-bold tracking-wider text-[#705446]">
                1. Select Cake Size & Guest Servings <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-[#8C4425] font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {selectedSize.servings}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CAKE_SIZES.map((size) => {
                const isSelected = selectedSize.id === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#C87D55] bg-[#FBEDDE] shadow-warm-sm ring-1 ring-[#C87D55]'
                        : 'border-[#EFE8DE] bg-white hover:bg-[#FAF6ED]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif font-bold text-sm text-[#1C130E]">
                        {size.label}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#C87D55] text-white flex items-center justify-center text-[10px]">
                          ✓
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-[#705446]">{size.servings}</p>
                    <p className="font-bold text-xs text-[#2A1D17] mt-2">
                      {formatPrice(size.price)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs uppercase font-bold tracking-wider text-[#705446] block">
              2. Sponge Base Flavor <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CAKE_FLAVORS.map((flavor) => {
                const isSelected = selectedFlavor.id === flavor.id;
                return (
                  <button
                    key={flavor.id}
                    type="button"
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                      isSelected
                        ? 'border-[#C87D55] bg-[#FBEDDE] ring-1 ring-[#C87D55]'
                        : 'border-[#EFE8DE] bg-white hover:bg-[#FAF6ED]'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#1C130E]">{flavor.name}</span>
                    <span className="text-xs font-medium text-[#705446]">
                      {flavor.priceAdd > 0 ? `+${formatPrice(flavor.priceAdd)}` : 'Included'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs uppercase font-bold tracking-wider text-[#705446] block">
              3. Artisan Layer Filling <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CAKE_FILLINGS.map((filling) => {
                const isSelected = selectedFilling.id === filling.id;
                return (
                  <button
                    key={filling.id}
                    type="button"
                    onClick={() => setSelectedFilling(filling)}
                    className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                      isSelected
                        ? 'border-[#C87D55] bg-[#FBEDDE] ring-1 ring-[#C87D55]'
                        : 'border-[#EFE8DE] bg-white hover:bg-[#FAF6ED]'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#1C130E]">{filling.name}</span>
                    <span className="text-xs font-medium text-[#705446]">
                      {filling.priceAdd > 0 ? `+${formatPrice(filling.priceAdd)}` : 'Included'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs uppercase font-bold tracking-wider text-[#705446] block">
              4. Exterior Finishing & Decoration
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CAKE_DECORATIONS.map((dec) => {
                const isSelected = selectedDecoration.id === dec.id;
                return (
                  <button
                    key={dec.id}
                    type="button"
                    onClick={() => setSelectedDecoration(dec)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#C87D55] bg-[#FBEDDE] ring-1 ring-[#C87D55]'
                        : 'border-[#EFE8DE] bg-white hover:bg-[#FAF6ED]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs text-[#1C130E]">{dec.name}</span>
                        <span className="text-xs font-bold text-[#8C4425]">
                          {dec.priceAdd > 0 ? `+${formatPrice(dec.priceAdd)}` : 'Included'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#705446]">{dec.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 p-4 bg-white rounded-2xl border border-[#EFE8DE]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#705446]">
                5. Custom Inscription Message (Optional)
              </label>
              <span className="text-[11px] text-[#947665]">
                {customMessage.length}/40 characters
              </span>
            </div>

            <input
              type="text"
              maxLength={40}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="e.g. Happy 30th Birthday Anya! 🎈"
              className="w-full p-3 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] placeholder-[#947665] focus:outline-none focus:ring-2 focus:ring-[#C87D55]"
            />

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={premiumLettering}
                onChange={(e) => setPremiumLettering(e.target.checked)}
                className="rounded border-[#DEC9B5] text-[#C87D55] focus:ring-[#C87D55]"
              />
              <span className="text-xs text-[#3D2B22]">
                Upgrade to 24k Gold Foil Lettering on Dark Chocolate Plaque (+₹250)
              </span>
            </label>
          </div>

          <div className="space-y-3">
            <label className="text-xs uppercase font-bold tracking-wider text-[#705446] block">
              6. Celebration Accessories & Gift Packaging
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ADDON_ITEMS.map((addon) => {
                const isSelected = selectedAddons.some((a) => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-[#C87D55] bg-[#FBEDDE] ring-1 ring-[#C87D55]'
                        : 'border-[#EFE8DE] bg-white hover:bg-[#FAF6ED]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#C87D55] border-[#C87D55] text-white'
                            : 'border-[#DEC9B5]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#1C130E]">{addon.name}</p>
                        <p className="text-[10px] text-[#705446]">{addon.description}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#8C4425] shrink-0 ml-2">
                      +{formatPrice(addon.price)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-wider text-[#705446] block">
              Special Chef Instructions / Dietary Note
            </label>
            <textarea
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g. Please pack extra securely for 30km car ride, or reduce sugar slightly..."
              rows={2}
              className="w-full p-3 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] placeholder-[#947665] focus:outline-none focus:ring-2 focus:ring-[#C87D55]"
            />
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-[#EFE8DE] bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-lg">
          <div className="flex items-center justify-between w-full sm:w-auto gap-6">
            <div>
              <span className="text-[10px] text-[#947665] uppercase font-semibold block">
                Calculated Subtotal
              </span>
              <span className="font-serif text-2xl font-bold text-[#1C130E]">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="flex items-center border border-[#DEC9B5] rounded-full p-1 bg-[#FAF6ED]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#533D32] hover:bg-[#F4ECE0] shadow-sm"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-[#1C130E]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#533D32] hover:bg-[#F4ECE0] shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#2A1D17] hover:bg-[#150E0A] text-[#FAF6ED] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-md hover:shadow-warm-lg hover:-translate-y-0.5 transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-[#E09F67]" />
            <span>Add Custom Cake to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
