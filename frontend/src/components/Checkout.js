import React, { useState } from "react";
import "./css/Checkout.css";

const Checkout = ({ cartItems, placeOrder }) => {
  const [userData, setUserData] = useState({
    name: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.address) {
      alert("Harap isi data diri dan alamat lengkap.");
      return;
    }
    placeOrder({ items: cartItems, userData });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="order-summary">
        <h3>Ringkasan Pesanan</h3>
        {cartItems.length === 0 ? (
          <p>Keranjang Anda kosong.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="product-item">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} x Rp {item.price.toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleCheckout}>
        <h3>Data Diri</h3>
        <div className="form-group">
          <label>Nama Lengkap:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Alamat Lengkap:</label>
          <textarea
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">Lanjutkan Pesanan</button>
      </form>
    </div>
  );
};

export default Checkout;
