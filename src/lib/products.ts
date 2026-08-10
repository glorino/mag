export interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  badge?: string;
  image: string;
  description: string;
  sizes: string[];
  details: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Oyin Wrap Set",
    price: "₦42,500",
    priceNum: 42500,
    category: "Tops & Sets",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    description: "A beautifully crafted wrap set that combines comfort with African elegance. Perfect for casual outings or special occasions.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["100% African wax print fabric", "Machine washable", "True to size", "Model wears size M"],
  },
  {
    id: 2,
    name: "Ada Culottes Set",
    price: "₦38,000",
    priceNum: 38000,
    category: "Tops & Sets",
    badge: "New",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=800&fit=crop",
    description: "Stylish culottes set with matching top. The perfect blend of comfort and contemporary African fashion.",
    sizes: ["S", "M", "L", "XL"],
    details: ["Premium cotton blend", "Relaxed fit", "Hand wash recommended", "Model wears size M"],
  },
  {
    id: 3,
    name: "Oliha Kaftan",
    price: "₦86,500",
    priceNum: 86500,
    category: "Kaftans",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
    description: "An elegant kaftan with intricate detailing. Flowing silhouette perfect for special events and celebrations.",
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    details: ["Premium silk blend", "Full length", "Side pockets", "Dry clean only"],
  },
  {
    id: 4,
    name: "Sally Ankara Dress",
    price: "₦45,000",
    priceNum: 45000,
    category: "Dresses",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
    description: "A stunning ankara dress with modern tailoring. Flattering silhouette that celebrates African heritage.",
    sizes: ["S", "M", "L", "XL"],
    details: ["100% ankara fabric", "Lined bodice", "Machine washable", "Model wears size M"],
  },
  {
    id: 5,
    name: "Anni Co-ord Set",
    price: "₦52,000",
    priceNum: 52000,
    category: "Tops & Sets",
    badge: "New",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
    description: "A trendy co-ord set that makes a statement. Mix and match or wear together for maximum impact.",
    sizes: ["S", "M", "L", "XL"],
    details: ["Stretch cotton fabric", "High-waisted pants", "Crop top", "Hand wash recommended"],
  },
  {
    id: 6,
    name: "Kele Wrap Top",
    price: "₦28,500",
    priceNum: 28500,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=800&fit=crop",
    description: "A versatile wrap top that pairs perfectly with jeans, skirts, or trousers. Effortlessly stylish.",
    sizes: ["S", "M", "L", "XL"],
    details: ["Soft cotton fabric", "Wrap design", "Machine washable", "Model wears size M"],
  },
  {
    id: 7,
    name: "Kimono Jacket",
    price: "₦35,000",
    priceNum: 35000,
    category: "Tops & Jackets",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop",
    description: "A statement kimono jacket that transforms any outfit. Bold patterns meet modern design.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Lightweight fabric", "One size fits most", "Open front", "Dry clean only"],
  },
  {
    id: 8,
    name: "Amadi Kaftan",
    price: "₦86,500",
    priceNum: 86500,
    category: "Kaftans",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop",
    description: "A premium kaftan with exquisite craftsmanship. Designed for the woman who appreciates luxury.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Premium silk blend", "Hand-embroidered details", "Full length", "Dry clean only"],
  },
  {
    id: 9,
    name: "Zainab Ankara Gown",
    price: "₦55,000",
    priceNum: 55000,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=800&fit=crop",
    description: "A flowing ankara gown perfect for weddings, parties, and special occasions.",
    sizes: ["S", "M", "L", "XL"],
    details: ["Premium ankara fabric", "Floor length", "Lined", "Dry clean recommended"],
  },
  {
    id: 10,
    name: "Nneka Palazzo Set",
    price: "₦48,000",
    priceNum: 48000,
    category: "Tops & Sets",
    badge: "New",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop",
    description: "Wide-leg palazzo pants with matching crop top. Comfort meets high fashion.",
    sizes: ["S", "M", "L", "XL"],
    details: ["Flowy fabric", "High-waisted", "Crop top", "Hand wash recommended"],
  },
  {
    id: 11,
    name: "Adire Indigo Dress",
    price: "₦42,000",
    priceNum: 42000,
    category: "Adire",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop",
    description: "Traditional adire dye technique meets modern dress design. Each piece is uniquely crafted.",
    sizes: ["S", "M", "L", "XL"],
    details: ["Hand-dyed adire fabric", "Cotton", "Machine washable", "Model wears size M"],
  },
  {
    id: 12,
    name: "Funke Wide Leg Trousers",
    price: "₦32,000",
    priceNum: 32000,
    category: "Trousers",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=800&fit=crop",
    description: "Flattering wide-leg trousers that elongate your silhouette. A wardrobe essential.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: ["Stretch fabric", "High-waisted", "Machine washable", "Model wears size M"],
  },
];

export function getProduct(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}
