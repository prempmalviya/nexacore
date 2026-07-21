"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import AnimatedButton from "./ui/AnimatedButton";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Properties", href: "/properties" },
  { title: "Services", href: "/services" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Animation variants for the mobile drawer menu
  const menuVariants = {
    initial: { scaleY: 0, opacity: 0 },
    animate: { 
      scaleY: 1, 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.12, 0, 0.39, 0] }
    },
    exit: { 
      scaleY: 0, 
      opacity: 0,
      transition: { duration: 0.3, ease: [0.12, 0, 0.39, 1] }
    }
  };

  // Animation variants for individual links cascading in
  const containerVariants = {
    initial: { transition: { staggerChildren: 0.05,订staggerDirection: -1 } },
    animate: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } }
  };

  const linkVariants = {
    initial: { y: "30vh", opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0, 0.55, 0.45, 1] } }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight">
          NEXACORE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {link.title}
            </Link>
          ))}
          <AnimatedButton>Login</AnimatedButton>
          <AnimatedButton>Add Property</AnimatedButton>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-foreground focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Animated Overlay Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-16 w-full h-[calc(100vh-4rem)] bg-background origin-top px-10 py-12 md:hidden"
          >
            <motion.nav
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="flex flex-col gap-6 h-full"
            >
              {navLinks.map((link) => (
                <div key={link.title} className="overflow-hidden">
                  <motion.div variants={linkVariants}>
                    <Link
                      href={link.href}
                      onClick={toggleMenu}
                      className="text-3xl font-semibold tracking-wide hover:text-primary transition-colors block py-2"
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                </div>
              ))}
              <div className="mx-auto flex flex-col gap-4 overflow-hidden">
                <AnimatedButton onClick={toggleMenu}>Login</AnimatedButton>
                <AnimatedButton onClick={toggleMenu}>Add Property</AnimatedButton>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}