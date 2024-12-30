// src/components/AdminSidebar.js
import React from "react";

const AdminSidebar = ({ setActivePage }) => {
  return (
    <div className="sidebar">
      <h1>Admin Panel</h1>
      
      <button onClick={() => setActivePage("products")}>Produk</button>
      <button onClick={() => setActivePage("orders")}>Pesanan</button>
      <button onClick={() => setActivePage("salesReport")}>
        Laporan Penjualan
      </button>
    </div>
  );
};

export default AdminSidebar;
