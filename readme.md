# 🏟️ NCG – North Community Ground

**Premium Indoor Sports Facility Booking Platform**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

A modern, responsive web app for booking indoor sports facilities like Football, Cricket, Indoor Arena, and Training zones. Includes real‑time availability, dynamic pricing, WhatsApp sharing, and a full‑featured admin dashboard.

---

## ✨ Features

### 🌐 Public Booking Page (`index.html`)
- **Dark premium theme** with lime accent and glassmorphism
- **Live slot availability** via Firestore real‑time listeners
- **Interactive booking widget** – facility, date, time, duration, players, customer info
- **Dynamic pricing** based on facility & duration
- **Auto‑confirm toggle** (from admin settings)
- **Notification banner** for announcements, offers, and alerts
- **Booking summary modal** with WhatsApp & Facebook share
- **Fully responsive** (320px to 4K)
- **Smooth animations** – loader, staggered hero, scroll reveals, counters
- **Admin profile icon** in footer → links to admin.html

### 🔐 Admin Dashboard (`admin.html`)
- **Email/password login** (Firebase Auth)
- **Dashboard** – real‑time stats, revenue, peak time insights
- **Bookings** – pending requests, all bookings with filters, CSV export, quick book
- **Slots** – add/edit/delete time slots, real‑time updates
- **Pricing** – base prices & duration multipliers, live sync
- **Notifications** – create, activate/deactivate, delete
- **Settings** – auto‑confirm toggle
- **Atomic transactions** for booking confirm/cancel

---

## 🛠 Tech Stack

| Category       | Technology                              |
|----------------|------------------------------------------|
| Frontend       | HTML5, CSS3, JavaScript (ES Modules)     |
| Styling        | Custom CSS (Space Grotesk, Inter, DM Mono) |
| Backend        | Firebase Firestore (NoSQL)               |
| Authentication | Firebase Auth (Email/Password)           |
| Hosting        | Vercel, Firebase Hosting, or any static host |
| Alerts         | SweetAlert2                              |

---

## 📁 Project Structure
├── index.html # Public booking page (self-contained)
├── admin.html # Admin dashboard (self-contained)
├── assets/
│ └── images/ # Custom images (hero, facilities, logo, etc.)
├── README.md
└── .gitignore

text

> **Note:** All CSS and JavaScript are inline in the respective HTML files for simplicity. No external dependencies except Firebase SDK and SweetAlert2 (CDN).

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/zainktk56/The-NCG-DEMO.git
cd The-NCG-DEMO
2. Set Up Firebase
Go to Firebase Console and create a new project.

Enable Authentication → Sign-in method → Email/Password.

Enable Firestore Database (production mode).

Replace the Firebase config in both index.html and admin.html with your own (found in Project settings → Your apps → Config).

3. Apply Firestore Security Rules
Paste the following rules in Firestore Database → Rules:

text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /slots/{slot} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /config/pricing {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /config/settings {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /notifications/{notification} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /bookings/{booking} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /feedback/{feedback} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
  }
}
4. Create Admin User
In Firebase Console → Authentication → Users → Add user, enter your admin email and password.

5. Seed Initial Data
You can seed data manually or through the admin dashboard after logging in:

Slots: Add available slots (facility, date, time, status)

Pricing: Set config/pricing document with basePrices and durationMultipliers

Settings: Set config/settings with autoConfirm: false

6. Run Locally
Simply open index.html in your browser. For the admin, open admin.html.

🌐 Deployment
Deploy to Vercel
Push your code to a GitHub repository.

Import the repo into Vercel.

Deploy – no build step required.

Deploy to Firebase Hosting
bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
Make sure index.html, admin.html, and assets/ are in the public directory.

⚙️ Important Firestore Indexes
The following composite indexes are required for the real‑time queries to work smoothly:

Collection	Fields (Ascending)	Purpose
slots	facility, date, time	Filter slots by facility & date, sort by time
Create it in Firestore Console → Indexes → Create index.

🎨 Customization
Images: Replace files in assets/images/ and update the URLs in the HTML (background-image or src).

Colors & Fonts: Edit CSS variables in the :root selector inside each HTML file.

WhatsApp Number: Change 923001234567 in the WhatsApp sharing code to your number.

📸 Screenshots
Public Booking Page	Admin Dashboard
https://assets/images/hero%2520image.png	https://assets/images/more%2520than%2520a%2520game.jpg
(Replace with actual screenshots if available)

🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

📝 License
This project is licensed under the MIT License – see the LICENSE file for details.

🙋‍♂️ Support
For questions or suggestions, contact Zain.

Built with ❤️ for the NCG community.

text

---

**Note:** Replace placeholder images in the README with actual paths if you have screenshots in your assets folder, or remove that section. Also ensure the license file exists or change the badge accordingly.