import React from 'react';
import { Bone, Phone, Mail, MapPin, Instagram, Facebook, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onScrollTo: (elementId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-white px-4 md:px-8 pb-4 md:pb-8 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-[#111111] text-white rounded-[32px] md:rounded-[48px] py-16 px-6 md:px-12 shadow-xs"
      >
        <div className="max-w-6xl mx-auto">
        {/* Simplified 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10 text-left">
          {/* Column 1: Brand & Socials */}
          <div className="space-y-5">
            <button
              onClick={() => onScrollTo('hero')}
              className="cursor-pointer text-left focus:outline-none group block"
            >
              <span className="font-display font-black text-2xl tracking-[0.2em] text-white hover:text-[#EA580C] block leading-none transition-colors duration-300 uppercase select-none">
                BONDOG
              </span>
            </button>
            <p className="text-xs text-white/60 leading-relaxed font-normal">
              Comida cruda biológicamente adecuada congelada al instante para cuidar la salud de tu mascota de por vida.
            </p>
            {/* Social Network icons */}
            <div className="flex gap-3 pt-1">
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
          <div className="space-y-4 md:pl-8">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-voldog-gold">
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
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-voldog-gold">
              SOPORTE Y ENVÍOS
            </h4>
            <div className="space-y-3 text-xs text-white/75">
              <p className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                <span>+34 600 00 00 00 (WhatsApp)</span>
              </p>
              <p className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                <span>info@bondogfood.com</span>
              </p>
              <p className="text-[11px] text-white/50 leading-relaxed pt-1 pl-6.5">
                Envíos garantizados en 24h a temperatura controlada (-18°C).
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal links */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/40">
          <p className="text-center md:text-left font-normal leading-relaxed">
            © {currentYear} BONDOG Food S.L. Hecho con{' '}
            <Heart className="w-3.5 h-3.5 fill-red-500 stroke-none inline-block align-middle mx-1" />{' '}
            para mascotas saludables.
          </p>
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
      </motion.div>
    </footer>
  );
}
