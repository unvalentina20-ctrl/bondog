import { Product, Review, FAQItem } from './types';

export const CATEGORIES = [
  {
    id: 'perro',
    name: 'B.A.R.F para Perros',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400',
    description: 'Recetas crudas ancestrales elaboradas artesanalmente para potenciar la vitalidad de tu perro.',
  },
  {
    id: 'gato',
    name: 'B.A.R.F para Gatos',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    description: 'Fórmulas ricas en taurina y humedad biológica, diseñadas para carnívoros estrictos.',
  },
  {
    id: 'superfood',
    name: 'Superfoods',
    image: 'https://images.unsplash.com/photo-1607301408221-3444208a2b74?auto=format&fit=crop&q=80&w=400',
    description: 'Súper nutrientes naturales de alta densidad para blindar el sistema inmune y las articulaciones.',
  },
  {
    id: 'snack',
    name: 'Snacks Naturales',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400',
    description: 'Recompensas de un solo ingrediente deshidratadas a baja temperatura para masticación funcional.',
  },
  {
    id: 'cuidado',
    name: 'Cuidado Natural',
    image: 'https://images.unsplash.com/photo-1608454367599-c113950e3860?auto=format&fit=crop&q=80&w=400',
    description: 'Cosmética botánica e higiene orgánica de grado humano, libre de químicos agresivos.',
  }
];

export const PRODUCTS: Product[] = [
  // --- PERRO ---
  {
    id: 'p1',
    name: 'Menú de Pollo',
    category: 'perro',
    price: 7800,
    weight: '500g',
    image: 'https://lh3.googleusercontent.com/d/1HPnvT6lCzf3wp8Fxm1iEEIHrY3URR9L_',
    badge: 'MÁS VENDIDO',
    description: 'Nuestra receta insignia de digestión perfecta. Pollo de corral seleccionado de grado de consumo humano, balanceado con deliciosas verduras frescas al vapor.',
    ingredients: [
      '65% Pollo (pechuga, muslo y carcasa con hueso carnoso)',
      '15% Vísceras de pollo (hígado, corazón, molleja)',
      '10% Calabaza y zanahoria al vapor',
      '8% Espinaca fresca y manzana roja',
      '2% Aceite de oliva virgen extra y semillas de lino'
    ],
    nutritionalValue: 'Proteína: 15.8%, Grasa: 9.2%, Fibra: 1.1%, Humedad: 71.3%'
  },
  {
    id: 'p2',
    name: 'Menú de Ternera',
    category: 'perro',
    price: 8500,
    weight: '500g',
    image: 'https://lh3.googleusercontent.com/d/1F-I2oBYFlChpF7B-zP198W6wL5HEwLVJ',
    badge: 'RICO EN HIERRO',
    description: 'Monoproteico premium de vacuno criado en pastos libres. Un extraordinario aporte de hierro hemo y aminoácidos esenciales de alta asimilación para el máximo rendimiento energético.',
    ingredients: [
      '70% Ternera (carne muscular, costilla triturada)',
      '15% Vísceras de ternera (hígado, pulmón, riñón)',
      '8% Calabacín and zanahoria',
      '5% Manzana gala y pera',
      '2% Levadura de cerveza y aceite de coco prensado en frío'
    ],
    nutritionalValue: 'Proteína: 16.5%, Grasa: 11.1%, Fibra: 0.9%, Humedad: 68.5%'
  },
  {
    id: 'p3',
    name: 'Menú de Pavo',
    category: 'perro',
    price: 8200,
    weight: '500g',
    image: 'https://lh3.googleusercontent.com/d/1lvljTLc9NZ1bxb_o1DGskggX4WBpmn54',
    badge: 'HIPOALERGÉNICO',
    description: 'Fórmula hipoalergénica baja en grasa y sumamente tierna. Elaborada con pavo premium libre de hormonas, ideal para articulaciones ligeras y control de peso óptimo.',
    ingredients: [
      '68% Pavo entero triturado (con hueso carnoso de cuello y alas)',
      '12% Hígado y corazón de pavo',
      '10% Brócoli y calabaza',
      '8% Arándanos rojos antioxidantes',
      '2% Semillas de chía y polvo de cáscara de huevo para calcio'
    ],
    nutritionalValue: 'Proteína: 14.9%, Grasa: 7.8%, Fibra: 1.3%, Humedad: 73.1%'
  },
  {
    id: 'p4',
    name: 'Menú de Salmón y Pavo',
    category: 'perro',
    price: 9100,
    weight: '500g',
    image: 'https://lh3.googleusercontent.com/d/18ONLaR3MrqUqN8EPgbCChGXy7wiMhXTZ',
    badge: 'OMEGA 3 SUPREME',
    description: 'La fusión perfecta de tierra y océano profundo. Proporciona una inyección natural de ácidos grasos Omega-3 EPA y DHA para garantizar un pelaje deslumbrante y articulaciones jóvenes.',
    ingredients: [
      '40% Salmón entero del Atlántico (sin espinas grandes)',
      '30% Carne de pavo con hueso',
      '15% Hígado de pavo',
      '10% Calabacín fresco y zanahoria',
      '5% Manzana verde y algas marinas (Kelp)'
    ],
    nutritionalValue: 'Proteína: 15.2%, Grasa: 10.5%, Fibra: 0.8%, Humedad: 70.8%'
  },

  // --- GATO ---
  {
    id: 'p5',
    name: 'Menú de Pollo y Conejo',
    category: 'gato',
    price: 8900,
    weight: '400g',
    badge: 'MÁS VENDIDO GATOS',
    image: 'https://lh3.googleusercontent.com/d/1ho18Hjg0Jpq-v15tBV1CcHA27uREW46T',
    description: 'Los felinos son carnívoros estrictos. Esta receta imita a la perfección la composición de sus presas naturales en estado salvaje, con una altísima densidad de carnes nobles, humedad celular y taurina bioactiva.',
    ingredients: [
      '50% Pollo (carne de pechuga y muslo)',
      '30% Conejo (carne y huesos tiernos triturados)',
      '15% Vísceras esenciales (corazón para taurina, hígado de pollo)',
      '3% Calabaza triturada (aporte de fibra natural contra bolas de pelo)',
      '2% Aceite de salmón noruego y levadura de cerveza'
    ],
    nutritionalValue: 'Proteína: 18.2%, Grasa: 8.5%, Fibra: 0.4%, Humedad: 71.9%'
  },
  {
    id: 'p6',
    name: 'Menú de Pavo y Corazón',
    category: 'gato',
    price: 9200,
    weight: '400g',
    badge: 'ALTA TAURINA',
    image: 'https://lh3.googleusercontent.com/d/1BTExmpRjeq4sgzfnAZ8W6QYPfHNC3vRq',
    description: 'Menú hipoalergénico de extraordinaria digestibilidad. Enriquecido con un alto porcentaje de corazón de vacuno fresco para proporcionar un aporte insuperable de aminoácidos esenciales y taurina.',
    ingredients: [
      '55% Carne de pavo magra con carcasa tierna',
      '25% Corazón de ternera picado',
      '15% Hígado de pavo y riñón de ternera',
      '3% Zanahoria dulce al vapor',
      '2% Semillas de cáñamo molidas y aceite de krill'
    ],
    nutritionalValue: 'Proteína: 17.8%, Grasa: 7.9%, Fibra: 0.3%, Humedad: 72.8%'
  },
  {
    id: 'p7',
    name: 'Menú de Salmón y Pollo',
    category: 'gato',
    price: 9600,
    weight: '400g',
    badge: 'SABOR INTENSO',
    image: 'https://lh3.googleusercontent.com/d/1d0mRGopsE7Xg8MD0cNMsYC6grXD6krez',
    description: 'La combinación gourmet predilecta de los felinos con paladar exigente. El salmón rosado fresco aporta una fragancia irresistible que despierta el apetito y embellece el manto capilar.',
    ingredients: [
      '45% Salmón rosado salvaje',
      '35% Pollo de corral con hueso carnoso',
      '15% Hígado y mollejas de pollo',
      '3% Arándanos rojos (soporte para el sistema urinario)',
      '2% Caldo de huesos y taurina pura añadida'
    ],
    nutritionalValue: 'Proteína: 18.5%, Grasa: 9.8%, Fibra: 0.5%, Humedad: 70.1%'
  },

  // --- SUPERFOODS ---
  {
    id: 'p8',
    name: 'Aceite de Salmón Salvaje',
    category: 'superfood',
    price: 14900,
    weight: '250ml',
    badge: 'RECOMENDADO',
    image: 'https://images.unsplash.com/photo-1611070973770-b1a60c268185?auto=format&fit=crop&q=80&w=500',
    description: 'Aceite puro prensado en frío extraído de salmón salvaje de Alaska. El suplemento perfecto para un pelaje sedoso, articulaciones sanas y desarrollo cognitivo.',
    ingredients: [
      '100% Aceite de salmón salvaje puro de Alaska, sin aditivos ni conservantes aromáticos artificiales.'
    ],
    nutritionalValue: 'Ácidos grasos Omega 3: 28%, EPA: 10%, DHA: 11%'
  },
  {
    id: 'p9',
    name: 'Kéfir de Cabra Liofilizado',
    category: 'superfood',
    price: 5900,
    weight: '200g',
    badge: 'SALUD DIGESTIVA',
    image: 'https://images.unsplash.com/photo-1571244856341-4f3dd95db36e?auto=format&fit=crop&q=80&w=500',
    description: 'Potente probiótico lácteo natural de cabra. Refuerza la microbiota intestinal de tu mascota, mejora la asimilación de nutrientes y fortalece el sistema inmunológico.',
    ingredients: [
      '100% Leche de cabra fermentada con granos de kéfir artesanal, deshidratada en frío.'
    ],
    nutritionalValue: 'Miles de millones de bacterias lácticas activas (Lactobacillus, Bifidobacterium)'
  },
  {
    id: 'p10',
    name: 'Espirulina Orgánica',
    category: 'superfood',
    price: 11500,
    weight: '100g',
    badge: 'SUPER DETOX',
    image: 'https://images.unsplash.com/photo-1607301408221-3444208a2b74?auto=format&fit=crop&q=80&w=500',
    description: 'Microalga verde-azulada conocida como una de las fuentes de nutrientes más completas del planeta. Potente desintoxicante, inmunoestimulante y rica en clorofila.',
    ingredients: [
      '100% Espirulina en polvo (Arthrospira platensis) de cultivo ecológico certificado.'
    ],
    nutritionalValue: 'Proteínas: 65%, Clorofila: 1.2%, Vitaminas B1, B2, B6, Hierro y Zinc.'
  },

  // --- SNACKS (Sección 8) ---
  {
    id: 'p11',
    name: 'Boquerones Deshidratados',
    category: 'snack',
    price: 6500,
    weight: '100g',
    badge: 'CRUJIENTE',
    image: 'https://lh3.googleusercontent.com/d/1KSXRtvv2Nbuo2IyE2kgRbvEJ-KjDtdZg',
    description: 'Boquerones mediterráneos enteros, deshidratados lentamente a baja temperatura. Un snack delicioso y crujiente rico en calcio, fósforo y grasas saludables.',
    ingredients: [
      '100% Boquerón entero (Engraulis encrasicolus)'
    ],
    nutritionalValue: 'Proteína: 62%, Grasa: 14%, Humedad: 8.5%'
  },
  {
    id: 'p12',
    name: 'Tiras de Ternera Naturales',
    category: 'snack',
    price: 7200,
    weight: '100g',
    badge: '100% CARNE',
    image: 'https://lh3.googleusercontent.com/d/1F-I2oBYFlChpF7B-zP198W6wL5HEwLVJ',
    description: 'Tiras de carne muscular de ternera magra, curadas al aire sin sal, azúcares ni conservantes artificiales. Fáciles de fraccionar, ideales para entrenamiento.',
    ingredients: [
      '100% Carne muscular de ternera'
    ],
    nutritionalValue: 'Proteína: 74.2%, Grasa: 8.9%, Humedad: 10.4%'
  },
  {
    id: 'p13',
    name: 'Orejas de Cerdo Premium',
    category: 'snack',
    price: 5900,
    weight: '3 uds',
    badge: 'MASTICACIÓN LARGA',
    image: 'https://lh3.googleusercontent.com/d/18ONLaR3MrqUqN8EPgbCChGXy7wiMhXTZ',
    description: 'Un clásico de la masticación recreativa. Limpia el sarro de los dientes por fricción mecánica, fortalece las mandíbulas y satisface el instinto de morder de forma segura.',
    ingredients: [
      '100% Oreja de cerdo deshidratada al horno'
    ],
    nutritionalValue: 'Proteína: 68.3%, Grasa: 19.5%, Humedad: 6.2%'
  },
  {
    id: 'p14',
    name: 'Hígado de Pollo Freeze-Dried',
    category: 'snack',
    price: 8200,
    weight: '80g',
    badge: 'MÁXIMA PALATABILIDAD',
    image: 'https://lh3.googleusercontent.com/d/1HPnvT6lCzf3wp8Fxm1iEEIHrY3URR9L_',
    description: 'Hígado de pollo liofilizado (freeze-dried), proceso que conserva el 100% del sabor, olor y nutrientes originales. Es irresistible incluso para las mascotas más inapetentes.',
    ingredients: [
      '100% Hígado de pollo criogénicamente deshidratado'
    ],
    nutritionalValue: 'Proteína: 65.5%, Grasa: 12.1%, Humedad: 5.1%'
  },
  {
    id: 'p15',
    name: 'Tráquea de Ternera Masticable',
    category: 'snack',
    price: 7500,
    weight: '150g',
    badge: 'ALTO EN COLÁGENO',
    image: 'https://lh3.googleusercontent.com/d/1F-I2oBYFlChpF7B-zP198W6wL5HEwLVJ',
    description: 'Anillos de tráquea de ternera ricos en glucosamina y condroitina natural. Promueve la salud articular y ofrece un entretenimiento sano y desestresante.',
    ingredients: [
      '100% Tráquea de ternera deshidratada'
    ],
    nutritionalValue: 'Proteína: 54%, Grasa: 22%, Humedad: 7.5%'
  },

  // --- CUIDADO NATURAL ---
  {
    id: 'p16',
    name: 'Bálsamo de Trufa & Almohadillas',
    category: 'cuidado',
    price: 12900,
    weight: '50ml',
    badge: 'BIO ORGÁNICO',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=500',
    description: 'Bálsamo 100% orgánico y apto para lamer. Repara e hidrata profundamente almohadillas agrietadas, trufa seca, codos ásperos y cicatrices.',
    ingredients: [
      'Manteca de karité ecológica',
      'Aceite de caléndula cicatrizante',
      'Cera de abejas pura de apicultura sostenible',
      'Aceite de germen de trigo y vitamina E'
    ],
    nutritionalValue: '100% Natural, Libre de Parabenos, Siliconas y Perfumes Sintéticos.'
  },
  {
    id: 'p17',
    name: 'Champú Sólido de Avena & Aloe',
    category: 'cuidado',
    price: 9800,
    weight: '100g',
    badge: 'ZERO WASTE',
    image: 'https://images.unsplash.com/photo-1607006342411-92427a3b4425?auto=format&fit=crop&q=80&w=500',
    description: 'Champú en pastilla sólida hipoalergénico y biodegradable. Alivia los picores de pieles sensibles, hidrata el pelaje y tiene un aroma natural sumamente agradable.',
    ingredients: [
      'Extracto de avena coloidal calmante',
      'Gel de aloe vera puro',
      'Aceite de coco saponificado',
      'Aceite esencial de manzanilla'
    ],
    nutritionalValue: 'pH neutro adaptado a la piel de perros y gatos.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Carlos Mendoza',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    date: 'hace 2 semanas',
    text: '¡El cambio en mi Golden Retriever ha sido increíble! Su pelo brilla como nunca y las alergias desaparecieron por completo.',
    petType: 'perro'
  },
  {
    id: 'r2',
    name: 'Marta Soler',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    date: 'hace 1 mes',
    text: 'Mis tres gatos devoran el menú de Pollo y Conejo. Tienen muchísima más energía y sus digestiones son perfectas.',
    petType: 'gato'
  },
  {
    id: 'r3',
    name: 'Andrés López',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    date: 'hace 2 meses',
    text: 'La calculadora de raciones dio exactamente en el clavo. Los menús congelados vienen muy bien presentados y frescos.',
    petType: 'perro'
  },
  {
    id: 'r4',
    name: 'Sofía Garzón',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    rating: 4,
    date: 'hace 3 semanas',
    text: 'El aceite de salmón noruego y los snacks de boquerón son un acierto total. El brillo de su pelo es de otro nivel.',
    petType: 'gato'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Qué es exactamente la alimentación B.A.R.F?',
    answer: 'B.A.R.F. (Biologically Appropriate Raw Food / Alimentos Crudos Biológicamente Adecuados) consiste en alimentar a nuestros perros y gatos con la dieta que la naturaleza diseñó para ellos: carnes musculares crudas, huesos carnosos, órganos ricos en nutrientes, frutas y verduras seleccionadas. Todo crudo, fresco y libre de conservantes o cereales ultraprocesados.'
  },
  {
    id: 'faq-2',
    question: '¿Cómo realizo la transición de pienso seco a comida B.A.R.F?',
    answer: 'La transición debe ser amigable y segura. Para perros jóvenes y sanos, aconsejamos un día de ayuno (solo agua) para vaciar su sistema digestivo de los residuos del pienso seco. Posteriormente, se inicia con un menú monoproteico suave como el Pollo Premium durante 3-5 días y se van incorporando nuevas proteínas paulatinamente. Para gatos y cachorros, la transición se puede hacer mezclando o templando ligeramente el alimento inicialmente, sin hervir los huesos.'
  },
  {
    id: 'faq-3',
    question: '¿Cómo llega el alimento congelado y cómo se conserva?',
    answer: 'Nuestros menús se ultracongelan instantáneamente a -40°C para retener los nutrientes y eliminar bacterias de forma natural. Los enviamos a tu domicilio en vehículos con refrigeración activa que garantizan mantener una temperatura constante de -18°C. Una vez que lo recibas, debes guardarlo de inmediato en el congelador. Solo descongela en la nevera la ración que consumirás en las próximas 24-48 horas.'
  },
  {
    id: 'faq-4',
    question: '¿Los huesos triturados son peligrosos para mi mascota?',
    answer: '¡Absolutamente no! Los huesos cocinados o astillados son peligrosos porque pierden humedad y se vuelven rígidos. En los menús BON DOG, los huesos carnosos están crudos y se trituran a un tamaño milimétrico sumamente seguro y asimilable. Estos huesos triturados crudos son la fuente biológica idónea de calcio, fósforo y colágeno para perros y gatos.'
  },
  {
    id: 'faq-5',
    question: '¿Es apto para mascotas con sensibilidad alimentaria o alergias?',
    answer: 'Sí, la dieta B.A.R.F. es el mejor tratamiento natural contra las alergias, ya que elimina por completo aditivos, saborizantes químicos y harinas refinadas de relleno. Ofrecemos menús monoproteicos (como nuestro Menú de Ternera o Menú de Pavo) que facilitan dietas de exclusión para diagnosticar y evitar intolerancias alimentarias de forma limpia.'
  }
];
