import React, { useState, useRef } from 'react';
import { Search, ShoppingCart, ArrowRight, Menu, Dog, Cat, ArrowDown } from 'lucide-react';
import { Product } from '../types';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

interface HeroProps {
  onSelectPetType: (type: 'perro' | 'gato') => void;
  activePetType: 'perro' | 'gato';
  onOpenCart: () => void;
  cartItemsCount: number;
}

export default function Hero({
  onSelectPetType,
  activePetType,
  onOpenCart,
  cartItemsCount,
}: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the hero section relative to viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Transform values for scroll-driven shrinking effect
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const cardBorderRadius = useTransform(scrollYProgress, [0, 1], ["48px", "72px"]);
  
  // Parallax elements
  const backdropTextY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const backdropTextScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.45]);
  const backdropTextOpacity = useTransform(scrollYProgress, [0, 0.4], [0.95, 0]);
  const dogImageY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const dogImageScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const fadeOutContent = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [showCatArrow, setShowCatArrow] = useState(false);
  const [showDogArrow, setShowDogArrow] = useState(false);

  const handlePetSwitch = (type: 'perro' | 'gato') => {
    onSelectPetType(type);
    
    if (type === 'gato') {
      setShowCatArrow(true);
      setTimeout(() => {
        setShowCatArrow(false);
      }, 1200);
    } else {
      setShowDogArrow(true);
      setTimeout(() => {
        setShowDogArrow(false);
      }, 1200);
    }
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Fade-in animation variants for initial page load
  const loadInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: customDelay, ease: "easeOut" }
    })
  };

  return (
    <section ref={sectionRef} className="bg-white p-4 md:p-8 h-screen w-full flex flex-col relative overflow-hidden" id="hero">
      {/* Main Rounded Container Card with Scroll Animations */}
      <motion.div 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 50% 75%, #ED832B 15%, #9E3F00 100%)',
          scale: cardScale,
          y: cardY,
          borderRadius: cardBorderRadius
        }}
        className="relative w-full flex-1 bg-[#DF7521] overflow-hidden flex flex-col justify-between pt-4 pb-6 px-6 md:pt-7 md:pb-12 md:px-12 shadow-inner select-none origin-bottom"
      >
        
        {/* --- 1. EMBEDDED TOP NAVBAR --- */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={loadInVariants}
          custom={0.1}
          className="relative z-30 flex items-center justify-between w-full"
        >
          {/* Left Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleScrollTo('productos')}
              className="font-display font-extrabold text-[13px] tracking-[0.15em] text-white hover:text-voldog-gold transition-colors uppercase cursor-pointer"
            >
              PRODUCTOS
            </button>
            <button
              onClick={() => handleScrollTo('beneficios')}
              className="font-display font-extrabold text-[13px] tracking-[0.15em] text-white hover:text-voldog-gold transition-colors uppercase cursor-pointer"
            >
              BENEFICIOS
            </button>
            <button
              onClick={() => handleScrollTo('contacto')}
              className="font-display font-extrabold text-[13px] tracking-[0.15em] text-white hover:text-voldog-gold transition-colors uppercase cursor-pointer"
            >
              CONTACTO
            </button>
          </div>

          {/* Right Navigation Controls */}
          <div className="flex items-center gap-3.5 md:gap-5 ml-auto lg:ml-0">
            {/* Search Trigger */}
            <button className="text-white hover:text-voldog-gold transition-colors p-1 cursor-pointer">
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative text-white hover:text-voldog-gold transition-colors p-1 cursor-pointer"
              aria-label="Abrir pedido"
            >
              <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FED366] text-voldog-black font-extrabold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* "SHOP ONLINE" Button (Bright lime/yellow pill) */}
            <button
              onClick={() => handleScrollTo('productos')}
              className="hidden sm:inline-block bg-[#FED366] hover:bg-[#FBBF24] text-voldog-black font-display font-extrabold text-xs tracking-wider uppercase px-6 py-3 rounded-full shadow-sm hover:scale-103 transition-all duration-300 cursor-pointer"
            >
              SHOP ONLINE
            </button>
          </div>
        </motion.div>

        {/* Mobile & Tablet CTA Banner - positioned at the top in the empty space so it doesn't cover the dog */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={loadInVariants}
          custom={0.25}
          className="lg:hidden relative z-30 w-full flex justify-center mt-[8vh] sm:mt-[10vh] animate-fade-in"
        >
          <button
            onClick={() => handleScrollTo('productos')}
            className="w-full max-w-[320px] bg-white hover:bg-voldog-gray-light text-voldog-black flex items-center justify-between pl-6 pr-2.5 py-3 rounded-full gap-4 shadow-xl active:scale-98 transition-all duration-300 group cursor-pointer text-left"
          >
            <span className="font-display font-extrabold text-[12px] tracking-wider uppercase leading-none text-voldog-black">
              Descubre la comida B.A.R.F
            </span>
            <span className="w-8 h-8 rounded-full bg-[#FED366] text-voldog-black flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:translate-x-1 duration-300">
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </span>
          </button>
        </motion.div>

        {/* --- 2. COLOSSAL "BONDOG" BACKDROP TEXT & CENTERING --- */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none overflow-hidden">
          <motion.h1 
            style={{ y: backdropTextY, scale: backdropTextScale, opacity: backdropTextOpacity }}
            className="font-display font-extrabold text-[15vw] md:text-[13vw] text-white tracking-normal leading-none uppercase select-none flex items-center justify-center transform -translate-y-[8vh] md:-translate-y-[12vh]"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            >
              BON
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
              className="ml-4 md:ml-8"
            >
              DOG
            </motion.span>
          </motion.h1>
        </div>

        {/* --- 3. DYNAMIC GOLDEN RETRIEVER LICKING IMAGE --- */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center pointer-events-none">
          <motion.div 
            style={{ y: dogImageY, scale: dogImageScale }}
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-[56vh] md:h-[68vh] flex justify-center items-end ${
              activePetType === 'gato' ? 'overflow-visible' : 'overflow-hidden'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {activePetType === 'perro' ? (
                <motion.img
                  key="perro"
                  initial={{ opacity: 0, scale: 0.82, y: 120, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.82, y: 120, filter: 'blur(8px)' }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 160, 
                    damping: 22, 
                    mass: 0.8,
                    opacity: { duration: 0.4 }
                  }}
                  src="https://lh3.googleusercontent.com/d/1_hg5Qd5my_PGRTR8tTif1JhYzNBmZG1r"
                  alt="Mascota BON DOG feliz lamiendo"
                  className="absolute bottom-0 w-full h-full object-contain object-bottom filter drop-shadow-lg origin-bottom pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <motion.img
                  key="gato"
                  initial={{ opacity: 0, scale: 1.3, y: "110%", filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1.6, y: "72%", filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.3, y: "110%", filter: 'blur(8px)' }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 160, 
                    damping: 22, 
                    mass: 0.8,
                    opacity: { duration: 0.4 }
                  }}
                  src="https://lh3.googleusercontent.com/d/15yghp7glU7PW8Gzvzazj_3oxUQy-blHK"
                  alt="Gato BON DOG elegante"
                  className="absolute bottom-0 w-full h-full object-contain object-bottom filter drop-shadow-lg origin-bottom pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* --- 4. BOTTOM INTERACTIVE ACTIONS & SWITCHES --- */}
        <motion.div 
          style={{ opacity: fadeOutContent }}
          initial="hidden"
          animate="visible"
          variants={loadInVariants}
          custom={0.65}
          className="relative z-30 flex flex-col md:flex-row items-center justify-center lg:justify-between w-full mt-auto pt-8 md:pt-0 gap-6"
        >
          
          {/* Bottom Left: Huge White Capsule CTA Button with Lime arrow */}
          <button
            onClick={() => handleScrollTo('productos')}
            className="hidden lg:flex w-full md:w-auto bg-white hover:bg-voldog-gray-light text-voldog-black flex items-center justify-between pl-6 md:pl-8 pr-3 py-3 md:py-3.5 rounded-full gap-8 max-w-sm shadow-lg hover:scale-103 active:scale-98 transition-all duration-300 group cursor-pointer text-left"
          >
            <span className="font-display font-extrabold text-[13px] md:text-sm tracking-wider uppercase leading-none">
              Descubre la comida B.A.R.F
            </span>
            <span className="w-10 h-10 rounded-full bg-[#FED366] text-voldog-black flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:translate-x-1 duration-300">
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </span>
          </button>

          {/* Bottom Right: High-fidelity white switch with yellow circle icons */}
          <div className="bg-white rounded-full p-2.5 flex items-center gap-4 shadow-lg">
            <span className="text-voldog-black text-[11px] font-extrabold tracking-wider uppercase pl-3 hidden sm:inline-block">
              MASCOTA:
            </span>
            <div className="flex items-center gap-2">
              {/* Perro trigger pill */}
              <button
                onClick={() => handlePetSwitch('perro')}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  activePetType === 'perro'
                    ? 'bg-[#FED366] text-voldog-black shadow-md scale-105'
                    : 'bg-transparent text-voldog-gray-medium hover:text-voldog-black'
                } cursor-pointer`}
                title="Ver tienda Perro"
              >
                {showDogArrow ? (
                  <motion.div
                    initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  >
                    <ArrowDown className="w-5.5 h-5.5 stroke-[3]" />
                  </motion.div>
                ) : (
                  <Dog className="w-5.5 h-5.5 stroke-[2]" />
                )}
              </button>

              {/* Gato trigger pill */}
              <button
                onClick={() => handlePetSwitch('gato')}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  activePetType === 'gato'
                    ? 'bg-[#FED366] text-voldog-black shadow-md scale-105'
                    : 'bg-transparent text-voldog-gray-medium hover:text-voldog-black'
                } cursor-pointer`}
                title="Ver tienda Gato"
              >
                {showCatArrow ? (
                  <motion.div
                    initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  >
                    <ArrowDown className="w-5.5 h-5.5 stroke-[3]" />
                  </motion.div>
                ) : (
                  <Cat className="w-5.5 h-5.5 stroke-[2]" />
                )}
              </button>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
