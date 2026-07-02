import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Truck, Calendar, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { CartItem, formatARS } from '../types';
import Footer from '../components/Footer';

export default function Success() {
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState<any>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('voldog_last_order');
    if (saved) {
      setOrderInfo(JSON.parse(saved));
    } else {
      // If no order data, redirect home
      navigate('/');
    }
  }, [navigate]);

  if (!orderInfo) return null;

  return (
    <div className="min-h-screen bg-white font-sans text-voldog-black flex flex-col justify-between">
      <div>
        {/* Header (Minimal & Airy, identical to checkout) */}
        <header className="bg-white border-b border-gray-100 py-6 px-6 md:px-12 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left: Brand Logo */}
            <button 
              onClick={() => {
                sessionStorage.removeItem('voldog_last_order');
                navigate('/');
              }} 
              className="font-display font-black text-xl md:text-2xl tracking-[0.2em] text-[#EA580C] hover:text-[#113E2E] transition-colors uppercase leading-none pl-[0.2em] cursor-pointer"
            >
              BONDOG
            </button>
            
            {/* Center: Elegant static navigation links */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => {
                  sessionStorage.removeItem('voldog_last_order');
                  navigate('/');
                }} 
                className="font-display font-bold text-[11px] tracking-[0.18em] text-[#113E2E] hover:text-[#EA580C] uppercase transition-colors cursor-pointer"
              >
                PRODUCTOS
              </button>
              <button 
                onClick={() => {
                  sessionStorage.removeItem('voldog_last_order');
                  navigate('/');
                }} 
                className="font-display font-bold text-[11px] tracking-[0.18em] text-[#113E2E] hover:text-[#EA580C] uppercase transition-colors cursor-pointer"
              >
                BENEFICIOS
              </button>
              <button 
                onClick={() => {
                  sessionStorage.removeItem('voldog_last_order');
                  navigate('/');
                }} 
                className="font-display font-bold text-[11px] tracking-[0.18em] text-[#113E2E] hover:text-[#EA580C] uppercase transition-colors cursor-pointer"
              >
                CONTACTO
              </button>
            </div>

            {/* Right: Back to store link */}
            <div>
              <button 
                onClick={() => {
                  sessionStorage.removeItem('voldog_last_order');
                  navigate('/');
                }}
                className="font-display font-bold text-[10px] tracking-widest uppercase border border-[#113E2E] hover:bg-[#113E2E] hover:text-white px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                TIENDA
              </button>
            </div>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          {/* Big, Bold Page Title */}
          <div className="border-b border-gray-100 pb-10 mb-16 text-center md:text-left">
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-7xl uppercase tracking-tighter text-[#113E2E] break-words">
              COMPRA CONFIRMADA
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Success Confirmation details & graphics */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-16">
              
              {/* Success Badge & Message */}
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8">
                <div className="shrink-0 w-20 h-20 bg-[#113E2E] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#113E2E]/10 animate-scale-up">
                  <Check className="w-10 h-10 stroke-[2.5]" />
                </div>
                <div className="space-y-4 flex flex-col items-center md:items-start">
                  <h2 className="font-display font-black text-2xl uppercase tracking-wide text-voldog-black">
                    ¡Gracias por tu compra!
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    En unos minutos te enviaremos un email con la confirmación detallada y el recibo de compra.
                  </p>
                </div>
              </div>

              {/* Order Info & Delivery estimates */}
              <div className="pt-10 border-t border-gray-100 space-y-12">
                <div className="text-center md:text-left">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-8">
                    Detalles del Pedido
                  </h3>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Order ID */}
                    <div className="flex flex-col border-b border-gray-100 pb-4 text-center md:text-left items-center md:items-start">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Código de Pedido
                      </span>
                      <span className="font-mono font-bold text-base text-voldog-black">
                        {orderInfo.id}
                      </span>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col border-b border-gray-100 pb-4 text-center md:text-left items-center md:items-start w-full">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Enviado a
                      </span>
                      <span className="font-medium text-sm text-voldog-black truncate w-full">
                        {orderInfo.email}
                      </span>
                    </div>

                    {/* Shipping Method */}
                    <div className="flex flex-col border-b border-gray-100 pb-4 text-center md:text-left items-center md:items-start">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Método de Entrega
                      </span>
                      <span className="font-bold text-sm text-voldog-black uppercase tracking-wide flex items-center justify-center md:justify-start gap-2">
                        <Truck className="w-4 h-4 text-[#113E2E]" />
                        {orderInfo.shippingMethod === 'pickup' ? 'Retiro en Tienda' : 'Envío Refrigerado (cadena de frío)'}
                      </span>
                    </div>

                    {/* Preparation Status */}
                    <div className="flex flex-col border-b border-gray-100 pb-4 text-center md:text-left items-center md:items-start">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Tiempo de Entrega Estimado
                      </span>
                      <span className="font-medium text-sm text-[#113E2E] flex items-center justify-center md:justify-start gap-2">
                        <Calendar className="w-4 h-4" />
                        {orderInfo.shippingMethod === 'pickup' ? 'Disponible hoy mismo' : 'En camino (24 a 48 horas)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Friendly tips */}
                <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-gray-100 max-w-2xl mx-auto md:mx-0 text-center md:text-left flex flex-col items-center md:items-start">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-voldog-black">Un tip importante:</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      Recordá que nuestros menús son 100% naturales y frescos, por lo que una vez que llegue el pedido a tu casa, debés guardarlos en la heladera o freezer para mantener intacta la cadena de frío y todas sus propiedades nutritivas.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary container identical to checkout */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 space-y-8 bg-[#FAFAFA] p-8 md:p-10 rounded-3xl border border-gray-100">
              <h2 className="font-display font-bold text-base uppercase tracking-wider text-voldog-black pb-4 border-b border-gray-100 text-center lg:text-left">
                Resumen de Compra ({orderInfo.items.reduce((acc: number, item: CartItem) => acc + item.quantity, 0)})
              </h2>

              {/* Product list */}
              <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-6 scrollbar-thin">
                {orderInfo.items.map((item: CartItem) => (
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

              {/* Totals */}
              <div className="space-y-4 text-xs pt-4 border-t border-gray-100">
                <div className="flex justify-between text-gray-400 uppercase tracking-wider">
                  <span>Subtotal</span>
                  <span className="font-bold text-voldog-black">{formatARS(orderInfo.items.reduce((acc: number, item: CartItem) => acc + item.product.price * item.quantity, 0))}</span>
                </div>
                <div className="flex justify-between text-gray-400 uppercase tracking-wider">
                  <span>Envío</span>
                  {orderInfo.shippingCost === 0 ? (
                    <span className="font-bold text-[#113E2E]">¡Gratis!</span>
                  ) : (
                    <span className="font-bold text-voldog-black">{formatARS(orderInfo.shippingCost)}</span>
                  )}
                </div>
              </div>

              {/* Grand Total */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-display font-bold text-sm uppercase tracking-wider text-voldog-black">Total Pagado:</span>
                  <span className="font-display font-black text-2xl text-voldog-black">{formatARS(orderInfo.total)}</span>
                </div>
              </div>

              {/* Return to Shop Button */}
              <div className="pt-4">
                <button
                  onClick={() => {
                    sessionStorage.removeItem('voldog_last_order');
                    window.scrollTo(0, 0);
                    navigate('/');
                  }}
                  className="w-full bg-[#111111] hover:bg-[#EA580C] text-white py-4.5 rounded-full font-display font-bold text-xs tracking-widest uppercase transition-all shadow-md cursor-pointer hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  VOLVER A LA TIENDA
                </button>
              </div>

            </div>

          </div>
        </main>
      </div>

      {/* Footer component (fully integrated) */}
      <Footer onScrollTo={(id) => navigate('/')} />
    </div>
  );
}
