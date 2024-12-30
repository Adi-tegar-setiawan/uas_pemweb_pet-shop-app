// src/components/UserSidebar.js
import React from "react";

const UserSidebar = ({ setActiveUserPage }) => {
  return (
    <div className="sidebar">
      <h1>Pet Shop</h1>
      <button onClick={() => setActiveUserPage("home")}>Beranda</button>
      <button onClick={() => setActiveUserPage("cart")}>Keranjang</button>
      <button onClick={() => setActiveUserPage("checkout")}>Checkout</button>
    </div>
  );
};

export default UserSidebar;
