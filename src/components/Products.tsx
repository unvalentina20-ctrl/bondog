import React, { useState } from 'react';
import { Eye, ShoppingBag, Check, ShieldCheck, Star, Dog, Cat, ArrowRight } from 'lucide-react';
import { Product, formatARS, CartItem } from '../types';
import { PRODUCTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import ProductPouch from './ProductPouch';

interface ProductsProps {
  activeTab: 'perro' | 'gato';
  setActiveTab: (tab: 'perro' | 'gato') => void;
  onAddToCart: (product: Product) => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export default function Products({ activeTab, setActiveTab, onAddToCart, cart, onUpdateQuantity }: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products by perro or gato category
  const filteredProducts = PRODUCTS.filter(p => p.category === activeTab);

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
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  };

  return (
    <section id="productos" className="bg-white px-4 md:px-8 py-16 md:py-24 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Block with staggered scroll entrance */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={textContainerVariants}
          className="text-center max-w-2xl mx-auto mb-12 animate-fade-in"
        >
          <motion.h2 
            variants={textItemVariants}
            className="text-4xl md:text-5xl font-display font-semibold text-[#113E2E] tracking-tight leading-tight"
          >
            Nutrición biológica cruda<br />
            <span className="text-[#EA580C] font-medium">congelada en su punto óptimo</span>
          </motion.h2>
          <motion.p 
            variants={textItemVariants}
            className="mt-4 text-[#71717a] text-sm md:text-base leading-relaxed font-normal max-w-lg mx-auto"
          >
            Nuestros menús imitan la dieta biológica original de perros y gatos, congelados al instante a -40°C para preservar todos los nutrientes y enzimas vivas.
          </motion.p>
        </motion.div>

        {/* Tab switch */}
        <div className="flex justify-center mb-16">
          <div className="bg-[#FAF8F5] p-1 rounded-full inline-flex gap-1.5 border border-gray-200/50">
            <button
              onClick={() => setActiveTab('perro')}
              className={`py-2 pl-3 pr-7 rounded-full font-sans font-bold text-[10px] tracking-wider transition-all flex items-center gap-3 cursor-pointer ${
                activeTab === 'perro'
                  ? 'bg-[#113E2E] text-white shadow-xs'
                  : 'text-[#71717a] hover:text-[#113E2E] hover:bg-gray-200/20'
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                activeTab === 'perro' ? 'bg-white text-[#113E2E]' : 'bg-transparent text-[#71717a]'
              }`}>
                <Dog className="w-3.5 h-3.5 stroke-[2]" />
              </span>
              <span>PERRO</span>
            </button>
            <button
              onClick={() => setActiveTab('gato')}
              className={`py-2 pl-3 pr-7 rounded-full font-sans font-bold text-[10px] tracking-wider transition-all flex items-center gap-3 cursor-pointer ${
                activeTab === 'gato'
                  ? 'bg-[#113E2E] text-white shadow-xs'
                  : 'text-[#71717a] hover:text-[#113E2E] hover:bg-gray-200/20'
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                activeTab === 'gato' ? 'bg-white text-[#113E2E]' : 'bg-transparent text-[#71717a]'
              }`}>
                <Cat className="w-3.5 h-3.5 stroke-[2]" />
              </span>
              <span>GATO</span>
            </button>
          </div>
        </div>

        {/* Products Grid - 4 Columns Desktop / Horizontal Swipe Carousel on Mobile with Staggered Scroll Animation */}
        <motion.div 
          key={activeTab}
          className="flex overflow-x-auto snap-x snap-mandatory pb-12 pt-4 px-4 -mx-4 no-scrollbar scrollbar-none gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:px-0 md:mx-0 md:pb-0 md:pt-0 md:overflow-visible md:snap-none items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              }
            }
          }}
        >
          {filteredProducts.map((product, index) => {
            const cartItem = cart.find(item => item.product.id === product.id);
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <motion.div
                key={product.id}
                id={index === 0 ? "primer-producto" : undefined}
                onClick={() => setSelectedProduct(product)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5,
                      ease: "easeOut"
                    }
                  }
                }}
                className="group flex flex-col justify-between cursor-pointer bg-[#FAF8F5] border border-gray-200/40 p-6 md:p-8 rounded-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 ease-out relative z-20 text-voldog-black w-[280px] md:w-auto shrink-0 snap-start md:shrink md:snap-align-none h-full overflow-hidden"
              >
                {/* Product Image Frame */}
                <div className="w-full h-[220px] md:h-[250px] relative mb-4 select-none flex items-center justify-center overflow-visible mix-blend-multiply">
                  <div className="transform transition-transform duration-500 group-hover:scale-103 mix-blend-multiply">
                    <ProductPouch product={product} size="md" />
                  </div>
                </div>
                {/* Product Info & Pricing */}
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
        </motion.div>

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
