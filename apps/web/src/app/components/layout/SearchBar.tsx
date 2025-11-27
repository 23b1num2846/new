"use client";

import { Input } from "@/app/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 flex items-center gap-2 bg-white shadow-lg p-3 rounded-full border">
      <Search className="text-zinc-500 ml-3" />
      <Input
        placeholder="Search for a place, category, or name..."
        className="border-none focus-visible:ring-0 text-lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        className="rounded-full px-6 h-12 text-base"
        onClick={() => onSearch(query)}
      >
        Search
      </button>
    </div>
  );
}
