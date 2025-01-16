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
      console.log("Products fetched:", response.data.data);  // Log produk yang diterima
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  {products.map((product) => (
    <li key={product.id}>
      <img
        src={`http://localhost:3000${product.image_url}`}
        alt={product.name}
        style={{ width: "50px", height: "50px" }}
      />
      {product.name} - Rp{product.price} ({product.stock} stok)
      <button onClick={() => handleEditProduct(product)}>Edit</button>
      <button onClick={() => handleDeleteProduct(product.id)}>Hapus</button>
    </li>
  ))}

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle upload gambar
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setNewProduct({ ...newProduct, image: file });
    }
};


  // Tambah produk
  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', parseFloat(newProduct.price));
    formData.append('stock', parseInt(newProduct.stock, 10));
    formData.append('image', newProduct.image);

    try {
        const response = await axios.post(`${API_URL}/products`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        setNewProduct({ name: '', price: '', stock: '', image: null });
        fetchProducts(); // Refresh produk
        console.log(response.data.message);
    } catch (error) {
        console.error('Error adding product:', error);
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
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', parseFloat(newProduct.price));
    formData.append('stock', parseInt(newProduct.stock, 10));
  
    // Jika ada gambar baru yang diupload, tambahkan ke FormData
    if (newProduct.image) {
      formData.append('image', newProduct.image);
    } else if (newProduct.image_url) {
      // Jika tidak ada gambar baru, tetap kirimkan image_url lama
      formData.append('image_url', newProduct.image_url);
    }
  
    try {
      await axios.put(`${API_URL}/products/${editingProduct.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setIsEditing(false);
      setEditingProduct(null);
      setNewProduct({ name: "", price: "", stock: "", image: null, image_url: "" });
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
              src={'http://localhost:3000${product.image_url}'}
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
    src={`http://localhost:3000${product.image_url}`}
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
