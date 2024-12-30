// src/App.js
import React, { useState } from "react";
// Impor komponen yang diperlukan
import AdminSidebar from "./components/AdminSidebar";
import ProductManagement from "./components/ProductManagement";
import OrderManagement from "./components/OrderManagement";
import SalesReport from "./components/SalesReport";
import Login from "./pages/Login";
import UserSidebar from "./components/UserSidebar";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import UserLogin from "./components/UserLogin";
import "./styles.css";

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [activeAdminPage, setActiveAdminPage] = useState("products"); // Ganti dengan halaman awal admin
  const [activeUserPage, setActiveUserPage] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: "Produk 1", price: 10000 },
    { id: 2, name: "Produk 2", price: 20000 },
  ]);
  const [orders, setOrders] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

const placeOrder = (orderData) => {
  setOrders([
    ...orders,
    { id: Date.now(), ...orderData, status: "Pending" }, // Tambahkan pesanan baru
  ]);
  setCartItems([]); // Kosongkan keranjang setelah checkout
};



  const confirmOrder = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "Confirmed" } : order
      )
    );
  };

  const handleAddProduct = (product) => {
    setProducts([...products, { id: Date.now(), ...product }]);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const renderAdminPage = () => {
    switch (activeAdminPage) {
      case "products":
        return (
          <ProductManagement
            products={products}
            addProduct={handleAddProduct}
            editProduct={handleEditProduct}
            deleteProduct={handleDeleteProduct}
          />
        );
      case "orders":
        return <OrderManagement orders={orders} confirmOrder={confirmOrder} />;
      case "salesReport":
        return <SalesReport orders={orders} />;
      default:
        return (
          <ProductManagement // Halaman default admin sekarang adalah Manajemen Produk
            products={products}
            addProduct={handleAddProduct}
            editProduct={handleEditProduct}
            deleteProduct={handleDeleteProduct}
          />
        );
    }
  };

  const renderUserPage = () => {
    switch (activeUserPage) {
      case "home":
        return <Home products={products} addToCart={addToCart} />;
      case "cart":
        return (
          <Cart
            cartItems={cartItems}
            updateCartItemQuantity={updateCartItemQuantity}
            removeFromCart={removeFromCart}
          />
        );
      case "checkout":
        return <Checkout cartItems={cartItems} placeOrder={placeOrder} />;
      default:
        return <Home />; // Halaman default user adalah Home
    }
  };

  return (
    <div className="app">
      {isAdminLoggedIn ? (
        <>
          <AdminSidebar setActivePage={setActiveAdminPage} />
          <div className="content">
            <button
              className="logout-button"
              onClick={() => setIsAdminLoggedIn(false)}
            >
              Logout Admin
            </button>
            {renderAdminPage()}
          </div>
        </>
      ) : isUserLoggedIn ? (
        <>
          <UserSidebar setActiveUserPage={setActiveUserPage} />
          <div className="content">
            <button
              className="logout-button"
              onClick={() => setIsUserLoggedIn(false)}
            >
              Logout User
            </button>
            {renderUserPage()}
          </div>
        </>
      ) : (
        <div className="login-selection">
          <h2>Pilih Login</h2>
          <button onClick={() => setIsAdminLoggedIn(true)}>Login Admin</button>
          <UserLogin setUserLoggedIn={setIsUserLoggedIn} />
        </div>
      )}
    </div>
  );
}

export default App;
