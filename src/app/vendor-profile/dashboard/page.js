"use client"
export default function Dashboard() {
  return (
    <div className="main-content w-full  h-screen p-5 bg-[#FBF9FA] text-[#2B2024]">
      <header className="header flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
       
      </header>
      <section className="stats grid grid-cols-3 gap-4 mb-8 text-[#2B2024]">
        <div className="stat-card bg-[#FBF9FA] p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Total Sales</h3>
          <p className="stat-value text-2xl text-[#FD0054]">₹24,580</p>
        </div>
        <div className="stat-card bg-[#FBF9FA] p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Orders</h3>
          <p className="stat-value text-2xl text-[#FD0054]">134</p>
        </div>
        <div className="stat-card bg-[#FBF9FA] p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Low Stock</h3>
          <p className="stat-value text-2xl text-[#FD0054]">{localStorage.getItem("outStock")}</p>
        </div>
      </section>
      <section className="orders-inventory grid grid-cols-2 gap-4 text-[#2B2024]">
        <div className="recent-orders bg-[#FBF9FA] p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Order ID</th>
                <th className="text-left">Customer</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#ORD-001</td>
                <td>John Doe</td>
                <td>₹1,230</td>
                <td className="status shipped text-green-500">Shipped</td>
              </tr>
              <tr>
                <td>#ORD-002</td>
                <td>Jane Smith</td>
                <td>₹2,450</td>
                <td className="status processing text-yellow-500">Processing</td>
              </tr>
              <tr>
                <td>#ORD-003</td>
                <td>Sam Brown</td>
                <td>₹890</td>
                <td className="status delivered text-blue-500">Delivered</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="inventory-status bg-[#FBF9FA] p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Inventory Status</h3>
          <div className="pie-chart">
            {/* Placeholder for pie chart */}
          </div>
        </div>
      </section>
    </div>
  );
}
