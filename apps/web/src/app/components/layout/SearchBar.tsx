"use client";

import { Input } from "@/app/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  onSearch?: (q: string) => void;
  defaultValue?: string;
};

type Suggestion = {
  id: string;
  name: string;
  category?: { name?: string | null } | null;
};

export default function SearchBar({ onSearch, defaultValue = "" }: Props) {
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    fetch(
      `http://localhost:3333/api/business/search?q=${encodeURIComponent(query)}&limit=5`,
      { signal: controller.signal }
    )
      .then((r) => r.json())
      .then((data) => {
        setSuggestions(data?.data ?? []);
        setOpen(true);
      })
      .catch(() => {
        if (!controller.signal.aborted) setSuggestions([]);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query]);

  const triggerSearch = (value: string) => {
    const q = value.trim();
    if (!q) return;
    onSearch?.(q);
    router.push(`/business/search?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="relative flex items-center gap-2 bg-white text-zinc-900 shadow-lg p-3 rounded-full border">
        <Search className="text-zinc-500 ml-3" />
        <Input
          placeholder="Бизнесийн нэр, ангилал, байршил..."
          className="border-none focus-visible:ring-0 text-lg text-zinc-900 placeholder:text-zinc-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(suggestions.length > 0)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              triggerSearch(query);
            }
          }}
        />

        <button
          className="rounded-full px-6 h-12 text-base"
          onClick={() => triggerSearch(query)}
        >
          Хайх
        </button>
      </div>

      {open && (
        <div className="relative">
          <div className="absolute left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-20">
            {loading && (
              <div className="flex items-center gap-2 px-4 py-3 text-sm text-zinc-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                Хайж байна...
              </div>
            )}

            {!loading && suggestions.length === 0 && (
              <div className="px-4 py-3 text-sm text-zinc-500">Үр дүн олдсонгүй</div>
            )}

            {!loading &&
              suggestions.map((s) => (
                <Link
                  key={s.id}
                  href={`/business/${s.id}`}
                  className="block px-4 py-3 hover:bg-zinc-100"
                  onClick={() => setOpen(false)}
                >
                  <div className="font-medium text-zinc-900">{s.name}</div>
                  {s.category?.name && (
                    <div className="text-xs text-zinc-500">{s.category.name}</div>
                  )}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
