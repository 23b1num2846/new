export default function BusinessSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border p-4 shadow-sm"
        >
          <div className="h-48 bg-zinc-200 rounded-xl mb-4" />
          <div className="h-4 bg-zinc-200 rounded w-2/3 mb-2" />
          <div className="h-4 bg-zinc-200 rounded w-1/3 mb-4" />
          <div className="h-3 bg-zinc-200 rounded w-full mb-1" />
          <div className="h-3 bg-zinc-200 rounded w-full mb-1" />
          <div className="h-3 bg-zinc-200 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}
