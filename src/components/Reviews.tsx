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
    <section id="reseñas" className="bg-[#FAF8F5] px-6 md:px-12 py-16 md:py-24 scroll-mt-24">
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
            className="text-4xl md:text-5xl font-display font-semibold text-[#113E2E] tracking-tight leading-tight"
          >
            Lo que dicen de nosotros es simple:<br />
            <span className="text-[#EA580C] font-medium">comida de verdad</span>
          </motion.h2>
          <motion.p 
            variants={textItemVariants}
            className="mt-4 text-[#71717a] text-sm md:text-base leading-relaxed font-normal max-w-md mx-auto"
          >
            Familias reales que cambiaron los ultraprocesados por nutrición biológicamente adecuada.
          </motion.p>
        </motion.div>

        {/* 4-Column Reviews Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {REVIEWS.map((r) => (
            <div
              key={r.id}
              className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200/40 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-all duration-300 text-voldog-black relative z-20 text-center md:text-left"
            >
              {/* Header: User Profile */}
              <div className="flex flex-col items-center md:items-start">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-3.5 mb-4 text-center md:text-left">
                  {/* Circular Avatar */}
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-10 h-10 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                  <div className="flex flex-col items-center md:items-start">
                    <h4 className="font-sans font-bold text-sm text-[#113E2E] leading-tight">
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
                <div className="flex gap-0.5 mb-4 justify-center md:justify-start">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-3 h-3 ${
                        index < r.rating
                          ? 'fill-[#EA580C] stroke-none'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-normal text-center md:text-left">
                  "{r.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
