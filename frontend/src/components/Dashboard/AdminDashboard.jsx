import React from "react";
import DashboardSummary from "./DashboardSummary";
import NotificationsBanner from "./NotificationsBanner";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  return (
    <div className="dashboard">
      <h1>📚 Admin Dashboard</h1>
      <NotificationsBanner />
      <DashboardSummary />

      <div className="actions">
        <button onClick={() => navigate("/books")}>📖 Manage Books</button>
        <button onClick={() => navigate("/members")}>👤 Manage Members</button>
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>
    </div>
  );
}
