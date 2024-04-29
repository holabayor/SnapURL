import React from 'react';
import Footer from '@/components/Footer';
import Logo from '@/components/header/Logo';
import ThemeToggle from '@/components/ThemeToggle';

const AuthLayout = ({ children }) => {
  return (
    <>
      <header className="container mx-auto p-2 xs:p-4 flex items-center justify-between border-b-2">
        <Logo />
        <ThemeToggle />
      </header>
      <main className="flex-1 container mx-auto">{children}</main>
      <Footer />
    </>
  );
};

export default AuthLayout;
