import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, Heart, CreditCard, ArrowLeft, Loader2, CheckCircle2, ChevronRight, MapPin, Phone, Mail, User, ShieldCheck } from 'lucide-react';
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
  onClearCart,
}: CartModalProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardholder: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPaying, setIsPaying] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [savedReceipt, setSavedReceipt] = useState<{ items: CartItem[]; total: number } | null>(null);

  // Reset steps on open
  useEffect(() => {
    if (isOpen) {
      setStep('cart');
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cartItems.length > 0 
    ? cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    : (savedReceipt?.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0) || 0);

  const shippingCost = subtotal > 65000 ? 0 : 5000;
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '').slice(0, 16);
      formattedValue = formattedValue.match(/.{1,4}/g)?.join(' ') || formattedValue;
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '').slice(0, 4);
      if (formattedValue.length >= 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
      }
    } else if (name === 'cvc') {
      formattedValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '').slice(0, 3);
    } else if (name === 'zip') {
      formattedValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '').slice(0, 5);
    } else if (name === 'phone') {
      formattedValue = value.replace(/[^0-9+ ]/gi, '').slice(0, 15);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre completo es obligatorio';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Introduce un correo electrónico válido';
    }
    if (!formData.address.trim()) newErrors.address = 'La dirección de entrega es obligatoria';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es obligatoria';
    if (!formData.zip.trim() || formData.zip.length < 5) {
      newErrors.zip = 'Código postal no válido (5 dígitos)';
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      newErrors.phone = 'Teléfono de contacto no válido';
    }
    
    const cleanCard = formData.cardNumber.replace(/\s/g, '');
    if (cleanCard.length < 16) {
      newErrors.cardNumber = 'Número de tarjeta no válido (16 dígitos)';
    }
    
    if (!formData.expiry.includes('/') || formData.expiry.length < 5) {
      newErrors.expiry = 'Expiración no válida (MM/AA)';
    } else {
      const [month] = formData.expiry.split('/');
      const m = parseInt(month, 10);
      if (m < 1 || m > 12) {
        newErrors.expiry = 'Mes no válido';
      }
    }
    
    if (formData.cvc.length < 3) {
      newErrors.cvc = 'CVC no válido (3 dígitos)';
    }
    
    if (!formData.cardholder.trim()) {
      newErrors.cardholder = 'Nombre del titular obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsPaying(true);

    // Save cart state for receipt print before clearing it
    setSavedReceipt({
      items: [...cartItems],
      total: total
    });

    // Simulate standard secure Stripe/gateway response
    setTimeout(() => {
      setIsPaying(false);
      const generatedId = `BD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setStep('success');
      onClearCart();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={isPaying ? undefined : onClose}
      />

      {/* Slide drawer container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-left">
        
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-voldog-gray-light shrink-0">
          <div className="flex items-center gap-2">
            {step === 'checkout' ? (
              <button
                onClick={() => setStep('cart')}
                disabled={isPaying}
                className="p-1.5 -ml-1 hover:bg-gray-200/60 rounded-full text-voldog-black transition-colors cursor-pointer disabled:opacity-50"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <ShoppingBag className="w-5 h-5 text-voldog-green-dark" />
            )}
            <h3 className="font-display font-bold text-base text-voldog-black uppercase tracking-wider">
              {step === 'cart' && 'Mi Pedido BONDOG'}
              {step === 'checkout' && 'Pago con Tarjeta'}
              {step === 'success' && '¡Pedido Recibido!'}
            </h3>
            {step === 'cart' && cartItems.length > 0 && (
              <span className="bg-voldog-green-dark text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            disabled={isPaying}
            className="p-2 hover:bg-gray-200/60 rounded-full text-voldog-black transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic step view layout */}
        {step === 'cart' && (
          <div className="flex-grow flex flex-col min-h-0">
            {/* List of items */}
            <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
                  <ShoppingBag className="w-16 h-16 text-voldog-green-dark/25 mb-4" />
                  <h4 className="font-display font-bold text-sm text-voldog-black uppercase tracking-wider mb-1">
                    Tu pedido está vacío
                  </h4>
                  <p className="text-xs text-voldog-gray-medium max-w-xs mb-6 font-normal">
                    Descubre nuestros menús y snacks elaborados con carnes y frutas frescas de primera calidad.
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
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0 flex items-center justify-center">
                      <div className={`w-full h-full flex items-center justify-center ${
                        item.product.image?.includes('googleusercontent.com') || item.product.image?.includes('drive.google.com')
                          ? 'scale-[1.6]'
                          : 'scale-[1.08]'
                      }`}>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain p-1 mix-blend-multiply"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Details context */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-display font-bold text-xs text-voldog-black line-clamp-2 leading-tight pr-2">
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

            {/* Footer actions */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 p-4 md:p-6 bg-voldog-gray-light space-y-4 shrink-0">
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs text-voldog-gray-medium">
                    <span>Subtotal pedido</span>
                    <span className="font-bold text-voldog-black">{formatARS(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-voldog-gray-medium">
                    <span>Envío refrigerado (Cadena de frío)</span>
                    {shippingCost === 0 ? (
                      <span className="font-bold text-amber-600 uppercase text-[10px] bg-amber-50 px-2 py-0.5 rounded">
                        ¡Gratis!
                      </span>
                    ) : (
                      <span className="font-bold text-voldog-black">{formatARS(shippingCost)}</span>
                    )}
                  </div>
                  
                  {shippingCost > 0 && (
                    <div className="text-[10px] text-voldog-green-dark font-medium bg-voldog-green-dark/10 p-2 rounded-lg text-center font-normal">
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
                  onClick={() => setStep('checkout')}
                  className="w-full py-3.5 px-4 bg-voldog-green-dark hover:bg-voldog-green-medium text-white font-display font-bold text-xs tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer hover:scale-[1.01]"
                >
                  <CreditCard className="w-4.5 h-4.5" />
                  Proceder al Pago
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[9px] text-voldog-gray-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-voldog-green-dark" />
                  <span>Pago 100% encriptado y seguro bajo protocolos SSL</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Checkout card details input flow */}
        {step === 'checkout' && (
          <form onSubmit={handlePaymentSubmit} className="flex-grow flex flex-col min-h-0">
            <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-5">
              
              {/* Premium Credit Card Display */}
              <div className="relative w-full h-44 rounded-2xl bg-gradient-to-br from-[#113E2E] via-[#1A5440] to-[#0A261D] p-5 text-white shadow-xl overflow-hidden font-mono shrink-0 select-none border border-emerald-800/20">
                {/* Decorative curves inside card */}
                <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/5 blur-xl pointer-events-none" />
                <div className="absolute -left-10 -top-10 w-44 h-44 rounded-full bg-amber-500/5 blur-xl pointer-events-none" />

                {/* Chip & Logo */}
                <div className="flex justify-between items-start mb-6">
                  {/* Microchip */}
                  <div className="w-10 h-7 rounded-md bg-gradient-to-r from-amber-200 to-amber-400 relative overflow-hidden flex flex-wrap p-1 gap-1">
                    <div className="w-2.5 h-1.5 border border-amber-600/30 rounded-xs" />
                    <div className="w-2.5 h-1.5 border border-amber-600/30 rounded-xs" />
                    <div className="w-2.5 h-1.5 border border-amber-600/30 rounded-xs" />
                    <div className="w-2.5 h-1.5 border border-amber-600/30 rounded-xs" />
                  </div>
                  {/* Brand */}
                  <div className="text-right flex flex-col items-end leading-none">
                    <span className="font-display font-extrabold text-sm tracking-widest text-amber-300">BONDOG</span>
                    <span className="text-[7px] tracking-wider text-white/50 uppercase font-sans mt-0.5 font-bold">Secure Pay</span>
                  </div>
                </div>

                {/* Card Number */}
                <div className="text-lg tracking-widest mb-4 font-bold text-white/95 drop-shadow-xs">
                  {formData.cardNumber || '•••• •••• •••• ••••'}
                </div>

                {/* Cardholder & Expiry */}
                <div className="flex justify-between items-end text-xs">
                  <div className="min-w-0 pr-4">
                    <div className="text-[7px] text-white/45 uppercase tracking-wider mb-0.5 font-sans font-bold">Titular</div>
                    <div className="font-medium tracking-wide uppercase truncate max-w-[170px] text-[11px]">
                      {formData.cardholder || 'Nombre del Titular'}
                    </div>
                  </div>
                  <div className="shrink-0 flex gap-4">
                    <div>
                      <div className="text-[7px] text-white/45 uppercase tracking-wider mb-0.5 font-sans font-bold text-center">Expira</div>
                      <div className="font-medium tracking-wider text-[11px] text-center">
                        {formData.expiry || 'MM/AA'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[7px] text-white/45 uppercase tracking-wider mb-0.5 font-sans font-bold text-center">CVC</div>
                      <div className="font-medium tracking-wider text-[11px] text-center">
                        {formData.cvc || '•••'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping & Billing Form */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-xs text-voldog-black uppercase tracking-wider border-b border-gray-100 pb-1.5">
                  1. Información de Envío
                </h4>
                
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-voldog-gray-medium tracking-wider mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-voldog-green-dark" />
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej. Valentina Gómez"
                    className="w-full text-xs bg-gray-50 border border-gray-200 focus:border-voldog-green-dark focus:bg-white rounded-xl px-3 py-2.5 outline-none transition-all text-voldog-black font-medium"
                    disabled={isPaying}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-voldog-gray-medium tracking-wider mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-voldog-green-dark" />
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ej. tu@correo.com"
                    className="w-full text-xs bg-gray-50 border border-gray-200 focus:border-voldog-green-dark focus:bg-white rounded-xl px-3 py-2.5 outline-none transition-all text-voldog-black font-medium"
                    disabled={isPaying}
                  />
                  {errors.email && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.email}</p>}
                </div>

                {/* Contact phone */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-voldog-gray-medium tracking-wider mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-voldog-green-dark" />
                    Teléfono Móvil (Para el transportista)
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ej. +34 600 000 000"
                    className="w-full text-xs bg-gray-50 border border-gray-200 focus:border-voldog-green-dark focus:bg-white rounded-xl px-3 py-2.5 outline-none transition-all text-voldog-black font-medium"
                    disabled={isPaying}
                  />
                  {errors.phone && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.phone}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-voldog-gray-medium tracking-wider mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-voldog-green-dark" />
                    Dirección de Entrega
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Calle, número, piso y puerta"
                    className="w-full text-xs bg-gray-50 border border-gray-200 focus:border-voldog-green-dark focus:bg-white rounded-xl px-3 py-2.5 outline-none transition-all text-voldog-black font-medium"
                    disabled={isPaying}
                  />
                  {errors.address && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.address}</p>}
                </div>

                {/* City and Zip */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-voldog-gray-medium tracking-wider mb-1">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Madrid"
                      className="w-full text-xs bg-gray-50 border border-gray-200 focus:border-voldog-green-dark focus:bg-white rounded-xl px-3 py-2.5 outline-none transition-all text-voldog-black font-medium"
                      disabled={isPaying}
                    />
                    {errors.city && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-voldog-gray-medium tracking-wider mb-1">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="28001"
                      className="w-full text-xs bg-gray-50 border border-gray-200 focus:border-voldog-green-dark focus:bg-white rounded-xl px-3 py-2.5 outline-none transition-all text-voldog-black font-medium"
                      disabled={isPaying}
                    />
                    {errors.zip && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.zip}</p>}
                  </div>
                </div>

                <h4 className="font-display font-bold text-xs text-voldog-black uppercase tracking-wider border-b border-gray-100 pb-1.5 pt-3">
                  2. Datos de Facturación
                </h4>

                {/* Card Number Input */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-voldog-gray-medium tracking-wider mb-1">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="4000 1234 5678 9010"
                    className="w-full text-xs bg-gray-50 border border-gray-200 focus:border-voldog-green-dark focus:bg-white rounded-xl px-3 py-2.5 outline-none transition-all text-voldog-black font-mono font-bold"
                    disabled={isPaying}
                  />
                  {errors.cardNumber && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.cardNumber}</p>}
                </div>

                {/* Cardholder Input */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-voldog-gray-medium tracking-wider mb-1">
                    Nombre del Titular de la Tarjeta
                  </label>
                  <input
                    type="text"
                    name="cardholder"
                    value={formData.cardholder}
                    onChange={handleInputChange}
                    placeholder="VALENTINA GOMEZ"
                    className="w-full text-xs bg-gray-50 border border-gray-200 focus:border-voldog-green-dark focus:bg-white rounded-xl px-3 py-2.5 outline-none transition-all text-voldog-black font-medium uppercase"
                    disabled={isPaying}
                  />
                  {errors.cardholder && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.cardholder}</p>}
                </div>

                {/* Expiry and CVC Input */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-voldog-gray-medium tracking-wider mb-1">
                      Expiración
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/AA"
                      className="w-full text-xs bg-gray-50 border border-gray-200 focus:border-voldog-green-dark focus:bg-white rounded-xl px-3 py-2.5 outline-none transition-all text-voldog-black font-mono font-bold"
                      disabled={isPaying}
                    />
                    {errors.expiry && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-voldog-gray-medium tracking-wider mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="password"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleInputChange}
                      placeholder="•••"
                      className="w-full text-xs bg-gray-50 border border-gray-200 focus:border-voldog-green-dark focus:bg-white rounded-xl px-3 py-2.5 outline-none transition-all text-voldog-black font-mono font-bold text-center"
                      disabled={isPaying}
                    />
                    {errors.cvc && <p className="text-[10px] text-red-500 font-medium mt-1">{errors.cvc}</p>}
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom pay button panel */}
            <div className="border-t border-gray-100 p-4 md:p-6 bg-voldog-gray-light shrink-0 space-y-3">
              <div className="flex justify-between items-center text-xs text-voldog-gray-medium">
                <span>Total a cargar en tarjeta:</span>
                <span className="text-base font-black text-voldog-green-dark">{formatARS(total)}</span>
              </div>
              
              <button
                type="submit"
                disabled={isPaying}
                className="w-full py-3.5 px-4 bg-voldog-green-dark hover:bg-voldog-green-medium text-white font-display font-bold text-xs tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer hover:scale-[1.01] disabled:opacity-85 disabled:cursor-not-allowed"
              >
                {isPaying ? (
                  <>
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    Procesando Pago Seguro...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4.5 h-4.5" />
                    Pagar {formatARS(total)}
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Dynamic Success Step view */}
        {step === 'success' && (
          <div className="flex-grow flex flex-col min-h-0 overflow-y-auto p-6 text-center justify-between">
            <div className="space-y-6 my-auto py-4">
              {/* Success Indicator Badge */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-voldog-green-dark animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              {/* Congratulatory copy */}
              <div>
                <h4 className="font-display font-black text-lg text-voldog-black uppercase tracking-wider mb-2">
                  ¡Pago Procesado con Éxito!
                </h4>
                <p className="text-xs text-voldog-gray-medium leading-relaxed max-w-sm mx-auto font-normal">
                  Hemos confirmado el cobro en tu tarjeta de forma segura. Tu pedido ya está en camino a nuestra cocina y se enviará congelado para mantener su frescura intacta.
                </p>
              </div>

              {/* Invoice receipt breakdown */}
              <div className="bg-voldog-gray-light rounded-[24px] p-4 text-left border border-gray-200/50 space-y-3 font-sans">
                <div className="flex justify-between text-[11px] font-bold text-voldog-gray-medium uppercase tracking-wider border-b border-gray-200/50 pb-2">
                  <span>Pedido: #{orderId}</span>
                  <span className="text-voldog-green-dark">Pagado</span>
                </div>

                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {savedReceipt?.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center text-xs">
                      <span className="text-voldog-black font-semibold truncate max-w-[200px]">
                        {item.product.name} <span className="text-voldog-gray-medium font-normal">x{item.quantity}</span>
                      </span>
                      <span className="font-bold text-voldog-black text-right shrink-0">
                        {formatARS(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200/50 pt-2.5 space-y-1 text-xs">
                  <div className="flex justify-between text-voldog-gray-medium text-[11px]">
                    <span>Envío refrigerado (Cadena de frío)</span>
                    <span>{shippingCost === 0 ? '¡Gratis!' : formatARS(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between font-black text-voldog-black text-sm pt-1">
                    <span>Total Abonado</span>
                    <span className="text-voldog-green-dark">{formatARS(savedReceipt?.total || 0)}</span>
                  </div>
                </div>
              </div>

              {/* Refrigerated delivery & tracking expectations */}
              <div className="text-[10px] text-voldog-gray-medium leading-relaxed bg-amber-500/5 p-3.5 rounded-2xl border border-amber-500/10 text-left space-y-1 font-normal">
                <p className="text-voldog-black font-bold uppercase tracking-wider text-[9px] text-amber-700">🚚 Información de Entrega Refrigerada:</p>
                <p>Tu pedido se entregará en un plazo de <span className="font-bold">24 a 48 horas laborables</span> mediante <span className="font-bold">transporte refrigerado especial (a temperatura controlada de 2°C a 8°C)</span> para garantizar que la cadena de frío no se rompa en ningún momento.</p>
                <p>Enviamos un código de seguimiento a tu correo <span className="font-bold">{formData.email}</span> tan pronto como el camión salga.</p>
              </div>
            </div>

            {/* Done CTA */}
            <button
              onClick={onClose}
              className="w-full py-3.5 px-4 bg-voldog-green-dark hover:bg-voldog-green-medium text-white font-display font-bold text-xs tracking-widest uppercase rounded-full transition-all shadow-md cursor-pointer mt-4"
            >
              Seguir Explorando
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
