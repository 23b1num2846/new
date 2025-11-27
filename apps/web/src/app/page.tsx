"use client";

import { useRouter } from "next/navigation";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import Hero from "@/app/components/home/Hero";
import CategoryGrid from "@/app/components/home/CategoryGrid";
import RecentReviews from "@/app/components/home/RecentReviews";
import BusinessGrid from "./components/business/BusinessGrid";

export default function Home() {
  const router = useRouter();

  function handleSearch(q: string) {
    if (!q.trim()) return;
    router.push(`/business/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-12">
      <Header />
      <Hero onSearch={handleSearch} />
      <RecentReviews />
      <CategoryGrid />
      <BusinessGrid />
      <Footer />
    </div>
  );
}
