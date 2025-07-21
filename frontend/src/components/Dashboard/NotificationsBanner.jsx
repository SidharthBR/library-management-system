import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";

export default function NotificationsBanner() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Replace with real API call to /api/admin/notifications
    fetch("/api/admin/notifications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch(() => {
        setNotifications([
          "3 books are overdue",
          "2 new members joined today",
        ]);
      });
  }, []);

  return (
    <div className="notifications-banner">
      <h4>🔔 Notifications</h4>
      <ul>
        {notifications.length === 0 && <li>No notifications</li>}
        {notifications.map((note, idx) => (
          <li key={idx}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
