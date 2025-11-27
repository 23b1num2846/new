import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const API_URL = "http://localhost:3001";

export async function getReviews(page = 1, limit = 12) {
  const res = await fetch(`${API_URL}/reviews?page=${page}&limit=${limit}`);
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`);
  return res.json();
}

// shadcn: merge Tailwind classes with conditional values
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
