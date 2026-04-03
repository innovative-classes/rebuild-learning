export default function AssessmentsLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-8">
        <div className="h-7 bg-green-200/50 rounded w-52 mb-2" />
        <div className="h-4 bg-green-100/50 rounded w-72" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-green-200/50">
            <div className="h-4 bg-green-200/50 rounded w-24 mb-3" />
            <div className="h-5 bg-green-200/50 rounded w-40 mb-2" />
            <div className="h-3 bg-green-100/50 rounded w-full mb-1" />
            <div className="h-3 bg-green-100/50 rounded w-3/4 mb-4" />
            <div className="h-9 bg-green-100/50 rounded w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
