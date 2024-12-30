// src/components/SalesReport.js
import React from "react";

const SalesReport = ({ orders }) => {
  // Gaya untuk tabel dan elemen lainnya
  const styles = {
    container: {
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      margin: "20px auto",
      maxWidth: "800px",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#f2f2f2",
      padding: "12px",
      border: "1px solid #ddd",
      textAlign: "left",
    },
    td: {
      padding: "12px",
      border: "1px solid #ddd",
    },
    statusPending: {
      color: "orange",
    },
    statusConfirmed: {
      color: "green",
    },
    totalContainer: {
      marginTop: "20px",
      textAlign: "left",
      fontSize: "18px",
      fontWeight: "bold",
    },
  };

  // Hitung total penjualan
  const calculateTotalSales = () => {
    return orders.reduce((total, order) => {
      return (
        total +
        order.items.reduce((orderTotal, item) => {
          return orderTotal + item.price * item.quantity;
        }, 0)
      );
    }, 0);
  };

  const totalSales = calculateTotalSales();

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Laporan Penjualan</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID Pesanan</th>
            <th style={styles.th}>Nama Barang</th>
            <th style={styles.th}>Jumlah</th>
            <th style={styles.th}>Harga Satuan</th>
            <th style={styles.th}>Total Harga</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) =>
            order.items.map((item) => (
              <tr key={item.id}>
                <td style={styles.td}>{order.id}</td>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>{item.quantity}</td>
                <td style={styles.td}>Rp {item.price.toLocaleString()}</td>
                <td style={styles.td}>
                  Rp {(item.price * item.quantity).toLocaleString()}
                </td>
                <td
                  style={styles.td}
                  className={
                    order.status === "Pending"
                      ? styles.statusPending
                      : styles.statusConfirmed
                  }
                >
                  {order.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div style={styles.totalContainer}>
        Total Penjualan: Rp {totalSales.toLocaleString()}
      </div>
    </div>
  );
};

export default SalesReport;
