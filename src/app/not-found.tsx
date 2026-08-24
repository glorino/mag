import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-accent mb-4" style={{ fontFamily: "var(--font-playfair)" }}>404</h1>
        <h2 className="text-2xl font-bold text-charcoal mb-3">Page Not Found</h2>
        <p className="text-text-light text-sm mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-charcoal text-white px-8 py-3 text-[12px] font-bold tracking-wider uppercase hover:bg-charcoal/90 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="border border-charcoal text-charcoal px-8 py-3 text-[12px] font-bold tracking-wider uppercase hover:bg-charcoal hover:text-white transition-colors"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
