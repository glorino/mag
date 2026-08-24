export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="h-8 bg-gray-100 w-48 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-50 w-32 animate-pulse" />
        </div>
        <div className="flex gap-3 mb-8 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-gray-100 w-24" />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white border border-gray-100 animate-pulse">
              <div className="aspect-[3/4] bg-gray-100" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-100 w-16" />
                <div className="h-4 bg-gray-100 w-full" />
                <div className="h-4 bg-gray-100 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
