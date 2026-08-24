export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-pulse">
            <div className="aspect-[3/4] bg-gray-100 mb-4" />
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100" />
              ))}
            </div>
          </div>
          <div className="space-y-6 animate-pulse">
            <div className="h-3 bg-gray-100 w-20" />
            <div className="h-8 bg-gray-100 w-3/4" />
            <div className="h-6 bg-gray-100 w-24" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-100 w-full" />
              <div className="h-3 bg-gray-100 w-5/6" />
              <div className="h-3 bg-gray-100 w-4/6" />
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 bg-gray-100" />
              ))}
            </div>
            <div className="h-12 bg-gray-100 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
