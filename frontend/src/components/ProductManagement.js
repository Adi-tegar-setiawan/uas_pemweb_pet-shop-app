// src/components/ProductManagement.js
import React, { useState } from "react";

const ProductManagement = ({
  products,
  addProduct,
  editProduct,
  deleteProduct,
}) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct({ ...newProduct, image: imageUrl });
    }
  };

  const handleAddProduct = () => {
    addProduct({ ...newProduct, price: parseFloat(newProduct.price) });
    setNewProduct({ name: "", price: "", image: null });
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleUpdateProduct = () => {
    editProduct({
      ...editingProduct,
      ...newProduct,
      price: parseFloat(newProduct.price),
    });
    setIsEditing(false);
    setEditingProduct(null);
    setNewProduct({ name: "", price: "", image: null });
  };

  return (
    <div>
      <h2>Manajemen Produk</h2>
      <input
        type="text"
        name="name"
        value={newProduct.name}
        onChange={handleChange}
        placeholder="Nama Produk"
      />
      <input
        type="number"
        name="price"
        value={newProduct.price}
        onChange={handleChange}
        placeholder="Harga Produk"
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {newProduct.image && (
        <div>
          <img
            src={newProduct.image}
            alt="Produk Preview"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
      {isEditing ? (
        <button onClick={handleUpdateProduct}>Update Produk</button>
      ) : (
        <button onClick={handleAddProduct}>Tambah Produk</button>
      )}

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "50px", height: "50px" }}
            />
            {product.name} - Rp{product.price}
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => deleteProduct(product.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
