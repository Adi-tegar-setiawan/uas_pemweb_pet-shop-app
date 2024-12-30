// src/components/Cart.js
import React from "react";

const Cart = ({ cartItems, updateCartItemQuantity, removeFromCart }) => {
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartItemQuantity(itemId, newQuantity);
    }
  };

  return (
    <div>
      <h2>Keranjang</h2>
      {cartItems.length === 0 ? (
        <p>Keranjang kosong.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <p>
                {item.name} - Rp{item.price}
              </p>
              <p>Jumlah: {item.quantity}</p>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                -
              </button>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button onClick={() => removeFromCart(item.id)}>Hapus</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
