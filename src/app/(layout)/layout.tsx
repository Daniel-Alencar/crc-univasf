'use client';

import React from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-[100]">
        <Header />
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}