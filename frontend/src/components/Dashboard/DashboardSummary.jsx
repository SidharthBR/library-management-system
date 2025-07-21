import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";

export default function DashboardSummary() {
  const [stats, setStats] = useState({ books: 0, members: 0 });

  useEffect(() => {
    fetch("/api/admin/summary", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {
        setStats({ books: 120, members: 45 }); // fallback mock
      });
  }, []);

  return (
    <div className="dashboard-summary">
      <h3>📊 Summary</h3>
      <p>Total Books: {stats.books}</p>
      <p>Total Members: {stats.members}</p>
    </div>
  );
}
