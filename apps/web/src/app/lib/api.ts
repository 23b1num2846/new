import type { BusinessDto, CategoryDto, ReviewDto } from "@/app/types/contract";

const rawBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
const API_BASE = rawBase.replace(/\/$/, "");
const SHOULD_MOCK =
  process.env.MOCK_API_FALLBACK === "true" ||
  process.env.CI === "true" ||
  API_BASE === "mock";

const mockReviews: ReviewDto[] = [
  {
    id: "rev-1",
    rating: 5,
    text: "Great mock spot with friendly service and fast Wi‑Fi.",
    useful: 3,
    funny: 1,
    cool: 2,
    createdAt: new Date().toISOString(),
    userId: "user-1",
    businessId: "biz-1",
    photos: [{ id: "photo-1", url: "https://picsum.photos/seed/rev/400/250" }],
    ratings: [],
  },
];

const mockBusinesses: BusinessDto[] = [
  {
    id: "biz-1",
    name: "Mock Bistro",
    description: "A sample listing used when the API is unavailable.",
    address: "123 Demo St, Sample City",
    phone: "000-000-0000",
    email: "hello@mockbistro.test",
    website: "https://example.com",
    location: "0,0",
    facebookUrl: "https://facebook.com/mockbistro",
    instagramUrl: "https://instagram.com/mockbistro",
    timetable: "Mon-Fri 9:00-17:00",
    logoUrl: "https://picsum.photos/seed/bistro/1200/600",
    categoryId: "cat-1",
    reviews: mockReviews,
  },
  {
    id: "biz-2",
    name: "Placeholder Cafe",
    description: "Coffee, snacks, and a comfortable atmosphere.",
    address: "456 Placeholder Ave, Sample City",
    phone: "111-111-1111",
    email: "hi@placeholdercafe.test",
    website: "https://example.com/cafe",
    location: "0,0",
    facebookUrl: "https://facebook.com/placeholdercafe",
    instagramUrl: "https://instagram.com/placeholdercafe",
    timetable: "Daily 08:00-20:00",
    logoUrl: "https://picsum.photos/seed/cafe/1200/600",
    categoryId: "cat-1",
    reviews: [],
  },
];

const mockCategories: CategoryDto[] = [
  { id: "cat-1", name: "General", icon: "sparkles" },
];

const mockRecentReviews = [
  {
    id: "rev-1",
    businessId: "biz-1",
    business: { name: "Mock Bistro" },
    userId: "user-1",
    user: { name: "Alex Example", avatarUrl: null },
    photos: [{ id: "photo-1", url: "https://picsum.photos/seed/rev/400/250" }],
    ratings: [],
    rating: 5,
    createdAt: new Date().toISOString(),
    text: "Tasty sandwiches and quiet seating. Perfect mock data experience.",
    useful: 3,
    funny: 1,
    cool: 2,
  },
];

export const mockData = {
  businesses: mockBusinesses,
  categories: mockCategories,
  reviews: mockRecentReviews,
  businessList: { data: mockBusinesses },
  categoryList: { data: mockCategories },
};

export const apiUrl = (path: string) =>
  `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

export async function fetchJson<T>(
  path: string,
  init?: RequestInit,
  fallback?: T
): Promise<T> {
  if (SHOULD_MOCK && fallback !== undefined) {
    return fallback;
  }

  try {
    const res = await fetch(apiUrl(path), init);
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    return (await res.json()) as T;
  } catch (error) {
    if (fallback !== undefined) {
      console.warn(`Using mock data for ${path}`, error);
      return fallback;
    }
    throw error;
  }
}

export function pickBusiness(id: string) {
  return mockBusinesses.find((b) => b.id === id);
}

export function shouldMockApi() {
  return SHOULD_MOCK;
}
