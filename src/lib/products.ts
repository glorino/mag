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
    name: "Ankara Wrap Blouse",
    price: "₦28,500",
    priceNum: 28500,
    category: "Blouses",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&h=800&fit=crop",
    description: "A beautifully crafted wrap blouse that combines comfort with African elegance. Perfect for casual outings or work wear.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    details: ["100% African wax print fabric", "Machine washable", "True to size", "Model wears size M"],
  },
  {
    id: 2,
    name: "Adire Peplum Blouse",
    price: "₦32,000",
    priceNum: 32000,
    category: "Blouses",
    badge: "New",
    image: "https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=600&h=800&fit=crop",
    description: "Stylish adire peplum blouse with modern tailoring. The perfect blend of comfort and contemporary African fashion.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["Premium adire cotton", "Relaxed fit", "Hand wash recommended", "Model wears size M"],
  },
  {
    id: 3,
    name: "High-Waist Palazzo Trouser",
    price: "₦35,000",
    priceNum: 35000,
    category: "Trousers",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1627577279497-4b24bf1021b6?w=600&h=800&fit=crop",
    description: "Elegant high-waist palazzo trousers that elongate your silhouette. Flowing and comfortable for all-day wear.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    details: ["Premium cotton blend", "High-waisted", "Side pockets", "Machine washable"],
  },
  {
    id: 4,
    name: "Ankara Straight Trouser",
    price: "₦25,000",
    priceNum: 25000,
    category: "Trousers",
    badge: "New",
    image: "https://images.unsplash.com/photo-1614786269829-d24616faf56d?w=600&h=800&fit=crop",
    description: "Straight-fit ankara trousers with bold prints. A statement piece that celebrates African heritage.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% ankara fabric", "Straight fit", "Machine washable", "Model wears size M"],
  },
  {
    id: 5,
    name: "Lace Trim Knicker Set",
    price: "₦18,500",
    priceNum: 18500,
    category: "Loungewear",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1493655430214-3dd7718460bb?w=600&h=800&fit=crop",
    description: "Comfortable and stylish knicker set with delicate lace trim. Soft cotton for all-day comfort.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["Soft cotton fabric", "Lace trim detail", "Elastic waistband", "Hand wash recommended"],
  },
  {
    id: 6,
    name: "Printed Lounge Short",
    price: "₦12,000",
    priceNum: 12000,
    category: "Loungewear",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&h=800&fit=crop",
    description: "Relaxed-fit lounge shorts with African print. Perfect for lounging or everyday comfort.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    details: ["Soft cotton fabric", "Relaxed fit", "Elastic waistband", "Machine washable"],
  },
  {
    id: 7,
    name: "Off-Shoulder Ruffle Blouse",
    price: "₦38,000",
    priceNum: 38000,
    category: "Blouses",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1627577279474-b87fe8490617?w=600&h=800&fit=crop",
    description: "A statement off-shoulder blouse with ruffle details. Bold design meets modern elegance.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["Premium fabric", "Off-shoulder design", "Ruffle detail", "Dry clean only"],
  },
  {
    id: 8,
    name: "Wide-Leg Ankara Trouser",
    price: "₦30,000",
    priceNum: 30000,
    category: "Trousers",
    image: "https://images.unsplash.com/photo-1634826260499-7d97a6049913?w=600&h=800&fit=crop",
    description: "Wide-leg ankara trousers with exquisite craftsmanship. Designed for the woman who appreciates luxury.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    details: ["Premium ankara fabric", "Wide-leg silhouette", "High-waisted", "Dry clean only"],
  },
  {
    id: 9,
    name: "Cotton Brief Set",
    price: "₦15,000",
    priceNum: 15000,
    category: "Loungewear",
    badge: "New",
    image: "https://images.unsplash.com/photo-1623193904311-9c50a928bdf9?w=600&h=800&fit=crop",
    description: "Classic cotton brief set with vibrant African prints. Comfort meets style for everyday wear.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["100% cotton", "Breathable fabric", "Elastic waistband", "Machine washable"],
  },
  {
    id: 10,
    name: "Embroidered Tunic Blouse",
    price: "₦42,000",
    priceNum: 42000,
    category: "Blouses",
    image: "https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?w=600&h=800&fit=crop",
    description: "Hand-embroidered tunic blouse with flowing silhouette. Perfect for special occasions.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["Premium silk blend", "Hand-embroidered", "Full length", "Dry clean recommended"],
  },
  {
    id: 11,
    name: "Culotte Trouser",
    price: "₦22,000",
    priceNum: 22000,
    category: "Trousers",
    image: "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=600&h=800&fit=crop",
    description: "Trendy culotte trousers that hit mid-calf. A wardrobe essential for the modern woman.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    details: ["Stretch fabric", "Mid-calf length", "Machine washable", "Model wears size M"],
  },
  {
    id: 12,
    name: "Silk Lounge Knicker",
    price: "₦20,000",
    priceNum: 20000,
    category: "Loungewear",
    image: "https://images.unsplash.com/photo-1592595293637-8557fa6d3c64?w=600&h=800&fit=crop",
    description: "Luxurious silk lounge knicker with tie waist. Ultimate comfort meets elegance.",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: ["Silk blend fabric", "Tie waist", "Relaxed fit", "Hand wash only"],
  },
];

export function getProduct(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}
