import React from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartItem, formatARS } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: CartModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = subtotal > 65000 ? 0 : 5000;
  const total = subtotal + shippingCost;

  const handleProceedToCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Slide drawer container */}
      <div className="relative w-full max-w-md h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] my-4 mx-4 md:mx-6 flex flex-col z-10 gap-3 md:gap-4 animate-slide-left pointer-events-none">
        
        {/* Header */}
        <div className="p-4 md:px-6 md:py-4 bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100/80 flex justify-between items-center shrink-0 pointer-events-auto">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-voldog-green-dark" />
            <h3 className="font-display font-bold text-base text-voldog-black uppercase tracking-wider">
              Tu Carrito
            </h3>
            {cartItems.length > 0 && (
              <span className="bg-voldog-green-dark text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200/60 rounded-full text-voldog-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Combined Items & Footer Container */}
        <div className="flex-grow flex flex-col min-h-0 bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100/80 overflow-hidden pointer-events-auto">
          {/* List of items */}
          <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
                <ShoppingCart className="w-16 h-16 text-voldog-green-dark/25 mb-4" />
                <h4 className="font-display font-bold text-sm text-voldog-black uppercase tracking-wider mb-1">
                  Tu carrito está vacío
                </h4>
                <p className="text-xs text-voldog-gray-medium max-w-xs mb-6 font-normal">
                  Descubre nuestros menús y snacks de primera calidad.
                </p>
                <button
                  onClick={onClose}
                  className="py-3 px-6 bg-voldog-green-dark hover:bg-voldog-green-medium text-white font-display font-bold text-xs tracking-widest uppercase rounded-full transition-all cursor-pointer"
                >
                  Volver a la tienda
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 pb-4 border-b border-gray-100 last:border-b-0"
                >
                  {/* Thumb Frame */}
                  <div className="w-20 h-20 shrink-0 flex items-center justify-center overflow-visible bg-transparent relative z-0">
                    <div className={`w-full h-full flex items-center justify-center mix-blend-multiply ${
                      item.product.image?.includes('googleusercontent.com') || item.product.image?.includes('drive.google.com') || item.product.image?.startsWith('/product-')
                        ? 'scale-[1.35]'
                        : 'scale-[1.08]'
                    }`}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-1 contrast-[1.04] brightness-[1.02] mix-blend-multiply"
                        referrerPolicy="no-referrer"
                        loading="eager"
                      />
                    </div>
                  </div>

                  {/* Details context */}
                  <div className="flex-grow flex flex-col justify-between relative z-10">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-display font-bold text-base text-voldog-black line-clamp-2 leading-tight pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-voldog-gray-medium hover:text-red-500 transition-colors p-1"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-voldog-gray-medium block mt-0.5 font-normal">
                        Peso: {item.product.weight}
                      </span>
                    </div>

                    {/* Quantity Actions */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-0.5 bg-gray-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-white rounded text-voldog-gray-medium hover:text-voldog-black transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-white rounded text-voldog-gray-medium hover:text-voldog-black transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-voldog-green-dark">
                        {formatARS(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer actions inside the main card */}
          {cartItems.length > 0 && (
            <div className="p-4 md:p-6 bg-voldog-gray-light/30 border-t border-gray-100 shrink-0 space-y-4">
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs text-voldog-gray-medium">
                  <span>Subtotal pedido</span>
                  <span className="font-bold text-voldog-black">{formatARS(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-voldog-gray-medium">
                  <span>Envío refrigerado</span>
                  {shippingCost === 0 ? (
                    <span className="font-bold text-[#EA580C] uppercase text-[10px] bg-orange-50 px-2 py-0.5 rounded">
                      ¡Gratis!
                    </span>
                  ) : (
                    <span className="font-bold text-voldog-black">{formatARS(shippingCost)}</span>
                  )}
                </div>
                
                {shippingCost > 0 && (
                  <div className="text-[10px] text-voldog-green-dark text-center font-normal">
                    ¡Añade <span className="font-bold">{formatARS(65000 - subtotal)}</span> más para conseguir Envío Gratis!
                  </div>
                )}

                <hr className="border-gray-200/50 my-1" />

                <div className="flex justify-between items-center">
                  <span className="font-display font-bold text-sm text-voldog-black">Total</span>
                  <span className="text-xl font-black text-voldog-green-dark">{formatARS(total)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 bg-voldog-green-dark hover:bg-voldog-green-medium text-white font-display font-bold text-xs tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer hover:scale-[1.01]"
              >
                Pagar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
