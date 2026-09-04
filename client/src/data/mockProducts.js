import poloT from "../assets/products/poloT.webp";
import oversizedTshirt from "../assets/products/oversized-tshirt.webp";
import mensBlackOversized from "../assets/products/mens-black-oversized.webp";
import oversizedt from "../assets/products/oversizedt.jpg";
import checkshirt from "../assets/products/checkshirt.webp";
import blazer from "../assets/products/blazer.png";
import culotte from "../assets/products/culotte.png";
import knitwear from "../assets/products/knitwear.png";
import topImg from "../assets/products/top.webp";
import trousers from "../assets/products/trousers.png";

export const mockProducts = [
  {
    _id: "prod-1",
    title: "Contrast Tipping Zipper Polo T-Shirt",
    price: 1299,
    oldPrice: 1599,
    description: "A refined take on the classic polo. Featuring a modern quarter-zip front and contrast collar tipping, cut in breathable structured pique cotton for an elevated casual feel.",
    highlights: [
      "100% Premium Combed Cotton Pique",
      "Metallic quarter-zip front placket",
      "Contrast ribbed collar and sleeve cuffs",
      "Regular comfortable fit"
    ],
    featuredImage: { url: poloT, filename: "poloT.webp" },
    variants: [
      {
        color: { name: "Sage Green", hex: "#556B2F" },
        images: [
          { url: poloT, filename: "poloT-1.webp" },
          { url: oversizedTshirt, filename: "poloT-2.webp" },
          { url: mensBlackOversized, filename: "poloT-3.webp" }
        ],
        sizes: [
          { size: "S", stock: 12 },
          { size: "M", stock: 8 },
          { size: "L", stock: 5 },
          { size: "XL", stock: 0 },
          { size: "XXL", stock: 3 }
        ]
      },
      {
        color: { name: "Midnight Black", hex: "#1C1C1C" },
        images: [
          { url: mensBlackOversized, filename: "poloT-black.webp" },
          { url: poloT, filename: "poloT-black-2.webp" }
        ],
        sizes: [
          { size: "S", stock: 4 },
          { size: "M", stock: 15 },
          { size: "L", stock: 7 },
          { size: "XL", stock: 2 }
        ]
      },
      {
        color: { name: "Charcoal", hex: "#36454F" },
        images: [
          { url: oversizedt, filename: "poloT-charcoal.jpg" },
          { url: poloT, filename: "poloT-charcoal-2.webp" }
        ],
        sizes: [
          { size: "S", stock: 6 },
          { size: "M", stock: 6 },
          { size: "L", stock: 4 }
        ]
      }
    ]
  },
  {
    _id: "prod-2",
    title: "Heavyweight Boxy Oversized Tee",
    price: 899,
    oldPrice: 1199,
    description: "Engineered with a dense 240 GSM organic jersey cotton, dropped shoulders, and a thick ribbed collar for the quintessential relaxed silhouette.",
    highlights: [
      "240 GSM 100% Organic Heavyweight Cotton",
      "Boxy oversized streetwear silhouette",
      "Pre-shrunk fabric to preserve drape and fit",
      "Twin-needle stitching throughout"
    ],
    featuredImage: { url: oversizedTshirt, filename: "oversized-tshirt.webp" },
    variants: [
      {
        color: { name: "Off White", hex: "#F8F8F6" },
        images: [
          { url: oversizedTshirt, filename: "oversized-1.webp" },
          { url: oversizedt, filename: "oversized-2.jpg" }
        ],
        sizes: [
          { size: "S", stock: 10 },
          { size: "M", stock: 14 },
          { size: "L", stock: 12 },
          { size: "XL", stock: 5 }
        ]
      },
      {
        color: { name: "Washed Slate", hex: "#4A5568" },
        images: [
          { url: mensBlackOversized, filename: "oversized-black.webp" }
        ],
        sizes: [
          { size: "S", stock: 8 },
          { size: "M", stock: 9 },
          { size: "L", stock: 3 }
        ]
      }
    ]
  },
  {
    _id: "prod-3",
    title: "Relaxed Fit Plaid Check Flannel Shirt",
    price: 1899,
    oldPrice: 2299,
    description: "Brushed cotton flannel woven with classic checks. Soft to the touch, easy to layer over tees or under jackets for transition seasons.",
    highlights: [
      "100% Brushed Soft Cotton Flannel",
      "Button-down collar and chest patch pockets",
      "Subtle curved hemline",
      "Machine washable"
    ],
    featuredImage: { url: checkshirt, filename: "checkshirt.webp" },
    variants: [
      {
        color: { name: "Forest Plaid", hex: "#2E4F4F" },
        images: [
          { url: checkshirt, filename: "checkshirt-1.webp" },
          { url: poloT, filename: "checkshirt-2.webp" }
        ],
        sizes: [
          { size: "S", stock: 5 },
          { size: "M", stock: 7 },
          { size: "L", stock: 11 },
          { size: "XL", stock: 4 }
        ]
      }
    ]
  },
  {
    _id: "prod-4",
    title: "Tailored Minimalist Wool Blazer",
    price: 3499,
    oldPrice: 4299,
    description: "Structured silhouette with soft shoulder padding and clean lapels. Versatile enough to dress up with trousers or dress down with denim.",
    highlights: [
      "Premium wool blend with satin interior lining",
      "Modern notch lapel with single breasted closure",
      "Interior welt passport pocket",
      "Dry clean only"
    ],
    featuredImage: { url: blazer, filename: "blazer.png" },
    variants: [
      {
        color: { name: "Onyx Black", hex: "#1A1A1A" },
        images: [
          { url: blazer, filename: "blazer-1.png" },
          { url: knitwear, filename: "blazer-2.png" }
        ],
        sizes: [
          { size: "38R", stock: 3 },
          { size: "40R", stock: 6 },
          { size: "42R", stock: 4 }
        ]
      }
    ]
  },
  {
    _id: "prod-5",
    title: "Fine Gauge Merino Knitwear Sweater",
    price: 2199,
    oldPrice: 2699,
    description: "Spun from ultra-fine Australian merino wool with natural temperature-regulating properties and a luxurious silky touch.",
    highlights: [
      "100% Extra Fine Merino Wool",
      "Ribbed crew neckline, cuffs, and hem",
      "Lightweight yet warm",
      "Breathable and odor resistant"
    ],
    featuredImage: { url: knitwear, filename: "knitwear.png" },
    variants: [
      {
        color: { name: "Camel", hex: "#C19A6B" },
        images: [
          { url: knitwear, filename: "knitwear-1.png" },
          { url: topImg, filename: "knitwear-2.webp" }
        ],
        sizes: [
          { size: "S", stock: 6 },
          { size: "M", stock: 8 },
          { size: "L", stock: 2 }
        ]
      }
    ]
  },
  {
    _id: "prod-6",
    title: "Pleated Wide Leg Casual Trousers",
    price: 1799,
    oldPrice: 2199,
    description: "Crafted with double front pleats and a relaxed drape. Elasticated rear waist tabs provide all-day comfort without sacrificing clean lines.",
    highlights: [
      "Structured cotton twill with slight stretch",
      "Double front pleats with tapered drape",
      "Side slant pockets & rear welt pockets",
      "Concealed zip fly and hook bar closure"
    ],
    featuredImage: { url: trousers, filename: "trousers.png" },
    variants: [
      {
        color: { name: "Charcoal Grey", hex: "#43464B" },
        images: [
          { url: trousers, filename: "trousers-1.png" },
          { url: culotte, filename: "trousers-2.png" }
        ],
        sizes: [
          { size: "30", stock: 5 },
          { size: "32", stock: 12 },
          { size: "34", stock: 9 },
          { size: "36", stock: 2 }
        ]
      }
    ]
  },
  {
    _id: "prod-7",
    title: "Cropped Ribbed Sleeveless Top",
    price: 799,
    oldPrice: 999,
    description: "Form-fitting ribbed knit with high scoop neckline. An effortless layering essential for daily wear.",
    highlights: [
      "95% Modal, 5% Elastane rib knit",
      "Flattering wide binding at neck and armholes",
      "Retains shape wash after wash"
    ],
    featuredImage: { url: topImg, filename: "top.webp" },
    variants: [
      {
        color: { name: "Alabaster", hex: "#F3EDE2" },
        images: [
          { url: topImg, filename: "top-1.webp" }
        ],
        sizes: [
          { size: "XS", stock: 7 },
          { size: "S", stock: 10 },
          { size: "M", stock: 8 }
        ]
      }
    ]
  },
  {
    _id: "prod-8",
    title: "High-Rise Cropped Culotte Pants",
    price: 1699,
    oldPrice: 1999,
    description: "Flowy wide-leg cut ending at mid-calf with high-waisted band and deep side pockets.",
    highlights: [
      "Lightweight breathable linen blend",
      "High-rise fitted waistband",
      "Relaxed wide leg silhouette"
    ],
    featuredImage: { url: culotte, filename: "culotte.png" },
    variants: [
      {
        color: { name: "Sand", hex: "#D6C6B2" },
        images: [
          { url: culotte, filename: "culotte-1.png" }
        ],
        sizes: [
          { size: "S", stock: 4 },
          { size: "M", stock: 6 },
          { size: "L", stock: 3 }
        ]
      }
    ]
  }
];

export const mockCartInitial = [
  {
    _id: "prod-1",
    product: "prod-1",
    title: "Contrast Tipping Zipper Polo T-Shirt",
    price: 1299,
    quantity: 1,
    size: "M",
    color: "Sage Green",
    image: { url: poloT, filename: "poloT.webp" },
    stock: 8
  },
  {
    _id: "prod-2",
    product: "prod-2",
    title: "Heavyweight Boxy Oversized Tee",
    price: 899,
    quantity: 2,
    size: "L",
    color: "Off White",
    image: { url: oversizedTshirt, filename: "oversized-tshirt.webp" },
    stock: 12
  }
];
