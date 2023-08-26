import { useState } from "react";
import { useEffect } from "react";
import "./SalesPage.css"
import { host } from "../utils";
import Navbar from "../components/Navbar";

const purchaseHistory = [
  { id: 1, date: '2023-08-01', total: 120.00 },
  { id: 2, date: '2023-08-10', total: 85.50 },
  { id: 3, date: '2023-08-15', total: 200.75 },
  
];

function PurchaseHistoryPage() {
  const [sales, setSales] = useState([]);

  const convertToLocalTime = utcTime => {
    const localTime = new Date(utcTime);
    return localTime.toLocaleString(); 
  };

  useEffect(() => {
    
    fetch(`${host}/api/sale`, 
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
    ).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setSales(data);
      }
      
      else if (response.status === 403) {
        localStorage.removeItem("token");
        
        
      }
    });
  }, []);
  
  return (
    <>
    <Navbar />
    <div className="purchase-history-page">
      <h2>Historial de Compras</h2>
      <table className="purchase-history-table">
        <thead>
          <tr>
            <th>ID de Compra</th>
            <th>Fecha de Compra</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(purchase => (
            <tr key={purchase.id}>
              <td>{purchase.id}</td>
              <td>{convertToLocalTime( purchase.date)}</td>
              <td>${purchase.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          </>
  );
}

export default PurchaseHistoryPage;
