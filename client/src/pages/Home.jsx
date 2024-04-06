import React from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/Header';
import Layout from '@/components/ui/layout';
import { Input } from '@/components/ui/input';
import History from '@/components/History';

function Home() {
  return (
    <Layout>
      <Header />
      <h1 className="text-2xl">Home Page</h1>
      <p>Welcome to the home page!</p>
      <ThemeToggle />
      <Input />
      <History />
    </Layout>
  );
}

export default Home;
