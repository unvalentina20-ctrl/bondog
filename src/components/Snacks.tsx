import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Dog, Cat } from 'lucide-react';
import { Product, formatARS, CartItem } from '../types';
import { PRODUCTS } from '../data';
import { motion } from 'motion/react';
import ProductPouch from './ProductPouch';

interface SnacksProps {
  onAddToCart: (product: Product) => void;
  onScrollTo: (elementId: string) => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export default function Snacks({ onAddToCart, onScrollTo, cart, onUpdateQuantity }: SnacksProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

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

  // Text animation variants for scroll-triggered appearance
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.02,
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <section id="snacks" className="bg-white px-4 md:px-8 py-16 md:py-24 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Block with Navigation Controls and Staggered Animations */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-center md:text-left">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textContainerVariants}
            className="max-w-xl text-center md:text-left mx-auto md:mx-0 flex flex-col items-center md:items-start"
          >
            <motion.h2 
              variants={textItemVariants}
              className="text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-[#113E2E] tracking-tight leading-tight"
            >
              Premios deshidratados<br />
              <span className="text-[#EA580C] font-medium">Sanos y funcionales</span>
            </motion.h2>
            <motion.p 
              variants={textItemVariants}
              className="mt-4 text-[#71717a] text-sm md:text-base leading-relaxed font-normal"
            >
              Nuestras recompensas se deshidratan artesanalmente a baja temperatura para conservar intactos todos sus nutrientes y su sabor natural.
            </motion.p>
          </motion.div>

          {/* Navigation Arrows for desktop */}
          <div className="flex justify-center md:justify-start gap-2 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#113E2E] hover:text-white text-[#113E2E] border border-gray-200 shadow-xs transition-all cursor-pointer flex items-center justify-center"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#113E2E] hover:text-white text-[#113E2E] border border-gray-200 shadow-xs transition-all cursor-pointer flex items-center justify-center"
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
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 px-4 -mx-4 scrollbar-none no-scrollbar items-stretch"
            style={{ scrollBehavior: 'smooth' }}
          >
            {snackProducts.map((product, idx) => {
              const cartItem = cart.find(item => item.product.id === product.id);
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut",
                    delay: idx * 0.05
                  }}
                  onClick={() => setSelectedProduct(product)}
                  className="group w-[280px] md:w-[320px] shrink-0 snap-start bg-[#FAF8F5] p-6 md:p-8 rounded-2xl border border-gray-200/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 ease-out relative z-20 text-voldog-black min-h-[360px] md:min-h-[400px] flex flex-col justify-between cursor-pointer overflow-hidden"
                >
                  {/* Snack Image Frame */}
                  <div className="w-full h-[220px] md:h-[250px] relative mb-4 select-none flex items-center justify-center overflow-visible mix-blend-multiply">
                    <div className="transform transition-transform duration-500 group-hover:scale-103 mix-blend-multiply">
                      <ProductPouch product={product} size="md" />
                    </div>
                  </div>

                  {/* Snack Info & Pricing */}
                  <div className="text-center md:text-left flex flex-col justify-between flex-grow relative pb-4">
                    <div className="flex flex-col items-center md:items-start">
                      <h3 className="font-display font-semibold text-lg md:text-xl text-[#113E2E] leading-tight tracking-tight mt-2 min-h-[45px] md:min-h-[50px] line-clamp-2 md:pr-10 w-full">
                        {product.name}
                      </h3>
                      <p className="text-sm font-sans font-bold text-[#EA580C] mt-1">
                        {formatARS(product.price)}
                      </p>
                    </div>

                    {/* Floating Action Button */}
                    <div className="mt-4 md:mt-0 flex justify-center md:absolute md:bottom-0 md:right-0 z-30 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                      {quantity === 0 ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onAddToCart(product)}
                          className="w-9 h-9 rounded-full bg-[#113E2E] text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-[#1c4d3d] transition-all"
                        >
                          <span className="text-base font-semibold leading-none">+</span>
                        </motion.button>
                      ) : (
                        <motion.div
                          initial={{ width: 36, opacity: 0 }}
                          animate={{ width: 84, opacity: 1 }}
                          className="h-9 rounded-full bg-white border border-gray-200 flex items-center justify-between px-2 overflow-hidden shadow-xs"
                        >
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            className="w-5 h-5 rounded-full bg-[#113E2E]/5 hover:bg-[#113E2E]/10 text-[#113E2E] flex items-center justify-center font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="font-sans font-extrabold text-[11px] text-[#113E2E]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            className="w-5 h-5 rounded-full bg-[#113E2E]/5 hover:bg-[#113E2E]/10 text-[#113E2E] flex items-center justify-center font-bold text-xs"
                          >
                            +
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
            <div
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 relative animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-voldog-black transition-colors z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-10">
                {/* Left Side: Image */}
                <div className="md:col-span-5 flex justify-center items-center mix-blend-multiply">
                  <div className="relative w-full max-w-[280px] flex items-center justify-center mix-blend-multiply">
                    <ProductPouch product={selectedProduct} size="lg" />
                  </div>
                </div>

                {/* Right Side: Info */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-voldog-black leading-tight mb-2">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-xl lg:text-2xl font-display font-black text-[#EA580C] mb-4">
                      {formatARS(selectedProduct.price)} <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C] bg-[#EA580C]/10 px-2.5 py-1 rounded-md ml-2 inline-block align-middle">/ {selectedProduct.weight}</span>
                    </p>
                    <p className="text-sm lg:text-base text-gray-600 leading-snug max-w-xl">
                      {selectedProduct.description}
                    </p>

                    {/* Ingredients list */}
                    <div className="mt-5">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-3">
                        Ingredientes Principales
                      </h4>
                      <ul className="space-y-1.5">
                        {selectedProduct.ingredients.map((ing, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-[#EA580C] font-bold mt-[-2px]">•</span>
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Nutritional stats */}
                    <div className="mt-5 pt-5 border-t border-gray-100">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#EA580C] mb-2">
                        Análisis Nutricional
                      </h4>
                      <p className="text-xs text-gray-600 font-mono">
                        {selectedProduct.nutritionalValue}
                      </p>
                    </div>
                  </div>

                  {/* Actions in popup */}
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="w-full max-w-sm py-4.5 bg-[#111111] hover:bg-[#EA580C] text-white font-display font-bold text-xs tracking-widest uppercase rounded-full transition-all cursor-pointer shadow-md text-center hover:scale-[1.01]"
                    >
                      Añadir al pedido
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
