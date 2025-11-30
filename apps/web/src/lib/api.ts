export const API_URL = "http://localhost:3001";

export async function getReviews(page = 1, limit = 12) {
  const res = await fetch(`${API_URL}/reviews?page=${page}&limit=${limit}`);
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`);
  return res.json();
}

// Simple class merge helper without external deps
export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}
