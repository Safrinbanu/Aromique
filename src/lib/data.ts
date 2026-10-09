import { siteConfig } from "./siteConfig";
import elegance_1 from "../assets/images/products/elegance-parfum.jpg";
import jadore_1 from "../assets/images/products/jadore-1.jpg";
import jadore_2 from "../assets/images/products/jadore-2.jpg";
import valentino_1 from "../assets/images/products/valentino-donna.jpg";
import scandal_1 from "../assets/images/products/scandal.jpg";
import cherry_1 from "../assets/images/products/cherry-blossom.jpg";
import soft_1 from "../assets/images/products/soft-fragrance.jpg";
import bombshell_1 from "../assets/images/products/bombshell.jpg";
import monparis_1 from "../assets/images/products/mon-paris.jpg";
import paradoxe_1 from "../assets/images/products/paradoxe.jpg";
import flora_1 from "../assets/images/products/gucci-flora-1.jpg";
import flora_2 from "../assets/images/products/gucci-flora-2.jpg";
import kayali_1 from "../assets/images/products/kayali-eden.jpg";
import chance_1 from "../assets/images/products/chance-eau-tendre.jpg";

export type Perfume = {
  id: string;
  name: string;
  brand: string;
  price: number;
  actualprice: number;
  gender: "Men" | "Women" | "Unisex";
  type: "Floral" | "Woody" | "Citrus" | "Spicy" | "Fresh" | "Sweet";
  notes: string[];
  description: string;
  imageUrl: string;
  gallery: string[];
};

export const perfumes: Perfume[] = [
  {
    id: "p1",
    name: "Elegance Parfum",
    brand: siteConfig.name,
    price: 2499,
    actualprice: 1799,
    gender: "Unisex",
    type: "Floral",
    notes: ["Rose", "Amber", "White Musk"],
    description: "A glamorous rose and amber blend with a soft musky trail. Bold, polished and made for evenings.",
    imageUrl: elegance_1,
    gallery: [elegance_1],
  },
  {
    id: "p2",
    name: "J'adore",
    brand: "Dior",
    price: 9999,
    actualprice: 7499,
    gender: "Women",
    type: "Floral",
    notes: ["Ylang-Ylang", "Rose", "Jasmine"],
    description: "A radiant bouquet of white flowers wrapped in a golden, luminous finish. Timeless and elegant.",
    imageUrl: jadore_1,
    gallery: [jadore_1, jadore_2],
  },
  {
    id: "p3",
    name: "Valentino Donna",
    brand: "Valentino",
    price: 7999,
    actualprice: 5999,
    gender: "Women",
    type: "Floral",
    notes: ["Rose", "Bergamot", "Vanilla"],
    description: "Bright bergamot opens into velvety rose and a warm vanilla base. Feminine with a confident edge.",
    imageUrl: valentino_1,
    gallery: [valentino_1],
  },
  {
    id: "p4",
    name: "Scandal",
    brand: "Jean Paul Gaultier",
    price: 8499,
    actualprice: 6499,
    gender: "Women",
    type: "Sweet",
    notes: ["Honey", "Gardenia", "Patchouli"],
    description: "Playful honey and gardenia over a deep patchouli base. Daring, sweet and impossible to ignore.",
    imageUrl: scandal_1,
    gallery: [scandal_1],
  },
  {
    id: "p5",
    name: "Miss Dior Cherry Blossom",
    brand: "Dior",
    price: 7499,
    actualprice: 5599,
    gender: "Women",
    type: "Floral",
    notes: ["Cherry Blossom", "Peony", "Musk"],
    description: "Soft cherry blossom and peony resting on clean musk. Delicate, youthful and perfect for spring.",
    imageUrl: cherry_1,
    gallery: [cherry_1],
  },
  {
    id: "p6",
    name: "Soft Fragrance",
    brand: siteConfig.name,
    price: 1999,
    actualprice: 1499,
    gender: "Women",
    type: "Floral",
    notes: ["Rose", "Peony", "Soft Musk"],
    description: "A gentle floral of rose and peony with a cosy musk finish. Easy to love every single day.",
    imageUrl: soft_1,
    gallery: [soft_1],
  },
  {
    id: "p7",
    name: "Bombshell",
    brand: "Victoria's Secret",
    price: 4999,
    actualprice: 3499,
    gender: "Women",
    type: "Sweet",
    notes: ["Passion Fruit", "Peony", "Vanilla Orchid"],
    description: "Juicy passion fruit and peony softened by creamy vanilla orchid. Fruity, flirty and bright.",
    imageUrl: bombshell_1,
    gallery: [bombshell_1],
  },
  {
    id: "p8",
    name: "Mon Paris",
    brand: "Yves Saint Laurent",
    price: 8999,
    actualprice: 6799,
    gender: "Women",
    type: "Sweet",
    notes: ["Strawberry", "White Musk", "Patchouli"],
    description: "A romantic mix of red berries, white flowers and patchouli. Passionate and unforgettable.",
    imageUrl: monparis_1,
    gallery: [monparis_1],
  },
  {
    id: "p9",
    name: "Paradoxe",
    brand: "Prada",
    price: 9499,
    actualprice: 7299,
    gender: "Women",
    type: "Floral",
    notes: ["Neroli", "Jasmine", "Amber"],
    description: "Fresh neroli and jasmine over a luminous amber base. Modern, radiant and refined.",
    imageUrl: paradoxe_1,
    gallery: [paradoxe_1],
  },
  {
    id: "p10",
    name: "Flora Gorgeous Gardenia",
    brand: "Gucci",
    price: 6999,
    actualprice: 5199,
    gender: "Women",
    type: "Floral",
    notes: ["Pear", "Gardenia", "Brown Sugar"],
    description: "Juicy pear and creamy gardenia with a touch of brown sugar. Charming and effortless.",
    imageUrl: flora_1,
    gallery: [flora_1, flora_2],
  },
  {
    id: "p11",
    name: "Eden Sparkling Lychee | 39",
    brand: "Kayali",
    price: 6499,
    actualprice: 4799,
    gender: "Women",
    type: "Sweet",
    notes: ["Lychee", "Rose", "Vanilla"],
    description: "Sparkling lychee and rose melting into soft vanilla. Fruity, juicy and endlessly wearable.",
    imageUrl: kayali_1,
    gallery: [kayali_1],
  },
  {
    id: "p12",
    name: "Chance Eau Tendre",
    brand: "Chanel",
    price: 10499,
    actualprice: 7999,
    gender: "Women",
    type: "Fresh",
    notes: ["Grapefruit", "Jasmine", "White Musk"],
    description: "Zesty grapefruit and jasmine fading into a soft musky glow. Light, airy and romantic.",
    imageUrl: chance_1,
    gallery: [chance_1],
  },
];

export const featuredPerfumes = perfumes.slice(0, 3);
export const newArrivals = perfumes.slice(3, 6);
