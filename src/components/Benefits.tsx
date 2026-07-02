import React from 'react';
import { motion } from 'motion/react';

interface BenefitsProps {
  onScrollTo: (elementId: string) => void;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

interface Benefit {
  title: string;
  desc: string;
}

const BenefitCard: React.FC<{ benefit: Benefit }> = ({ benefit }) => {
  return (
    <motion.div 
      variants={itemVariants}
      className="py-6 border-b border-white/10 flex flex-col md:flex-row md:items-start gap-4 md:gap-8 cursor-default text-center md:text-left items-center md:items-start"
    >
      {/* Título en tipografía display refinada, sin badges ni símbolos */}
      <h3 className="font-display font-semibold text-lg md:text-xl tracking-tight text-[#FAF8F5] md:w-1/3 shrink-0">
        {benefit.title}
      </h3>
      {/* Descripción limpia */}
      <p className="text-sm leading-relaxed font-normal text-white/70 md:w-2/3">
        {benefit.desc}
      </p>
    </motion.div>
  );
};

export default function Benefits({ onScrollTo }: BenefitsProps) {
  const coreBenefits = [
    {
      title: "Digestión ligera",
      desc: "Absorción óptima de nutrientes que se traduce en digestiones notablemente más cortas y un bienestar digestivo inmediato."
    },
    {
      title: "Piel y manto radiantes",
      desc: "Aporte natural de ácidos grasos esenciales que fortalecen la barrera cutánea, reducen la caída y devuelven el brillo natural."
    },
    {
      title: "Salud e higiene bucal",
      desc: "Las enzimas presentes en los ingredientes frescos actúan activamente contra la acumulación de sarro y mejoran el aliento."
    },
    {
      title: "Refuerzo inmunológico",
      desc: "Proteínas e ingredientes seleccionados de alta calidad biológica que blindan y sostienen sus defensas naturales diariamente."
    }
  ];

  return (
    <section id="beneficios" className="bg-[#113E2E] px-6 md:px-12 lg:px-20 py-24 md:py-32 scroll-mt-20 relative text-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 xl:gap-24">
          
          {/* Columna Izquierda: Encabezado Editorial */}
          <div className="max-w-2xl lg:w-1/2 mb-16 lg:mb-0 text-center lg:text-left flex flex-col items-center lg:items-start">
            <h2 className="text-3xl md:text-5xl lg:text-[48px] font-semibold tracking-tight leading-tight font-display text-white">
              Su salud se transforma cuando vuelve a comer <span className="text-[#EA580C]">comida real</span>
            </h2>
            <p className="mt-6 text-white/70 text-sm md:text-base leading-relaxed max-w-lg">
              Sustituir los ultraprocesados por porciones biológicamente adecuadas desata una mejora profunda que se nota en su energía, su pelaje y su vitalidad diaria.
            </p>
            
            {/* CTA Limpio y Minimalista sin iconos de flechas */}
            <div className="mt-10 lg:mt-12 text-center lg:text-left">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => onScrollTo('productos')}
                className="inline-flex items-center bg-[#EA580C] hover:bg-white hover:text-[#113E2E] text-white font-display font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-full shadow-sm transition-all duration-300 cursor-pointer relative z-20"
              >
                Comenzar cambio
              </motion.button>
            </div>
          </div>

          {/* Columna Derecha: Lista Asimétrica de Beneficios */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="flex flex-col lg:w-1/2 border-t border-white/10"
          >
            {coreBenefits.map((benefit, idx) => (
              <BenefitCard key={idx} benefit={benefit} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
