const mongoose = require('mongoose');
const env = require('../config/env.config');
const Product = require('../modules/products/product.model');

const products = [
  {
    title: "Men's Black Oversized T-shirt",
    description: "Designed for everyday ease and style, this black oversized tee is crafted from heavyweight cotton jersey. It features dropped shoulders and a boxy silhouette for a modern, relaxed aesthetic.",
    highlights: [
      "100% Premium Organic Cotton",
      "Heavyweight fabric (240 GSM)",
      "Ribbed crewneck collar",
      "Pre-shrunk to retain shape and fit",
      "Made ethically and sustainably"
    ],
    price: 56.00,
    isFeatured: true,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600",
      filename: "featured-black-tshirt.jpg"
    },
    variants: [
      {
        color: { name: "Ink Black", hex: "#111111" },
        images: [
          { url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600", filename: "black-tshirt-ink-1.jpg" },
          { url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600", filename: "black-tshirt-ink-2.jpg" },
          { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600", filename: "black-tshirt-ink-3.jpg" },
          { url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600", filename: "black-tshirt-ink-4.jpg" },
          { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600", filename: "black-tshirt-ink-5.jpg" }
        ],
        sizes: [
          { size: "XS", stock: 10 },
          { size: "S", stock: 15 },
          { size: "M", stock: 20 },
          { size: "L", stock: 25 },
          { size: "XL", stock: 15 },
          { size: "XXL", stock: 5 }
        ]
      },
      {
        color: { name: "Nordic Beige", hex: "#dcd2c4" },
        images: [
          { url: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=600", filename: "black-tshirt-beige-1.jpg" },
          { url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600", filename: "black-tshirt-beige-2.jpg" },
          { url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600", filename: "black-tshirt-beige-3.jpg" },
          { url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600", filename: "black-tshirt-beige-4.jpg" },
          { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600", filename: "black-tshirt-beige-5.jpg" }
        ],
        sizes: [
          { size: "S", stock: 10 },
          { size: "M", stock: 15 },
          { size: "L", stock: 12 }
        ]
      }
    ]
  },
  {
    title: "Classic Oxford Cotton Shirt",
    description: "A timeless wardrobe essential, this classic Oxford cotton shirt is woven from durable, breathable cotton. Featuring a button-down collar and tailored fit, it transitions seamlessly from office to weekend.",
    highlights: [
      "100% Premium Oxford Cotton",
      "Breathable, midweight fabric",
      "Button-down collar",
      "Adjustable button cuffs",
      "Machine washable"
    ],
    price: 65.00,
    isFeatured: true,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600",
      filename: "featured-oxford-shirt.jpg"
    },
    variants: [
      {
        color: { name: "Light Blue", hex: "#add8e6" },
        images: [
          { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600", filename: "oxford-blue-1.jpg" },
          { url: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=600", filename: "oxford-blue-2.jpg" },
          { url: "https://images.unsplash.com/photo-1621072156002-e2fcc10d9714?q=80&w=600", filename: "oxford-blue-3.jpg" },
          { url: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600", filename: "oxford-blue-4.jpg" },
          { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600", filename: "oxford-blue-5.jpg" }
        ],
        sizes: [
          { size: "S", stock: 8 },
          { size: "M", stock: 12 },
          { size: "L", stock: 15 },
          { size: "XL", stock: 10 }
        ]
      },
      {
        color: { name: "Classic White", hex: "#ffffff" },
        images: [
          { url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600", filename: "oxford-white-1.jpg" },
          { url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600", filename: "oxford-white-2.jpg" },
          { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600", filename: "oxford-white-3.jpg" },
          { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600", filename: "oxford-white-4.jpg" },
          { url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600", filename: "oxford-white-5.jpg" }
        ],
        sizes: [
          { size: "S", stock: 10 },
          { size: "M", stock: 15 },
          { size: "L", stock: 18 },
          { size: "XL", stock: 8 }
        ]
      }
    ]
  },
  {
    title: "Vintage Denim Shirt",
    description: "Crafted from durable medium-wash denim, this vintage-inspired shirt offers a rugged yet refined casual look. It features western-style chest pockets and classic snap buttons.",
    highlights: [
      "100% Cotton denim",
      "Authentic medium and light washes",
      "Double chest flap pockets",
      "Snap button closures",
      "Fitted silhouette"
    ],
    price: 72.00,
    isFeatured: false,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600",
      filename: "featured-denim-shirt.jpg"
    },
    variants: [
      {
        color: { name: "Indigo Wash", hex: "#3f5a7a" },
        images: [
          { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600", filename: "denim-indigo-1.jpg" },
          { url: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=600", filename: "denim-indigo-2.jpg" },
          { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600", filename: "denim-indigo-3.jpg" },
          { url: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=600", filename: "denim-indigo-4.jpg" },
          { url: "https://images.unsplash.com/photo-1621072156002-e2fcc10d9714?q=80&w=600", filename: "denim-indigo-5.jpg" }
        ],
        sizes: [
          { size: "S", stock: 5 },
          { size: "M", stock: 10 },
          { size: "L", stock: 10 },
          { size: "XL", stock: 5 }
        ]
      }
    ]
  },
  {
    title: "Premium Striped Polo Shirt",
    description: "Upgrade your smart-casual options with this striped polo shirt. Made from ultra-soft knit cotton piqué, it features a clean polo collar and horizontal chest stripes.",
    highlights: [
      "Premium cotton piqué knit",
      "Soft knit ribbed collar and cuffs",
      "Classic two-button placket",
      "Horizontal chest stripe detailing",
      "Regular fit"
    ],
    price: 48.00,
    isFeatured: false,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600",
      filename: "featured-striped-polo.jpg"
    },
    variants: [
      {
        color: { name: "Navy/White Stripes", hex: "#1d2a44" },
        images: [
          { url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600", filename: "striped-polo-1.jpg" },
          { url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600", filename: "striped-polo-2.jpg" },
          { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600", filename: "striped-polo-3.jpg" },
          { url: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600", filename: "striped-polo-4.jpg" },
          { url: "https://images.unsplash.com/photo-1621072156002-e2fcc10d9714?q=80&w=600", filename: "striped-polo-5.jpg" }
        ],
        sizes: [
          { size: "S", stock: 12 },
          { size: "M", stock: 20 },
          { size: "L", stock: 18 },
          { size: "XL", stock: 10 }
        ]
      }
    ]
  },
  {
    title: "Almost Friday Graphic Tee",
    description: "Start the weekend mood early with this casual graphic tee. Cut from ultra-soft combed cotton, it features a custom minimalist graphic print on the chest.",
    highlights: [
      "100% Combed ringspun cotton",
      "Midweight soft-touch jersey",
      "High-density durable graphic print",
      "Reinforced shoulder stitching",
      "Machine wash warm with like colors"
    ],
    price: 32.00,
    isFeatured: true,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600",
      filename: "featured-graphic-tee.jpg"
    },
    variants: [
      {
        color: { name: "Faded Black", hex: "#2e2e2e" },
        images: [
          { url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600", filename: "graphic-black-1.jpg" },
          { url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600", filename: "graphic-black-2.jpg" },
          { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600", filename: "graphic-black-3.jpg" },
          { url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600", filename: "graphic-black-4.jpg" },
          { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600", filename: "graphic-black-5.jpg" }
        ],
        sizes: [
          { size: "XS", stock: 15 },
          { size: "S", stock: 25 },
          { size: "M", stock: 30 },
          { size: "L", stock: 20 },
          { size: "XL", stock: 10 }
        ]
      },
      {
        color: { name: "Optic White", hex: "#ffffff" },
        images: [
          { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600", filename: "graphic-white-1.jpg" },
          { url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600", filename: "graphic-white-2.jpg" },
          { url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600", filename: "graphic-white-3.jpg" },
          { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600", filename: "graphic-white-4.jpg" },
          { url: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=600", filename: "graphic-white-5.jpg" }
        ],
        sizes: [
          { size: "S", stock: 15 },
          { size: "M", stock: 20 },
          { size: "L", stock: 15 }
        ]
      }
    ]
  },
  {
    title: "Regular Fit Checks Shirt",
    description: "A versatile wardrobe staple, this regular fit checkered shirt is crafted from soft brushed cotton flannel, offering warmth and comfort for casual styling.",
    highlights: [
      "100% Brushed cotton flannel",
      "Button-down collar",
      "Single chest patch pocket",
      "Two-button adjustable cuffs",
      "Warm iron, machine wash cold"
    ],
    price: 74.00,
    isFeatured: false,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=600",
      filename: "featured-check-shirt.jpg"
    },
    variants: [
      {
        color: { name: "Forest Plaid", hex: "#2d4436" },
        images: [
          { url: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=600", filename: "check-forest-1.jpg" },
          { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600", filename: "check-forest-2.jpg" },
          { url: "https://images.unsplash.com/photo-1621072156002-e2fcc10d9714?q=80&w=600", filename: "check-forest-3.jpg" },
          { url: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600", filename: "check-forest-4.jpg" },
          { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600", filename: "check-forest-5.jpg" }
        ],
        sizes: [
          { size: "S", stock: 8 },
          { size: "M", stock: 15 },
          { size: "L", stock: 12 },
          { size: "XL", stock: 6 }
        ]
      }
    ]
  },
  {
    title: "Nordic Beige Polo T-Shirt",
    description: "A refined take on the classic polo. Featuring a modern zipper placket, fine contrast collar tipping, and knit cuffs, this polo is made from breathable cotton piqué.",
    highlights: [
      "Breathable cotton piqué knit",
      "Contrast collar tipping design",
      "Premium zipper placket closure",
      "Tailored fit with ribbed sleeve bands",
      "Machine wash cold, dry in shade"
    ],
    price: 32.00,
    isFeatured: true,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600",
      filename: "featured-beige-polo.jpg"
    },
    variants: [
      {
        color: { name: "Nordic Beige", hex: "#dcd2c4" },
        images: [
          { url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600", filename: "polo-beige-1.jpg" },
          { url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600", filename: "polo-beige-2.jpg" },
          { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600", filename: "polo-beige-3.jpg" },
          { url: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600", filename: "polo-beige-4.jpg" },
          { url: "https://images.unsplash.com/photo-1621072156002-e2fcc10d9714?q=80&w=600", filename: "polo-beige-5.jpg" }
        ],
        sizes: [
          { size: "XS", stock: 10 },
          { size: "S", stock: 15 },
          { size: "M", stock: 20 },
          { size: "L", stock: 15 },
          { size: "XL", stock: 10 }
        ]
      }
    ]
  },
  {
    title: "Beige Graphic Printed Oversized T-shirt",
    description: "Elevate your street style with this high-density graphic print oversized tee. Cut in a boxy fit from heavy premium cotton, this shirt is detailed with a subtle drop-shoulder seam.",
    highlights: [
      "100% Heavyweight organic cotton",
      "250 GSM premium knit jersey",
      "Durable screen print detail on chest & back",
      "Ribbed mock-neck collar",
      "Wash inside out, do not iron on print"
    ],
    price: 100.00,
    isFeatured: true,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=600",
      filename: "featured-oversized-tshirt.jpg"
    },
    variants: [
      {
        color: { name: "Nordic Beige", hex: "#dcd2c4" },
        images: [
          { url: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=600", filename: "oversized-tshirt-1.jpg" },
          { url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600", filename: "oversized-tshirt-2.jpg" },
          { url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600", filename: "oversized-tshirt-3.jpg" },
          { url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600", filename: "oversized-tshirt-4.jpg" },
          { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600", filename: "oversized-tshirt-5.jpg" }
        ],
        sizes: [
          { size: "XS", stock: 5 },
          { size: "S", stock: 12 },
          { size: "M", stock: 18 },
          { size: "L", stock: 15 },
          { size: "XL", stock: 8 }
        ]
      }
    ]
  }
];

async function seedDatabase() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(env.MONGO_URI);
    console.log("Connected to MongoDB Atlas!");

    console.log("Clearing existing products...");
    await Product.deleteMany({});
    console.log("Existing products cleared.");

    console.log("Inserting sample products...");
    const createdProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${createdProducts.length} products!`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
