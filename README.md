# 📚 Library Management System — Requirements

---

## 🎯 Objective
Build a web-based Library Management System where:
- Members (students) can log in and view available books & their borrowed books.
- A single Admin manages books & members, and monitors borrowed & near-expiry books.
- Automatic notifications are sent to members via email & SMS when a borrowed book is near its due date.

---

## 👥 Users & Roles

### Member
- Can log in & view available books.
- Can view their own profile with:
  - Personal details.
  - List of books currently borrowed with due date.
- Can click on a borrowed book to view details:
  - Title, Author, ISBN, Description, Borrow Date, Due Date.

### Admin
- Single admin login.
- Can add, edit, and delete members.
- Can add, edit, and delete books.
- Can change book status (available / not available).
- Can view a list of all members.
- Can view a dashboard showing:
  - All borrowed books with borrower info & due dates.
  - Books that are due within 2 days (near-to-expire), highlighted.
- Receives a notification when books are near expiry.

---

## 🔒 Login & Access
- Separate login for Admin and Members.
- Admin logs in with fixed credentials.
- Members log in with their Member ID & password.
- No public access — only registered members & admin.

---

## 📋 Member Features
- View all available books (where available copies > 0).
- View profile:
  - Personal details.
  - Borrowed books & due dates.
- Click on a borrowed book to view detailed info.

---

## 🛠️ Admin Features

### Member Management
- Add new members (name, email, phone, password).
- Edit member details.
- Delete members.
- View list of all members.

### Book Management
- Add new books (title, author, ISBN, description, category, total copies, available copies).
- Edit book details.
- Delete books.
- Change book status to available or not available.

### Dashboard
- Show all borrowed books with:
  - Book title
  - Borrower name
  - Borrow date & due date
- Show books that are due within 2 days (near-to-expire) in a separate section.
- Notification banner when near-expiry books exist.

---

## 🔔 Notifications
- When a book is due in ≤ 2 days:
  - Automatic email sent to the member.
  - Automatic SMS sent to the member’s phone number.
  - Highlighted on the admin dashboard.

---

## 📝 Summary
✅ Private login for Admin & Members.  
✅ Members can view available books & their borrowed books.  
✅ Admin can manage members & books.  
✅ Admin dashboard shows borrowed & near-to-expire books.  
✅ Notifications (email & SMS) for near-expiry books.  

---
