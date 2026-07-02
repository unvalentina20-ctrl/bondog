import React from 'react';
import { Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onScrollTo: (elementId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-[#111111] text-white pt-20 pb-0 scroll-mt-24 w-full relative overflow-hidden">
      {/* Footer Content Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Simplified 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10 text-center md:text-left">
          {/* Column 1: Brand & Socials */}
          <div className="space-y-5 flex flex-col items-center md:items-start text-center md:text-left">
            <button
              onClick={() => onScrollTo('hero')}
              className="cursor-pointer text-center md:text-left focus:outline-none group block mx-auto md:mx-0"
            >
              <span className="font-display font-semibold text-2xl tracking-[0.2em] text-white hover:text-[#EA580C] block leading-none transition-colors duration-300 uppercase select-none">
                BONDOG
              </span>
            </button>
            <p className="text-xs text-white/60 leading-relaxed font-normal max-w-sm">
              Comida cruda biológicamente adecuada congelada al instante para cuidar la salud de tu mascota de por vida.
            </p>
            {/* Social Network icons */}
            <div className="flex justify-center md:justify-start gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#EA580C] text-white flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#EA580C] text-white flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4 md:pl-8 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-sans font-bold text-[10px] tracking-wider uppercase text-[#EA580C]">
              ENLACES
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75 font-semibold">
              <li>
                <button
                  onClick={() => onScrollTo('productos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Menús B.A.R.F.
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('snacks')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Snacks Deshidratados
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Preguntas Frecuentes
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Shipping */}
          <div className="space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-sans font-bold text-[10px] tracking-wider uppercase text-[#EA580C]">
              SOPORTE Y ENVÍOS
            </h4>
            <div className="space-y-3 text-xs text-white/75 flex flex-col items-center md:items-start">
              <p className="flex items-center md:items-start justify-center md:justify-start gap-2.5">
                <Phone className="w-4 h-4 text-[#EA580C] shrink-0" />
                <span>+34 600 00 00 00 (WhatsApp)</span>
              </p>
              <p className="flex items-center md:items-start justify-center md:justify-start gap-2.5">
                <Mail className="w-4 h-4 text-[#EA580C] shrink-0" />
                <span>info@bondogfood.com</span>
              </p>
              <p className="text-[11px] text-white/50 leading-relaxed pt-1 text-center md:text-left">
                Envíos garantizados en 24h a temperatura controlada (-18°C).
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal links */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/40 pb-4">
          <div className="flex gap-4 font-semibold">
            <a href="#contacto" className="hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#contacto" className="hover:text-white transition-colors">
              Cookies
            </a>
            <a href="#contacto" className="hover:text-white transition-colors">
              Aviso Legal
            </a>
          </div>
        </div>
      </div>

      {/* Full-width Brand Mark - absolute bottom, edge to edge */}
      <div className="w-full overflow-hidden mt-12 mb-[-1.5vw] flex justify-center items-end select-none pointer-events-none">
        <span className="font-display font-black text-[22vw] leading-none tracking-tighter text-white/[0.04] w-full text-center block uppercase translate-y-[10%]">
          BONDOG
        </span>
      </div>
    </footer>
  );
}
