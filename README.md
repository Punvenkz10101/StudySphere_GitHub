# StudySphere - Virtual Study Room with Integrated Tools

**StudySphere** is a collaborative platform designed to enhance productivity and engagement among study groups. It mimics the feel of physical study sessions, augmented with powerful digital tools to make learning more organized, interactive, and effective.

---

## 🚀 Features

- **User Authentication and Profiles**: Secure sign up/login (email/password, Google, GitHub), user profiles, and role management (users, moderators/admins).
- **Room Creation & Discovery**: Create and join study rooms by subject/topic, with privacy settings and invitation links.
- **Pomodoro Timer**: Customizable study/break intervals, notifications, and session tracking.
- **Live Chat**: Real-time group and private messaging, emojis, and reactions.
- **Progress Tracking**: Shared to-do lists, progress bars, analytics dashboard.
- **Whiteboard**: Collaborative drawing and brainstorming in real time.

---

## 📂 Folder Structure

```
StudySphere_GitHub/
├── Backend/           # Node.js/Express backend
│   ├── models/        # Mongoose models (Room, Contact)
│   ├── routes/        # API routes (room, contact)
│   └── server.js      # Main server file
│   └── package.json   # Backend dependencies
├── Frontend/          # React frontend (Vite + Tailwind)
│   ├── public/        # Static assets (images, icons)
│   ├── src/           # React components & services
│   │   ├── components/  # UI components (Room, Chat, Whiteboard, etc.)
│   │   ├── services/    # API and socket services
│   │   └── styles/      # CSS and Tailwind styles
│   ├── package.json   # Frontend dependencies
│   └── index.html     # App entry point
└── README.md          # Project documentation
```

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Firebase Authentication, Socket.io-client, ZegoUIKit (video)
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.io
- **Other:** Axios, React Router, Toastify, AOS, FontAwesome, ZegoCloud

---

## ⚡ Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB instance (local or cloud)

### Backend Setup

```bash
cd Backend
npm install
# Create a .env file with MONGODB_URI and other secrets
npm start
```
- The backend runs on `http://localhost:5001` by default.

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```
- The frontend runs on `http://localhost:5173` by default.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo, create a feature branch, and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

---

## 👨‍💻 Team & Credits

- **Puneeth Venkat** – [GitHub](https://github.com/Punvenkz10101) | [LinkedIn](https://www.linkedin.com/in/puneeth-venkat-7731b5293)
- **Bharath P** – [GitHub](https://github.com/Bharathpothula205) | [LinkedIn](http://linkedin.com/in/bharath-pothula)
- **Harsha Kumar SM** – [GitHub]() | [LinkedIn]()

---


## 🙋 FAQ

- **What is StudySphere?**
  - A collaborative study platform for students to connect, organize, and be more productive.
- **How do I use the Pomodoro Timer?**
  - Start the timer in the app, customize intervals, and stay productive.
- **Can I join or create group study sessions?**
  - Yes! Create or join virtual study rooms with others.
- **How does the Progress Tracker work?**
  - Set goals, visualize completion rates, and view study insights.

---

## 📬 Contact

For support or feedback, use the Contact Us form in the app or open an issue on GitHub.

