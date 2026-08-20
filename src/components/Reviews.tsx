"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Review {
  id: number;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function Reviews({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/reviews?productId=${productId}`)
      .then((res) => res.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to submit review");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="mt-16 pt-12 border-t border-border">
      <div className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">Customer Reviews</h2>
        <div className="w-10 h-[2px] bg-accent mb-4" />
        {reviews.length > 0 ? (
          <div className="flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className={`w-5 h-5 ${s <= Math.round(avgRating) ? "text-accent" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-text text-[13px]">{avgRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
          </div>
        ) : (
          <p className="text-text text-[13px]">No reviews yet. Be the first to review this product!</p>
        )}
      </div>

      {/* Review list */}
      <div className="space-y-6 mb-12">
        {reviews.map((review) => (
          <div key={review.id} className="bg-cream p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-charcoal text-[14px]">{review.customer_name}</p>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? "text-accent" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-text-light text-[11px]">{new Date(review.created_at).toLocaleDateString()}</p>
            </div>
            {review.comment && <p className="text-text text-[13px] leading-relaxed">{review.comment}</p>}
          </div>
        ))}
      </div>

      {/* Write a review */}
      {!submitted ? (
        <div className="bg-white p-8 border border-border">
          <h3 className="text-lg font-serif font-bold text-charcoal mb-4">Write a Review</h3>
          {error && <p className="text-red-500 text-[13px] mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[12px] font-medium text-text mb-2 uppercase tracking-wide">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHoveredStar(s)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="p-0.5"
                  >
                    <svg className={`w-7 h-7 transition-colors ${(hoveredStar || rating) >= s ? "text-accent" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-text mb-2 uppercase tracking-wide">Comment (optional)</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-5 py-4 border border-border bg-white text-charcoal text-[14px] placeholder:text-text-light focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Share your experience with this product..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting || rating === 0}
              className="bg-accent text-black px-8 py-4 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-cream p-8 border border-border text-center">
          <svg className="w-10 h-10 text-accent mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-lg font-serif font-bold text-charcoal mb-2">Thank You!</h3>
          <p className="text-text text-[13px]">Your review has been submitted and will appear after approval.</p>
        </motion.div>
      )}
    </div>
  );
}
