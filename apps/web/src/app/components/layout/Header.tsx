import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-600">
          YellowBook
        </Link>
        <nav className="flex gap-6 text-zinc-700">
          <Link href="/">Home</Link>
          <Link href="/businesses">Businesses</Link>
          <Link href="/reviews">Reviews</Link>
        </nav>
        <Link
          href="/login"
          className="px-4 py-2 bg-white text-black rounded-lg"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
