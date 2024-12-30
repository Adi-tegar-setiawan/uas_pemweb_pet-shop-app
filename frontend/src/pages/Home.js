import React from "react";
import "./css/Home.css";

const Home = ({ products, addToCart }) => {
  return (
    <div className="home-container">
      <div className="advertisement">
        <img
          src="/WEB-MOBILE-PAWDAY-01-scaled.jpg"
          alt="Advertisement"
          className="ad-image"
        />
      </div>
      <h2>Daftar Produk</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image || "default-image.png"}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">Rp {product.price.toLocaleString()}</p>
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(product)}
            >
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
