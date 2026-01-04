import React, { useEffect, useState, useMemo } from "react";

// ------------------ Mock Data ------------------
const MOCK_PRODUCTS = [
  // Electronics (8 products)
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 2499,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    description: "Premium wireless headphones with noise cancellation",
    stock: 15
  },
  {
    id: 2,
    title: "Smart Watch Series 5",
    price: 8999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
    description: "Fitness tracker with heart rate monitor",
    stock: 8
  },
  {
    id: 10,
    title: "Wireless Mouse",
    price: 799,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80",
    description: "Ergonomic wireless mouse with USB receiver",
    stock: 3
  },
  {
    id: 13,
    title: "Gaming Keyboard RGB",
    price: 3299,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    description: "Mechanical gaming keyboard with RGB lighting",
    stock: 11
  },
  {
    id: 17,
    title: "Portable Speaker Bluetooth",
    price: 2199,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    description: "Waterproof portable speaker with 12hr battery",
    stock: 9
  },
  {
    id: 21,
    title: "USB-C Hub Multi-Port",
    price: 1499,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&q=80",
    description: "7-in-1 USB-C hub with HDMI and USB 3.0",
    stock: 20
  },
  {
    id: 22,
    title: "Webcam HD 1080p",
    price: 3499,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
    description: "Full HD webcam with built-in microphone",
    stock: 12
  },
  {
    id: 23,
    title: "Power Bank 20000mAh",
    price: 1899,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
    description: "High capacity power bank with fast charging",
    stock: 18
  },

  // Clothing (6 products)
  {
    id: 3,
    title: "Cotton T-Shirt - Black",
    price: 599,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    description: "100% premium cotton comfortable t-shirt",
    stock: 25
  },
  {
    id: 4,
    title: "Denim Jeans - Blue",
    price: 1299,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    description: "Classic fit denim jeans",
    stock: 12
  },
  {
    id: 16,
    title: "Hoodie - Grey",
    price: 1599,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    description: "Comfortable cotton blend hoodie",
    stock: 19
  },
  {
    id: 24,
    title: "Formal Shirt - White",
    price: 1199,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    description: "Slim fit formal shirt for office wear",
    stock: 15
  },
  {
    id: 25,
    title: "Track Pants - Black",
    price: 899,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    description: "Comfortable track pants for casual wear",
    stock: 22
  },
  {
    id: 26,
    title: "Winter Jacket",
    price: 3499,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    description: "Warm winter jacket with hood",
    stock: 8
  },

  // Footwear (5 products)
  {
    id: 5,
    title: "Running Shoes",
    price: 3499,
    category: "footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    description: "Lightweight running shoes with extra cushioning",
    stock: 18
  },
  {
    id: 18,
    title: "Canvas Sneakers",
    price: 1899,
    category: "footwear",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
    description: "Classic canvas sneakers",
    stock: 5
  },
  {
    id: 27,
    title: "Formal Leather Shoes",
    price: 2999,
    category: "footwear",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80",
    description: "Premium leather formal shoes",
    stock: 10
  },
  {
    id: 28,
    title: "Sports Sandals",
    price: 1299,
    category: "footwear",
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80",
    description: "Comfortable sports sandals for outdoor",
    stock: 14
  },
  {
    id: 29,
    title: "Slip-On Loafers",
    price: 2199,
    category: "footwear",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80",
    description: "Casual slip-on loafers",
    stock: 11
  },

  // Accessories (6 products)
  {
    id: 6,
    title: "Leather Wallet",
    price: 899,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    description: "Genuine leather bifold wallet",
    stock: 30
  },
  {
    id: 7,
    title: "Stainless Steel Water Bottle",
    price: 499,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    description: "Insulated water bottle keeps drinks cold for 24hrs",
    stock: 0
  },
  {
    id: 9,
    title: "Laptop Backpack",
    price: 1899,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    description: "Water-resistant backpack with laptop compartment",
    stock: 14
  },
  {
    id: 14,
    title: "Sunglasses Polarized",
    price: 1499,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    description: "UV protection polarized sunglasses",
    stock: 16
  },
  {
    id: 30,
    title: "Analog Wrist Watch",
    price: 2499,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
    description: "Classic analog watch with leather strap",
    stock: 9
  },
  {
    id: 31,
    title: "Phone Case - Silicone",
    price: 299,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
    description: "Protective silicone phone case",
    stock: 35
  },

  // Fitness (5 products)
  {
    id: 8,
    title: "Yoga Mat Premium",
    price: 1199,
    category: "fitness",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
    description: "Non-slip yoga mat with carrying strap",
    stock: 20
  },
  {
    id: 15,
    title: "Resistance Bands Set",
    price: 699,
    category: "fitness",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&q=80",
    description: "Set of 5 resistance bands for home workout",
    stock: 28
  },
  {
    id: 20,
    title: "Dumbbells 5kg Pair",
    price: 1799,
    category: "fitness",
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800&q=80",
    description: "Pair of 5kg rubber coated dumbbells",
    stock: 10
  },
  {
    id: 32,
    title: "Skipping Rope",
    price: 399,
    category: "fitness",
    image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&q=80",
    description: "Adjustable speed skipping rope",
    stock: 25
  },
  {
    id: 33,
    title: "Gym Gloves",
    price: 599,
    category: "fitness",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80",
    description: "Padded gym gloves with wrist support",
    stock: 17
  },

  // Home (6 products)
  {
    id: 11,
    title: "Coffee Maker Machine",
    price: 4599,
    category: "home",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80",
    description: "Automatic drip coffee maker with timer",
    stock: 7
  },
  {
    id: 12,
    title: "LED Desk Lamp",
    price: 1299,
    category: "home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    description: "Adjustable LED lamp with USB charging port",
    stock: 22
  },
  {
    id: 19,
    title: "Ceramic Dinner Plate Set",
    price: 2499,
    category: "home",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
    description: "Set of 6 elegant ceramic dinner plates",
    stock: 13
  },
  {
    id: 34,
    title: "Bedsheet Set - King Size",
    price: 1899,
    category: "home",
    image: "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=800&q=80",
    description: "Premium cotton bedsheet with pillow covers",
    stock: 16
  },
  {
    id: 35,
    title: "Wall Clock Modern",
    price: 899,
    category: "home",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80",
    description: "Silent wall clock with modern design",
    stock: 19
  },
  {
    id: 36,
    title: "Table Fan 16 inch",
    price: 1599,
    category: "home",
    image: "https://images.unsplash.com/photo-1615477072278-cd07efe2b24d?w=800&q=80",
    description: "High-speed table fan with 3 speed settings",
    stock: 11
  }
];

// ------------------ Main App ------------------
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  // Load mock products
  useEffect(() => {
    setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 500);
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    return ["all", ...new Set(products.map((p) => p.category))];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortOrder === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortOrder]);

  // Cart functions
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    const product = products.find((p) => p.id === productId);
    
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    if (newQuantity > product.stock) {
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortOrder("");
  };

  // Cart totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">E-Commerce Store</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Filters & Search</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by Price
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">No sorting</option>
                  <option value="low-high">Low → High</option>
                  <option value="high-low">High → Low</option>
                </select>
              </div>

              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Clear all filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-2">
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredProducts.length} product(s)
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">No products found</p>
                <p className="text-sm text-gray-400 mt-2">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <ProductList
                products={filteredProducts}
                onAddToCart={addToCart}
                cart={cart}
              />
            )}
          </main>

          {/* Cart Sidebar */}
          <aside className="lg:col-span-1">
            <Cart
              cart={cart}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              totalItems={totalItems}
              totalPrice={totalPrice}
              onCheckout={() => setShowCheckout(true)}
            />
          </aside>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          cart={cart}
          totalPrice={totalPrice}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setCart([]);
            setShowCheckout(false);
          }}
        />
      )}
    </div>
  );
}

// ------------------ Product List Component ------------------
function ProductList({ products, onAddToCart, cart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {products.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);
        const isOutOfStock = product.stock === 0;
        const isLowStock = product.stock > 0 && product.stock <= 5;

        return (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4"
          >
            <div className="aspect-square bg-gray-100 rounded-md mb-3 flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain p-4"
              />
            </div>

            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 h-12">
              {product.title}
            </h3>

            <p className="text-2xl font-bold text-blue-600 mb-1">
              ₹{product.price.toFixed(2)}
            </p>

            <p className="text-sm text-gray-500 capitalize mb-2">
              {product.category}
            </p>

            <div className="mb-3">
              {isOutOfStock ? (
                <span className="text-red-600 font-semibold text-sm">
                  Out of stock
                </span>
              ) : isLowStock ? (
                <span className="text-orange-600 font-semibold text-sm">
                  Only {product.stock} left in stock
                </span>
              ) : (
                <span className="text-green-600 font-semibold text-sm">
                  In stock
                </span>
              )}
            </div>

            <button
              onClick={() => onAddToCart(product)}
              disabled={isOutOfStock || (cartItem && cartItem.quantity >= product.stock)}
              className={`w-full py-2 rounded-md font-medium transition ${
                isOutOfStock || (cartItem && cartItem.quantity >= product.stock)
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {cartItem && cartItem.quantity >= product.stock
                ? "Max quantity reached"
                : "Add to Cart"}
            </button>

            {cartItem && (
              <p className="text-center text-sm text-gray-600 mt-2">
                {cartItem.quantity} in cart
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ------------------ Cart Component ------------------
function Cart({ cart, onRemove, onUpdateQuantity, totalItems, totalPrice, onCheckout }) {
  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
        <h2 className="text-lg font-semibold mb-4">Cart</h2>
        <div className="text-center py-12">
          <p className="text-gray-500">Empty cart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
      <h2 className="text-lg font-semibold mb-4">Cart</h2>

      <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
        {cart.map((item) => (
          <div key={item.id} className="border-b pb-3">
            <div className="flex gap-3 mb-2">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain bg-gray-50 rounded"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-sm font-bold text-blue-600">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    onUpdateQuantity(item.id, val);
                  }}
                  className="w-12 text-center border border-gray-300 rounded py-1"
                />
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded ${
                    item.quantity >= item.stock
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onRemove(item.id)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>

            {item.quantity >= item.stock && (
              <p className="text-xs text-orange-600 mt-1">
                Maximum available quantity
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total items:</span>
          <span className="font-semibold">{totalItems}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total price:</span>
          <span className="text-2xl font-bold text-blue-600">
            ₹{totalPrice.toFixed(2)}
          </span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full mt-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-semibold"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

// ------------------ Checkout Modal Component ------------------
function CheckoutModal({ cart, totalPrice, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: ""
  });
  const [processing, setProcessing] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      alert("Order placed successfully! Thank you for shopping with us.");
      onSuccess();
    }, 2000);
  };

  const isStep1Valid = formData.fullName && formData.email && formData.phone && 
                       formData.address && formData.city && formData.pincode;
  const isStep2Valid = formData.paymentMethod;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
              }`}>
                1
              </div>
              <div className={`w-20 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-300"}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
              }`}>
                2
              </div>
              <div className={`w-20 h-1 ${step >= 3 ? "bg-blue-600" : "bg-gray-300"}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 3 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
              }`}>
                3
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Delivery Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!isStep1Valid}
                  className={`w-full py-3 rounded-md font-semibold transition ${
                    isStep1Valid
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Payment Method</h3>

                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleInputChange}
                      className="mr-3 w-5 h-5"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Credit / Debit Card</div>
                      <div className="text-sm text-gray-500">Pay securely with your card</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleInputChange}
                      className="mr-3 w-5 h-5"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">UPI</div>
                      <div className="text-sm text-gray-500">Google Pay, PhonePe, Paytm, etc.</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={formData.paymentMethod === "netbanking"}
                      onChange={handleInputChange}
                      className="mr-3 w-5 h-5"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Net Banking</div>
                      <div className="text-sm text-gray-500">Pay through your bank account</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                      className="mr-3 w-5 h-5"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">Cash on Delivery</div>
                      <div className="text-sm text-gray-500">Pay when you receive the order</div>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!isStep2Valid}
                    className={`flex-1 py-3 rounded-md font-semibold transition ${
                      isStep2Valid
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Review Your Order</h3>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Delivery Address</h4>
                  <p className="text-sm text-gray-700">{formData.fullName}</p>
                  <p className="text-sm text-gray-700">{formData.address}</p>
                  <p className="text-sm text-gray-700">{formData.city}, {formData.pincode}</p>
                  <p className="text-sm text-gray-700">{formData.phone}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Payment Method</h4>
                  <p className="text-sm text-gray-700 capitalize">
                    {formData.paymentMethod === "card" && "Credit / Debit Card"}
                    {formData.paymentMethod === "upi" && "UPI"}
                    {formData.paymentMethod === "netbanking" && "Net Banking"}
                    {formData.paymentMethod === "cod" && "Cash on Delivery"}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Order Items ({cart.length})</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.title} x {item.quantity}</span>
                        <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-3 pt-3 flex justify-between">
                    <span className="font-bold text-lg">Total Amount</span>
                    <span className="font-bold text-2xl text-blue-600">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={processing}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className={`flex-1 py-3 rounded-md font-semibold transition ${
                      processing
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {processing ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}