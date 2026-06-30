import React, { useState } from 'react';
import { FAQS } from '../data';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Text and list animation variants for scroll-triggered appearance
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
    <section id="faq" className="bg-white px-4 md:px-8 pb-4 md:pb-8 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto w-full bg-[#EA580C] rounded-[32px] md:rounded-[48px] py-16 md:py-24 px-6 md:px-12 border border-white/10 shadow-xs"
      >
        <div className="max-w-4xl mx-auto">
        {/* Header Block with staggered scroll entrance */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={textContainerVariants}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span 
            variants={textItemVariants}
            className="text-xs font-semibold tracking-widest text-[#FED366] uppercase block mb-2"
          >
            SOPORTE Y RESOLUCIÓN DE DUDAS
          </motion.span>
          <motion.h2 
            variants={textItemVariants}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight"
          >
            Respuestas claras para una <span className="text-voldog-gold">transición segura</span>
          </motion.h2>
          <motion.p 
            variants={textItemVariants}
            className="mt-4 text-orange-100/90 text-sm md:text-base leading-relaxed font-normal"
          >
            La adopción de una dieta biológicamente adecuada plantea interrogantes lógicos. Aquí encontrarás explicaciones sencillas y respaldadas por especialistas para que des el paso con absoluta confianza.
          </motion.p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4 bg-white p-4 md:p-6 rounded-2xl border border-transparent shadow-xs text-voldog-black">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
                className={`border-b border-gray-100 last:border-b-0 pb-4 last:pb-0 pt-4 first:pt-0 transition-colors duration-200`}
              >
                {/* Trigger Header */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex justify-between items-center text-left py-2 font-display font-bold text-sm md:text-base text-voldog-black hover:text-[#EA580C] transition-colors cursor-pointer focus:outline-none"
                >
                  <span className="flex items-center gap-3 pr-4">
                    {faq.question}
                  </span>
                  
                  {/* Rotation Indicator icon */}
                  <span
                    className={`w-6 h-6 rounded-full bg-voldog-gray-light flex items-center justify-center text-voldog-black transition-transform duration-300 transform shrink-0 ${
                      isOpen ? 'rotate-135 bg-[#EA580C] text-white' : ''
                    }`}
                  >
                    <span className="text-sm font-semibold leading-none">{isOpen ? '×' : '+'}</span>
                  </span>
                </button>

                {/* Collapsible Answer container */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs md:text-sm text-voldog-gray-medium leading-relaxed pb-2 pr-2 font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom support text - Centered "pastilla" (pill container) */}
        <div className="flex justify-center w-full mt-12">
          <motion.div 
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="bg-white px-6 py-4 md:py-3.5 rounded-3xl md:rounded-full border border-orange-200/20 flex flex-col md:flex-row items-center gap-4 text-center md:text-left shadow-lg w-full max-w-2xl justify-between transition-all"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3.5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <svg className="w-5.5 h-5.5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-voldog-black">¿No encuentras tu pregunta?</span>
                <span className="text-xs text-voldog-gray-medium font-medium">Habla por WhatsApp con un asesor de BON DOG.</span>
              </div>
            </div>
            <a
              href="https://wa.me/34600000000?text=Hola%20BONDOG!%20Tengo%20unas%20dudas%20sobre%20la%20dieta%20BARF"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-sm hover:shadow-md transition-all shrink-0 uppercase tracking-wider cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Chatear</span>
            </a>
          </motion.div>
        </div>
        </div>
      </motion.div>
    </section>
  );
}
