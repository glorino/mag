"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Review {
  id: number;
  product_id: number;
  product_name?: string;
  user_id: number;
  customer_name: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const toggleApproval = async (id: number, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ is_approved: !current }),
      });
      if (res.ok) fetchReviews();
    } catch {
      // ignore
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this review?")) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchReviews();
    } catch {
      // ignore
    }
  };

  const filtered = reviews.filter((r) => {
    if (filter === "pending") return !r.is_approved;
    if (filter === "approved") return r.is_approved;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Reviews</h1>
          <p className="text-white/50 text-[13px] mt-1">Manage customer reviews</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {(["all", "pending", "approved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-[12px] font-bold uppercase tracking-wider transition-colors ${
              filter === f ? "bg-white text-black" : "bg-white/10 border border-white/15 text-white/60 hover:text-white"
            }`}
          >
            {f} ({reviews.filter((r) => f === "all" || (f === "pending" && !r.is_approved) || (f === "approved" && r.is_approved)).length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/40 text-lg">No reviews found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#111] border border-white/10 p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-[13px]">{review.customer_name}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      review.is_approved ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-400"
                    }`}>
                      {review.is_approved ? "Approved" : "Pending"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400" : "text-white/15"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-[12px] text-white/40 ml-1">
                      Product #{review.product_id}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-white/40">
                  {new Date(review.created_at).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}
                </span>
              </div>
              {review.comment && (
                <p className="text-[13px] text-white/70 mb-4">{review.comment}</p>
              )}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleApproval(review.id, review.is_approved)}
                  className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    review.is_approved
                      ? "bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25"
                      : "bg-green-500/15 text-green-400 hover:bg-green-500/25"
                  }`}
                >
                  {review.is_approved ? "Unapprove" : "Approve"}
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
