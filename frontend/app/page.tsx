// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/marketing/Header';
import HeroSection from '@/components/marketing/HeroSection';
import FeaturesSection from '@/components/marketing/FeaturesSection';
import HowItWorksSection from '@/components/marketing/HowItWorksSection';
import CTASection from '@/components/marketing/CTASection';
import ContactSection from '@/components/marketing/ContactSection';
import Footer from '@/components/marketing/Footer';
import ScrollTopButton from '@/components/ui/ScrollTopButton';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ContactSection />
      <CTASection />
      <Footer />
      <ScrollTopButton />
    </main>
  );
}