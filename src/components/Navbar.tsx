import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartItemsCount: number;
  onOpenCart: () => void;
  onScrollTo: (elementId: string) => void;
}

export default function Navbar({ cartItemsCount, onOpenCart, onScrollTo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY > 220) {
        setShowLogo(true);
      } else {
        setShowLogo(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onScrollTo(id);
  };

  return (
    <>
      <nav
        className={`fixed top-5 left-4 right-4 z-50 transition-all duration-500 ease-in-out transform w-auto mx-auto max-w-7xl rounded-full ${
          isScrolled
            ? 'translate-y-0 opacity-100 bg-white/80 backdrop-blur-lg border border-gray-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.02)] py-2.5 px-5 md:px-7'
            : '-translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full flex items-center justify-between">
          
          {/* LEFT SIDE: Navigation Links (Desktop) & Menu Toggle (Mobile) */}
          <div className="flex-1 flex items-center justify-start gap-6">
            {/* Desktop Left Links */}
            <div className="hidden lg:flex items-center gap-6 lg:gap-8">
              <button
                onClick={() => handleLinkClick('productos')}
                className="relative font-display font-bold text-[11px] tracking-[0.18em] text-[#113E2E] hover:text-[#EA580C] uppercase transition-colors duration-200 cursor-pointer group py-1"
              >
                PRODUCTOS
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EA580C] transition-all duration-300 group-hover:w-full" />
              </button>
              <button
                onClick={() => handleLinkClick('beneficios')}
                className="relative font-display font-bold text-[11px] tracking-[0.18em] text-[#113E2E] hover:text-[#EA580C] uppercase transition-colors duration-200 cursor-pointer group py-1"
              >
                BENEFICIOS
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EA580C] transition-all duration-300 group-hover:w-full" />
              </button>
            </div>
            
            {/* Mobile/Tablet Toggle on Left to balance the Cart on Right */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#113E2E] hover:text-[#EA580C] hover:bg-gray-100/50 rounded-full transition-all cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* CENTER: Text-only Logo (Only Word "BONDOG") */}
          <div className="flex-none flex items-center justify-center min-w-[120px] md:min-w-[140px] h-8 relative overflow-hidden">
            <AnimatePresence>
              {showLogo && (
                <motion.button
                  key="navbar-logo"
                  onClick={() => handleLinkClick('hero')}
                  initial={{ y: 35, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 35, opacity: 0, scale: 0.8 }}
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 20,
                    mass: 0.75
                  }}
                  className="font-display font-black text-xl md:text-2xl tracking-[0.2em] text-[#EA580C] hover:text-[#113E2E] transition-colors duration-300 cursor-pointer uppercase select-none leading-none pl-[0.2em] absolute"
                >
                  BONDOG
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: Contact Link (Desktop), Cart Trigger (Both), Buy Button (Desktop) */}
          <div className="flex-1 flex items-center justify-end gap-3 md:gap-5">
            {/* Contact link (Desktop) */}
            <button
              onClick={() => handleLinkClick('contacto')}
              className="hidden lg:inline-block relative font-display font-bold text-[11px] tracking-[0.18em] text-[#113E2E] hover:text-[#EA580C] uppercase transition-colors duration-200 cursor-pointer group py-1"
            >
              CONTACTO
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EA580C] transition-all duration-300 group-hover:w-full" />
            </button>

            {/* Shopping Cart */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#113E2E] hover:text-[#EA580C] hover:bg-gray-100/50 rounded-full transition-all cursor-pointer shrink-0"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#EA580C] text-white font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* CTA Button (Desktop) */}
            <button
              onClick={() => handleLinkClick('primer-producto')}
              className="hidden lg:flex items-center gap-1.5 bg-[#EA580C] hover:bg-[#113E2E] text-white font-display font-extrabold text-[10px] tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-md hover:scale-102"
            >
              COMPRAR
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER - Elegant drop-down card relative to parent pill */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border border-gray-200/50 absolute top-[115%] left-0 right-0 shadow-lg rounded-2xl py-6 px-6 space-y-4 flex flex-col z-50">
            <button
              onClick={() => handleLinkClick('productos')}
              className="font-display font-extrabold text-xs tracking-widest text-[#113E2E] hover:text-[#EA580C] uppercase text-center py-2.5 border-b border-gray-100"
            >
              PRODUCTOS
            </button>
            <button
              onClick={() => handleLinkClick('beneficios')}
              className="font-display font-extrabold text-xs tracking-widest text-[#113E2E] hover:text-[#EA580C] uppercase text-center py-2.5 border-b border-gray-100"
            >
              BENEFICIOS
            </button>
            <button
              onClick={() => handleLinkClick('contacto')}
              className="font-display font-extrabold text-xs tracking-widest text-[#113E2E] hover:text-[#EA580C] uppercase text-center py-2.5 border-b border-gray-100"
            >
              CONTACTO
            </button>
            <button
              onClick={() => handleLinkClick('primer-producto')}
              className="w-full bg-[#EA580C] hover:bg-[#113E2E] text-white font-display font-extrabold text-xs tracking-widest uppercase py-3.5 rounded-full text-center block transition-colors duration-300 shadow-sm"
            >
              COMPRAR ONLINE
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
