import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { REVIEWS } from '../data';

export default function Reviews() {
  // Text and card animation variants for scroll-triggered appearance
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

  const cardGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="reseñas" className="bg-white px-4 md:px-8 pb-4 md:pb-8 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-[#F9FAFB] rounded-[32px] md:rounded-[48px] py-16 md:py-24 px-6 md:px-12 border border-gray-100 text-voldog-black"
      >
        <div className="max-w-6xl mx-auto">
          {/* Title block with staggered scroll entrance */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textContainerVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 
              variants={textItemVariants}
              className="text-3xl md:text-4xl font-extrabold text-[#113E2E] tracking-tight leading-tight"
            >
              Historias de <span className="text-[#EA580C]">transformación y salud real</span>
            </motion.h2>
            <motion.p 
              variants={textItemVariants}
              className="mt-4 text-[#4B5563] text-sm md:text-base leading-relaxed font-normal"
            >
              Conoce la experiencia de familias reales que decidieron sustituir los alimentos secos ultraprocesados por las recetas frescas y biológicamente adecuadas de BON DOG.
            </motion.p>

            {/* Average Rating Widget Badge */}
            <motion.div 
              variants={textItemVariants}
              className="inline-flex flex-wrap items-center justify-center gap-2 md:gap-3 bg-white px-5 py-2.5 rounded-full border border-gray-200 mt-6 shadow-xs"
            >
              <span className="text-sm font-extrabold text-[#113E2E] flex items-center gap-1">
                4.8 <Star className="w-4 h-4 fill-[#FED366] stroke-none" />
              </span>
              <span className="text-xs text-gray-300 font-semibold">•</span>
              <span className="text-xs font-semibold text-[#4B5563]">Basado en 570 reseñas</span>
            </motion.div>
          </motion.div>

          {/* 4-Column Reviews Grid with staggered entrance */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardGridVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {REVIEWS.map((r) => (
              <motion.div
                key={r.id}
                variants={cardItemVariants}
                className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all duration-300 text-voldog-black relative z-20"
              >
                {/* Header: User Profile */}
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    {/* Circular Avatar */}
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="w-11 h-11 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-[#113E2E] leading-tight">
                        {r.name}
                      </h4>
                      {/* Date */}
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-400 font-medium">
                          {r.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-3.5 h-3.5 ${
                          index < r.rating
                            ? 'fill-[#FED366] stroke-none'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-normal">
                    "{r.text}"
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
