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
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}