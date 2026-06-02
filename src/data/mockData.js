// ── Mock Data for Biashara AI Dashboard ──────────────────────────────────────
// Realistic Kenyan SME data for development and MEST demo
// Replace with real API calls when connecting to FastAPI backend

// ── Business Info ─────────────────────────────────────────────────────────────
export const mockBusiness = {
  id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  business_name: "Mama Wanjiru Shop",
  owner_phone: "+254712345678",
  business_type: "kiosk",
  location: "Kawangware, Nairobi",
  is_active: true,
  created_at: "2027-01-15T08:00:00Z",
};

// ── Today's Summary ───────────────────────────────────────────────────────────
export const mockTodaySummary = {
  date: new Date().toISOString().split("T")[0],
  total_revenue: 12400,
  total_expenses: 3200,
  net_profit: 9200,
  transaction_count: 14,
  top_selling_item: "Unga",
};

// ── Weekly Sales Data (last 7 days) ───────────────────────────────────────────
export const mockWeeklySales = [
  { date: "Mon", revenue: 8200, expenses: 2100, profit: 6100 },
  { date: "Tue", revenue: 9400, expenses: 1800, profit: 7600 },
  { date: "Wed", revenue: 7800, expenses: 2400, profit: 5400 },
  { date: "Thu", revenue: 11200, expenses: 3100, profit: 8100 },
  { date: "Fri", revenue: 13600, expenses: 2800, profit: 10800 },
  { date: "Sat", revenue: 15800, expenses: 3400, profit: 12400 },
  { date: "Sun", revenue: 12400, expenses: 3200, profit: 9200 },
];

// ── Monthly Sales Data ────────────────────────────────────────────────────────
export const mockMonthlySales = [
  { month: "Jan", revenue: 245000, expenses: 68000, profit: 177000 },
  { month: "Feb", revenue: 218000, expenses: 72000, profit: 146000 },
  { month: "Mar", revenue: 289000, expenses: 81000, profit: 208000 },
  { month: "Apr", revenue: 312000, expenses: 76000, profit: 236000 },
  { month: "May", revenue: 278000, expenses: 69000, profit: 209000 },
  { month: "Jun", revenue: 334000, expenses: 88000, profit: 246000 },
];

// ── Recent Transactions ────────────────────────────────────────────────────────
export const mockTransactions = [
  {
    id: "t001",
    transaction_type: "sale",
    item_name: "Unga",
    quantity: 5,
    unit: "kg",
    unit_price: 120,
    total_amount: 600,
    original_message: "Niliuza unga kilo 5 kwa 120",
    recorded_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "t002",
    transaction_type: "sale",
    item_name: "Sukari",
    quantity: 3,
    unit: "kg",
    unit_price: 150,
    total_amount: 450,
    original_message: "Niliuza sukari kilo 3 kwa 150",
    recorded_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "t003",
    transaction_type: "expense",
    item_name: "Tomatoes",
    quantity: 10,
    unit: "kg",
    unit_price: 80,
    total_amount: 800,
    original_message: "Nilitumia 800 kununua nyanya kilo 10",
    recorded_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: "t004",
    transaction_type: "sale",
    item_name: "Mafuta",
    quantity: 2,
    unit: "litres",
    unit_price: 280,
    total_amount: 560,
    original_message: "Sold 2 litres cooking oil at 280",
    recorded_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "t005",
    transaction_type: "sale",
    item_name: "Chumvi",
    quantity: 4,
    unit: "pieces",
    unit_price: 30,
    total_amount: 120,
    original_message: "Niliuza chumvi 4 kwa 30",
    recorded_at: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
  },
  {
    id: "t006",
    transaction_type: "expense",
    item_name: "Transport",
    quantity: 1,
    unit: null,
    unit_price: 200,
    total_amount: 200,
    original_message: "Nilitumia 200 nauli",
    recorded_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: "t007",
    transaction_type: "sale",
    item_name: "Soda",
    quantity: 6,
    unit: "pieces",
    unit_price: 60,
    total_amount: 360,
    original_message: "Sold 6 sodas at 60 each",
    recorded_at: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
  },
  {
    id: "t008",
    transaction_type: "sale",
    item_name: "Unga",
    quantity: 2,
    unit: "kg",
    unit_price: 120,
    total_amount: 240,
    original_message: "Niliuza unga kilo 2 kwa 120",
    recorded_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
  {
    id: "t009",
    transaction_type: "expense",
    item_name: "Sukari restock",
    quantity: 50,
    unit: "kg",
    unit_price: 130,
    total_amount: 6500,
    original_message: "Nimeagiza sukari kilo 50 kwa 130",
    recorded_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: "t010",
    transaction_type: "sale",
    item_name: "Mayai",
    quantity: 12,
    unit: "pieces",
    unit_price: 15,
    total_amount: 180,
    original_message: "Sold 12 eggs at 15 each",
    recorded_at: new Date(Date.now() - 1000 * 60 * 320).toISOString(),
  },
];

// ── Stock Levels ──────────────────────────────────────────────────────────────
export const mockStockItems = [
  {
    id: "s001",
    item_name: "Unga",
    current_quantity: 8,
    unit: "kg",
    low_stock_threshold: 10,
    is_low_stock: true,
    updated_at: new Date().toISOString(),
  },
  {
    id: "s002",
    item_name: "Sukari",
    current_quantity: 42,
    unit: "kg",
    low_stock_threshold: 10,
    is_low_stock: false,
    updated_at: new Date().toISOString(),
  },
  {
    id: "s003",
    item_name: "Mafuta",
    current_quantity: 3,
    unit: "litres",
    low_stock_threshold: 5,
    is_low_stock: true,
    updated_at: new Date().toISOString(),
  },
  {
    id: "s004",
    item_name: "Chumvi",
    current_quantity: 24,
    unit: "pieces",
    low_stock_threshold: 5,
    is_low_stock: false,
    updated_at: new Date().toISOString(),
  },
  {
    id: "s005",
    item_name: "Soda",
    current_quantity: 4,
    unit: "pieces",
    low_stock_threshold: 6,
    is_low_stock: true,
    updated_at: new Date().toISOString(),
  },
  {
    id: "s006",
    item_name: "Mayai",
    current_quantity: 30,
    unit: "pieces",
    low_stock_threshold: 12,
    is_low_stock: false,
    updated_at: new Date().toISOString(),
  },
  {
    id: "s007",
    item_name: "Nyanya",
    current_quantity: 6,
    unit: "kg",
    low_stock_threshold: 5,
    is_low_stock: false,
    updated_at: new Date().toISOString(),
  },
  {
    id: "s008",
    item_name: "Mchele",
    current_quantity: 2,
    unit: "kg",
    low_stock_threshold: 5,
    is_low_stock: true,
    updated_at: new Date().toISOString(),
  },
];

// ── Top Selling Items ─────────────────────────────────────────────────────────
export const mockTopItems = [
  { item_name: "Unga", total_sales: 4800, percentage: 38 },
  { item_name: "Sukari", total_sales: 2700, percentage: 22 },
  { item_name: "Mafuta", total_sales: 1680, percentage: 14 },
  { item_name: "Soda", total_sales: 1440, percentage: 12 },
  { item_name: "Mayai", total_sales: 900, percentage: 7 },
  { item_name: "Others", total_sales: 880, percentage: 7 },
];

// ── Helper functions ──────────────────────────────────────────────────────────
export const formatKES = (amount) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (isoString) => {
  return new Date(isoString).toLocaleString("en-KE", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatTimeAgo = (isoString) => {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};