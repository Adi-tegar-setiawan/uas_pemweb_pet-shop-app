import React from "react";
import "./css/OrderManagement.css";

const OrderManagement = ({ orders, confirmOrder }) => {
  return (
    <div className="order-management-container">
      <h2>Manajemen Pesanan</h2>
      {orders.length === 0 ? (
        <p>Tidak ada pesanan saat ini.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>ID Pesanan</th>
              <th>Nama Pelanggan</th>
              <th>Alamat</th>
              <th>Produk</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userData.name}</td>
                <td>{order.userData.address}</td>
                <td>
                  <ul className="product-list">
                    {order.items.map((item) => (
                      <li key={item.id} className="product-item">
                        <img
                          src={item.image || "default-image.png"} // Tambahkan gambar produk
                          alt={item.name}
                          className="product-image"
                        />
                        <div>
                          <span>{item.name}</span>
                          <br />
                          <small>
                            {item.quantity} x Rp {item.price.toLocaleString()}
                          </small>
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.status}</td>
                <td>
                  {order.status === "Pending" && (
                    <button
                      onClick={() => confirmOrder(order.id)}
                      className="confirm-button"
                    >
                      Konfirmasi
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderManagement;
