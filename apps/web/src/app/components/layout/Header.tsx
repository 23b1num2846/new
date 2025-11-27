import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-600">
          Шар Дэвтэр
        </Link>
        <nav className="flex gap-6 text-zinc-700">
          <Link href="/">Нүүр</Link>
          <Link href="/business">Бизнесүүд</Link>
          <Link href="/reviews">Сэтгэгдлүүд</Link>
        </nav>
        <Link
          href="/login"
          className="px-4 py-2 bg-white text-black rounded-lg"
        >
          Нэвтрэх
        </Link>
      </div>
    </header>
  );
}
