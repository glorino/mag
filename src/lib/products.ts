export interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  badge?: string;
  image: string;
  images: { url: string; isFeatured: boolean }[];
  description: string;
  sizes: string[];
  colors?: string[];
  details: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ankara Wrap Blouse",
    price: "₦28,500",
    priceNum: 28500,
    category: "Shirt",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&h=800&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&h=800&fit=crop", isFeatured: true },
      { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop", isFeatured: false },
    ],
    description: "A beautifully crafted wrap blouse that combines comfort with African elegance. Perfect for casual outings or work wear.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Blue", "Green", "Gold", "Wine"],
    details: ["100% African wax print fabric", "Machine washable", "True to size", "Model wears size M"],
  },
  {
    id: 2,
    name: "Adire Peplum Blouse",
    price: "₦32,000",
    priceNum: 32000,
    category: "Shirt",
    badge: "New",
    image: "https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=600&h=800&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=600&h=800&fit=crop", isFeatured: true },
      { url: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1619078398088-58fc42e2a531?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop", isFeatured: false },
    ],
    description: "Stylish adire peplum blouse with modern tailoring. The perfect blend of comfort and contemporary African fashion.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blue", "White", "Navy", "Grey"],
    details: ["Premium adire cotton", "Relaxed fit", "Hand wash recommended", "Model wears size M"],
  },
  {
    id: 3,
    name: "High-Waist Palazzo Trouser",
    price: "₦35,000",
    priceNum: 35000,
    category: "Trouser",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1627577279497-4b24bf1021b6?w=600&h=800&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1627577279497-4b24bf1021b6?w=600&h=800&fit=crop", isFeatured: true },
      { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=800&fit=crop", isFeatured: false },
    ],
    description: "Elegant high-waist palazzo trousers that elongate your silhouette. Flowing and comfortable for all-day wear.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Beige", "Navy", "Grey"],
    details: ["Premium cotton blend", "High-waisted", "Side pockets", "Machine washable"],
  },
  {
    id: 4,
    name: "Ankara Straight Trouser",
    price: "₦25,000",
    priceNum: 25000,
    category: "Trouser",
    badge: "New",
    image: "https://images.unsplash.com/photo-1614786269829-d24616faf56d?w=600&h=800&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1614786269829-d24616faf56d?w=600&h=800&fit=crop", isFeatured: true },
      { url: "https://images.unsplash.com/photo-1604859133617-3b4b1b1f0e16?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=800&fit=crop", isFeatured: false },
    ],
    description: "Straight-fit ankara trousers with bold prints. A statement piece that celebrates African heritage.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Red", "Blue", "Green", "Orange"],
    details: ["100% ankara fabric", "Straight fit", "Machine washable", "Model wears size M"],
  },
  {
    id: 5,
    name: "Lace Trim Knicker Set",
    price: "₦18,500",
    priceNum: 18500,
    category: "Nicker",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1493655430214-3dd7718460bb?w=600&h=800&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1493655430214-3dd7718460bb?w=600&h=800&fit=crop", isFeatured: true },
      { url: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop", isFeatured: false },
    ],
    description: "Comfortable and stylish knicker set with delicate lace trim. Soft cotton for all-day comfort.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Pink", "Black", "White", "Red"],
    details: ["Soft cotton fabric", "Lace trim detail", "Elastic waistband", "Hand wash recommended"],
  },
  {
    id: 6,
    name: "Printed Lounge Short",
    price: "₦12,000",
    priceNum: 12000,
    category: "Nicker",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&h=800&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&h=800&fit=crop", isFeatured: true },
      { url: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=800&fit=crop", isFeatured: false },
    ],
    description: "Relaxed-fit lounge shorts with African print. Perfect for lounging or everyday comfort.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "Red", "Green", "Black"],
    details: ["Soft cotton fabric", "Relaxed fit", "Elastic waistband", "Machine washable"],
  },
  {
    id: 7,
    name: "Off-Shoulder Ruffle Blouse",
    price: "₦38,000",
    priceNum: 38000,
    category: "Shirt",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1627577279474-b87fe8490617?w=600&h=800&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1627577279474-b87fe8490617?w=600&h=800&fit=crop", isFeatured: true },
      { url: "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&h=800&fit=crop", isFeatured: false },
    ],
    description: "A statement off-shoulder blouse with ruffle details. Bold design meets modern elegance.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Wine", "Gold"],
    details: ["Premium fabric", "Off-shoulder design", "Ruffle detail", "Dry clean only"],
  },
  {
    id: 8,
    name: "Wide-Leg Ankara Trouser",
    price: "₦30,000",
    priceNum: 30000,
    category: "Trouser",
    image: "https://images.unsplash.com/photo-1634826260499-7d97a6049913?w=600&h=800&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1634826260499-7d97a6049913?w=600&h=800&fit=crop", isFeatured: true },
      { url: "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop", isFeatured: false },
    ],
    description: "Wide-leg ankara trousers with exquisite craftsmanship. Designed for the woman who appreciates luxury.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Green", "Blue", "Red", "Orange"],
    details: ["Premium ankara fabric", "Wide-leg silhouette", "High-waisted", "Dry clean only"],
  },
  {
    id: 9,
    name: "Cotton Brief Set",
    price: "₦15,000",
    priceNum: 15000,
    category: "Nicker",
    badge: "New",
    image: "https://images.unsplash.com/photo-1623193904311-9c50a928bdf9?w=600&h=800&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1623193904311-9c50a928bdf9?w=600&h=800&fit=crop", isFeatured: true },
      { url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop", isFeatured: false },
    ],
    description: "Classic cotton brief set with vibrant African prints. Comfort meets style for everyday wear.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Pink", "White", "Black", "Teal"],
    details: ["100% cotton", "Breathable fabric", "Elastic waistband", "Machine washable"],
  },
  {
    id: 10,
    name: "Embroidered Tunic Blouse",
    price: "₦42,000",
    priceNum: 42000,
    category: "Shirt",
    image: "https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?w=600&h=800&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?w=600&h=800&fit=crop", isFeatured: true },
      { url: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop", isFeatured: false },
    ],
    description: "Hand-embroidered tunic blouse with flowing silhouette. Perfect for special occasions.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Gold", "Wine", "Navy", "Cream"],
    details: ["Premium silk blend", "Hand-embroidered", "Full length", "Dry clean recommended"],
  },
  {
    id: 11,
    name: "Culotte Trouser",
    price: "₦22,000",
    priceNum: 22000,
    category: "Trouser",
    image: "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=600&h=800&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=600&h=800&fit=crop", isFeatured: true },
      { url: "https://images.unsplash.com/photo-1604859133617-3b4b1b1f0e16?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=800&fit=crop", isFeatured: false },
    ],
    description: "Trendy culotte trousers that hit mid-calf. A wardrobe essential for the modern woman.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey", "Beige", "Navy"],
    details: ["Stretch fabric", "Mid-calf length", "Machine washable", "Model wears size M"],
  },
  {
    id: 12,
    name: "Silk Lounge Knicker",
    price: "₦20,000",
    priceNum: 20000,
    category: "Nicker",
    image: "https://images.unsplash.com/photo-1592595293637-8557fa6d3c64?w=600&h=800&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1592595293637-8557fa6d3c64?w=600&h=800&fit=crop", isFeatured: true },
      { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop", isFeatured: false },
      { url: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600&h=800&fit=crop", isFeatured: false },
    ],
    description: "Luxurious silk lounge knicker with tie waist. Ultimate comfort meets elegance.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Pink", "Cream", "Wine"],
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
