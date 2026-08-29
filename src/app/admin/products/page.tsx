"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductImage {
  url: string;
  isFeatured: boolean;
}

interface Product {
  id: number;
  name: string;
  price: string | number;
  category_id: number | null;
  category_name?: string;
  description?: string;
  sizes: string[];
  colors?: string[];
  badge?: string;
  image_url?: string;
  images?: ProductImage[];
  stock?: number;
  is_active?: boolean;
  created_at: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];

const allColors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#DC2626" },
  { name: "Blue", hex: "#2563EB" },
  { name: "Green", hex: "#16A34A" },
  { name: "Yellow", hex: "#EAB308" },
  { name: "Pink", hex: "#EC4899" },
  { name: "Purple", hex: "#9333EA" },
  { name: "Orange", hex: "#EA580C" },
  { name: "Brown", hex: "#92400E" },
  { name: "Grey", hex: "#6B7280" },
  { name: "Navy", hex: "#1E3A5F" },
  { name: "Beige", hex: "#D4C5A9" },
  { name: "Maroon", hex: "#7F1D1D" },
  { name: "Teal", hex: "#0D9488" },
  { name: "Gold", hex: "#B8860B" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "Cream", hex: "#FFFDD0" },
  { name: "Wine", hex: "#722F37" },
];

const emptyForm = {
  name: "",
  price: "",
  category_id: "",
  description: "",
  sizes: [] as string[],
  colors: [] as string[],
  badge: "",
  image_url: "",
  images: [] as ProductImage[],
  stock: "10",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [page, setPage] = useState(1);
  const [hasNewUploads, setHasNewUploads] = useState(false);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const PER_PAGE = 10;

  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setSaveError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = () => {
    fetch("/api/admin/categories", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {
        // Categories fetch failed
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category_name || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setHasNewUploads(false);
    setNewImageUrls([]);
  };

  const openEdit = (p: Product) => {
    const existingImages = p.images && p.images.length > 0
      ? p.images
      : p.image_url
        ? [{ url: p.image_url, isFeatured: true }]
        : [];
    setForm({
      name: p.name,
      price: String(p.price),
      category_id: p.category_id ? String(p.category_id) : "",
      description: p.description || "",
      sizes: p.sizes || [],
      colors: p.colors || [],
      badge: p.badge || "",
      image_url: p.image_url || "",
      images: existingImages,
      stock: String(p.stock ?? 10),
    });
    setEditingId(p.id);
    setShowForm(true);
    setHasNewUploads(false);
    setNewImageUrls([]);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/admin/products/${editingId}` : "/api/admin/products";
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category_id", form.category_id);
      formData.append("description", form.description);
      formData.append("sizes", JSON.stringify(form.sizes));
      formData.append("colors", JSON.stringify(form.colors));
      formData.append("badge", form.badge);
      formData.append("stock", form.stock);
      if (editingId && !hasNewUploads) {
        formData.append("skip_images_update", "true");
        formData.append("images", "[]");
        formData.append("image_url", "");
      } else if (editingId && hasNewUploads) {
        const newImages = newImageUrls.map((url, i) => ({
          url,
          isFeatured: i === 0,
        }));
        formData.append("images", JSON.stringify(newImages));
        formData.append("image_url", newImages[0]?.url || "");
      } else {
        formData.append("image_url", form.image_url);
        formData.append("images", JSON.stringify(form.images));
      }

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        setPage(1);
        await fetchProducts();
      } else {
        setSaveError(data.error || "Failed to save product");
      }
    } catch (err) {
      console.error(err);
      setSaveError("An error occurred. Please try again.");
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      alert("Failed to delete product");
      return;
    }
    setPage(1);
    await fetchProducts();
  };

  const toggleActive = async (p: Product) => {
    const res = await fetch(`/api/admin/products/${p.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ is_active: !p.is_active }),
    });
    if (!res.ok) {
      alert("Failed to update product status");
      return;
    }
    await fetchProducts();
  };

  const toggleSize = (size: string) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }));
  };

  const toggleColor = (color: string) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.includes(color) ? prev.colors.filter((c) => c !== color) : [...prev.colors, color],
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressed = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const img = new window.Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const MAX = 800;
              let w = img.width;
              let h = img.height;
              if (w > MAX || h > MAX) {
                if (w > h) { h = Math.round((h * MAX) / w); w = MAX; }
                else { w = Math.round((w * MAX) / h); h = MAX; }
              }
              canvas.width = w;
              canvas.height = h;
              const ctx = canvas.getContext("2d")!;
              ctx.drawImage(img, 0, 0, w, h);
              resolve(canvas.toDataURL("image/jpeg", 0.8));
            };
            img.onerror = reject;
            img.src = ev.target?.result as string;
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        setForm((prev) => {
          const newImages = [...prev.images, { url: compressed, isFeatured: prev.images.length === 0 }];
          return { ...prev, images: newImages, image_url: newImages.find((img) => img.isFeatured)?.url || "" };
        });
        setHasNewUploads(true);
        setNewImageUrls((prev) => [...prev, compressed]);
      }
    } catch {
      alert("Failed to process image. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setForm((prev) => {
      const newImages = prev.images.filter((_, i) => i !== index);
      if (prev.images[index]?.isFeatured && newImages.length > 0) {
        newImages[0].isFeatured = true;
      }
      return {
        ...prev,
        images: newImages,
        image_url: newImages.find((img) => img.isFeatured)?.url || "",
      };
    });
  };

  const setFeaturedImage = (index: number) => {
    setForm((prev) => {
      const newImages = prev.images.map((img, i) => ({ ...img, isFeatured: i === index }));
      return {
        ...prev,
        images: newImages,
        image_url: newImages[index]?.url || "",
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-white/40 text-sm mt-1">Manage your product catalog</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.open("/api/admin/export?type=products", "_blank")}
            className="px-4 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/15 transition-colors border border-white/10 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Export CSV
          </button>
          <button
            onClick={openAdd}
            className="px-4 py-2.5 bg-accent text-black text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full bg-[#111] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
        />
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {editingId ? "Edit Product" : "Add Product"}
                </h3>
                <button
                  onClick={() => { setShowForm(false); setEditingId(null); setSaveError(""); }}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors"
                    placeholder="Product name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Price (₦)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Category</label>
                  <select
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Badge</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors"
                    placeholder="e.g. New, Bestseller"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Product Images</label>
                  <div className="flex gap-3 items-start">
                    <div className="flex-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className={`flex items-center justify-center gap-2 w-full bg-black border border-dashed border-white/20 rounded-lg px-4 py-4 text-sm text-white/40 hover:border-accent/50 hover:text-white/60 transition-colors cursor-pointer ${uploading ? "opacity-50 pointer-events-none" : ""}`}
                      >
                        {uploading ? (
                          <>
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Click to upload images (select multiple)
                          </>
                        )}
                      </label>
                      <p className="text-[11px] text-white/25 mt-1">JPEG, PNG, WebP or GIF. Max 5MB each. Select multiple files at once.</p>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={form.images.length > 0 ? "" : form.image_url}
                        onChange={(e) => {
                          const url = e.target.value;
                          if (url) {
                            setForm((prev) => ({
                              ...prev,
                              images: [...prev.images, { url, isFeatured: prev.images.length === 0 }],
                              image_url: "",
                            }));
                          }
                        }}
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors"
                        placeholder="Or paste image URL and press Enter"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input = e.target as HTMLInputElement;
                            const url = input.value.trim();
                            if (url) {
                              setForm((prev) => ({
                                ...prev,
                                images: [...prev.images, { url, isFeatured: prev.images.length === 0 }],
                                image_url: "",
                              }));
                              input.value = "";
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  {form.images.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {form.images.map((img, index) => (
                        <div key={index} className={`relative group rounded-lg overflow-hidden border-2 transition-colors ${img.isFeatured ? "border-accent" : "border-white/10"}`}>
                          <img
                            src={img.url}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-28 object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => setFeaturedImage(index)}
                              className={`px-2 py-1 text-[10px] font-bold rounded transition-colors ${img.isFeatured ? "bg-accent text-black" : "bg-white/20 text-white hover:bg-white/30"}`}
                            >
                              {img.isFeatured ? "★ Featured" : "Set Featured"}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="px-2 py-1 text-[10px] font-bold rounded bg-red-500/80 text-white hover:bg-red-500 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                          {img.isFeatured && (
                            <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-accent text-black text-[9px] font-bold rounded">FEATURED</span>
                          )}
                          <span className="absolute top-1 right-1 px-1.5 py-0.5 bg-black/60 text-white text-[9px] font-medium rounded">{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors resize-none"
                  placeholder="Product description"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                        form.sizes.includes(size)
                          ? "bg-accent text-black border-accent"
                          : "bg-black text-white/50 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Colours</label>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => toggleColor(color.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                        form.colors.includes(color.name)
                          ? "bg-accent text-black border-accent"
                          : "bg-black text-white/50 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border flex-shrink-0"
                        style={{ backgroundColor: color.hex, borderColor: color.hex === "#FFFFFF" ? "#555" : color.hex }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving || !form.name || !form.price || !form.category_id}
                  className="px-6 py-2.5 bg-accent text-black text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : editingId ? "Update Product" : "Add Product"}
                </button>
                <button
                  onClick={() => { setShowForm(false); setEditingId(null); setSaveError(""); }}
                  className="px-6 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/15 transition-colors border border-white/10"
                >
                  Cancel
                </button>
              </div>
              {saveError && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 mt-2">
                  {saveError}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Product</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Price</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Stock</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="h-10 bg-white/5 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-white/30">
                    {search ? "No products match your search" : "No products yet"}
                  </td>
                </tr>
              ) : (
                paginated.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">No img</div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{product.name}</p>
                          {product.badge && (
                            <span className="text-[10px] font-semibold text-accent bg-accent/10 px-1.5 py-0.5 rounded">{product.badge}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">{product.category_name || "—"}</td>
                    <td className="px-6 py-4 text-sm text-accent font-semibold">₦{Number(product.price).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${(product.stock ?? 0) > 0 ? "text-white/60" : "text-red-400"}`}>
                        {product.stock ?? "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActive(product)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          product.is_active !== false ? "bg-accent" : "bg-white/20"
                        }`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                          product.is_active !== false ? "translate-x-[18px]" : "translate-x-[2px]"
                        }`} />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-1.5 text-white/40 hover:text-accent transition-colors rounded-lg hover:bg-white/5"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1.5 text-white/40 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > PER_PAGE && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <p className="text-sm text-white/40">
              Showing {(safePage - 1) * PER_PAGE + 1}–{Math.min(safePage * PER_PAGE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
                .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "..." ? (
                    <span key={`dots-${i}`} className="text-white/30 px-1">...</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p as number)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                        safePage === p
                          ? "bg-accent text-black"
                          : "border border-white/10 text-white/50 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
