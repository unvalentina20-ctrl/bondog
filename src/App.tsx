/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Benefits from './components/Benefits';
import Snacks from './components/Snacks';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import { Product, CartItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activePetTab, setActivePetTab] = useState<'perro' | 'gato'>('perro');

  // Load cart from localStorage initially
  useEffect(() => {
    const savedCart = localStorage.getItem('voldog_cart_items');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from storage', e);
      }
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('voldog_cart_items', JSON.stringify(newCart));
  };

  const handleAddToCart = (product: Product) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      saveCart([...cart, { product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    const updated = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const handleRemoveItem = (productId: string) => {
    const updated = cart.filter((item) => item.product.id !== productId);
    saveCart(updated);
  };

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

  // Handle visual tab selection from other parts of the site (e.g. Hero, Categories)
  const handleSelectPetType = (type: 'perro' | 'gato') => {
    setActivePetTab(type);
  };

  const handleSelectCategory = (catId: string) => {
    if (catId === 'perro' || catId === 'gato') {
      setActivePetTab(catId);
    }
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white relative">
      {/* 2. NAVBAR */}
      <Navbar
        cartItemsCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onScrollTo={scrollToSection}
      />

      {/* 3. HERO SECTION */}
      <Hero
        onSelectPetType={handleSelectPetType}
        activePetType={activePetTab}
        onOpenCart={() => setCartOpen(true)}
        cartItemsCount={cartCount}
      />

      {/* 6. FEATURED PRODUCTS STORE */}
      <Products
        activeTab={activePetTab}
        setActiveTab={setActivePetTab}
        onAddToCart={handleAddToCart}
      />

      {/* 7. BENEFITS */}
      <Benefits onScrollTo={scrollToSection} />

      {/* 8. SNACKS AND TREATS */}
      <Snacks onAddToCart={handleAddToCart} onScrollTo={scrollToSection} />

      {/* 9. CUSTOMER REVIEWS */}
      <Reviews />

      {/* 10. FAQ ACCORDION */}
      <FAQ />

      {/* 12. FOOTER */}
      <Footer onScrollTo={scrollToSection} />

      {/* CART DRAWER SLIDE-OVER */}
      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
