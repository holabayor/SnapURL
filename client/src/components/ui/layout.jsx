import React from 'react';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-layout container mx-auto px-2 sm:px-4 md:px-16">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
