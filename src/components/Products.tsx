import React, { useState } from 'react';
import { Eye, ShoppingBag, Check, ShieldCheck, Star, Dog, Cat, ArrowRight } from 'lucide-react';
import { Product, formatARS } from '../types';
import { PRODUCTS } from '../data';
import { motion } from 'motion/react';
import ProductPouch from './ProductPouch';

interface ProductsProps {
  activeTab: 'perro' | 'gato';
  setActiveTab: (tab: 'perro' | 'gato') => void;
  onAddToCart: (product: Product) => void;
}

export default function Products({ activeTab, setActiveTab, onAddToCart }: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Filter products by perro or gato category
  const filteredProducts = PRODUCTS.filter(p => p.category === activeTab);

  const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1500);
  };

  // Text animation variants for scroll-triggered appearance
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 14,
        mass: 0.8
      } 
    }
  };

  return (
    <section id="productos" className="bg-white px-4 md:px-8 pb-4 md:pb-8 scroll-mt-24">
      <div className="w-full bg-[#F9FAFB] border border-gray-100 rounded-[32px] md:rounded-[48px] py-16 md:py-24 px-6 md:px-12 origin-top shadow-xs">
        <div className="max-w-6xl mx-auto">
        {/* Header Block with staggered scroll entrance */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={textContainerVariants}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <motion.span 
            variants={textItemVariants}
            className="text-xs font-semibold tracking-widest text-[#EA580C] uppercase block mb-2"
          >
            ALIMENTACIÓN BIOLÓGICAMENTE ADECUADA
          </motion.span>
          <motion.h2 
            variants={textItemVariants}
            className="text-3xl md:text-4xl font-extrabold text-[#1F2937] tracking-tight leading-tight"
          >
            Nutrición evolutiva, <span className="text-[#EA580C]">fresca e intacta</span> en su plato
          </motion.h2>
          <motion.p 
            variants={textItemVariants}
            className="mt-4 text-[#4B5563] text-sm md:text-base leading-relaxed font-normal"
          >
            Nuestros menús crudos imitan la dieta biológica original de perros y gatos. Seleccionamos carnes nobles de grado de consumo humano, vísceras ricas en vitaminas, huesos carnosos triturados y vegetales selectos, congelados al instante a -40°C para preservar cada nutriente y enzima viva.
          </motion.p>
        </motion.div>

        {/* Tab switch */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1.5 rounded-full inline-flex gap-2 border border-gray-200/50">
            <button
              onClick={() => setActiveTab('perro')}
              className={`py-1.5 pl-2 pr-6 rounded-full font-display font-bold text-xs tracking-wider transition-all flex items-center gap-3.5 cursor-pointer ${
                activeTab === 'perro'
                  ? 'bg-[#EA580C] text-white shadow-sm font-extrabold'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
              }`}
            >
              <span className="w-8 h-8 rounded-full bg-white text-voldog-black flex items-center justify-center shadow-xs shrink-0">
                <Dog className="w-4 h-4 stroke-[2]" />
              </span>
              <span>PERRO</span>
            </button>
            <button
              onClick={() => setActiveTab('gato')}
              className={`py-1.5 pl-2 pr-6 rounded-full font-display font-bold text-xs tracking-wider transition-all flex items-center gap-3.5 cursor-pointer ${
                activeTab === 'gato'
                  ? 'bg-[#EA580C] text-white shadow-sm font-extrabold'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
              }`}
            >
              <span className="w-8 h-8 rounded-full bg-white text-[#1F2937] flex items-center justify-center shadow-xs shrink-0">
                <Cat className="w-4 h-4 stroke-[2]" />
              </span>
              <span>GATO</span>
            </button>
          </div>
        </div>

        {/* Products Grid - 4 Columns Desktop / Horizontal Swipe Carousel on Mobile with Staggered Scroll Animation */}
        <motion.div 
          key={activeTab}
          className="flex overflow-x-auto snap-x snap-mandatory pb-6 pt-2 no-scrollbar scrollbar-none gap-5 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:pb-0 md:pt-0 md:overflow-visible md:snap-none items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.22,
              }
            }
          }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              id={index === 0 ? "primer-producto" : undefined}
              onClick={() => setSelectedProduct(product)}
              variants={{
                hidden: { opacity: 0, scale: 0.6, y: 80 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  y: 0,
                  transition: { 
                    type: "spring",
                    stiffness: 150,
                    damping: 11,
                    mass: 0.75
                  }
                }
              }}
              className="group flex flex-col justify-between cursor-pointer bg-white border border-gray-100/80 hover:border-transparent p-6 md:p-8 rounded-[32px] md:rounded-[40px] hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out relative z-20 text-voldog-black min-h-[360px] md:min-h-[400px] w-[280px] md:w-auto shrink-0 snap-start md:shrink md:snap-align-none"
            >
              {/* Product Image Frame */}
              <div className="w-full h-[320px] md:h-[380px] relative mb-4 select-none flex items-center justify-center overflow-visible">
                <div className="transform transition-transform duration-500 group-hover:scale-105">
                  <ProductPouch product={product} size="md" />
                </div>
                
                {/* Weight Pills (shows on hover) */}
                <div className="absolute top-0 left-0 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="bg-[#E5E7EB]/85 backdrop-blur-xs text-[#374151] px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold font-sans">
                    500gr
                  </span>
                  <span className="bg-[#E5E7EB]/85 backdrop-blur-xs text-[#374151] px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold font-sans">
                    1kg
                  </span>
                </div>

                {/* Badge if available */}
                {product.badge && (
                  <span className="absolute top-0 right-0 bg-[#EA580C] text-white font-display font-extrabold text-[8px] tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Info & Pricing */}
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
                      onClick={(e) => handleAddToCartClick(e, product)}
                      className="w-full bg-white text-[#113E2E] font-display font-extrabold text-[11px] md:text-xs tracking-wider uppercase py-2.5 px-4.5 rounded-full flex items-center justify-between shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <span className="truncate">
                        {addedProductId === product.id ? '¡AÑADIDO!' : 'HAZ TU PEDIDO'}
                      </span>
                      <span className="w-7 h-7 rounded-full bg-[#D4E832] text-[#113E2E] flex items-center justify-center shadow-xs shrink-0 ml-2">
                        {addedProductId === product.id ? (
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
        </motion.div>

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10 font-bold"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8">
                {/* Left Side: Image */}
                <div className="md:col-span-5 flex justify-center items-center">
                  <div className="relative">
                    <ProductPouch product={selectedProduct} size="lg" />
                    {selectedProduct.badge && (
                      <span className="absolute top-2 left-2 bg-[#EA580C] text-white font-display font-extrabold text-[9px] tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                        {selectedProduct.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Side: Info */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#EA580C] uppercase bg-[#EA580C]/10 px-2.5 py-1 rounded-full mb-2">
                      <span className="w-4 h-4 rounded-full bg-[#FED366] text-voldog-black flex items-center justify-center shrink-0">
                        {selectedProduct.category === 'perro' ? (
                          <Dog className="w-2.5 h-2.5 stroke-[2.5]" />
                        ) : (
                          <Cat className="w-2.5 h-2.5 stroke-[2.5]" />
                        )}
                      </span>
                      <span>{selectedProduct.category === 'perro' ? 'MENÚ PERRO' : 'MENÚ GATO'}</span>
                    </span>
                    <h3 className="font-display font-extrabold text-xl md:text-2xl text-voldog-black tracking-tight leading-snug">
                      {selectedProduct.name}
                    </h3>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3 mt-2">
                      <span className="text-lg font-black text-[#EA580C]">
                        {formatARS(selectedProduct.price)} <span className="text-xs text-voldog-gray-medium font-normal">/ unit. ({selectedProduct.weight})</span>
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full font-semibold">
                        Formato congelado
                      </span>
                    </div>

                    <p className="text-xs text-voldog-black/80 leading-relaxed mt-3">
                      {selectedProduct.description}
                    </p>

                    {/* Ingredients list */}
                    <div className="mt-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-voldog-black mb-2">
                        Ingredientes 100% Naturales:
                      </h4>
                      <ul className="space-y-1.5">
                        {selectedProduct.ingredients.map((ing, idx) => (
                          <li key={idx} className="text-xs text-voldog-gray-medium flex items-start gap-2">
                            <span className="text-[#EA580C] font-bold">•</span>
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Nutritional stats */}
                    <div className="mt-4 bg-voldog-gray-light p-3 rounded-lg border border-gray-200/50">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-voldog-black mb-1">
                        Análisis Nutricional Promedio:
                      </h4>
                      <p className="text-xs text-[#EA580C] font-bold font-mono">
                        {selectedProduct.nutritionalValue}
                      </p>
                    </div>
                  </div>

                  {/* Actions in popup */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
                    <button
                      onClick={(e) => {
                        handleAddToCartClick(e, selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="flex-grow py-3 px-4 bg-[#EA580C] hover:bg-[#D97706] text-white font-display font-bold text-xs tracking-wider uppercase rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      AÑADIR AL PEDIDO
                    </button>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-display font-bold text-xs tracking-wider uppercase rounded-full transition-all cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
