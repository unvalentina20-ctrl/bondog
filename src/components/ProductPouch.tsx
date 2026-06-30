import React from 'react';
import { Product } from '../types';

interface ProductPouchProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
}

export default function ProductPouch({ product, size = 'md' }: ProductPouchProps) {
  const isDogRaw = product.category === 'perro';
  const isCatRaw = product.category === 'gato';
  const isSnack = product.category === 'snack';
  const isRawFood = isDogRaw || isCatRaw || isSnack;
  const isSuperfood = product.category === 'superfood';
  const isCuidado = product.category === 'cuidado';

  // Extract clean ingredient list for illustration
  const getIngredientEmojis = () => {
    const nameLower = product.name.toLowerCase();
    if (nameLower.includes('pollo') || nameLower.includes('hígado')) return { meat: '🥩', main: '🍗', extra: '🥕', herb: '🥬' };
    if (nameLower.includes('vacuno') || nameLower.includes('ternera') || nameLower.includes('tráquea')) return { meat: '🥩', main: '🍖', extra: '🎃', herb: '🫐' };
    if (nameLower.includes('pavo')) return { meat: '🥩', main: '🍗', extra: '🥦', herb: '🥕' };
    if (nameLower.includes('salmón') || nameLower.includes('boquerón') || nameLower.includes('boquerones')) return { meat: '🐟', main: '🥩', extra: '🍏', herb: '🌿' };
    if (nameLower.includes('conejo')) return { meat: '🥩', main: '🍖', extra: '🎃', herb: '🌿' };
    return { meat: '🥩', main: '🍖', extra: '🥕', herb: '🫐' };
  };

  const { meat, main, extra, herb } = getIngredientEmojis();

  // Color schemes matching the brand and flavors
  const getPouchColors = () => {
    const nameLower = product.name.toLowerCase();
    if (isCatRaw) {
      if (nameLower.includes('pollo')) return { bg: 'from-[#8C4623] to-[#713414]', accent: '#F59E0B', text: 'text-amber-100' };
      if (nameLower.includes('pavo')) return { bg: 'from-[#783F27] to-[#5D2C15]', accent: '#EC4899', text: 'text-pink-100' };
      return { bg: 'from-[#834C32] to-[#67351D]', accent: '#3B82F6', text: 'text-blue-100' };
    }
    if (isDogRaw) {
      // Dog Raw (Matching uploaded image)
      if (nameLower.includes('pollo')) return { bg: 'from-[#B25329] to-[#8C3E1B]', accent: '#FCD34D', text: 'text-amber-100' };
      if (nameLower.includes('vacuno') || nameLower.includes('ternera')) return { bg: 'from-[#A23F21] to-[#7C2B14]', accent: '#EF4444', text: 'text-red-100' };
      if (nameLower.includes('pavo')) return { bg: 'from-[#AA4C27] to-[#843719]', accent: '#10B981', text: 'text-emerald-100' };
      if (nameLower.includes('salmón')) return { bg: 'from-[#C2410C] to-[#9A3412]', accent: '#60A5FA', text: 'text-blue-100' };
      return { bg: 'from-[#9B4F29] to-[#793A1A]', accent: '#3B82F6', text: 'text-blue-100' };
    }
    if (isSnack) {
      if (nameLower.includes('boquerón') || nameLower.includes('boquerones')) {
        return { bg: 'from-[#1E3A8A] to-[#172554]', accent: '#60A5FA', text: 'text-blue-100' }; // Rich deep blue for fish
      }
      if (nameLower.includes('ternera') || nameLower.includes('tráquea')) {
        return { bg: 'from-[#7F1D1D] to-[#450A0A]', accent: '#EF4444', text: 'text-red-100' }; // Rich deep red for beef
      }
      if (nameLower.includes('cerdo') || nameLower.includes('oreja') || nameLower.includes('orejas')) {
        return { bg: 'from-[#701A75] to-[#4A044E]', accent: '#F472B6', text: 'text-pink-100' }; // Rich violet for pork
      }
      if (nameLower.includes('pollo') || nameLower.includes('hígado')) {
        return { bg: 'from-[#78350F] to-[#451A03]', accent: '#F59E0B', text: 'text-amber-100' }; // Warm amber for chicken/liver
      }
      return { bg: 'from-[#6E4229] to-[#4F2D19]', accent: '#D97706', text: 'text-amber-100' }; // Premium dark bronze
    }
    return { bg: 'from-[#9B4F29] to-[#793A1A]', accent: '#3B82F6', text: 'text-blue-100' };
  };

  const colors = getPouchColors();

  // Size configurations
  const dimensions = {
    sm: 'w-[220px] h-[330px]',
    md: 'w-[280px] h-[420px] md:w-[310px] md:h-[460px]',
    lg: 'w-[360px] h-[540px] md:w-[420px] md:h-[630px]'
  }[size];

  // If a custom high-quality Google Drive studio photo is provided, render it directly with professional depth shadows
  if (product.image && (product.image.includes('googleusercontent.com') || product.image.includes('drive.google.com'))) {
    let imageUrl = product.image;
    if (imageUrl.includes('drive.google.com') && imageUrl.includes('id=')) {
      const id = imageUrl.split('id=')[1]?.split('&')[0];
      if (id) imageUrl = `https://lh3.googleusercontent.com/d/${id}`;
    } else if (imageUrl.includes('drive.google.com/file/d/')) {
      const id = imageUrl.split('/file/d/')[1]?.split('/')[0];
      if (id) imageUrl = `https://lh3.googleusercontent.com/d/${id}`;
    }

    // Keep custom studio photo images strictly inside the card boundaries to avoid white background spills
    const imageContainerDimensions = {
      sm: 'w-full h-[220px]',
      md: 'w-full h-[320px] md:h-[380px]',
      lg: 'w-full h-[360px] md:h-[480px]'
    }[size];

    // Since all Google Drive pouch images are exported from the same template with identical canvas padding,
    // they all require the exact same scale factor to display at the same uniform size.
    const scaleClass = 'scale-[1.6]';

    return (
      <div className={`relative ${imageContainerDimensions} flex flex-col items-center justify-center select-none group transition-all duration-500 overflow-hidden rounded-[24px]`}>
        {/* Outer zoom wrapper: handles hover scale */}
        <div className="w-full h-full flex items-center justify-center transition-transform duration-500 transform group-hover:scale-[1.06]">
          {/* Inner scale wrapper: balances out padding inconsistencies */}
          <div className={`w-full h-full flex items-center justify-center ${scaleClass}`}>
            <img
              src={imageUrl}
              alt={product.name}
              className="max-w-full max-h-full object-contain mix-blend-multiply contrast-[1.04] brightness-[1.02]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    );
  }

  // Render the B.A.R.F. Raw Diet stand-up pouch (Matches the uploaded premium photo style)
  if (isRawFood) {
    return (
      <div className={`relative ${dimensions} flex flex-col items-center select-none group filter drop-shadow-[0_10px_15px_rgba(139,69,19,0.16)] group-hover:drop-shadow-[0_20px_25px_rgba(139,69,19,0.22)] transition-all duration-500`}>
        {/* Actual standing pouch container */}
        <div className={`w-full h-full bg-gradient-to-br ${colors.bg} rounded-t-[2.5rem] rounded-b-[1.25rem] relative overflow-hidden flex flex-col justify-between p-4 border border-white/10 shadow-[inset_0_4px_12px_rgba(255,255,255,0.15),_inset_0_-8px_16px_rgba(0,0,0,0.25)]`}>
          
          {/* Tear Notch Left */}
          <div className="absolute top-[36px] -left-[1px] w-1.5 h-3 bg-white/10 rounded-r-md border-r border-t border-b border-white/20 z-20" />
          {/* Tear Notch Right */}
          <div className="absolute top-[36px] -right-[1px] w-1.5 h-3 bg-white/10 rounded-l-md border-l border-t border-b border-white/20 z-20" />

          {/* Zipper Seal Line Indentation */}
          <div className="absolute top-[41px] left-0 right-0 border-b border-black/15 border-dashed h-[1px] z-10" />

          {/* Shiny Metallic/Matte highlight layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/8 to-white/0 pointer-events-none transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out z-10" />
          <div className="absolute inset-y-0 left-4 w-1 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-4 w-1 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />

          {/* Top Label: BRANDING (Matches uploaded image layout exactly) */}
          <div className="flex flex-col items-center text-center mt-5 z-10">
            <h4 className="font-sans font-extrabold text-[36px] md:text-[42px] leading-[0.85] text-white tracking-tight text-center drop-shadow-sm font-black">
              BON
              <br />
              DOG
            </h4>
            <span className="text-[8px] md:text-[9px] font-bold tracking-[0.25em] text-amber-200/90 uppercase mt-2.5 drop-shadow-xs font-sans">
              {isSnack ? 'PREMIUM NATURAL TREAT' : 'PREMIUM B.A.R.F. DIET'}
            </span>
            
            {/* Horizontal accent line */}
            <div className="w-10 h-[2px] bg-amber-200/40 rounded-full mt-2" />
          </div>

          {/* Center Content: Product Taste/Flavor Title */}
          <div className="text-center px-2 py-1 z-10 my-auto">
            <h5 className="text-[10px] md:text-[11px] font-extrabold tracking-widest text-white uppercase font-sans drop-shadow-xs leading-snug">
              {product.name.replace('Menú de ', '').toUpperCase()}
            </h5>
            <span className="text-[7px] md:text-[8px] font-bold text-white/70 uppercase tracking-widest block mt-0.5 font-sans">
              {isSnack ? '100% MONOPROTEICO & SANO' : '100% COMPLETO Y FRESCO'}
            </span>
          </div>

          {/* Bottom Card: Ingredients & Emojis box (Creamy ivory box matching photo) */}
          <div className="bg-[#FAF6F0] rounded-xl p-2.5 mx-1 flex flex-col justify-between border border-amber-900/10 shadow-[0_4px_8px_rgba(0,0,0,0.06),_inset_0_1px_0_rgba(255,255,255,0.8)] z-10 relative">
            {/* Small icon labels */}
            <div className="grid grid-cols-3 gap-0.5 border-b border-amber-900/5 pb-1.5 mb-1.5 text-center">
              <div className="flex flex-col items-center">
                <span className="text-[11px] mb-0.5">{isSnack ? '🌾' : '🥩'}</span>
                <span className="text-[6px] font-bold text-[#5C2E16] tracking-wider uppercase">{isSnack ? 'Sin Grano' : 'Proteína'}</span>
              </div>
              <div className="flex flex-col items-center border-x border-amber-900/5">
                <span className="text-[11px] mb-0.5">{isSnack ? '🔥' : '🥕'}</span>
                <span className="text-[6px] font-bold text-[#5C2E16] tracking-wider uppercase">{isSnack ? 'Baja Temp' : 'Vitaminas'}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[11px] mb-0.5">{isSnack ? '🌱' : '🫐'}</span>
                <span className="text-[6px] font-bold text-[#5C2E16] tracking-wider uppercase">{isSnack ? 'Sano' : 'Antioxid.'}</span>
              </div>
            </div>

            {/* Premium Ingredients visual layout */}
            <div className="flex items-center justify-center gap-2 py-0.5 relative">
              <div className="text-sm filter drop-shadow-xs transform -rotate-12 hover:scale-125 hover:rotate-0 transition-transform cursor-pointer">
                {meat}
              </div>
              <div className="text-lg filter drop-shadow-xs transform translate-y-[-2px] hover:scale-125 transition-transform cursor-pointer">
                {main}
              </div>
              <div className="text-sm filter drop-shadow-xs transform rotate-12 hover:scale-125 hover:rotate-0 transition-transform cursor-pointer">
                {extra}
              </div>
              <div className="text-xs filter drop-shadow-xs transform translate-y-[1px] -rotate-6 hover:scale-125 hover:rotate-0 transition-transform cursor-pointer">
                {herb}
              </div>
            </div>

            {/* Subtle premium frame corner decorations */}
            <div className="absolute top-1.5 left-1.5 w-1 h-1 border-t border-l border-amber-900/20" />
            <div className="absolute top-1.5 right-1.5 w-1 h-1 border-t border-r border-amber-900/20" />
            <div className="absolute bottom-1.5 left-1.5 w-1 h-1 border-b border-l border-amber-900/20" />
            <div className="absolute bottom-1.5 right-1.5 w-1 h-1 border-b border-r border-amber-900/20" />
          </div>

          {/* Pouch foot shadow detail */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[85%] h-1 bg-black/20 rounded-full blur-xs pointer-events-none" />

          {/* 100% Natural Stamp */}
          <span className="absolute bottom-3 right-3 text-[6px] md:text-[7px] font-extrabold text-amber-200/60 tracking-[0.2em] uppercase font-sans">
            100% NATURAL
          </span>

          {/* Net weight on bottom-left */}
          <span className="absolute bottom-3 left-3 text-[6px] md:text-[7px] font-bold text-white/50 font-sans">
            {product.weight}
          </span>
        </div>

        {/* 3D standing floor shadow */}
        <div className="absolute -bottom-2 w-[80%] h-3 bg-[#E5E7EB] rounded-full blur-[6px] -z-10 opacity-70 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-x-110" />
      </div>
    );
  }



  // Render Apothecary Style Glass Bottle or Jar (for Superfoods and Care Products)
  return (
    <div className={`relative ${dimensions} flex flex-col items-center select-none group filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.08)] group-hover:drop-shadow-[0_16px_20px_rgba(0,0,0,0.15)] transition-all duration-500`}>
      {/* Container simulating high-end cosmetics/supplements packaging */}
      <div className="w-full h-full bg-[#FCFBF9] rounded-2xl relative overflow-hidden flex flex-col justify-between p-4 border border-gray-200/50 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
        
        {/* Outer shadow highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/10 via-white/5 to-white/10 pointer-events-none" />

        {/* Minimalist Top Lid (simulates black metal cap or dropper) */}
        <div className="w-16 h-4 bg-gradient-to-r from-neutral-800 to-neutral-950 rounded-md mx-auto shadow-sm -mt-4 relative z-10 border-b border-black/30">
          <div className="w-12 h-1 bg-white/20 mx-auto rounded-full mt-0.5" />
        </div>

        {/* Brand label top */}
        <div className="text-center mt-2">
          <span className="text-[6.5px] font-bold text-gray-400 tracking-[0.25em] uppercase">BON DOG ORGANICS</span>
          <div className="w-6 h-[1px] bg-amber-600/30 mx-auto mt-1" />
        </div>

        {/* Elegant Centered Illustration representing healthy nutrition */}
        <div className="my-auto py-2 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-amber-50/80 border border-amber-600/10 flex items-center justify-center text-2xl relative group-hover:border-amber-600/25 transition-all duration-300">
            {product.name.includes('Aceite') ? '🧴' : product.name.includes('Kéfir') ? '🥛' : product.name.includes('Espirulina') ? '🌿' : '🌸'}
          </div>
          <h4 className="text-[10px] md:text-[11px] font-extrabold text-[#113E2E] text-center uppercase tracking-wide mt-3 px-1.5 leading-tight">
            {product.name}
          </h4>
          <span className="text-[6.5px] text-amber-700/80 font-bold uppercase tracking-wider block mt-1">
            SUPLEMENTO ACTIVO
          </span>
        </div>

        {/* Minimalist Medical Style Label Details */}
        <div className="bg-[#FAF9F5] border border-gray-100 rounded-lg p-2 text-[6px] text-gray-500 font-sans flex flex-col gap-0.5">
          <div className="flex justify-between border-b border-gray-200/50 pb-1">
            <span className="font-bold text-[#1F2937]">ORIGEN</span>
            <span>100% Ecológico</span>
          </div>
          <div className="flex justify-between pt-0.5">
            <span className="font-bold text-[#1F2937]">CONTENIDO</span>
            <span>{product.weight}</span>
          </div>
        </div>

        {/* Footer brand details */}
        <div className="text-center text-[5.5px] font-bold text-gray-400 tracking-wider">
          CUIDADO HOLÍSTICO NATURAL
        </div>
      </div>
      {/* Shadows */}
      <div className="absolute -bottom-1.5 w-[70%] h-2 bg-gray-200 rounded-full blur-[4px] -z-10" />
    </div>
  );
}
