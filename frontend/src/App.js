// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [activeAdminPage, setActiveAdminPage] = useState("products");
  const [activeUserPage, setActiveUserPage] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]); // Data produk diambil dari backend
  const [orders, setOrders] = useState([]);

  // Mengambil data produk dari backend saat komponen dimuat
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
      { id: Date.now(), ...orderData, status: "Pending" },
    ]);
    setCartItems([]);
  };

  const confirmOrder = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "Confirmed" } : order
      )
    );
  };

  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post("http://localhost:3000/api/products", product);
      setProducts([...products, { id: response.data.data.id, ...product }]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:3000/api/products/${updatedProduct.id}`, updatedProduct);
      setProducts(
        products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
          <ProductManagement
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
        return <Home products={products} addToCart={addToCart} />;
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
