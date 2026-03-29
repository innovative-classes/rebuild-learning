export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      {/* Welcome */}
      <div className="mb-8">
        <div className="h-7 bg-neutral-200 rounded w-60 mb-2" />
        <div className="h-4 bg-neutral-100 rounded w-80" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neutral-100 rounded-lg" />
              <div>
                <div className="h-7 bg-neutral-200 rounded w-12 mb-1" />
                <div className="h-3 bg-neutral-100 rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-neutral-200">
        <div className="px-6 py-4 border-b border-neutral-200">
          <div className="h-5 bg-neutral-200 rounded w-32" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="px-6 py-4 border-b border-neutral-100 last:border-b-0">
            <div className="h-4 bg-neutral-200 rounded w-48 mb-2" />
            <div className="h-3 bg-neutral-100 rounded w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
