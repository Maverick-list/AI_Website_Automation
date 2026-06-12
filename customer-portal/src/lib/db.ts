import fs from "fs";
import path from "path";

const LOCAL_PATH = path.join(process.cwd(), "data.json");
const SHARED_PATH = path.join(process.cwd(), "..", "data.json");
const DATA_PATH = fs.existsSync(SHARED_PATH) ? SHARED_PATH : LOCAL_PATH;

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

interface Order {
  id: string;
  date: string;
  productId: string;
  productName: string;
  buyerName: string;
  waNumber: string;
  location: string;
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered";
}

interface FinanceRecord {
  id: string;
  date: string;
  type: "income" | "expense";
  amount: number;
  description: string;
}

interface DB {
  inventory: Product[];
  finance: FinanceRecord[];
  orders: Order[];
}

const initialData: DB = {
  inventory: [
    { id: "1", name: "Solar Lantern", category: "Hardware", price: 250000, stock: 50, description: "Lampu tenaga surya ramah lingkungan untuk daerah terpencil. Tahan hingga 12 jam pemakaian." },
    { id: "2", name: "Water Filter Kit", category: "Health", price: 150000, stock: 30, description: "Solusi air bersih portabel untuk desa-desa yang membutuhkan. Mampu menyaring hingga 1000 liter." },
    { id: "3", name: "Educational Tablet", category: "Education", price: 1200000, stock: 20, description: "Tablet edukasi dengan konten pembelajaran interaktif untuk siswa kurang mampu." },
  ],
  finance: [],
  orders: [],
};

export function getDB(): DB {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  const content = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(content);
}

export function saveDB(db: DB) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(db, null, 2));
}
