import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface BenefitsProps {
  onScrollTo: (elementId: string) => void;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.85, 
    y: 35 
  },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 130,
      damping: 15,
      mass: 0.8
    }
  }
};

export default function Benefits({ onScrollTo }: BenefitsProps) {
  const coreBenefits = [
    {
      title: "Digestión perfecta",
      desc: "Heces un 50% más pequeñas, firmes y sin olor penetrante gracias a una absorción de nutrientes del 90%."
    },
    {
      title: "Pelo y piel radiantes",
      desc: "Ácidos grasos esenciales naturales que eliminan la dermatitis, frenan la caída y aportan un brillo extremo."
    },
    {
      title: "Dientes libres de sarro",
      desc: "Las enzimas activas del alimento fresco combaten las bacterias bucales de forma natural, mejorando el aliento."
    },
    {
      title: "Salud inmunológica",
      desc: "Proteínas de alta calidad y antioxidantes reales que fortalecen sus defensas celulares frente a enfermedades."
    }
  ];

  return (
    <section id="beneficios" className="bg-white px-6 md:px-12 lg:px-20 py-24 md:py-32 scroll-mt-20 relative">
      <div className="max-w-4xl lg:max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 xl:gap-24">
          
          {/* Editorial Minimal Header */}
          <div className="max-w-2xl lg:w-1/2 mb-16 lg:mb-0">
            <h2 className="text-3xl md:text-5xl lg:text-[54px] font-extrabold text-[#113E2E] tracking-tight leading-tight font-display">
              Su salud se transforma cuando vuelve a comer <span className="text-[#EA580C]">comida real</span>
            </h2>
            <p className="mt-6 text-gray-500 text-sm md:text-base lg:text-lg leading-relaxed">
              Sustituir los ultraprocesados industriales por alimentos frescos desata una mejora profunda que verás reflejada en su energía, su pelaje y su felicidad diaria.
            </p>
            
            {/* Clean, Simple Call To Action - moved to left column on desktop */}
            <div className="mt-10 lg:mt-12 text-left">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onScrollTo('productos')}
                className="inline-flex items-center gap-2.5 bg-[#EA580C] hover:bg-[#113E2E] text-white font-display font-extrabold text-[11px] md:text-xs tracking-widest uppercase px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer relative z-20"
              >
                Comenzar hoy mismo
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>

          {/* Minimalist Pills Layout */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-80px" }}
            className="flex flex-col gap-4 lg:w-1/2"
          >
            {coreBenefits.map((benefit, idx) => {
              return (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.015, y: -2 }}
                  className="group bg-[#FBFBFA] hover:bg-[#EA580C] border border-gray-100 hover:border-transparent rounded-3xl md:rounded-full lg:rounded-3xl xl:rounded-full px-6 py-5 md:py-4 flex flex-col md:flex-row md:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center gap-3 md:gap-6 lg:gap-4 xl:gap-6 shadow-xs hover:shadow-md transition-all duration-300 ease-out cursor-default"
                >
                  {/* Title Pill Badge */}
                  <div className="bg-[#113E2E]/10 text-[#113E2E] group-hover:bg-white group-hover:text-[#EA580C] px-4.5 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase text-center shrink-0 transition-all duration-300">
                    {benefit.title}
                  </div>
                  {/* Description text */}
                  <p className="text-xs md:text-sm text-gray-600 group-hover:text-white/95 leading-relaxed font-medium transition-colors duration-300">
                    {benefit.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
