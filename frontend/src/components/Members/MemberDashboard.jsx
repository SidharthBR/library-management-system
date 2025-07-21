import React, { useEffect, useState } from "react";
import NotificationsBanner from "../Dashboard/NotificationsBanner";
import { useNavigate } from "react-router-dom";

export default function MemberDashboard() {
  const navigate = useNavigate();
  const [member, setMember] = useState({ name: "Member", borrowedBooks: 0 });

  useEffect(() => {
    // Replace with real API call to fetch logged-in member details
    fetch("/api/member/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMember(data))
      .catch(() => {
        setMember({ name: "John Doe", borrowedBooks: 3 }); // fallback
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/member/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>👋 Welcome, {member.name}!</h1>
      <NotificationsBanner />

      <div style={{ marginTop: "20px" }}>
        <h3>📚 Your Summary</h3>
        <p>Books Borrowed: {member.borrowedBooks}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/books")}>Browse Books</button>
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>
    </div>
  );
}
