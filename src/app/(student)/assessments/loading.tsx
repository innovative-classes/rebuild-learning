export default function AssessmentsLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-8">
        <div className="h-7 bg-neutral-200 rounded w-52 mb-2" />
        <div className="h-4 bg-neutral-100 rounded w-72" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-neutral-200">
            <div className="h-4 bg-neutral-200 rounded w-24 mb-3" />
            <div className="h-5 bg-neutral-200 rounded w-40 mb-2" />
            <div className="h-3 bg-neutral-100 rounded w-full mb-1" />
            <div className="h-3 bg-neutral-100 rounded w-3/4 mb-4" />
            <div className="h-9 bg-neutral-100 rounded w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
