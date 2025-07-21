import React from "react";
import "../styles/Dashboard.css";

export default function MemberList({ members = [], onSelect }) {
  return (
    <div className="dashboard-container">
      <h3>Members List</h3>
      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              {member.name} ({member.email}){" "}
              <button onClick={() => onSelect(member)}>View</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
