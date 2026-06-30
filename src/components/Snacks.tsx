import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { Product, formatARS } from '../types';
import { PRODUCTS } from '../data';
import { motion } from 'motion/react';
import ProductPouch from './ProductPouch';

interface SnacksProps {
  onAddToCart: (product: Product) => void;
  onScrollTo: (elementId: string) => void;
}

export default function Snacks({ onAddToCart, onScrollTo }: SnacksProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [addedId, setAddedId] = React.useState<string | null>(null);

  // Filter only snacks from database
  const snackProducts = PRODUCTS.filter((p) => p.category === 'snack');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      const targetScroll =
        direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  // Text animation variants for scroll-triggered appearance
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="snacks" className="bg-white px-4 md:px-8 pb-4 md:pb-8 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-[#F3F4F6] rounded-[32px] md:rounded-[48px] py-16 md:py-24 px-6 md:px-12 border border-gray-200/50 shadow-xs"
      >
        <div className="max-w-6xl mx-auto">
        {/* Header Block with Navigation Controls and Staggered Animations */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textContainerVariants}
            className="max-w-xl text-left"
          >
            <motion.h2 
              variants={textItemVariants}
              className="text-3xl md:text-4xl font-extrabold text-[#1F2937] tracking-tight leading-tight"
            >
              Masticación recreativa, <span className="text-[#EA580C]">saludable y libre de estrés</span>
            </motion.h2>
            <motion.p 
              variants={textItemVariants}
              className="mt-3 text-[#4B5563] text-sm md:text-base leading-relaxed font-normal"
            >
              Nuestras recompensas se deshidratan artesanalmente a baja temperatura para conservar intactos sus aromas y texturas originales. Un recurso excepcional para el adiestramiento en positivo, la prevención del sarro y el bienestar emocional de tu mascota.
            </motion.p>
          </motion.div>

          {/* Navigation Arrows for desktop */}
          <div className="flex gap-2 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white hover:bg-[#EA580C] hover:text-white text-[#1F2937] border border-gray-200 shadow-sm transition-all cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white hover:bg-[#EA580C] hover:text-white text-[#1F2937] border border-gray-200 shadow-sm transition-all cursor-pointer"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Carousel Wrapper */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scrollbar-none no-scrollbar items-start"
            style={{ scrollBehavior: 'smooth' }}
          >
            {snackProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.6, y: 80 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ 
                  type: "spring",
                  stiffness: 150,
                  damping: 11,
                  mass: 0.75,
                  delay: idx * 0.22
                }}
                className="group w-[280px] md:w-[320px] shrink-0 snap-start bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out relative z-20 text-voldog-black min-h-[360px] md:min-h-[400px] flex flex-col justify-between cursor-pointer"
              >
                {/* Snack Image Frame */}
                <div className="w-full h-[320px] md:h-[380px] relative mb-4 select-none flex items-center justify-center overflow-visible">
                  <div className="transform transition-transform duration-500 group-hover:scale-105">
                    <ProductPouch product={product} size="md" />
                  </div>
                  
                  {/* Weight Pills (shows on hover) */}
                  <div className="absolute top-0 left-0 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="bg-[#E5E7EB]/85 backdrop-blur-xs text-[#374151] px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold font-sans">
                      {product.weight || '100g'}
                    </span>
                  </div>
                </div>

                {/* Snack Info & Pricing */}
                <div className="text-left flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-display font-extrabold text-lg md:text-xl text-[#113E2E] leading-tight tracking-tight mt-2">
                      {product.name}
                    </h3>
                    <p className="text-sm md:text-base font-bold text-[#C2410C] mt-1.5">
                      {formatARS(product.price)}
                    </p>
                  </div>

                  {/* Buy Button (appears on hover on desktop, always visible on mobile) */}
                  <div className="md:h-0 md:mt-0 md:opacity-0 group-hover:md:h-12 group-hover:md:mt-5 group-hover:md:opacity-100 h-12 mt-5 opacity-100 transition-all duration-300 ease-out relative w-full overflow-hidden shrink-0">
                    <div className="absolute inset-x-0 bottom-0 pointer-events-auto">
                      <button
                        onClick={() => handleAdd(product)}
                        className="w-full bg-[#F3F4F6] text-[#113E2E] font-display font-extrabold text-[11px] md:text-xs tracking-wider uppercase py-2.5 px-4.5 rounded-full flex items-center justify-between shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 cursor-pointer"
                      >
                        <span className="truncate">
                          {addedId === product.id ? '¡AÑADIDO!' : 'HAZ TU PEDIDO'}
                        </span>
                        <span className="w-7 h-7 rounded-full bg-[#D4E832] text-[#113E2E] flex items-center justify-center shadow-xs shrink-0 ml-2">
                          {addedId === product.id ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </div>
      </motion.div>
    </section>
  );
}
