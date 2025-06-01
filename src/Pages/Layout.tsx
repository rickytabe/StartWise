import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/HomePage/Nav';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16"> 
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;