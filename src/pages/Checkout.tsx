import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, CreditCard, Loader2, ShieldCheck, ShoppingCart, Truck, Store, Landmark, HelpCircle } from 'lucide-react';
import { CartItem, formatARS } from '../types';
import Footer from '../components/Footer';

interface CheckoutProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function Checkout({ cart, onClearCart }: CheckoutProps) {
  const navigate = useNavigate();
  const [isPaying, setIsPaying] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'pickup'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');
  const [differentBilling, setDifferentBilling] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    notes: '',
    billingName: '',
    billingAddress: '',
    billingCity: '',
    billingZip: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardholder: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal > 65000;
  const standardShippingCost = isFreeShipping ? 0 : 5000;
  const shippingCost = shippingMethod === 'pickup' ? 0 : standardShippingCost;
  const total = subtotal + shippingCost;

  if (cart.length === 0 && !isPaying) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <ShoppingCart className="w-16 h-16 text-voldog-gray-medium mb-4 opacity-50" />
        <h2 className="text-2xl font-display font-bold text-voldog-black mb-2">Tu carrito está vacío</h2>
        <p className="text-voldog-gray-medium mb-6">Agrega algunos productos antes de proceder al pago.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-voldog-green-dark text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-voldog-green-medium transition-colors cursor-pointer"
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    if (discountCode.toLowerCase() === 'prueba') {
      return true;
    }

    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Requerido';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.phone.trim()) newErrors.phone = 'Requerido';
    if (!formData.address.trim()) newErrors.address = 'Requerido';
    if (!formData.city.trim()) newErrors.city = 'Requerido';
    if (!formData.zip.trim()) newErrors.zip = 'Requerido';

    if (differentBilling) {
      if (!formData.billingName.trim()) newErrors.billingName = 'Requerido';
      if (!formData.billingAddress.trim()) newErrors.billingAddress = 'Requerido';
      if (!formData.billingCity.trim()) newErrors.billingCity = 'Requerido';
      if (!formData.billingZip.trim()) newErrors.billingZip = 'Requerido';
    }

    if (paymentMethod === 'card') {
      const cleanCard = formData.cardNumber.replace(/\s/g, '');
      if (cleanCard.length < 16) newErrors.cardNumber = 'Tarjeta inválida';
      if (!formData.expiry.includes('/') || formData.expiry.length < 5) newErrors.expiry = 'MM/AA';
      if (formData.cvc.length < 3) newErrors.cvc = 'CVC inválido';
      if (!formData.cardholder.trim()) newErrors.cardholder = 'Requerido';
    }

    if (!acceptedTerms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const errorElement = document.getElementById(`field-${firstErrorKey}`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsPaying(true);

    const orderData = {
      id: `BD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cart,
      total,
      shippingCost,
      shippingMethod,
      email: formData.email
    };
    sessionStorage.setItem('voldog_last_order', JSON.stringify(orderData));

    setTimeout(() => {
      setIsPaying(false);
      onClearCart();
      navigate('/success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-voldog-black flex flex-col justify-between">
      <div>
        {/* Header (Minimal & Airy, inspired by high fashion checkouts) */}
        <header className="bg-white border-b border-gray-100 py-6 px-6 md:px-12 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left: Brand Logo */}
            <button 
              onClick={() => navigate('/')} 
              className="font-display font-black text-xl md:text-2xl tracking-[0.2em] text-[#EA580C] hover:text-[#113E2E] transition-colors uppercase leading-none pl-[0.2em] cursor-pointer"
            >
              BONDOG
            </button>
            
            {/* Center: Elegant static navigation links */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => navigate('/')} 
                className="font-display font-bold text-[11px] tracking-[0.18em] text-[#113E2E] hover:text-[#EA580C] uppercase transition-colors cursor-pointer"
              >
                PRODUCTOS
              </button>
              <button 
                onClick={() => navigate('/')} 
                className="font-display font-bold text-[11px] tracking-[0.18em] text-[#113E2E] hover:text-[#EA580C] uppercase transition-colors cursor-pointer"
              >
                BENEFICIOS
              </button>
              <button 
                onClick={() => navigate('/')} 
                className="font-display font-bold text-[11px] tracking-[0.18em] text-[#113E2E] hover:text-[#EA580C] uppercase transition-colors cursor-pointer"
              >
                CONTACTO
              </button>
            </div>

            {/* Right: Back to store link */}
            <div>
              <button 
                onClick={() => navigate('/')}
                className="font-display font-bold text-[10px] tracking-widest uppercase border border-[#113E2E] hover:bg-[#113E2E] hover:text-white px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                VOLVER
              </button>
            </div>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          {/* Big, Bold Page Title */}
          <div className="border-b border-gray-100 pb-10 mb-16 text-center md:text-left">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-7xl uppercase tracking-tighter text-voldog-black break-words">
              CHECKOUT
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Form Sections (Contact, Shipping, Delivery, Payment) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-20">
              
              {/* Section 1: Contact & Shipping */}
              <section className="space-y-12">
                <div className="text-center md:text-left">
                  <h2 className="font-display font-black text-xl md:text-2xl uppercase tracking-wider text-voldog-black mb-2">
                    Información
                  </h2>
                  <p className="text-xs text-gray-400">Datos personales y dirección de destino</p>
                </div>

                <div className="space-y-10">
                  {/* Personal Information */}
                  <div className="text-center md:text-left">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-6">
                      Datos Personales
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div id="field-name" className="flex flex-col">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all rounded-none"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div id="field-email" className="flex flex-col">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all rounded-none"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="pt-4 text-center md:text-left">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-6">
                      Información de Envío
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div id="field-phone" className="flex flex-col">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all rounded-none"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>

                      <div id="field-address" className="flex flex-col">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Dirección *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all rounded-none"
                        />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                      </div>

                      <div id="field-city" className="flex flex-col">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Ciudad *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all rounded-none"
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                      </div>

                      <div id="field-zip" className="flex flex-col">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Código Postal *
                        </label>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all rounded-none"
                        />
                        {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                      </div>
                    </div>

                    {/* Different Billing Checkbox */}
                    <div className="pt-6">
                      <label className="flex items-center gap-3 cursor-pointer group w-fit">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 accent-voldog-green-dark cursor-pointer rounded" 
                          checked={differentBilling}
                          onChange={() => setDifferentBilling(!differentBilling)}
                        />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 select-none">Enviar a una dirección de facturación diferente</span>
                      </label>
                    </div>

                    {/* Billing Details (Conditionally rendered) */}
                    {differentBilling && (
                      <div className="mt-8 pt-6 border-t border-gray-100 space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">Datos de Facturación</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div id="field-billingName" className="flex flex-col">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Nombre/Razón Social *</label>
                            <input
                              type="text"
                              name="billingName"
                              value={formData.billingName}
                              onChange={handleInputChange}
                              className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all rounded-none"
                            />
                            {errors.billingName && <p className="text-red-500 text-xs mt-1">{errors.billingName}</p>}
                          </div>
                          <div id="field-billingAddress" className="flex flex-col">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Dirección *</label>
                            <input
                              type="text"
                              name="billingAddress"
                              value={formData.billingAddress}
                              onChange={handleInputChange}
                              className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all rounded-none"
                            />
                            {errors.billingAddress && <p className="text-red-500 text-xs mt-1">{errors.billingAddress}</p>}
                          </div>
                          <div id="field-billingCity" className="flex flex-col">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Ciudad *</label>
                            <input
                              type="text"
                              name="billingCity"
                              value={formData.billingCity}
                              onChange={handleInputChange}
                              className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all rounded-none"
                            />
                            {errors.billingCity && <p className="text-red-500 text-xs mt-1">{errors.billingCity}</p>}
                          </div>
                          <div id="field-billingZip" className="flex flex-col">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Código Postal *</label>
                            <input
                              type="text"
                              name="billingZip"
                              value={formData.billingZip}
                              onChange={handleInputChange}
                              className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all rounded-none"
                            />
                            {errors.billingZip && <p className="text-red-500 text-xs mt-1">{errors.billingZip}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    <div className="pt-8">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Notas del Pedido (Opcional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Ej. Dejar el paquete en conserjería..."
                        rows={2}
                        className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all resize-none rounded-none"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Delivery (Envío) */}
              <section className="space-y-8 pt-6 border-t border-gray-100">
                <div className="text-center md:text-left">
                  <h2 className="font-display font-black text-xl md:text-2xl uppercase tracking-wider text-voldog-black mb-2">
                    Envío
                  </h2>
                  <p className="text-xs text-gray-400">Selecciona el método de entrega de tu preferencia</p>
                </div>

                <div className="border-t border-b border-gray-100 py-4 space-y-6">
                  {/* Standard Shipping option */}
                  <label className="flex items-start justify-between cursor-pointer py-2">
                    <div className="flex gap-4">
                      <input 
                        type="radio" 
                        name="shippingMethod" 
                        value="standard" 
                        checked={shippingMethod === 'standard'} 
                        onChange={() => setShippingMethod('standard')}
                        className="w-4 h-4 accent-voldog-green-dark mt-1 cursor-pointer" 
                      />
                      <div>
                        <span className="block text-sm font-bold uppercase tracking-wider text-voldog-black">
                          Envío Estándar (Cadena de frío)
                        </span>
                        <span className="block text-xs text-gray-400 mt-1">
                          Entrega en 24-48h laborables en vehículo refrigerado.
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-voldog-black whitespace-nowrap">
                      {isFreeShipping ? <span className="text-voldog-green-dark">Gratis</span> : formatARS(standardShippingCost)}
                    </span>
                  </label>

                  {/* Pickup option */}
                  <label className="flex items-start justify-between cursor-pointer py-2">
                    <div className="flex gap-4">
                      <input 
                        type="radio" 
                        name="shippingMethod" 
                        value="pickup" 
                        checked={shippingMethod === 'pickup'} 
                        onChange={() => setShippingMethod('pickup')}
                        className="w-4 h-4 accent-voldog-green-dark mt-1 cursor-pointer" 
                      />
                      <div>
                        <span className="block text-sm font-bold uppercase tracking-wider text-voldog-black">
                          Retiro en Tienda
                        </span>
                        <span className="block text-xs text-gray-400 mt-1">
                          Disponible el mismo día en Madrid Central.
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-voldog-green-dark whitespace-nowrap">Gratis</span>
                  </label>
                </div>
              </section>

              {/* Section 3: Payment (Pago) */}
              <section className="space-y-8 pt-6 border-t border-gray-100">
                <div className="text-center md:text-left">
                  <h2 className="font-display font-black text-xl md:text-2xl uppercase tracking-wider text-voldog-black mb-2">
                    Pago
                  </h2>
                  <p className="text-xs text-gray-400">Elige tu método de pago preferido</p>
                </div>

                <div className="space-y-6">
                  {/* Card Option */}
                  <div className="border-b border-gray-100 pb-6">
                    <label className="flex items-center gap-4 cursor-pointer py-2 mb-4">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="card" 
                        checked={paymentMethod === 'card'} 
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 accent-voldog-green-dark cursor-pointer" 
                      />
                      <span className="text-sm font-bold uppercase tracking-wider text-voldog-black">Tarjeta de Crédito o Débito</span>
                    </label>

                    {paymentMethod === 'card' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 pl-8">
                        <div id="field-cardNumber" className="flex flex-col">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Número de Tarjeta *</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="4000 1234 5678 9010"
                            className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all rounded-none"
                          />
                          {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                        </div>

                        <div id="field-cardholder" className="flex flex-col">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Titular de la Tarjeta *</label>
                          <input
                            type="text"
                            name="cardholder"
                            value={formData.cardholder}
                            onChange={handleInputChange}
                            placeholder="Ej. Valentina Gómez"
                            className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all uppercase rounded-none"
                          />
                          {errors.cardholder && <p className="text-red-500 text-xs mt-1">{errors.cardholder}</p>}
                        </div>

                        <div id="field-expiry" className="flex flex-col">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Vencimiento *</label>
                          <input
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/AA"
                            className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all rounded-none"
                          />
                          {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                        </div>

                        <div id="field-cvc" className="flex flex-col">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">CVC *</label>
                          <input
                            type="password"
                            name="cvc"
                            value={formData.cvc}
                            onChange={handleInputChange}
                            placeholder="•••"
                            className="w-full bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-sm font-medium transition-all rounded-none"
                          />
                          {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Transfer Option */}
                  <div>
                    <label className="flex items-center gap-4 cursor-pointer py-2">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="transfer" 
                        checked={paymentMethod === 'transfer'} 
                        onChange={() => setPaymentMethod('transfer')}
                        className="w-4 h-4 accent-voldog-green-dark cursor-pointer" 
                      />
                      <span className="text-sm font-bold uppercase tracking-wider text-voldog-black">Transferencia Bancaria Directa</span>
                    </label>

                    {paymentMethod === 'transfer' && (
                      <div className="mt-4 pl-8 text-xs text-gray-400 leading-relaxed max-w-md">
                        Realiza tu pago directamente en nuestra cuenta bancaria. Por favor, usa el número del pedido como referencia de pago. Tu pedido no se procesará hasta que se haya recibido el importe en nuestra cuenta.
                      </div>
                    )}
                  </div>
                </div>
              </section>

            </div>

            {/* Right Column: Order Summary (Shopping Bag (X) style) */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 space-y-8 bg-[#FAFAFA] p-8 md:p-10 rounded-3xl border border-gray-100">
              <h2 className="font-display font-bold text-base uppercase tracking-wider text-voldog-black pb-4 border-b border-gray-100 text-center lg:text-left">
                Resumen de Compra ({cart.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>

              {/* Product list */}
              <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-6 scrollbar-thin">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 pb-4 border-b border-gray-100/65 last:border-0 last:pb-0">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center relative bg-transparent overflow-visible">
                      <div className="w-full h-full flex items-center justify-center scale-[1.3] mix-blend-multiply">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain p-1 contrast-[1.04] brightness-[1.02]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-display font-bold text-xs tracking-wide text-voldog-black uppercase leading-tight line-clamp-2">
                            {item.product.name}
                          </h4>
                          <span className="font-bold text-xs text-voldog-black whitespace-nowrap pl-2">
                            {formatARS(item.product.price * item.quantity)}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">Peso: {item.product.weight}</p>
                        <p className="text-[10px] text-gray-400">Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code section */}
              <div className="flex gap-4 py-6 border-b border-gray-100">
                <input 
                  type="text" 
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="CÓDIGO PROMO" 
                  className="flex-grow bg-transparent border-b border-gray-200 focus:border-[#113E2E] py-2 outline-none text-xs tracking-widest uppercase transition-all rounded-none"
                />
                <button 
                  type="button" 
                  className="bg-[#111111] hover:bg-[#EA580C] text-white px-6 py-2 rounded-full text-xs font-display font-bold tracking-widest uppercase transition-all shrink-0 cursor-pointer"
                >
                  APLICAR
                </button>
              </div>

              {/* Totals */}
              <div className="space-y-4 text-xs">
                <div className="flex justify-between text-gray-400 uppercase tracking-wider">
                  <span>Subtotal</span>
                  <span className="font-bold text-voldog-black">{formatARS(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-400 uppercase tracking-wider">
                  <span>Envío</span>
                  {shippingCost === 0 ? (
                    <span className="font-bold text-voldog-green-dark">¡Gratis!</span>
                  ) : (
                    <span className="font-bold text-voldog-black">{formatARS(shippingCost)}</span>
                  )}
                </div>
              </div>

              {/* Grand Total */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-display font-bold text-sm uppercase tracking-wider text-voldog-black">Total:</span>
                  <span className="font-display font-black text-2xl text-voldog-black">{formatARS(total)}</span>
                </div>
              </div>

              {/* Terms and Pay Button */}
              <div className="pt-6 border-t border-gray-100 space-y-5">
                {/* Terms checkbox */}
                <label className="flex items-start gap-3 cursor-pointer" id="field-terms">
                  <input 
                    type="checkbox" 
                    className="w-4.5 h-4.5 accent-voldog-green-dark cursor-pointer mt-0.5 rounded" 
                    checked={acceptedTerms}
                    onChange={(e) => {
                      setAcceptedTerms(e.target.checked);
                      if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }));
                    }}
                  />
                  <span className="text-[11px] text-gray-500 leading-normal select-none">
                    He leído y acepto los <a href="#" className="text-[#EA580C] font-bold hover:underline">términos y condiciones</a> de la web y el aviso de privacidad. *
                    {errors.terms && <p className="text-red-500 font-medium mt-1">{errors.terms}</p>}
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPaying || (!acceptedTerms && discountCode.toLowerCase() !== 'prueba')}
                  className="w-full bg-[#111111] hover:bg-[#EA580C] text-white py-4.5 rounded-full font-display font-bold text-xs tracking-widest uppercase transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:scale-[1.01]"
                >
                  {isPaying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      PROCESANDO...
                    </>
                  ) : (
                    "PAGAR"
                  )}
                </button>
              </div>

            </div>

          </form>
        </main>
      </div>

      {/* Footer component (fully integrated & respects page redirects for anchor tags) */}
      <Footer onScrollTo={(id) => navigate('/')} />
    </div>
  );
}
