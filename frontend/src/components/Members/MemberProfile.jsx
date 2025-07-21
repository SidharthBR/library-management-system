import React from "react";
import "../styles/Dashboard.css";

export default function MemberProfile({ member }) {
  if (!member) {
    return (
      <div className="dashboard-container">
        <h3>Member Profile</h3>
        <p>Select a member to view details.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h3>Member Profile</h3>
      <p><strong>Name:</strong> {member.name}</p>
      <p><strong>Email:</strong> {member.email}</p>
      <p><strong>Borrowed Books:</strong> {member.borrowedBooks || 0}</p>
    </div>
  );
}
