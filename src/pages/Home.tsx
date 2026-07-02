import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Benefits from '../components/Benefits';
import Snacks from '../components/Snacks';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import CartModal from '../components/CartModal';
import { Product, CartItem } from '../types';

interface HomeProps {
  cart: CartItem[];
  cartCount: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function Home({
  cart,
  cartCount,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: HomeProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [activePetTab, setActivePetTab] = useState<'perro' | 'gato'>('perro');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Smooth scroll handler targeting elements with custom offset for the sticky header
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectPetType = (type: 'perro' | 'gato') => {
    setActivePetTab(type);
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar
        cartItemsCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onScrollTo={scrollToSection}
      />
      <Hero
        onSelectPetType={handleSelectPetType}
        activePetType={activePetTab}
        onOpenCart={() => setCartOpen(true)}
        cartItemsCount={cartCount}
      />
      <Products
        activeTab={activePetTab}
        setActiveTab={setActivePetTab}
        onAddToCart={onAddToCart}
        cart={cart}
        onUpdateQuantity={onUpdateQuantity}
      />
      <Benefits onScrollTo={scrollToSection} />
      <Snacks 
        onAddToCart={onAddToCart} 
        onScrollTo={scrollToSection} 
        cart={cart}
        onUpdateQuantity={onUpdateQuantity}
      />
      <Reviews />
      <FAQ />
      <Footer onScrollTo={scrollToSection} />

      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
        onClearCart={onClearCart}
      />
    </div>
  );
}
