import React from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/Header';

function Home() {
  return (
    <>
      <Header />
      <h1 className="text-2xl">Home Page</h1>
      <p>Welcome to the home page!</p>
      <ThemeToggle />
    </>
  );
}

export default Home;
