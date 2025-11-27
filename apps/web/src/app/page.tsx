
"use client";

import { useState } from "react";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import Hero from "@/app/components/home/Hero";
import CategoryGrid from "@/app/components/home/CategoryGrid";
import RecentReviews from "@/app/components/home/RecentReviews";
import BusinessGrid from "./components/business/BusinessGrid";

export default function Home() {
  const [, setSearchQuery] = useState("");

  function handleSearch(q: string) {
    setSearchQuery(q);
    // Search page рүү үсрүүлэх бол router.push(`/search?q=${q}`)
  }

  return (
    <div>
      <Header />
      <Hero onSearch={handleSearch} />
      <RecentReviews />
      <CategoryGrid />
      <BusinessGrid />
      <Footer />
    </div>
  );
}
