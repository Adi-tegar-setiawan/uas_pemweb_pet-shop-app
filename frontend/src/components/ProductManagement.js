import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Sesuaikan dengan endpoint backend Anda

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image_url: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch data produk dari backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle upload gambar
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setNewProduct({ ...newProduct, image_url: response.data.image_url });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Tambah produk
  const handleAddProduct = async () => {
    try {
      await axios.post(`${API_URL}/products`, {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock, 10),
        image_url: newProduct.image_url,
      });
      setNewProduct({ name: "", price: "", stock: "", image_url: "" });
      fetchProducts(); // Refresh produk
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Edit produk
  const handleEditProduct = (product) => {
    setIsEditing(true);
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      stock: product.stock,
      image_url: product.image_url,
    });
  };

  // Update produk
  const handleUpdateProduct = async () => {
    try {
      await axios.put(`${API_URL}/products/${editingProduct.id}`, {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock, 10),
        image_url: newProduct.image_url,
      });
      setIsEditing(false);
      setEditingProduct(null);
      setNewProduct({ name: "", price: "", stock: "", image_url: "" });
      fetchProducts(); // Refresh produk
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Hapus produk
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      fetchProducts(); // Refresh produk
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>Manajemen Produk</h2>
      <div>
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
        <input
          type="number"
          name="stock"
          value={newProduct.stock}
          onChange={handleChange}
          placeholder="Stok Produk"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {newProduct.image_url && (
          <div>
            <img
              src={newProduct.image_url}
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
      </div>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img
              src={product.image_url || "https://via.placeholder.com/50"}
              alt={product.name}
              style={{ width: "50px", height: "50px" }}
            />
            {product.name} - Rp{product.price} ({product.stock} stok)
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
