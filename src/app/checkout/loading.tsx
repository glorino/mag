export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-8 bg-gray-100 w-48 mb-8 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6 animate-pulse">
            <div className="h-6 bg-gray-100 w-40" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-100 w-full" />
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-6 animate-pulse">
            <div className="h-6 bg-gray-100 w-32 mb-6" />
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-16 h-20 bg-gray-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-100 w-3/4" />
                    <div className="h-3 bg-gray-100 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-100 w-20" />
                <div className="h-4 bg-gray-100 w-16" />
              </div>
              <div className="h-10 bg-gray-100 w-full mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
