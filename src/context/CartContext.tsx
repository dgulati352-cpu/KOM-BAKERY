import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  CartItem,
  Product,
  CakeCustomizationSelection,
  FulfillmentType,
  PlacedOrder,
} from '../types';
import { calculateProductPrice } from '../utils/pricing';

interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    product: Product,
    quantity?: number,
    customization?: CakeCustomizationSelection,
    specialInstructions?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  couponCode: string;
  discountAmount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  fulfillmentType: FulfillmentType;
  setFulfillmentType: (type: FulfillmentType) => void;
  selectedZoneId: string;
  setSelectedZoneId: (zoneId: string) => void;
  activeCustomizingProduct: Product | null;
  openCustomizer: (product: Product) => void;
  closeCustomizer: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  placedOrders: PlacedOrder[];
  addPlacedOrder: (order: PlacedOrder) => void;
  latestOrder: PlacedOrder | null;
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'kom_bakery_cart_v2';
const ORDERS_STORAGE_KEY = 'kom_bakery_orders_v2';
const WISHLIST_STORAGE_KEY = 'kom_bakery_wishlist_v2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCustomizingProduct, setActiveCustomizingProduct] = useState<Product | null>(null);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>('pickup');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-1');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Persist placed orders
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(placedOrders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [placedOrders]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'Item removed from your favorites.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', 'Item added to your favorites.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const showToast = (
    title: string,
    message: string,
    type: 'success' | 'info' | 'warning' = 'success'
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (
    product: Product,
    quantity: number = 1,
    customization?: CakeCustomizationSelection,
    specialInstructions?: string
  ) => {
    const unitPrice = calculateProductPrice(product, customization);
    const maxStock = product.availability.remainingStock;

    const existingIndex = cart.findIndex((item) => {
      if (item.product.id !== product.id) return false;
      if (customization || item.customization) {
        return (
          JSON.stringify(item.customization) === JSON.stringify(customization) &&
          item.specialInstructions === specialInstructions
        );
      }
      return true;
    });

    if (existingIndex > -1) {
      const existing = cart[existingIndex];
      const newQty = existing.quantity + quantity;

      if (newQty > maxStock) {
        showToast(
          'Stock Limit Reached',
          `Only ${maxStock} units of "${product.name}" are available in today's fresh batch.`,
          'warning'
        );
        return;
      }

      const updated = [...cart];
      updated[existingIndex] = {
        ...existing,
        quantity: newQty,
        lineTotal: unitPrice * newQty,
      };
      setCart(updated);
    } else {
      if (quantity > maxStock) {
        showToast(
          'Stock Limit Reached',
          `Only ${maxStock} available for order today.`,
          'warning'
        );
        return;
      }

      const newItem: CartItem = {
        cartItemId: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        product,
        quantity,
        unitPrice,
        lineTotal: unitPrice * quantity,
        customization,
        specialInstructions,
      };
      setCart((prev) => [...prev, newItem]);
    }

    showToast(
      'Added to Bakery Bag',
      `${quantity}x ${product.name} has been added fresh.`,
      'success'
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    const item = cart.find((i) => i.cartItemId === cartItemId);
    if (!item) return;

    if (newQuantity > item.product.availability.remainingStock) {
      showToast(
        'Batch Limit',
        `Maximum ${item.product.availability.remainingStock} available from today's oven.`,
        'warning'
      );
      return;
    }

    setCart((prev) =>
      prev.map((i) =>
        i.cartItemId === cartItemId
          ? {
              ...i,
              quantity: newQuantity,
              lineTotal: i.unitPrice * newQuantity,
            }
          : i
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setDiscountAmount(0);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SWEET10' || cleanCode === 'WELCOME10') {
      setCouponCode(cleanCode);
      const subtotal = cart.reduce((s, i) => s + i.lineTotal, 0);
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
      showToast('Offer Applied!', '10% Welcome Discount applied to your order.', 'success');
      return { success: true, message: '10% discount applied!' };
    }

    if (cleanCode === 'FREESHIP') {
      setCouponCode(cleanCode);
      showToast('Offer Applied!', 'Free Delivery coupon unlocked.', 'success');
      return { success: true, message: 'Free Delivery unlocked!' };
    }

    return { success: false, message: 'Invalid promo code. Try "SWEET10"!' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountAmount(0);
  };

  const openCustomizer = (product: Product) => {
    setActiveCustomizingProduct(product);
  };

  const closeCustomizer = () => {
    setActiveCustomizingProduct(null);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const addPlacedOrder = (order: PlacedOrder) => {
    setPlacedOrders((prev) => [order, ...prev]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const latestOrder = placedOrders.length > 0 ? placedOrders[0] : null;

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        couponCode,
        discountAmount,
        applyCoupon,
        removeCoupon,
        fulfillmentType,
        setFulfillmentType,
        selectedZoneId,
        setSelectedZoneId,
        activeCustomizingProduct,
        openCustomizer,
        closeCustomizer,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        placedOrders,
        addPlacedOrder,
        latestOrder,
        toasts,
        showToast,
        removeToast,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
